import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Eye, EyeOff } from "lucide-react";
import type { ReactNode } from "react";
import { CoverField } from "@/components/CoverField";
import { EditableText, LinkedText } from "@/components/LinkedText";
import { FilmPoster } from "@/components/FilmPoster";
import { CatalogThumb } from "@/components/FilmCard";
import { Retranca, TopicLine } from "@/components/Retranca";
import { CountryFlag } from "@/components/CountryFlag";
import { useEditorial } from "@/components/EditorialProvider";
import { filmPlainText, isPublished } from "@/lib/editorial";
import { FORMAT_LABEL, topicLabel } from "@/data/labels";
import type { Film, Section } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analises/$slug")({
  component: AnalisePage,
});

function AnalisePage() {
  const { slug } = Route.useParams();
  const { draft, editing, patchFilm, publish, save } = useEditorial();
  const extra = draft.extraDomains ?? {};
  const film = draft.films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <main className="py-20 text-center">
        <p className="kicker">Catálogo</p>
        <h1 className="mt-2 font-display text-3xl">Análise não encontrada</h1>
        <Link to="/catalogo" className="mt-6 inline-block text-accent">
          Voltar ao catálogo
        </Link>
      </main>
    );
  }

  const term = film.understandSlug
    ? draft.glossary.find((g) => g.slug === film.understandSlug)
    : undefined;
  const related = draft.films
    .filter(
      (f) =>
        f.slug !== film.slug &&
        (editing || isPublished(f)) &&
        f.domains.some((d) => film.domains.includes(d)),
    )
    .slice(0, 4);
  const topics = film.domains.map((d) => topicLabel(d, extra));
  const refs = film.references ?? [""];
  const offerTitle = film.offerHeading || "O que este filme oferece";

  const set = (patch: Partial<Film>) => {
    patchFilm(film.slug, patch);
  };

  const patchSection = (i: number, sec: Section) => {
    const sections = film.sections.map((s, j) => (j === i ? sec : s));
    set({ sections });
  };

  return (
    <main className="py-10 pb-16">
      {editing && (
        <div className="mb-6 flex flex-wrap items-center gap-2 border border-rule bg-box px-3 py-2 text-[0.7rem] uppercase tracking-[0.12em]">
          <button
            type="button"
            onClick={() => publish(film.slug, film.draft === true)}
            className="inline-flex items-center gap-1.5 bg-accent px-3 py-1.5 text-paper-2"
          >
            {film.draft === true ? (
              <>
                <Eye size={12} /> Publicar
              </>
            ) : (
              <>
                <EyeOff size={12} /> Despublicar
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => save({ download: true })}
            className="border border-rule px-3 py-1.5"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(filmPlainText(film));
            }}
            className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5"
          >
            <Copy size={12} /> Copiar texto
          </button>
          {film.draft === true && (
            <span className="text-muted">Rascunho — não aparece no catálogo público</span>
          )}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside>
          <FilmPoster film={film} className="border border-rule" />
          <CoverField film={film} />
          {film.date && (
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {formatDate(film.date)}
            </p>
          )}
          <dl className="mt-4 space-y-2 border border-box-edge bg-box p-3 text-sm">
            <Ficha label="Título original">
              <EditableText
                editing={editing}
                value={film.originalTitle || ""}
                onChange={(v) => set({ originalTitle: v })}
              />
            </Ficha>
            <Ficha label="Direção">
              <EditableText
                editing={editing}
                value={film.director || ""}
                onChange={(v) => set({ director: v })}
              />
            </Ficha>
            <Ficha label="País">
              <span className="inline-flex items-center gap-1.5">
                <CountryFlag country={film.country} />
                <EditableText
                  editing={editing}
                  value={film.country || ""}
                  onChange={(v) => set({ country: v })}
                />
              </span>
            </Ficha>
            <Ficha label="Ano">
              <EditableText
                editing={editing}
                value={String(film.year || "")}
                onChange={(v) => set({ year: Number(v) || film.year })}
              />
            </Ficha>
            <Ficha label="Duração">
              <EditableText
                editing={editing}
                value={film.duration || ""}
                onChange={(v) => set({ duration: v })}
              />
            </Ficha>
            <Ficha label="Formato">
              {editing ? (
                <select
                  value={film.format}
                  onChange={(e) =>
                    set({ format: e.target.value as Film["format"] })
                  }
                  className="w-full bg-paper-2"
                >
                  <option value="filme">Filme</option>
                  <option value="serie">Série</option>
                  <option value="livro">Livro</option>
                </select>
              ) : (
                FORMAT_LABEL[film.format]
              )}
            </Ficha>
            <Ficha label="Gênero">
              <EditableText
                editing={editing}
                value={film.genre || ""}
                onChange={(v) => set({ genre: v })}
              />
            </Ficha>
            <Ficha label="Tópicos">
              {editing ? (
                <TopicPicker
                  selected={film.domains}
                  extra={extra}
                  allFilms={draft.films}
                  onChange={(domains) => set({ domains })}
                />
              ) : (
                topics.join(", ") || "—"
              )}
            </Ficha>
          </dl>
        </aside>

        <article className="min-w-0">
          <Retranca film={film} />
          {editing ? (
            <EditableText
              editing
              value={film.title}
              onChange={(v) => set({ title: v })}
              className="mt-2 font-display text-[clamp(2rem,5vw,3.1rem)] leading-[0.95]"
            />
          ) : (
            <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.1rem)] leading-[0.95] tracking-tight">
              {film.title}
            </h1>
          )}
          <TopicLine labels={topics} />
          {editing && (
            <EditableText
              editing
              value={film.excerpt || ""}
              multiline
              placeholder="Linha de abertura"
              onChange={(v) => set({ excerpt: v })}
              className="mt-4"
            />
          )}

          <div className="mt-8">
            {film.sections.map((sec, i) => (
              <section key={i} className="mt-8">
                <EditableText
                  editing={editing}
                  value={sec.heading}
                  onChange={(v) => patchSection(i, { ...sec, heading: v })}
                  className="font-display text-2xl leading-tight"
                />
                {sec.paragraphs.map((p, pi) => (
                  <div key={pi} className="mt-3">
                    <EditableText
                      editing={editing}
                      value={p}
                      multiline
                      onChange={(v) => {
                        const paragraphs = sec.paragraphs.map((x, k) =>
                          k === pi ? v : x,
                        );
                        patchSection(i, { ...sec, paragraphs });
                      }}
                      className="leading-relaxed"
                    />
                    {i === 0 && pi === 0 && term && (
                      <UnderstandBox
                        term={term.term}
                        body={term.body}
                      />
                    )}
                  </div>
                ))}
                {editing && (
                  <button
                    type="button"
                    className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-accent"
                    onClick={() =>
                      patchSection(i, {
                        ...sec,
                        paragraphs: [...sec.paragraphs, ""],
                      })
                    }
                  >
                    + Parágrafo
                  </button>
                )}
              </section>
            ))}
            {editing && (
              <button
                type="button"
                className="mt-6 text-[0.7rem] uppercase tracking-[0.14em] text-accent"
                onClick={() =>
                  set({
                    sections: [
                      ...film.sections,
                      { heading: "Nova seção", paragraphs: [""] },
                    ],
                  })
                }
              >
                + Seção
              </button>
            )}
          </div>

          {(film.forFamily || film.forTeacher || film.forPress || editing) && (
            <section className="mt-12">
              <EditableText
                editing={editing}
                value={offerTitle}
                onChange={(v) => set({ offerHeading: v })}
                className="font-display text-2xl leading-tight"
              />
              <div className="mt-4 space-y-4">
                <Note
                  kicker="Em casa"
                  editing={editing}
                  value={film.forFamily || ""}
                  onChange={(v) => set({ forFamily: v })}
                />
                <Note
                  kicker="Na escola"
                  editing={editing}
                  value={film.forTeacher || ""}
                  onChange={(v) => set({ forTeacher: v })}
                />
                <Note
                  kicker="Na pauta"
                  editing={editing}
                  value={film.forPress || ""}
                  onChange={(v) => set({ forPress: v })}
                />
              </div>
            </section>
          )}

          {(refs.some(Boolean) || editing) && (
            <section className="mt-12">
              <h2 className="font-display text-2xl leading-tight">Referências</h2>
              {refs.map((r, i) => (
                <EditableText
                  key={i}
                  editing={editing}
                  value={r}
                  multiline
                  placeholder="Referência"
                  onChange={(v) => {
                    const next = refs.map((x, j) => (j === i ? v : x));
                    set({ references: next });
                  }}
                  className="mt-3 text-sm leading-relaxed"
                />
              ))}
              {editing && (
                <button
                  type="button"
                  className="mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-accent"
                  onClick={() => set({ references: [...refs, ""] })}
                >
                  + Referência
                </button>
              )}
            </section>
          )}
        </article>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-rule pt-10">
          <p className="kicker">Veja também</p>
          <h2 className="font-display text-2xl">Publicações correlatas</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {related.map((f) => (
              <CatalogThumb key={f.slug} film={f} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Ficha({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

function Note({
  kicker,
  value,
  onChange,
  editing,
}: {
  kicker: string;
  value: string;
  onChange: (v: string) => void;
  editing: boolean;
}) {
  if (!value && !editing) return null;
  return (
    <div className="border border-box-edge bg-box p-4">
      <p className="kicker">{kicker}</p>
      <EditableText
        editing={editing}
        value={value}
        multiline
        onChange={onChange}
        className="mt-2 text-sm leading-relaxed"
      />
    </div>
  );
}

function UnderstandBox({ term, body }: { term: string; body: string }) {
  return (
    <aside
      className={cn(
        "my-3 w-full border border-box-edge bg-box p-4 sm:float-right sm:ml-6 sm:w-[48%]",
      )}
    >
      <p className="kicker">Para entender melhor</p>
      <p className="mt-1 font-display text-xl leading-tight">{term}</p>
      <LinkedText as="p" className="mt-2 text-sm leading-relaxed" text={body} />
    </aside>
  );
}

function TopicPicker({
  selected,
  extra,
  allFilms,
  onChange,
}: {
  selected: string[];
  extra: Record<string, string>;
  allFilms: Film[];
  onChange: (domains: string[]) => void;
}) {
  const options = new Map<string, string>();
  for (const [k, v] of Object.entries(extra)) options.set(k, v);
  for (const f of allFilms) {
    for (const d of f.domains) options.set(d, topicLabel(d, extra));
  }
  const list = [...options.entries()].sort((a, b) =>
    a[1].localeCompare(b[1], "pt"),
  );
  return (
    <div className="flex flex-col gap-1">
      {list.map(([slug, label]) => (
        <label key={slug} className="flex items-start gap-1.5 text-[0.78rem]">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={selected.includes(slug)}
            onChange={() =>
              onChange(
                selected.includes(slug)
                  ? selected.filter((x) => x !== slug)
                  : [...selected, slug],
              )
            }
          />
          {label}
        </label>
      ))}
    </div>
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
