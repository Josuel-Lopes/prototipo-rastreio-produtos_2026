# Sinalização "Ambiente de demonstração" — PROP-2026-011

Status: **recomendação aprovada pelo usuário** (texto oficial + PDF com rodapé e marca d'água diagonal).

Objetivo: deixar inequívoco que o app (MVP, dados mock, HTML/CSS/JS puro) é um **ambiente de apresentação da proposta comercial MAXCODE42 → Alvenius**, não um sistema em produção, sem comprometer a fidelidade das telas replicadas dos prints.

Arquivos: `tokens.json` (valores) · `wireframes.md` (posicionamento desktop/mobile/print).

---

## 1. Decisões aprovadas

| # | Decisão |
|---|---|
| 1 | Texto oficial: **"Ambiente de demonstração"** |
| 2 | Tela: **ribbon fixo no rodapé** (principal) + **selo `DEMO`** ao lado da versão no header |
| 3 | PDF da proposta: **rodapé discreto** + **marca d'água diagonal** de baixa opacidade, repetida em cada página A4 |
| 4 | Sem marca d'água diagonal nas telas (preserva fidelidade) |

### Opções avaliadas

| Opção | Veredito | Motivo |
|---|---|---|
| Ribbon fixo no rodapé | ✅ Principal | Clara, não toca header 60/56px nem pill a cavaleiro |
| Selo `DEMO` junto à versão | ✅ Complemento | Reforço discreto na área de identidade |
| Rodapé + diagonal no PDF | ✅ Complemento (print) | Rastreabilidade do documento impresso |
| Faixa no topo | ❌ | Desloca header/pill |
| Diagonal em tela | ❌ | Polui cards/prints, ruído no mobile |
| Marca em canto | ❌ | Fraca; colide com conteúdo |
| Tag por tela | ❌ | Redundante com ribbon |

---

## 2. Componentes

### 2.1 Ribbon (`.demo-ribbon`) — tela, todas as rotas
- Desktop (≥768px): `● AMBIENTE DE DEMONSTRAÇÃO · Proposta comercial PROP-2026-011 · MAXCODE42 → Alvenius · Dados fictícios`
- Mobile (≤767px): `● AMBIENTE DE DEMONSTRAÇÃO · PROP-2026-011` (detalhes ocultos; mantidos no `aria-label`)
- Altura 28px / 24px; fundo `#0B2545`; texto `#FFFFFF`; borda superior 2px `#F5B700`; ponto 8px `#F5B700`.
- `position: fixed; bottom: 0`; `pointer-events: none`; não focável; sem botão de fechar.
- `body.is-demo` reserva `padding-bottom` = altura + `env(safe-area-inset-bottom)`.

### 2.2 Selo (`.demo-seal`) — header
- Texto `DEMO`, 9px/700, `#92400E` sobre `#FEF3C7`, borda 1px `#F5B700`, radius 4px, padding `1px 5px`, `margin-left: 4px`.
- Inline após `v2.x.x` em **ambos** os blocos de marca (`#header-brand-block` e `#header-brand-work`). Não altera altura do header.

### 2.3 Rodapé de impressão (`.demo-print-footer`) — só PDF da proposta
- Texto: `Ambiente de demonstração · Proposta comercial PROP-2026-011 · v1.0 · MAXCODE42 → Alvenius`
- 7.5pt, `#5B6670`, centralizado, `border-top: 0.5pt solid #D0D5DD`, `padding-top: 2mm`.
- `position: fixed; bottom: 0` em `@media print` → repete em todas as páginas.

### 2.4 Marca d'água diagonal (`.demo-print-watermark`) — só PDF da proposta
- Texto: `AMBIENTE DE DEMONSTRAÇÃO` em **2 linhas** (`AMBIENTE DE` / `DEMONSTRAÇÃO`), centralizado.
- Fonte 64pt, weight 800, `letter-spacing: 0.06em`, `line-height: 1.1`, uppercase.
- Cor `#0B2545` com `opacity: 0.07` (faixa aprovada 0.06–0.08; não exceder 0.08).
- Rotação `-45deg`, centro da área imprimível (`top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg)`).
- `position: fixed` em print → uma instância por página A4, sempre na mesma posição.
- Fica **sobre** o conteúdo (`z-index: 9999`) para não ser escondida por fundos de cards/tabelas; a opacidade 0.07 mantém leitura (texto do corpo `#1A1A1A` continua com contraste efetivo > 12:1).
- `pointer-events: none; user-select: none; aria-hidden="true"`.
- Não usar `print-color-adjust` (é texto, imprime mesmo com "Gráficos de fundo" desligado).

---

## 3. Acessibilidade

- Ribbon: `role="note"` + `aria-label="Ambiente de demonstração. Proposta comercial PROP-2026-011, MAXCODE42 para Alvenius. Dados fictícios."`. Renderizado uma vez; sem `aria-live`.
- Contrastes: ribbon ≈ 16:1 (AAA); selo ≈ 6.9:1 (AA); rodapé print ≈ 5.9:1 (AA).
- Ponto âmbar e separadores `·`: `aria-hidden="true"`.
- Selo: `title="Ambiente de demonstração"`; `aria-label` igual.
- Elementos de print: `aria-hidden="true"` (puramente visuais).

---

## 4. Implementação (frontend)

Novo CSS: `src/web/styles/demo-environment.css`, importado no `index.html` **depois** de `header.css` e `proposta.css`.

### 4.1 Onde injetar

| Peça | Arquivo | Ação |
|---|---|---|
| Flag | `src/web/version.js` | `export const DEMO_MODE = true;` |
| Classe global | `src/web/app.js` (bootstrap) | `if (DEMO_MODE) document.body.classList.add('is-demo');` |
| Ribbon | `index.html` | Estático, antes de `</body>`, fora de `#app`/`#modal-root`/`#toast-root` |
| Selo | `src/web/components/header.js` | Após cada `<span class="brand-version-sub">` (2 ocorrências) |
| Rodapé + diagonal print | `src/web/views/proposta-view.js` | Últimos filhos de `.view-proposta-wrapper` (fora de `.proposal-sheet`) |

### 4.2 Marcação

```html
<!-- index.html -->
<div class="demo-ribbon" role="note"
     aria-label="Ambiente de demonstração. Proposta comercial PROP-2026-011, MAXCODE42 para Alvenius. Dados fictícios.">
  <span class="demo-ribbon__dot" aria-hidden="true"></span>
  <strong class="demo-ribbon__label">Ambiente de demonstração</strong>
  <span class="demo-ribbon__sep" aria-hidden="true">·</span>
  <span class="demo-ribbon__id">PROP-2026-011</span>
  <span class="demo-ribbon__desk" aria-hidden="true">
    <span class="demo-ribbon__sep">·</span> MAXCODE42 → Alvenius
    <span class="demo-ribbon__sep">·</span> Dados fictícios
  </span>
</div>
```
> Desktop exibe "Proposta comercial PROP-2026-011": usar `<span class="demo-ribbon__desk-inline">Proposta comercial </span>` antes do ID.

```html
<!-- header.js — após cada .brand-version-sub -->
<span class="demo-seal" title="Ambiente de demonstração" aria-label="Ambiente de demonstração">DEMO</span>
```

```html
<!-- proposta-view.js — final de .view-proposta-wrapper -->
<div class="demo-print-watermark print-only" aria-hidden="true">
  <span>Ambiente de</span><span>demonstração</span>
</div>
<div class="demo-print-footer print-only" aria-hidden="true">
  Ambiente de demonstração · Proposta comercial PROP-2026-011 · v1.0 · MAXCODE42 → Alvenius
</div>
```

### 4.3 CSS de referência

```css
:root {
  --demo-ribbon-h: 28px;
  --demo-ribbon-bg: #0B2545;
  --demo-ribbon-fg: #FFFFFF;
  --demo-accent: #F5B700;
  --demo-z: 140; /* > .proposal-action-bar (100); < header (150), drawer (250/300), modais (1000+) */
}

.print-only { display: none; }
body:not(.is-demo) .demo-ribbon,
body:not(.is-demo) .demo-seal,
body:not(.is-demo) .demo-print-watermark,
body:not(.is-demo) .demo-print-footer { display: none !important; }

body.is-demo { padding-bottom: calc(var(--demo-ribbon-h) + env(safe-area-inset-bottom, 0px)); }

.demo-ribbon {
  position: fixed; left: 0; right: 0; bottom: 0;
  box-sizing: content-box;
  height: var(--demo-ribbon-h);
  padding: 0 16px env(safe-area-inset-bottom, 0px);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--demo-ribbon-bg); color: var(--demo-ribbon-fg);
  border-top: 2px solid var(--demo-accent);
  font: 500 12px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  letter-spacing: 0.02em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  z-index: var(--demo-z);
  pointer-events: none; user-select: none;
}
.demo-ribbon__dot { width: 8px; height: 8px; border-radius: 9999px; background: var(--demo-accent); flex-shrink: 0; }
.demo-ribbon__label { font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
.demo-ribbon__sep { opacity: 0.6; margin: 0 2px; }

.demo-seal {
  display: inline-block; margin-left: 4px; padding: 1px 5px;
  font-size: 9px; font-weight: 700; line-height: 1.3; letter-spacing: 0.08em;
  color: #92400E; background: #FEF3C7; border: 1px solid #F5B700; border-radius: 4px;
  vertical-align: middle; pointer-events: none; user-select: none;
}

@media (max-width: 767px) {
  :root { --demo-ribbon-h: 24px; }
  .demo-ribbon { font-size: 11px; gap: 6px; padding-left: 8px; padding-right: 8px; }
  .demo-ribbon__desk, .demo-ribbon__desk-inline { display: none; }
}

@media print {
  .demo-ribbon, .demo-seal { display: none !important; }
  body.is-demo { padding-bottom: 0 !important; }
  .proposal-sheet { padding-bottom: 10mm !important; }

  .demo-print-footer.print-only {
    display: block !important;
    position: fixed; left: 0; right: 0; bottom: 0;
    padding-top: 2mm;
    border-top: 0.5pt solid #D0D5DD;
    text-align: center;
    font: 400 7.5pt/1.2 -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #5B6670;
    background: transparent;
    pointer-events: none;
  }

  .demo-print-watermark.print-only {
    display: flex !important;
    flex-direction: column; align-items: center;
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    transform-origin: center center;
    width: max-content;
    font: 800 64pt/1.1 -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #0B2545;
    opacity: 0.07;
    white-space: nowrap;
    z-index: 9999;
    pointer-events: none; user-select: none;
  }
}
```

### 4.4 Regras

- Elementos fixos inferiores existentes (barras de ação/FABs nas telas de trabalho) devem usar `bottom: calc(<valor atual> + var(--demo-ribbon-h))`.
- Não alterar dimensões do header (60/56px), da pill nem do `brand-version-sub`.
- Drawer (250/300) e modais/scanner (≥1000) cobrem o ribbon — esperado.
- Marca d'água e rodapé **apenas** na rota `proposta`; outras rotas não imprimem nada de demo.
- `.proposal-scope-notice` (existente, `no-print`) permanece como está.

### 4.5 Checklist de aceite visual (frontend)

1. 360x740: ribbon em 1 linha, sem ellipsis no texto `AMBIENTE DE DEMONSTRAÇÃO · PROP-2026-011`; último elemento da tela não fica coberto.
2. 1897x989: ribbon centralizado com texto completo; selo `DEMO` alinhado verticalmente à versão.
3. Drawer mobile aberto cobre o ribbon.
4. Imprimir proposta (Chrome, A4, margens padrão): cada página com diagonal centrada a -45° e rodapé; texto do corpo plenamente legível; ribbon/selo ausentes.
5. Firefox print: confirmar repetição por página do `position: fixed`.
