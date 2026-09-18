import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "non connecte" }, { status: 401 });

  const { lessonId, positionSeconds, completed } = await req.json();
  if (!lessonId) return NextResponse.json({ error: "lessonId manquant" }, { status: 400 });

  await supabase.from("progress").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    position_seconds: Math.round(positionSeconds ?? 0),
    completed: !!completed,
    updated_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
