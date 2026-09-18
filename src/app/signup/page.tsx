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
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password: pw });
    setLoading(false);
    if (error) return setErr(error.message);
    // Si la confirmation email est activee dans Supabase, il n'y a pas encore de session.
    if (!data.session) return setMsg("Compte cree. Verifie ta boite mail pour confirmer, puis connecte-toi.");
    router.push("/dashboard"); router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Creer un compte</h1>
        <p className="text-dim text-sm mb-6">Rejoins Le Campus du Trading.</p>
        {err && <p className="text-down text-sm mb-4">{err}</p>}
        {msg && <p className="text-accent2 text-sm mb-4">{msg}</p>}
        <input className="w-full mb-3 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
          type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full mb-5 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
          type="password" placeholder="Mot de passe (8+ caracteres)" value={pw} onChange={e=>setPw(e.target.value)} minLength={8} required />
        <button disabled={loading} className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 disabled:opacity-60">
          {loading ? "..." : "Creer mon compte"}
        </button>
        <p className="text-dim text-sm mt-5 text-center">
          Deja inscrit ? <Link href="/login" className="text-accent2">Se connecter</Link>
        </p>
      </form>
    </main>
  );
}
