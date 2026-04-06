"use client";

import { useState } from "react";
import { useMatches } from "@/hooks/useMatches";
import { MatchCard } from "@/components/match/MatchCard";
import { LoadingGrid } from "@/components/shared/LoadingGrid";
import { ErrorState } from "@/components/shared/ErrorState";
import { Calendar } from "lucide-react";

const PAGE_SIZE = 25;

export function MatchesPage() {
  const [page, setPage] = useState(0);
  const { data: matches, isLoading, isError } = useMatches(page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-[#FDB913]" />
        <h1 className="font-display text-2xl font-bold">Match Schedule</h1>
      </div>

      {isLoading && <LoadingGrid count={9} />}
      {isError && <ErrorState />}

      {matches && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">Page {page + 1}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={matches.length < PAGE_SIZE}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
