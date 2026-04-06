import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#253570] bg-[#0F1A3D] py-8 text-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDB913]">
              <span className="text-xs font-black text-[#1A2B5F]">Y</span>
            </div>
            <span className="font-display font-bold text-[#FDB913]">Yellove</span>
            <span className="text-sm">— Cricket. Live. Loud.</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-xs">
            {[
              { href: "/", label: "Home" },
              { href: "/live", label: "Live" },
              { href: "/matches", label: "Matches" },
              { href: "/series", label: "Series" },
              { href: "/players", label: "Players" },
              { href: "/ipl", label: "IPL" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#FDB913] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} yellove.co.in
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-white/30">
          Powered by CricAPI. Data is for informational purposes only.
        </p>
      </div>
    </footer>
  );
}
