import { createClient } from "@supabase/supabase-js";
import type { SupabaseClientOptions } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase-schema";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? "";

export const hasSupabasePublicConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const createSupabasePublicClient = (
  auth: SupabaseClientOptions<"public">["auth"] = {
    persistSession: false,
    autoRefreshToken: false,
  },
) => {
  if (!hasSupabasePublicConfig) {
    return null;
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth,
  });
};
