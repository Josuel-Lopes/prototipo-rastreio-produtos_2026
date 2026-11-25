// Captura e anotação dos prints da proposta (spec: docs/designer/proposta_prints_anotacoes/README.md).
// Uso: PLAYWRIGHT_PATH=<dir do pacote playwright> BASE_URL=http://localhost:3000/ node proposals/prints/_tools/capture.mjs
// Não adiciona dependências ao repositório: o Playwright é carregado de um caminho externo.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const BASE = process.env.BASE_URL || 'http://localhost:3000/';
const COMPOSER = 'file://' + path.resolve('docs/designer/proposta_prints_anotacoes/exemplo-overlay.html');
const VIEWPORTS = {
  desktop: { viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 360, height: 780 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
};
const FREEZE_CSS = `#toast-root{display:none!important}
*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important;caret-color:transparent!important}`;
// Rótulos visíveis usam a numeração oficial da proposta (pastas fase-1..3 mantidas).
const PHASES = { 'fase-1': 'Fase 7 – Seleção de Projetos', 'fase-2': 'Fase 8 – Vincular Cadastro ao Projeto', 'fase-3': 'Fase 9 – Vincular etapas ao projeto', 'fase-4': 'Fase 10 – Vincular Projeto ao Fluxo de Transferência' };
const INCLUSO_LABEL = 'Fase 7 – complemento (incluso, sem custo)';

const freeze = p => p.addStyleTag({ content: FREEZE_CSS });

async function login(p) {
  await p.goto(BASE);
  await p.evaluate(() => {
    sessionStorage.setItem('app_user', JSON.stringify({ username: 'josuellopes', name: 'josuellopes', isLoggedIn: true }));
    sessionStorage.setItem('app_current_route', 'projetos');
    sessionStorage.removeItem('app_active_project');
  });
  await p.reload();
  await freeze(p);
  await p.waitForSelector('.menu-card[data-route="listar-projetos"]');
}
async function openProjects(p) {
  await p.click('.menu-card[data-route="listar-projetos"]');
  await p.waitForSelector('.project-modal-body .project-item-card', { state: 'visible' });
  await p.waitForFunction(() => getComputedStyle(document.querySelector('.modal-backdrop')).opacity === '1');
  await p.waitForTimeout(300);
}
async function pickFirstProject(p) {
  await openProjects(p);
  await p.locator('.project-modal-body .project-item-card').first().click();
  await p.waitForSelector('.active-project-bar');
}
async function goModule(p, route) {
  await login(p);
  await pickFirstProject(p);
  if (route !== 'menu') await p.click(`.menu-card[data-route="${route}"]`);
  await freeze(p);
}
async function openAccordion(p, stage) {
  await p.waitForSelector(`#btn-toggle-${stage}-processes-accordion`);
  const open = await p.locator(`#${stage}-processes-block`).evaluate(el => el.classList.contains('is-open'));
  if (!open) await p.click(`#btn-toggle-${stage}-processes-accordion`);
  await freeze(p);
}
async function stageQr(p) {
  await goModule(p, 'caldeiraria');
  await openAccordion(p, 'caldeiraria');
  await p.click('#btn-caldeiraria-qrcode');
  await p.waitForSelector('.qrcode-project-context');
}
async function readFeedback(p) {
  await p.waitForSelector('#qrcode-read-feedback', { state: 'visible' });
  await freeze(p);
  await p.waitForTimeout(300);
}
async function drawer(p, route) {
  await goModule(p, route);
  await p.click('#btn-header-hamburger');
  await p.waitForSelector('#drawer-project-row:not([hidden])');
  await freeze(p);
}
async function pickProject(p, projectId) {
  await openProjects(p);
  await p.click(`.project-modal-body .project-item-card[data-project-id="${projectId}"]`);
  await p.waitForSelector('.active-project-bar');
}
const go = (p, route, params) => p.evaluate(([r, pr]) => window.navigateTo(r, pr), [route, params || {}]);
async function transfList(p, route, params, projectId = 'prj-0414') {
  await login(p);
  await pickProject(p, projectId);
  await go(p, route, params);
  await p.waitForSelector('.transfer-project-bar');
  await freeze(p);
}
async function novaTransf(p, route, params) {
  await transfList(p, route, params);
  await p.click('#btn-create-transfer');
  await p.waitForSelector('.nova-transfer-project-bar');
  await freeze(p);
}
async function transfQr(p, route, params, foreign) {
  await novaTransf(p, route, params);
  await p.click('#btn-transf-qrcode');
  await p.waitForSelector('.qrcode-project-context', { state: 'visible' });
  if (foreign === 'ok') {
    await p.click('#qrcode-camera-viewfinder');
    await p.waitForSelector('#qrcode-read-feedback', { state: 'visible' });
  } else if (foreign) {
    await p.click('#btn-modal-demo-foreign-transfer');
    await p.waitForSelector('.qrcode-transfer-foreign-alert', { state: 'visible' });
  }
  await freeze(p);
  await p.waitForTimeout(300);
}
const SPOOL = ['transferencia-spool', { processo: 'caldeiraria-revestimento' }];
const TL_MARKS = [
  { type: 'novo', sel: '.transfer-project-bar .project-tag-row', text: 'Faixa Projeto ativo na lista de transferências', m: 'Faixa Projeto ativo na lista' },
  { type: 'novo', sel: '.transfer-project-counters', text: 'Contadores do projeto: Em Trânsito, Concluído, Total', m: 'Contadores: Em Trânsito, Concluído, Total' },
  { type: 'novo', sel: '.transfer-item-project-row', text: 'Tag do projeto em cada transferência', m: 'Tag do projeto em cada transferência' }];
const STAGE_TXT = [
  { type: 'novo', sel: s => `.stage-project-bar`, text: 'Faixa Projeto ativo no topo da etapa', m: 'Faixa Projeto ativo no topo da etapa' },
  { type: 'ajustado', sel: s => `#${s}-processes-block`, text: 'Contadores por status só do projeto ativo', m: 'Contadores só do projeto ativo' },
  { type: 'ajustado', sel: s => `#${s}-spools-list`, text: 'Lista de spools filtrada pelo projeto ativo', m: 'Lista filtrada pelo projeto ativo' }];
function stageShots(stage, nn, name) {
  const setup = async p => { await goModule(p, stage); await openAccordion(p, stage); };
  const mk = list => list.map(x => ({ ...x, sel: x.sel(stage) }));
  return [
    { phase: 'fase-3', id: `${nn}-${stage}-projeto`, title: `${nn} · ${name} com projeto`, devices: ['desktop'], scrollBlock: 'start', setup, marks: mk(STAGE_TXT) },
    { phase: 'fase-3', id: `${nn}-${stage}-projeto`, title: `${nn} · ${name} com projeto`, devices: ['mobile'], setup, marks: mk(STAGE_TXT.slice(0, 2)) },
    { phase: 'fase-3', id: `${nn}-${stage}-projeto`, file: `${nn}-${stage}-projeto-mobile-2`, title: `${nn} · ${name} – lista`, devices: ['mobile'], setup, marks: mk(STAGE_TXT.slice(2)) }];
}
async function validarUntil(p, code) {
  await login(p);
  await p.click('.menu-card[data-route="validar-qrcode"]');
  for (let i = 0; i < 6; i++) {
    await p.waitForSelector('#btn-validar-scan');
    await p.click('#btn-validar-scan');
    await p.waitForSelector('#btn-success-close-x');
    const txt = await p.locator('#modal-root').innerText();
    if (txt.includes(code)) return;
    await p.click('#btn-success-close-x');
  }
  throw new Error('Spool não encontrado na simulação: ' + code);
}

const SHOTS = [
  { phase: 'fase-1', id: '01-home-projetos', title: '01 · Home pós-login', setup: login, marks: [
    { type: 'novo', sel: '.menu-card[data-route="listar-projetos"]', text: 'Card LISTAR PROJETOS abre a lista de projetos', m: 'Card LISTAR PROJETOS abre os projetos' },
    { type: 'novo', sel: '.menu-card[data-route="validar-qrcode"]', text: 'VALIDAR QRCODE disponível já na home pós-login', m: 'VALIDAR QRCODE já na home pós-login' }] },
  { phase: 'fase-1', id: '02-modal-projetos', title: '02 · Modal de projetos', setup: async p => { await login(p); await openProjects(p); }, marks: [
    { type: 'novo', sel: '.project-modal-body .project-item-card', text: 'Card de projeto: código, nome, cliente e status', m: 'Card: código, nome, cliente e status' },
    { type: 'novo', sel: '.project-modal-body .project-item-progress', text: 'Barra de progresso com % de spools concluídos', m: 'Progresso: % de spools concluídos' }] },
  { phase: 'fase-1', id: '03-menu-projeto-ativo', title: '03 · Menu com projeto ativo', setup: async p => { await login(p); await pickFirstProject(p); }, marks: [
    { type: 'novo', sel: '.active-project-bar', text: 'Bloco PROJETO ATIVO no topo do menu', m: 'Bloco PROJETO ATIVO no topo do menu' },
    { type: 'novo', sel: '#btn-switch-project', text: 'Botão Trocar projeto volta à home de projetos', m: 'Trocar projeto volta à home' }] },
  { phase: 'fase-1', id: '04-menu-sem-validar-qrcode', title: '04 · Menu sem Validar QRCode', setup: async p => { await login(p); await pickFirstProject(p); }, marks: [
    { type: 'ajustado', sel: '.menu-grid', text: 'Validar QRCode saiu do menu (foi para a home)', m: 'Validar QRCode saiu do menu (foi p/ home)' }] },

  { phase: 'fase-2', id: '01-cadastro-tag-projeto', title: '01 · Cadastro com projeto', setup: async p => { await goModule(p, 'cadastro'); await p.waitForSelector('.cadastro-project-row'); }, marks: [
    { type: 'novo', sel: '.cadastro-project-row', text: 'Projeto ativo exibido no topo do cadastro', m: 'Projeto ativo no topo do cadastro' },
    { type: 'novo', sel: '.spool-item-project-row .project-tag', optional: true, text: 'Tag do projeto em cada card de spool', m: 'Tag do projeto em cada card de spool' }] },
  { phase: 'fase-2', id: '02-modal-qrcode-projeto-ativo', title: '02 · Modal QRCode com projeto', setup: async p => {
      await goModule(p, 'caldeiraria');
      await p.click('#btn-caldeiraria-qrcode');
      await p.waitForSelector('.qrcode-project-context');
    }, marks: [
    { type: 'novo', sel: '.qrcode-project-context', text: 'Projeto ativo no topo da modal de QRCode', m: 'Projeto ativo no topo da modal QRCode' }] },
  { phase: 'fase-2', id: '03-validar-qrcode-projeto-spool', title: '03 · Validar QRCode – spool com projeto', setup: p => validarUntil(p, 'SP041500345003'), marks: [
    { type: 'novo', sel: '.qrcode-success-project-row', text: 'Projeto do spool lido exibido na validação', m: 'Projeto do spool lido na validação' }] },
  { phase: 'fase-2', id: '04-validar-qrcode-spool-sem-projeto', title: '04 · Validar QRCode – spool sem projeto', setup: p => validarUntil(p, 'SP-0414-00001-001'), marks: [
    { type: 'novo', sel: '.qrcode-success-project-row', text: 'Aviso quando o spool não tem projeto vinculado', m: 'Aviso: spool sem projeto vinculado' }] },
  { phase: 'fase-2', id: '05-lista-filtrada-projeto', title: '05 · Lista filtrada pelo projeto', setup: async p => { await goModule(p, 'caldeiraria'); await p.waitForSelector('#caldeiraria-spools-list'); }, marks: [
    { type: 'ajustado', sel: '#caldeiraria-spools-list', text: 'Lista mostra só spools do projeto ativo', m: 'Lista só com spools do projeto ativo' },
    { type: 'novo', sel: '#caldeiraria-spools-list .spool-item-project-row', optional: true, text: 'Tag confirma o projeto de cada spool', m: 'Tag confirma o projeto do spool' }] },
  { phase: 'fase-2', id: '06-modal-cadastro-leitura-projeto', title: '06 · Leitura no cadastro', setup: async p => {
      await goModule(p, 'cadastro');
      await p.click('#btn-cadastro-qrcode');
      await p.waitForSelector('.qrcode-project-context', { state: 'visible' });
      await p.click('#btn-modal-trigger-scan');
      await readFeedback(p);
    }, marks: [
    { type: 'novo', sel: '.qrcode-project-context', text: 'Projeto ativo que será vinculado ao cadastro', m: 'Projeto ativo vinculado ao cadastro' },
    { type: 'ajustado', sel: '.qrcode-read-feedback.is-success', text: 'Confirmação no visor: spool lido e componentes', m: 'Spool lido · componentes no visor' }] },
  { phase: 'fase-2', id: '07-validar-leitor-sucesso-projeto', title: '07 · Validar QRCode – leitor', setup: async p => {
      await validarUntil(p, 'SP041500345003');
      await p.click('#btn-success-close-x');
      await readFeedback(p);
    }, marks: [
    { type: 'novo', sel: '.qrcode-read-feedback.is-success', text: 'QRCode válido com o projeto do spool no visor', m: 'QRCode válido + projeto no visor' }] },

  ...stageShots('caldeiraria', '01', 'Caldeiraria'),
  ...stageShots('revestimento', '02', 'Revestimento'),
  ...stageShots('pintura', '03', 'Pintura'),
  { phase: 'fase-3', id: '04-modal-qrcode-etapa-projeto', title: '04 · Modal QRCode da etapa', setup: stageQr, marks: [
    { type: 'ajustado', sel: '.qrcode-project-context', text: 'Modal da etapa mostra o projeto ativo no topo', m: 'Modal da etapa mostra o projeto ativo' }] },
  { phase: 'fase-3', id: '05-spool-outro-projeto-bloqueado', title: '05 · Spool de outro projeto bloqueado', setup: async p => {
      await stageQr(p);
      await p.click('#btn-modal-demo-foreign');
      await readFeedback(p);
    }, marks: [
    { type: 'novo', sel: '.qrcode-camera-viewfinder .qrcode-foreign-alert', text: 'Aviso no visor: spool pertence a outro projeto', m: 'Aviso no visor: spool de outro projeto' },
    { type: 'novo', sel: '.qrcode-instr-caldeiraria-line2.is-blocked', text: 'Movimentação bloqueada para spool de outro projeto', m: 'Movimentação bloqueada' }] },
  { phase: 'fase-3', id: '06-leitura-ok-etapa-projeto', title: '06 · Leitura OK na etapa', setup: async p => {
      await stageQr(p);
      await p.click('#btn-modal-trigger-scan');
      await readFeedback(p);
    }, marks: [
    { type: 'ajustado', sel: '.qrcode-read-feedback.is-success', text: 'Confirmação de leitura no visor (spool do projeto ativo)', m: 'Leitura confirmada no visor' }] },

  { phase: 'fase-1', id: '05-drawer-trocar-projeto-mobile', file: '05-drawer-trocar-projeto-mobile', phaseLabel: INCLUSO_LABEL, title: '05 · Menu lateral – Trocar projeto', devices: ['mobile'], setup: p => drawer(p, 'caldeiraria'), marks: [
    { type: 'incluso', sel: '#drawer-project-row', m: 'Projeto ativo exibido no menu lateral' },
    { type: 'incluso', sel: '#work-drawer-nav-list .drawer-item-switch-project', m: 'Item TROCAR PROJETO no menu lateral' }] },
  { phase: 'fase-1', id: '06-drawer-home-trocar-projeto-mobile', file: '06-drawer-home-trocar-projeto-mobile', phaseLabel: INCLUSO_LABEL, title: '06 · Menu lateral da home', devices: ['mobile'], setup: p => drawer(p, 'menu'), marks: [
    { type: 'incluso', sel: '#drawer-project-row', m: 'Projeto ativo no menu lateral da home' },
    { type: 'incluso', sel: '#home-drawer-project-list .drawer-item-switch-project', m: 'Atalho TROCAR PROJETO no menu da home' }] },

  { phase: 'fase-4', id: '01-transf-componente-projeto', title: '01 · Transferência de componentes', setup: p => transfList(p, 'transferencia-componente'), marks: TL_MARKS },
  { phase: 'fase-4', id: '02-transf-spool-projeto', title: '02 · Transferência de spools', setup: p => transfList(p, ...SPOOL), marks: TL_MARKS },
  { phase: 'fase-4', id: '03-transf-componente-sem-transferencias', title: '03 · Projeto sem transferências', setup: async p => { await transfList(p, 'transferencia-componente', {}, 'prj-0451'); await p.waitForSelector('.transfer-empty-state'); }, marks: [
    { type: 'novo', sel: '.transfer-project-counters', text: 'Contadores zerados para o projeto ativo', m: 'Contadores zerados para o projeto' },
    { type: 'ajustado', sel: '.transfer-empty-state', text: 'Aviso: projeto ainda sem transferências', m: 'Aviso: projeto sem transferências' }] },
  { phase: 'fase-4', id: '04-nova-transf-componente-projeto', title: '04 · Nova transferência de componentes', setup: p => novaTransf(p, 'transferencia-componente'), marks: [
    { type: 'novo', sel: '.nova-transfer-project-bar', text: 'Projeto ativo no topo da nova transferência', m: 'Projeto ativo na nova transferência' }] },
  { phase: 'fase-4', id: '05-nova-transf-spool-projeto', title: '05 · Nova transferência de spools', setup: p => novaTransf(p, ...SPOOL), marks: [
    { type: 'novo', sel: '.nova-transfer-project-bar', text: 'Projeto ativo no topo da nova transferência', m: 'Projeto ativo na nova transferência' }] },
  { phase: 'fase-4', id: '06-modal-qrcode-transf-projeto', title: '06 · Modal QRCode da transferência', setup: p => transfQr(p, 'transferencia-componente', {}, false), marks: [
    { type: 'ajustado', sel: '.qrcode-project-context', text: 'Modal de leitura mostra o projeto ativo', m: 'Modal mostra o projeto ativo' },
    { type: 'novo', sel: '#btn-modal-demo-foreign-transfer', optional: true, text: 'Botão DEMO simula item de outro projeto', m: 'DEMO simula item de outro projeto' }] },
  { phase: 'fase-4', id: '07-transf-componente-outro-projeto', title: '07 · Componente de outro projeto', setup: p => transfQr(p, 'transferencia-componente', {}, true), marks: [
    { type: 'novo', sel: '.qrcode-camera-viewfinder .qrcode-transfer-foreign-alert', text: 'Aviso no visor: item de outro projeto não adicionado', m: 'Item de outro projeto bloqueado' }] },
  { phase: 'fase-4', id: '08-transf-spool-outro-projeto', title: '08 · Spool de outro projeto', setup: p => transfQr(p, ...SPOOL, true), marks: [
    { type: 'novo', sel: '.qrcode-camera-viewfinder .qrcode-transfer-foreign-alert', text: 'Aviso no visor: spool de outro projeto não adicionado', m: 'Spool de outro projeto bloqueado' }] },
  { phase: 'fase-4', id: '09-transf-componente-item-adicionado', title: '09 · Componente adicionado', setup: p => transfQr(p, 'transferencia-componente', {}, 'ok'), marks: [
    { type: 'ajustado', sel: '.qrcode-read-feedback.is-success', text: 'Confirmação no visor: item do projeto adicionado', m: 'Item adicionado (visor)' }] },
  { phase: 'fase-4', id: '10-transf-spool-item-adicionado', title: '10 · Spool adicionado', setup: p => transfQr(p, ...SPOOL, 'ok'), marks: [
    { type: 'ajustado', sel: '.qrcode-read-feedback.is-success', text: 'Confirmação no visor: spool do projeto adicionado', m: 'Spool adicionado (visor)' }] }
];

const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const report = [];
const browser = await chromium.launch();
for (const [device, ctxOpts] of Object.entries(VIEWPORTS)) {
  for (const shot of SHOTS) {
    if (only && !only.includes(`${shot.phase}/${shot.id}`) && !only.includes(shot.phase)) continue;
    if (shot.devices && !shot.devices.includes(device)) continue;
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    const name = shot.file || shot.id + (device === 'mobile' ? '-mobile' : '');
    const suffix = '';
    try {
      await shot.setup(page);
      await page.waitForTimeout(300);
      await page.locator(shot.marks[0].sel).first().evaluate((el, block) => el.scrollIntoView({ block }), shot.scrollBlock || 'center');
      await page.waitForTimeout(150);
      const items = [];
      for (const m of shot.marks) {
        const loc = page.locator(m.sel).first();
        if (!(await loc.count())) {
          if (m.optional) { report.push(`WARN ${shot.phase}/${name}: seletor ausente ${m.sel}`); continue; }
          throw new Error('seletor ausente ' + m.sel);
        }
        const rect = await loc.boundingBox();
        if (!rect) { report.push(`WARN ${shot.phase}/${name}: sem bounding box ${m.sel}`); continue; }
        const vh = ctxOpts.viewport.height;
        if (rect.y < 0 || rect.y + Math.min(rect.height, 40) > vh) report.push(`WARN ${shot.phase}/${name}: fora da dobra ${m.sel} (y=${Math.round(rect.y)})`);
        items.push({ n: items.length + 1, type: m.type, text: device === 'mobile' ? m.m : (m.text || m.m), rect });
      }
      const rawPath = `proposals/prints/${shot.phase}/_raw/${name}.png`;
      fs.mkdirSync(path.dirname(rawPath), { recursive: true });
      const raw = await page.screenshot({ path: rawPath, fullPage: false });

      const composer = await browser.newPage({ viewport: { width: 1800, height: 1400 }, deviceScaleFactor: 1 });
      await composer.goto(COMPOSER);
      await composer.evaluate(() => { document.body.dataset.ready = '0'; });
      await composer.evaluate(spec => window.renderAnnotation(spec), {
        phase: shot.phaseLabel || PHASES[shot.phase], title: shot.title, device, viewport: ctxOpts.viewport,
        image: 'data:image/png;base64,' + raw.toString('base64'), items
      });
      await composer.waitForSelector('body[data-ready="1"]');
      const out = `proposals/prints/${shot.phase}/${name}.png`;
      await composer.locator('#board').screenshot({ path: out });
      await composer.close();
      report.push(`OK ${out} (${items.length} destaque(s))`);
    } catch (e) {
      report.push(`FAIL ${shot.phase}/${name}: ${e.message.split('\n')[0]}`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log(report.join('\n'));
