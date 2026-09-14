import { R as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as useEditorial, i as filmPlainText, o as isPublished, r as cn } from "./utils-CSXrLyg1.mjs";
import { a as Eye, o as EyeOff, s as Copy } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-Bj1TSpXq.mjs";
import { t as CoverField } from "./CoverField-CdvtB1wj.mjs";
import { n as LinkedText, t as EditableText } from "./LinkedText-DENAI64B.mjs";
import { c as TopicLine, l as topicLabel, n as CountryFlag, o as FilmPoster, r as FORMAT_LABEL, s as Retranca, t as CatalogThumb } from "./FilmCard-C9Efo8Ou.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analises._slug-3iGHac0t.js
var import_jsx_runtime = require_jsx_runtime();
function AnalisePage() {
	const { slug } = Route.useParams();
	const { draft, editing, patchFilm, publish, save } = useEditorial();
	const extra = draft.extraDomains ?? {};
	const film = draft.films.find((f) => f.slug === slug);
	if (!film) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl",
				children: "Análise não encontrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogo",
				className: "mt-6 inline-block text-accent",
				children: "Voltar ao catálogo"
			})
		]
	});
	const term = film.understandSlug ? draft.glossary.find((g) => g.slug === film.understandSlug) : void 0;
	const related = draft.films.filter((f) => f.slug !== film.slug && (editing || isPublished(f)) && f.domains.some((d) => film.domains.includes(d))).slice(0, 4);
	const topics = film.domains.map((d) => topicLabel(d, extra));
	const refs = film.references ?? [""];
	const offerTitle = film.offerHeading || "O que este filme oferece";
	const set = (patch) => {
		patchFilm(film.slug, patch);
	};
	const patchSection = (i, sec) => {
		const sections = film.sections.map((s, j) => j === i ? sec : s);
		set({ sections });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "py-10 pb-16",
		children: [
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-center gap-2 border border-rule bg-box px-3 py-2 text-[0.7rem] uppercase tracking-[0.12em]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => publish(film.slug, film.draft === true),
						className: "inline-flex items-center gap-1.5 bg-accent px-3 py-1.5 text-paper-2",
						children: film.draft === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 12 }), " Publicar"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 12 }), " Despublicar"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => save({ download: true }),
						className: "border border-rule px-3 py-1.5",
						children: "Salvar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							navigator.clipboard.writeText(filmPlainText(film));
						},
						className: "inline-flex items-center gap-1.5 border border-rule px-3 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 12 }), " Copiar texto"]
					}),
					film.draft === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Rascunho — não aparece no catálogo público"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmPoster, {
						film,
						className: "border border-rule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverField, { film }),
					film.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted",
						children: formatDate(film.date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-2 border border-box-edge bg-box p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Título original",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									editing,
									value: film.originalTitle || "",
									onChange: (v) => set({ originalTitle: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Direção",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									editing,
									value: film.director || "",
									onChange: (v) => set({ director: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "País",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryFlag, { country: film.country }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
										editing,
										value: film.country || "",
										onChange: (v) => set({ country: v })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Ano",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									editing,
									value: String(film.year || ""),
									onChange: (v) => set({ year: Number(v) || film.year })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Duração",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									editing,
									value: film.duration || "",
									onChange: (v) => set({ duration: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Formato",
								children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: film.format,
									onChange: (e) => set({ format: e.target.value }),
									className: "w-full bg-paper-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "filme",
											children: "Filme"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "serie",
											children: "Série"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "livro",
											children: "Livro"
										})
									]
								}) : FORMAT_LABEL[film.format]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Gênero",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									editing,
									value: film.genre || "",
									onChange: (v) => set({ genre: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ficha, {
								label: "Tópicos",
								children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicPicker, {
									selected: film.domains,
									extra,
									allFilms: draft.films,
									onChange: (domains) => set({ domains })
								}) : topics.join(", ") || "—"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Retranca, { film }),
						editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
							editing: true,
							value: film.title,
							onChange: (v) => set({ title: v }),
							className: "mt-2 font-display text-[clamp(2rem,5vw,3.1rem)] leading-[0.95]"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-[clamp(2rem,5vw,3.1rem)] leading-[0.95] tracking-tight",
							children: film.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicLine, { labels: topics }),
						editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
							editing: true,
							value: film.excerpt || "",
							multiline: true,
							placeholder: "Linha de abertura",
							onChange: (v) => set({ excerpt: v }),
							className: "mt-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [film.sections.map((sec, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mt-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
										editing,
										value: sec.heading,
										onChange: (v) => patchSection(i, {
											...sec,
											heading: v
										}),
										className: "font-display text-2xl leading-tight"
									}),
									sec.paragraphs.map((p, pi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											editing,
											value: p,
											multiline: true,
											onChange: (v) => {
												const paragraphs = sec.paragraphs.map((x, k) => k === pi ? v : x);
												patchSection(i, {
													...sec,
													paragraphs
												});
											},
											className: "leading-relaxed"
										}), i === 0 && pi === 0 && term && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnderstandBox, {
											term: term.term,
											body: term.body
										})]
									}, pi)),
									editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-accent",
										onClick: () => patchSection(i, {
											...sec,
											paragraphs: [...sec.paragraphs, ""]
										}),
										children: "+ Parágrafo"
									})
								]
							}, i)), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-6 text-[0.7rem] uppercase tracking-[0.14em] text-accent",
								onClick: () => set({ sections: [...film.sections, {
									heading: "Nova seção",
									paragraphs: [""]
								}] }),
								children: "+ Seção"
							})]
						}),
						(film.forFamily || film.forTeacher || film.forPress || editing) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
								editing,
								value: offerTitle,
								onChange: (v) => set({ offerHeading: v }),
								className: "font-display text-2xl leading-tight"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
										kicker: "Em casa",
										editing,
										value: film.forFamily || "",
										onChange: (v) => set({ forFamily: v })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
										kicker: "Na escola",
										editing,
										value: film.forTeacher || "",
										onChange: (v) => set({ forTeacher: v })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
										kicker: "Na pauta",
										editing,
										value: film.forPress || "",
										onChange: (v) => set({ forPress: v })
									})
								]
							})]
						}),
						(refs.some(Boolean) || editing) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl leading-tight",
									children: "Referências"
								}),
								refs.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									editing,
									value: r,
									multiline: true,
									placeholder: "Referência",
									onChange: (v) => {
										const next = refs.map((x, j) => j === i ? v : x);
										set({ references: next });
									},
									className: "mt-3 text-sm leading-relaxed"
								}, i)),
								editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "mt-2 text-[0.7rem] uppercase tracking-[0.14em] text-accent",
									onClick: () => set({ references: [...refs, ""] }),
									children: "+ Referência"
								})
							]
						})
					]
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 border-t border-rule pt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Veja também"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Publicações correlatas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4",
						children: related.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogThumb, { film: f }, f.slug))
					})
				]
			})
		]
	});
}
function Ficha({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[0.65rem] uppercase tracking-[0.14em] text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5",
		children
	})] });
}
function Note({ kicker, value, onChange, editing }) {
	if (!value && !editing) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-box-edge bg-box p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
			editing,
			value,
			multiline: true,
			onChange,
			className: "mt-2 text-sm leading-relaxed"
		})]
	});
}
function UnderstandBox({ term, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("my-3 w-full border border-box-edge bg-box p-4 sm:float-right sm:ml-6 sm:w-[48%]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Para entender melhor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xl leading-tight",
				children: term
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedText, {
				as: "p",
				className: "mt-2 text-sm leading-relaxed",
				text: body
			})
		]
	});
}
function TopicPicker({ selected, extra, allFilms, onChange }) {
	const options = /* @__PURE__ */ new Map();
	for (const [k, v] of Object.entries(extra)) options.set(k, v);
	for (const f of allFilms) for (const d of f.domains) options.set(d, topicLabel(d, extra));
	const list = [...options.entries()].sort((a, b) => a[1].localeCompare(b[1], "pt"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-1",
		children: list.map(([slug, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-start gap-1.5 text-[0.78rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: "mt-0.5",
				checked: selected.includes(slug),
				onChange: () => onChange(selected.includes(slug) ? selected.filter((x) => x !== slug) : [...selected, slug])
			}), label]
		}, slug))
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
export { AnalisePage as component };
