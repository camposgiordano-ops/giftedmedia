# Gifted & Media — plataformas permanentes

Decisão de 29/09/2026: GitHub é a fonte, Vercel publica o app, Wix fica como vitrine.

## 1. GitHub (fonte)

- Repositório: https://github.com/camposgiordano-ops/giftedmedia
- Branch de produção: `main`
- Conteúdo editorial canônico: `src/data/seed.json`
- Tema Blogger (arquivo avulso, não é o site principal): `gifted-media-blogger.xml`

Tudo que entra no ar passa por um commit aqui.

## 2. Vercel (app no ar)

O projeto já foi montado para a Vercel (Vite + Nitro + TanStack Start). Auth off, sem banco.

### Primeiro deploy (5 minutos)

1. Entre em https://vercel.com com a conta GitHub `camposgiordano-ops`.
2. **Add New… → Project**.
3. Importe `camposgiordano-ops/giftedmedia`.
4. Deixe o framework detectado. **Root Directory** = `.` (raiz).
5. **Build Command** = `npm run build` (já é o default do `package.json`).
6. Não cadastre `DATABASE_URL` nem chaves de auth.
7. Deploy.

A URL fica no formato `https://giftedmedia-<hash>.vercel.app`. Em Project → Settings → Domains dá para fixar `giftedmedia.vercel.app` e, depois, um domínio próprio.

Cada push em `main` republica sozinho.

### Se a página vier em branco

O sintoma clássico é `Failed to load module script … MIME type "text/html"`: o `index.html` pediu um JS que 404. Confira o log do deploy e se o output Nitro/Vercel foi gerado. Não use GitHub Pages neste app (não é estático puro).

### Domínio próprio (depois)

Na Vercel: Settings → Domains → adicionar `giftedmedia.com.br` (ou o que comprar). Apontar o DNS conforme a Vercel indicar. Só então atualize o texto da vitrine Wix com a URL definitiva.

## 3. Wix (vitrine)

- Site canônico (publicado): https://camposgiordano.wixsite.com/gifted-media-3
- Nome no painel: **Gifted & Media**
- ID: `b019b562-35c6-4985-861e-52e457d8070a`
- Papel: apresentação, SEO simples, contato. Não substitui o app.

Rascunhos para não confundir (não usar como canônico):

- Gifted Media
- Gifted Media 1
- Gifted Media 2
- Blog De Cinema E Md
- My Site / My Site 1

### O que já foi alinhado no Wix (29/09/2026)

- Nome de exibição: Gifted & Media
- Descrição do negócio aponta para o repositório GitHub
- Fuso: `America/Sao_Paulo`
- Moeda: BRL

### O que fazer à mão no editor Wix

1. Abrir o site publicado no Editor.
2. No rodapé ou na home, adicionar dois links:
   - **Ler as análises** → URL da Vercel (depois do primeiro deploy)
   - **Código-fonte** → https://github.com/camposgiordano-ops/giftedmedia
3. Publicar de novo.

## Ordem de atualização

1. Editar no GitHub (`src/data/seed.json` ou rotas).
2. Push em `main` → Vercel publica.
3. Só mexer no Wix se a vitrine (texto institucional, links, contato) mudar.

## Fora deste arranjo

- Preview Grok: efêmero, não cite como URL pública.
- Blogger: o XML é backup de tema, não o site oficial.
- GitHub Pages: não serve para este stack.
