import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSignedVideoUrl } from "@/lib/storage";
import LessonPlayer from "@/components/LessonPlayer";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/cours/${lessonId}`);

  const { data: lesson } = await supabase.from("lessons").select("*").eq("id", lessonId).maybeSingle();
  if (!lesson) notFound();

  const { data: ent } = await supabase.from("entitlements").select("has_full_access").eq("user_id", user.id).maybeSingle();
  const hasAccess = !!ent?.has_full_access || lesson.is_free;
  if (!hasAccess) redirect("/dashboard");

  // Lien video signe (expire) genere cote serveur
  const videoUrl = await getSignedVideoUrl(lesson.storage_path);

  const { data: prog } = await supabase.from("progress")
    .select("position_seconds, completed").eq("user_id", user.id).eq("lesson_id", lessonId).maybeSingle();

  return (
    <main className="max-w-4xl mx-auto px-5 py-8">
      <Link href="/dashboard" className="text-dim text-sm hover:text-ink">← Retour a l'espace</Link>
      <div className="font-mono text-xs text-faint mt-4">{lesson.module_title}</div>
      <h1 className="text-2xl font-bold mb-5">{lesson.title}</h1>
      <LessonPlayer
        lessonId={lesson.id}
        videoUrl={videoUrl}
        watermark={user.email || ""}
        initialPosition={prog?.position_seconds || 0}
        completed={!!prog?.completed}
      />
    </main>
  );
}
