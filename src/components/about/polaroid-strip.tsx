"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type Tile = { id: string; rotate: number; label: string; detail: string; mark: string };

const TILES: Tile[] = [
  { id: "diploma", rotate: -8, label: "DIPLOMA", detail: "DVS Polytechnic · CSE", mark: "'20" },
  { id: "degree", rotate: 6, label: "B.E. CSE", detail: "EWIT · CGPA 8.26", mark: "'23" },
  { id: "research", rotate: -4, label: "RESEARCH", detail: "Paper in IJSART", mark: "'24" },
  { id: "internships", rotate: 7, label: "INTERNSHIPS", detail: "Dyashin · Infosys", mark: "'25" },
  { id: "shipped", rotate: -6, label: "SHIPPED", detail: "Arogya, live", mark: "'26" },
  { id: "now", rotate: 5, label: "NEXT", detail: "First full-time SWE role", mark: "→" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FocusCard({ tile, index }: { tile: Tile; index: number }): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (value) => `${value}px`);
  const ty = useTransform(sy, (value) => `${value}px`);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(Math.max(-10, Math.min(10, (event.clientX - rect.left - rect.width / 2) * 0.16)));
    my.set(Math.max(-10, Math.min(10, (event.clientY - rect.top - rect.height / 2) * 0.16)));
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -50, filter: "blur(12px)", rotate: tile.rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: tile.rotate }}
      transition={{ duration: 0.8, delay: 0.05 + index * 0.07, ease: EASE }}
      style={{ x: tx, y: ty, rotate: tile.rotate }}
      className="relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-background p-1.5 dark:border-white/15 dark:bg-neutral-900"
      aria-hidden="true"
    >
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-foreground/5 bg-foreground/2 p-3.5 dark:bg-foreground/4 sm:p-4">
        <DottedPattern className="pointer-events-none absolute inset-0 opacity-50" size={11} />
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/8 bg-background/90 text-[11px] font-semibold text-foreground/55">
          {tile.mark}
        </div>
        <div className="relative">
          <p className="font-mono text-[10px] font-medium tracking-[0.12em] text-foreground/70 sm:text-[11px]">{tile.label}</p>
          <p className="mt-1 text-[9px] leading-snug tracking-tight text-foreground/45 sm:text-[10px]">{tile.detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8" aria-label="Career chapters, 2020 to now">
      {TILES.map((tile, index) => <FocusCard key={tile.id} tile={tile} index={index} />)}
    </div>
  );
}
