import { i as __toESM } from "../_runtime.mjs";
import { R as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as idbGet, c as peekCover, d as useEditorial, l as rememberCover, r as cn } from "./utils-CSXrLyg1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FilmCard-C9Efo8Ou.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FilmPoster({ film, className, alt }) {
	const [src, setSrc] = (0, import_react.useState)(() => {
		if (film.still?.startsWith("idb:")) return peekCover(film.slug) || fallback(film);
		return film.still || fallback(film);
	});
	(0, import_react.useEffect)(() => {
		let dead = false;
		const still = film.still || "";
		if (still.startsWith("idb:")) {
			const cached = peekCover(film.slug);
			if (cached) {
				setSrc(cached);
				return;
			}
			idbGet(`still:${film.slug}`).then((blob) => {
				if (dead) return;
				if (blob instanceof Blob) {
					const url = URL.createObjectURL(blob);
					rememberCover(film.slug, url);
					setSrc(url);
				} else setSrc(fallback(film));
			});
		} else setSrc(still || fallback(film));
		return () => {
			dead = true;
		};
	}, [film.slug, film.still]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: alt ?? film.title,
		className: cn("aspect-2/3 w-full object-cover bg-ink", className),
		onError: (e) => {
			const el = e.currentTarget;
			const fb = fallback(film);
			if (el.src.endsWith(fb)) return;
			el.src = fb;
		}
	});
}
function fallback(film) {
	return `/stills/${film.slug}.svg`;
}
var FORMAT_LABEL = {
	filme: "Filme",
	serie: "Série",
	livro: "Livro"
};
var FORMAT_PLURAL = {
	filme: "Filmes",
	serie: "Séries",
	livro: "Livros"
};
var TOPIC_LABEL = {
	matematica: "Matemática",
	xadrez: "Xadrez",
	verbal: "Verbal",
	multipotencial: "Multipotencial",
	artes: "Artes",
	ciencias: "Ciências",
	"savant-autismo-e-ah-sd": "Savant, autismo e AH/SD",
	"isolamento-e-sofrimento": "Isolamento e sofrimento",
	"familia-como-obstaculo": "Família como obstáculo",
	underachievement: "Underachievement",
	"superdotacao-feminina": "Superdotação feminina",
	"prodigio-como-espetaculo": "Prodígio como espetáculo",
	"ah-sd-como-ascencao-social": "AH/SD como ascensão social",
	"estereotipos-raciais": "Estereótipos raciais",
	"genio-e-loucura": "Gênio e loucura",
	"isolamento-como-destino": "Isolamento como destino",
	"savant-e-autismo": "Savant e autismo",
	"padrao-homem-branco-stem": "Padrão homem-branco-STEM",
	"sofrimento-como-preco": "Sofrimento como preço",
	"matematica-como-unica-area": "Matemática como única área",
	"matematica-como-ascencao-social": "Matemática como ascensão social",
	"subidentificacao-feminina": "Subidentificação feminina"
};
function topicLabel(slug, extra = {}) {
	return extra[slug] || TOPIC_LABEL[slug] || slug;
}
var COUNTRY_ISO = {
	eua: "us",
	usa: "us",
	"estados unidos": "us",
	"estados unidos da américa": "us",
	mexico: "mx",
	méxico: "mx",
	brasil: "br",
	argentina: "ar",
	"reino unido": "gb",
	uk: "gb",
	inglaterra: "gb",
	india: "in",
	índia: "in",
	franca: "fr",
	frança: "fr",
	alemanha: "de",
	espanha: "es",
	italia: "it",
	itália: "it",
	canada: "ca",
	canadá: "ca",
	japao: "jp",
	japão: "jp",
	"coreia do sul": "kr",
	china: "cn",
	russia: "ru",
	rússia: "ru"
};
function countryIso(country) {
	if (!country) return null;
	const key = country.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();
	return COUNTRY_ISO[country.toLowerCase().trim()] || COUNTRY_ISO[key] || null;
}
function CountryFlag({ country, className }) {
	const iso = countryIso(country);
	if (!iso) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/flags/${iso}.svg`,
		alt: "",
		width: 18,
		height: 12,
		className: cn("inline-block shrink-0 object-cover align-[-1.5px]", className),
		style: {
			width: 18,
			height: 12
		}
	});
}
function Retranca({ film, className }) {
	const bits = [
		FORMAT_LABEL[film.format] || film.format,
		film.genre,
		film.year ? String(film.year) : ""
	].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("kicker flex flex-wrap items-center gap-x-2 gap-y-1 normal-case tracking-[0.16em]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryFlag, { country: film.country }), bits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 uppercase",
			children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "text-accent-soft",
				children: "·"
			}), b]
		}, i))]
	});
}
function TopicLine({ labels, className }) {
	if (!labels.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mt-2 text-[0.72rem] leading-snug text-muted", className),
		children: labels.join(" · ")
	});
}
function FilmCard({ film, compact = false }) {
	const { draft } = useEditorial();
	const extra = draft.extraDomains ?? {};
	const topics = film.domains.map((d) => topicLabel(d, extra));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("min-w-0", compact && "text-[0.92rem]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/analises/$slug",
				params: { slug: film.slug },
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmPoster, {
					film,
					className: "border border-rule"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Retranca, {
				film,
				className: "mt-2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-[1.15rem] leading-tight tracking-tight text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/analises/$slug",
					params: { slug: film.slug },
					className: "hover:text-accent",
					children: film.title
				})
			}),
			topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[0.72rem] leading-snug text-muted",
				children: topics.join(" · ")
			})
		]
	});
}
function CatalogThumb({ film }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/analises/$slug",
				params: { slug: film.slug },
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmPoster, {
					film,
					className: "border border-rule"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Retranca, {
				film,
				className: "mt-1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-[0.98rem] leading-tight tracking-tight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/analises/$slug",
					params: { slug: film.slug },
					className: "hover:text-accent",
					children: film.title
				})
			})
		]
	});
}
//#endregion
export { FilmCard as a, TopicLine as c, FORMAT_PLURAL as i, topicLabel as l, CountryFlag as n, FilmPoster as o, FORMAT_LABEL as r, Retranca as s, CatalogThumb as t };
