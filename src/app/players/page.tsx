import type { Metadata } from "next";
import { PlayersPage } from "@/components/players/PlayersPage";

export const metadata: Metadata = { title: "Players" };

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return <PlayersPage searchParamsPromise={searchParams} />;
}
