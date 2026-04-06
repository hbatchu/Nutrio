"use client";

import { useSeriesInfo } from "@/hooks/useSeries";
import { MatchCard } from "@/components/match/MatchCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { LoadingGrid } from "@/components/shared/LoadingGrid";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Trophy } from "lucide-react";
import Link from "next/link";

function fmt(d: string) {
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
  catch { return d; }
}

export function SeriesDetailClient({ seriesId }: { seriesId: string }) {
  const { data, isLoading, isError } = useSeriesInfo(seriesId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Link href="/series" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        All Series
      </Link>

      {isLoading && (
        <div className="space-y-4">
          <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
          <LoadingGrid count={6} />
        </div>
      )}
      {isError && <ErrorState />}

      {data && (
        <div className="space-y-6">
          {/* Series header */}
          <div className="csk-gradient rounded-xl p-6 text-white">
            <div className="flex items-start gap-3">
              <Trophy className="mt-0.5 h-6 w-6 text-[#FDB913]" />
              <div>
                <h1 className="font-display text-xl font-bold">{data.info.name}</h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.info.t20 > 0 && <Badge className="bg-white/20 text-white">{data.info.t20} T20</Badge>}
                  {data.info.odi > 0 && <Badge className="bg-white/20 text-white">{data.info.odi} ODI</Badge>}
                  {data.info.test > 0 && <Badge className="bg-white/20 text-white">{data.info.test} Test</Badge>}
                  <Badge className="bg-white/20 text-white">{data.info.matches} Total</Badge>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
                  <Calendar className="h-3.5 w-3.5" />
                  {fmt(data.info.startDate)} — {fmt(data.info.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Match list */}
          <div>
            <h2 className="mb-4 font-display text-lg font-bold">Matches</h2>
            {data.matchList?.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.matchList.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No matches listed yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
