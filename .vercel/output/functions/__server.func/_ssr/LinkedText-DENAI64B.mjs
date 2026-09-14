import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./utils-CSXrLyg1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LinkedText-DENAI64B.js
var import_jsx_runtime = require_jsx_runtime();
function tokenize(text) {
	const re = /(.+?)\s+"((https?:\/\/)[^"]+)"/g;
	const out = [];
	let last = 0;
	let m;
	while (m = re.exec(text)) {
		const before = m[1] ?? "";
		const href = m[2];
		const words = before.split(/(\s+)/);
		let cut = words.length;
		let count = 0;
		for (let i = words.length - 1; i >= 0; i--) {
			if (!words[i].trim()) continue;
			count += 1;
			if (count >= 6) {
				cut = i;
				break;
			}
			cut = i;
		}
		const prefix = words.slice(0, cut).join("");
		const label = words.slice(cut).join("").trim() || before.trim();
		if (m.index > last) out.push({ t: text.slice(last, m.index) });
		if (prefix) out.push({ t: prefix });
		out.push({
			t: label,
			href
		});
		last = m.index + m[0].length;
	}
	if (last < text.length) out.push({ t: text.slice(last) });
	if (!out.length) out.push({ t: text });
	return out;
}
function LinkedText({ text, className, as: Tag = "span" }) {
	if (!text) return null;
	const parts = tokenize(text);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		children: parts.map((p, i) => p.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: p.href,
			target: "_blank",
			rel: "noreferrer",
			className: "text-accent underline underline-offset-2",
			children: p.t
		}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.t }, i))
	});
}
function EditableText({ value, onChange, editing, multiline = false, className, placeholder = "" }) {
	if (!editing) return multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedText, {
		text: value,
		as: "p",
		className
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedText, {
		text: value,
		className
	});
	const shared = cn("w-full bg-paper-2 edit-ring px-2 py-1", className);
	if (multiline) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value,
		placeholder,
		onChange: (e) => onChange(e.target.value),
		rows: Math.max(3, value.split("\n").length + 1),
		className: cn(shared, "resize-y leading-relaxed")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		placeholder,
		onChange: (e) => onChange(e.target.value),
		className: shared
	});
}
//#endregion
export { LinkedText as n, EditableText as t };
