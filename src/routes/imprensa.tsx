import { createFileRoute } from "@tanstack/react-router";
import { EditableText } from "@/components/LinkedText";
import { useEditorial } from "@/components/EditorialProvider";

export const Route = createFileRoute("/imprensa")({ component: Imprensa });

function Imprensa() {
  const { draft, editing, setDraft } = useEditorial();
  const press = draft.press;
  const paragraphs = press.paragraphs?.length ? press.paragraphs : [press.intro];
  const sections = press.sections ?? [];

  return (
    <main className="mx-auto max-w-3xl py-10 pb-16">
      <p className="kicker">Imprensa</p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.95] text-accent">
        Guia de Contra-Enquadramento
      </h1>

      {paragraphs.map((p, i) => (
        <EditableText
          key={i}
          editing={editing}
          value={p}
          multiline
          onChange={(v) =>
            setDraft((d) => {
              const next = [...(d.press.paragraphs?.length ? d.press.paragraphs : [d.press.intro])];
              next[i] = v;
              return { ...d, press: { ...d.press, paragraphs: next, intro: next[0] ?? "" } };
            })
          }
          className="mt-6 leading-relaxed text-ink-soft"
        />
      ))}

      {editing && (
        <div className="mt-4 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-accent">
          <button
            type="button"
            onClick={() =>
              setDraft((d) => ({
                ...d,
                press: {
                  ...d.press,
                  paragraphs: [
                    ...(d.press.paragraphs?.length ? d.press.paragraphs : [d.press.intro]),
                    "",
                  ],
                },
              }))
            }
          >
            + Parágrafo
          </button>
          <button
            type="button"
            onClick={() =>
              setDraft((d) => ({
                ...d,
                press: {
                  ...d.press,
                  sections: [
                    ...(d.press.sections ?? []),
                    { heading: "Nova seção", paragraphs: [""] },
                  ],
                },
              }))
            }
          >
            + Seção
          </button>
        </div>
      )}

      {sections.map((sec, i) => (
        <section key={i} className="mt-10">
          <EditableText
            editing={editing}
            value={sec.heading}
            onChange={(v) =>
              setDraft((d) => {
                const next = (d.press.sections ?? []).map((s, j) =>
                  j === i ? { ...s, heading: v } : s,
                );
                return { ...d, press: { ...d.press, sections: next } };
              })
            }
            className="font-display text-2xl"
          />
          {sec.paragraphs.map((p, pi) => (
            <EditableText
              key={pi}
              editing={editing}
              value={p}
              multiline
              onChange={(v) =>
                setDraft((d) => {
                  const next = (d.press.sections ?? []).map((s, j) =>
                    j === i
                      ? {
                          ...s,
                          paragraphs: s.paragraphs.map((x, k) => (k === pi ? v : x)),
                        }
                      : s,
                  );
                  return { ...d, press: { ...d.press, sections: next } };
                })
              }
              className="mt-3 leading-relaxed"
            />
          ))}
        </section>
      ))}

      <section className="mt-12">
        <h2 className="font-display text-2xl">Trocas de lead</h2>
        <ul className="mt-6 space-y-4">
          {press.frames.map((fr, i) => (
            <li key={i} className="grid gap-2 border border-box-edge bg-box p-4 sm:grid-cols-2">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">Evitar</p>
                <EditableText
                  editing={editing}
                  value={fr.bad}
                  onChange={(v) =>
                    setDraft((d) => {
                      const frames = d.press.frames.map((f, j) =>
                        j === i ? { ...f, bad: v } : f,
                      );
                      return { ...d, press: { ...d.press, frames } };
                    })
                  }
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.14em] text-accent">Preferir</p>
                <EditableText
                  editing={editing}
                  value={fr.good}
                  onChange={(v) =>
                    setDraft((d) => {
                      const frames = d.press.frames.map((f, j) =>
                        j === i ? { ...f, good: v } : f,
                      );
                      return { ...d, press: { ...d.press, frames } };
                    })
                  }
                  className="mt-1 text-sm"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
