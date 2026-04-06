"use client";

import { useEffect, useState } from "react";
import type { CricAPIMatch } from "@/types/cricapi";

export function useLiveScores() {
  const [liveMatches, setLiveMatches] = useState<CricAPIMatch[]>([]);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/live-scores");

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setLiveMatches(data);
        setLastUpdated(new Date());
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => setConnected(false);

    return () => {
      es.close();
      setConnected(false);
    };
  }, []);

  return { liveMatches, connected, lastUpdated };
}
