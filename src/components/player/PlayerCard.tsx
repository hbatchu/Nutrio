import Link from "next/link";
import { User } from "lucide-react";
import type { CricAPIPlayer } from "@/types/cricapi";

export function PlayerCard({ player }: { player: CricAPIPlayer }) {
  return (
    <Link href={`/players/${player.id}`}>
      <div className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm transition-all hover:border-[#FDB913]/50 hover:shadow-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold truncate">{player.name}</p>
          <p className="text-xs text-muted-foreground">{player.country}</p>
        </div>
      </div>
    </Link>
  );
}
