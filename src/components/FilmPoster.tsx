import { useEffect, useState } from "react";
import type { Film } from "@/data/types";
import { idbGet } from "@/lib/editorial";
import { peekCover, rememberCover } from "@/components/EditorialProvider";
import { cn } from "@/lib/utils";

export function FilmPoster({
  film,
  className,
  alt,
}: {
  film: Film;
  className?: string;
  alt?: string;
}) {
  const [src, setSrc] = useState<string>(() => {
    if (film.still?.startsWith("idb:")) return peekCover(film.slug) || fallback(film);
    return film.still || fallback(film);
  });

  useEffect(() => {
    let dead = false;
    const still = film.still || "";
    if (still.startsWith("idb:")) {
      const cached = peekCover(film.slug);
      if (cached) {
        setSrc(cached);
        return;
      }
      idbGet(`still:${film.slug}`).then((blob) => {
        if (dead) return;
        if (blob instanceof Blob) {
          const url = URL.createObjectURL(blob);
          rememberCover(film.slug, url);
          setSrc(url);
        } else {
          setSrc(fallback(film));
        }
      });
    } else {
      setSrc(still || fallback(film));
    }
    return () => {
      dead = true;
    };
  }, [film.slug, film.still]);

  return (
    <img
      src={src}
      alt={alt ?? film.title}
      className={cn("aspect-2/3 w-full object-cover bg-ink", className)}
      onError={(e) => {
        const el = e.currentTarget;
        const fb = fallback(film);
        if (el.src.endsWith(fb)) return;
        el.src = fb;
      }}
    />
  );
}

function fallback(film: Film) {
  return `/stills/${film.slug}.svg`;
}
