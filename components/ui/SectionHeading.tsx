interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const mutedText = light ? "text-white/70" : "text-navy-900/60";
  const baseText = light ? "text-white" : "text-navy-950";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${mutedText}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] ${baseText}`}>
        {title}
        {accent && (
          <span className="block font-accent text-4xl sm:text-5xl md:text-6xl font-semibold text-turquoise-500 mt-1 leading-none">
            {accent}
          </span>
        )}
      </h2>
      {description && <p className={`text-base sm:text-lg leading-relaxed ${mutedText}`}>{description}</p>}
    </div>
  );
}
