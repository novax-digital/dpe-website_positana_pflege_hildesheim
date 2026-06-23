import { createSupabasePublicClient } from "@/lib/supabase";

export const supabaseBrowser = createSupabasePublicClient({
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
});
