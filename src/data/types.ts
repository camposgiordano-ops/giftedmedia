export type Format = "filme" | "serie" | "livro";

export type Section = {
  heading: string;
  paragraphs: string[];
};

export type ViewingQ = {
  q: string;
  why: string;
};

export type Film = {
  slug: string;
  title: string;
  originalTitle?: string;
  year: number;
  country?: string;
  director?: string;
  format: Format;
  genre?: string;
  duration?: string;
  domains: string[];
  stereotypeIds?: string[];
  still?: string;
  kicker?: string;
  excerpt?: string;
  date?: string;
  featured?: boolean;
  classroomPick?: boolean;
  draft?: boolean;
  understandSlug?: string;
  offerHeading?: string;
  sections: Section[];
  viewingGuide?: ViewingQ[];
  forFamily?: string;
  forTeacher?: string;
  forPress?: string;
  references?: string[];
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  body: string;
};

export type Article = {
  slug: string;
  kicker?: string;
  title: string;
  date?: string;
  readMinutes?: number;
  featured?: boolean;
  excerpt?: string;
  sections: Section[];
};

export type PressFrame = { bad: string; good: string };

export type Press = {
  intro: string;
  paragraphs?: string[];
  sections?: Section[];
  frames: PressFrame[];
};

export type About = {
  tagline: string;
  mission: string;
  sections: Section[];
  disclaimer: string;
};

export type Referencial = {
  intro: string;
  sections: Section[];
  bibliography: { id: string; text: string }[];
};

export type EditorialSnapshot = {
  exportedAt?: string;
  films: Film[];
  glossary: GlossaryTerm[];
  articles: Article[];
  extraDomains?: Record<string, string>;
  deletedDomainSlugs?: string[];
  glossaryIntro?: string;
  referencial: Referencial;
  about: About;
  press: Press;
};
