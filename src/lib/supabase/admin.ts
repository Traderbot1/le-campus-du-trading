import { createClient } from "@supabase/supabase-js";

// Client "service role" — SERVEUR UNIQUEMENT (webhook, generation d'URL signee).
// Ne JAMAIS l'importer dans un composant client.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
