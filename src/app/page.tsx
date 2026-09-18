import Link from "next/link";
import { MODULES } from "@/lib/curriculum";

const TICK = ["ES 5 412.25 ▲","NQ 19 204.5 ▲","CL 78.42 ▼","POC 5 408.00","VAH 5 421 · VAL 5 395","DELTA +12 480","ABSORPTION 5 396"];

const SHOTS = [
  { src: "/images/tpo.webp", t: "TPO / Market Profile", d: "Zones de valeur : TPO VAH, POC et VAL identifiés sur la séance." },
  { src: "/images/volume-profile.webp", t: "Volume Profile", d: "VAH, vPOC et VAL — où le volume s'échange vraiment." },
  { src: "/images/footprint.webp", t: "Order Flow / Footprint", d: "Le carnet vu de l'intérieur : delta, absorption, imbalances." },
  { src: "/images/vwap.webp", t: "VWAP", d: "Le niveau clé suivi par les institutionnels, en exécution." },
];

const OUTS = [
  { n: "01", t: "Lire le Volume Profile", d: "POC, VAH/VAL, HVN/LVN et les shapes (D, P, b, B)." },
  { n: "02", t: "Décoder l'Order Flow", d: "Footprint, delta, absorption, épuisement, imbalances." },
  { n: "03", t: "Cadrer avec le TPO", d: "Structure de séance et zones d'intervention à surveiller." },
  { n: "04", t: "Utiliser le VWAP", d: "Niveaux clés et exécution sur les rejets et confirmations." },
  { n: "05", t: "Lire le Gamma Exposure", d: "Combo Walls et zones de confluence du flux d'options." },
  { n: "06", t: "Exécuter avec un plan", d: "Setups sur zones, routine, scénario et discipline." },
];

export default function Home() {
  return (
    <main>
      {/* TICKER */}
      <div className="border-b border-line bg-[#06040C] overflow-hidden">
        <div className="tape-track py-2 font-mono text-xs text-dim">
          {[...TICK, ...TICK].map((s, i) => <span key={i} className="mx-5">{s}</span>)}
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-extrabold metal">Le Campus du Trading</span>
          <nav className="hidden md:flex gap-7 text-sm text-dim">
            <a href="#methode" className="hover:text-ink">Méthode</a>
            <a href="#programme" className="hover:text-ink">Programme</a>
            <a href="#tarif" className="hover:text-ink">Tarif</a>
            <Link href="/login" className="hover:text-ink">Connexion</Link>
          </nav>
          <Link href="/signup" className="bg-accent text-white text-sm font-semibold rounded-lg px-4 py-2">Accéder — 995 €</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(700px 420px at 78% 6%, rgba(124,77,255,.28), transparent 62%)" }} />
        <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block font-mono text-xs text-accent2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1.5 mb-6">
              Order Flow · Volume Profile · TPO
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.03] tracking-tight">
              Arrête de trader à l&apos;aveugle.<br /><span className="metal">Lis le flux, comme les pros.</span>
            </h1>
            <p className="text-dim text-lg mt-5 max-w-md">
              La formation pour lire le carnet d&apos;ordres, le volume au prix et le footprint — et entrer là où les institutionnels agissent, au lieu de deviner. Sur NinjaTrader, de A à Z.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/signup" className="bg-accent text-white font-semibold rounded-lg px-6 py-3 hover:opacity-90">Accéder à la formation — 995 € ↗</Link>
              <a href="#programme" className="border border-line2 rounded-lg px-6 py-3 font-semibold hover:border-accent">Voir les 8 modules</a>
            </div>
            <p className="font-mono text-xs text-faint mt-5">Accès à vie · Vidéos protégées · Paiement Stripe · ou 3× 332 €</p>
            <div className="flex gap-8 mt-7">
              {[["8","modules"],["35+","leçons"],["∞","accès à vie"]].map(([n,l]) => (
                <div key={l}><div className="font-mono text-2xl font-semibold">{n}</div><div className="text-sm text-dim">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line2 p-3 bg-[#0E0A1B]" style={{ boxShadow: "0 40px 90px -50px rgba(124,77,255,.6)" }}>
            <img src="/images/volume-profile.webp" alt="Analyse Volume Profile sur ES" loading="lazy" className="w-full rounded-xl border border-line" />
            <p className="font-mono text-[11px] text-faint mt-2 px-1">ES · Volume Profile — VAH / vPOC / VAL</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section id="methode" className="max-w-6xl mx-auto px-5 py-20">
        <div className="font-mono text-xs text-accent2 mb-3">Ce que tu sauras faire</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">À la fin, tu lis le marché de l&apos;intérieur.</h2>
        <p className="text-dim max-w-xl">Pas de recettes toutes faites : une grille de lecture complète que tu appliques à chaque séance.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {OUTS.map(o => (
            <div key={o.n} className="bg-panel2 border border-line rounded-xl p-6 hover:border-accent/40 transition">
              <div className="font-mono text-accent2 text-sm mb-2">// {o.n}</div>
              <h3 className="font-semibold mb-1.5">{o.t}</h3>
              <p className="text-dim text-sm">{o.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METHODE EN ACTION (captures ATAS) */}
      <section className="bg-panel border-y border-line py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="font-mono text-xs text-accent2 mb-3">La méthode en action</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Du concret, sur des vrais graphiques.</h2>
          <p className="text-dim max-w-xl">Exactement ce que tu apprendras à lire et à tracer, séance après séance.</p>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {SHOTS.map(s => (
              <figure key={s.src} className="bg-panel2 border border-line rounded-xl overflow-hidden">
                <img src={s.src} alt={s.t} loading="lazy" className="w-full border-b border-line" />
                <figcaption className="p-4">
                  <div className="font-semibold">{s.t}</div>
                  <div className="text-dim text-sm mt-1">{s.d}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRES */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="font-mono text-xs text-accent2 mb-3">Le déclic</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Le même marché. Deux lectures.</h2>
        <p className="text-dim max-w-xl">La plupart voient des bougies. Toi, tu vas voir l&apos;intention derrière chaque mouvement.</p>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <figure className="bg-panel2 border border-line rounded-xl overflow-hidden">
            <img src="/images/01-avant.webp" alt="Graphique classique" loading="lazy" className="w-full border-b border-line" />
            <figcaption className="p-4"><span className="text-dim text-sm font-mono">AVANT — des bougies, et des suppositions</span></figcaption>
          </figure>
          <figure className="bg-panel2 border border-accent/40 rounded-xl overflow-hidden">
            <img src="/images/02-apres.webp" alt="Graphique avec order flow" loading="lazy" className="w-full border-b border-line" />
            <figcaption className="p-4"><span className="text-accent2 text-sm font-mono">APRÈS — le flux d&apos;ordres, et des décisions</span></figcaption>
          </figure>
        </div>
      </section>

      {/* PROGRAMME */}
      <section id="programme" className="bg-panel border-y border-line py-20">
        <div className="max-w-4xl mx-auto px-5">
          <div className="font-mono text-xs text-accent2 mb-3">Le programme</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">8 modules · 35+ leçons</h2>
          <div className="space-y-3">
            {MODULES.map(m => (
              <details key={m.n} className="bg-panel2 border border-line rounded-xl group open:border-accent/40">
                <summary className="cursor-pointer flex items-center gap-4 px-5 py-4">
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
        </div>
      </section>

      {/* POUR QUI */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="font-mono text-xs text-accent2 mb-3">Pour qui</div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Sérieux, pas grand débutant.</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-panel2 border border-line rounded-xl p-7">
            <h3 className="text-accent2 font-semibold mb-4">C&apos;est pour toi si…</h3>
            <ul className="space-y-3 text-dim text-sm">
              {["Tu connais les bases (bougies, tendance, gestion du risque)","Tu veux comprendre pourquoi le prix bouge","Tu trades ou veux trader les futures / indices","Tu es prêt à travailler la méthode plusieurs semaines"].map(t => (
                <li key={t} className="pl-5 relative"><span className="absolute left-0 text-accent2 font-mono">—</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="bg-panel2 border border-line rounded-xl p-7">
            <h3 className="text-dim font-semibold mb-4">Ce n&apos;est pas pour toi si…</h3>
            <ul className="space-y-3 text-dim text-sm">
              {["Tu cherches des signaux clés en main à copier","Tu veux un enrichissement rapide sans effort","Tu n'as jamais ouvert de plateforme de trading","Tu ne veux prendre aucun risque de perte"].map(t => (
                <li key={t} className="pl-5 relative"><span className="absolute left-0 text-faint font-mono">×</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INSTRUCTEUR */}
      <section className="bg-panel border-y border-line py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <img src="/images/instructor.webp" alt="Hosni Ben Hassen" loading="lazy"
            className="w-full max-w-sm mx-auto rounded-2xl border border-line2"
            style={{ boxShadow: "0 40px 90px -50px rgba(124,77,255,.6)" }} />
          <div>
            <div className="font-mono text-xs text-accent2 mb-3">Ton formateur</div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-1">Hosni Ben Hassen</h2>
            <p className="font-mono text-sm text-faint mb-5">Trader &amp; développeur de stratégies algorithmiques</p>
            <p className="text-dim mb-5 max-w-xl">
              Trader depuis 2016, spécialisé en order flow sur les futures ES et NQ.
              Je développe mes propres stratégies algorithmiques sur NinjaTrader (NinjaScript),
              et je lis le marché au quotidien avec NinjaTrader et Bookmap.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Trader depuis 2016","Futures ES & NQ","Order Flow","NinjaScript","Bookmap"].map(c => (
                <span key={c} className="font-mono text-xs text-accent2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1.5">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TARIF */}
      <section id="tarif" className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(680px 380px at 50% 0%, rgba(124,77,255,.16), transparent 60%)" }} />
        <div className="max-w-md mx-auto px-5 text-center">
          <div className="font-mono text-xs text-accent2 mb-3">L&apos;investissement</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Un accès. À vie.</h2>
          <div className="bg-panel border border-line2 rounded-2xl overflow-hidden text-left" style={{ boxShadow: "0 50px 110px -55px rgba(124,77,255,.7)" }}>
            <div className="bg-accent/10 border-b border-accent/30 px-6 py-3 font-mono text-xs text-accent2 flex justify-between">
              <span>ACCÈS COMPLET</span><span>À VIE</span>
            </div>
            <div className="p-8">
              <div className="flex items-baseline gap-2 mb-1"><span className="text-5xl font-extrabold">995</span><span className="text-xl text-dim">€</span></div>
              <p className="font-mono text-xs text-dim mb-3">paiement unique · ou 3× 332 € sans frais</p>
              <p className="text-dim text-sm mb-6">Une compétence qui te suit à vie — pas un signal jetable, ni un abonnement de plus chaque mois.</p>
              <ul className="space-y-3 mb-7 text-sm">
                {["Les 8 modules — 35+ leçons vidéo","Vidéos protégées dans ton espace","Setups & plan de trade inclus","Paramétrage NinjaTrader pas à pas","Mises à jour à vie"].map(t => (
                  <li key={t} className="flex gap-2"><span className="text-accent2">✓</span>{t}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-accent text-white font-semibold rounded-lg py-4 hover:opacity-90">Accéder à la formation — 995 € ↗</Link>
              <p className="text-center font-mono text-xs text-faint mt-4">[Garantie — à définir selon ta politique]</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-panel border-y border-line py-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="font-mono text-xs text-accent2 mb-3">Questions fréquentes</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Ce que tu veux savoir.</h2>
          {[
            ["Quel niveau faut-il ?","Un niveau intermédiaire : bases maîtrisées (graphique, tendance, gestion du risque). La formation te fait passer de « je réagis » à « je lis l'intention du marché »."],
            ["Quel logiciel me faut-il ?","La formation est enseignée sur NinjaTrader (paramétrage Volume Profile et Footprint expliqué pas à pas)."],
            ["Le paiement est-il sécurisé ?","Oui, via Stripe (carte), en paiement unique ou 3×. Aucune donnée de carte n'est stockée sur le site."],
            ["Pourquoi 995 € ?","Une méthode complète — 8 modules, 35+ leçons, le paramétrage de tes outils, un accès à vie avec les mises à jour. Un paiement unique, là où un logiciel ou des « signaux » se paient tous les mois."],
            ["Le trading est-il risqué ?","Oui, risque réel de perte en capital. La formation enseigne une méthode d'analyse ; elle ne garantit aucun gain."],
          ].map(([q,a]) => (
            <details key={q} className="border-b border-line">
              <summary className="cursor-pointer flex justify-between items-center gap-4 py-5 font-medium">{q}<span className="text-accent2 font-mono">+</span></summary>
              <p className="text-dim text-sm pb-5">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* DISCLAIMER + FOOTER */}
      <div className="py-8 border-b border-line">
        <p className="max-w-3xl mx-auto px-5 font-mono text-[11px] text-faint leading-relaxed">
          Avertissement — Le trading d&apos;instruments financiers comporte un risque élevé de perte en capital et ne convient pas à tous. Les performances passées ne préjugent pas des performances futures. Cette formation est strictement éducative et ne constitue pas un conseil en investissement.
        </p>
      </div>
      <footer className="py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-wrap justify-between gap-4 text-faint text-sm">
          <span className="metal font-extrabold">Le Campus du Trading</span>
          <span className="font-mono">© 2026 · Mentions légales · CGV · Confidentialité</span>
        </div>
      </footer>
    </main>
  );
}
