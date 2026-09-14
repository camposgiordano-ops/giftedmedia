import { i as __toESM } from "../_runtime.mjs";
import { R as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial, n as blankFilm, o as isPublished, r as cn, u as slugify } from "./utils-CSXrLyg1.mjs";
import { i as FORMAT_PLURAL, l as topicLabel, t as CatalogThumb } from "./FilmCard-C9Efo8Ou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo-0Z1cnapx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Catalogo() {
	const { draft, editing, setDraft } = useEditorial();
	const extra = draft.extraDomains ?? {};
	const [q, setQ] = (0, import_react.useState)("");
	const [formats, setFormats] = (0, import_react.useState)([]);
	const [topics, setTopics] = (0, import_react.useState)([]);
	const [newTopic, setNewTopic] = (0, import_react.useState)("");
	const allTopics = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Map();
		for (const [slug, label] of Object.entries(extra)) set.set(slug, label);
		for (const f of draft.films) for (const d of f.domains) set.set(d, topicLabel(d, extra));
		const deleted = new Set(draft.deletedDomainSlugs ?? []);
		return [...set.entries()].filter(([slug]) => !deleted.has(slug)).sort((a, b) => a[1].localeCompare(b[1], "pt"));
	}, [
		draft.films,
		extra,
		draft.deletedDomainSlugs
	]);
	const list = (0, import_react.useMemo)(() => {
		return (editing ? draft.films : draft.films.filter(isPublished)).filter((f) => {
			if (formats.length && !formats.includes(f.format)) return false;
			if (topics.length && !topics.every((t) => f.domains.includes(t))) return false;
			if (q.trim()) {
				if (!`${f.title} ${f.originalTitle ?? ""} ${f.director ?? ""} ${f.excerpt ?? ""}`.toLowerCase().includes(q.trim().toLowerCase())) return false;
			}
			return true;
		});
	}, [
		draft.films,
		editing,
		formats,
		topics,
		q
	]);
	function toggle(list, v, set) {
		set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-10 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Análises"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-none text-accent",
				children: "Catálogo"
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border border-rule bg-box p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[0.7rem] uppercase tracking-[0.14em] text-muted",
						children: "Tópicos para categorizar as análises"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: allTopics.map(([slug, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setDraft((d) => ({
								...d,
								deletedDomainSlugs: [...d.deletedDomainSlugs ?? [], slug],
								extraDomains: Object.fromEntries(Object.entries(d.extraDomains ?? {}).filter(([k]) => k !== slug)),
								films: d.films.map((f) => ({
									...f,
									domains: f.domains.filter((x) => x !== slug)
								}))
							})),
							className: "border border-rule bg-paper-2 px-2 py-1 text-[0.7rem] hover:border-accent hover:text-accent",
							children: [label, " ×"]
						}, slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-3 flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							const label = newTopic.trim();
							if (!label) return;
							const slug = slugify(label);
							setDraft((d) => ({
								...d,
								extraDomains: {
									...d.extraDomains ?? {},
									[slug]: label
								},
								deletedDomainSlugs: (d.deletedDomainSlugs ?? []).filter((x) => x !== slug)
							}));
							setNewTopic("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newTopic,
							onChange: (e) => setNewTopic(e.target.value),
							placeholder: "Novo tópico",
							className: "flex-1 border border-rule bg-paper-2 px-2 py-1 text-sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bg-accent px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-paper-2",
							children: "Adicionar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-accent",
						onClick: () => setDraft((d) => ({
							...d,
							films: [blankFilm(), ...d.films]
						})),
						children: "+ Nova análise"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-5",
					children: list.map((film) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogThumb, { film }, film.slug))
				}), !list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nenhuma análise neste recorte."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-4 h-fit border border-rule bg-box p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-[0.7rem] uppercase tracking-[0.14em] text-muted",
							children: ["Pesquisa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								className: "mt-1 w-full border border-rule bg-paper-2 px-2 py-1.5 text-sm text-ink",
								placeholder: "Título, diretor…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-[0.7rem] uppercase tracking-[0.14em] text-muted",
							children: "Formatos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-col gap-1",
							children: [
								"filme",
								"serie",
								"livro"
							].map((fmt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-[0.8rem]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: formats.includes(fmt),
									onChange: () => toggle(formats, fmt, setFormats)
								}), FORMAT_PLURAL[fmt]]
							}, fmt))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-[0.7rem] uppercase tracking-[0.14em] text-muted",
							children: "Tópicos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-col gap-1",
							children: allTopics.map(([slug, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-2 text-[0.75rem] leading-snug",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "mt-0.5",
									checked: topics.includes(slug),
									onChange: () => toggle(topics, slug, setTopics)
								}), label]
							}, slug))
						}),
						(formats.length || topics.length || q) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("mt-4 text-[0.7rem] uppercase tracking-[0.14em] text-accent"),
							onClick: () => {
								setFormats([]);
								setTopics([]);
								setQ("");
							},
							children: "Limpar filtros"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Catalogo as component };
