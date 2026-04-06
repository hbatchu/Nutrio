"use client";

import { useLiveScores } from "@/hooks/useLiveScores";
import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function HomeLiveSection() {
  const { liveMatches, connected } = useLiveScores();
  const live = liveMatches.filter((m) => m.matchStarted && !m.matchEnded);

  if (!connected && !live.length) {
    return (
      <div>
        <SectionHeading title="Live Now" accent />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-[#253570] bg-[#1A2B5F]/30 p-4">
              <Skeleton className="mb-3 h-4 w-1/3 bg-[#253570]" />
              <Skeleton className="mb-2 h-10 w-full bg-[#253570]" />
              <Skeleton className="h-4 w-2/3 bg-[#253570]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!live.length) {
    return (
      <div>
        <SectionHeading title="Live Now" accent />
        <div className="rounded-xl border border-dashed border-[#253570] bg-[#1A2B5F]/10 py-10 text-center">
          <p className="font-semibold text-[#1A2B5F] dark:text-white/60">No live matches right now</p>
          <p className="mt-1 text-sm text-muted-foreground">Check the schedule for upcoming matches</p>
          <Link href="/matches" className="mt-4 inline-block rounded-lg bg-[#FDB913] px-4 py-2 text-sm font-bold text-[#1A2B5F] hover:bg-[#E5A610]">
            View Schedule
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SectionHeading title="Live Now" accent />
        <Link href="/live" className="text-sm font-medium text-[#1A2B5F] dark:text-[#FDB913] hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {live.slice(0, 6).map((match) => (
          <LiveMatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
