"use client";

import { useQuery } from "@tanstack/react-query";
import type { CricAPIScorecard } from "@/types/cricapi";

async function fetchScorecard(matchId: string): Promise<CricAPIScorecard> {
  const res = await fetch(`/api/matches/${matchId}/scorecard`);
  if (!res.ok) throw new Error("Failed to fetch scorecard");
  return res.json();
}

export function useMatchScorecard(matchId: string) {
  return useQuery({
    queryKey: ["scorecard", matchId],
    queryFn: () => fetchScorecard(matchId),
    refetchInterval: (query) => {
      const match = query.state.data;
      if (!match) return 30_000;
      return match.matchEnded ? false : 30_000;
    },
    staleTime: 20_000,
  });
}
