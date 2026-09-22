"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { frError } from "@/lib/authErrors";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => { if (data.session) router.replace("/dashboard"); });
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) { setErr(frError(error.message)); return; }
      router.push(next); router.refresh();
    } catch {
      setErr("Problème de connexion au serveur. Réessaie.");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-1">Connexion</h1>
      <p className="text-dim text-sm mb-6">Accède à ton espace élève.</p>
      {err && (
        <div className="flex items-start gap-2 text-sm mb-4 bg-[#3A1420] border border-[#7A2438] text-[#FF8A9B] rounded-lg px-3 py-2.5">
          <span>⚠</span><span>{err}</span>
        </div>
      )}
      <input className="w-full mb-3 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
        type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <div className="relative mb-2">
        <input className="w-full bg-bg border border-line2 rounded-lg px-4 py-3 pr-12 text-sm outline-none focus:border-accent"
          type={show ? "text" : "password"} placeholder="Mot de passe" value={pw} onChange={e=>setPw(e.target.value)} required />
        <button type="button" onClick={()=>setShow(s=>!s)} aria-label="Afficher le mot de passe"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-ink text-sm">
          {show ? "🙈" : "👁"}
        </button>
      </div>
      <div className="text-right mb-5">
        <Link href="/mot-de-passe-oublie" className="text-accent2 text-xs hover:underline">Mot de passe oublié ?</Link>
      </div>
      <button disabled={loading} className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 disabled:opacity-60">
        {loading ? "Connexion..." : "Se connecter"}
      </button>
      <p className="text-dim text-sm mt-5 text-center">
        Pas encore de compte ? <Link href="/signup" className="text-accent2">Créer un compte</Link>
      </p>
    </form>
  );
}

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 gap-6">
      <Link href="/" className="text-dim text-sm hover:text-ink">← Retour au site</Link>
      <Link href="/" className="flex items-center gap-2.5"><img src="/images/logo.png" alt="" className="h-9 w-9" /><span className="font-extrabold text-lg metal">Le Campus du Trading</span></Link>
      <Suspense><LoginForm /></Suspense>
    </main>
  );
}
