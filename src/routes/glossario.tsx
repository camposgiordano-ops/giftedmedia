import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { EditableText, LinkedText } from "@/components/LinkedText";
import { useEditorial } from "@/components/EditorialProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/glossario")({ component: Glossario });

function Glossario() {
  const { draft, editing, setDraft } = useEditorial();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return draft.glossary;
    return draft.glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(needle) ||
        t.body.toLowerCase().includes(needle),
    );
  }, [draft.glossary, q]);

  return (
    <main className="mx-auto max-w-3xl py-10 pb-16">
      <p className="kicker">Vocabulário</p>
      <h1 className="font-display text-5xl leading-none text-accent">Glossário</h1>
      <EditableText
        editing={editing}
        value={draft.glossaryIntro ?? ""}
        multiline
        onChange={(v) => setDraft((d) => ({ ...d, glossaryIntro: v }))}
        className="mt-5 leading-relaxed text-ink-soft"
      />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Pesquisar termo"
        className="mt-8 w-full border border-rule bg-paper-2 px-3 py-2 text-sm"
      />
      <ul className="mt-4 border-t border-rule">
        {terms.map((t, i) => {
          const isOpen = open === t.slug || editing;
          const idx = draft.glossary.findIndex((x) => x.slug === t.slug);
          return (
            <li key={t.slug} className="border-b border-rule">
              <button
                type="button"
                onClick={() => setOpen(isOpen && !editing ? null : t.slug)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
              >
                <span className="font-display text-xl">{t.term}</span>
                <ChevronDown
                  size={16}
                  className={cn("text-muted transition-transform", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div className="pb-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  {editing ? (
                    <EditableText
                      editing
                      value={t.body}
                      multiline
                      onChange={(v) =>
                        setDraft((d) => ({
                          ...d,
                          glossary: d.glossary.map((g, j) =>
                            j === idx ? { ...g, body: v } : g,
                          ),
                        }))
                      }
                    />
                  ) : (
                    <LinkedText text={t.body} />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
