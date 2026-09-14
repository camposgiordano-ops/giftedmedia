import { Link } from "@tanstack/react-router";
import type { Film } from "@/data/types";
import { topicLabel } from "@/data/labels";
import { FilmPoster } from "@/components/FilmPoster";
import { Retranca } from "@/components/Retranca";
import { useEditorial } from "@/components/EditorialProvider";
import { cn } from "@/lib/utils";

export function FilmCard({
  film,
  compact = false,
}: {
  film: Film;
  compact?: boolean;
}) {
  const { draft } = useEditorial();
  const extra = draft.extraDomains ?? {};
  const topics = film.domains.map((d) => topicLabel(d, extra));
  return (
    <article className={cn("ficha", compact && "text-[0.92rem]")}>
      <Link
        to="/analises/$slug"
        params={{ slug: film.slug }}
        className="ficha-cover block"
      >
        <FilmPoster film={film} className="border border-rule" />
      </Link>
      <div className="min-w-0">
        <Retranca film={film} />
        <h3 className="mt-1 font-display text-[1.15rem] leading-tight tracking-tight text-ink">
          <Link
            to="/analises/$slug"
            params={{ slug: film.slug }}
            className="hover:text-accent"
          >
            {film.title}
          </Link>
        </h3>
        {topics.length > 0 && (
          <p className="mt-1 text-[0.72rem] leading-snug text-muted">
            {topics.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
}

export function CatalogThumb({ film }: { film: Film }) {
  return (
    <article className="min-w-0">
      <Link to="/analises/$slug" params={{ slug: film.slug }} className="block">
        <FilmPoster film={film} className="border border-rule" />
      </Link>
      <Retranca film={film} className="mt-1.5" />
      <h3 className="font-display text-[0.98rem] leading-tight tracking-tight">
        <Link
          to="/analises/$slug"
          params={{ slug: film.slug }}
          className="hover:text-accent"
        >
          {film.title}
        </Link>
      </h3>
    </article>
  );
}
