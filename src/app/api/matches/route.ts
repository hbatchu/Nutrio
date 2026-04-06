import { fetchMatches, fetchCurrentMatches } from "@/lib/cricapi/matches";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const current = searchParams.get("current") === "true";

  try {
    const data = current ? await fetchCurrentMatches() : await fetchMatches(offset);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
