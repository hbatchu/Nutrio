import type { Metadata } from "next";
import { ScorecardPageClient } from "@/components/matches/ScorecardPageClient";

export const metadata: Metadata = { title: "Scorecard" };

export default async function Page({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;
  return <ScorecardPageClient matchId={matchId} />;
}
