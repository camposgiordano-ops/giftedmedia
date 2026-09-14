import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { EditorialSnapshot, Film } from "@/data/types";
import {
  downloadSnapshotFile,
  idbSet,
  loadLocal,
  mergeSeed,
  saveLocal,
} from "@/lib/editorial";

type Ctx = {
  ready: boolean;
  editing: boolean;
  dirty: boolean;
  setEditing: (v: boolean) => void;
  draft: EditorialSnapshot;
  setDraft: (fn: (d: EditorialSnapshot) => EditorialSnapshot) => void;
  patchFilm: (slug: string, patch: Partial<Film> | ((f: Film) => Film)) => void;
  save: (opts?: { download?: boolean }) => void;
  publish: (slug: string, on?: boolean) => void;
  setCover: (slug: string, file: File) => Promise<void>;
};

const EditorialCtx = createContext<Ctx | null>(null);

export function EditorialProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<EditorialSnapshot>(() => mergeSeed(null));
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  useEffect(() => {
    const local = loadLocal();
    if (local) setDraftState(mergeSeed(local));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !dirty) return;
    const t = window.setTimeout(() => saveLocal(draft), 400);
    return () => window.clearTimeout(t);
  }, [draft, ready, dirty]);

  useEffect(() => {
    const onLeave = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const setDraft = useCallback((fn: (d: EditorialSnapshot) => EditorialSnapshot) => {
    setDraftState((prev) => fn(prev));
    setDirty(true);
  }, []);

  const patchFilm = useCallback(
    (slug: string, patch: Partial<Film> | ((f: Film) => Film)) => {
      setDraft((d) => ({
        ...d,
        films: d.films.map((f) => {
          if (f.slug !== slug) return f;
          return typeof patch === "function" ? patch(f) : { ...f, ...patch };
        }),
      }));
    },
    [setDraft],
  );

  const save = useCallback(
    (opts?: { download?: boolean }) => {
      saveLocal(draftRef.current);
      if (opts?.download !== false) downloadSnapshotFile(draftRef.current);
      setDirty(false);
    },
    [],
  );

  const publish = useCallback(
    (slug: string, on = true) => {
      patchFilm(slug, { draft: on ? false : true });
      window.setTimeout(() => save({ download: true }), 0);
    },
    [patchFilm, save],
  );

  const setCover = useCallback(async (slug: string, file: File) => {
    const key = `still:${slug}`;
    await idbSet(key, file);
    const url = URL.createObjectURL(file);
    patchFilm(slug, { still: `idb:${slug}` });
    coverCache.set(slug, url);
  }, [patchFilm]);

  const value = useMemo<Ctx>(
    () => ({
      ready,
      editing,
      dirty,
      setEditing,
      draft,
      setDraft,
      patchFilm,
      save,
      publish,
      setCover,
    }),
    [ready, editing, dirty, draft, setDraft, patchFilm, save, publish, setCover],
  );

  return <EditorialCtx.Provider value={value}>{children}</EditorialCtx.Provider>;
}

const coverCache = new Map<string, string>();

export function peekCover(slug: string) {
  return coverCache.get(slug);
}

export function rememberCover(slug: string, url: string) {
  coverCache.set(slug, url);
}

export function useEditorial() {
  const ctx = useContext(EditorialCtx);
  if (!ctx) throw new Error("useEditorial outside provider");
  return ctx;
}
