"use client";

import { useSeriesList } from "@/hooks/useSeries";
import { useMatches } from "@/hooks/useMatches";
import { SeriesCard } from "@/components/series/SeriesCard";
import { MatchCard } from "@/components/match/MatchCard";
import { LoadingGrid } from "@/components/shared/LoadingGrid";

export function IPLPage() {
  const { data: series, isLoading: seriesLoading } = useSeriesList(0);
  const { data: matches, isLoading: matchesLoading } = useMatches(0);

  const iplSeries = series?.filter((s) => s.name.toLowerCase().includes("ipl") || s.name.toLowerCase().includes("premier league"));
  const iplMatches = matches?.filter(
    (m) => m.name?.toLowerCase().includes("ipl") || m.series_id && iplSeries?.some((s) => s.id === m.series_id)
  );

  return (
    <div>
      {/* CSK Hero Banner */}
      <section className="relative overflow-hidden bg-[#FDB913] py-10 px-4">
        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#1A2B5F]"
              style={{
                width: `${Math.random() * 80 + 20}px`,
                height: `${Math.random() * 80 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2B5F] shadow-lg">
              <span className="font-display text-2xl font-black text-[#FDB913]">IPL</span>
            </div>
            <div>
              <h1 className="font-display text-3xl font-black text-[#1A2B5F]">Indian Premier League</h1>
              <p className="text-[#1A2B5F]/70 font-medium">The biggest cricket league in the world</p>
            </div>
          </div>

          {/* CSK brand strip */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1A2B5F] px-4 py-2">
            <span className="text-sm font-bold text-[#FDB913]">Whistle Podu!</span>
            <span className="text-white/60 text-xs">Go CSK</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">
        {/* IPL Series */}
        <div>
          <h2 className="mb-4 font-display text-xl font-bold">IPL Series</h2>
          {seriesLoading && <LoadingGrid count={3} />}
          {iplSeries && iplSeries.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {iplSeries.map((s) => (
                <SeriesCard key={s.id} series={s} />
              ))}
            </div>
          ) : !seriesLoading && (
            <p className="text-sm text-muted-foreground">No IPL series data available right now.</p>
          )}
        </div>

        {/* IPL Matches */}
        <div>
          <h2 className="mb-4 font-display text-xl font-bold">IPL Matches</h2>
          {matchesLoading && <LoadingGrid count={6} />}
          {iplMatches && iplMatches.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {iplMatches.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          ) : !matchesLoading && (
            <div className="rounded-xl border border-dashed border-[#FDB913]/30 bg-[#FDB913]/5 py-10 text-center">
              <p className="font-semibold text-[#1A2B5F] dark:text-[#FDB913]">No IPL matches found</p>
              <p className="mt-1 text-sm text-muted-foreground">Check back during the IPL season</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
