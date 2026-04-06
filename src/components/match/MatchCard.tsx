import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CricAPIMatch } from "@/types/cricapi";

function statusVariant(match: CricAPIMatch): "destructive" | "default" | "secondary" | "outline" {
  if (!match.matchEnded && match.matchStarted) return "destructive";
  if (match.matchEnded) return "secondary";
  return "outline";
}

function statusLabel(match: CricAPIMatch): string {
  if (!match.matchEnded && match.matchStarted) return "LIVE";
  if (match.matchEnded) return "ENDED";
  return "UPCOMING";
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
    });
  } catch {
    return dateStr;
  }
}

export function MatchCard({ match }: { match: CricAPIMatch }) {
  const [team1, team2] = match.teams ?? ["TBD", "TBD"];
  const team1Info = match.teamInfo?.find((t) => t.name === team1 || team1.includes(t.shortname));
  const team2Info = match.teamInfo?.find((t) => t.name === team2 || team2.includes(t.shortname));
  const team1Score = match.score?.find((s) => s.inning.includes(team1));
  const team2Score = match.score?.find((s) => s.inning.includes(team2));

  return (
    <Link href={`/matches/${match.id}`}>
      <div className="group rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-[#FDB913]/50 hover:shadow-md">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="truncate text-xs text-muted-foreground">
            {match.matchType?.toUpperCase()} · {match.venue?.split(",")[0]}
          </span>
          <Badge variant={statusVariant(match)} className="shrink-0 text-[10px]">
            {statusLabel(match)}
          </Badge>
        </div>

        {/* Teams */}
        <div className="space-y-2">
          {[
            { info: team1Info, name: team1, score: team1Score },
            { info: team2Info, name: team2, score: team2Score },
          ].map(({ info, name, score }) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {info?.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={info.img} alt={name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {name.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium">{info?.shortname ?? name}</span>
              </div>
              {score ? (
                <span className="font-mono text-sm font-semibold">
                  {score.r}/{score.w}
                  <span className="ml-1 text-xs text-muted-foreground">({score.o})</span>
                </span>
              ) : null}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 border-t pt-2">
          <p className="text-xs text-muted-foreground line-clamp-1">
            {match.matchEnded ? match.status : formatDate(match.dateTimeGMT)}
          </p>
        </div>
      </div>
    </Link>
  );
}
