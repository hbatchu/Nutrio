"use client";

import { useState } from "react";
import { useSeriesList } from "@/hooks/useSeries";
import { SeriesCard } from "./SeriesCard";
import { LoadingGrid } from "@/components/shared/LoadingGrid";
import { ErrorState } from "@/components/shared/ErrorState";
import { Trophy } from "lucide-react";

const PAGE_SIZE = 25;

export function SeriesListPage() {
  const [page, setPage] = useState(0);
  const { data: series, isLoading, isError } = useSeriesList(page * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-[#FDB913]" />
        <h1 className="font-display text-2xl font-bold">Series</h1>
      </div>

      {isLoading && <LoadingGrid count={9} />}
      {isError && <ErrorState />}

      {series && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {series.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">Page {page + 1}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={series.length < PAGE_SIZE}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
