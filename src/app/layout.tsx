import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Le Campus du Trading — Order Flow, Volume Profile & TPO",
  description:
    "La formation complete pour lire le carnet d'ordres, le volume au prix et le footprint. Sur NinjaTrader, de A a Z.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
