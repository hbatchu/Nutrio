import { LiveBadge } from "@/components/shared/LiveBadge";
import { Badge } from "@/components/ui/badge";
import type { CricAPIScorecard } from "@/types/cricapi";

export function MatchHeader({ match }: { match: CricAPIScorecard }) {
  const isLive = match.matchStarted && !match.matchEnded;

  return (
    <div className="csk-gradient rounded-xl p-5 text-white shadow-lg">
      {/* Match type + venue */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="border-white/30 text-white/70 text-xs">
          {match.matchType?.toUpperCase()}
        </Badge>
        {isLive && <LiveBadge />}
        <span className="text-xs text-white/50">{match.venue}</span>
      </div>

      {/* Title */}
      <h1 className="mb-2 font-display text-xl font-bold leading-tight">{match.name}</h1>

      {/* Scores */}
      {match.score && match.score.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-3">
          {match.score.map((s) => (
            <div key={s.inning} className="flex flex-col">
              <span className="text-xs text-white/50">{s.inning}</span>
              <span className="font-mono text-2xl font-black text-[#FDB913]">
                {s.r}/{s.w}
                <span className="ml-1 text-sm font-normal text-white/60">({s.o} ov)</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Status */}
      <p className="mt-3 text-sm text-white/70">{match.status}</p>

      {/* Toss */}
      {match.tossResults && (
        <p className="mt-1 text-xs text-white/40">
          Toss: {match.tossResults.tossWinner} won and chose to {match.tossResults.tossDecision}
        </p>
      )}
    </div>
  );
}
