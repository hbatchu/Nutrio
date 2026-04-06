"use client";

import { useQuery } from "@tanstack/react-query";
import type { CricAPISeries, CricAPISeriesInfo } from "@/types/cricapi";

export function useSeriesList(offset = 0) {
  return useQuery({
    queryKey: ["series", offset],
    queryFn: async (): Promise<CricAPISeries[]> => {
      const res = await fetch(`/api/series?offset=${offset}`);
      if (!res.ok) throw new Error("Failed to fetch series");
      return res.json();
    },
    staleTime: 300_000,
  });
}

export function useSeriesInfo(id: string) {
  return useQuery({
    queryKey: ["seriesInfo", id],
    queryFn: async (): Promise<CricAPISeriesInfo> => {
      const res = await fetch(`/api/series/${id}`);
      if (!res.ok) throw new Error("Failed to fetch series info");
      return res.json();
    },
    staleTime: 300_000,
  });
}
