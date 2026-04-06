export function LiveBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white ${className}`}
    >
      <span className="live-pulse inline-block h-1.5 w-1.5 rounded-full bg-white" />
      LIVE
    </span>
  );
}
