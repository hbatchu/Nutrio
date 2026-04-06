import type { Metadata } from "next";
import { IPLPage } from "@/components/ipl/IPLPage";

export const metadata: Metadata = { title: "IPL — Indian Premier League" };

export default function Page() {
  return <IPLPage />;
}
