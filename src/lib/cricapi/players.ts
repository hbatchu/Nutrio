import { cricapiGet } from "./client";
import { cachedFetch } from "../cache";
import type { CricAPIPlayer, CricAPIPlayerInfo } from "@/types/cricapi";

const TTL_SEARCH = 600_000; // 10 min
const TTL_INFO = 600_000;

export async function fetchPlayers(search: string): Promise<CricAPIPlayer[]> {
  return cachedFetch(`players:${search}`, () => cricapiGet<CricAPIPlayer[]>("players", { search }), TTL_SEARCH);
}

export async function fetchPlayerInfo(id: string): Promise<CricAPIPlayerInfo> {
  return cachedFetch(`playerInfo:${id}`, () => cricapiGet<CricAPIPlayerInfo>("players_info", { id }), TTL_INFO);
}
