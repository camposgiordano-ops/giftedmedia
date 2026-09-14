import { FORMAT_LABEL } from "@/data/labels";
import type { Film } from "@/data/types";
import { CountryFlag } from "@/components/CountryFlag";
import { cn } from "@/lib/utils";

export function Retranca({
  film,
  className,
}: {
  film: Film;
  className?: string;
}) {
  const bits = [
    FORMAT_LABEL[film.format] || film.format,
    film.genre,
    film.year ? String(film.year) : "",
  ].filter(Boolean);
  return (
    <p
      className={cn(
        "kicker flex flex-wrap items-center gap-x-2 gap-y-1 normal-case tracking-[0.16em]",
        className,
      )}
    >
      <CountryFlag country={film.country} />
      {bits.map((b, i) => (
        <span key={i} className="inline-flex items-center gap-2 uppercase">
          {i > 0 && (
            <span aria-hidden className="text-accent-soft">
              ·
            </span>
          )}
          {b}
        </span>
      ))}
    </p>
  );
}

export function TopicLine({
  labels,
  className,
}: {
  labels: string[];
  className?: string;
}) {
  if (!labels.length) return null;
  return (
    <p className={cn("mt-2 text-[0.72rem] leading-snug text-muted", className)}>
      {labels.join(" · ")}
    </p>
  );
}
