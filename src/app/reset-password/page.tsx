"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { frError } from "@/lib/authErrors";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();
  const [pw, setPw] = useState(""); const [show, setShow] = useState(false);
  const [err, setErr] = useState(""); const [msg, setMsg] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setMsg(""); setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) { setErr(frError(error.message)); return; }
      setMsg("Mot de passe mis à jour ! Redirection...");
      setTimeout(() => { router.push("/dashboard"); router.refresh(); }, 1200);
    } catch {
      setErr("Le lien a peut-être expiré. Redemande un email de réinitialisation.");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 gap-6">
      <Link href="/" className="flex items-center gap-2.5"><img src="/images/logo.png" alt="" className="h-9 w-9" /><span className="font-extrabold text-lg metal">Le Campus du Trading</span></Link>
      <form onSubmit={submit} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1">Nouveau mot de passe</h1>
        <p className="text-dim text-sm mb-6">Choisis ton nouveau mot de passe.</p>
        {err && <div className="flex items-start gap-2 text-sm mb-4 bg-[#3A1420] border border-[#7A2438] text-[#FF8A9B] rounded-lg px-3 py-2.5"><span>⚠</span><span>{err}</span></div>}
        {msg && <div className="text-accent2 text-sm mb-4 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2.5">{msg}</div>}
        <div className="relative mb-5">
          <input className="w-full bg-bg border border-line2 rounded-lg px-4 py-3 pr-12 text-sm outline-none focus:border-accent"
            type={show ? "text" : "password"} placeholder="Nouveau mot de passe (8+)" value={pw} onChange={e=>setPw(e.target.value)} minLength={8} required />
          <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-ink text-sm">{show ? "🙈" : "👁"}</button>
        </div>
        <button disabled={loading} className="w-full bg-accent text-white font-semibold rounded-lg py-3 hover:opacity-90 disabled:opacity-60">
          {loading ? "..." : "Valider"}
        </button>
      </form>
    </main>
  );
}
