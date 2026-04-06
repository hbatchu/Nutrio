import type { Metadata } from "next";
import { SeriesListPage } from "@/components/series/SeriesListPage";

export const metadata: Metadata = { title: "Series" };

export default function Page() {
  return <SeriesListPage />;
}
