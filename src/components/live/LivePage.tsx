"use client";

import { useLiveScores } from "@/hooks/useLiveScores";
import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Radio } from "lucide-react";

export function LivePage() {
  const { liveMatches, connected, lastUpdated } = useLiveScores();
  const live = liveMatches.filter((m) => m.matchStarted && !m.matchEnded);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-red-500" />
          <h1 className="font-display text-2xl font-bold">Live Scores</h1>
        </div>
        <p className="text-xs text-muted-foreground">
          {connected ? (
            <>
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1 live-pulse" />
              Connected · Updates every 30s
              {lastUpdated && ` · Last: ${lastUpdated.toLocaleTimeString("en-IN")}`}
            </>
          ) : (
            <>
              <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 mr-1" />
              Connecting...
            </>
          )}
        </p>
      </div>

      {/* Loading skeleton */}
      {!connected && !live.length && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-[#253570] bg-[#1A2B5F]/20 p-4">
              <Skeleton className="mb-3 h-4 w-1/3" />
              <Skeleton className="mb-2 h-10 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* No live matches */}
      {connected && !live.length && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <Radio className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <h2 className="font-semibold">No live matches right now</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {liveMatches.length > 0
              ? `${liveMatches.length} match${liveMatches.length > 1 ? "es" : ""} recently ended`
              : "Check back when matches are scheduled"}
          </p>
        </div>
      )}

      {/* Live match grid */}
      {live.length > 0 && (
        <>
          <p className="mb-4 text-sm text-muted-foreground">{live.length} match{live.length > 1 ? "es" : ""} in progress</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
