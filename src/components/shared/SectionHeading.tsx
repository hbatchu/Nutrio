interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export function SectionHeading({ title, subtitle, accent = false }: SectionHeadingProps) {
  return (
    <div className="mb-4">
      <h2
        className={`font-display text-xl font-bold tracking-tight ${
          accent ? "text-[#FDB913]" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
