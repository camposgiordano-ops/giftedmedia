# Gifted & Media

Recurso pedagógico de educomunicação e letramento midiático para a desestigmatização das Altas Habilidades/Superdotação no cinema e na literatura. Brasília · UnB / SEEDF.

## Três plataformas, um projeto

| Papel | Onde | URL |
| --- | --- | --- |
| **Fonte da verdade** | GitHub | https://github.com/camposgiordano-ops/giftedmedia |
| **App completo** (catálogo, análises, glossário, imprensa) | Vercel | conectar este repositório — ver `PLATAFORMAS.md` |
| **Vitrine / contato** | Wix (publicado) | https://camposgiordano.wixsite.com/gifted-media-3 |

O preview do Grok é temporário. O que permanece é este repositório + o deploy na Vercel + a vitrine no Wix.

## O que o app faz

- Home com análise em destaque e glossário
- `/catalogo` — filmes e obras
- `/analises/:slug` — fichas e textos
- `/glossario` — vocabulário AH/SD
- `/imprensa` — kit para jornalistas
- `/sobre` — o projeto

Auth e banco estão **desligados** (`.grok/app-env.json`). O build na Vercel não precisa de `DATABASE_URL`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Preview de produção:

```bash
npm run build
npm run preview
```

## Deploy permanente

Passo a passo da Vercel e o papel de cada plataforma: [`PLATAFORMAS.md`](./PLATAFORMAS.md).
