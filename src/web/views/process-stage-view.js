/**
 * Classe Base ProcessStageView - Alvenius Spool Management
 * Responsabilidade Única: Abstração e encapsulamento de todas as telas de etapas industriais
 * (Caldeiraria, Revestimento, Pintura), padronizando ciclo de vida, filtros, acordeão de contadores,
 * histórico de sucata, modais e integração com o leitor de QR Code.
 */

import { getSpoolsByProject, getCountersByProject, statusDefinitions, getSpoolByCode, updateSpoolStatus } from '../mocks/spools-mock.js';
import { getActiveProject, getProjectRef } from '../mocks/projects-mock.js';
import { ProjectTag } from '../components/project-tag.js';
import { toast } from '../components/toast.js';
import { lucide } from '../components/icons.js';
import { PageContainer } from '../components/page-container.js';
import { PageTitle } from '../components/page-title.js';
import { SpoolCard } from '../components/spool-card.js';
import { ProcessesAccordionComponent } from '../components/processes-accordion.js';
import { ModalRomaneioComponent } from '../components/modal-romaneio.js';
import { ModalQrCodeComponent } from '../components/modal-qrcode.js';

export class ProcessStageView {
  constructor(containerId = 'app-view', options = {}, stageConfig = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;

    this.stageKey = stageConfig.stageKey || 'caldeiraria';
    this.stageTitle = stageConfig.stageTitle || 'Caldeiraria';
    this.bannerDescription = stageConfig.bannerDescription || 'Leitura Spool, iniciar, finalizar e executar processo produção.';
    this.containerClass = stageConfig.containerClass || `view-${this.stageKey}-container`;
    this.cardClass = stageConfig.cardClass || `card-${this.stageKey}`;
    this.toastUpdatedTitle = stageConfig.toastUpdatedTitle || `${this.stageTitle} Atualizado`;
    this.toastStartedTitle = stageConfig.toastStartedTitle || `${this.stageTitle} Iniciado`;

    this.searchQuery = '';
    this.selectedStatusFilter = null;
    this.isAccordionOpen = false;
    this.showScrapHistory = false;
    this.modalQrCode = new ModalQrCodeComponent('modal-root');
  }

  render() {
    if (!this.container) return;

    // Define o título oficial na pill superior
    PageTitle.setTitle(this.stageTitle);

    const countersData = getCountersByProject(this.stageKey, getActiveProject()?.id);
    const spools = this.getFilteredSpools();

    const content = `
      <!-- Projeto ativo da etapa -->
      <div class="project-context-bar stage-project-bar">
        ${ProjectTag.renderRow(getProjectRef(getActiveProject()), { label: 'Projeto ativo:' })}
      </div>

      <!-- Linha de Busca Rápida + Botão Ler QRCode -->
      <div class="caldeiraria-search-row">
        <div class="caldeiraria-search-box">
          <span class="caldeiraria-search-icon">
            ${lucide('search', { size: 18, stroke: '#9ca3af', strokeWidth: 2 })}
          </span>
          <input 
            type="text" 
            id="${this.stageKey}-search-input" 
            class="caldeiraria-search-input" 
            placeholder="Buscar por código, statu" 
            value="${this.searchQuery}"
            autocomplete="off"
          />
        </div>

        <!-- Botão Azul: Ler QRCode -->
        <button class="btn-caldeiraria-qrcode" id="btn-${this.stageKey}-qrcode" type="button" title="Ler QRCode">
          <span class="btn-caldeiraria-qrcode-icon">
            ${lucide('qr-code', { size: 20, stroke: '#ffffff', strokeWidth: 2 })}
          </span>
          <div class="btn-caldeiraria-qrcode-label">
            <span>Ler</span>
            <span>QRCode</span>
          </div>
        </button>
      </div>

      <!-- Card de Instrução em Destaque -->
      <div class="caldeiraria-instruction-card">
        <span class="instruction-line-1">Clique no código SPOOL para</span>
        <span class="instruction-line-2">continuar</span>
      </div>

      <!-- Bloco de Processos e Contadores (Acordeão Reutilizável) -->
      ${ProcessesAccordionComponent.render({
        isOpen: this.isAccordionOpen,
        selectedStatusFilter: this.selectedStatusFilter,
        countersData,
        idPrefix: this.stageKey
      })}

      <!-- Switch "Click para exibir histórico de sucata" -->
      <div class="caldeiraria-scrap-toggle-row">
        <div class="scrap-toggle-text">
          <span>Click para exibir histórico de</span>
          <span>sucata</span>
        </div>
        <label class="scrap-switch-label" for="toggle-${this.stageKey}-scrap">
          <input 
            type="checkbox" 
            id="toggle-${this.stageKey}-scrap" 
            class="scrap-switch-input" 
            ${this.showScrapHistory ? 'checked' : ''} 
          />
          <span class="scrap-switch-track">
            <span class="scrap-switch-thumb"></span>
          </span>
        </label>
      </div>

      <!-- Indicador de Filtro Ativo (se houver) -->
      ${this.selectedStatusFilter ? `
        <div class="caldeiraria-active-filter-bar">
          <span class="filter-bar-label">Filtro ativo:</span>
          <span class="filter-bar-tag">${statusDefinitions[this.selectedStatusFilter]?.label || this.selectedStatusFilter}</span>
          <button type="button" class="btn-clear-status-filter" id="btn-clear-${this.stageKey}-filter">Remover</button>
        </div>
      ` : ''}

      <!-- Lista de Cards de Spool -->
      <div class="caldeiraria-spools-list" id="${this.stageKey}-spools-list">
        ${this.renderSpoolCards(spools)}
      </div>
    `;

    this.container.innerHTML = PageContainer.render({
      bannerTitle: 'Processo',
      bannerDescription: `<span class="caldeiraria-banner-text">${this.bannerDescription}</span>`,
      content,
      footerActions: '',
      containerClass: this.containerClass,
      cardClass: this.cardClass
    });

    this.bindEvents();
  }

  renderSpoolCards(spools) {
    if (!spools || spools.length === 0) {
      return `
        <div class="caldeiraria-empty-state">
          <p class="empty-state-title">Nenhum spool encontrado</p>
          <p class="empty-state-subtitle">${this.getProjectSpools().length
            ? 'Tente ajustar o termo da busca ou remover o filtro de status selecionado.'
            : 'O projeto ativo ainda não possui spools nesta etapa.'}</p>
        </div>
      `;
    }

    const cap = this.stageKey.charAt(0).toUpperCase() + this.stageKey.slice(1);
    const inicioKey = `inicio${cap}`;
    const finalizadoKey = `finalizado${cap}`;

    return spools.map(spool => {
      const spoolData = {
        ...spool,
        inicio: spool[inicioKey] || spool.inicio || '-- / -- / ---- às -- : --',
        finalizado: spool[finalizadoKey] || spool.finalizado || '-- / -- / ---- às -- : --'
      };

      return SpoolCard.render(spoolData, {
        showScrapHistory: this.showScrapHistory
      });
    }).join('');
  }

  /** Spools da etapa pertencentes ao projeto ativo */
  getProjectSpools() {
    return getSpoolsByProject(this.stageKey, getActiveProject()?.id);
  }

  getFilteredSpools() {
    let list = this.getProjectSpools();

    if (this.selectedStatusFilter) {
      list = list.filter(s => s.status === this.selectedStatusFilter);
    }

    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(s => 
        (s.codigo && s.codigo.toLowerCase().includes(q)) ||
        (s.descricao && s.descricao.toLowerCase().includes(q)) ||
        (s.status && s.status.toLowerCase().includes(q)) ||
        (s.sequencial && s.sequencial.includes(q))
      );
    }

    return list;
  }

  getEligibleSpool() {
    const spools = this.getFilteredSpools();
    const priority = ['reservado', 'execucao', 'pausado', 'continua', 'finalizado', 'reversivel'];

    for (const st of priority) {
      const found = spools.find(s => s.status === st);
      if (found) return found;
    }

    const all = this.getProjectSpools();
    for (const st of priority) {
      const found = all.find(s => s.status === st);
      if (found) return found;
    }

    return spools[0] || all[0] || null;
  }

  bindEvents() {
    if (!this.container) return;

    // Busca reativa em tempo real
    const searchInput = this.container.querySelector(`#${this.stageKey}-search-input`);
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const listContainer = this.container.querySelector(`#${this.stageKey}-spools-list`);
        if (listContainer) {
          listContainer.innerHTML = this.renderSpoolCards(this.getFilteredSpools());
          this.bindCardClicks();
        }
      });
    }

    // Botão Ler QRCode
    const btnQrCode = this.container.querySelector(`#btn-${this.stageKey}-qrcode`);
    if (btnQrCode) {
      btnQrCode.addEventListener('click', () => {
        const eligibleSpool = this.getEligibleSpool();
        this.openStageQrCodeModal(eligibleSpool);
      });
    }

    // Toggle do Acordeão de Processos
    const btnAccordion = this.container.querySelector(`#btn-toggle-${this.stageKey}-processes-accordion`);
    if (btnAccordion) {
      btnAccordion.addEventListener('click', () => {
        this.isAccordionOpen = !this.isAccordionOpen;
        const block = this.container.querySelector(`#${this.stageKey}-processes-block`);
        const panel = this.container.querySelector(`#${this.stageKey}-processes-accordion-panel`);
        const chevronBox = btnAccordion.querySelector('.processes-chevron-box');

        if (block) block.classList.toggle('is-open', this.isAccordionOpen);
        if (panel) panel.classList.toggle('is-open', this.isAccordionOpen);
        if (chevronBox) {
          chevronBox.innerHTML = this.isAccordionOpen
            ? lucide('chevron-up', { size: 14, stroke: '#1e293b', strokeWidth: 2.5 })
            : lucide('chevron-down', { size: 14, stroke: '#1e293b', strokeWidth: 2.5 });
        }
        btnAccordion.setAttribute('aria-expanded', String(this.isAccordionOpen));
      });
    }

    // Switch Histórico de Sucata
    const toggleScrap = this.container.querySelector(`#toggle-${this.stageKey}-scrap`);
    if (toggleScrap) {
      toggleScrap.addEventListener('change', (e) => {
        this.showScrapHistory = e.target.checked;
        const listContainer = this.container.querySelector(`#${this.stageKey}-spools-list`);
        if (listContainer) {
          listContainer.innerHTML = this.renderSpoolCards(this.getFilteredSpools());
          this.bindCardClicks();
        }
        if (this.showScrapHistory) {
          toast.info('Histórico de Sucata', 'Exibindo registro de não-conformidade nos spools.');
        }
      });
    }

    // Cliques nos itens de status para filtrar
    const statusItems = this.container.querySelectorAll('[data-filter-status]');
    statusItems.forEach(item => {
      item.addEventListener('click', () => {
        const statusKey = item.getAttribute('data-filter-status');
        if (this.selectedStatusFilter === statusKey) {
          this.selectedStatusFilter = null;
        } else {
          this.selectedStatusFilter = statusKey;
        }
        this.render();
      });
    });

    // Botão de remover filtro ativo
    const btnClearFilter = this.container.querySelector(`#btn-clear-${this.stageKey}-filter`);
    if (btnClearFilter) {
      btnClearFilter.addEventListener('click', () => {
        this.selectedStatusFilter = null;
        this.render();
      });
    }

    this.bindCardClicks();
  }

  bindCardClicks() {
    if (!this.container) return;

    const cards = this.container.querySelectorAll('.spool-item-card');
    cards.forEach(card => {
      const handleCardAction = () => {
        const code = card.getAttribute('data-spool-code');
        const status = card.getAttribute('data-spool-status');

        if (status === 'romaneio') {
          ModalRomaneioComponent.open();
          return;
        }

        const spool = getSpoolByCode(code, this.stageKey);
        this.openStageQrCodeModal(spool);
      };

      card.addEventListener('click', handleCardAction);

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardAction();
        }
      });
    });
  }

  /** Bloqueia movimentação de spool que não pertence ao projeto ativo */
  ensureSpoolInProject(spool) {
    const project = getActiveProject();
    if (spool && project && spool.projetoId === project.id) return true;
    toast.warning('Spool de outro projeto', `Spool ${spool?.codigo || ''} pertence ao projeto ${spool?.projetoCodigo || 'não identificado'}.`);
    return false;
  }

  openStageQrCodeModal(spool) {
    const targetSpool = spool || this.getEligibleSpool();
    if (!targetSpool) return;

    if (!this.modalQrCode) {
      this.modalQrCode = new ModalQrCodeComponent('modal-root');
    }

    this.modalQrCode.open({
      mode: this.stageKey,
      spool: targetSpool,
      isScanned: false,
      onAction: (target, actionConfig) => {
        if (!this.ensureSpoolInProject(target)) return;
        const nextStatus = actionConfig?.nextStatus || 'execucao';
        updateSpoolStatus(target.codigo, nextStatus, this.stageTitle, getProjectRef(getActiveProject()));

        const title = actionConfig?.toastTitle || this.toastUpdatedTitle;
        const msg = typeof actionConfig?.toastMessage === 'function'
          ? actionConfig.toastMessage(target.codigo)
          : `Spool ${target.codigo} avançou para ${nextStatus}.`;

        toast.success(title, msg);
        this.render();
      },
      onStart: (target, actionConfig) => {
        if (!this.ensureSpoolInProject(target)) return;
        const nextStatus = actionConfig?.nextStatus || 'execucao';
        updateSpoolStatus(target.codigo, nextStatus, this.stageTitle, getProjectRef(getActiveProject()));

        const title = actionConfig?.toastTitle || this.toastStartedTitle;
        const msg = typeof actionConfig?.toastMessage === 'function'
          ? actionConfig.toastMessage(target.codigo)
          : `Spool ${target.codigo} avançou para ${nextStatus}.`;

        toast.success(title, msg);
        this.render();
      }
    });
  }
}
