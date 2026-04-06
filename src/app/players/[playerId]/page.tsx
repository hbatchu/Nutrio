import type { Metadata } from "next";
import { PlayerDetailClient } from "@/components/players/PlayerDetailClient";

export const metadata: Metadata = { title: "Player Profile" };

export default async function Page({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  return <PlayerDetailClient playerId={playerId} />;
}
