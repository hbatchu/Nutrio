import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FDB913]">
        <span className="font-display text-2xl font-black text-[#1A2B5F]">404</span>
      </div>
      <h1 className="font-display text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist. The ball went out of the ground.</p>
      <Link
        href="/"
        className="rounded-lg bg-[#FDB913] px-5 py-2 font-bold text-[#1A2B5F] hover:bg-[#E5A610] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
