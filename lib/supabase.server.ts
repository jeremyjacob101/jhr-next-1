import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const secretRoleKey = process.env.SUPABASE_SECRET_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, secretRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
