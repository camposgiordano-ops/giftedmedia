import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useEditorial } from "@/components/EditorialProvider";
import { LinkedText } from "@/components/LinkedText";
import { cn } from "@/lib/utils";

export function GlossaryPanel({
  className,
  fill = false,
}: {
  className?: string;
  fill?: boolean;
}) {
  const { draft, editing } = useEditorial();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const terms = useMemo(() => {
    const list = draft.glossary ?? [];
    const needle = q.trim().toLowerCase();
    if (!needle) return list;
    return list.filter(
      (t) =>
        t.term.toLowerCase().includes(needle) ||
        t.body.toLowerCase().includes(needle),
    );
  }, [draft.glossary, q]);

  return (
    <aside
      className={cn(
        "flex flex-col border border-rule bg-box",
        fill && "h-full",
        className,
      )}
    >
      <div className="border-b border-rule px-4 py-3">
        <p className="kicker">Vocabulário</p>
        <h2 className="font-display text-2xl leading-none text-accent">
          Glossário
        </h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pesquisar"
          className="mt-3 w-full border border-rule bg-paper-2 px-2 py-1.5 text-sm outline-none focus:border-accent"
        />
      </div>
      <ul className={cn("overflow-y-auto px-1 py-1", fill && "flex-1")}>
        {terms.map((t) => {
          const isOpen = open === t.slug || editing;
          return (
            <li key={t.slug} className="border-b border-rule/70 last:border-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : t.slug)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm"
              >
                <span className="font-medium">{t.term}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "shrink-0 text-muted transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-3 pb-3 text-[0.85rem] leading-relaxed text-ink-soft">
                  <LinkedText text={t.body} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
