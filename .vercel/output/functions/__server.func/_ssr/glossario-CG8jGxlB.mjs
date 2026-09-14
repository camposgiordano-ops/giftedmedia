import { i as __toESM } from "../_runtime.mjs";
import { R as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial, r as cn } from "./utils-CSXrLyg1.mjs";
import { c as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as LinkedText, t as EditableText } from "./LinkedText-DENAI64B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/glossario-CG8jGxlB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Glossario() {
	const { draft, editing, setDraft } = useEditorial();
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(null);
	const terms = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		if (!needle) return draft.glossary;
		return draft.glossary.filter((t) => t.term.toLowerCase().includes(needle) || t.body.toLowerCase().includes(needle));
	}, [draft.glossary, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl py-10 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Vocabulário"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-none text-accent",
				children: "Glossário"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				editing,
				value: draft.glossaryIntro ?? "",
				multiline: true,
				onChange: (v) => setDraft((d) => ({
					...d,
					glossaryIntro: v
				})),
				className: "mt-5 leading-relaxed text-ink-soft"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Pesquisar termo",
				className: "mt-8 w-full border border-rule bg-paper-2 px-3 py-2 text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 border-t border-rule",
				children: terms.map((t, i) => {
					const isOpen = open === t.slug || editing;
					const idx = draft.glossary.findIndex((x) => x.slug === t.slug);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-rule",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOpen(isOpen && !editing ? null : t.slug),
							className: "flex w-full items-center justify-between gap-3 py-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl",
								children: t.term
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								size: 16,
								className: cn("text-muted transition-transform", isOpen && "rotate-180")
							})]
						}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pb-4 text-[0.98rem] leading-relaxed text-ink-soft",
							children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
								editing: true,
								value: t.body,
								multiline: true,
								onChange: (v) => setDraft((d) => ({
									...d,
									glossary: d.glossary.map((g, j) => j === idx ? {
										...g,
										body: v
									} : g)
								}))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedText, { text: t.body })
						})]
					}, t.slug);
				})
			})
		]
	});
}
//#endregion
export { Glossario as component };
