import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial } from "./utils-CSXrLyg1.mjs";
import { t as EditableText } from "./LinkedText-DENAI64B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/imprensa-BTf6YsVj.js
var import_jsx_runtime = require_jsx_runtime();
function Imprensa() {
	const { draft, editing, setDraft } = useEditorial();
	const press = draft.press;
	const paragraphs = press.paragraphs?.length ? press.paragraphs : [press.intro];
	const sections = press.sections ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl py-10 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Imprensa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.95] text-accent",
				children: "Guia de Contra-Enquadramento"
			}),
			paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				editing,
				value: p,
				multiline: true,
				onChange: (v) => setDraft((d) => {
					const next = [...d.press.paragraphs?.length ? d.press.paragraphs : [d.press.intro]];
					next[i] = v;
					return {
						...d,
						press: {
							...d.press,
							paragraphs: next,
							intro: next[0] ?? ""
						}
					};
				}),
				className: "mt-6 leading-relaxed text-ink-soft"
			}, i)),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDraft((d) => ({
						...d,
						press: {
							...d.press,
							paragraphs: [...d.press.paragraphs?.length ? d.press.paragraphs : [d.press.intro], ""]
						}
					})),
					children: "+ Parágrafo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setDraft((d) => ({
						...d,
						press: {
							...d.press,
							sections: [...d.press.sections ?? [], {
								heading: "Nova seção",
								paragraphs: [""]
							}]
						}
					})),
					children: "+ Seção"
				})]
			}),
			sections.map((sec, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
					editing,
					value: sec.heading,
					onChange: (v) => setDraft((d) => {
						const next = (d.press.sections ?? []).map((s, j) => j === i ? {
							...s,
							heading: v
						} : s);
						return {
							...d,
							press: {
								...d.press,
								sections: next
							}
						};
					}),
					className: "font-display text-2xl"
				}), sec.paragraphs.map((p, pi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
					editing,
					value: p,
					multiline: true,
					onChange: (v) => setDraft((d) => {
						const next = (d.press.sections ?? []).map((s, j) => j === i ? {
							...s,
							paragraphs: s.paragraphs.map((x, k) => k === pi ? v : x)
						} : s);
						return {
							...d,
							press: {
								...d.press,
								sections: next
							}
						};
					}),
					className: "mt-3 leading-relaxed"
				}, pi))]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Trocas de lead"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-4",
					children: press.frames.map((fr, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 border border-box-edge bg-box p-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.68rem] uppercase tracking-[0.14em] text-muted",
							children: "Evitar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
							editing,
							value: fr.bad,
							onChange: (v) => setDraft((d) => {
								const frames = d.press.frames.map((f, j) => j === i ? {
									...f,
									bad: v
								} : f);
								return {
									...d,
									press: {
										...d.press,
										frames
									}
								};
							}),
							className: "mt-1 text-sm"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.68rem] uppercase tracking-[0.14em] text-accent",
							children: "Preferir"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
							editing,
							value: fr.good,
							onChange: (v) => setDraft((d) => {
								const frames = d.press.frames.map((f, j) => j === i ? {
									...f,
									good: v
								} : f);
								return {
									...d,
									press: {
										...d.press,
										frames
									}
								};
							}),
							className: "mt-1 text-sm"
						})] })]
					}, i))
				})]
			})
		]
	});
}
//#endregion
export { Imprensa as component };
