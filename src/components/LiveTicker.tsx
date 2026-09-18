"use client";
import { useEffect, useState } from "react";

type Item = { label: string; price: number; change: number; pct: number };

const FALLBACK: Item[] = [
  { label: "S&P 500", price: 5412.25, change: 12.5, pct: 0.23 },
  { label: "NASDAQ", price: 19204.5, change: 44.2, pct: 0.23 },
  { label: "DOW", price: 41230, change: -60, pct: -0.15 },
  { label: "GOLD", price: 2410, change: 8, pct: 0.33 },
  { label: "NVDA", price: 142.3, change: 1.8, pct: 1.28 },
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
