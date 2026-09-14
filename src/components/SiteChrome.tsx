import { Link, useRouterState } from "@tanstack/react-router";
import { Pencil, Save, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useEditorial } from "@/components/EditorialProvider";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/sobre", label: "Sobre" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/imprensa", label: "Imprensa" },
  { to: "/glossario", label: "Glossário" },
] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { editing, setEditing, save, dirty } = useEditorial();
  const { draft } = useEditorial();
  const tagline = draft.about.tagline;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="bg-inverse text-on-inverse">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo size="header" />
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-sm text-inverse-muted">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "hover:text-on-inverse",
                  pathname === item.to && "text-on-inverse",
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setEditing(!editing)}
              aria-label={editing ? "Sair da edição" : "Editar"}
              className={cn(
                "ml-1 inline-flex size-8 items-center justify-center rounded-full border border-on-inverse/20 text-on-inverse hover:text-accent",
                editing && "border-accent bg-accent/15 text-accent",
              )}
            >
              {editing ? <X size={14} /> : <Pencil size={14} />}
            </button>
          </nav>
        </div>
        {editing && (
          <div className="border-t border-rule bg-box">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
              <p className="text-xs text-muted">
                Modo edição. Salvar baixa o JSON — envie o arquivo para gravar de forma permanente.
                {dirty ? " Há alterações não exportadas." : ""}
              </p>
              <button
                type="button"
                onClick={() => save({ download: true })}
                className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-paper-2"
              >
                <Save size={12} /> Salvar
              </button>
            </div>
          </div>
        )}
      </header>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
      <footer className="mt-16 bg-inverse text-on-inverse">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <Logo size="footer" />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-inverse-muted">
              {tagline}
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-inverse-muted">
            Brasília · UnB / SEEDF
          </p>
        </div>
      </footer>
    </div>
  );
}
