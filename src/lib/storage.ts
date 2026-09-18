import { createAdminClient } from "@/lib/supabase/admin";

// Genere un lien video signe qui EXPIRE. Change juste cette fonction
// pour passer a Cloudflare R2 (presigned URL) ou Bunny (token) plus tard.
export async function getSignedVideoUrl(storagePath: string, expiresInSeconds = 3600) {
  if (!storagePath) return null;
  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("course-videos")
    .createSignedUrl(storagePath, expiresInSeconds);
  if (error) {
    console.error("signed url error", error.message);
    return null;
  }
  return data.signedUrl;
}
