"use client";

import { useQuery } from "@tanstack/react-query";
import type { CricAPIMatch } from "@/types/cricapi";

async function fetchMatches(offset: number): Promise<CricAPIMatch[]> {
  const res = await fetch(`/api/matches?offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
}

export function useMatches(offset = 0) {
  return useQuery({
    queryKey: ["matches", offset],
    queryFn: () => fetchMatches(offset),
    staleTime: 60_000,
  });
}
