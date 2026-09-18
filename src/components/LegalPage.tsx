import Link from "next/link";

export default function LegalPage({ title, updated, children }:
  { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <header className="border-b border-line sticky top-0 bg-bg/85 backdrop-blur z-40">
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="" className="h-7 w-7" />
            <span className="font-extrabold metal">Le Campus du Trading</span>
          </Link>
          <Link href="/" className="text-dim text-sm hover:text-ink">← Retour au site</Link>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-5 py-14 legal">
        <h1 className="text-3xl font-extrabold mb-2">{title}</h1>
        {updated && <p className="font-mono text-xs text-faint mb-8">{updated}</p>}
        {children}
      </article>
    </main>
  );
}
