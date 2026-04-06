"use client";

import Link from "next/link";
import { LiveBadge } from "@/components/shared/LiveBadge";
import type { CricAPIMatch } from "@/types/cricapi";

interface LiveMatchCardProps {
  match: CricAPIMatch;
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  const [team1, team2] = match.teams ?? ["TBD", "TBD"];
  const team1Score = match.score?.find((s) => s.inning.includes(team1));
  const team2Score = match.score?.find((s) => s.inning.includes(team2));

  const team1Info = match.teamInfo?.find((t) => t.name === team1 || team1.includes(t.shortname));
  const team2Info = match.teamInfo?.find((t) => t.name === team2 || team2.includes(t.shortname));

  return (
    <Link href={`/matches/${match.id}`}>
      <div className="group relative overflow-hidden rounded-xl border border-[#253570] bg-gradient-to-br from-[#1A2B5F] to-[#0F1A3D] p-4 shadow-md transition-all hover:border-[#FDB913]/50 hover:shadow-[#FDB913]/10 hover:shadow-lg">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-white/50 uppercase tracking-wide">
            {match.matchType?.toUpperCase()} · {match.venue?.split(",")[0]}
          </span>
          <LiveBadge />
        </div>

        {/* Teams & Scores */}
        <div className="space-y-2">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {team1Info?.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={team1Info.img} alt={team1} className="h-6 w-6 rounded-full object-cover" />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#253570] text-xs font-bold text-white">
                  {team1.charAt(0)}
                </div>
              )}
              <span className="text-sm font-semibold text-white">{team1Info?.shortname ?? team1}</span>
            </div>
            {team1Score ? (
              <span className="font-mono text-base font-bold text-[#FDB913]">
                {team1Score.r}/{team1Score.w}
                <span className="ml-1 text-xs font-normal text-white/50">({team1Score.o} ov)</span>
              </span>
            ) : (
              <span className="text-sm text-white/30">Yet to bat</span>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {team2Info?.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={team2Info.img} alt={team2} className="h-6 w-6 rounded-full object-cover" />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#253570] text-xs font-bold text-white">
                  {team2.charAt(0)}
                </div>
              )}
              <span className="text-sm font-semibold text-white">{team2Info?.shortname ?? team2}</span>
            </div>
            {team2Score ? (
              <span className="font-mono text-base font-bold text-white">
                {team2Score.r}/{team2Score.w}
                <span className="ml-1 text-xs font-normal text-white/50">({team2Score.o} ov)</span>
              </span>
            ) : (
              <span className="text-sm text-white/30">Yet to bat</span>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-3 border-t border-white/10 pt-2">
          <p className="text-xs text-white/60 line-clamp-1">{match.status}</p>
        </div>

        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-[#FDB913] transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  );
}
