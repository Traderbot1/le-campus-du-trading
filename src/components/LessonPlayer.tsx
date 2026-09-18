"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  lessonId: string;
  videoUrl: string | null;
  watermark: string;
  initialPosition: number;
  completed: boolean;
};

export default function LessonPlayer({ lessonId, videoUrl, watermark, initialPosition, completed }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const lastSaved = useRef(0);
  const [done, setDone] = useState(completed);
  const [pos, setPos] = useState({ x: 12, y: 10 });

  // Reprise : place la video la ou l'eleve s'etait arrete
  useEffect(() => {
    const v = ref.current;
    if (v && initialPosition > 0) {
      const onMeta = () => { try { v.currentTime = initialPosition; } catch {} };
      v.addEventListener("loadedmetadata", onMeta, { once: true });
    }
  }, [initialPosition]);

  // Watermark qui se deplace lentement (dissuasion)
  useEffect(() => {
    const id = setInterval(() => {
      setPos({ x: 8 + Math.random() * 78, y: 8 + Math.random() * 78 });
    }, 8000);
    return () => clearInterval(id);
  }, []);

  async function save(positionSeconds: number, complete: boolean) {
    await fetch("/api/progress", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, positionSeconds, completed: complete }),
    });
  }

  function onTime(e: React.SyntheticEvent<HTMLVideoElement>) {
    const v = e.currentTarget;
    // sauvegarde la position toutes les ~15s
    if (v.currentTime - lastSaved.current > 15) {
      lastSaved.current = v.currentTime;
      save(v.currentTime, done);
    }
    // marque termine a 90%
    if (!done && v.duration && v.currentTime / v.duration > 0.9) {
      setDone(true); save(v.currentTime, true);
    }
  }

  if (!videoUrl) {
    return (
      <div className="aspect-video w-full rounded-xl bg-panel border border-line flex items-center justify-center text-dim">
        Video bientot disponible.
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-line bg-black">
      <video ref={ref} src={videoUrl} controls controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()} onTimeUpdate={onTime}
        className="w-full aspect-video" />
      {/* Watermark email : trace toute fuite jusqu'a l'acheteur */}
      <div className="pointer-events-none absolute text-white/25 text-xs font-mono transition-all duration-[3000ms]"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
        {watermark}
      </div>
      {done && <span className="absolute top-3 right-3 bg-accent/90 text-white text-xs px-2 py-1 rounded">✓ Termine</span>}
    </div>
  );
}
