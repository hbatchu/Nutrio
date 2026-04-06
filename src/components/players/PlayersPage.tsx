"use client";

import { useState, useEffect } from "react";
import { usePlayerSearch } from "@/hooks/usePlayer";
import { PlayerCard } from "@/components/player/PlayerCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { Search, User } from "lucide-react";

export function PlayersPage({ searchParamsPromise }: { searchParamsPromise: Promise<{ search?: string }> }) {
  const [search, setSearch] = useState("");
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    searchParamsPromise.then(({ search: s }) => {
      if (s) setSearch(s);
      setInitialised(true);
    });
  }, [searchParamsPromise]);

  const { data: players, isLoading, isError } = usePlayerSearch(search);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-[#FDB913]" />
        <h1 className="font-display text-2xl font-bold">Players</h1>
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by player name..."
          className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm focus:border-[#FDB913] focus:outline-none focus:ring-2 focus:ring-[#FDB913]/20"
        />
      </div>

      {/* States */}
      {!initialised && null}
      {initialised && !search.trim() && (
        <div className="py-12 text-center text-muted-foreground">
          <Search className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p>Type a player name to search</p>
        </div>
      )}
      {isLoading && search.length > 1 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex items-center gap-3 rounded-xl border bg-card p-3 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}
      {isError && <ErrorState />}
      {players && players.length === 0 && search.length > 1 && (
        <p className="text-center text-muted-foreground">No players found for &ldquo;{search}&rdquo;</p>
      )}
      {players && players.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}
