import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { CricAPISeries } from "@/types/cricapi";

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch { return d; }
}

export function SeriesCard({ series }: { series: CricAPISeries }) {
  const formats = [
    series.t20 > 0 && `${series.t20} T20`,
    series.odi > 0 && `${series.odi} ODI`,
    series.test > 0 && `${series.test} Test`,
  ].filter(Boolean);

  return (
    <Link href={`/series/${series.id}`}>
      <div className="group rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-[#FDB913]/50 hover:shadow-md">
        <h3 className="mb-2 font-semibold leading-snug line-clamp-2 group-hover:text-[#1A2B5F] dark:group-hover:text-[#FDB913]">
          {series.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {formats.map((f) => (
            <Badge key={String(f)} variant="secondary" className="text-xs">{f}</Badge>
          ))}
          <Badge variant="outline" className="text-xs">{series.matches} Matches</Badge>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(series.startDate)} — {formatDate(series.endDate)}
        </div>
      </div>
    </Link>
  );
}
