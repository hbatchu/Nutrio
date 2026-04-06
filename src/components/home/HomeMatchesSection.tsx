"use client";

import { useMatches } from "@/hooks/useMatches";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LoadingGrid } from "@/components/shared/LoadingGrid";
import { ErrorState } from "@/components/shared/ErrorState";
import Link from "next/link";

export function HomeMatchesSection() {
  const { data: matches, isLoading, isError } = useMatches(0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SectionHeading title="Recent & Upcoming" />
        <Link href="/matches" className="text-sm font-medium text-[#1A2B5F] dark:text-[#FDB913] hover:underline">
          View all →
        </Link>
      </div>

      {isLoading && <LoadingGrid count={6} />}
      {isError && <ErrorState />}
      {matches && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.slice(0, 9).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
