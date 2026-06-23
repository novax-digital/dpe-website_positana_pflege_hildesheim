import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const parseEnvFile = (filename) => {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [key, value];
      }),
  );
};

const env = {
  ...parseEnvFile(".env.example"),
  ...parseEnvFile(".env"),
  ...parseEnvFile(".env.local"),
  ...process.env,
};

const skipAdminUpsert = env.SKIP_ADMIN_UPSERT === "true";

const required = [
  "PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_DB_URL",
  ...(skipAdminUpsert ? [] : ["ADMIN_EMAIL", "ADMIN_PASSWORD"]),
];

const missing = required.filter((key) => !env[key]);
if (missing.length > 0) {
  console.error(`Missing required environment values: ${missing.join(", ")}`);
  console.error("Set them in .env or export them before running npm run supabase:setup.");
  process.exit(1);
}

const migrationDir = path.join(root, "supabase", "migrations");
const migrationFiles = fs
  .readdirSync(migrationDir)
  .filter((filename) => filename.endsWith(".sql"))
  .sort();

const db = postgres(env.SUPABASE_DB_URL, {
  max: 1,
  ssl: env.SUPABASE_DB_SSL === "disable" ? false : "require",
});

const supabase = createClient(env.PUBLIC_SUPABASE_URL.replace(/\/$/, ""), env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const runMigrations = async () => {
  await db`CREATE SCHEMA IF NOT EXISTS positana_private`;
  await db`
    CREATE TABLE IF NOT EXISTS positana_private.migrations (
      filename text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  for (const filename of migrationFiles) {
    const [existing] = await db`
      SELECT filename
      FROM positana_private.migrations
      WHERE filename = ${filename}
      LIMIT 1
    `;

    if (existing) {
      console.log(`Skipping ${filename}`);
      continue;
    }

    const migrationSql = fs.readFileSync(path.join(migrationDir, filename), "utf8");
    console.log(`Applying ${filename}`);

    await db.begin(async (tx) => {
      await tx.unsafe(migrationSql);
      await tx`
        INSERT INTO positana_private.migrations (filename)
        VALUES (${filename})
      `;
    });
  }
};

const findUserByEmail = async (email) => {
  const normalized = email.toLowerCase();
  let page = 1;

  while (page <= 20) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000,
    });

    if (error) {
      throw error;
    }

    const user = data.users.find((candidate) => candidate.email?.toLowerCase() === normalized);
    if (user) {
      return user;
    }

    if (data.users.length < 1000) {
      return null;
    }

    page += 1;
  }

  return null;
};

const upsertAdmin = async () => {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;
  let user = await findUserByEmail(email);

  if (user) {
    console.log(`Updating admin user ${email}`);
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
    });
    if (error) {
      throw error;
    }
    user = data.user;
  } else {
    console.log(`Creating admin user ${email}`);
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) {
      throw error;
    }
    user = data.user;
  }

  const { error: roleError } = await supabase.from("user_roles").upsert(
    {
      user_id: user.id,
      role: "admin",
    },
    {
      onConflict: "user_id,role",
    },
  );

  if (roleError) {
    throw roleError;
  }
};

const verifySetup = async () => {
  const tableNames = ["blog_posts", "job_listings", "contact_messages", "job_applications", "user_roles"];
  const tables = await db`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = ANY(${tableNames})
  `;
  const foundTables = new Set(tables.map((row) => row.table_name));
  const missingTables = tableNames.filter((table) => !foundTables.has(table));

  if (missingTables.length > 0) {
    throw new Error(`Missing tables after setup: ${missingTables.join(", ")}`);
  }

  const requiredBuckets = [env.SUPABASE_RESUME_BUCKET || "resumes", "blog-images"];
  const buckets = await db`
    SELECT id
    FROM storage.buckets
    WHERE id = ANY(${requiredBuckets})
  `;
  const foundBuckets = new Set(buckets.map((row) => row.id));
  const missingBuckets = requiredBuckets.filter((bucketName) => !foundBuckets.has(bucketName));

  if (missingBuckets.length > 0) {
    throw new Error(`Missing storage buckets after setup: ${missingBuckets.join(", ")}`);
  }
};

try {
  await runMigrations();
  await verifySetup();
  if (skipAdminUpsert) {
    console.log("Skipping admin user upsert.");
  } else {
    await upsertAdmin();
  }
  console.log("Supabase setup complete.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await db.end({ timeout: 5 });
}
