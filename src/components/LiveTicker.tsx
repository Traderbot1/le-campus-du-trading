"use client";
import { useEffect, useState } from "react";

type Item = { label: string; price: number; change: number; pct: number };

const FALLBACK: Item[] = [
  { label: "SPY", price: 773.66, change: 0.15, pct: 0.02 },
  { label: "QQQ", price: 745.32, change: 3.9, pct: 0.52 },
  { label: "NVDA", price: 228.87, change: 1.5, pct: 0.66 },
  { label: "AAPL", price: 342.58, change: 3.6, pct: 1.06 },
  { label: "GLD", price: 397.9, change: -0.48, pct: -0.12 },
];

const fmt = (n: number) => (n ?? 0).toLocaleString("fr-FR", { maximumFractionDigits: 2 });

export default function LiveTicker() {
  const [items, setItems] = useState<Item[]>(FALLBACK);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch("/api/ticker");
        const j = await r.json();
        if (alive && j.items?.length) setItems(j.items);
      } catch {}
    };
    load();
    const id = setInterval(load, 15000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const row = [...items, ...items];
  return (
    <div className="border-b border-line bg-[#06040C] overflow-hidden">
      <div className="tape-track py-2 font-mono text-xs text-dim">
        {row.map((it, i) => {
          const up = (it.change ?? 0) >= 0;
          return (
            <span key={i} className="mx-5">
              {it.label}{" "}
              <span style={{ color: up ? "#2ECC71" : "#FF6B81" }}>
                {fmt(it.price)} {up ? "▲" : "▼"} {up ? "+" : ""}{(it.pct ?? 0).toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
