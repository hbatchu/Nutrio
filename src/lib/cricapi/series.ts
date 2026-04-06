import { cricapiGet } from "./client";
import { cachedFetch } from "../cache";
import type { CricAPISeries, CricAPISeriesInfo } from "@/types/cricapi";

const TTL = 300_000; // 5 min

export async function fetchSeriesList(offset = 0): Promise<CricAPISeries[]> {
  return cachedFetch(`series:${offset}`, () => cricapiGet<CricAPISeries[]>("series", { offset: String(offset) }), TTL);
}

export async function fetchSeriesInfo(id: string): Promise<CricAPISeriesInfo> {
  return cachedFetch(`seriesInfo:${id}`, () => cricapiGet<CricAPISeriesInfo>("series_info", { id }), TTL);
}
