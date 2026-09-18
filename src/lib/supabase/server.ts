import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client Supabase cote serveur (respecte la session + le RLS de l'utilisateur).
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // appele depuis un Server Component : ignore (le middleware rafraichit la session)
          }
        },
      },
    }
  );
}
