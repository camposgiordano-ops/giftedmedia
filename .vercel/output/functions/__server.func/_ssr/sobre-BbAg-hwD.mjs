import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial } from "./utils-CSXrLyg1.mjs";
import { r as Logo } from "./router-Bj1TSpXq.mjs";
import { t as EditableText } from "./LinkedText-DENAI64B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sobre-BbAg-hwD.js
var import_jsx_runtime = require_jsx_runtime();
function Sobre() {
	const { draft, editing, setDraft } = useEditorial();
	const about = draft.about;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl py-10 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "O projeto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "sr-only",
				children: "Sobre"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					size: "about",
					to: null,
					stacked: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				editing,
				value: about.tagline,
				onChange: (v) => setDraft((d) => ({
					...d,
					about: {
						...d.about,
						tagline: v
					}
				})),
				multiline: true,
				className: "mt-6 text-[1.05rem] leading-relaxed text-ink-soft"
			}),
			about.sections.map((sec, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
					editing,
					value: sec.heading,
					onChange: (v) => setDraft((d) => {
						const sections = d.about.sections.map((s, j) => j === i ? {
							...s,
							heading: v
						} : s);
						return {
							...d,
							about: {
								...d.about,
								sections
							}
						};
					}),
					className: "font-display text-2xl leading-tight"
				}), sec.paragraphs.map((p, pi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
					editing,
					value: p,
					multiline: true,
					onChange: (v) => setDraft((d) => {
						const sections = d.about.sections.map((s, j) => j === i ? {
							...s,
							paragraphs: s.paragraphs.map((x, k) => k === pi ? v : x)
						} : s);
						return {
							...d,
							about: {
								...d.about,
								sections
							}
						};
					}),
					className: "mt-4 leading-relaxed"
				}, pi))]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 border-t border-rule pt-6 text-sm text-muted",
				children: about.disclaimer
			})
		]
	});
}
//#endregion
export { Sobre as component };
