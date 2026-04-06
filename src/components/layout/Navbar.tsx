"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/live", label: "Live" },
  { href: "/matches", label: "Matches" },
  { href: "/series", label: "Series" },
  { href: "/players", label: "Players" },
  { href: "/ipl", label: "IPL" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/players?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#253570] bg-[#1A2B5F] shadow-lg backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo + Mobile Nav */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDB913]">
              <span className="text-sm font-black text-[#1A2B5F]">Y</span>
            </div>
            <span className="font-display text-lg font-bold text-[#FDB913]">Yellove</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#FDB913]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              {link.href === "/live" && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 live-pulse" />
              )}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#FDB913]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden items-center gap-2 sm:flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players..."
              className="h-8 w-44 rounded-md border border-[#253570] bg-[#253570]/50 pl-8 pr-3 text-sm text-white placeholder:text-white/40 focus:border-[#FDB913] focus:outline-none focus:ring-1 focus:ring-[#FDB913]"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
