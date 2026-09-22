"use client";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "e57b895b-83c0-4292-b622-4b9f3b9b2d76");
    data.append("subject", "Nouveau message — Le Campus du Trading");
    data.append("from_name", "Le Campus du Trading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setSent(true); form.reset(); }
      else setErr("L'envoi a échoué. Réessaie ou écris-nous directement par email.");
    } catch {
      setErr("Problème de connexion. Réessaie ou écris-nous directement par email.");
    } finally { setLoading(false); }
  }

  if (sent) {
    return (
      <div className="bg-panel2 border border-accent/40 rounded-2xl p-8 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="text-lg font-semibold mb-1">Message envoyé !</h3>
        <p className="text-dim text-sm">Merci, on te répond au plus vite.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-panel2 border border-line rounded-2xl p-6 md:p-8 space-y-4">
      {err && <div className="flex items-start gap-2 text-sm bg-[#3A1420] border border-[#7A2438] text-[#FF8A9B] rounded-lg px-3 py-2.5"><span>⚠</span><span>{err}</span></div>}
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Ton nom"
          className="w-full bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent" />
        <input name="email" type="email" required placeholder="Ton email"
          className="w-full bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent" />
      </div>
      <textarea name="message" required rows={5} placeholder="Ton message…"
        className="w-full bg-bg border border-line2 rounded-lg px-4 py-3 text-sm outline-none focus:border-accent resize-y" />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} aria-hidden="true" />
      <button disabled={loading} className="cta w-full bg-accent text-white font-semibold rounded-lg py-3.5 disabled:opacity-60">
        {loading ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
