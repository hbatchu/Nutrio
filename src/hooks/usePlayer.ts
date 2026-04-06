"use client";

import { useQuery } from "@tanstack/react-query";
import type { CricAPIPlayer, CricAPIPlayerInfo } from "@/types/cricapi";

export function usePlayerSearch(search: string) {
  return useQuery({
    queryKey: ["players", search],
    queryFn: async (): Promise<CricAPIPlayer[]> => {
      if (!search.trim()) return [];
      const res = await fetch(`/api/players?search=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error("Failed to search players");
      return res.json();
    },
    enabled: search.trim().length > 1,
    staleTime: 300_000,
  });
}

export function usePlayerInfo(id: string) {
  return useQuery({
    queryKey: ["playerInfo", id],
    queryFn: async (): Promise<CricAPIPlayerInfo> => {
      const res = await fetch(`/api/players/${id}`);
      if (!res.ok) throw new Error("Failed to fetch player info");
      return res.json();
    },
    staleTime: 300_000,
  });
}
