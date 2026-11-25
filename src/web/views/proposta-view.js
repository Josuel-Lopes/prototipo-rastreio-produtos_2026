/**
 * View da Proposta Comercial - Alvenius & MAXCODE42
 * Responsabilidade Única: Renderização executiva da proposta a partir da fonte única
 * `proposals/proposta-template.json` (servida em `data/proposta-template.json`),
 * catálogo de funcionalidades, quadro de investimento e impressão PDF (@media print).
 */

import { lucide } from '../components/icons.js';

/** Caminho público do JSON da proposta (link para proposals/proposta-template.json). */
export const PROPOSTA_DATA_URL = 'data/proposta-template.json';

/** Prints anotados: `proposals/prints/...` é servido via link `data/prints/...`. */
const PRINTS_SOURCE_PREFIX = 'proposals/prints/';
const PRINTS_PUBLIC_PREFIX = 'data/prints/';

/** Resolve o caminho do print (JSON) para a URL pública servida pela web. */
const resolvePrintSrc = (path) => {
  if (!path) return '';
  const clean = String(path).replace(/^\.?\//, '');
  return clean.startsWith(PRINTS_SOURCE_PREFIX)
    ? PRINTS_PUBLIC_PREFIX + clean.slice(PRINTS_SOURCE_PREFIX.length)
    : clean;
};

const PRINT_LEGEND_TYPES = {
  novo: 'Novo',
  ajustado: 'Ajustado',
  incluso: 'Incluso'
};

/** Versões disponíveis de um print (desktop, mobile, mobile-2), na ordem de exibição. */
const getPrintViews = (pr = {}) => [
  { key: 'desktop', label: 'Desktop', src: pr.mobileOnly ? '' : pr.path },
  { key: 'mobile', label: pr.mobilePath2 ? 'Mobile 1' : 'Mobile', src: pr.mobilePath },
  { key: 'mobile-2', label: 'Mobile 2', src: pr.mobilePath2 }
].filter(v => v.src).map(v => ({ ...v, src: resolvePrintSrc(v.src) }));

/** Caminhos (resolvidos) de um print, para casar com `includedItems[].prints` (strings). */
const printPaths = (pr = {}) => [pr.path, pr.mobilePath, pr.mobilePath2].filter(Boolean).map(resolvePrintSrc);

const OUTCOME_ICONS = ['circle-check', 'zap', 'scan-line', 'layers'];

const DISCIPLINE_ICONS = {
  backend: 'layers',
  frontend: 'file-text',
  designer: 'scan-line',
  database: 'box',
  tests: 'circle-check'
};

/* ---------------------------------------------------------------------------
 * Helpers de formatação / sanitização
 * ------------------------------------------------------------------------- */

/** Normaliza travessões ("—", "–", "--") para hífen simples. */
const normalizeDashes = (value) => String(value ?? '').replace(/\u2014|\u2013|--/g, '-');

/** Texto seguro para HTML (normaliza travessões + escapa caracteres especiais). */
const t = (value) => normalizeDashes(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const toNumber = (n) => (typeof n === 'number' && Number.isFinite(n) ? n : Number(n) || 0);

const brl = (n) => `R$ ${toNumber(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const num = (n) => toNumber(n).toLocaleString('pt-BR', { maximumFractionDigits: 3 });

const formatDate = (value) => {
  if (!value) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : t(value);
};

const addDays = (isoDate, days) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(isoDate || ''));
  if (!m || !days) return '';
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  d.setUTCDate(d.getUTCDate() + toNumber(days));
  return d.toISOString().slice(0, 10);
};

const joinPhases = (phases = []) => {
  if (!phases.length) return '';
  if (phases.length === 1) return `Fase ${phases[0]}`;
  return `Fases ${phases.slice(0, -1).join(', ')} e ${phases[phases.length - 1]}`;
};

/** Item já existente: sem custo (0 h / R$ 0,00) ou status explícito "existing". */
const isExisting = (item = {}) => item.status === 'existing'
  || item.scope === 'existing'
  || (!toNumber(item.hours) && !toNumber(item.price) && !toNumber(item.amount));

/** Marcos/itens substituídos não são exibidos. */
const isSuperseded = (item = {}) => {
  const status = String(item.status || '').toLowerCase();
  return item.superseded === true
    || item.replaced === true
    || Boolean(item.replacedBy || item.supersededBy)
    || ['superseded', 'replaced', 'substituido', 'substituído'].includes(status);
};

/* ---------------------------------------------------------------------------
 * Planilha por área (breakdown) - leitura tolerante de nomes de campos
 * ------------------------------------------------------------------------- */

const DEFAULT_AREAS = ['Backend', 'Frontend', 'Designer', 'Database', 'Testes'];

const AREA_LABELS = {
  backend: 'Backend', frontend: 'Frontend', designer: 'Designer', design: 'Designer',
  database: 'Database', db: 'Database', tests: 'Testes', testes: 'Testes', qa: 'Testes'
};

/** Primeiro valor numérico definido entre as chaves (aceita {hours} aninhado). */
const pickNum = (obj, keys) => {
  for (const k of keys) {
    let v = obj?.[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) v = v.hours ?? v.value;
    if (v !== undefined && v !== null && v !== '' && !Array.isArray(v)) return toNumber(v);
  }
  return undefined;
};

const pickText = (obj, keys) => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
};

const areaLabel = (row) => {
  const raw = pickText(row, ['label', 'area', 'name', 'discipline']);
  if (raw === undefined) return '-';
  return AREA_LABELS[String(raw).toLowerCase()] || raw;
};

/** Normaliza uma linha da planilha por área. */
const normalizeBreakdownRow = (row = {}, hourlyRate = 0) => {
  const fromScratch = pickNum(row, ['fromScratch', 'scratchHours', 'fromScratchHours', 'baseHours', 'base']) ?? 0;
  // reused pode vir negativo (horas subtraídas) ou positivo: exibido sempre como "-N h"
  const reused = Math.abs(pickNum(row, ['reused', 'reusedHours', 'reuse']) ?? 0);
  const adjustments = pickNum(row, ['adjustments', 'adjustmentHours', 'adjusted', 'adjust']) ?? 0;
  const hours = pickNum(row, ['hours', 'totalHours', 'finalHours']) ?? Math.max(0, fromScratch - reused + adjustments);
  const price = pickNum(row, ['price', 'value', 'amount']) ?? hours * toNumber(hourlyRate);
  const validation = pickText(row, ['validation', 'validationStatus', 'validated', 'status']);
  const note = pickText(row, ['note', 'notes']);
  return { area: areaLabel(row), fromScratch, reused, adjustments, hours, price, validation, note };
};

/** Linhas da planilha: breakdown explícito > disciplines > planilha zerada. */
const getBreakdownRows = (item = {}, hourlyRate = 0, fallbackAreas = DEFAULT_AREAS) => {
  const source = Array.isArray(item.breakdown) ? item.breakdown
    : Array.isArray(item.breakdown?.areas) ? item.breakdown.areas
    : Array.isArray(item.disciplines) ? item.disciplines
    : null;
  if (source && source.length) return source.map(r => normalizeBreakdownRow(r, hourlyRate));
  return fallbackAreas.map(area => ({ area, fromScratch: 0, reused: 0, adjustments: 0, hours: 0, price: 0 }));
};

const validationInfo = (value) => {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'object') {
    const label = value.label || value.status || value.by || '';
    return validationInfo(label || JSON.stringify(value));
  }
  if (value === true) return { label: 'Validado', tone: 'ok' };
  if (value === false) return { label: 'Pendente', tone: 'pending' };
  const text = String(value);
  const key = text.toLowerCase();
  if (/^\s*estimad[oa] pelo comercial\s*$/.test(key)) return { label: 'Validado', tone: 'ok' };
  if (/(^|\b)(validated|validado|aprovado|approved|ok|confirmado|confirmed)/.test(key)) return { label: text, tone: 'ok' };
  if (/(pending|pendente|aguardando|estimated|estimado|em valida|review|revis)/.test(key)) return { label: text, tone: 'pending' };
  if (/(rejected|reprovado|divergente|blocked|bloqueado)/.test(key)) return { label: text, tone: 'error' };
  return { label: text, tone: 'neutral' };
};

const validationBadge = (value) => {
  const info = validationInfo(value);
  if (!info) return '<span class="discipline-empty">-</span>';
  return `<span class="validation-badge validation-badge--${info.tone}">${t(info.label)}</span>`;
};

const formatShortRange = (start, end) => {
  if (!start && !end) return '';
  if (start && end) return `${formatDate(start)} a ${formatDate(end)}`;
  return formatDate(start || end);
};

/** Vencimento da parcela a partir de dueInDays (0 = na aprovação). */
const dueLabel = (days) => {
  const n = toNumber(days);
  if (n <= 0) return 'Na aprovação';
  return `${num(n)} dia${n === 1 ? '' : 's'} após aprovação`;
};

/** Remove o sufixo "(já existente)" do nome quando a badge já sinaliza o status. */
const stripExistingSuffix = (name) => String(name ?? '').replace(/\s*\(j[áa] existente\)\s*$/i, '');

/** Item de fora do escopo referente ao ERP do cliente (Protheus/ADVPL). */
const CLIENT_ERP_RE = /protheus|advpl/i;

/** Seletor dos alvos navegáveis do índice de tópicos. */
const TOC_TARGET_SELECTOR = '[data-toc-anchor]';

const existingBadge = (extra = '') => `<span class="prop-badge existing ${extra}" title="Funcionalidade já existente no sistema, sem custo nesta proposta">${lucide('circle-check', { size: 13, strokeWidth: 2 })}Já existente</span>`;

/* ---------------------------------------------------------------------------
 * View
 * ------------------------------------------------------------------------- */

export class PropostaView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.data = null;
    this.dataSignature = '';
    this.renderToken = 0;
    this.bindAutoRefresh();
  }

  /** Está montada na tela? (evita refetch quando outra rota está ativa) */
  isMounted() {
    return Boolean(this.container && this.container.querySelector('.view-proposta-wrapper'));
  }

  /**
   * Atualização dinâmica: ao voltar o foco para a aba, refaz o fetch do JSON e
   * re-renderiza somente se o conteúdo mudou (preservando a posição de rolagem).
   */
  bindAutoRefresh() {
    if (typeof document === 'undefined') return;
    const refresh = () => {
      if (document.visibilityState === 'visible' && this.isMounted()) this.refresh();
    };
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener('popstate', () => {
      if (!this.isMounted() || !this.data) return;
      const mode = this.getViewMode();
      const shown = this.container.querySelector('.view-proposta-wrapper')?.classList.contains('is-summary') ? 'resumido' : 'detalhado';
      if (mode === shown) return;
      this.container.innerHTML = this.renderShell(this.data, this.renderBody(this.data));
      this.bindEvents();
    });
  }

  async refresh() {
    if (this.refreshing) return;
    this.refreshing = true;
    try {
      const { data, signature } = await this.loadData();
      if (!this.isMounted() || signature === this.dataSignature) return;
      const scrollY = window.scrollY;
      this.data = data;
      this.dataSignature = signature;
      this.container.innerHTML = this.renderShell(data, this.renderBody(data));
      this.bindEvents();
      window.scrollTo(0, scrollY);
    } catch (err) {
      console.warn('[proposta] Falha ao atualizar dados da proposta:', err);
    } finally {
      this.refreshing = false;
    }
  }

  /** Renderização assíncrona: loading -> fetch do JSON -> proposta ou erro amigável. */
  async render() {
    if (!this.container) return;
    const token = ++this.renderToken;

    this.container.innerHTML = this.renderShell(null, this.renderLoading());
    this.bindEvents();

    try {
      const { data, signature } = await this.loadData();
      if (token !== this.renderToken) return;
      this.data = data;
      this.dataSignature = signature;
      this.container.innerHTML = this.renderShell(data, this.renderBody(data));
    } catch (err) {
      if (token !== this.renderToken) return;
      console.error('[proposta] Falha ao carregar dados da proposta:', err);
      this.container.innerHTML = this.renderShell(null, this.renderError());
    }
    this.bindEvents();
  }

  /** Exibe a versão (meta.version) na barra fixa do rodapé enquanto a rota é a proposta. */
  updateRibbonVersion(data) {
    const wrap = document.querySelector('[data-ribbon-version]');
    const text = document.querySelector('[data-ribbon-version-text]');
    if (!wrap || !text) return;
    const v = data?.meta?.version;
    text.textContent = v ? `Versão ${v}` : '';
    wrap.hidden = !v;
  }

  async loadData() {
    const url = `${PROPOSTA_DATA_URL}?t=${Date.now()}`;
    const res = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const signature = await res.text();
    const data = JSON.parse(signature);
    if (!data || typeof data !== 'object' || !data.meta) throw new Error('JSON da proposta inválido');
    this.updateRibbonVersion(data);
    return { data, signature };
  }

  /* ----------------------------- Estrutura geral ---------------------------- */

  /** Modo de visualização atual: lido da URL (?view=resumido|detalhado); padrão resumido (detalhado se não houver summaryView). */
  getViewMode(data = this.data) {
    if (!data?.summaryView || data.summaryView.enabled === false) return 'detalhado';
    const v = String(new URLSearchParams(window.location.search).get('view') || '').toLowerCase();
    return v === 'detalhado' ? 'detalhado' : 'resumido';
  }

  /** Conteúdo da folha conforme a visão selecionada. */
  renderBody(data) {
    return this.getViewMode(data) === 'resumido' ? this.renderSummary(data) : this.renderSheet(data);
  }

  /** Atualiza a URL preservando os demais parâmetros (route, etc.). */
  writeViewToUrl(mode) {
    const url = new URL(window.location.href);
    url.searchParams.set('view', mode);
    url.searchParams.delete('topico');
    history.replaceState(history.state, '', url.toString());
  }

  setViewMode(mode) {
    if (!this.data || mode === this.getViewMode()) return;
    this.writeViewToUrl(mode);
    this.closePrintLightbox?.();
    this.container.innerHTML = this.renderShell(this.data, this.renderBody(this.data));
    this.bindEvents();
    window.scrollTo(0, 0);
  }

  renderViewSwitch(data) {
    const sv = data?.summaryView;
    if (!sv || sv.enabled === false) return '';
    const mode = this.getViewMode(data);
    const opt = (key, label, icon) => `<button type="button" class="view-switch-btn" data-view-mode="${key}" aria-pressed="${mode === key ? 'true' : 'false'}" aria-label="${t(label)}" title="${t(label)}"><span class="view-switch-icon" aria-hidden="true">${lucide(icon, { size: 16, strokeWidth: 2.2 })}</span><span class="view-switch-text">${t(label)}</span></button>`;
    return `<div class="view-switch" role="group" aria-label="Modo de visualização da proposta">${opt('resumido', sv.label || 'Resumido', 'layout-list')}${opt('detalhado', sv.detailedLabel || 'Detalhado', 'file-text')}</div>`;
  }

  renderShell(data, content) {
    const id = data?.meta?.id ? t(data.meta.id) : '';
    const tag = id ? `Proposta Comercial ${id} · Alvenius` : 'Proposta Comercial · Alvenius';
    const summary = data ? this.getViewMode(data) === 'resumido' : false;
    return `
      <div class="view-proposta-wrapper ${summary ? 'is-summary' : ''}">
        <header class="proposal-action-bar no-print" role="region" aria-label="Ações Rápidas da Proposta">
          <div class="proposal-bar-left">
            <a class="proposal-bar-logo" href="./" data-bar-home title="Acessar demo app" aria-label="MaxCode42 - Acessar demo app">
              <picture>
                <source media="(max-width: 767px)" srcset="assets/icon-maxcode42.png" width="180" height="180">
                <img src="assets/logo-maxcode42-horizontal.png" alt="MaxCode42" class="proposal-bar-logo-img" width="800" height="227" decoding="async">
              </picture>
            </a>
            <span class="proposal-bar-divider" aria-hidden="true"></span>
            <span class="proposal-bar-tag" title="${tag}">
              ${lucide('file-text', { size: 14, strokeWidth: 2 })}
              <span class="proposal-bar-tag-text">${tag}</span>
            </span>
          </div>
          <div class="proposal-bar-right">
            <a class="proposal-bar-link" id="btn-back-menu" href="./" data-bar-home title="Acessar demo app" aria-label="Acessar demo app"><span class="proposal-bar-link-text">Acessar demo app</span><span class="proposal-bar-link-icon" aria-hidden="true">${lucide('external-link', { size: 16, strokeWidth: 2.2 })}</span></a>
            ${this.renderViewSwitch(data)}
            <button class="btn-save-pdf" id="btn-save-pdf" title="Gerar e salvar proposta em formato PDF A4" aria-label="Salvar Proposta em PDF" ${data ? '' : 'disabled'}>
              ${lucide('printer', { size: 18, strokeWidth: 2 })}
              <span class="btn-label-full">Salvar Proposta em PDF</span>
              <span class="btn-label-short" aria-hidden="true">Salvar PDF</span>
            </button>
          </div>
        </header>

        ${data && !summary ? '<nav class="proposal-toc-bar no-print" aria-label="Tópicos da proposta" data-toc-slot="bar"></nav>' : ''}

        <div class="proposal-layout">
          ${data && !summary ? '<nav class="proposal-toc no-print" aria-label="Tópicos da proposta" data-toc-slot="side"></nav>' : ''}
          <main class="proposal-container">
            ${content}
          </main>
        </div>

        ${data && !summary ? '<div class="proposal-toc-overlays no-print" data-toc-slot="overlays"></div>' : ''}

        ${data ? `
          <div class="demo-print-watermark print-only" aria-hidden="true">
            <span class="demo-print-watermark__line">${id} · Versão ${t(data.meta.version)}</span>
            <span class="demo-print-watermark__brand"><img src="assets/logo-maxcode42-horizontal.png" alt="" class="demo-print-watermark__logo" decoding="async"></span>
          </div>
          <div class="demo-print-footer print-only" aria-hidden="true">
            Ambiente de demonstração · Proposta comercial ${id} · v${t(data.meta.version)} · MAXCODE42 → Alvenius
          </div>
        ` : ''}
      </div>
    `;
  }

  renderLoading() {
    return `
      <div class="proposal-sheet proposal-state" role="status" aria-live="polite" aria-busy="true">
        <span class="proposal-state-spinner" aria-hidden="true"></span>
        <p class="proposal-state-title">Carregando proposta comercial...</p>
      </div>
    `;
  }

  renderError() {
    return `
      <div class="proposal-sheet proposal-state proposal-state--error" role="alert">
        ${lucide('circle-alert', { size: 32, strokeWidth: 2 })}
        <p class="proposal-state-title">Não foi possível carregar a proposta.</p>
        <p class="proposal-state-desc">Verifique sua conexão e tente novamente. Se o problema persistir, contate o responsável comercial.</p>
        <button type="button" class="btn-save-pdf" id="btn-retry-proposta">Tentar novamente</button>
      </div>
    `;
  }

  /* --------------------------- Visão Resumida (summaryView) --------------------------- */

  /** Visão objetiva para decisão: seções de `summaryView.sections[]` (ordem do JSON), valores derivados dos campos referenciados. */
  renderSummary(d) {
    const sv = d.summaryView || {};
    const meta = d.meta || {};
    const client = d.client || {};
    const ctx = {
      d, meta,
      inv: d.investment || {},
      phases: (Array.isArray(d.investment?.phases) ? d.investment.phases : []).filter(p => !isSuperseded(p))
    };
    const sections = [...(Array.isArray(sv.sections) ? sv.sections : [])].sort((a, b) => toNumber(a.order) - toNumber(b.order));
    const body = sections.map((s, i) => {
      const fn = this[`renderSum_${s.id}`];
      const html = typeof fn === 'function' ? fn.call(this, s, ctx) : '';
      if (!html) return '';
      return `
        <section class="proposal-section sum-section sum-section--${t(s.id)}" id="resumo-${t(s.id)}" aria-labelledby="resumo-${t(s.id)}-title">
          <div class="proposal-section-header">
            <span class="proposal-section-num">${i + 1}</span>
            <h2 id="resumo-${t(s.id)}-title">${t(s.title)}</h2>
          </div>
          ${html}
        </section>
      `;
    }).join('');

    return `
      <article class="proposal-sheet proposal-sheet--summary">
        <header class="sum-hero">
          <span class="sum-hero-kicker">${t(sv.label || 'Resumido')} · Proposta Comercial</span>
          <h1 tabindex="-1">${t(meta.title)}</h1>
          <p class="sum-hero-meta">
            ${client.name ? `<span>${t(client.name)}</span>` : ''}
            ${meta.id ? `<span>${t(meta.id)}${meta.version ? ` · v${t(meta.version)}` : ''}</span>` : ''}
            ${meta.issuedAt ? `<span>Emitida em ${formatDate(meta.issuedAt)}</span>` : ''}
          </p>
        </header>
        <aside class="sum-callout" role="note" aria-label="Sobre a versão resumida">
          <span class="sum-callout-icon" aria-hidden="true">${lucide('info', { size: 18, strokeWidth: 2 })}</span>
          <p class="sum-callout-text">Esta é a versão resumida da proposta. Consulte a versão Detalhada para ver o escopo por funcionalidade, horas, cálculo do investimento, planilhas e cronograma completos.</p>
          <button type="button" class="sum-callout-btn no-print" data-view-mode="detalhado">${lucide('file-text', { size: 15, strokeWidth: 2 })}<span>Ver versão detalhada</span></button>
        </aside>
        ${body}
        ${this.renderSummaryFooter(d)}
      </article>
    `;
  }

  /** Iniciais (até 2 letras) para o avatar de fallback. */
  initialsOf(name = '') {
    const parts = String(name).replace(/[^\p{L}\s]/gu, ' ').split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    return ((parts[0][0] || '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }

  /** Avatar circular: usa `photo` (URL/caminho do JSON) se existir; senão, iniciais. */
  renderPersonAvatar(name, photo) {
    const safe = t(name);
    return `
      <span class="sum-avatar" role="img" aria-label="${photo ? `Foto de ${safe}` : safe}">
        <span class="sum-avatar-fallback" aria-hidden="true">${t(this.initialsOf(name))}</span>
        ${photo ? `<img class="sum-avatar-img" src="${t(photo)}" alt="" referrerpolicy="no-referrer" decoding="async">` : ''}
      </span>
    `;
  }

  /** Rodapé da visão Resumida: logo MaxCode42 + cartões do desenvolvedor e do cliente (dados do JSON). */
  renderSummaryFooter(d) {
    const proponent = d.proponent || {};
    const resp = proponent.responsible || {};
    const client = d.client || {};
    const clientPerson = client.responsible || client.contact || {};
    const link = (url, label) => (url ? `<a href="${t(url)}" target="_blank" rel="noopener noreferrer">${t(label)}</a>` : t(label));
    const contact = (o = {}) => [
      o.email ? `<a href="mailto:${t(o.email)}">${t(o.email)}</a>` : '',
      o.phone ? `<a href="tel:${t(String(o.phone).replace(/[^\d+]/g, ''))}">${t(o.phone)}</a>` : ''
    ].filter(Boolean).join('');
    const devName = resp.name || proponent.name;
    const devContact = contact(resp) + contact(proponent);
    const clientPhoto = clientPerson.photo || client.photo || '';
    const clientContact = contact(clientPerson) + contact(client);

    return `
      <footer class="sum-footer" aria-label="MaxCode42 e contatos">
        <div class="sum-footer-brand">
          <img src="assets/logo-maxcode42-horizontal.png" alt="MaxCode42" class="sum-footer-logo" width="800" height="227" decoding="async">
          ${proponent.slogan ? `<p class="sum-footer-slogan">${t(proponent.slogan)}</p>` : ''}
        </div>
        <div class="sum-footer-cards">
          ${devName ? `
            <section class="sum-person-card" aria-label="Desenvolvedor">
              <span class="sum-person-kicker">Desenvolvedor</span>
              <div class="sum-person-main">
                ${this.renderDevAvatar(devName, 'dev-avatar--lg')}
                <div class="sum-person-info">
                  <strong class="sum-person-name">${link(resp.url, devName)}</strong>
                  ${resp.role ? `<span class="sum-person-role">${t(resp.role)}</span>` : ''}
                  ${proponent.name ? `<span class="sum-person-org">${link(proponent.url, proponent.name)}</span>` : ''}
                  ${devContact ? `<span class="sum-person-contact">${devContact}</span>` : ''}
                </div>
              </div>
            </section>` : ''}
          ${client.name ? `
            <section class="sum-person-card" aria-label="Cliente">
              <span class="sum-person-kicker">Cliente</span>
              <div class="sum-person-main">
                <img src="assets/logo-alvenius-rings-clean.png" alt="" class="sum-client-logo" width="56" height="56" decoding="async">
                <div class="sum-person-info">
                  <strong class="sum-person-name">${link(client.url, client.name)}</strong>
                  ${clientPerson.name ? `
                    <span class="sum-person-contact-person">
                      ${this.renderPersonAvatar(clientPerson.name, clientPhoto)}
                      <span><strong>${t(clientPerson.name)}</strong>${clientPerson.role ? `<br>${t(clientPerson.role)}` : ''}</span>
                    </span>` : ''}
                  ${clientContact ? `<span class="sum-person-contact">${clientContact}</span>` : ''}
                </div>
              </div>
            </section>` : ''}
        </div>
      </footer>
    `;
  }

  renderSum_valueProposition(s) {
    if (!s.headline && !s.text) return '';
    return `
      <div class="sum-value">
        ${s.headline ? `<p class="sum-headline">${t(s.headline)}</p>` : ''}
        ${s.text ? `<p class="sum-text">${t(s.text)}</p>` : ''}
      </div>
    `;
  }

  renderSum_deliverables(s, ctx) {
    const items = Array.isArray(s.items) ? s.items : [];
    if (!items.length) return '';
    return `
      <ul class="sum-deliverables">
        ${items.map(it => {
          const p = ctx.phases.find(x => toNumber(x.phase) === toNumber(it.phase));
          return `
            <li class="sum-deliverable">
              <span class="sum-phase">Fase ${t(it.phase)}</span>
              <span class="sum-deliverable-text">${t(it.text || p?.name || '')}</span>
              ${p ? `<span class="prop-badge prop-badge--hours"><span class="sr-only-inline">Horas: </span>${num(p.hours)} h</span><span class="prop-badge price prop-badge--price"><span class="sr-only-inline">Valor: </span>${brl(p.price)}</span>` : ''}
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  renderSum_investment(s, ctx) {
    const totals = ctx.inv.totals;
    if (!totals) return '';
    return `
      <div class="sum-invest">
        ${ctx.meta.hourlyRate ? `
          <div class="sum-invest-rate">
            <span class="sum-invest-label">Valor/hora</span>
            <strong class="sum-invest-rate-value">${brl(ctx.meta.hourlyRate)}</strong>
          </div>` : ''}
        <div class="sum-invest-cols">
          <div class="sum-invest-col sum-invest-col--hours">
            <span class="sum-invest-label">Horas</span>
            <strong class="sum-invest-value">${num(totals.hours)} h</strong>
          </div>
          <div class="sum-invest-col sum-invest-col--price">
            <span class="sum-invest-label">Valor total</span>
            <strong class="sum-invest-value">${brl(totals.price)}</strong>
          </div>
        </div>
      </div>
    `;
  }

  renderSum_schedule(s, ctx) {
    const totals = ctx.inv.totals || {};
    const sprints = (Array.isArray(ctx.inv.sprints) ? ctx.inv.sprints : [])
      .filter(sp => sp.startDate && sp.endDate && toNumber(sp.businessDays) > 0)
      .sort((a, b) => toNumber(a.sprint) - toNumber(b.sprint));
    const start = ctx.meta.startDate || sprints[0]?.startDate;
    const end = sprints.length ? sprints[sprints.length - 1].endDate : '';
    if (!start && !end) return '';
    const weeks = toNumber(totals.approxWeeks);
    return `
      <p class="sum-schedule-line">
        <strong>${formatDate(start)}</strong>${end ? ` <span aria-hidden="true">→</span><span class="sr-only-inline"> até </span> <strong>${formatDate(end)}</strong>` : ''}
        ${totals.businessDays ? `<span class="sum-schedule-sub">${num(totals.businessDays)} dias úteis${weeks ? ` (~${num(weeks)} semana${weeks > 1 ? 's' : ''})` : ''}</span>` : ''}
      </p>
      ${sprints.length ? `
        <h3 class="sum-subhead">A entregar</h3>
        <ol class="sum-timeline" aria-label="Linha do tempo das sprints a entregar">
          ${sprints.map(sp => `
            <li class="sum-timeline-item">
              <span class="sum-timeline-name">Sprint ${t(sp.sprint)}</span>
              <span class="sum-timeline-phase">${t(joinPhases(sp.phases || []))}</span>
              <span class="sum-timeline-date">${formatShortRange(sp.startDate, sp.endDate)}</span>
            </li>
          `).join('')}
        </ol>
      ` : ''}
      ${this.renderSumDeliveredSprints(ctx)}
    `;
  }

  /** Sprints já entregues (sem esforço/datas e só com fases existentes): derivadas dos dados de sprints e fases. */
  renderSumDeliveredSprints(ctx) {
    const done = (Array.isArray(ctx.inv.sprints) ? ctx.inv.sprints : [])
      .filter(sp => !(sp.startDate && sp.endDate && toNumber(sp.businessDays) > 0))
      .map(sp => {
        const ps = (sp.phases || []).map(n => ctx.phases.find(p => toNumber(p.phase) === toNumber(n))).filter(Boolean);
        return { sp, ps };
      })
      .filter(({ sp, ps }) => !toNumber(sp.businessDays) && ps.length && ps.every(p => isExisting(p)))
      .sort((a, b) => toNumber(a.sp.sprint) - toNumber(b.sp.sprint));
    if (!done.length) return '';
    return `
      <h3 class="sum-subhead sum-subhead--done">${lucide('circle-check', { size: 14, strokeWidth: 2.4 })}Já entregues</h3>
      <ul class="sum-done-list" aria-label="Sprints já entregues">
        ${done.map(({ sp, ps }) => {
          const hours = ps.reduce((a, p) => a + toNumber(p.hours), 0);
          const price = ps.reduce((a, p) => a + toNumber(p.price), 0);
          return `
            <li class="sum-done-item">
              <span class="sum-done-icon" aria-hidden="true">${lucide('circle-check', { size: 16, strokeWidth: 2.4 })}</span>
              <span class="sum-done-text">
                <strong>Sprint ${t(sp.sprint)}</strong>
                <span>${t(joinPhases(sp.phases || []))}</span>
                <span class="sum-done-status">Concluída · ${num(hours)} h / ${brl(price)}</span>
              </span>
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  renderSum_payment(s, ctx) {
    const list = (Array.isArray(ctx.inv.payment) ? ctx.inv.payment : [])
      .filter(p => p.scope === 'new-features' && !isSuperseded(p));
    if (!list.length) return '';
    return `
      <div class="sum-payment-grid">
        ${list.map(p => `
          <div class="sum-payment-card">
            <span class="sum-payment-percent">${num(p.percent)}%</span>
            <span class="sum-payment-name">${t(p.milestone)}</span>
            <strong class="sum-payment-amount">${brl(p.amount)}</strong>
            <span class="sum-payment-due">${p.dueDate ? `Vencimento: ${formatDate(p.dueDate)}` : (p.dueInDays !== undefined ? dueLabel(p.dueInDays) : '')}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderSum_reuse(s, ctx) {
    const base = ctx.phases.filter(p => toNumber(p.phase) <= 6);
    const nums = base.map(p => toNumber(p.phase));
    const range = nums.length ? (Math.min(...nums) === Math.max(...nums) ? `Fase ${Math.min(...nums)}` : `Fases ${Math.min(...nums)}-${Math.max(...nums)}`) : '';
    const hours = base.reduce((a, p) => a + toNumber(p.hours), 0);
    const price = base.reduce((a, p) => a + toNumber(p.price), 0);
    return `
      ${s.text ? `<p class="sum-text">${t(s.text)}</p>` : ''}
      ${range ? `<p class="sum-seal"><span class="feature-delivered-badge">${lucide('circle-check', { size: 12, strokeWidth: 2.4 })}${t(range)}: ${num(hours)} h / ${brl(price)}</span></p>` : ''}
      ${ctx.meta.pricingNote ? `<p class="sum-note">${t(ctx.meta.pricingNote)}</p>` : ''}
    `;
  }

  renderSum_assumptions(s, ctx) {
    const all = Array.isArray(ctx.d.assumptions) ? ctx.d.assumptions : [];
    const picked = (Array.isArray(s.include) ? s.include : all.map((_, i) => i)).map(i => all[i]).filter(Boolean);
    if (!picked.length) return '';
    return `<ul class="sum-list">${picked.map(a => `<li>${t(a)}</li>`).join('')}</ul>`;
  }

  renderSum_outOfScope(s, ctx) {
    const notice = ctx.d.outOfScopeNotice || {};
    const list = Array.isArray(ctx.d.outOfScope) ? ctx.d.outOfScope : [];
    if (!notice.label && !notice.text && !list.length) return '';
    return `
      <div class="sum-oos">
        ${notice.label ? `<p class="sum-oos-label">${t(notice.label)}</p>` : ''}
        ${notice.text ? `<p class="sum-text">${t(notice.text)}</p>` : ''}
        ${list.length ? `<ul class="sum-list sum-list--oos">${list.map(i => `<li>${t(i)}</li>`).join('')}</ul>` : ''}
      </div>
    `;
  }

  renderSum_warranty(s, ctx) {
    const w = ctx.d.postDelivery?.warranty;
    if (!w) return '';
    const rate = ctx.d.postDelivery?.newRequests?.hourlyRate;
    return `
      <p class="sum-text">
        <strong>${num(w.days)} dias</strong> de garantia${w.coverage ? `: ${t(w.coverage).replace(/\.$/, '')}.` : '.'}
        ${rate ? ` Novas solicitações a <strong>${brl(rate)}/h</strong>, com aprovação prévia.` : ''}
      </p>
    `;
  }

  renderSum_nextSteps(s, ctx) {
    const items = Array.isArray(s.items) ? s.items : [];
    const meta = ctx.meta;
    const proponent = ctx.d.proponent || {};
    const resp = proponent.responsible || {};
    const validUntil = addDays(meta.issuedAt, meta.validityDays);
    const link = (url, label) => (url ? `<a href="${t(url)}" target="_blank" rel="noopener noreferrer">${t(label)}</a>` : t(label));
    return `
      ${items.length ? `<ol class="sum-steps">${items.map(i => `<li>${t(i)}</li>`).join('')}</ol>` : ''}
      ${meta.validityDays ? `<p class="sum-validity">Proposta válida por <strong>${num(meta.validityDays)} dias</strong>${meta.issuedAt ? ` (emitida em ${formatDate(meta.issuedAt)}${validUntil ? `, até ${formatDate(validUntil)}` : ''})` : ''}.</p>` : ''}
      ${resp.name || proponent.name ? `
        <p class="sum-contact">
          ${resp.name ? `<span><strong>${link(resp.url, resp.name)}</strong>${resp.role ? ` · ${t(resp.role)}` : ''}</span>` : ''}
          ${proponent.name ? `<span>${link(proponent.url, proponent.name)}</span>` : ''}
        </p>
      ` : ''}
    `;
  }

  renderSheet(d) {
    const meta = d.meta || {};
    const proponent = d.proponent || {};
    const responsible = proponent.responsible || {};
    const client = d.client || {};
    const summary = d.executiveSummary || {};
    const features = Array.isArray(d.features) ? d.features : [];
    this.deliveryPhase = this.resolveDeliveryPhase(d);
    const validUntil = addDays(meta.issuedAt, meta.validityDays);
    const withAreas = features.find(f => Array.isArray(f.breakdown) || Array.isArray(f.disciplines));
    this.areaNames = withAreas
      ? getBreakdownRows(withAreas, meta.hourlyRate).map(r => r.area)
      : DEFAULT_AREAS;
    const issuedYear = /^(\d{4})/.exec(String(meta.issuedAt || ''))?.[1] || '';
    // Intervalo das fases desta proposta (novas): funcionalidades novas + fases de investimento não existentes.
    const invPhaseList = (Array.isArray(d.investment?.phases) ? d.investment.phases : []).filter(p => !isSuperseded(p));
    const phaseNums = [
      ...features.filter(f => !isExisting(f)).map(f => f.phase),
      ...invPhaseList.filter(p => !isExisting(p)).map(p => p.phase)
    ].map(Number).filter(n => Number.isFinite(n));
    const phaseRange = phaseNums.length
      ? ` (${Math.min(...phaseNums) === Math.max(...phaseNums) ? `Fase ${Math.min(...phaseNums)}` : `Fases ${Math.min(...phaseNums)} a ${Math.max(...phaseNums)}`})`
      : '';

    return `
      <article class="proposal-sheet">

        <aside class="proposal-scope-notice no-print" role="note">
          ${lucide('info', { size: 20, strokeWidth: 2, className: 'flex-shrink-0' })}
          <div>
            <strong>Nota de Escopo:</strong> Esta página interna é um utilitário de visualização e apoio comercial interno do sistema.
            Não faz parte do escopo técnico faturável nem dos entregáveis contratados do projeto Alvenius.
            Seu conteúdo é carregado da proposta oficial mantida pelo comercial.
          </div>
        </aside>

        <!-- BLOCO 1: Cabeçalho Executivo -->
        <section class="proposal-header" id="topico-apresentacao" tabindex="-1">
          <div class="proposal-header-brands">
            <div class="brand-alvenius-box">
              <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius Tubos e Conexões" class="brand-alvenius-logo">
              <div class="brand-alvenius-info">
                <h2>${t(client.name)}</h2>
                <p>${t(client.about)}</p>
              </div>
            </div>

            <div class="brand-versus-divider">em parceria com</div>

            <div class="brand-maxcode-box">
              <img src="assets/icon-maxcode42.png" alt="MAXCODE42" class="brand-maxcode-icon" width="180" height="180">
              <div class="brand-maxcode-info">
                <div class="brand-maxcode-title">
                  <span class="brand-maxcode-name">${t(proponent.name)}</span>
                  <span class="brand-maxcode-badge">Software House</span>
                </div>
                <div class="brand-maxcode-slogan">${t(proponent.slogan)}</div>
              </div>
            </div>
          </div>

          <div class="proposal-main-title-box">
            <h1 tabindex="-1">${t(meta.title)}</h1>
            <p>Proposta Comercial de Engenharia de Software e Rastreabilidade Fabril</p>
            ${this.renderSeeInvestment(d)}
          </div>

          <div class="proposal-meta-grid">
            <div class="proposal-meta-card">
              <div class="proposal-meta-label">Identificador / Versão</div>
              <div class="proposal-meta-value highlight">${t(meta.id)} · v${t(meta.version)}</div>
            </div>
            <div class="proposal-meta-card">
              <div class="proposal-meta-label">Data de Emissão${meta.startDate ? ' / Início' : ''}</div>
              <div class="proposal-meta-value">${formatDate(meta.issuedAt)}${meta.startDate ? `<span class="proposal-meta-sub">Início do projeto: ${formatDate(meta.startDate)}</span>` : ''}</div>
            </div>
            <div class="proposal-meta-card">
              <div class="proposal-meta-label">Prazo de Validade</div>
              <div class="proposal-meta-value">${num(meta.validityDays)} dias corridos${validUntil ? `<span class="proposal-meta-sub">até ${formatDate(validUntil)}</span>` : ''}</div>
            </div>
            <div class="proposal-meta-card">
              <div class="proposal-meta-label">Responsável Técnico</div>
              <div class="proposal-meta-value proposal-meta-person">
                ${this.renderDevAvatar(responsible.name, 'dev-avatar--sm')}
                <span>${t(responsible.name)}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- BLOCO 2: Sumário Executivo -->
        <section class="proposal-section" id="topico-sumario" tabindex="-1">
          <div class="proposal-section-header">
            <span class="proposal-section-num">1</span>
            <h2>Sumário Executivo & Metas de Negócio</h2>
          </div>

          <p class="proposal-context-text">${t(summary.context)}</p>

          <div class="proposal-goals-grid">
            ${(summary.outcomes || []).map((goal, i) => this.renderOutcome(goal, i)).join('')}
          </div>
        </section>

        <!-- BLOCO 3: Apresentação MAXCODE42 -->
        <section class="proposal-section" id="topico-maxcode42" tabindex="-1">
          <div class="proposal-section-header">
            <span class="proposal-section-num">2</span>
            <h2>Apresentação MAXCODE42 & Engenharia</h2>
          </div>

          <div class="maxcode-intro-banner">
            ${this.renderMaxcodeLogo('brand-maxcode-logo-plate--banner')}
            <p class="maxcode-intro-slogan">${t(proponent.slogan)}</p>
          </div>

          <div class="metrics-grid">
            ${(proponent.stats || []).map(s => `
              <div class="metric-card">
                <div class="metric-number">${t(s.value)}</div>
                <div class="metric-label">${t(s.label)}</div>
              </div>
            `).join('')}
          </div>

          <div class="maxcode-pillars-box">
            <div class="pillars-title">Nossos ${(proponent.pillars || []).length} Pilares Fundamentais:</div>
            <div class="pillars-list">
              ${(proponent.pillars || []).map(p => `<span class="pillar-badge">${t(p)}</span>`).join('')}
            </div>

            <div class="pillars-title" style="margin-top: 14px;">Arquitetura & Boas Práticas Adotadas:</div>
            <div class="engineering-tags-box">
              ${(proponent.engineering || []).map(eng => `
                <span class="engineering-tag">
                  ${lucide('check', { size: 14, strokeWidth: 2.2, stroke: '#12B76A' })}
                  ${t(eng)}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="lead-profile-card">
            ${this.renderDevAvatar(responsible.name, 'dev-avatar--lg')}
            <div class="lead-info-text">
              <h4>${t(responsible.name)} - <span style="font-weight: 500; color: #1E3A8A;">${t(responsible.role)}</span></h4>
              <p>${t(responsible.bio)}</p>
            </div>
          </div>
        </section>

        <!-- BLOCO 4: Catálogo das Funcionalidades -->
        <section class="proposal-section">
          <div class="proposal-section-header">
            <span class="proposal-section-num">3</span>
            <h2>Catálogo de Funcionalidades${phaseRange}</h2>
          </div>

          <div class="methodology-box" id="topico-metodologia" tabindex="-1">
            <h4>Metodologia Multidisciplinar de Estimativa & Matriz de Correlação</h4>
            <p>
              Cada funcionalidade é decomposta em 5 frentes técnicas essenciais:
              <strong>Backend</strong>, <strong>Frontend</strong>, <strong>Designer UX/UI</strong>, <strong>Database</strong> e <strong>Testes</strong>.
              A precificação respeita a taxa hora de <strong>${brl(meta.hourlyRate)}</strong> (jornada de ${num(meta.hoursPerBusinessDay)}h/dia útil),
              descontando horas reaproveitadas e somando horas de ajuste em componentes existentes.
            </p>
            ${meta.pricingNote ? `<p class="methodology-note">${lucide('info', { size: 14, strokeWidth: 2 })}<span>${t(meta.pricingNote)}</span></p>` : ''}
          </div>

          <section class="calc-legend" id="legenda-calculo" aria-labelledby="legenda-calculo-titulo">
            <h4 id="legenda-calculo-titulo">Como calculamos horas e valor</h4>
            <p class="calc-legend-intro">O sistema atual (fases 1 a 6) já está pronto e funcional. Cobramos <strong>apenas o que é novo</strong>, reaproveitando o que já existe.</p>
            <div class="calc-legend-formula" role="group" aria-label="Fórmulas de cálculo">
              <p><span class="calc-chip">Horas</span> = Do zero − Reaproveitado + Ajustes</p>
              <p><span class="calc-chip">Valor R$</span> = Horas × ${brl(meta.hourlyRate)} <small>(valor/hora)</small></p>
            </div>
            <dl class="calc-legend-terms">
              <div><dt>Do zero</dt><dd>Horas que a área levaria para construir a entrega sem nenhuma base existente.</dd></div>
              <div><dt>Reaproveitado (−)</dt><dd>Horas economizadas por já existirem telas, componentes, rotas, login e padrões no sistema atual.</dd></div>
              <div><dt>Ajustes (+)</dt><dd>Horas para adaptar o que foi reaproveitado ao novo caso.</dd></div>
              <div><dt>Testes</dt><dd>Limitados a 1 h por fase (smoke test), conforme aviso FORA DO ESCOPO.</dd></div>
              <div><dt>Validado</dt><dd>Estimativa conferida pelo comercial com apoio dos times técnicos.</dd></div>
            </dl>
            <p class="calc-legend-example"><strong>Exemplo (Backend, Fase 7):</strong> 9 h − 3 h + 2 h = <strong>8 h</strong> → 8 × ${brl(meta.hourlyRate)} = <strong>${brl(8 * (Number(meta.hourlyRate) || 0))}</strong></p>
          </section>

          <p class="validation-legend" id="legenda-validacao">
            <span class="validation-badge validation-badge--ok">Validado</span>
            <span><strong>Validação:</strong> Validado = estimativa de horas e valor validada pelo comercial com o apoio dos times de backend, frontend e designer.</span>
          </p>

          ${this.renderEstimationMethod(d)}

          <div data-collapsible-scope>
          ${this.renderCollapseToolbar('Expandir ou recolher funcionalidades')}

          <div class="features-list" data-collapsible-list>
            ${(() => {
              const done = features.filter(f => isExisting(f));
              const fresh = features.filter(f => !isExisting(f));
              const nums = [...done.map(f => f.phase), ...((d.investment?.phases || []).filter(isExisting).map(p => p.phase))];
              const group = done.length ? `
                <div class="delivered-group ${this.deliveredExpanded ? '' : 'is-group-collapsed'}" data-delivered-group>
                  ${this.renderDeliveredToggle('delivered-features-body', this.deliveredGroupLabel(nums), { price: brl(0), range: this.deliveredRange(nums) })}
                  <div class="delivered-group-body" id="delivered-features-body" data-delivered-body>
                    ${done.map(f => this.renderFeatureCard(f, meta)).join('')}
                  </div>
                </div>` : '';
              return group + fresh.map(f => this.renderFeatureCard(f, meta)).join('');
            })()}
            ${this.renderDeliveryPhaseCard(d)}
          </div>
          </div>
        </section>

        <!-- BLOCO 5: Investimento & Cronograma -->
        ${this.renderInvestment(d.investment || {}, d)}

        <!-- BLOCO 6: Garantia, Suporte e Novas Demandas -->
        ${this.renderPostDelivery(d)}

        <!-- BLOCO 7: Aceite e Assinaturas -->
        <section class="signatures-box" id="topico-aceite" tabindex="-1" aria-label="Aceite Formal da Proposta Comercial">
          <div class="signatures-title">Aceite Formal da Proposta Comercial</div>

          <div class="signatures-grid">
            ${this.renderSignatureCard({
              party: `<div class="signature-party">${t(client.name)} (Contratante)</div>`,
              name: '',
              dateLabel: 'Data de Aceite',
              date: `<span class="signature-date-blank" aria-label="Data de aceite a preencher"><span class="signature-date-slot"></span>/<span class="signature-date-slot"></span>/ ${t(issuedYear) || '<span class="signature-date-slot"></span>'}</span>`
            })}
            ${this.renderSignatureCard({
              party: `<div class="signature-party signature-party--logo">${this.renderMaxcodeLogo('brand-maxcode-logo-plate--sm')}<span>(Proponente)</span></div>`,
              name: `<strong>${t(responsible.name)}</strong> · ${t(responsible.role)}`,
              dateLabel: 'Data de Emissão',
              date: formatDate(meta.issuedAt)
            })}
          </div>

          <footer class="proposal-footer" id="topico-contato" tabindex="-1">
            <div class="proposal-footer-brand">
              <span class="brand-maxcode-logo-plate brand-maxcode-logo-plate--footer">
                <img src="assets/logo-maxcode42-stacked.png" alt="MAXCODE42" class="brand-maxcode-logo brand-maxcode-logo--stacked" width="800" height="550" decoding="async">
              </span>
            </div>
            <div>Construindo seu software com transparência e excelência técnica</div>
            <div style="margin-top: 4px;">
              <a href="${t(proponent.url)}" target="_blank" rel="noopener noreferrer">${t(proponent.url)}</a> ·
              <a href="${t(responsible.url)}" target="_blank" rel="noopener noreferrer">${t(responsible.name)}</a>
            </div>
          </footer>
        </section>

      </article>
    `;
  }

  /** Card de assinatura com estrutura fixa (5 linhas alinhadas entre colunas via subgrid). */
  renderSignatureCard({ party, name, dateLabel, date }) {
    const field = (label, value) => `
      <div class="signature-row">
        <div class="signature-label">${label}:</div>
        <div class="signature-field ${value ? '' : 'is-blank'}"><span class="signature-value">${value || '&nbsp;'}</span></div>
      </div>
    `;
    return `
      <div class="signature-card">
        <div class="signature-party-row">${party}</div>
        <div class="signature-line" aria-hidden="true"></div>
        ${field('Nome do Responsável / Cargo', name)}
        ${field(dateLabel, date)}
        ${field('Assinatura', '')}
      </div>
    `;
  }

    renderOutcome(goal, index) {
    let title = '';
    let desc = '';
    if (goal && typeof goal === 'object') {
      title = goal.title || '';
      desc = goal.desc || goal.description || '';
    } else {
      const text = String(goal ?? '');
      const sep = text.indexOf(':');
      title = sep > 0 ? text.slice(0, sep) : text;
      desc = sep > 0 ? text.slice(sep + 1).trim() : '';
    }
    const icon = (goal && goal.icon) || OUTCOME_ICONS[index % OUTCOME_ICONS.length];
    return `
      <div class="proposal-goal-card">
        <div class="goal-card-icon">${lucide(icon, { size: 24, strokeWidth: 2 })}</div>
        <div class="goal-card-title">${t(title)}</div>
        ${desc ? `<p class="goal-card-desc">${t(desc)}</p>` : ''}
      </div>
    `;
  }

  /* ------------------------------ Funcionalidades --------------------------- */

  renderFeatureCard(feature, meta) {
    const existing = isExisting(feature);
    const allPrints = Array.isArray(feature.prints) ? feature.prints.filter(pr => pr && getPrintViews(pr).length) : [];
    const included = this.resolveIncludedItems(feature, allPrints);
    const includedPrints = new Set(included.flatMap(item => item.prints));
    const prints = allPrints.filter(pr => !includedPrints.has(pr));
    const printedSrcs = new Set(allPrints.flatMap(printPaths));
    // Visuais já cobertos por um print anotado não são repetidos (fica só o que está pendente).
    const visuals = (Array.isArray(feature.visuals) ? feature.visuals : [])
      .filter(v => !(v.src && printedSrcs.has(resolvePrintSrc(v.src))))
      // Regra defensiva: feature já existente nunca exibe placeholder "pendente" (só visuais reais).
      .filter(v => !existing || v.src);
    const fid = t(feature.id);
    // Estado de expansão: escolha do usuário (mantida no refetch) ou padrão (existente recolhido, nova expandida).
    const expanded = this.isCollapsibleExpanded(fid, existing);
    const assumptions = [
      ...(feature.assumption ? [feature.assumption] : []),
      ...(Array.isArray(feature.assumptions) ? feature.assumptions : [])
    ];

    return `
      <article class="proposal-feature-card ${existing ? 'is-existing' : 'is-new'} ${expanded ? '' : 'is-collapsed'}" id="card-${fid}" ${existing ? 'aria-disabled="true"' : ''} tabindex="-1" data-feature-card="${fid}">
        <header class="feature-card-header" data-feature-toggle-area>
          <div class="feature-header-left">
            <span class="feature-phase-badge">Fase ${t(feature.phase)}</span>
            ${this.renderStatusSeal(existing)}
            <h3 class="feature-title" id="feature-title-${fid}">${t(existing ? stripExistingSuffix(feature.title) : feature.title)}</h3>
          </div>
          <div class="feature-metrics-badges">
            ${existing ? `
              <span class="prop-badge prop-badge--hours">${lucide('calendar', { size: 14, strokeWidth: 2 })}0 h</span>
              <span class="prop-badge price prop-badge--price">${brl(0)}</span>
            ` : `
              <span class="prop-badge prop-badge--hours">${lucide('calendar', { size: 14, strokeWidth: 2 })}${num(feature.hours)} h</span>
              <span class="prop-badge prop-badge--days">${num(feature.businessDays)} dias úteis</span>
              <span class="prop-badge price prop-badge--price">${brl(feature.price)}</span>
            `}
          </div>
          ${this.renderCollapseToggle(fid, expanded)}
        </header>

        <div class="feature-card-collapse" id="feature-body-${fid}" role="region" aria-labelledby="feature-title-${fid}" ${expanded ? '' : 'inert'}>
        <div class="feature-card-body">
          <div class="feature-goal-box">
            <strong>Objetivo de Negócio & Problema Resolvido:</strong>
            <p>${t(feature.businessGoal)}</p>
          </div>

          ${feature.note ? `
            <div class="feature-note-box ${existing ? 'is-existing' : ''}" role="note">
              ${lucide(existing ? 'circle-check' : 'info', { size: 16, strokeWidth: 2 })}
              <span>${existing ? '<strong>Já existente:</strong> ' : ''}${t(feature.note)}</span>
            </div>
          ` : ''}

          ${Array.isArray(feature.steps) && feature.steps.length ? `
            <div class="feature-steps-title">Fluxo Operacional Passo a Passo:</div>
            <ol class="feature-steps-list">
              ${feature.steps.map(step => `<li>${t(step)}</li>`).join('')}
            </ol>
          ` : ''}

          ${feature.correlationScenario || feature.correlationNote ? `
            <div class="feature-correlation-box">
              <span class="feature-correlation-tag">Cenário ${t(feature.correlationScenario || '-')}</span>
              ${feature.correlationNote ? `<p>${t(feature.correlationNote)}</p>` : ''}
            </div>
          ` : ''}

          ${this.renderAreaSheet(feature, meta, { title: `Planilha por área - Fase ${feature.phase}`, existing, idPrefix: `sheet-${feature.id}` })}

          ${Array.isArray(feature.disciplines) && feature.disciplines.length ? this.renderDisciplines(feature) : ''}

          ${!existing && feature.deliveryNote ? this.renderDeliveryNote(feature) : ''}

          ${!existing && feature.development ? `
            <div class="feature-total-box" role="group" aria-label="Total da funcionalidade">
              <span class="feature-total-label">Total da funcionalidade</span>
              <span class="feature-total-values">
                <span>${num(feature.hours)} h</span>
                <span>${num(feature.businessDays)} dias úteis</span>
                <strong>${brl(feature.price)}</strong>
              </span>
            </div>
          ` : ''}

          ${prints.length ? this.renderPrintsGallery(prints, feature) : ''}

          ${included.length ? this.renderIncludedItems(included, feature) : ''}

          ${existing ? this.renderDeliveredNote(feature) : ''}

          ${visuals.length ? this.renderVisuals(visuals) : ''}

          ${assumptions.length ? `
            <div class="feature-assumption-box">
              ${lucide('info', { size: 16, strokeWidth: 2 })}
              <div>
                <strong>Premissa${assumptions.length > 1 ? 's' : ''} Específica${assumptions.length > 1 ? 's' : ''}:</strong>
                ${assumptions.length === 1 ? ` ${t(assumptions[0])}` : `
                  <ul class="feature-assumption-list">${assumptions.map(a => `<li>${t(a)}</li>`).join('')}</ul>
                `}
              </div>
            </div>
          ` : ''}
        </div>
        </div>
      </article>
    `;
  }

  /** Planilha por área: Área | Do zero | Reaproveitado | Ajustes | Horas | Valor R$ (| Validação). */
  renderAreaSheet(item, meta = {}, { title = 'Planilha por área', existing = false, idPrefix = 'sheet', showHeader = true } = {}) {
    const rate = meta.hourlyRate;
    const rows = getBreakdownRows(item, rate, this.areaNames);
    const hasValidation = rows.some(r => r.validation !== undefined);
    const explicitTotal = item.breakdownTotal || item.breakdown?.total;
    const sum = (k) => rows.reduce((acc, r) => acc + toNumber(r[k]), 0);
    const total = {
      fromScratch: pickNum(explicitTotal, ['fromScratch', 'baseHours']) ?? sum('fromScratch'),
      reused: Math.abs(pickNum(explicitTotal, ['reused', 'reusedHours']) ?? sum('reused')),
      adjustments: pickNum(explicitTotal, ['adjustments', 'adjustmentHours']) ?? sum('adjustments'),
      hours: pickNum(explicitTotal, ['hours']) ?? sum('hours'),
      price: pickNum(explicitTotal, ['price']) ?? sum('price')
    };
    const h = (n) => `${num(n)} h`;
    const neg = (n) => (toNumber(n) ? `\u2212${num(n)} h` : '0 h');
    const pos = (n) => (toNumber(n) ? `+${num(n)} h` : '0 h');
    const sourceNote = Array.isArray(item.breakdown) || Array.isArray(item.breakdown?.areas)
      ? '' : (Array.isArray(item.disciplines) && item.disciplines.length ? 'Derivada do detalhamento por disciplina.' : '');

    return `
      <div class="area-sheet ${existing ? 'is-existing' : ''}" id="${t(idPrefix)}">
        ${showHeader ? `
          <div class="area-sheet-header">
            <span class="feature-steps-title">${t(title)}</span>
            ${existing ? existingBadge() : ''}
          </div>
        ` : ''}
        <div class="area-sheet-scroll" role="region" aria-label="${t(title)}" tabindex="0">
          <table class="area-sheet-table">
            <thead>
              <tr>
                <th scope="col">Área</th>
                <th scope="col" class="num">Do zero</th>
                <th scope="col" class="num">Reaproveitado</th>
                <th scope="col" class="num">Ajustes</th>
                <th scope="col" class="num">Horas</th>
                <th scope="col" class="num">Valor R$</th>
                ${hasValidation ? '<th scope="col">Validação</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <th scope="row" data-label="Área">${t(r.area)}${r.note && !existing ? `<span class="cell-note">${t(r.note)}</span>` : ''}</th>
                  <td class="num" data-label="Do zero">${h(r.fromScratch)}</td>
                  <td class="num is-reused" data-label="Reaproveitado">${neg(r.reused)}</td>
                  <td class="num is-adjust" data-label="Ajustes">${pos(r.adjustments)}</td>
                  <td class="num is-hours" data-label="Horas">${h(r.hours)}</td>
                  <td class="num" data-label="Valor R$">${brl(r.price)}</td>
                  ${hasValidation ? `<td data-label="Validação">${validationBadge(r.validation)}</td>` : ''}
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" data-label="Total">Total</th>
                <td class="num" data-label="Do zero">${h(total.fromScratch)}</td>
                <td class="num is-reused" data-label="Reaproveitado">${neg(total.reused)}</td>
                <td class="num is-adjust" data-label="Ajustes">${pos(total.adjustments)}</td>
                <td class="num is-hours" data-label="Horas">${h(total.hours)}</td>
                <td class="num is-price" data-label="Valor R$">${brl(total.price)}</td>
                ${hasValidation ? '<td data-label="Validação"></td>' : ''}
              </tr>
            </tfoot>
          </table>
        </div>
        ${sourceNote ? `<p class="area-sheet-note">${sourceNote}</p>` : ''}
        ${this.renderOutOfScopeNotice(item.outOfScopeNotice)}
      </div>
    `;
  }

  /** Aviso "FORA DO ESCOPO" ({label, text}); só renderiza quando o campo existe. */
  renderOutOfScopeNotice(n, { id = '' } = {}) {
    if (!n || typeof n !== 'object' || !(n.label || n.text)) return '';
    return `
      <div class="out-of-scope-notice" role="note"${id ? ` id="${t(id)}" tabindex="-1"` : ''}>
        ${n.label ? `<span class="out-of-scope-notice-label">${lucide('circle-alert', { size: 13, strokeWidth: 2.4 })}${t(n.label)}</span>` : ''}
        ${n.text ? `<p class="out-of-scope-notice-text">${t(n.text)}</p>` : ''}
      </div>
    `;
  }

  /** Seção "Metodologia de estimativa" (estimationMethod), renderizada genericamente. */
  renderEstimationMethod(d) {
    const em = d.estimationMethod || d.meta?.estimationMethod || d.investment?.estimationMethod;
    if (!em) return '';
    if (typeof em === 'string') {
      return `<div class="estimation-method"><h4>Metodologia de estimativa</h4><p>${t(em)}</p></div>`;
    }
    const known = ['title', 'formula', 'formulas', 'source', 'sources', 'validation', 'validationStatus', 'validationByArea', 'description', 'summary', 'notes', 'validationStatusValues'];
    const flat = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.values(v) : [].concat(v || []));
    const formulas = [...flat(em.formula), ...flat(em.formulas)];
    const EXTRA_LABELS = {
      definitions: 'Definições das colunas',
      hourlyRate: 'Taxa hora',
      hoursPerBusinessDay: 'Jornada',
      areas: 'Áreas',
      transparencyNote: 'Nota de transparência'
    };
    const renderExtra = (k, v) => {
      if (k === 'hourlyRate') return `${brl(v)} / hora`;
      if (k === 'hoursPerBusinessDay') return `${num(v)} h por dia útil`;
      if (k === 'areas' && Array.isArray(v)) return v.map(a => t(AREA_LABELS[String(a).toLowerCase()] || a)).join(' · ');
      if (k === 'definitions' && v && typeof v === 'object' && !Array.isArray(v)) {
        return `<ul>${Object.values(v).map(x => `<li>${renderValue(x)}</li>`).join('')}</ul>`;
      }
      return renderValue(v);
    };
    const sources = [].concat(em.source || [], em.sources || []);
    const validation = em.validationByArea || em.validation || em.validationStatus;
    const desc = em.description || em.summary;
    const notes = [].concat(em.notes || []);

    const renderValue = (v) => {
      if (v === null || v === undefined) return '-';
      if (Array.isArray(v)) return `<ul>${v.map(x => `<li>${renderValue(x)}</li>`).join('')}</ul>`;
      if (typeof v === 'object') {
        return Object.entries(v).map(([k, x]) => `<div><strong>${t(k)}:</strong> ${renderValue(x)}</div>`).join('');
      }
      return t(v);
    };

    let validationRows = [];
    if (Array.isArray(validation)) {
      validationRows = validation.map(v => (typeof v === 'object'
        ? { area: areaLabel(v), status: pickText(v, ['status', 'validation', 'validationStatus', 'validated']), by: pickText(v, ['by', 'validatedBy', 'agent', 'owner', 'source']), note: pickText(v, ['note', 'notes', 'comment']) }
        : { area: '-', status: v }));
    } else if (validation && typeof validation === 'object') {
      validationRows = Object.entries(validation).map(([k, v]) => (v && typeof v === 'object'
        ? { area: AREA_LABELS[k.toLowerCase()] || k, status: pickText(v, ['status', 'validation', 'validated']), by: pickText(v, ['by', 'validatedBy', 'agent', 'owner', 'source']), note: pickText(v, ['note', 'notes', 'comment']) }
        : { area: AREA_LABELS[k.toLowerCase()] || k, status: v }));
    }
    const hasBy = validationRows.some(r => r.by);
    const hasNote = validationRows.some(r => r.note);
    const extras = Object.entries(em).filter(([k]) => !known.includes(k));

    return `
      <div class="estimation-method" id="metodologia-estimativa" tabindex="-1">
        <h4>${t(em.title || 'Metodologia de estimativa')}</h4>
        ${desc ? `<p>${t(desc)}</p>` : ''}
        ${formulas.length ? `
          <div class="estimation-block">
            <div class="estimation-label">Fórmula</div>
            ${formulas.map(f => `<code class="estimation-formula">${typeof f === 'object' ? renderValue(f) : t(f)}</code>`).join('')}
          </div>
        ` : ''}
        ${sources.length ? `
          <div class="estimation-block">
            <div class="estimation-label">Fonte</div>
            ${sources.length === 1 ? `<div>${renderValue(sources[0])}</div>` : renderValue(sources)}
          </div>
        ` : ''}
        ${validationRows.length ? `
          <div class="estimation-block">
            <div class="estimation-label">Status de validação por área</div>
            <div class="area-sheet-scroll" role="region" aria-label="Status de validação por área" tabindex="0">
              <table class="area-sheet-table validation-table">
                <thead>
                  <tr>
                    <th scope="col">Área</th>
                    <th scope="col">Status</th>
                    ${hasBy ? '<th scope="col">Validado por</th>' : ''}
                    ${hasNote ? '<th scope="col">Observação</th>' : ''}
                  </tr>
                </thead>
                <tbody>
                  ${validationRows.map(r => `
                    <tr>
                      <th scope="row" data-label="Área">${t(r.area)}</th>
                      <td data-label="Status">${validationBadge(r.status)}</td>
                      ${hasBy ? `<td data-label="Validado por">${r.by ? renderValue(r.by) : '-'}</td>` : ''}
                      ${hasNote ? `<td data-label="Observação">${r.note ? renderValue(r.note) : '-'}</td>` : ''}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : validation ? `<div class="estimation-block"><div class="estimation-label">Status de validação</div><div>${renderValue(validation)}</div></div>` : ''}
        ${extras.map(([k, v]) => `
          <div class="estimation-block">
            <div class="estimation-label">${t(EXTRA_LABELS[k] || k)}</div>
            <div>${renderExtra(k, v)}</div>
          </div>
        `).join('')}
        ${notes.length ? `<ul class="estimation-notes">${notes.map(n => `<li>${renderValue(n)}</li>`).join('')}</ul>` : ''}
      </div>
    `;
  }

  /** Escopo textual por disciplina (reaproveitado/novo/ajustado); números ficam na planilha por área. */
  renderDisciplines(feature) {
    const list = (items) => (Array.isArray(items) && items.length)
      ? `<ul class="discipline-items">${items.map(i => `<li>${t(i)}</li>`).join('')}</ul>`
      : '<span class="discipline-empty">-</span>';
    const reusePct = feature.reuseRatio !== undefined ? Math.round(toNumber(feature.reuseRatio) * 100) : null;

    return `
      <div class="feature-breakdown">
        <div class="feature-steps-title">Escopo por Disciplina${reusePct !== null ? ` (${reusePct}% reaproveitado)` : ''}:</div>
        <div class="table-wrapper">
          <table class="proposal-table discipline-table" aria-label="Escopo por disciplina de ${t(feature.title)}">
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Reaproveitado</th>
                <th>Novo</th>
                <th>Ajustado</th>
              </tr>
            </thead>
            <tbody>
              ${feature.disciplines.map(d => `
                <tr>
                  <td class="cell-name cell-discipline" data-label="Disciplina">
                    <span class="discipline-name">${lucide(DISCIPLINE_ICONS[d.discipline] || 'box', { size: 14, strokeWidth: 2 })}${t(d.label || d.discipline)}</span>
                  </td>
                  <td class="cell-block cell-reused" data-label="Reaproveitado">${list(d.reused)}</td>
                  <td class="cell-block cell-new" data-label="Novo">${list(d.new)}</td>
                  <td class="cell-block cell-adjusted" data-label="Ajustado">${list(d.adjusted)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderTestsAdjustDeploy(tad, title, idPrefix = 'tad', notice = tad?.outOfScopeNotice) {
    const rows = [
      { key: 'tests', label: 'Testes' },
      { key: 'adjustments', label: 'Ajustes' },
      { key: 'deploy', label: 'Deploy para produção' }
    ].filter(r => tad[r.key]);
    const total = tad.total || rows.reduce((acc, r) => ({
      hours: acc.hours + toNumber(tad[r.key].hours),
      price: acc.price + toNumber(tad[r.key].price)
    }), { hours: 0, price: 0 });

    return `
      <div class="feature-breakdown feature-tad" id="${t(idPrefix)}" tabindex="-1">
        <div class="feature-steps-title">${t(title)}:</div>
        <div class="table-wrapper">
          <table class="proposal-table tad-table" aria-label="${t(title)}">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center" style="width: 110px;">Horas</th>
                <th class="text-right" style="width: 140px;">Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <td class="cell-name" data-label="Item">${r.label}</td>
                  <td class="text-center" data-label="Horas">${num(tad[r.key].hours)} h</td>
                  <td class="text-right" data-label="Valor (R$)">${brl(tad[r.key].price)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td class="text-center cell-total-title">TOTAL TESTES / AJUSTES / DEPLOY</td>
                <td class="text-center" data-label="Horas">${num(total.hours)} h</td>
                <td class="text-right total-price" data-label="Valor">${brl(total.price)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        ${this.renderOutOfScopeNotice(notice)}
      </div>
    `;
  }

  /** Nota discreta (mesmo padrão do deliveredNote): testes/ajustes/deploy cobrados na fase de entrega final. */
  renderDeliveryNote(feature) {
    const delivery = this.deliveryPhase?.phase;
    const seal = delivery ? `Entrega final · Fase ${t(delivery.phase)}` : 'Entrega final';
    return `
      <div class="feature-delivered-note is-delivery" role="note" id="entrega-${t(feature.id)}">
        <span class="feature-delivered-seal">${lucide('calendar', { size: 14, strokeWidth: 2.4 })}${seal}</span>
        <span class="feature-delivered-text">${t(feature.deliveryNote)}</span>
      </div>
    `;
  }

  /**
   * Fase de entrega final (testes/ajustes/deploy cobrados uma única vez): fase de investimento nova,
   * sem funcionalidade vinculada (featureId null), preferindo a indicada em investment.testsAdjustDeploy.phase.
   */
  resolveDeliveryPhase(d = {}) {
    const inv = d.investment || {};
    const phases = (Array.isArray(inv.phases) ? inv.phases : []).filter(p => !isSuperseded(p));
    const featurePhases = new Set((d.features || []).map(f => f.phase));
    const tad = inv.testsAdjustDeploy && typeof inv.testsAdjustDeploy === 'object' ? inv.testsAdjustDeploy : null;
    const candidates = phases.filter(p => !isExisting(p) && !featurePhases.has(p.phase) && !p.featureId);
    const phase = (tad && tad.phase !== undefined ? phases.find(p => p.phase === tad.phase) : null)
      || candidates.find(p => /teste|ajuste|deploy/i.test(p.name || ''))
      || null;
    if (!phase && !tad) return null;
    return { phase, tad };
  }

  /** Card destacado da fase de entrega final (Fase 11): breakdown testes + ajustes + deploy. */
  renderDeliveryPhaseCard(d = {}) {
    const info = this.deliveryPhase;
    if (!info) return '';
    const { phase = {}, tad } = { phase: info.phase || {}, tad: info.tad };
    const key = 'entrega-final';
    const expanded = this.isCollapsibleExpanded(key, false);
    const num_ = phase.phase ?? tad?.phase;
    const name = String(phase.name || 'Testes, ajustes e deploy para produção (entrega final)').replace(/^\s*Fase\s+\d+\s*[–-]\s*/i, '');
    const hours = phase.hours ?? tad?.total?.hours;
    const price = phase.price ?? tad?.total?.price;
    const covered = (d.features || []).filter(f => !isExisting(f)).map(f => f.phase).filter(n => n !== undefined);
    const coveredLabel = covered.length ? (covered.length === 1 ? `Fase ${covered[0]}` : `Fases ${Math.min(...covered)} a ${Math.max(...covered)}`) : '';
    // Breakdown: investment.testsAdjustDeploy; fallback para phase.breakdown (tests/adjustments/deploy)
    let breakdown = tad;
    if (!breakdown && Array.isArray(phase.breakdown)) {
      breakdown = {};
      phase.breakdown.forEach(r => { if (['tests', 'adjustments', 'deploy'].includes(r.area)) breakdown[r.area] = { hours: r.hours, price: r.price }; });
    }
    const composition = (Array.isArray(phase.breakdown) ? phase.breakdown : []).filter(r => r.note);
    const tableTitle = `Fase ${t(num_)} – Testes, ajustes e deploy (entrega final, cobrança única)`;
    return `
      <article class="proposal-feature-card is-new is-delivery-phase ${expanded ? '' : 'is-collapsed'}" id="card-${key}" tabindex="-1" data-feature-card="${key}">
        <header class="feature-card-header" data-feature-toggle-area>
          <div class="feature-header-left">
            <span class="feature-phase-badge">Fase ${t(num_)}</span>
            <span class="feature-delivery-badge">${lucide('calendar', { size: 12, strokeWidth: 2.4 })}Entrega final</span>
            <h3 class="feature-title" id="feature-title-${key}">${t(name)}</h3>
          </div>
          <div class="feature-metrics-badges">
            <span class="prop-badge prop-badge--hours">${lucide('calendar', { size: 14, strokeWidth: 2 })}${num(hours)} h</span>
            ${phase.businessDays !== undefined ? `<span class="prop-badge prop-badge--days">${num(phase.businessDays)} dias úteis</span>` : ''}
            <span class="prop-badge price prop-badge--price">${brl(price)}</span>
          </div>
          ${this.renderCollapseToggle(key, expanded)}
        </header>
        <div class="feature-card-collapse" id="feature-body-${key}" role="region" aria-labelledby="feature-title-${key}" ${expanded ? '' : 'inert'}>
          <div class="feature-card-body">
            <div class="delivery-phase-intro">
              ${lucide('info', { size: 16, strokeWidth: 2 })}
              <p>${(phase.note || tad?.note)
                ? t(phase.note || tad.note)
                : `<strong>Cobrança única${coveredLabel ? ` cobrindo as ${coveredLabel}` : ''}.</strong>`}</p>
            </div>
            ${breakdown ? this.renderTestsAdjustDeploy(breakdown, tableTitle, 'tad-entrega-final', breakdown.outOfScopeNotice || phase.outOfScopeNotice) : ''}
            ${composition.length ? `
              <ul class="delivery-phase-composition" aria-label="Composição das horas">
                ${composition.map(r => `<li><strong>${t(r.label || r.area)}:</strong> ${t(r.note)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  /** Selo/nota "Já entregue" para módulos existentes (substitui o bloco de representação visual). */
  renderDeliveredNote(feature) {
    const note = feature.deliveredNote || 'Módulo já entregue e em operação. Representação visual dispensada.';
    return `
      <div class="feature-delivered-note" role="note">
        <span class="feature-delivered-seal">${lucide('circle-check', { size: 14, strokeWidth: 2.4 })}Já entregue</span>
        <span class="feature-delivered-text">${t(note)}</span>
      </div>
    `;
  }

  renderVisuals(visuals) {
    const annotations = visuals.filter(v => v.annotation);
    return `
      <div class="feature-visual-area">
        <div class="visual-area-header">
          <span class="visual-area-title">
            ${lucide('scan-line', { size: 15, strokeWidth: 2 })}
            Representação Visual & Diagramas do Módulo:
          </span>
        </div>

        <div class="feature-mockup-grid">
          ${visuals.map(v => `
            <figure class="mockup-item">
              ${v.src ? `
                <img class="mockup-item-img" src="${t(resolvePrintSrc(v.src))}" alt="${t(v.caption)}" loading="lazy" decoding="async">
              ` : `
                <div class="mockup-placeholder" aria-hidden="true">
                  ${this.renderVisualIcon(v.type)}
                  <span class="mockup-placeholder-tag">${v.type === 'diagram' ? 'Diagrama' : 'Print'} pendente</span>
                </div>
              `}
              <figcaption>
                <div class="mockup-item-caption">${t(v.caption)}</div>
                ${v.annotation ? `<div class="mockup-item-annotation">${lucide('info', { size: 12, strokeWidth: 2 })}<span>${t(v.annotation)}</span></div>` : ''}
              </figcaption>
            </figure>
          `).join('')}
        </div>

        ${annotations.length ? `
          <div class="visual-annotations">
            <div class="visual-annotations-title">Anotações a destacar nos prints:</div>
            <ol class="visual-annotations-list">
              ${annotations.map(v => `<li><strong>${t(v.caption)}:</strong> ${t(v.annotation)}</li>`).join('')}
            </ol>
          </div>
        ` : ''}
      </div>
    `;
  }

  /** Galeria de prints anotados da fase: versão principal + miniaturas mobile, título e legenda. */
  renderPrintsGallery(prints, feature) {
    const phaseLabel = t(feature.label || `Fase ${feature.phase}`);
    const types = new Set(prints.flatMap(pr => (pr.legend || []).map(l => l.type)));
    return `
      <section class="feature-prints" id="prints-${t(feature.id)}" tabindex="-1" aria-label="Prints anotados - ${phaseLabel}">
        <div class="feature-prints-header">
          <span class="visual-area-title">
            ${lucide('scan-line', { size: 15, strokeWidth: 2 })}
            Prints anotados - ${phaseLabel}
          </span>
          <span class="feature-prints-key" aria-label="Tipos de destaque">
            ${Object.keys(PRINT_LEGEND_TYPES).filter(k => k !== 'incluso' || types.has(k))
              .map(k => `<span class="print-type-tag is-${k}">${PRINT_LEGEND_TYPES[k]}</span>`).join('')}
          </span>
        </div>

        <div class="feature-prints-list">
          ${prints.map((pr, index) => this.renderPrintItem(pr, index, feature)).join('')}
        </div>
      </section>
    `;
  }

  /**
   * Itens inclusos sem cobrança; `includedItems[].prints` são caminhos (strings) ou objetos de print.
   * Casa cada caminho com o print completo da feature (título/legenda); se não houver, cria um mínimo.
   */
  resolveIncludedItems(feature, allPrints = []) {
    const items = Array.isArray(feature.includedItems) ? feature.includedItems : [];
    return items.map(item => {
      const prints = (Array.isArray(item.prints) ? item.prints : []).map(ref => {
        if (ref && typeof ref === 'object') return ref;
        const src = resolvePrintSrc(ref);
        const match = allPrints.find(pr => printPaths(pr).includes(src));
        if (match) return match;
        const isMobile = /-mobile(-2)?\.png$/i.test(String(ref));
        return { title: item.title, path: isMobile ? null : ref, mobilePath: isMobile ? ref : null, mobileOnly: isMobile, legend: [] };
      }).filter(pr => getPrintViews(pr).length);
      return { ...item, prints: [...new Set(prints)] };
    });
  }

  renderIncludedItems(items, feature) {
    return `
      <section class="feature-included" id="incluso-${t(feature.id)}" tabindex="-1" aria-label="Itens inclusos sem custo">
        ${items.map((item, i) => `
          <div class="included-item">
            <div class="included-item-header">
              <span class="print-type-tag is-incluso">Incluso (sem custo)</span>
              <h4 class="included-item-title">${t(item.title)}</h4>
              <span class="included-item-metrics">${num(item.hours || 0)} h · ${brl(item.price || 0)}</span>
            </div>
            ${item.note ? `<p class="included-item-note">${t(item.note)}</p>` : ''}
            ${Array.isArray(item.files) && item.files.length ? `
              <div class="included-item-files">${item.files.map(f => `<code>${t(f)}</code>`).join('')}</div>
            ` : ''}
            ${item.prints.length ? `
              <div class="feature-prints-list">
                ${item.prints.map((pr, index) => this.renderPrintItem(pr, index, { ...feature, id: `${feature.id}-incluso-${i}` })).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </section>
    `;
  }

  renderPrintItem(pr, index, feature) {
    const title = t(pr.title || `Print ${index + 1}`);
    const views = getPrintViews(pr);
    const [main, ...thumbs] = views;
    const legend = Array.isArray(pr.legend) ? pr.legend : [];
    const number = String(index + 1).padStart(2, '0');
    const viewsAttr = t(views.map(v => `${v.key}|${v.label}|${v.src}`).join(';'));
    const isMobileMain = main.key !== 'desktop';
    const openBtn = (v, cls, inner) => `
      <button class="print-item-open ${cls}" type="button" data-print-views="${viewsAttr}" data-print-device="${v.key}"
        data-print-title="${title}" aria-label="Ampliar print: ${title} (${t(v.label)})">${inner}</button>`;

    return `
      <figure class="print-item ${isMobileMain ? 'is-mobile-only' : ''}" id="print-${t(feature.id)}-${t(pr.id || number)}">
        <div class="print-item-media">
          ${openBtn(main, `print-item-open-main ${isMobileMain ? 'is-mobile' : 'print-item-open-desktop'}`, `
            <img class="print-item-img ${isMobileMain ? 'is-mobile' : ''}" src="${t(main.src)}" alt="${title} - versão ${t(main.label.toLowerCase())} com anotações"
              ${isMobileMain ? '' : 'width="1726" height="768"'} loading="lazy" decoding="async">
            <span class="print-item-zoom" aria-hidden="true">${lucide('search', { size: 14, strokeWidth: 2.2 })} Ampliar</span>
          `)}
          ${thumbs.length ? `
            <div class="print-item-thumbs">
              ${thumbs.map(v => openBtn(v, 'print-item-open-mobile', `
                <img class="print-item-thumb" src="${t(v.src)}" alt="${title} - versão ${t(v.label.toLowerCase())} com anotações" loading="lazy" decoding="async">
                <span class="print-item-thumb-label">${t(v.label)}</span>
              `)).join('')}
            </div>
          ` : ''}
        </div>

        <figcaption class="print-item-caption">
          <div class="print-item-title"><span class="print-item-number">${number}</span>${title}</div>
          ${legend.length ? `
            <ol class="print-legend">
              ${legend.map(l => {
                const type = PRINT_LEGEND_TYPES[l.type] ? l.type : 'novo';
                return `
                  <li class="print-legend-item">
                    <span class="print-legend-n" aria-hidden="true">${t(l.n)}</span>
                    <span class="print-type-tag is-${type}">${PRINT_LEGEND_TYPES[type]}</span>
                    <span class="print-legend-text">${t(l.text)}</span>
                  </li>
                `;
              }).join('')}
            </ol>
          ` : ''}
          ${pr.note ? `<p class="print-item-note">${t(pr.note)}</p>` : ''}
        </figcaption>
      </figure>
    `;
  }

  /** Lightbox simples (abas por versão); fecha com X, backdrop ou ESC. Não existe na impressão. */
  openPrintLightbox({ views = [], device = 'desktop', title = '' }, trigger = null) {
    this.closePrintLightbox();
    if (!views.length) return;

    const box = document.createElement('div');
    box.className = 'print-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', `Print ampliado: ${title}`);
    box.innerHTML = `
      <div class="print-lightbox-dialog">
        <div class="print-lightbox-bar">
          <span class="print-lightbox-title"></span>
          ${views.length > 1 ? `
            <div class="print-lightbox-tabs" role="group" aria-label="Versão do print">
              ${views.map(v => `<button type="button" class="print-lightbox-tab" data-device="${t(v.key)}">${t(v.label)}</button>`).join('')}
            </div>
          ` : ''}
          <button type="button" class="print-lightbox-close" aria-label="Fechar">${lucide('x', { size: 20, strokeWidth: 2.4 })}</button>
        </div>
        <div class="print-lightbox-body">
          <img class="print-lightbox-img" alt="">
        </div>
      </div>
    `;

    box.querySelector('.print-lightbox-title').textContent = title;
    const img = box.querySelector('.print-lightbox-img');
    const setDevice = (key) => {
      const view = views.find(v => v.key === key) || views[0];
      img.src = view.src;
      img.alt = `${title} - versão ${view.label.toLowerCase()} com anotações`;
      box.classList.toggle('is-mobile', view.key !== 'desktop');
      box.querySelectorAll('.print-lightbox-tab').forEach(tab => {
        tab.setAttribute('aria-pressed', String(tab.dataset.device === view.key));
      });
    };
    setDevice(device);

    const onKey = (e) => { if (e.key === 'Escape') this.closePrintLightbox(); };
    box.addEventListener('click', (e) => {
      if (e.target === box || e.target.closest('.print-lightbox-close')) this.closePrintLightbox();
      const tab = e.target.closest('.print-lightbox-tab');
      if (tab) setDevice(tab.dataset.device);
    });
    document.addEventListener('keydown', onKey);

    this.lightbox = { box, onKey, trigger };
    document.body.appendChild(box);
    document.body.classList.add('has-print-lightbox');
    box.querySelector('.print-lightbox-close').focus();
  }

  closePrintLightbox() {
    if (!this.lightbox) return;
    const { box, onKey, trigger } = this.lightbox;
    document.removeEventListener('keydown', onKey);
    box.remove();
    document.body.classList.remove('has-print-lightbox');
    this.lightbox = null;
    if (trigger && document.contains(trigger)) trigger.focus();
  }

  /** Antes de imprimir: força o carregamento das imagens lazy (senão saem em branco no PDF). */
  loadPrintImages() {
    const imgs = [...this.container.querySelectorAll('.print-item img, .mockup-item-img')];
    imgs.forEach(img => { img.loading = 'eager'; });
    return Promise.all(imgs.map(img => (img.complete ? Promise.resolve() : new Promise(res => {
      img.addEventListener('load', res, { once: true });
      img.addEventListener('error', res, { once: true });
    }))));
  }

  renderVisualIcon(type) {
    if (type === 'diagram') {
      return `
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="5" cy="12" r="3" fill="#EBF1FF" />
          <circle cx="12" cy="12" r="3" fill="#EBF1FF" />
          <circle cx="19" cy="12" r="3" fill="#12B76A" stroke="#12B76A" />
          <line x1="8" y1="12" x2="9" y2="12" />
          <line x1="15" y1="12" x2="16" y2="12" />
        </svg>
      `;
    }
    return `
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0B2545" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" fill="#FFFFFF" />
        <line x1="3" y1="8" x2="21" y2="8" />
        <rect x="6" y="11" width="5" height="4" rx="0.5" fill="#EBF1FF" stroke="#1F4FD8" />
        <line x1="13" y1="12" x2="18" y2="12" />
        <line x1="13" y1="14.5" x2="16" y2="14.5" />
        <line x1="9" y1="21" x2="15" y2="21" />
      </svg>
    `;
  }

  /* ------------------------------- Investimento ----------------------------- */

  renderInvestment(inv, d = {}) {
    const meta = d.meta || {};
    const featurePhases = new Set((d.features || []).map(f => f.phase));
    const phases = Array.isArray(inv.phases) ? inv.phases : [];
    const totals = inv.totals || {};
    const sprints = Array.isArray(inv.sprints) ? inv.sprints : [];
    const payments = (Array.isArray(inv.payment) ? inv.payment : []).filter(p => !isSuperseded(p));
    const phaseName = (n) => phases.find(p => p.phase === n)?.name;
    const weeks = toNumber(totals.approxWeeks);

    return `
      <section class="proposal-section" id="topico-investimento" tabindex="-1">
        <div class="proposal-section-header">
          <span class="proposal-section-num">4</span>
          <h2>Quadro Consolidado de Investimento & Cronograma</h2>
        </div>

        <div class="table-wrapper">
          <table class="proposal-table" aria-label="Tabela Consolidada de Fases e Investimento">
            <thead>
              <tr>
                <th style="width: 70px;" class="text-center">Fase</th>
                <th>Etapa / Módulo de Entrega</th>
                <th class="text-center" style="width: 90px;">Horas</th>
                <th class="text-center" style="width: 140px;">Prazo (dias úteis)</th>
                <th class="text-right" style="width: 130px;">Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              ${phases.filter(p => !isSuperseded(p)).map((item, idx, arr) => {
                const existing = isExisting(item);
                const groupRow = existing && arr.findIndex(isExisting) === idx ? `
                  <tr class="row-group" data-delivered-row>
                    <td class="text-center cell-group" data-label="Fase">${this.renderDeliveredRowToggle(arr.filter(isExisting).map(p => `delivered-row-${t(p.phase)}`).join(' '), this.deliveredRange(arr.filter(isExisting).map(p => p.phase)))}</td>
                    <td class="cell-group cell-group-name" data-label="Etapa / Módulo"><span class="delivered-group-icon" aria-hidden="true">${lucide('circle-check', { size: 16, strokeWidth: 2.4 })}</span>${this.deliveredGroupLabel(arr.filter(isExisting).map(p => p.phase))}</td>
                    <td class="text-center cell-group-num" data-label="Horas">0 h</td>
                    <td class="text-center cell-group-num" data-label="Prazo (dias úteis)">—</td>
                    <td class="text-right cell-group-num" data-label="Valor (R$)">${brl(0)}</td>
                  </tr>` : '';
                return `${groupRow}
                  <tr class="${existing ? `row-existing ${this.deliveredExpanded ? '' : 'is-group-collapsed'}` : ''}" ${existing ? `data-delivered-body id="delivered-row-${t(item.phase)}"` : ''}>
                    <td class="text-center cell-phase" data-label="Fase"><strong>${t(item.phase)}</strong></td>
                    <td class="cell-name" data-label="Etapa / Módulo">
                      <span>${t(existing ? stripExistingSuffix(item.name) : item.name)}</span>
                      ${item.note ? `<span class="cell-note">${t(item.note)}</span>` : ''}
                    </td>
                    ${existing ? `
                      <td class="text-center cell-existing" data-label="Situação" colspan="3">${existingBadge()}</td>
                    ` : `
                      <td class="text-center" data-label="Horas">${num(item.hours)} h</td>
                      <td class="text-center" data-label="Prazo (dias úteis)">${num(item.businessDays)} d</td>
                      <td class="text-right" data-label="Valor (R$)">${brl(item.price)}</td>
                    `}
                  </tr>
                `;
              }).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td class="text-center cell-total-title" colspan="2">TOTAL CONSOLIDADO DA PROPOSTA</td>
                <td class="text-center" data-label="Horas">${num(totals.hours)} h</td>
                <td class="text-center" data-label="Prazo">${num(totals.businessDays)} dias úteis${weeks ? ` (~${num(weeks)} semana${weeks > 1 ? 's' : ''})` : ''}</td>
                <td class="text-right total-price" data-label="Valor Total">${brl(totals.price)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        ${(() => {
          const deliveryNum = this.deliveryPhase?.phase?.phase;
          const others = phases.filter(p => !isSuperseded(p) && !featurePhases.has(p.phase) && p.phase !== deliveryNum);
          if (!others.length) return '';
          return `
            <div class="area-sheets-group" id="topico-planilhas-fases" tabindex="-1" data-collapsible-scope>
              <div class="area-sheets-group-head">
                <div class="sprints-title">Planilhas por área - demais fases:</div>
                ${this.renderCollapseToolbar('Expandir ou recolher planilhas das demais fases')}
              </div>
              <div class="phase-sheets-list" data-collapsible-list>
                ${others.map(p => this.renderPhaseSheetItem(p, meta)).join('')}
              </div>
            </div>
          `;
        })()}

        ${inv.testsAdjustDeploy && !this.deliveryPhase ? this.renderTestsAdjustDeploy(inv.testsAdjustDeploy, 'Testes, ajustes e deploy (entrega final, cobrança única)', 'tad-consolidado') : ''}

        ${sprints.length ? this.renderSprints(sprints, phases) : ''}

        ${payments.length ? `
          <div class="payment-milestones-box" id="topico-pagamento" tabindex="-1">
            <div class="payment-title">Condições de Pagamento Vinculadas a Entregas:</div>
            <div class="payment-cards-grid">
              ${payments.map(p => {
                const existing = isExisting(p);
                return `
                  <div class="payment-card ${existing ? 'is-existing' : ''}">
                    ${existing ? `<div class="payment-percent">${existingBadge()}</div>` : `<div class="payment-percent">${num(p.percent)}%</div>`}
                    <div class="payment-milestone-name">${t(p.milestone)}</div>
                    ${existing ? '' : `<div class="payment-amount">${brl(p.amount)}</div>`}
                    ${this.renderPaymentDue(p)}
                    ${p.trigger ? `<div class="payment-trigger">Gatilho: ${t(p.trigger)}</div>` : ''}
                    ${p.note ? `<div class="payment-trigger">${t(p.note)}</div>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }

  /** Vencimento: dueDate (dd/mm/aaaa) com fallback para dueInDays. */
  /**
   * Ciclos de entrega em sprints separados em 2 containers: "Já existente" e "Novas funcionalidades".
   * Classificação dinâmica: a sprint é existente quando todas as suas fases são existentes
   * (status/scope 'existing' ou sem horas/valor) e não há dias úteis; horas e valor vêm das fases.
   */
  renderSprints(sprints, phases = []) {
    const phaseOf = (n) => phases.find(p => p.phase === n) || {};
    const items = sprints.filter(sp => !isSuperseded(sp)).map(sp => {
      const sPhases = Array.isArray(sp.phases) ? sp.phases : [];
      // Status explícito da sprint (se houver) prevalece; senão deriva das fases
      const explicit = sp.status === 'existing' || sp.scope === 'existing';
      const existing = explicit || (!toNumber(sp.businessDays) && sPhases.length > 0 && sPhases.every(n => isExisting(phaseOf(n))));
      const hours = sp.hours !== undefined ? toNumber(sp.hours) : sPhases.reduce((acc, n) => acc + toNumber(phaseOf(n).hours), 0);
      const price = sp.price !== undefined ? toNumber(sp.price) : sPhases.reduce((acc, n) => acc + toNumber(phaseOf(n).price), 0);
      return { sp, sPhases, existing, hours, price };
    });

    const groups = [
      { key: 'existing', title: 'Já existente', subtitle: 'Fases já entregues, sem custo', list: items.filter(i => i.existing) },
      { key: 'new', title: 'Novas funcionalidades', subtitle: 'Fases desta proposta', list: items.filter(i => !i.existing) }
    ].filter(g => g.list.length);

    return `
      <div class="sprints-container sprints-split" id="topico-sprints" tabindex="-1">
        <div class="sprints-title">Ciclos de Entrega em Sprints:</div>
        <div class="sprints-groups">
          ${groups.map(g => {
            const hours = g.list.reduce((acc, i) => acc + i.hours, 0);
            const price = g.list.reduce((acc, i) => acc + i.price, 0);
            const days = g.list.reduce((acc, i) => acc + toNumber(i.sp.businessDays), 0);
            const isEx = g.key === 'existing';
            return `
              <section class="sprints-group is-${g.key}" aria-label="Sprints - ${g.title}">
                <header class="sprints-group-header">
                  <div class="sprints-group-heading">
                    <h3 class="sprints-group-title">${g.title}</h3>
                    <span class="sprints-group-subtitle">${g.subtitle}</span>
                  </div>
                  <div class="sprints-group-totals">
                    <span class="prop-badge">${g.list.length} sprint${g.list.length > 1 ? 's' : ''}</span>
                    ${isEx ? existingBadge() : `
                      <span class="prop-badge">${num(hours)} h</span>
                      <span class="prop-badge">${num(days)} dias úteis</span>
                      <span class="prop-badge price">${brl(price)}</span>
                    `}
                  </div>
                </header>
                <div class="sprints-grid">
                  ${g.list.map(({ sp, sPhases, existing, hours: h, price: pr }) => {
                    const deliverables = sPhases.map(n => stripExistingSuffix(phaseOf(n).name)).filter(Boolean);
                    return `
                      <div class="sprint-card ${existing ? 'is-existing' : ''} ${sp.note ? 'has-note' : ''}">
                        ${sp.note ? `<button type="button" class="sprint-note-toggle" aria-expanded="false" aria-controls="sprint-note-${t(sp.sprint)}" aria-label="Mostrar observação da Sprint ${t(sp.sprint)}">${lucide('info', { size: 14, strokeWidth: 2 })}</button>` : ''}
                        <div class="sprint-tag">Sprint ${t(sp.sprint)}</div>
                        <div class="sprint-phases">${sPhases.length ? joinPhases(sPhases) : t(sp.phases)}</div>
                        <div class="sprint-days">${existing ? existingBadge() : `${num(sp.businessDays)} dias úteis · ${num(h)} h`}</div>
                        ${!existing ? `<div class="sprint-price">${brl(pr)}</div>` : ''}
                        ${sp.startDate || sp.endDate ? `<div class="sprint-dates">${formatShortRange(sp.startDate, sp.endDate)}</div>` : ''}
                        ${sp.deliverables || deliverables.length ? `<div class="sprint-deliverables">${t(sp.deliverables || deliverables.join('; '))}</div>` : ''}
                        ${sp.note ? `<div class="sprint-note" id="sprint-note-${t(sp.sprint)}">${lucide('info', { size: 13, strokeWidth: 2, className: 'sprint-note-icon' })}<span class="sprint-note-text">${t(sp.note)}</span></div>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </section>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  renderPaymentDue(p) {
    const hasDays = p.dueInDays !== undefined && p.dueInDays !== null && p.dueInDays !== '';
    if (!p.dueDate && !hasDays) return '';
    const main = p.dueDate ? `Vencimento: ${formatDate(p.dueDate)}` : dueLabel(p.dueInDays);
    const sub = p.dueDate && hasDays ? `<span class="payment-due-sub">${dueLabel(p.dueInDays)}</span>` : '';
    return `<div class="payment-due">${lucide('calendar', { size: 12, strokeWidth: 2 })}<span>${main}${sub}</span></div>`;
  }

  /* ------------------------------ Pós-entrega ------------------------------- */

  renderPostDelivery(d) {
    const pd = d.postDelivery || {};
    const warranty = pd.warranty || {};
    const homologation = pd.homologation || {};
    const newRequests = pd.newRequests || {};
    return `
      <section class="proposal-section">
        <div class="proposal-section-header">
          <span class="proposal-section-num">5</span>
          <h2>Garantia, Suporte, Homologação & Novas Demandas</h2>
        </div>

        <div class="warranty-grid" id="topico-garantia" tabindex="-1">
          <div class="warranty-card green-accent">
            <div class="warranty-card-header">
              ${lucide('circle-check', { size: 22, stroke: '#12B76A' })}
              <h3>Garantia de ${num(warranty.days)} Dias & Suporte Ágil</h3>
            </div>
            <div class="warranty-card-body">
              <p><strong>${t(warranty.coverage)}</strong></p>
              <p style="margin-top: 8px;">${t(warranty.support)}</p>
              <p style="margin-top: 8px; font-size: 12px; color: #64748B;">
                <strong>Rito de Homologação:</strong> ${t(homologation.rule)} (Prazo de validação: ${num(homologation.responseBusinessDays)} dias úteis por entrega).
              </p>
            </div>
          </div>

          <div class="warranty-card royal-accent">
            <div class="warranty-card-header">
              ${lucide('layers', { size: 22, stroke: '#1F4FD8' })}
              <h3>Evoluções & Novas Demandas (Sem Surpresa)</h3>
            </div>
            <div class="warranty-card-body">
              <p>${t(newRequests.rule)}</p>
              <ul class="warranty-list" style="margin-top: 8px;">
                <li>Taxa hora acordada: <strong>${brl(newRequests.hourlyRate)} / hora</strong></li>
                <li>Estimativa prévia formal por disciplina técnica</li>
                <li>Início das atividades condicionado a autorização formal prévia</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="assumptions-grid" id="topico-premissas" tabindex="-1">
          <div class="assumptions-card">
            <h4>Premissas do Projeto</h4>
            <ul>${(d.assumptions || []).map(a => `<li>${t(a)}</li>`).join('')}</ul>
          </div>
          <div class="assumptions-card" id="topico-fora-escopo" tabindex="-1">
            <h4>Fora do Escopo Contratado</h4>
            <ul>${(d.outOfScope || []).map((o, i) => `<li${i === (d.outOfScope || []).findIndex(x => CLIENT_ERP_RE.test(x)) ? ' id="topico-fora-escopo-erp" tabindex="-1" class="out-of-scope-erp"' : ''}>${t(o)}</li>`).join('')}</ul>
          </div>
        </div>
        ${this.renderOutOfScopeNotice(d.outOfScopeNotice, { id: 'topico-fora-escopo-testes' })}
      </section>
    `;
  }

  /* ------------------------------- Marca / Foto ----------------------------- */

  renderMaxcodeLogo(modifier = '') {
    return `
      <span class="brand-maxcode-logo-plate ${modifier}">
        <img src="assets/logo-maxcode42-horizontal.png" alt="MAXCODE42" class="brand-maxcode-logo" width="800" height="227" decoding="async">
      </span>
    `;
  }

  renderDevAvatar(name = '', modifier = '') {
    const safe = t(name);
    return `
      <a class="dev-avatar ${modifier}" href="https://github.com/josuel-lopes" target="_blank" rel="noopener noreferrer" title="${safe} no GitHub" aria-label="Perfil de ${safe} no GitHub">
        <span class="dev-avatar-fallback" aria-hidden="true">JL</span>
        <img class="dev-avatar-img" src="https://github.com/josuel-lopes.png?size=160" alt="Foto de ${safe}" referrerpolicy="no-referrer" decoding="async">
      </a>
    `;
  }

  /* --------------------------- Navegação por tópicos ------------------------ */

  /** Totais de investimento do JSON (horas · valor). */
  getInvestmentTotalLabel(d = this.data) {
    const totals = d?.investment?.totals || {};
    if (!toNumber(totals.hours) && !toNumber(totals.price)) return '';
    return `${num(totals.hours)} h · ${brl(totals.price)}`;
  }

  renderSeeInvestment(d) {
    const total = this.getInvestmentTotalLabel(d);
    return `
      <a class="btn-see-investment no-print" href="?route=proposta&topico=topico-investimento" data-toc-target="topico-investimento" aria-label="Detalhes do investimento${total ? `: ${total}` : ''}">
        ${lucide('receipt-dollar', { size: 16, strokeWidth: 2 })}
        <span>Detalhes do investimento</span>
        ${total ? `<strong>${total}</strong>` : ''}
      </a>
    `;
  }

  /**
   * Modelo de tópicos gerado do JSON e validado no DOM (tópico só aparece se o alvo existir).
   * Ordem = ordem real do DOM (scrollspy coerente).
   */
  buildToc(d = {}) {
    const features = Array.isArray(d.features) ? d.features : [];
    const inv = d.investment || {};
    const invPhases = (Array.isArray(inv.phases) ? inv.phases : []).filter(p => !isSuperseded(p));
    const exists = (id) => Boolean(id && this.container.querySelector(`#${CSS.escape(id)}`));
    const item = (id, label, extra = {}) => (exists(id) ? { id, label, ...extra } : null);
    const clean = (list) => list.filter(Boolean);
    const phaseRangeLabel = (nums) => {
      const list = nums.filter(n => n !== undefined && n !== null).map(Number).sort((a, b) => a - b);
      if (!list.length) return '';
      return list.length === 1 ? `Fase ${list[0]}` : `Fases ${list[0]}–${list[list.length - 1]}`;
    };

    const existingFeatures = features.filter(f => isExisting(f));
    const newFeatures = features.filter(f => !isExisting(f));
    const existingPhaseNums = invPhases.filter(p => isExisting(p)).map(p => p.phase);
    const existingRange = phaseRangeLabel(existingPhaseNums.length ? existingPhaseNums : existingFeatures.map(f => f.phase));
    const deliveryNum = this.deliveryPhase?.phase?.phase ?? this.deliveryPhase?.tad?.phase;
    const newPhases = [...newFeatures.map(f => f.phase), deliveryNum].filter(n => n !== undefined && n !== null);

    const erpItem = (d.outOfScope || []).find(o => CLIENT_ERP_RE.test(o));

    const groups = [
      {
        key: 'apresentacao', label: 'Apresentação', chip: 'Apresentação',
        items: clean([
          item('topico-apresentacao', 'Capa da proposta'),
          item('topico-sumario', 'Sumário executivo'),
          item('topico-maxcode42', 'Sobre a MAXCODE42')
        ])
      },
      {
        key: 'metodologia', label: 'Metodologia', chip: 'Metodologia',
        items: clean([
          item('topico-metodologia', 'Como estimamos'),
          item('metodologia-estimativa', 'Método de estimativa')
        ])
      },
      {
        key: 'existente',
        label: `Escopo já existente${existingRange ? ` (${existingRange})` : ''}`,
        chip: 'Escopo existente',
        tag: 'sem custo',
        collapsible: true,
        items: clean(existingFeatures.map(f => item(`card-${f.id}`, t(stripExistingSuffix(f.title)), {
          dot: 'existing', prefix: f.phase !== undefined ? `F${t(f.phase)}` : ''
        })))
      },
      {
        key: 'novas',
        label: `Novas funcionalidades${newPhases.length ? ` (Fases ${newPhases.join(', ')})` : ''}`,
        chip: 'Novas funcionalidades',
        items: clean([...newFeatures.map(f => {
          const printsCount = this.container.querySelectorAll(`#prints-${CSS.escape(f.id)} .print-item`).length;
          return item(`card-${f.id}`, t(f.label || f.title), {
            dot: 'new',
            prefix: f.label ? '' : (f.phase !== undefined ? `F${t(f.phase)}` : ''),
            children: clean([
              item(`prints-${f.id}`, `Prints anotados${printsCount ? ` (${printsCount})` : ''}`),
              item(`incluso-${f.id}`, 'Inclusos sem custo')
            ])
          });
        }), item('card-entrega-final', deliveryNum !== undefined ? `Fase ${t(deliveryNum)} – Testes, ajustes e deploy (entrega final)` : 'Testes, ajustes e deploy (entrega final)', {
          dot: 'new',
          children: clean([item('tad-entrega-final', 'Breakdown testes / ajustes / deploy')])
        })])
      },
      {
        key: 'investimento', label: 'Investimento', chip: 'Investimento',
        total: this.getInvestmentTotalLabel(d),
        highlight: true,
        items: clean([
          item('topico-investimento', 'Quadro de investimento'),
          item('topico-planilhas-fases', 'Planilhas - demais fases'),
          item('topico-sprints', 'Sprints'),
          item('topico-pagamento', 'Parcelas / marcos')
        ])
      },
      {
        key: 'garantia', label: 'Garantia & Novas demandas', chip: 'Garantia',
        items: clean([item('topico-garantia', 'Garantia, suporte e novas demandas')])
      },
      {
        key: 'premissas', label: 'Premissas & Fora do escopo', chip: 'Premissas',
        items: clean([
          item('topico-premissas', 'Premissas do projeto'),
          item('topico-fora-escopo', 'Fora do escopo', {
            children: clean([erpItem ? item('topico-fora-escopo-erp', 'Protheus/ADVPL – responsabilidade do cliente') : null])
          })
        ])
      },
      {
        key: 'aceite', label: 'Aceite & Contato', chip: 'Aceite',
        items: clean([
          item('topico-aceite', 'Assinaturas'),
          item('topico-contato', 'Contato')
        ])
      }
    ];
    return groups.filter(g => g.items.length);
  }

  tocHref(id) {
    return `?route=proposta&topico=${encodeURIComponent(id)}`;
  }

  renderTocLink(entry, child = false) {
    const dot = entry.dot ? `<span class="toc-dot toc-dot--${entry.dot}" aria-hidden="true"></span>` : '';
    const prefix = entry.prefix ? `<span class="toc-prefix">${entry.prefix}</span>` : '';
    return `
      <a class="toc-link ${child ? 'toc-link--child' : ''}" href="${this.tocHref(entry.id)}" data-toc-target="${entry.id}" title="${entry.label}">
        ${dot}${prefix}<span class="toc-link-text">${entry.label}</span>
      </a>
    `;
  }

  renderTocGroups(groups, variant) {
    return groups.map(g => {
      const listId = `toc-${variant}-list-${g.key}`;
      const collapsed = g.collapsible && this.tocCollapsed.has(g.key);
      const extras = `
        ${g.tag ? `<span class="toc-tag-free">${g.tag}</span>` : ''}
        ${g.total ? `<span class="toc-group-total">${g.total}</span>` : ''}
      `;
      const head = g.collapsible ? `
        <button type="button" class="toc-group-toggle" aria-expanded="${collapsed ? 'false' : 'true'}" aria-controls="${listId}" data-toc-toggle="${g.key}">
          <span class="toc-chevron" aria-hidden="true">${lucide('chevron-right', { size: 12, strokeWidth: 2.5 })}</span>
          <span class="toc-group-text">${g.label}</span>${extras}
        </button>
      ` : `<div class="toc-group-label"><span class="toc-group-text">${g.label}</span>${extras}</div>`;
      return `
        <div class="toc-group ${g.highlight ? 'toc-group--highlight' : ''}" data-toc-group="${g.key}">
          ${head}
          <ul class="toc-list" id="${listId}" ${collapsed ? 'hidden' : ''}>
            ${g.items.map(it => `
              <li>
                ${this.renderTocLink(it)}
                ${it.children && it.children.length ? `
                  <ul class="toc-sublist">${it.children.map(c => `<li>${this.renderTocLink(c, true)}</li>`).join('')}</ul>
                ` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }).join('');
  }

  /** Desconecta observers e listeners globais do índice (evita duplicação em refresh/re-render). */
  teardownToc() {
    if (this.tocAbort) this.tocAbort.abort();
    if (this.tocIO) this.tocIO.disconnect();
    if (this.tocRO) this.tocRO.disconnect();
    this.tocAbort = null;
    this.tocIO = null;
    this.tocRO = null;
    document.body.classList.remove('toc-sheet-open');
  }

  setupToc() {
    this.teardownToc();
    if (!this.tocCollapsed) this.tocCollapsed = new Set(['existente']);
    const root = this.container.querySelector('.view-proposta-wrapper');
    const side = this.container.querySelector('[data-toc-slot="side"]');
    const bar = this.container.querySelector('[data-toc-slot="bar"]');
    const overlays = this.container.querySelector('[data-toc-slot="overlays"]');
    if (!root || !this.data || !side || !bar || !overlays || !this.container.querySelector('.proposal-sheet:not(.proposal-state)')) return;

    const groups = this.buildToc(this.data);
    this.tocGroups = groups;
    const targetGroup = new Map();
    const parentOf = new Map();
    groups.forEach(g => g.items.forEach(it => {
      targetGroup.set(it.id, g.key);
      (it.children || []).forEach(c => { targetGroup.set(c.id, g.key); parentOf.set(c.id, it.id); });
    }));

    side.innerHTML = `
      <div class="toc-title">Tópicos</div>
      ${this.renderTocGroups(groups, 'side')}
      <button type="button" class="toc-backtop" data-toc-top>${lucide('chevron-up', { size: 14, strokeWidth: 2.5 })}<span>Voltar ao topo</span></button>
    `;
    bar.innerHTML = `
      <button type="button" class="toc-chip toc-chip--all" aria-haspopup="dialog" aria-controls="toc-sheet" aria-expanded="false" data-toc-open>
        ${lucide('menu', { size: 14, strokeWidth: 2.2 })}<span>Todos</span>
      </button>
      ${groups.map(g => `
        <a class="toc-chip ${g.highlight ? 'toc-chip--highlight' : ''}" href="${this.tocHref(g.items[0].id)}" data-toc-target="${g.items[0].id}" data-toc-chip="${g.key}">
          ${g.chip}${g.highlight && g.total ? ` <span class="toc-chip-total">· ${g.total.split(' · ').pop()}</span>` : ''}
        </a>
      `).join('')}
    `;
    overlays.innerHTML = `
      <button type="button" class="toc-fab" aria-haspopup="dialog" aria-controls="toc-sheet" aria-expanded="false" data-toc-open>
        ${lucide('menu', { size: 16, strokeWidth: 2.2 })}<span>Tópicos</span>
      </button>
      <button type="button" class="toc-top-fab" aria-label="Voltar ao topo" title="Voltar ao topo" data-toc-top>
        ${lucide('chevron-up', { size: 18, strokeWidth: 2.5 })}
      </button>
      <div class="toc-sheet-backdrop" data-toc-close hidden></div>
      <div class="toc-sheet" id="toc-sheet" role="dialog" aria-modal="true" aria-labelledby="toc-sheet-title" hidden>
        <div class="toc-sheet-handle" aria-hidden="true"></div>
        <div class="toc-sheet-header">
          <h2 id="toc-sheet-title">Tópicos da proposta</h2>
          <button type="button" class="toc-sheet-close" aria-label="Fechar tópicos" data-toc-close>${lucide('x', { size: 20, strokeWidth: 2.2 })}</button>
        </div>
        <div class="toc-sheet-body">${this.renderTocGroups(groups, 'sheet')}</div>
      </div>
    `;

    // Alvos navegáveis (ordem do DOM)
    this.container.querySelectorAll(TOC_TARGET_SELECTOR).forEach(el => el.removeAttribute('data-toc-anchor'));
    targetGroup.forEach((_, id) => this.container.querySelector(`#${CSS.escape(id)}`)?.setAttribute('data-toc-anchor', ''));
    const targets = [...this.container.querySelectorAll(TOC_TARGET_SELECTOR)];

    const abort = new AbortController();
    this.tocAbort = abort;
    const { signal } = abort;
    const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actionBar = this.container.querySelector('.proposal-action-bar');
    const sheet = overlays.querySelector('#toc-sheet');
    const backdrop = overlays.querySelector('.toc-sheet-backdrop');
    const topFab = overlays.querySelector('.toc-top-fab');
    let opener = null;
    let activeId = null;

    const offset = () => {
      const cs = getComputedStyle(root);
      return (parseFloat(cs.getPropertyValue('--prop-bar-h')) || 0) + (parseFloat(cs.getPropertyValue('--prop-toc-h')) || 0) + 16;
    };

    const setBarHeight = () => {
      if (actionBar) root.style.setProperty('--prop-bar-h', `${Math.round(actionBar.getBoundingClientRect().height)}px`);
    };
    setBarHeight();
    if (actionBar && typeof ResizeObserver !== 'undefined') {
      this.tocRO = new ResizeObserver(setBarHeight);
      this.tocRO.observe(actionBar);
    }

    const setCollapsed = (key, collapsed) => {
      if (collapsed) this.tocCollapsed.add(key); else this.tocCollapsed.delete(key);
      this.container.querySelectorAll(`[data-toc-toggle="${key}"]`).forEach(btn => {
        btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        const list = this.container.querySelector(`#${btn.getAttribute('aria-controls')}`);
        if (list) list.hidden = collapsed;
      });
    };

    const setActive = (id) => {
      if (id === activeId) return;
      activeId = id;
      const group = targetGroup.get(id);
      const parent = parentOf.get(id);
      this.container.querySelectorAll('.toc-link').forEach(a => {
        const on = a.dataset.tocTarget === id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        a.classList.toggle('is-active-parent', Boolean(parent) && a.dataset.tocTarget === parent);
      });
      bar.querySelectorAll('[data-toc-chip]').forEach(chip => {
        const on = chip.dataset.tocChip === group;
        chip.classList.toggle('is-active', on);
        if (on) {
          chip.setAttribute('aria-current', 'location');
          const left = chip.offsetLeft - 16;
          const right = chip.offsetLeft + chip.offsetWidth - bar.clientWidth + 16;
          if (bar.scrollLeft > left) bar.scrollLeft = left;
          else if (bar.scrollLeft < right) bar.scrollLeft = right;
        } else chip.removeAttribute('aria-current');
      });
      if (group && this.tocCollapsed.has(group)) setCollapsed(group, false);
      const sideLink = side.querySelector('.toc-link.is-active');
      if (sideLink && side.scrollHeight > side.clientHeight) {
        const top = sideLink.offsetTop - side.clientHeight / 2;
        side.scrollTop = Math.max(0, top);
      }
    };

    const updateSpy = () => {
      if (!root.isConnected) { this.teardownToc(); return; }
      if (!targets.length) return;
      const limit = offset() + 1;
      let current = targets[0].id;
      for (const el of targets) {
        // Filhos de card recolhido não contam (o card em si continua como alvo).
        const card = el.closest('[data-feature-card]');
        if (card && card !== el && card.classList.contains('is-collapsed')) continue;
        if (el.getBoundingClientRect().top <= limit) current = el.id; else break;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = targets[targets.length - 1].id;
      setActive(current);
      topFab.classList.toggle('is-visible', window.scrollY > window.innerHeight);
    };

    if (typeof IntersectionObserver !== 'undefined') {
      this.tocIO = new IntersectionObserver(() => updateSpy(), {
        rootMargin: `-${Math.round(offset())}px 0px -60% 0px`,
        threshold: 0
      });
      targets.forEach(el => this.tocIO.observe(el));
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; updateSpy(); });
    }, { passive: true, signal });
    window.addEventListener('resize', updateSpy, { signal });

    const goTo = (id, { smooth = true, updateUrl = true } = {}) => {
      const el = this.container.querySelector(`#${CSS.escape(id)}`);
      if (!el) return;
      this.revealFeatureTarget(el);
      el.scrollIntoView({ behavior: smooth && !reduce() ? 'smooth' : 'auto', block: 'start' });
      el.focus({ preventScroll: true });
      // Correção pós-rolagem: imagens lazy acima do alvo podem deslocar o layout durante o scroll suave.
      let attempts = 0;
      const settle = () => {
        if (!el.isConnected || attempts++ > 3) return;
        if (Math.abs(el.getBoundingClientRect().top - offset()) > 6
          && window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          setTimeout(settle, 250);
        }
      };
      if ('onscrollend' in window) {
        // Escuta temporária: não pode "puxar de volta" uma rolagem posterior do usuário.
        const onEnd = () => setTimeout(settle, 50);
        const stop = () => {
          window.removeEventListener('scrollend', onEnd);
          ['wheel', 'touchstart', 'keydown'].forEach(ev => window.removeEventListener(ev, stop));
        };
        window.addEventListener('scrollend', onEnd, { once: true, signal });
        ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, stop, { once: true, passive: true, signal }));
        setTimeout(stop, 4000);
      }
      else setTimeout(settle, 900);
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('topico', id);
        history.replaceState(history.state, '', url.toString());
      }
      setActive(id);
    };

    const openSheet = (trigger) => {
      opener = trigger;
      sheet.hidden = false;
      backdrop.hidden = false;
      document.body.classList.add('toc-sheet-open');
      this.container.querySelectorAll('[data-toc-open]').forEach(b => b.setAttribute('aria-expanded', 'true'));
      (sheet.querySelector('.toc-link.is-active') || sheet.querySelector('.toc-link'))?.focus();
    };
    const closeSheet = ({ restoreFocus = true } = {}) => {
      if (sheet.hidden) return;
      sheet.hidden = true;
      backdrop.hidden = true;
      document.body.classList.remove('toc-sheet-open');
      this.container.querySelectorAll('[data-toc-open]').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (restoreFocus && opener && opener.isConnected && opener.offsetParent !== null) opener.focus();
      else if (restoreFocus) this.container.querySelector('.toc-fab')?.focus();
    };

    root.addEventListener('click', (e) => {
      const link = e.target.closest('[data-toc-target]');
      if (link) {
        e.preventDefault();
        const inSheet = Boolean(link.closest('#toc-sheet'));
        if (inSheet) closeSheet({ restoreFocus: false });
        goTo(link.dataset.tocTarget);
        return;
      }
      const toggle = e.target.closest('[data-toc-toggle]');
      if (toggle) {
        setCollapsed(toggle.dataset.tocToggle, toggle.getAttribute('aria-expanded') === 'true');
        return;
      }
      const open = e.target.closest('[data-toc-open]');
      if (open) { openSheet(open); return; }
      if (e.target.closest('[data-toc-close]')) { closeSheet(); return; }
      if (e.target.closest('[data-toc-top]')) {
        window.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' });
        this.container.querySelector('.proposal-main-title-box h1')?.focus({ preventScroll: true });
      }
    }, { signal });

    document.addEventListener('keydown', (e) => {
      if (sheet.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
      if (e.key === 'Tab') {
        const focusables = [...sheet.querySelectorAll('a[href], button:not([disabled])')].filter(el => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, { signal });

    // Deep link ?route=proposta&topico=<id> (uma vez por carregamento)
    const topico = new URLSearchParams(window.location.search).get('topico');
    if (topico && !this.tocDeepLinked && targetGroup.has(topico)) {
      this.tocDeepLinked = true;
      requestAnimationFrame(() => goTo(topico, { smooth: false, updateUrl: false }));
    } else {
      updateSpy();
    }
  }

  /* ------------------------- Expandir / recolher cards ------------------------ */

  /** Estado de expansão: escolha do usuário (mantida no refetch) ou padrão (existente recolhido, novo expandido). */
  isCollapsibleExpanded(key, existing) {
    return this.featureExpanded?.has(key) ? this.featureExpanded.get(key) : !existing;
  }

  renderStatusSeal(existing) {
    return existing
      ? `<span class="feature-delivered-badge">${lucide('circle-check', { size: 12, strokeWidth: 2.4 })}Já entregue</span>`
      : '<span class="feature-new-badge">Nova</span>';
  }

  renderCollapseToggle(key, expanded) {
    return `
      <button type="button" class="feature-toggle" data-feature-toggle="${key}"
        aria-expanded="${expanded ? 'true' : 'false'}" aria-controls="feature-body-${key}"
        aria-labelledby="feature-toggle-label-${key} feature-title-${key}">
        <span class="feature-toggle-label" id="feature-toggle-label-${key}">${expanded ? 'Recolher' : 'Expandir'}</span>
        ${lucide('chevron-down', { size: 18, strokeWidth: 2.4 })}
      </button>
    `;
  }

  /** Rótulo do grupo "Já entregues" (ex.: "Já entregues (Fases 0 a 6) · R$ 0,00"). */
  deliveredGroupLabel(nums) {
    const list = nums.filter(n => n !== undefined && n !== null).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
    const range = !list.length ? '' : list.length === 1 ? ` (Fase ${list[0]})` : ` (Fases ${list[0]} a ${list[list.length - 1]})`;
    return `Já entregues${range}`;
  }

  /** Intervalo de fases já entregues a partir dos dados (ex.: "0 a 6"; "6" se única). */
  deliveredRange(nums = []) {
    const list = nums.filter(n => n !== undefined && n !== null).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
    if (!list.length) return '';
    return list.length === 1 ? `${list[0]}` : `${list[0]} a ${list[list.length - 1]}`;
  }

  /** Texto do tooltip conforme o estado (title, aria-label e data-tooltip). */
  deliveredTip(open, range) {
    const r = range ? ` (${range})` : '';
    return open
      ? `Recolher: ocultar as fases já entregues${r}`
      : `Expandir: exibir as fases já entregues${r}, sem custo nesta proposta`;
  }

  /** Atributos comuns dos botões do grupo (tooltip + estado). */
  deliveredToggleAttrs(id, range) {
    const open = this.deliveredExpanded === true;
    const tip = t(this.deliveredTip(open, range));
    return `data-delivered-toggle data-range="${t(range)}" aria-expanded="${open ? 'true' : 'false'}" aria-controls="${id}" title="${tip}" aria-label="${tip}" data-tooltip="${tip}"`;
  }

  /** Botão de expandir/recolher do grupo "Já entregues" (iniciando colapsado). Com `price`, exibe o valor à direita (cards). */
  renderDeliveredToggle(id, label, { cls = '', price = null, range = '' } = {}) {
    const open = this.deliveredExpanded === true;
    return `
      <button type="button" class="delivered-group-toggle ${cls}" ${this.deliveredToggleAttrs(id, range)}>
        <span class="delivered-group-icon" aria-hidden="true">${lucide('circle-check', { size: 16, strokeWidth: 2.4 })}</span>
        <span class="delivered-group-label">${label}</span>
        ${price !== null ? `<span class="prop-badge price prop-badge--price delivered-group-price">${price}</span>` : ''}
        <span class="delivered-group-pill feature-toggle" aria-hidden="true">
          <span class="delivered-group-action">${open ? 'Recolher' : 'Expandir'}</span>
          <span class="delivered-group-chevron">${lucide('chevron-down', { size: 18, strokeWidth: 2.4 })}</span>
        </span>
      </button>
    `;
  }

  /** Botão compacto (só chevron) da linha de grupo na tabela, na coluna "Fase". */
  renderDeliveredRowToggle(id, range = '') {
    const open = this.deliveredExpanded === true;
    return `
      <button type="button" class="delivered-row-toggle" ${this.deliveredToggleAttrs(id, range)}>
        <span class="delivered-group-action sr-only">${open ? 'Recolher' : 'Expandir'}</span>
        <span class="delivered-group-chevron" aria-hidden="true">${lucide('chevron-down', { size: 18, strokeWidth: 2.4 })}</span>
        <span class="sr-only">fases já entregues</span>
      </button>
    `;
  }

  setDeliveredExpanded(open) {
    this.deliveredExpanded = !!open;
    this.container.querySelectorAll('[data-delivered-toggle]').forEach(btn => {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const tip = this.deliveredTip(!!open, btn.dataset.range || '');
      btn.setAttribute('title', tip);
      btn.setAttribute('aria-label', tip);
      btn.setAttribute('data-tooltip', tip);
      const a = btn.querySelector('.delivered-group-action');
      if (a) a.textContent = open ? 'Recolher' : 'Expandir';
    });
    this.container.querySelectorAll('[data-delivered-body]').forEach(el => el.classList.toggle('is-group-collapsed', !open));
    this.container.querySelectorAll('[data-delivered-group]').forEach(el => el.classList.toggle('is-group-collapsed', !open));
    this.syncToggleAll();
  }

  renderCollapseToolbar(label) {
    return `
      <div class="features-toolbar" role="group" aria-label="${t(label)}">
        <button type="button" class="features-toolbar-btn" data-features-toggle-all data-mode="expand" aria-expanded="false" title="Expandir todas" aria-label="Expandir todas">${lucide('chevrons-up-down', { size: 15, strokeWidth: 2.2 })}<span class="features-toolbar-label">Expandir todas</span></button>
      </div>
    `;
  }

  /** Planilha por área de fase sem card próprio (demais fases), como item colapsável. */
  renderPhaseSheetItem(p, meta) {
    const existing = isExisting(p);
    const key = `sheet-phase-${t(p.phase)}`;
    const expanded = this.isCollapsibleExpanded(key, existing);
    const title = t(existing ? stripExistingSuffix(p.name) : p.name);
    return `
      <article class="proposal-feature-card phase-sheet-card ${existing ? 'is-existing' : 'is-new'} ${expanded ? '' : 'is-collapsed'}" id="${key}" ${existing ? 'aria-disabled="true"' : ''} tabindex="-1" data-feature-card="${key}">
        <header class="feature-card-header" data-feature-toggle-area>
          <div class="feature-header-left">
            <span class="feature-phase-badge">Fase ${t(p.phase)}</span>
            ${this.renderStatusSeal(existing)}
            <h4 class="feature-title" id="feature-title-${key}">${title}</h4>
          </div>
          <div class="feature-metrics-badges">
            <span class="prop-badge prop-badge--hours">${lucide('calendar', { size: 14, strokeWidth: 2 })}${existing ? 0 : num(p.hours)} h</span>
            <span class="prop-badge price prop-badge--price">${brl(existing ? 0 : p.price)}</span>
          </div>
          ${this.renderCollapseToggle(key, expanded)}
        </header>
        <div class="feature-card-collapse" id="feature-body-${key}" role="region" aria-labelledby="feature-title-${key}" ${expanded ? '' : 'inert'}>
          <div class="feature-card-body">
            ${this.renderAreaSheet(p, meta, { title: `Fase ${p.phase} - ${title}`, existing, idPrefix: `${key}-table`, showHeader: false })}
          </div>
        </div>
      </article>
    `;
  }

  /** Atualiza o botão único "Expandir/Recolher todas" do escopo (ou de todos, sem argumento). */
  syncToggleAll(scope = null) {
    const scopes = scope ? [scope] : [...this.container.querySelectorAll('[data-collapsible-scope]')];
    scopes.forEach(sc => {
      const btn = sc.querySelector('[data-features-toggle-all]');
      if (!btn) return;
      const cards = [...sc.querySelectorAll('[data-feature-card]')];
      const groups = [...sc.querySelectorAll('[data-delivered-group]')];
      const allOpen = (cards.length || groups.length)
        && cards.every(c => !c.classList.contains('is-collapsed'))
        && groups.every(g => !g.classList.contains('is-group-collapsed'));
      const label = allOpen ? 'Recolher todas' : 'Expandir todas';
      btn.dataset.mode = allOpen ? 'collapse' : 'expand';
      btn.setAttribute('aria-expanded', allOpen ? 'true' : 'false');
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      btn.innerHTML = `${lucide(allOpen ? 'chevrons-down-up' : 'chevrons-up-down', { size: 15, strokeWidth: 2.2 })}<span class="features-toolbar-label">${label}</span>`;
    });
  }

  /** Expande/recolhe um card de funcionalidade (a11y + transição; sem animação quando animate=false). */
  setFeatureExpanded(card, expanded, { animate = true } = {}) {
    if (!card) return;
    const id = card.dataset.featureCard;
    if (!this.featureExpanded) this.featureExpanded = new Map();
    this.featureExpanded.set(id, expanded);
    const btn = card.querySelector('[data-feature-toggle]');
    const body = card.querySelector('.feature-card-collapse');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (card.classList.contains('is-collapsed') === !expanded) return;
    card.classList.toggle('no-anim', !animate || reduce);
    card.classList.add('is-animating');
    card.classList.toggle('is-collapsed', !expanded);
    this.syncToggleAll(card.closest('[data-collapsible-scope]'));
    btn?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    const label = card.querySelector('.feature-toggle-label');
    if (label) label.textContent = expanded ? 'Recolher' : 'Expandir';
    if (body) {
      if (expanded) body.removeAttribute('inert'); else body.setAttribute('inert', '');
    }
    clearTimeout(card._featureTimer);
    const done = () => card.classList.remove('is-animating', 'no-anim');
    if (!animate || reduce) { done(); return; }
    card._featureTimer = setTimeout(done, 320);
  }

  /** Garante que o alvo (card ou filho dentro do card) esteja visível antes da navegação. */
  revealFeatureTarget(el) {
    const card = el?.closest?.('[data-feature-card]');
    if (card && card.classList.contains('is-collapsed')) this.setFeatureExpanded(card, true, { animate: false });
    if (el?.closest?.('[data-delivered-group]') && !this.deliveredExpanded) this.setDeliveredExpanded(true);
  }

  bindFeatureToggles() {
    this.container.querySelectorAll('[data-delivered-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.setDeliveredExpanded(!this.deliveredExpanded));
    });
    this.container.querySelectorAll('[data-collapsible-list]').forEach(list => {
      list.addEventListener('click', (e) => {
        const area = e.target.closest('[data-feature-toggle-area]');
        if (!area || !list.contains(area)) return;
        if (e.target.closest('a, input, select, textarea') ) return;
        const card = area.closest('[data-feature-card]');
        this.setFeatureExpanded(card, card.classList.contains('is-collapsed'));
      });
    });
    this.container.querySelectorAll('[data-features-toggle-all]').forEach(btn => {
      btn.addEventListener('click', () => {
        const expand = btn.dataset.mode !== 'collapse';
        const scope = btn.closest('[data-collapsible-scope]') || this.container;
        if (scope.querySelector('[data-delivered-group]')) this.setDeliveredExpanded(expand);
        scope.querySelectorAll('[data-feature-card]').forEach(card => this.setFeatureExpanded(card, expand));
        this.syncToggleAll(scope);
      });
    });
    this.syncToggleAll();
  }

  /* --------------------------------- Eventos -------------------------------- */

  bindEvents() {
    // 0. Fallback de iniciais "JL" caso a foto do GitHub não carregue
    this.container.querySelectorAll('.dev-avatar-img, .sum-avatar-img').forEach(img => {
      const fallback = () => img.remove();
      if (img.complete && img.naturalWidth === 0) {
        fallback();
      } else {
        img.addEventListener('error', fallback, { once: true });
      }
    });

    // 0. Notas de sprint: ícone de info abre/fecha a observação (na impressão ficam sempre visíveis via CSS)
    const setSprintNote = (btn, open) => {
      btn.setAttribute('aria-expanded', String(open));
      btn.closest('.sprint-card')?.classList.toggle('is-note-open', open);
    };
    const closeSprintNotes = (except) => {
      this.container.querySelectorAll('.sprint-note-toggle[aria-expanded="true"]').forEach(b => {
        if (b !== except) setSprintNote(b, false);
      });
    };
    this.container.querySelectorAll('.sprint-note-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        closeSprintNotes(btn);
        setSprintNote(btn, open);
      });
    });
    // Fecha ao clicar fora ou com Esc (listeners no document; substituídos a cada render)
    if (this._sprintNoteOutside) document.removeEventListener('click', this._sprintNoteOutside);
    if (this._sprintNoteEsc) document.removeEventListener('keydown', this._sprintNoteEsc);
    this._sprintNoteOutside = (e) => {
      if (!e.target.closest?.('.sprint-card.has-note')) closeSprintNotes();
      else if (!e.target.closest('.sprint-note-toggle, .sprint-note')) closeSprintNotes();
    };
    this._sprintNoteEsc = (e) => {
      if (e.key !== 'Escape') return;
      const open = this.container.querySelector('.sprint-note-toggle[aria-expanded="true"]');
      if (!open) return;
      closeSprintNotes();
      open.focus();
    };
    document.addEventListener('click', this._sprintNoteOutside);
    document.addEventListener('keydown', this._sprintNoteEsc);

    // 1. Salvar em PDF (diálogo nativo de impressão)
    const btnPdf = this.container.querySelector('#btn-save-pdf');
    if (btnPdf && this.data) {
      btnPdf.addEventListener('click', async () => {
        // Garante que o DOM reflete a visão ativa (?view=) antes de imprimir
        const rendered = this.container.querySelector('.view-proposta-wrapper')?.classList.contains('is-summary') ? 'resumido' : 'detalhado';
        if (rendered !== this.getViewMode()) {
          this.container.innerHTML = this.renderShell(this.data, this.renderBody(this.data));
          this.bindEvents();
        }
        this.closePrintLightbox();
        await this.loadPrintImages();
        const previousTitle = document.title;
        document.title = normalizeDashes(`Proposta Comercial ${this.data.meta.id} - Alvenius`);
        window.print();
        document.title = previousTitle;
      });
    }

    // 1.1 Prints anotados: lightbox ao clicar; impressão via Ctrl+P também carrega as imagens
    this.container.querySelectorAll('.print-item-open').forEach(btn => {
      btn.addEventListener('click', () => this.openPrintLightbox({
        views: (btn.dataset.printViews || '').split(';').filter(Boolean).map(entry => {
          const [key, label, src] = entry.split('|');
          return { key, label, src };
        }),
        device: btn.dataset.printDevice,
        title: btn.dataset.printTitle
      }, btn));
    });
    if (!this.beforePrintBound && typeof window !== 'undefined') {
      this.beforePrintBound = true;
      window.addEventListener('beforeprint', () => {
        if (!this.isMounted()) return;
        this.closePrintLightbox();
        this.loadPrintImages();
      });
    }

    // 2. Tentar novamente (estado de erro)
    const btnRetry = this.container.querySelector('#btn-retry-proposta');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => this.render());
    }

    // 3. Demo App (logo e link): mesmo destino do antigo "Voltar" (menu se logado, senão login)
    this.container.querySelectorAll('[data-bar-home]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        if (typeof this.options.onNavigate === 'function') {
          const savedUser = sessionStorage.getItem('app_user');
          let hasUser = false;
          try {
            hasUser = savedUser && JSON.parse(savedUser)?.isLoggedIn;
          } catch (err) {}
          this.options.onNavigate(hasUser ? 'menu' : 'login');
        }
      });
    });

    // 3.0 Seletor Detalhado/Resumido (persistido em ?view=)
    this.container.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.addEventListener('click', () => this.setViewMode(btn.dataset.viewMode));
    });

    // 3.1 Expandir/recolher cards de funcionalidades
    this.bindFeatureToggles();

    // 4. Navegação por tópicos (índice lateral, chips, FAB/sheet, voltar ao topo, scrollspy)
    this.setupToc();
  }
}
