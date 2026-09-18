import { NextResponse } from "next/server";

// Indices/actions/or liquides (proxys de l'ES/NQ, dispo en temps reel sur le plan gratuit Finnhub)
const SYMS: [string, string][] = [
  ["SPY", "S&P 500"], ["QQQ", "NASDAQ"], ["DIA", "DOW"], ["IWM", "RUSSELL"],
  ["NVDA", "NVDA"], ["AAPL", "AAPL"], ["TSLA", "TSLA"], ["MSFT", "MSFT"],
  ["GLD", "GOLD"], ["AMZN", "AMZN"],
];

let cache: { t: number; data: unknown[] } = { t: 0, data: [] };

export async function GET() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return NextResponse.json({ items: [] });

  const now = Date.now();
  if (now - cache.t < 12000 && cache.data.length) return NextResponse.json({ items: cache.data });

  try {
    const items = await Promise.all(
      SYMS.map(async ([sym, label]) => {
        const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${sym}&token=${key}`, { cache: "no-store" });
        const q = await r.json();
        return { label, price: q.c, change: q.d, pct: q.dp };
      })
    );
    const clean = items.filter((i) => i.price);
    if (clean.length) cache = { t: now, data: clean };
    return NextResponse.json({ items: clean });
  } catch {
    return NextResponse.json({ items: cache.data });
  }
}
