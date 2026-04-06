import type { Metadata } from "next";
import { HomeLiveSection } from "@/components/home/HomeLiveSection";
import { HomeMatchesSection } from "@/components/home/HomeMatchesSection";

export const metadata: Metadata = {
  title: "Yellove — Live Cricket Scores",
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="csk-gradient px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-3xl font-black leading-tight sm:text-4xl">
            Cricket. <span className="text-[#FDB913]">Live. Loud.</span>
          </h1>
          <p className="mt-2 text-white/60 text-sm sm:text-base">
            Real-time scores, scorecards &amp; ball-by-ball action — yellove.co.in
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">
        <HomeLiveSection />
        <HomeMatchesSection />
      </div>
    </div>
  );
}
