import type { Metadata } from "next";
import { MatchesPage } from "@/components/matches/MatchesPage";

export const metadata: Metadata = { title: "Match Schedule" };

export default function Page() {
  return <MatchesPage />;
}
