import { fetchPlayers } from "@/lib/cricapi/players";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  if (!search.trim()) return NextResponse.json([]);
  try {
    const data = await fetchPlayers(search);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
