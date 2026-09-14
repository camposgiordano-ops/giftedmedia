export const FORMAT_LABEL: Record<string, string> = {
  filme: "Filme",
  serie: "Série",
  livro: "Livro",
};

export const FORMAT_PLURAL: Record<string, string> = {
  filme: "Filmes",
  serie: "Séries",
  livro: "Livros",
};

export const TOPIC_LABEL: Record<string, string> = {
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
  "subidentificacao-feminina": "Subidentificação feminina",
};

export function topicLabel(
  slug: string,
  extra: Record<string, string> = {},
): string {
  return extra[slug] || TOPIC_LABEL[slug] || slug;
}

export const COUNTRY_ISO: Record<string, string> = {
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
  rússia: "ru",
};

export function countryIso(country?: string): string | null {
  if (!country) return null;
  const key = country
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
  const raw = country.toLowerCase().trim();
  return COUNTRY_ISO[raw] || COUNTRY_ISO[key] || null;
}
