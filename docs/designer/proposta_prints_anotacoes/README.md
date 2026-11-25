# Anotação de Prints da Proposta Comercial (PROP-2026-011)

Regra do usuário: **todo print anexado à proposta marca os campos/funcionalidades NOVOS ou AJUSTADOS** com anotações claras e objetivas indicando onde foram adicionados.

Arquivos desta spec:
- `README.md` — estilo, callouts, viewports, nomenclatura, roteiro de telas e automação.
- `exemplo-overlay.html` — compositor de referência (SVG + legenda). Abre no navegador com um exemplo (`?device=mobile` para a variante mobile) e serve de template para a automação via `window.renderAnnotation(spec)`.

---

## 1. Estilo do destaque

Cores escolhidas para **contrastar com a UI do app** (azuis `#1956ce`/`#0070ba`, cinzas `#ccd2da`) e **harmonizar com o navy da proposta** (`#0B2545`). O tipo também é diferenciado por **padrão de traço** (não só cor).

| Tipo | Contorno | Preenchimento | Etiqueta | Uso |
|---|---|---|---|---|
| **NOVO** | 3px sólido `#F97316` | `#F97316` @ 8% | fundo `#C2410C`, texto `#FFFFFF` (≈5.2:1) | Campo/tela/funcionalidade inexistente antes |
| **AJUSTADO** | 3px tracejado `8 5` `#7C3AED` | `#7C3AED` @ 8% | fundo `#6D28D9`, texto `#FFFFFF` (≈7.1:1) | Elemento existente alterado/movido/removido |
| **INCLUSO** | 3px pontilhado `2 5` (`stroke-linecap: round`) `#12B76A` | `#12B76A` @ 8% | fundo `#067647`, texto `#FFFFFF` (≈5.9:1) | Complemento entregue **sem custo** (não faturável) |

Regras do contorno:
- Retângulo = bounding box do elemento **+ 6px** de folga em cada lado; `rx 6`.
- **Halo** branco 7px sob o contorno (opacidade 0.9) → legível sobre fundos claros e escuros.
- Etiqueta (`NOVO`/`AJUSTADO`): 11px, peso 800, uppercase, `letter-spacing 0.06em`, altura 20px, padding horizontal 7px, `rx 3`; ancorada **acima do canto superior esquerdo** do contorno (offset −24px). Se não couber (topo da tela), vai **para dentro** do contorno (+4px).
- Nunca cobrir o texto do elemento destacado; máx. **4 destaques por print** (acima disso, dividir em 2 prints).

## 2. Callouts numerados + legenda

- **Callout**: círculo Ø26px, fundo `#0B2545`, borda 2px `#FFFFFF`, número 13px/800 branco; centrado no **canto superior direito** do contorno (limitado a 16px das bordas do print).
- Numeração sequencial por print (1…4), na ordem de leitura (topo→base, esquerda→direita).
- **Legenda**:
  - Desktop: painel **lateral direito** de 360px, fora do print → arte final **1726x768**.
  - Mobile: painel **inferior**, largura 360px, altura automática → arte final **360 x (780 + legenda)**.
  - Fundo `#FFFFFF`; borda 4px `#0B2545` (esquerda no desktop, superior no mobile); padding 20px (desktop) / 16px (mobile).
  - Cabeçalho: fase (11px/700 `#5B6670`, uppercase, `letter-spacing 0.06em`) + título do print (16px/800 `#0B2545`).
  - Item: `[n]` (callout Ø22px) + etiqueta do tipo + texto 13px/1.35 `#1A1A1A`; gap entre itens 12px; divisor 1px `#E4E7EC`.
  - Texto: **o quê + onde**, máx. **70 caracteres** (desktop) / **48** (mobile). Ex.: "Card LISTAR PROJETOS abre a lista de projetos".
  - Bloco de tipos (chave): amostras NOVO/AJUSTADO com o traço correspondente.
  - Rodapé: `PROP-2026-011 · Ambiente de demonstração · dados fictícios` (10px `#5B6670`).

## 3. Captura, formato e nomenclatura

| Item | Valor |
|---|---|
| Servidor | `BASE_URL = http://localhost:3000` (`src/server/index.js`) |
| Viewport desktop | **1366x768**, `deviceScaleFactor 1` |
| Viewport mobile | **360x780**, `deviceScaleFactor 1`, `isMobile: true`, `hasTouch: true` |
| Formato | **PNG** (sem perdas), sRGB |
| Print bruto | `proposals/prints/<fase>/_raw/<nn>-<slug>[-mobile].png` |
| Arte final | `proposals/prints/<fase>/<nn>-<slug>[-mobile].png` |
| Fases | `fase-1`, `fase-2`, `fase-3`, `fase-4` |
| `nn` | 2 dígitos, ordem do roteiro abaixo |
| `slug` | kebab-case, sem acento |
| Sufixo | desktop sem sufixo; mobile `-mobile` |

Ex.: `proposals/prints/fase-1/01-home-projetos.png`, `proposals/prints/fase-1/01-home-projetos-mobile.png`.

Antes da captura: ocultar toasts (`#toast-root`), desligar animações/transições e caret. Dados mock padrão: 1º projeto `PRJ-2026-0414 · Adutora Industrial Usina Paraná`. O ribbon "Ambiente de demonstração" permanece visível.

Spools de referência (Fase 2):
- Com projeto: **`SP041500345003`** → `PRJ-2026-0414 · Adutora Industrial Usina Paraná`
- Sem projeto: **`SP-0414-00001-001`** → "Spool sem projeto vinculado"

## 4. Roteiro de telas

Seletores verificados em `src/web` (Fase 1 com fluxo conferido; Fase 2 com classes existentes — confirmar o fluxo no momento da captura).

### Fase 1 — Seleção de Projetos (`fase-1`)

| nn-slug | Estado / passos | # | Tipo | Seletor-alvo | Texto da legenda |
|---|---|---|---|---|---|
| `01-home-projetos` | Login → rota `projetos` (sem projeto ativo) | 1 | NOVO | `.menu-card[data-route="listar-projetos"]` | Card LISTAR PROJETOS abre a lista de projetos |
| | | 2 | NOVO | `.menu-card[data-route="validar-qrcode"]` | VALIDAR QRCODE disponível já na home pós-login |
| `02-modal-projetos` | Em 01, clicar card LISTAR PROJETOS | 1 | NOVO | `.project-modal-body .project-item-card` (1º) | Card de projeto: código, nome, cliente e status |
| | | 2 | NOVO | `.project-modal-body .project-item-progress` (1º) | Barra de progresso com % de spools concluídos |
| `03-menu-projeto-ativo` | Em 02, clicar 1º card → rota `menu` | 1 | NOVO | `.active-project-bar` | Bloco PROJETO ATIVO no topo do menu |
| | | 2 | NOVO | `#btn-switch-project` | Botão Trocar projeto volta à home de projetos |
| `04-menu-sem-validar-qrcode` | Mesmo estado de 03 | 1 | AJUSTADO | `.menu-grid` | Validar QRCode saiu do menu (foi para a home) |

### Fase 2 — Vincular Cadastro ao Projeto (`fase-2`)

| nn-slug | Estado / passos | # | Tipo | Seletor-alvo | Texto da legenda |
|---|---|---|---|---|---|
| `01-cadastro-tag-projeto` | Projeto ativo → rota `cadastro` | 1 | NOVO | `.cadastro-project-row` | Projeto ativo exibido no topo do cadastro |
| | | 2 | NOVO | `.spool-item-project-row .project-tag` (1º) | Tag do projeto em cada card de spool |
| `02-modal-qrcode-projeto-ativo` | Projeto ativo → abrir leitura QRCode de etapa (Caldeiraria) | 1 | NOVO | `.qrcode-project-context` | Projeto ativo no topo da modal de QRCode |
| `03-validar-qrcode-projeto-spool` | Home → VALIDAR QRCODE → ler `SP041500345003` | 1 | NOVO | `.qrcode-success-project-row` | Projeto do spool lido exibido na validação |
| `04-validar-qrcode-spool-sem-projeto` | Home → VALIDAR QRCODE → ler `SP-0414-00001-001` | 1 | NOVO | `.qrcode-success-project-row` | Aviso quando o spool não tem projeto vinculado |
| `05-lista-filtrada-projeto` | Projeto ativo → rota `caldeiraria` | 1 | AJUSTADO | `#caldeiraria-spools-list` | Lista mostra só spools do projeto ativo |
| | | 2 | NOVO | `.spool-item-project-row` (1º) | Tag confirma o projeto de cada spool |

> **Recapturar `fase-2/02` e `fase-2/05`** (desktop e mobile): a modal de QRCode da etapa passou a usar `.project-context-bar.qrcode-project-context` e ganhou o botão demo de spool de outro projeto; a tela de etapa ganhou `.stage-project-bar` e contadores por projeto. Nos prints da Fase 2, manter **apenas** as marcações da Fase 2 (as novidades da Fase 3 ficam nos prints `fase-3/*`).

### Fase 3 — Vincular etapas (Caldeiraria, Revestimento, Pintura) ao projeto (`fase-3`)

Origem dos seletores: `src/web/views/process-stage-view.js`, `src/web/components/processes-accordion.js`, `src/web/components/modal-qrcode.js`. `<etapa>` = `caldeiraria` | `revestimento` | `pintura`.

| nn-slug | Estado / passos | # | Tipo | Seletor-alvo | Texto da legenda |
|---|---|---|---|---|---|
| `01-caldeiraria-projeto` | Projeto ativo → rota `caldeiraria` → clicar `#btn-toggle-caldeiraria-processes-accordion` (abrir contadores) | 1 | NOVO | `.stage-project-bar` | Faixa Projeto ativo no topo da etapa |
| | | 2 | AJUSTADO | `#caldeiraria-processes-block` | Contadores por status só do projeto ativo |
| | | 3 | AJUSTADO | `#caldeiraria-spools-list` | Lista de spools filtrada pelo projeto ativo |
| `02-revestimento-projeto` | Idem, rota `revestimento` (`#btn-toggle-revestimento-processes-accordion`) | 1–3 | NOVO / AJUSTADO / AJUSTADO | `.stage-project-bar` · `#revestimento-processes-block` · `#revestimento-spools-list` | Mesmos textos de `01` |
| `03-pintura-projeto` | Idem, rota `pintura` (`#btn-toggle-pintura-processes-accordion`) | 1–3 | NOVO / AJUSTADO / AJUSTADO | `.stage-project-bar` · `#pintura-processes-block` · `#pintura-spools-list` | Mesmos textos de `01` |
| `04-modal-qrcode-etapa-projeto` | Em `01`, clicar `#btn-caldeiraria-qrcode` | 1 | AJUSTADO | `.qrcode-project-context` | Modal da etapa mostra o projeto ativo no topo |
| `05-spool-outro-projeto-bloqueado` | Em `04`, clicar `#btn-modal-demo-foreign` ("Simular leitura de spool de outro projeto") | 1 | NOVO | `.qrcode-foreign-alert` | Spool de outro projeto: movimentação bloqueada |
| | | 2 | NOVO | `#btn-modal-demo-foreign` (antes do clique: capturar rect em `04`) ou omitir se sumir após o render | Botão DEMO simula leitura de outro projeto |

Notas Fase 3:
- `05`: o aviso também dispara toast "Spool de outro projeto"; manter `#toast-root` oculto (o alerta inline `.qrcode-foreign-alert` é a evidência). O botão `#btn-modal-demo-foreign` é `.demo-only` e só aparece se houver spool da etapa em outro projeto no mock; se não estiver presente após o clique, registrar só a marca 1.
- Mobile (`01`–`03`): 3 marcas não cabem em 780px. Capturar `-mobile.png` com marcas 1–2 (scroll até `.stage-project-bar`) e `-mobile-2.png` com a marca 3 (scroll até `#<etapa>-spools-list`), renumerando a partir de 1 em cada print.

### Fase 1 — complemento (incluso, sem custo) (`fase-1`)

Somente **mobile** (menu lateral/drawer). Selo **INCLUSO** (verde pontilhado, §1). Cabeçalho da legenda: `Fase 1 – complemento (incluso, sem custo)`. Origem: `src/web/components/header.js`.

| nn-slug | Estado / passos | # | Tipo | Seletor-alvo | Texto da legenda |
|---|---|---|---|---|---|
| `05-drawer-trocar-projeto-mobile` | Projeto ativo → rota `caldeiraria` → clicar `#btn-header-hamburger` | 1 | INCLUSO | `#drawer-project-row` | Projeto ativo exibido no menu lateral |
| | | 2 | INCLUSO | `#work-drawer-nav-list .drawer-item-switch-project` | Item TROCAR PROJETO no menu lateral |
| `06-drawer-home-trocar-projeto-mobile` | Projeto ativo → rota `menu` → clicar `#btn-header-hamburger` | 1 | INCLUSO | `#drawer-project-row` | Projeto ativo no menu lateral da home |
| | | 2 | INCLUSO | `#home-drawer-project-list .drawer-item-switch-project` | Atalho TROCAR PROJETO no menu da home |

Arquivo: o nome já contém `-mobile` (sem versão desktop).

### Fase 4 — Vincular projeto ao fluxo de Transferência (`fase-4`)

Origem dos seletores: `src/web/components/transfer-card.js`, `src/web/views/nova-transferencia-view.js`, `src/web/views/transferencia-*-view.js`, `src/web/components/modal-qrcode.js`. Rotas (`src/web/app.js`): `transferencia-componente`, `transferencia-spool` (param `processo`, padrão `caldeiraria-revestimento`), `nova-transferencia`, `nova-transferencia-spool`; todas exigem projeto ativo. Projeto padrão `PRJ-2026-0414` (`prj-0414`); projeto sem transferências `PRJ-2026-0451` (`prj-0451`).

Desktop **e** mobile para todos os prints.

| nn-slug | Estado / passos | # | Tipo | Seletor-alvo | Texto da legenda |
|---|---|---|---|---|---|
| `01-transf-componente-projeto` | Projeto `prj-0414` → `window.navigateTo('transferencia-componente')` (manual: Menu → TRANSFERÊNCIA → Componente) | 1 | NOVO | `.transfer-project-bar .project-tag-row` ¹ | Faixa Projeto ativo na lista de transferências |
| | | 2 | NOVO | `.transfer-project-counters` | Contadores do projeto: Em Trânsito, Concluído, Total |
| | | 3 | NOVO | `.transfer-item-project-row` (1º) | Tag do projeto em cada transferência |
| `02-transf-spool-projeto` | Projeto `prj-0414` → `window.navigateTo('transferencia-spool', { processo: 'caldeiraria-revestimento' })` | 1–3 | NOVO | mesmos de `01` | Mesmos textos de `01` |
| `03-transf-componente-sem-transferencias` | Projeto `prj-0451` → `window.navigateTo('transferencia-componente')` | 1 | NOVO | `.transfer-project-counters` | Contadores zerados para o projeto ativo |
| | | 2 | AJUSTADO | `.transfer-empty-state` | Aviso: projeto ainda sem transferências |
| `04-nova-transf-componente-projeto` | Em `01`, clicar `#btn-create-transfer` → rota `nova-transferencia` | 1 | NOVO | `.nova-transfer-project-bar` | Projeto ativo no topo da nova transferência |
| `05-nova-transf-spool-projeto` | Em `02`, clicar `#btn-create-transfer` → rota `nova-transferencia-spool` | 1 | NOVO | `.nova-transfer-project-bar` | Projeto ativo no topo da nova transferência |
| `06-modal-qrcode-transf-projeto` | Em `04`, clicar `#btn-transf-qrcode` | 1 | AJUSTADO | `.qrcode-project-context` | Modal de leitura mostra o projeto ativo |
| | | 2 | NOVO | `#btn-modal-demo-foreign-transfer` | Botão DEMO simula item de outro projeto |
| `07-transf-componente-outro-projeto` | Em `06`, clicar `#btn-modal-demo-foreign-transfer` | 1 | NOVO | `.qrcode-transfer-foreign-alert` | Item de outro projeto bloqueado na transferência |
| `08-transf-spool-outro-projeto` | Em `05` → `#btn-transf-qrcode` → `#btn-modal-demo-foreign-transfer` | 1 | NOVO | `.qrcode-transfer-foreign-alert` | Spool de outro projeto bloqueado na transferência |

Notas Fase 4:
- ¹ `.transfer-project-counters` fica **dentro** de `.transfer-project-bar`; para não sobrepor contornos/callouts, a marca 1 usa o `.project-tag-row` interno da faixa. Se o frontend preferir o contorno na faixa inteira, usar `.transfer-project-bar` e omitir a marca 2 nesse print.
- `07`/`08`: toast "… de outro projeto" permanece oculto (`#toast-root`); a evidência é o alerta inline.
- Mobile: se alguma marca ficar fora dos 780px, aplicar a regra da Fase 3 (`-mobile.png` + `-mobile-2.png`, renumerando a partir de 1).

Helpers de automação (somar ao script do §5):

```js
async function pickProject(p, projectId) {
  await openProjects(p);
  await p.click(`.project-modal-body .project-item-card[data-project-id="${projectId}"]`);
  await p.waitForSelector('.active-project-bar');
}
const go = (p, route, params) => p.evaluate(([r, pr]) => window.navigateTo(r, pr), [route, params || {}]);

// Ex.: fase-4/03
// setup: async p => { await login(p); await pickProject(p, 'prj-0451'); await go(p, 'transferencia-componente'); await p.waitForSelector('.transfer-empty-state'); }
```

Mobile: mesmos seletores; se o alvo estiver fora da dobra, `scrollIntoView({ block: 'center' })` antes da captura (print continua 360x780).

## 5. Automação sugerida (comercial)

Pipeline em 2 etapas (print do app **intacto**, legenda **fora** da tela):

1. **Capturar** o app (Playwright/Puppeteer) → PNG bruto + `boundingBox()` de cada seletor (relativo ao viewport).
2. **Compor** abrindo `exemplo-overlay.html`, chamando `window.renderAnnotation(spec)` com o PNG (data URL) e os retângulos; screenshot de `#board`.

Script sugerido fora de `src/` (ex.: `tools/prints/capture.mjs`; implementação a cargo do frontend/comercial):

```js
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000/';
const COMPOSER = 'file://' + path.resolve('docs/designer/proposta_prints_anotacoes/exemplo-overlay.html');
const VIEWPORTS = {
  desktop: { viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 },
  mobile:  { viewport: { width: 360, height: 780 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
};
const FREEZE_CSS = `#toast-root{display:none!important}
*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}`;
const PHASES = {
  'fase-1': 'Fase 1 – Seleção de Projetos',
  'fase-2': 'Fase 2 – Vincular Cadastro ao Projeto',
  'fase-3': 'Fase 3 – Vincular etapas ao projeto',
  'fase-4': 'Fase 4 – Vincular projeto ao fluxo de Transferência'
};
// Complemento Fase 1: usar shot.phaseLabel = 'Fase 1 – complemento (incluso, sem custo)' e shot.devices = ['mobile']

async function login(page) {
  await page.goto(BASE);
  await page.evaluate(() => {
    sessionStorage.setItem('app_user', JSON.stringify({ username: 'josuellopes', name: 'josuellopes', isLoggedIn: true }));
    sessionStorage.setItem('app_current_route', 'projetos');
    sessionStorage.removeItem('app_active_project');
  });
  await page.reload();
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.waitForSelector('.menu-card[data-route="listar-projetos"]');
}
async function openProjects(p) {
  await p.click('.menu-card[data-route="listar-projetos"]');
  await p.waitForSelector('.project-modal-body .project-item-card');
}
async function pickFirstProject(p) {
  await openProjects(p);
  await p.locator('.project-modal-body .project-item-card').first().click();
  await p.waitForSelector('.active-project-bar');
}

const SHOTS = [
  { phase: 'fase-1', id: '01-home-projetos', title: '01 · Home pós-login',
    setup: login, marks: [
      { n: 1, type: 'novo', sel: '.menu-card[data-route="listar-projetos"]', text: 'Card LISTAR PROJETOS abre a lista de projetos' },
      { n: 2, type: 'novo', sel: '.menu-card[data-route="validar-qrcode"]', text: 'VALIDAR QRCODE disponível já na home pós-login' } ] },
  { phase: 'fase-1', id: '02-modal-projetos', title: '02 · Modal de projetos',
    setup: async p => { await login(p); await openProjects(p); }, marks: [
      { n: 1, type: 'novo', sel: '.project-modal-body .project-item-card', text: 'Card de projeto: código, nome, cliente e status' },
      { n: 2, type: 'novo', sel: '.project-modal-body .project-item-progress', text: 'Barra de progresso com % de spools concluídos' } ] },
  { phase: 'fase-1', id: '03-menu-projeto-ativo', title: '03 · Menu com projeto ativo',
    setup: async p => { await login(p); await pickFirstProject(p); }, marks: [
      { n: 1, type: 'novo', sel: '.active-project-bar', text: 'Bloco PROJETO ATIVO no topo do menu' },
      { n: 2, type: 'novo', sel: '#btn-switch-project', text: 'Botão Trocar projeto volta à home de projetos' } ] },
  { phase: 'fase-1', id: '04-menu-sem-validar-qrcode', title: '04 · Menu sem Validar QRCode',
    setup: async p => { await login(p); await pickFirstProject(p); }, marks: [
      { n: 1, type: 'ajustado', sel: '.menu-grid', text: 'Validar QRCode saiu do menu (foi para a home)' } ] }
  // Fase 2: mesmo formato, seletores/spools da tabela §4.
];

const browser = await chromium.launch();
for (const [device, ctxOpts] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext(ctxOpts);
  for (const shot of SHOTS) {
    if (shot.devices && !shot.devices.includes(device)) continue;
    const page = await ctx.newPage();
    await shot.setup(page);
    await page.locator(shot.marks[0].sel).first().evaluate(el => el.scrollIntoView({ block: 'center' }));
    const items = [];
    for (const m of shot.marks) {
      items.push({ n: m.n, type: m.type, text: m.text, rect: await page.locator(m.sel).first().boundingBox() });
    }
    const suffix = device === 'mobile' && !shot.id.endsWith('-mobile') ? '-mobile' : '';
    const rawPath = `proposals/prints/${shot.phase}/_raw/${shot.id}${suffix}.png`;
    fs.mkdirSync(path.dirname(rawPath), { recursive: true });
    const raw = await page.screenshot({ path: rawPath, fullPage: false });

    const composer = await browser.newPage({ viewport: { width: 1800, height: 1400 }, deviceScaleFactor: 1 });
    await composer.goto(COMPOSER);
    await composer.evaluate(spec => window.renderAnnotation(spec), {
      phase: shot.phaseLabel || PHASES[shot.phase], title: shot.title, device, viewport: ctxOpts.viewport,
      image: 'data:image/png;base64,' + raw.toString('base64'), items
    });
    await composer.waitForSelector('body[data-ready="1"]');
    await composer.locator('#board').screenshot({ path: `proposals/prints/${shot.phase}/${shot.id}${suffix}.png` });
    await composer.close();
    await page.close();
  }
  await ctx.close();
}
await browser.close();
```

Contrato de `window.renderAnnotation(spec)`:

```json
{
  "phase": "Fase 1 – Seleção de Projetos",
  "title": "01 · Home pós-login",
  "device": "desktop | mobile",
  "viewport": { "width": 1366, "height": 768 },
  "image": "data:image/png;base64,... (opcional; sem imagem usa a tela mock do exemplo)",
  "items": [
    { "n": 1, "type": "novo | ajustado | incluso", "rect": { "x": 0, "y": 0, "width": 0, "height": 0 }, "text": "≤70 caracteres" }
  ]
}
```

`renderAnnotation` limpa o `#board`, desenha e define `document.body.dataset.ready = "1"` após a imagem carregar.

## 6. Checklist de aceite

1. Cada destaque tem callout e item de legenda com o mesmo número.
2. Etiqueta e callout não cobrem o texto do elemento destacado.
3. NOVO (laranja sólido), AJUSTADO (violeta tracejado) e INCLUSO (verde pontilhado) distinguíveis também em escala de cinza.
6. `fase-2/02` e `fase-2/05` recapturados após a Fase 3.
4. PNG final: desktop 1726x768; mobile 360x(780+legenda).
5. Nomes conforme §3; brutos preservados em `_raw/`.

## 7. Pendências

- Fase 2 (`03`/`04`): o modo de "ler" `SP041500345003` / `SP-0414-00001-001` depende do fluxo do scanner mock (entrada manual ou simulação). O frontend deve indicar o gatilho para a automação.
