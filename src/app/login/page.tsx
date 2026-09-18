"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setLoading(false);
    if (error) return setErr("Email ou mot de passe incorrect.");
    router.push(next); router.refresh();
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
      <h1 className="text-2xl font-bold mb-1">Connexion</h1>
      <p className="text-dim text-sm mb-6">Accede a ton espace eleve.</p>
      {err && <p className="text-down text-sm mb-4">{err}</p>}
      <input className="w-full mb-3 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
        type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input className="w-full mb-5 bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent"
        type="password" placeholder="Mot de passe" value={pw} onChange={e=>setPw(e.target.value)} required />
      <button disabled={loading} className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 disabled:opacity-60">
        {loading ? "..." : "Se connecter"}
      </button>
      <p className="text-dim text-sm mt-5 text-center">
        Pas encore de compte ? <Link href="/signup" className="text-accent2">Creer un compte</Link>
      </p>
    </form>
  );
}

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
