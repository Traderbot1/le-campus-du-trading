import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BuyButton from "@/components/BuyButton";

export const dynamic = "force-dynamic";

type Lesson = { id: string; module_order: number; module_title: string; lesson_order: number; title: string; duration: string | null; is_free: boolean };

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const { data: ent } = await supabase.from("entitlements").select("has_full_access").eq("user_id", user.id).maybeSingle();
  const hasAccess = !!ent?.has_full_access;

  const { data: lessonsData } = await supabase.from("lessons").select("*").order("module_order").order("lesson_order");
  const lessons = (lessonsData || []) as Lesson[];
  const { data: prog } = await supabase.from("progress").select("lesson_id, completed").eq("user_id", user.id);
  const doneSet = new Set((prog || []).filter(p => p.completed).map(p => p.lesson_id));

  // Groupe par module
  const modules = new Map<number, { title: string; items: Lesson[] }>();
  lessons.forEach(l => {
    if (!modules.has(l.module_order)) modules.set(l.module_order, { title: l.module_title, items: [] });
    modules.get(l.module_order)!.items.push(l);
  });

  const total = lessons.length;
  const doneCount = lessons.filter(l => doneSet.has(l.id)).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const modulesArr = [...modules.entries()];
  const modulesDone = modulesArr.filter(([, m]) => m.items.every(l => doneSet.has(l.id))).length;

  // Prochaine leçon à reprendre (1re accessible non terminée)
  const nextLesson = lessons.find(l => (hasAccess || l.is_free) && !doneSet.has(l.id)) || null;
  const openModule = nextLesson ? nextLesson.module_order : modulesArr[0]?.[0];

  const initial = (user.email || "?")[0].toUpperCase();
  const R = 30, C = 2 * Math.PI * R;

  return (
    <div className="min-h-screen md:flex">
      {/* SIDEBAR */}
      <aside className="md:w-64 md:min-h-screen md:fixed md:flex md:flex-col border-b md:border-b-0 md:border-r border-line bg-[#0C0818] z-40">
        <div className="flex md:flex-col items-center md:items-stretch justify-between px-5 py-4 md:py-6 gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="" className="h-8 w-8" />
            <span className="font-extrabold metal text-sm">Le Campus du Trading</span>
          </Link>
          <nav className="hidden md:flex flex-col gap-1 mt-8">
            <span className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/15 text-accent2 text-sm font-medium">▸ Mon espace</span>
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-dim hover:text-ink hover:bg-panel text-sm">↗ Le site</Link>
          </nav>
          <form action="/auth/signout" method="post" className="md:hidden">
            <button className="text-dim text-sm border border-line2 rounded-lg px-3 py-2">Déconnexion</button>
          </form>
        </div>
        <div className="hidden md:block mt-auto p-5 border-t border-line">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-accent2 text-sm">{initial}</div>
            <div className="text-xs text-dim truncate">{user.email}</div>
          </div>
          <form action="/auth/signout" method="post">
            <button className="w-full text-dim text-sm border border-line2 rounded-lg px-3 py-2 hover:text-ink">Déconnexion</button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <main className="md:ml-64 flex-1 px-5 md:px-10 py-8 md:py-10 max-w-5xl">
        <div className="font-mono text-xs text-accent2 mb-1">TON ESPACE</div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-8">Bon retour 👋</h1>

        {!hasAccess && (
          <div className="bg-panel border border-accent/40 rounded-2xl p-6 mb-8" style={{ boxShadow: "0 30px 70px -50px rgba(124,77,255,.6)" }}>
            <h2 className="text-lg font-semibold mb-1">Débloque la formation complète</h2>
            <p className="text-dim text-sm mb-4">8 modules, 35+ leçons, accès à vie. Paiement unique sécurisé par Stripe.</p>
            <BuyButton className="cta" />
          </div>
        )}

        {hasAccess && (
          <>
            {/* Progression + Reprendre */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-panel border border-line rounded-2xl p-6 flex items-center gap-5">
                <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0 -rotate-90">
                  <circle cx="40" cy="40" r={R} fill="none" stroke="#251A3B" strokeWidth="8" />
                  <circle cx="40" cy="40" r={R} fill="none" stroke="#7C4DFF" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
                </svg>
                <div>
                  <div className="text-3xl font-extrabold">{pct}<span className="text-lg text-dim">%</span></div>
                  <div className="text-dim text-sm">de la formation complétée</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-panel2 to-panel border border-accent/30 rounded-2xl p-6 flex flex-col justify-between">
                {nextLesson ? (
                  <>
                    <div>
                      <div className="font-mono text-xs text-accent2 mb-1">REPRENDRE</div>
                      <div className="font-semibold leading-snug">{nextLesson.title}</div>
                      <div className="text-dim text-xs mt-1">{nextLesson.module_title}</div>
                    </div>
                    <Link href={`/cours/${nextLesson.id}`} className="cta mt-4 inline-block text-center bg-accent text-white font-semibold rounded-lg px-5 py-2.5 text-sm">Continuer ▸</Link>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-2xl mb-1">🎉</div>
                    <div className="font-semibold">Formation terminée !</div>
                    <div className="text-dim text-sm">Bravo, tu as tout complété.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[["Leçons terminées", `${doneCount}/${total}`], ["Modules complétés", `${modulesDone}/${modulesArr.length}`], ["Progression", `${pct}%`]].map(([l, v]) => (
                <div key={l} className="bg-panel border border-line rounded-xl p-4 text-center">
                  <div className="font-mono text-xl md:text-2xl font-semibold text-accent2">{v}</div>
                  <div className="text-dim text-[11px] md:text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modules */}
        <div className="space-y-4">
          {modulesArr.map(([order, mod]) => {
            const dTotal = mod.items.length;
            const dDone = mod.items.filter(l => doneSet.has(l.id)).length;
            const mPct = dTotal ? Math.round((dDone / dTotal) * 100) : 0;
            return (
              <details key={order} open={order === openModule} className="bg-panel border border-line rounded-2xl overflow-hidden group">
                <summary className="cursor-pointer flex items-center gap-4 px-5 py-4 list-none">
                  <span className="font-mono text-sm text-accent2 shrink-0">{String(order).padStart(2, "0")}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold truncate">{mod.title}</span>
                    <span className="flex items-center gap-2 mt-1.5">
                      <span className="flex-1 h-1.5 bg-line rounded-full overflow-hidden max-w-[200px]"><span className="block h-full bg-accent" style={{ width: `${mPct}%` }} /></span>
                      <span className="font-mono text-[11px] text-faint">{dDone}/{dTotal}</span>
                    </span>
                  </span>
                  <span className="text-accent2 font-mono group-open:rotate-45 transition shrink-0">+</span>
                </summary>
                <ul className="border-t border-line">
                  {mod.items.map(l => {
                    const locked = !hasAccess && !l.is_free;
                    const isDone = doneSet.has(l.id);
                    return (
                      <li key={l.id} className="border-b border-line/50 last:border-0">
                        {locked ? (
                          <div className="px-5 py-3 flex items-center gap-3 text-faint">
                            <span>🔒</span><span className="text-sm flex-1">{l.title}</span>
                            {l.duration && <span className="font-mono text-xs">{l.duration}</span>}
                          </div>
                        ) : (
                          <Link href={`/cours/${l.id}`} className="px-5 py-3 flex items-center gap-3 hover:bg-panel2">
                            <span className={isDone ? "text-accent2" : "text-dim"}>{isDone ? "✓" : "▸"}</span>
                            <span className="text-sm flex-1">{l.title}</span>
                            {l.duration && <span className="font-mono text-xs text-faint">{l.duration}</span>}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
      </main>
    </div>
  );
}
