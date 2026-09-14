import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { EditableText } from "@/components/LinkedText";
import { useEditorial } from "@/components/EditorialProvider";

export const Route = createFileRoute("/sobre")({ component: Sobre });

function Sobre() {
  const { draft, editing, setDraft } = useEditorial();
  const about = draft.about;

  return (
    <main className="mx-auto max-w-3xl py-10 pb-16">
      <p className="kicker">O projeto</p>
      <h1 className="sr-only">Sobre</h1>
      <div className="mt-4">
        <Logo size="about" to={null} />
      </div>
      <EditableText
        editing={editing}
        value={about.tagline}
        onChange={(v) => setDraft((d) => ({ ...d, about: { ...d.about, tagline: v } }))}
        multiline
        className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft"
      />

      {about.sections.map((sec, i) => (
        <section key={i} className="mt-10">
          <EditableText
            editing={editing}
            value={sec.heading}
            onChange={(v) =>
              setDraft((d) => {
                const sections = d.about.sections.map((s, j) =>
                  j === i ? { ...s, heading: v } : s,
                );
                return { ...d, about: { ...d.about, sections } };
              })
            }
            className="font-display text-2xl leading-tight"
          />
          {sec.paragraphs.map((p, pi) => (
            <EditableText
              key={pi}
              editing={editing}
              value={p}
              multiline
              onChange={(v) =>
                setDraft((d) => {
                  const sections = d.about.sections.map((s, j) =>
                    j === i
                      ? {
                          ...s,
                          paragraphs: s.paragraphs.map((x, k) => (k === pi ? v : x)),
                        }
                      : s,
                  );
                  return { ...d, about: { ...d.about, sections } };
                })
              }
              className="mt-4 leading-relaxed"
            />
          ))}
        </section>
      ))}

      <p className="mt-12 border-t border-rule pt-6 text-sm text-muted">
        {about.disclaimer}
      </p>
    </main>
  );
}
