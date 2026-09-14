import type { EditorialSnapshot, Film } from "@/data/types";
import seed from "@/data/seed.json";

export const LS_KEY = "gifted-media-draft-v6";
export const IDB_NAME = "gifted-media";
export const IDB_STORE = "blobs";

export const SEED = seed as EditorialSnapshot;

export function isPublished(film: Film) {
  return film.draft !== true;
}

export function latestPublished(films: Film[]): Film | undefined {
  const pub = films.filter(isPublished);
  if (!pub.length) return undefined;
  return [...pub].sort((a, b) => {
    const da = a.date || "";
    const db = b.date || "";
    if (da !== db) return db.localeCompare(da);
    return films.indexOf(b) - films.indexOf(a);
  })[0];
}

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export function blankFilm(title = "Nova análise"): Film {
  const slug = slugify(title) || `analise-${Date.now()}`;
  const today = new Date().toISOString().slice(0, 10);
  return {
    slug,
    title,
    originalTitle: "",
    year: new Date().getFullYear(),
    country: "Brasil",
    director: "",
    format: "filme",
    genre: "",
    duration: "",
    domains: [],
    stereotypeIds: [],
    still: `/stills/${slug}.svg`,
    kicker: "Análise",
    excerpt: "",
    date: today,
    draft: true,
    offerHeading: "O que este filme oferece",
    sections: [
      { heading: "Sinopse", paragraphs: [""] },
      { heading: "Comportamentos e estereótipos", paragraphs: [""] },
      { heading: 'Tensão com o "mundo normal"', paragraphs: [""] },
      { heading: "Mediação pedagógica", paragraphs: [""] },
    ],
    viewingGuide: [],
    forFamily: "",
    forTeacher: "",
    forPress: "",
    references: [""],
  };
}

export function toSnapshot(draft: EditorialSnapshot): EditorialSnapshot {
  return {
    ...draft,
    exportedAt: new Date().toISOString(),
  };
}

export function downloadSnapshotFile(draft: EditorialSnapshot) {
  const snap = toSnapshot(draft);
  const blob = new Blob([JSON.stringify(snap, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "gifted-and-media-conteudo.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function filmPlainText(film: Film) {
  const lines = [
    film.title,
    film.originalTitle && film.originalTitle !== film.title
      ? `(${film.originalTitle})`
      : "",
    [film.format, film.genre, film.year, film.country, film.director]
      .filter(Boolean)
      .join(" · "),
    film.excerpt,
    "",
    ...film.sections.flatMap((s) => [s.heading, ...s.paragraphs, ""]),
    film.offerHeading || "O que este filme oferece",
    film.forFamily && `Em casa. ${film.forFamily}`,
    film.forTeacher && `Na escola. ${film.forTeacher}`,
    film.forPress && `Na pauta. ${film.forPress}`,
    film.references?.filter(Boolean).length
      ? `Referências\n${film.references.filter(Boolean).join("\n")}`
      : "",
  ];
  return lines.filter((x) => x !== undefined).join("\n");
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
      if (!db.objectStoreNames.contains("proofs")) {
        db.createObjectStore("proofs", { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbSet(key: string, value: Blob | string) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function idbGet(key: string): Promise<Blob | string | undefined> {
  const db = await openDb();
  const val = await new Promise<Blob | string | undefined>((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readonly");
    const req = tx.objectStore(IDB_STORE).get(key);
    req.onsuccess = () => resolve(req.result as Blob | string | undefined);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return val;
}

export function loadLocal(): EditorialSnapshot | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EditorialSnapshot;
    if (!parsed?.films?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveLocal(draft: EditorialSnapshot) {
  const snap = toSnapshot(draft);
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(snap));
  } catch {
    // quota — keep going, IDB/download still work
  }
}

export function mergeSeed(overlay: EditorialSnapshot | null): EditorialSnapshot {
  if (!overlay) return structuredClone(SEED);
  return {
    ...SEED,
    ...overlay,
    films: overlay.films?.length ? overlay.films : SEED.films,
    glossary: overlay.glossary?.length ? overlay.glossary : SEED.glossary,
    articles: overlay.articles?.length ? overlay.articles : SEED.articles,
    extraDomains: overlay.extraDomains ?? SEED.extraDomains ?? {},
    deletedDomainSlugs: overlay.deletedDomainSlugs ?? SEED.deletedDomainSlugs ?? [],
    glossaryIntro: overlay.glossaryIntro ?? SEED.glossaryIntro,
    referencial: overlay.referencial ?? SEED.referencial,
    about: overlay.about ?? SEED.about,
    press: overlay.press ?? SEED.press,
  };
}

