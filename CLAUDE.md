# Biovera — Landing Page

Página de vendas single-file (`index.html`) do suplemento Biovera (Óleo de Orégano + Semente Preta).
Adaptada a partir de um clone da LevitaBio. Toda edição vai em `index.html`.

## Repositório e deploy
- **GitHub:** https://github.com/eduardotoga/biovera-projeto-final-maio.git
- **Vercel:** deploy automático ao fazer push no branch `master`
- **Fluxo:** editar `index.html` → `git add` → `git commit` → `git push` → Vercel atualiza em ~30s

## Arquivos do projeto
| Arquivo | Uso |
|---|---|
| `index.html` | Produção — único arquivo editado |
| `index antigo.html` | Clone original da LevitaBio (referência, nunca editar) |
| `middleware.js` | Edge Middleware Vercel — bloqueio geográfico |
| `avatares/` | 20 fotos de avatar das reviews (10 mulheres + 10 homens) |
| `Biovera - artes/` | Imagens do produto (1.png–10.png + reviews 1–9) |

## CDN de imagens (Cloudflare R2)
Base URL: `https://pub-34e8d362c4cb41e7a63851f01f9f156c.r2.dev/`

Imagens hospedadas lá:
- `bioveralogowhite.png` — logo branco do header (500×125px)
- `bundle-1.png`, `bundle-2.png`, `bundle-3.png` — imagens dos kits nas variações
- `correioslogo.png` — logo dos Correios no bloco de frete
- `Mastercard-Logo.wine.png`, `Visa_Inc.-Logo.wine.png`, `421-4213291_bandeiras-aceitas-carto-elo-logo.png`, `amex%20(2).png`, `Pix_(Brazil)_logo.svg.png` — bandeiras de pagamento
- `prod-gif-parasitas.gif`, `prod-gif-biofilme.gif` — GIFs educativos na seção de parasitas
- `review%201.jpeg` até `review%209.jpeg` — fotos das reviews

## Checkout (pagamento.bioveraoficial.com)
| Variação | URL |
|---|---|
| 1 unidade — R$99,90 | `https://pagamento.bioveraoficial.com/checkout?product=3b47c584-2f38-11f1-b2a5-46da4690ad53` |
| 2 unidades — R$169,90 | `https://pagamento.bioveraoficial.com/checkout?product=3c6ebb02-2f38-11f1-b2a5-46da4690ad53` |
| 3 unidades — R$209,90 | `https://pagamento.bioveraoficial.com/checkout?product=3d999cab-2f38-11f1-b2a5-46da4690ad53` |

## Cores principais (CSS custom properties)
```css
--levita: #1e56b5     /* variável legada do clone, ainda usada em alguns pontos */
--green-2: #1ea143    /* verde principal dos textos */
--navy-deep: #0A1628  /* texto escuro principal */
```
Header: `background: #057210`
Botões de compra: `linear-gradient(180deg, #0db300 0%, #098700 100%)`

## Geolocalização
- API: `https://api.ipinfo.io/lite/json?token=d92d196614f82f`
- Exibe cidade do visitante no bloco de frete: `<span id="cidade-visitante">`
- Fallback: "sua região"

## Bloqueio geográfico (`middleware.js`)
- Bloqueia qualquer IP de **Chapecó - SC** → retorna 404
- **IP na whitelist** (dono do site): `168.232.42.99` — passa direto
- IP dinâmico: se mudar, atualizar `middleware.js`

## Tracking (head do index.html)
```html
<!-- UTM Utmify -->
<script src="https://cdn.utmify.com.br/scripts/utms/latest.js" data-utmify-prevent-xcod-sck data-utmify-prevent-subids async defer></script>
<!-- Pixel Utmify — ID Biovera -->
<script>
  window.pixelId = "69d0b5815e4c426ccfcdd894";
  ...pixel.js...
</script>
```

## Estrutura do HTML (seções principais)
1. **Header** — logo + barra de progresso de scroll (verde `#057210`)
2. **Galeria** — 5 slides + thumbnails + lightbox com nav (setas, drag, teclado)
3. **Bloco de oferta** — seletor de variações (`.variacao-btn`), frete, urgência, formas de pagamento
4. **Seção parasitas** — GIFs educativos (parasitas + biofilme)
5. **Garantia / CTA final**
6. **Reviews** — 20 cards com avatares locais em `avatares/`
7. **Footer** — logo + bandeiras de pagamento

## Avatares das reviews
- Pasta: `avatares/` no root do repo (hospedado no GitHub)
- `avatar-mulher-01.jpg` a `avatar-mulher-10.jpg` — usados em reviews de mulher
- `avatar-homem-01.jpg` a `avatar-homem-10.jpg` — usados em reviews de homem
- CSS: `width: 100%; height: 100%; object-fit: cover; object-position: center top`
- Container: `width: 48px; height: 48px; border-radius: 50%; overflow: hidden`

## Comportamento da barra de progresso (scroll)
Easing quartic: `eased = 1 - Math.pow(1 - t, 4)` — início rápido, fim lento.
Inicializada no evento `load` (não `DOMContentLoaded`) para pegar scrollHeight correto após imagens carregarem.

## Pontos de atenção
- **Não há `<base href>`** — foi removida (apontava para levitamedicina.com)
- **Zero referências a levitamedicina.com** no index.html atual
- **`skel-wrap`** é um sistema de skeleton loading — envolve imagens em spans com shimmer
- Os botões `.variacao-btn` têm todos os dados de preço em `data-*` attributes
- O lightbox reutiliza as funções `goTo()`, `next()`, `prev()` da galeria principal
