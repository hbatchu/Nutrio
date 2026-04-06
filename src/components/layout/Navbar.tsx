"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/live", label: "Live", isLive: true },
  { href: "/matches", label: "Matches" },
  { href: "/series", label: "Series" },
  { href: "/players", label: "Players" },
  { href: "/ipl", label: "IPL", isHighlight: true },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/players?search=${encodeURIComponent(search)}`);
      setSearch("");
      setSearchOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Yellow top accent stripe */}
      <div className="h-1 w-full bg-[#FDB913]" />

      {/* Main nav bar */}
      <div className="bg-[#1A2B5F] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">

          {/* Left: Mobile trigger + Logo */}
          <div className="flex items-center gap-3">
            <MobileNav />

            <Link href="/" className="group flex items-center gap-3">
              {/* Emblem */}
              <div className="relative flex h-10 w-10 items-center justify-center">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#FDB913] group-hover:border-[#E5A610] transition-colors" />
                {/* Inner fill */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDB913] group-hover:bg-[#E5A610] transition-colors">
                  <span className="font-display text-base font-black text-[#1A2B5F] leading-none">Y</span>
                </div>
              </div>
              {/* Wordmark */}
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-black tracking-wide text-[#FDB913] group-hover:text-[#E5A610] transition-colors">
                  YELLOVE
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-white/40 uppercase">
                  Cricket
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden items-center md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-1.5 px-4 py-5 text-[13px] font-bold uppercase tracking-wider transition-colors ${
                    link.isHighlight
                      ? isActive
                        ? "text-[#FDB913]"
                        : "text-[#FDB913]/80 hover:text-[#FDB913]"
                      : isActive
                      ? "text-[#FDB913]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.isLive && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 live-pulse" />
                  )}
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[#FDB913] transition-transform origin-center ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Search */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search players..."
                    className="h-9 w-48 rounded-full border border-[#FDB913]/30 bg-[#253570] pl-8 pr-3 text-sm text-white placeholder:text-white/40 focus:border-[#FDB913] focus:outline-none focus:ring-1 focus:ring-[#FDB913]/50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearch(""); }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#253570] bg-[#253570]/50 text-white/60 hover:border-[#FDB913]/50 hover:text-[#FDB913] transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Bottom yellow glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FDB913]/30 to-transparent" />
    </header>
  );
}
