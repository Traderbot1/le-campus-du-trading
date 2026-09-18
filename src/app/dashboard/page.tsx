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

  const { data: lessons } = await supabase.from("lessons").select("*").order("module_order").order("lesson_order");
  const { data: prog } = await supabase.from("progress").select("lesson_id, completed").eq("user_id", user.id);
  const doneSet = new Set((prog || []).filter(p => p.completed).map(p => p.lesson_id));

  // Groupe par module
  const modules = new Map<number, { title: string; items: Lesson[] }>();
  (lessons as Lesson[] || []).forEach(l => {
    if (!modules.has(l.module_order)) modules.set(l.module_order, { title: l.module_title, items: [] });
    modules.get(l.module_order)!.items.push(l);
  });
  const total = (lessons || []).length;
  const doneCount = (lessons || []).filter(l => doneSet.has(l.id)).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-xs text-faint">LE CAMPUS DU TRADING</div>
          <h1 className="text-2xl font-bold metal">Ton espace</h1>
        </div>
        <form action="/auth/signout" method="post">
          <button className="text-dim text-sm border border-line2 rounded-lg px-4 py-2 hover:text-ink">Deconnexion</button>
        </form>
      </header>

      {!hasAccess && (
        <div className="bg-panel border border-accent/40 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-1">Debloque la formation complete</h2>
          <p className="text-dim text-sm mb-4">8 modules, 35+ lecons, acces a vie. Paiement unique securise par Stripe.</p>
          <BuyButton />
        </div>
      )}

      {hasAccess && (
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2"><span className="text-dim">Progression</span><span className="font-mono text-accent2">{pct}%</span></div>
          <div className="h-2 bg-panel rounded-full overflow-hidden"><div className="h-full bg-accent" style={{ width: `${pct}%` }} /></div>
        </div>
      )}

      <div className="space-y-5">
        {[...modules.entries()].map(([order, mod]) => (
          <section key={order} className="bg-panel border border-line rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-line flex items-center gap-3">
              <span className="font-mono text-accent2 text-sm">{String(order).padStart(2, "0")}</span>
              <h3 className="font-semibold">{mod.title}</h3>
            </div>
            <ul>
              {mod.items.map(l => {
                const locked = !hasAccess && !l.is_free;
                const isDone = doneSet.has(l.id);
                return (
                  <li key={l.id} className="border-b border-line/60 last:border-0">
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
          </section>
        ))}
      </div>
    </main>
  );
}
