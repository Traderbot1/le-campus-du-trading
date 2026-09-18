"use client";
import { useState } from "react";

export default function BuyButton({ className = "", label = "Debloquer la formation — 995 €" }: { className?: string; label?: string }) {
  const [loading, setLoading] = useState(false);
  async function buy() {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const { url, error } = await res.json();
    if (url) window.location.href = url;
    else { setLoading(false); alert(error || "Erreur, reessaie."); }
  }
  return (
    <button onClick={buy} disabled={loading}
      className={`bg-accent text-white font-semibold rounded-lg px-6 py-3 hover:opacity-90 disabled:opacity-60 ${className}`}>
      {loading ? "Redirection..." : label}
    </button>
  );
}
