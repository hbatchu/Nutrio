import type { Metadata } from "next";
import { SeriesDetailClient } from "@/components/series/SeriesDetailClient";

export const metadata: Metadata = { title: "Series" };

export default async function Page({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await params;
  return <SeriesDetailClient seriesId={seriesId} />;
}
