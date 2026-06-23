import { createClient } from "@supabase/supabase-js";
import { createSupabasePublicClient } from "@/lib/supabase";
import type {
  BlogPost,
  ContactMessageInsert,
  Database,
  JobApplicationInsert,
  JobListing,
} from "@/lib/supabase-schema";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const resumeBucket = import.meta.env.SUPABASE_RESUME_BUCKET || "resumes";

export const hasSupabaseServerConfig = Boolean(supabaseUrl && serviceRoleKey);

export const createSupabaseServerClient = () => {
  if (!hasSupabaseServerConfig) {
    return null;
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

const logSupabaseError = (scope: string, error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[supabase:${scope}] ${message}`);
};

const getReadClient = () => createSupabaseServerClient() ?? createSupabasePublicClient();

export const getPublishedBlogPosts = async () => {
  const supabase = getReadClient();
  if (!supabase) {
    return [] as BlogPost[];
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(100);

  if (error) {
    logSupabaseError("blog_posts:list", error);
    return [] as BlogPost[];
  }

  return data ?? [];
};

export const getBlogPostBySlug = async (slug: string) => {
  const supabase = getReadClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    logSupabaseError("blog_posts:single", error);
    return null;
  }

  return data;
};

export const getPublishedJobListings = async () => {
  const supabase = getReadClient();
  if (!supabase) {
    return [] as JobListing[];
  }

  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    logSupabaseError("job_listings:list", error);
    return [] as JobListing[];
  }

  return data ?? [];
};

export const getJobListingById = async (id: string) => {
  const supabase = getReadClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    logSupabaseError("job_listings:single", error);
    return null;
  }

  return data;
};

export const createContactMessage = async (message: ContactMessageInsert) => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert(message)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createResumeUploadTarget = async (filename: string) => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const extension = filename.toLowerCase().split(".").pop() || "bin";
  const path = `applications/${crypto.randomUUID()}.${extension}`;
  const { data, error } = await supabase.storage.from(resumeBucket).createSignedUploadUrl(path);

  if (error) {
    throw error;
  }

  return {
    bucket: resumeBucket,
    path: data.path,
    token: data.token,
  };
};

export const createJobApplication = async (application: JobApplicationInsert) => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("job_applications")
    .insert(application)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createResumeDownloadUrls = async (paths: string[], expiresIn = 7 * 24 * 60 * 60) => {
  const supabase = createSupabaseServerClient();
  if (!supabase || paths.length === 0) {
    return [] as Array<{ path: string; signedUrl: string }>;
  }

  const urls: Array<{ path: string; signedUrl: string }> = [];

  for (const path of paths) {
    const { data, error } = await supabase.storage.from(resumeBucket).createSignedUrl(path, expiresIn);
    if (error || !data?.signedUrl) {
      logSupabaseError("resumes:signed-url", error ?? `No signed URL for ${path}`);
    } else {
      urls.push({ path, signedUrl: data.signedUrl });
    }
  }

  return urls;
};
