import type { Metadata } from "next";
import { LivePage } from "@/components/live/LivePage";

export const metadata: Metadata = { title: "Live Scores" };

export default function Page() {
  return <LivePage />;
}
