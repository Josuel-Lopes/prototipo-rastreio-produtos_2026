# Navegação por Tópicos — Página da Proposta (`?route=proposta`)

> Escopo: **somente web**. No PDF/print toda a navegação fica **oculta**.
> Proposta: PROP-2026-011 (MAXCODE42 → Alvenius).
> Fontes analisadas: `src/web/views/proposta-view.js`, `src/web/styles/proposta.css`, `proposals/proposta-template.json`.
> Implementação: `spool-management-by-project-frontend` (este documento não altera `src/**`).

---

## 1. Decisão

| Faixa de largura | Padrão | Componente |
|---|---|---|
| **≥ 1280px** (desktop) | Índice lateral **sticky** à esquerda + scrollspy | `nav.proposal-toc` |
| **768–1279px** (tablet / desktop estreito) | Barra de chips **sticky** sob a action bar + chip "Todos" que abre o sheet | `nav.proposal-toc-bar` |
| **≤ 767px** (mobile, alvo 360x780) | Botão flutuante **"Tópicos"** abrindo bottom sheet | `.toc-fab` + `#toc-sheet` |
| Todas | Botão **voltar ao topo** | `.toc-top-fab` (+ `.toc-backtop` no índice) |

Justificativa:
- Proposta longa (8 grupos, ~25 âncoras): índice lateral permite visão do todo e posição atual sem cobrir o conteúdo.
- Em larguras médias o índice lateral roubaria espaço da folha (max 1080px); chips horizontais mantêm 1 linha.
- No mobile, FAB + sheet não ocupa área fixa de leitura e respeita a faixa "Ambiente de demonstração" (`--demo-ribbon-h`).
- Ordem dos tópicos = **ordem real do DOM**, garantindo scrollspy coerente (sem saltos).

---

## 2. Tópicos (agrupamento comercial)

Gerados **dinamicamente** a partir do JSON/DOM renderizado. Tópico só aparece se a seção existir; grupo sem itens é omitido.

| # | Grupo (rótulo) | Itens / âncoras | Origem no DOM |
|---|---|---|---|
| 1 | **Apresentação** | `#topico-apresentacao` (cabeçalho da proposta) · `#topico-sumario` (Sumário) · `#topico-maxcode42` (Sobre a MAXCODE42) | `section.proposal-header`, seção num 1, seção num 2 |
| 2 | **Metodologia** | `#topico-metodologia` (Como estimamos) · `#metodologia-estimativa` (Método de estimativa) — *id existente* | `.methodology-box`, `.estimation-method` (dentro da seção num 3) |
| 3 | **Escopo já existente** · sem custo (Fases 1–5) | `#card-qr-rastreio` · `#card-gestao-spools` · `#card-sucata-retrabalho` · `#card-painel-gerencial` · `#card-integracao-erp` — *ids existentes* | `article.proposal-feature-card.is-existing` |
| 4 | **Novas funcionalidades** (Fases 7, 9, 11, 13) | `#card-selecao-projetos` · `#card-vincular-cadastro-projeto` · `#card-vincular-etapas-projeto` · `#card-vincular-transferencia-projeto` — *ids existentes*; filhos por card: `#prints-{id}` "Prints anotados (n)" e `#incluso-{id}` "Inclusos sem custo" (só se houver conteúdo) | `article.proposal-feature-card.is-new`, `section.feature-prints`, `section.feature-included` |
| 5 | **Investimento** | `#topico-investimento` (Quadro de investimento) · `#topico-sprints` (Sprints) · `#topico-pagamento` (Parcelas / marcos) | seção num 4, `.sprints-container`, `.payment-milestones-box` |
| 6 | **Garantia & Novas demandas** | `#topico-garantia` | `.warranty-grid` (seção num 5) |
| 7 | **Premissas & Fora do escopo** | `#topico-premissas` | `.assumptions-grid` (seção num 5) |
| 8 | **Aceite & Contato** | `#topico-aceite` (Assinaturas) · `#topico-contato` (Contato) | `section.signatures-box`, `footer.proposal-footer` |

Regras de rótulo:
- Itens de card usam `feature.title` (truncado em 1 linha com `text-overflow: ellipsis`; `title=""` com texto completo).
- Prefixo de fase em cards novos: `F7`, `F9`, `F11`, `F13` (texto 11px, cinza) quando `feature.phase` existir.
- Grupo 3 inicia **recolhido** no índice lateral e no sheet (já faz parte do contrato; foco comercial nas novas). Expande automaticamente quando a seção ativa estiver nele.
- Ponto de status à esquerda: existente `.toc-dot--existing` (#12B76A), novo `.toc-dot--new` (#1F4FD8).

### 2.1 Ids novos a adicionar no markup (frontend)
`topico-apresentacao`, `topico-sumario`, `topico-maxcode42`, `topico-metodologia`, `prints-{id}`, `incluso-{id}`, `topico-investimento`, `topico-sprints`, `topico-pagamento`, `topico-garantia`, `topico-premissas`, `topico-aceite`, `topico-contato`.

Reutilizados: `#card-{feature.id}`, `#metodologia-estimativa`.

Todos os alvos recebem `tabindex="-1"` (foco programático após navegação) e `scroll-margin-top` (ver §4).

---

## 3. Anatomia e tokens

Cores (tema da proposta, `--prop-*`): navy `#0B2545`, royal `#1F4FD8`, cinza `#5B6670`, borda `#E4E7EC`, fundo `#F2F4F7`, sucesso `#12B76A`, branco `#FFFFFF`.

### 3.1 Desktop ≥1280 — índice lateral

```
┌──────────────────── .proposal-action-bar (sticky) ─────────────────────┐
├────────────────┬────────────────────────────────────────────────────────┤
│ TÓPICOS        │                                                        │
│ ─────────────  │                                                        │
│ APRESENTAÇÃO   │            folha da proposta (max 1080px)              │
│ ▌Sumário       │  ← link ativo: barra 3px royal + fundo #EEF3FD         │
│  MAXCODE42     │                                                        │
│ METODOLOGIA    │                                                        │
│ ▸ ESCOPO JÁ... │  ← grupo recolhido (toggle)                            │
│ NOVAS FUNC.    │                                                        │
│  • F7 Seleção  │                                                        │
│    Prints (6)  │  ← .toc-link--child                                    │
│ ...            │                                                        │
│ ↑ Voltar topo  │                                                        │
└────────────────┴────────────────────────────────────────────────────────┘
```

- Grid: `.proposal-layout { display:grid; grid-template-columns: 232px minmax(0,1080px); gap: 24px; justify-content:center; padding: 0 24px; }`
- `nav.proposal-toc`: `position: sticky; top: calc(var(--prop-bar-h) + 16px); max-height: calc(100vh - var(--prop-bar-h) - 32px); overflow-y: auto; background:#FFFFFF; border:1px solid #E4E7EC; border-radius:12px; padding:16px 8px 12px;`
- `.toc-title`: 11px/16px, 700, letter-spacing .08em, uppercase, #5B6670, padding 0 8px 8px, borda inferior 1px #E4E7EC.
- `.toc-group-label` / `.toc-group-toggle`: 11px/16px, 700, uppercase, #0B2545, padding 12px 8px 4px; toggle com chevron 12px (`▸`/`▾`), `aria-expanded`, `aria-controls`.
- `.toc-link`: 13px/18px, 500, #5B6670, padding 6px 8px 6px 11px, border-radius 6px, `border-left: 3px solid transparent`, altura mínima 32px.
  - hover: fundo #F2F4F7, cor #0B2545.
  - `.is-active` + `aria-current="location"`: cor #1F4FD8, 600, fundo #EEF3FD, `border-left-color:#1F4FD8`.
  - `.is-active-parent` (card cujo filho está ativo): cor #0B2545, 600.
- `.toc-link--child`: 12px/16px, padding-left 27px, cor #5B6670.
- `.toc-dot`: 6px círculo, margin-right 6px.
- `.toc-backtop`: 12px, 600, #1F4FD8, padding 10px 8px 0, borda superior 1px #E4E7EC.
- Focus visível (todos): `outline: 2px solid #1F4FD8; outline-offset: 2px;`

### 3.2 Tablet 768–1279 — barra de chips

```
┌──────────────────── .proposal-action-bar (sticky) ─────────────────────┐
├─[Todos ☰] [Apresentação] [Metodologia] [Escopo] [Novas]* [Invest.]→ ───┤  48px sticky
│                                                                        │
```

- `nav.proposal-toc-bar`: `position: sticky; top: var(--prop-bar-h); z-index: 90; height:48px; background:#FFFFFF; border-bottom:1px solid #E4E7EC; display:flex; gap:8px; align-items:center; padding:0 16px; overflow-x:auto; scrollbar-width:none;`
- `.toc-chip`: altura 32px, padding 0 12px, border-radius 16px, 13px/1, 600, cor #0B2545, fundo #F2F4F7, borda 1px #E4E7EC, `white-space:nowrap`.
  - `.is-active` + `aria-current="location"`: fundo #0B2545, cor #FFFFFF, borda #0B2545. Chip ativo é rolado para ficar visível (`scrollIntoView({inline:'nearest'})`, sem rolagem vertical).
- `.toc-chip--all`: primeiro chip, ícone ☰ + "Todos", fundo #FFFFFF, borda #1F4FD8, cor #1F4FD8; abre `#toc-sheet` (mesmo do mobile, com largura máx 480px centralizada).
- Chips = **grupos** (8); o scrollspy ativa o grupo da seção visível.
- Nessa faixa `--prop-toc-h: 48px` soma no offset (§4).

### 3.3 Mobile ≤767 (alvo 360x780) — FAB + bottom sheet

```
│                                         │
│                          ┌──────────┐   │
│                          │ ☰ Tópicos│   │  .toc-fab
│                          └──────────┘   │
│                                   (↑)   │  .toc-top-fab (acima do FAB)
├─────── faixa Ambiente de demonstração ──┤
```

Sheet aberto:
```
┌─────────────────────────────────────────┐
│░░░░░░░░░░ backdrop rgba(11,37,69,.48) ░░│
├─────────────────────────────────────────┤
│            ───  (handle 36x4)           │
│ Tópicos da proposta               [ ✕ ] │
│ ─────────────────────────────────────── │
│ APRESENTAÇÃO                            │
│  Sumário                                │
│  ...                                    │
│ ▸ ESCOPO JÁ EXISTENTE                   │
│ NOVAS FUNCIONALIDADES                   │
│  • F7 Seleção de Projetos               │
│ ...                                     │
└─────────────────────────────────────────┘
```

- `.toc-fab`: `position:fixed; right:16px; bottom: calc(16px + var(--demo-ribbon-h, 0px) + env(safe-area-inset-bottom)); z-index:120; height:44px; padding:0 16px; border-radius:22px; background:#0B2545; color:#FFFFFF; font:600 14px/1; box-shadow:0 4px 12px rgba(11,37,69,.28);` ícone ☰ 16px + texto "Tópicos". `aria-haspopup="dialog"`, `aria-controls="toc-sheet"`, `aria-expanded`.
- `#toc-sheet.toc-sheet`: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="toc-sheet-title"`; `position:fixed; left:0; right:0; bottom:0; z-index:1050; max-height:80vh; overflow-y:auto; background:#FFFFFF; border-radius:16px 16px 0 0; padding: 8px 16px calc(16px + env(safe-area-inset-bottom));` animação translateY(100%)→0 em 220ms ease-out (sem animação com `prefers-reduced-motion`).
- `.toc-sheet-backdrop`: fixed inset 0, z-index 1049, `rgba(11,37,69,.48)`; clique fecha.
- `#toc-sheet-title`: 16px/24px, 700, #0B2545. `.toc-sheet-close`: botão 40x40, `aria-label="Fechar tópicos"`.
- Itens do sheet reutilizam `.toc-group-label`, `.toc-group-toggle`, `.toc-link`, `.toc-link--child` com altura mínima **44px** (toque) e 14px/20px.
- Clique em link: fecha o sheet → rola até o alvo → foca o alvo.

### 3.4 Voltar ao topo

- `.toc-top-fab`: botão circular 40x40, fundo #FFFFFF, borda 1px #E4E7EC, ícone ↑ #0B2545, sombra `0 2px 8px rgba(11,37,69,.16)`, `aria-label="Voltar ao topo"`, `position:fixed; right:16px; z-index:120`.
  - Desktop/tablet: `bottom: calc(24px + var(--demo-ribbon-h, 0px))`.
  - Mobile: empilhado acima do FAB → `bottom: calc(16px + 44px + 12px + var(--demo-ribbon-h, 0px) + env(safe-area-inset-bottom))`.
  - Visível apenas após rolar **> 1 viewport** (`.is-visible`; fade 150ms).
- `.toc-backtop` (rodapé do índice lateral): mesmo comportamento.
- Ação: rola para o topo da página e envia o foco para o título da proposta (`section.proposal-header h2`, que recebe `tabindex="-1"`).

---

## 4. Rolagem, offset e scrollspy

- Variáveis CSS na raiz da view:
  - `--prop-bar-h`: altura medida de `.proposal-action-bar` (via `ResizeObserver`, atualiza em resize).
  - `--prop-toc-h`: `48px` na faixa 768–1279; `0px` nas demais.
- Alvos: `[id^="topico-"], [id^="card-"], [id^="prints-"], [id^="incluso-"], #metodologia-estimativa { scroll-margin-top: calc(var(--prop-bar-h) + var(--prop-toc-h) + 16px); }`
- Scroll: `target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })`, depois `target.focus({ preventScroll: true })`. `reduce = matchMedia('(prefers-reduced-motion: reduce)').matches`.
- **Não alterar `location.hash`** (o app usa `#proposta` e escuta `hashchange`). Links são `<a href="?route=proposta&topico=<id>" data-toc-target="<id>">` com `preventDefault()`; após navegação usar `history.replaceState` atualizando apenas `topico`.
- Deep link: ao carregar com `topico=<id>`, após render rolar até o alvo (sem animação).
- Scrollspy: `IntersectionObserver` sobre todos os alvos, `rootMargin: -(bar+toc+16)px 0px -60% 0px`, `threshold: 0`. Ativo = último alvo que cruzou o topo (ordem do DOM). Atualiza `.is-active` / `aria-current="location"` no índice, chip do grupo e sheet; pai recebe `.is-active-parent`; grupo recolhido que contém o ativo expande.

---

## 5. Acessibilidade

- `nav.proposal-toc[aria-label="Tópicos da proposta"]`; barra: `nav.proposal-toc-bar[aria-label="Tópicos da proposta"]` (apenas uma visível por breakpoint; a oculta com `display:none`).
- Listas semânticas `<ul>/<li>`; grupos recolhíveis com `button.toc-group-toggle[aria-expanded][aria-controls]`.
- Sheet: foco inicial no primeiro link (ou ativo); **focus trap**; **ESC fecha**; ao fechar o foco volta para `.toc-fab` (ou `.toc-chip--all`); `body` sem rolagem enquanto aberto (`overflow:hidden`).
- Contraste: #5B6670 sobre #FFFFFF = 5.9:1; #1F4FD8 sobre #EEF3FD ≥ 5.5:1; #FFFFFF sobre #0B2545 ≥ 15:1.
- Alvo de toque ≥ 44px no mobile; `:focus-visible` com outline royal 2px.

---

## 6. Print / PDF

```css
@media print {
  .proposal-toc, .proposal-toc-bar, .toc-fab, .toc-top-fab,
  .toc-sheet, .toc-sheet-backdrop { display: none !important; }
  .proposal-layout { display: block; padding: 0; }
}
```
Todos os elementos de navegação também recebem a classe `no-print`. Nenhuma alteração de quebra de página.

---

## 7. Implementação (frontend)

1. Em `renderShell`/`renderSheet` (`proposta-view.js`): envolver a folha em `.proposal-layout`, inserir `nav.proposal-toc` antes dela e `nav.proposal-toc-bar` logo após `.proposal-action-bar`; adicionar os ids de §2.1 e `tabindex="-1"` nos alvos.
2. `buildToc(data)` gera o modelo de grupos a partir do JSON (`features` separados por `isExisting()`; filhos `prints`/`incluso` apenas se houver conteúdo) e **valida no DOM** (`document.getElementById`) antes de renderizar o link.
3. FAB, sheet, backdrop e top-fab: um único nó cada, renderizado junto à view (não duplicar).
4. `bindEvents()`: delegação de clique em `[data-toc-target]`; ESC/focus trap; ResizeObserver; IntersectionObserver. Em `render()`/`refresh()` (inclusive o refresh em focus/visibility), **desconectar** observers e remover listeners anteriores antes de recriar o índice.
5. Estilos em `src/web/styles/proposta.css`, seção "Navegação por tópicos", com os tokens `--prop-*`.

### Seletores/classes

| Papel | Seletor |
|---|---|
| Layout | `.proposal-layout` |
| Índice lateral | `nav.proposal-toc`, `.toc-title`, `.toc-group`, `.toc-group-label`, `.toc-group-toggle`, `.toc-link`, `.toc-link--child`, `.is-active`, `.is-active-parent`, `.toc-dot--existing`, `.toc-dot--new`, `.toc-backtop` |
| Chips | `nav.proposal-toc-bar`, `.toc-chip`, `.toc-chip.is-active`, `.toc-chip--all` |
| Mobile | `.toc-fab`, `#toc-sheet.toc-sheet`, `#toc-sheet-title`, `.toc-sheet-close`, `.toc-sheet-backdrop` |
| Topo | `.toc-top-fab` (`.is-visible`) |
| Links | `[data-toc-target="<id>"]` |
| Variáveis | `--prop-bar-h`, `--prop-toc-h`, `--demo-ribbon-h` |

### Z-index
action bar 100 · `.proposal-toc-bar` 90 · `.toc-fab`/`.toc-top-fab` 120 · faixa demo 140 · header 150 · `.toc-sheet-backdrop` 1049 · `.toc-sheet` 1050.

---

## 8. Checklist de aceite

- [ ] ≥1280: índice sticky, ativo acompanha rolagem, grupo "Escopo já existente" recolhido e expande quando ativo.
- [ ] 768–1279: chips sticky sob a action bar; "Todos" abre o sheet.
- [ ] 360x780: FAB acima da faixa demo; sheet abre/fecha (ESC, backdrop, ✕), foco retorna ao FAB.
- [ ] Título da seção nunca fica sob a action bar/chips.
- [ ] `location.hash` não muda; `?route=proposta&topico=<id>` abre na seção.
- [ ] Refresh/foco da aba não duplica índice nem observers.
- [ ] Print/PDF sem nenhum elemento de navegação.
