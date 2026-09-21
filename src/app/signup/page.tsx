"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [err, setErr] = useState(""); const [msg, setMsg] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setMsg(""); setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({ email, password: pw });
      if (error) { setErr(error.message); return; }
      if (!data.session) {
        setMsg("Compte créé ! Tu peux maintenant te connecter.");
        return;
      }
      router.push("/dashboard"); router.refresh();
    } catch (e: unknown) {
      setErr("Erreur : " + (e instanceof Error ? e.message : "réessaie."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 gap-6">
      <Link href="/" className="text-dim text-sm hover:text-ink">← Retour au site</Link>
      <Link href="/" className="flex items-center gap-2.5"><img src="/images/logo.png" alt="" className="h-9 w-9" /><span className="font-extrabold text-lg metal">Le Campus du Trading</span></Link>
      <form onSubmit={submit} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Créer un compte</h1>
        <p className="text-dim text-sm mb-6">Rejoins Le Campus du Trading.</p>
        {err && <p className="text-down text-sm mb-4 bg-down/10 border border-down/30 rounded-lg px-3 py-2">{err}</p>}
        {msg && <p className="text-accent2 text-sm mb-4 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2">{msg} <Link href="/login" className="underline">Se connecter</Link></p>}
        <input className="w-full mb-3 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
          type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full mb-5 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
          type="password" placeholder="Mot de passe (8+ caractères)" value={pw} onChange={e=>setPw(e.target.value)} minLength={8} required />
        <button disabled={loading} className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 disabled:opacity-60">
          {loading ? "Création..." : "Créer mon compte"}
        </button>
        <p className="text-dim text-sm mt-5 text-center">
          Déjà inscrit ? <Link href="/login" className="text-accent2">Se connecter</Link>
        </p>
      </form>
    </main>
  );
}
