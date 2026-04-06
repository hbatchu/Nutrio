"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/live", label: "Live" },
  { href: "/matches", label: "Matches" },
  { href: "/series", label: "Series" },
  { href: "/players", label: "Players" },
  { href: "/ipl", label: "IPL" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center justify-center rounded-md p-2 text-white md:hidden">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 border-r-0 bg-[#1A2B5F] p-0">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 border-b border-[#253570] px-6 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDB913]">
              <span className="text-sm font-black text-[#1A2B5F]">Y</span>
            </div>
            <span className="font-display text-lg font-bold text-[#FDB913]">Yellove</span>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`mb-1 flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#FDB913] text-[#1A2B5F]"
                    : "text-white/80 hover:bg-[#253570] hover:text-white"
                }`}
              >
                {link.label}
                {link.href === "/live" && (
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-red-500 live-pulse" />
                )}
              </Link>
            ))}
          </nav>

          <div className="border-t border-[#253570] px-6 py-4">
            <p className="text-xs text-white/40">yellove.co.in</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
