import { i as __toESM } from "../_runtime.mjs";
import { R as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial, o as isPublished, r as cn, s as latestPublished } from "./utils-CSXrLyg1.mjs";
import { c as ChevronDown } from "../_libs/lucide-react.mjs";
import { r as Logo } from "./router-Bj1TSpXq.mjs";
import { t as CoverField } from "./CoverField-CdvtB1wj.mjs";
import { n as LinkedText } from "./LinkedText-DENAI64B.mjs";
import { a as FilmCard, c as TopicLine, l as topicLabel, o as FilmPoster, s as Retranca } from "./FilmCard-C9Efo8Ou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BD8mph10.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GlossaryPanel({ className, fill = false }) {
	const { draft, editing } = useEditorial();
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(null);
	const terms = (0, import_react.useMemo)(() => {
		const list = draft.glossary ?? [];
		const needle = q.trim().toLowerCase();
		if (!needle) return list;
		return list.filter((t) => t.term.toLowerCase().includes(needle) || t.body.toLowerCase().includes(needle));
	}, [draft.glossary, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("flex flex-col border border-rule bg-box", fill && "h-full", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-rule px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Vocabulário"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl leading-none text-accent",
					children: "Glossário"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Pesquisar",
					className: "mt-3 w-full border border-rule bg-paper-2 px-2 py-1.5 text-sm outline-none focus:border-accent"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: cn("overflow-y-auto px-1 py-1", fill && "flex-1"),
			children: terms.map((t) => {
				const isOpen = open === t.slug || editing;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-rule/70 last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(isOpen ? null : t.slug),
						className: "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: t.term
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
							size: 14,
							className: cn("shrink-0 text-muted transition-transform", isOpen && "rotate-180")
						})]
					}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-3 text-[0.85rem] leading-relaxed text-ink-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedText, { text: t.body })
					})]
				}, t.slug);
			})
		})]
	});
}
function Home() {
	const { draft, editing } = useEditorial();
	const films = editing ? draft.films : draft.films.filter(isPublished);
	const featured = latestPublished(draft.films) ?? films[0];
	const rest = films.filter((f) => f.slug !== featured?.slug);
	const extra = draft.extraDomains ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-b border-rule py-8 sm:py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					size: "home",
					stacked: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft",
					children: draft.about.tagline
				})]
			}),
			featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 py-10 lg:grid-cols-[minmax(0,1.35fr)_16rem] lg:items-stretch",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 sm:grid-cols-[8.5rem_minmax(0,1fr)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/analises/$slug",
								params: { slug: featured.slug },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmPoster, {
									film: featured,
									className: "border border-rule"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverField, { film: featured }),
							featured.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted",
								children: formatDate(featured.date)
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Retranca, { film: featured }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[0.95] tracking-tight",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/analises/$slug",
									params: { slug: featured.slug },
									className: "hover:text-accent",
									children: featured.title
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicLine, { labels: featured.domains.map((d) => topicLabel(d, extra)) }),
							featured.excerpt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedText, {
								as: "p",
								className: "mt-4 text-[1.05rem] leading-relaxed text-ink-soft",
								text: featured.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/analises/$slug",
								params: { slug: featured.slug },
								className: "mt-4 inline-block text-[0.72rem] uppercase tracking-[0.16em] text-accent",
								children: "Ler a análise"
							})
						] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlossaryPanel, {
					fill: true,
					className: "min-h-[22rem]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule pt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-x-8 gap-y-10",
					children: rest.map((film) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmCard, { film }, film.slug))
				})
			})
		]
	});
}
function formatDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
}
//#endregion
export { Home as component };
