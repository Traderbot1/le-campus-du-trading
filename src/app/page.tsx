import Link from "next/link";
import { MODULES } from "@/lib/curriculum";

export default function Home() {
  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-extrabold metal">Le Campus du Trading</span>
          <nav className="hidden md:flex gap-7 text-sm text-dim">
            <a href="#programme" className="hover:text-ink">Programme</a>
            <a href="#tarif" className="hover:text-ink">Tarif</a>
            <Link href="/login" className="hover:text-ink">Connexion</Link>
          </nav>
          <Link href="/signup" className="bg-accent text-white text-sm font-semibold rounded-lg px-4 py-2">Acceder — 995 €</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(700px 420px at 78% 6%, rgba(124,77,255,.28), transparent 62%)" }} />
        <div className="max-w-6xl mx-auto px-5 py-20">
          <span className="inline-block font-mono text-xs text-accent2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1.5 mb-6">
            Order Flow · Volume Profile · TPO
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.03] tracking-tight max-w-3xl">
            Arrete de trader a l&apos;aveugle.<br /><span className="metal">Lis le flux, comme les pros.</span>
          </h1>
          <p className="text-dim text-lg mt-5 max-w-xl">
            La formation pour lire le carnet d&apos;ordres, le volume au prix et le footprint — et entrer la ou les institutionnels agissent. Sur NinjaTrader, de A a Z.
          </p>
          <div className="flex gap-3 mt-8">
            <Link href="/signup" className="bg-accent text-white font-semibold rounded-lg px-6 py-3">Acceder a la formation — 995 €</Link>
            <a href="#programme" className="border border-line2 rounded-lg px-6 py-3 font-semibold">Voir les 8 modules</a>
          </div>
          <p className="font-mono text-xs text-faint mt-5">Acces a vie · Videos protegees · Paiement Stripe</p>
        </div>
      </section>

      {/* PROGRAMME */}
      <section id="programme" className="max-w-4xl mx-auto px-5 py-20">
        <div className="font-mono text-xs text-accent2 mb-3">Le programme</div>
        <h2 className="text-3xl font-extrabold mb-8">8 modules · 35+ lecons</h2>
        <div className="space-y-3">
          {MODULES.map(m => (
            <details key={m.n} className="bg-panel border border-line rounded-xl group">
              <summary className="cursor-pointer list-none flex items-center gap-4 px-5 py-4">
                <span className="font-mono text-sm text-accent2">{m.n}</span>
                <span className="flex-1">
                  <span className="block font-semibold">{m.title}</span>
                  <span className="block font-mono text-xs text-faint">{m.meta}</span>
                </span>
                <span className="text-accent2 font-mono group-open:rotate-45 transition">+</span>
              </summary>
              <ul className="px-5 pb-4 border-t border-line pt-2">
                {m.lessons.map((l, i) => (
                  <li key={i} className="flex items-center gap-3 py-2 text-sm text-dim border-b border-line/50 last:border-0">
                    <span className="text-accent2 text-xs">▸</span><span className="flex-1">{l.title}</span>
                    {l.tm && <span className="font-mono text-xs text-faint">{l.tm}</span>}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      {/* TARIF */}
      <section id="tarif" className="border-t border-line py-20">
        <div className="max-w-md mx-auto px-5">
          <div className="bg-panel border border-line2 rounded-2xl overflow-hidden">
            <div className="bg-accent/10 border-b border-accent/30 px-6 py-3 font-mono text-xs text-accent2 flex justify-between">
              <span>ACCES COMPLET</span><span>A VIE</span>
            </div>
            <div className="p-8">
              <div className="flex items-baseline gap-2 mb-1"><span className="text-5xl font-extrabold">995</span><span className="text-xl text-dim">€</span></div>
              <p className="font-mono text-xs text-dim mb-6">paiement unique · ou 3× 332 € sans frais</p>
              <ul className="space-y-3 mb-7 text-sm">
                {["Les 8 modules — 35+ lecons video","Videos protegees dans ton espace","Setups & plan de trade inclus","Parametrage NinjaTrader pas a pas","Mises a jour a vie"].map(t => (
                  <li key={t} className="flex gap-2"><span className="text-accent2">✓</span>{t}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-accent text-white font-semibold rounded-lg py-4">Acceder a la formation — 995 €</Link>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="border-t border-line py-8">
        <p className="max-w-3xl mx-auto px-5 font-mono text-[11px] text-faint leading-relaxed">
          Avertissement — Le trading comporte un risque eleve de perte en capital. Les performances passees ne prejugent pas des performances futures. Cette formation est strictement educative et ne constitue pas un conseil en investissement.
        </p>
      </div>
    </main>
  );
}
