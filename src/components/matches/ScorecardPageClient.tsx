"use client";

import { useMatchScorecard } from "@/hooks/useMatchScorecard";
import { MatchHeader } from "@/components/match/MatchHeader";
import { ScorecardTable } from "@/components/match/ScorecardTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export function ScorecardPageClient({ matchId }: { matchId: string }) {
  const { data: match, isLoading, isError, dataUpdatedAt } = useMatchScorecard(matchId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Back */}
      <Link href="/matches" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        All Matches
      </Link>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      )}

      {isError && <ErrorState title="Match not found" message="Could not load this match. It may not exist or the API limit has been reached." />}

      {match && (
        <div className="space-y-6">
          {/* Match header with scores */}
          <MatchHeader match={match} />

          {/* Last updated */}
          {dataUpdatedAt && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3" />
              Updated {new Date(dataUpdatedAt).toLocaleTimeString("en-IN")}
              {match.matchStarted && !match.matchEnded && " · Auto-refreshing every 30s"}
            </div>
          )}

          {/* Scorecard */}
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="mb-4 font-display text-lg font-bold">Scorecard</h2>
            <ScorecardTable scorecard={match.scorecard ?? []} />
          </div>
        </div>
      )}
    </div>
  );
}
