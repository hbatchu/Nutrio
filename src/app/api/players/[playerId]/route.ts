import { fetchPlayerInfo } from "@/lib/cricapi/players";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  try {
    const data = await fetchPlayerInfo(playerId);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
