"use client";

import { useLiveScores } from "@/hooks/useLiveScores";
import type { CricAPIMatch } from "@/types/cricapi";

function formatTickerScore(match: CricAPIMatch): string {
  const scores = match.score?.map((s) => `${s.inning.split(" ")[0]}: ${s.r}/${s.w} (${s.o})`).join(" | ");
  return `${match.name} — ${scores ?? match.status}`;
}

export function LiveTicker() {
  const { liveMatches } = useLiveScores();

  if (!liveMatches.length) return null;

  const items = liveMatches.filter((m) => !m.matchEnded);
  if (!items.length) return null;

  return (
    <div className="overflow-hidden border-b border-[#253570] bg-[#0F1A3D] py-1.5">
      <div className="ticker-animate flex whitespace-nowrap">
        {[...items, ...items].map((match, idx) => (
          <span key={`${match.id}-${idx}`} className="mr-8 text-xs text-[#FDB913]">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-500 live-pulse" />
            {formatTickerScore(match)}
          </span>
        ))}
      </div>
    </div>
  );
}
