"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Radio, Calendar, Trophy, User, Star } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/live", label: "Live", icon: Radio, isLive: true },
  { href: "/matches", label: "Matches", icon: Calendar },
  { href: "/series", label: "Series", icon: Trophy },
  { href: "/players", label: "Players", icon: User },
  { href: "/ipl", label: "IPL", icon: Star, isHighlight: true },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center justify-center rounded-md p-2 text-white/70 hover:text-white transition-colors md:hidden">
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-72 border-0 bg-[#0F1A3D] p-0">
        <div className="flex h-full flex-col">

          {/* Header */}
          <div className="relative overflow-hidden bg-[#1A2B5F] px-6 py-6">
            {/* Yellow top bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-[#FDB913]" />
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, #FDB913 0, #FDB913 1px, transparent 0, transparent 50%)",
                backgroundSize: "12px 12px",
              }}
            />
            <div className="relative flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#FDB913]" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDB913]">
                  <span className="font-display text-lg font-black text-[#1A2B5F] leading-none">Y</span>
                </div>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-display text-xl font-black tracking-wide text-[#FDB913]">YELLOVE</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">Cricket</span>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Navigation
            </p>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`group mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#FDB913] text-[#1A2B5F]"
                      : "text-white/70 hover:bg-[#1A2B5F] hover:text-white"
                  }`}
                >
                  {/* Active left bar */}
                  <div className={`h-4 w-0.5 rounded-full transition-all ${isActive ? "bg-[#1A2B5F]" : "bg-[#FDB913]/0 group-hover:bg-[#FDB913]/50"}`} />
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className={`flex-1 uppercase tracking-wider text-[12px] font-bold ${link.isHighlight && !isActive ? "text-[#FDB913]" : ""}`}>
                    {link.label}
                  </span>
                  {link.isLive && (
                    <span className="flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 live-pulse inline-block" />
                      LIVE
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-[#1A2B5F] px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider">yellove.co.in</p>
              <div className="h-1 w-8 rounded-full bg-[#FDB913]/30" />
            </div>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
