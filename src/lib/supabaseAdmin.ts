import { createClient } from "@supabase/supabase-js";
import { envOptional } from "./env";

// Admin-only client. Uses SERVICE ROLE key.
// Do NOT import this into client components.
export function getSupabaseAdmin() {
  const url = envOptional("SUPABASE_URL");
  const key = envOptional("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    // Don't crash build; crash only when called.
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
