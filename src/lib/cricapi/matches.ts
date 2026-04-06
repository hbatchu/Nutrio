import { cricapiGet } from "./client";
import { cachedFetch } from "../cache";
import type { CricAPIMatch, CricAPIScorecard } from "@/types/cricapi";

const TTL_CURRENT = 25_000;     // 25s — hot path for SSE
const TTL_SCORECARD = 30_000;   // 30s
const TTL_LIST = 120_000;       // 2 min

export async function fetchCurrentMatches(): Promise<CricAPIMatch[]> {
  return cachedFetch("currentMatches", () => cricapiGet<CricAPIMatch[]>("currentMatches"), TTL_CURRENT);
}

export async function fetchMatches(offset = 0): Promise<CricAPIMatch[]> {
  return cachedFetch(`matches:${offset}`, () => cricapiGet<CricAPIMatch[]>("matches", { offset: String(offset) }), TTL_LIST);
}

export async function fetchMatchInfo(id: string): Promise<CricAPIMatch> {
  return cachedFetch(`matchInfo:${id}`, () => cricapiGet<CricAPIMatch>("match_info", { id }), TTL_SCORECARD);
}

export async function fetchScorecard(id: string): Promise<CricAPIScorecard> {
  return cachedFetch(`scorecard:${id}`, () => cricapiGet<CricAPIScorecard>("match_scorecard", { id }), TTL_SCORECARD);
}
