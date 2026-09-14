import { useEditorial } from "@/components/EditorialProvider";
import type { Film } from "@/data/types";

export function CoverField({ film }: { film: Film }) {
  const { editing, setCover } = useEditorial();
  if (!editing) return null;
  return (
    <label className="mt-2 block cursor-pointer text-[0.7rem] uppercase tracking-[0.14em] text-accent">
      Adicionar ou trocar imagem de capa
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void setCover(film.slug, file);
        }}
      />
    </label>
  );
}
