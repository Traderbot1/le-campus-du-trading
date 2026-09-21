"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { frError } from "@/lib/authErrors";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(""); const [msg, setMsg] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setMsg(""); setLoading(true);
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) { setErr(frError(error.message)); return; }
      setMsg("Si un compte existe avec cet email, tu recevras un lien pour réinitialiser ton mot de passe.");
    } catch {
      setErr("Problème de connexion au serveur. Réessaie.");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 gap-6">
      <Link href="/login" className="text-dim text-sm hover:text-ink">← Retour à la connexion</Link>
      <Link href="/" className="flex items-center gap-2.5"><img src="/images/logo.png" alt="" className="h-9 w-9" /><span className="font-extrabold text-lg metal">Le Campus du Trading</span></Link>
      <form onSubmit={submit} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Mot de passe oublié</h1>
        <p className="text-dim text-sm mb-6">Entre ton email, on t'envoie un lien de réinitialisation.</p>
        {err && <div className="flex items-start gap-2 text-sm mb-4 bg-[#3A1420] border border-[#7A2438] text-[#FF8A9B] rounded-lg px-3 py-2.5"><span>⚠</span><span>{err}</span></div>}
        {msg && <div className="text-accent2 text-sm mb-4 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2.5">{msg}</div>}
        <input className="w-full mb-5 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
          type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <button disabled={loading} className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 disabled:opacity-60">
          {loading ? "Envoi..." : "Envoyer le lien"}
        </button>
      </form>
    </main>
  );
}
