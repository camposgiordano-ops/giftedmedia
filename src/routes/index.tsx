import { createFileRoute, Link } from "@tanstack/react-router";
import { FilmPoster } from "@/components/FilmPoster";
import { FilmCard } from "@/components/FilmCard";
import { GlossaryPanel } from "@/components/GlossaryPanel";
import { Retranca, TopicLine } from "@/components/Retranca";
import { CoverField } from "@/components/CoverField";
import { useEditorial } from "@/components/EditorialProvider";
import { isPublished, latestPublished } from "@/lib/editorial";
import { topicLabel } from "@/data/labels";
import { LinkedText } from "@/components/LinkedText";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { draft, editing } = useEditorial();
  const films = editing ? draft.films : draft.films.filter(isPublished);
  const featured = latestPublished(draft.films) ?? films[0];
  const rest = films.filter((f) => f.slug !== featured?.slug);
  const extra = draft.extraDomains ?? {};

  return (
    <main className="pb-16">
      {featured && (
        <section className="home-lead">
          <article className="destaque min-w-0">
            <div className="destaque-cover">
              <Link to="/analises/$slug" params={{ slug: featured.slug }}>
                <FilmPoster film={featured} className="border border-rule" />
              </Link>
              <CoverField film={featured} />
              {featured.date && (
                <p className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                  {formatDate(featured.date)}
                </p>
              )}
            </div>
            <div className="min-w-0">
              <Retranca film={featured} />
              <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[0.95] tracking-tight">
                <Link
                  to="/analises/$slug"
                  params={{ slug: featured.slug }}
                  className="hover:text-accent"
                >
                  {featured.title}
                </Link>
              </h2>
              <TopicLine
                labels={featured.domains.map((d) => topicLabel(d, extra))}
              />
              {featured.excerpt && (
                <LinkedText
                  as="p"
                  className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft"
                  text={featured.excerpt}
                />
              )}
              <Link
                to="/analises/$slug"
                params={{ slug: featured.slug }}
                className="mt-4 inline-block text-[0.72rem] uppercase tracking-[0.16em] text-accent"
              >
                Ler a análise
              </Link>
            </div>
          </article>
          <GlossaryPanel fill className="min-h-[22rem]" />
        </section>
      )}

      <section className="border-t border-rule pt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {rest.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      </section>
    </main>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
