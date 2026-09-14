import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CatalogThumb } from "@/components/FilmCard";
import { useEditorial } from "@/components/EditorialProvider";
import { blankFilm, isPublished, slugify } from "@/lib/editorial";
import { FORMAT_PLURAL, topicLabel } from "@/data/labels";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogo")({ component: Catalogo });

function Catalogo() {
  const { draft, editing, setDraft } = useEditorial();
  const extra = draft.extraDomains ?? {};
  const [q, setQ] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState("");

  const allTopics = useMemo(() => {
    const set = new Map<string, string>();
    for (const [slug, label] of Object.entries(extra)) set.set(slug, label);
    for (const f of draft.films) {
      for (const d of f.domains) set.set(d, topicLabel(d, extra));
    }
    const deleted = new Set(draft.deletedDomainSlugs ?? []);
    return [...set.entries()]
      .filter(([slug]) => !deleted.has(slug))
      .sort((a, b) => a[1].localeCompare(b[1], "pt"));
  }, [draft.films, extra, draft.deletedDomainSlugs]);

  const list = useMemo(() => {
    const base = editing ? draft.films : draft.films.filter(isPublished);
    return base.filter((f) => {
      if (formats.length && !formats.includes(f.format)) return false;
      if (topics.length && !topics.every((t) => f.domains.includes(t))) return false;
      if (q.trim()) {
        const hay = `${f.title} ${f.originalTitle ?? ""} ${f.director ?? ""} ${f.excerpt ?? ""}`.toLowerCase();
        if (!hay.includes(q.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [draft.films, editing, formats, topics, q]);

  function toggle(list: string[], v: string, set: (x: string[]) => void) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  return (
    <main className="py-10 pb-16">
      <p className="kicker">Análises</p>
      <h1 className="font-display text-5xl leading-none text-accent">Catálogo</h1>

      {editing && (
        <div className="mt-6 border border-rule bg-box p-4">
          <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            Tópicos para categorizar as análises
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {allTopics.map(([slug, label]) => (
              <button
                key={slug}
                type="button"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    deletedDomainSlugs: [...(d.deletedDomainSlugs ?? []), slug],
                    extraDomains: Object.fromEntries(
                      Object.entries(d.extraDomains ?? {}).filter(([k]) => k !== slug),
                    ),
                    films: d.films.map((f) => ({
                      ...f,
                      domains: f.domains.filter((x) => x !== slug),
                    })),
                  }))
                }
                className="border border-rule bg-paper-2 px-2 py-1 text-[0.7rem] hover:border-accent hover:text-accent"
              >
                {label} ×
              </button>
            ))}
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const label = newTopic.trim();
              if (!label) return;
              const slug = slugify(label);
              setDraft((d) => ({
                ...d,
                extraDomains: { ...(d.extraDomains ?? {}), [slug]: label },
                deletedDomainSlugs: (d.deletedDomainSlugs ?? []).filter((x) => x !== slug),
              }));
              setNewTopic("");
            }}
          >
            <input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Novo tópico"
              className="flex-1 border border-rule bg-paper-2 px-2 py-1 text-sm"
            />
            <button className="bg-accent px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-paper-2">
              Adicionar
            </button>
          </form>
          <button
            type="button"
            className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-accent"
            onClick={() =>
              setDraft((d) => ({ ...d, films: [blankFilm(), ...d.films] }))
            }
          >
            + Nova análise
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-5">
            {list.map((film) => (
              <CatalogThumb key={film.slug} film={film} />
            ))}
          </div>
          {!list.length && (
            <p className="text-sm text-muted">Nenhuma análise neste recorte.</p>
          )}
        </div>
        <aside className="lg:sticky lg:top-4 h-fit border border-rule bg-box p-4">
          <label className="block text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            Pesquisa
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="mt-1 w-full border border-rule bg-paper-2 px-2 py-1.5 text-sm text-ink"
              placeholder="Título, diretor…"
            />
          </label>
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            Formatos
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {(["filme", "serie", "livro"] as const).map((fmt) => (
              <label key={fmt} className="flex items-center gap-2 text-[0.8rem]">
                <input
                  type="checkbox"
                  checked={formats.includes(fmt)}
                  onChange={() => toggle(formats, fmt, setFormats)}
                />
                {FORMAT_PLURAL[fmt]}
              </label>
            ))}
          </div>
          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            Tópicos
          </p>
          <div className="mt-2 flex flex-col gap-1">
            {allTopics.map(([slug, label]) => (
              <label key={slug} className="flex items-start gap-2 text-[0.75rem] leading-snug">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={topics.includes(slug)}
                  onChange={() => toggle(topics, slug, setTopics)}
                />
                {label}
              </label>
            ))}
          </div>
          {(formats.length || topics.length || q) && (
            <button
              type="button"
              className={cn("mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-accent")}
              onClick={() => {
                setFormats([]);
                setTopics([]);
                setQ("");
              }}
            >
              Limpar filtros
            </button>
          )}
        </aside>
      </div>
    </main>
  );
}
