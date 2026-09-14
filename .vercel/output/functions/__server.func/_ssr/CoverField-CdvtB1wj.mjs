import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial } from "./utils-CSXrLyg1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CoverField-CdvtB1wj.js
var import_jsx_runtime = require_jsx_runtime();
function CoverField({ film }) {
	const { editing, setCover } = useEditorial();
	if (!editing) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-2 block cursor-pointer text-[0.7rem] uppercase tracking-[0.14em] text-accent",
		children: ["Adicionar ou trocar imagem de capa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			accept: "image/*",
			className: "sr-only",
			onChange: (e) => {
				const file = e.target.files?.[0];
				if (file) setCover(film.slug, file);
			}
		})]
	});
}
//#endregion
export { CoverField as t };
