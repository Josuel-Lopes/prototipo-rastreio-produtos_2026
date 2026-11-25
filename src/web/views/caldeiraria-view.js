/**
 * Tela de Caldeiraria - Alvenius Spool Management
 * Responsabilidade Única: Acompanhamento de processos de caldeiraria, busca rápida,
 * acordeão retrátil de processos, histórico de sucata e listagem de spools.
 * Fidelidade visual absoluta a copilot-image-177404.png
 */

import { getSpools, getCounters, statusDefinitions } from '../mocks/spools-mock.js';
import { toast } from '../components/toast.js';
import { lucide } from '../components/icons.js';
import { PageContainer } from '../components/page-container.js';
import { PageTitle } from '../components/page-title.js';
import { SpoolCard } from '../components/spool-card.js';

export class CaldeirariaView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.searchQuery = '';
    this.selectedStatusFilter = null;
    this.isAccordionOpen = false; // Fechado por padrão conforme print de referência
    this.showScrapHistory = false;
  }

  render() {
    if (!this.container) return;

    // Garante que o título na pill flutuante central seja "Caldeiraria"
    PageTitle.setTitle('Caldeiraria');

    const countersData = getCounters();
    const spools = this.getFilteredSpools();

    // Conteúdo principal para dentro do card padrão
    const content = `
      <!-- Linha de Busca Rápida + Botão Ler QRCode -->
      <div class="caldeiraria-search-row">
        <div class="caldeiraria-search-box">
          <span class="caldeiraria-search-icon">
            ${lucide('search', { size: 18, stroke: '#9ca3af', strokeWidth: 2 })}
          </span>
          <input 
            type="text" 
            id="caldeiraria-search-input" 
            class="caldeiraria-search-input" 
            placeholder="Buscar por código, statu" 
            value="${this.searchQuery}"
            autocomplete="off"
          />
        </div>

        <!-- Botão Azul: Ler QRCode (2 linhas verticais de texto) -->
        <button class="btn-caldeiraria-qrcode" id="btn-caldeiraria-qrcode" type="button" title="Ler QRCode">
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

      <!-- Bloco de Processos e Contadores (Acordeão) -->
      <div class="caldeiraria-processes-block ${this.isAccordionOpen ? 'is-open' : ''}" id="caldeiraria-processes-block">
        <!-- Cabeçalho com Chevron à esquerda, PROCESSOS ao centro e QTD. à direita -->
        <div class="processes-block-header" id="btn-toggle-processes-accordion" role="button" tabindex="0" aria-expanded="${this.isAccordionOpen}">
          <div class="processes-chevron-box">
            ${this.isAccordionOpen 
              ? lucide('chevron-up', { size: 14, stroke: '#1e293b', strokeWidth: 2.5 }) 
              : lucide('chevron-down', { size: 14, stroke: '#1e293b', strokeWidth: 2.5 })}
          </div>
          <span class="processes-title-label">PROCESSOS</span>
          <span class="processes-qtd-label">QTD.</span>
        </div>

        <!-- Painel Expansível com os 8 Status -->
        <div class="processes-accordion-panel ${this.isAccordionOpen ? 'is-open' : ''}" id="processes-accordion-panel">
          <ul class="processes-status-list">
            ${this.renderStatusList(countersData)}
          </ul>
        </div>

        <!-- Linha TOTAL com Badge Azul -->
        <div class="processes-total-row">
          <span class="processes-total-label">TOTAL</span>
          <span class="processes-total-badge">${countersData.total}</span>
        </div>
      </div>

      <!-- Switch "Click para exibir histórico de sucata" -->
      <div class="caldeiraria-scrap-toggle-row">
        <div class="scrap-toggle-text">
          <span>Click para exibir histórico de</span>
          <span>sucata</span>
        </div>
        <label class="scrap-switch-label" for="toggle-caldeiraria-scrap">
          <input 
            type="checkbox" 
            id="toggle-caldeiraria-scrap" 
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
          <button type="button" class="btn-clear-status-filter" id="btn-clear-status-filter">Remover</button>
        </div>
      ` : ''}

      <!-- Lista de Cards de Spool -->
      <div class="caldeiraria-spools-list" id="caldeiraria-spools-list">
        ${this.renderSpoolCards(spools)}
      </div>
    `;

    // Renderiza a casca padronizada via PageContainer
    this.container.innerHTML = PageContainer.render({
      bannerTitle: 'Processo',
      bannerDescription: '<span class="caldeiraria-banner-text">Leitura Spool, iniciar, finalizar e executar processo produção.</span>',
      content,
      footerActions: '',
      containerClass: 'view-caldeiraria-container',
      cardClass: 'card-caldeiraria'
    });

    this.bindEvents();
  }

  renderStatusList(countersData) {
    const statuses = [
      { key: 'reservado', name: 'Reservado', sub: '(aguardando início)', color: '#f59e0b', count: countersData.items.reservado },
      { key: 'execucao', name: 'Execução', sub: '(em processo produção)', color: '#00bcd4', count: countersData.items.execucao },
      { key: 'pausado', name: 'Pausado', sub: '(aguardando para continuar)', color: '#f97316', count: countersData.items.pausado },
      { key: 'continua', name: 'Continua', sub: '(retornar para execução)', color: '#9ca3af', count: countersData.items.continua },
      { key: 'finalizado', name: 'Finalizado', sub: '(aguardando "Aprova CQ")', color: '#22c55e', count: countersData.items.finalizado },
      { key: 'reversivel', name: 'Reversível', sub: '(retorna início processo.)', color: '#84cc16', count: countersData.items.reversivel },
      { key: 'sucata', name: 'Sucata', sub: '(descarte do produto)', color: '#f87171', count: countersData.items.sucata },
      { key: 'romaneio', name: 'Romaneio', sub: '(aguardando próxima etapa)', color: '#0284c7', count: countersData.items.romaneio }
    ];

    return statuses.map(st => {
      const formattedCount = String(st.count).padStart(4, '0');
      const isSelected = this.selectedStatusFilter === st.key;
      return `
        <li class="process-status-item ${isSelected ? 'is-selected' : ''}" data-filter-status="${st.key}">
          <div class="status-item-label">
            <span class="status-dot" style="background-color: ${st.color};"></span>
            <div class="status-name-group">
              <strong class="status-name-title">${st.name}</strong>
              <span class="status-name-sub">${st.sub}</span>
            </div>
          </div>
          <span class="status-count-badge">${formattedCount}</span>
        </li>
      `;
    }).join('');
  }

  renderSpoolCards(spools) {
    if (spools.length === 0) {
      return `
        <div class="caldeiraria-empty-state">
          <p class="empty-state-title">Nenhum spool encontrado</p>
          <p class="empty-state-subtitle">Tente ajustar o termo da busca ou remover o filtro de status selecionado.</p>
        </div>
      `;
    }

    return spools.map(spool => {
      // No print de caldeiraria, os campos de Início e Finalizado exibem '-- / -- / ---- às -- : --' para spools aguardando a etapa
      const spoolData = {
        ...spool,
        inicio: spool.inicioCaldeiraria || '-- / -- / ---- às -- : --',
        finalizado: spool.finalizadoCaldeiraria || '-- / -- / ---- às -- : --'
      };

      return SpoolCard.render(spoolData, {
        showScrapHistory: this.showScrapHistory
      });
    }).join('');
  }

  getFilteredSpools() {
    let list = getSpools();

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

  bindEvents() {
    // Busca em tempo real
    const searchInput = this.container.querySelector('#caldeiraria-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const listContainer = this.container.querySelector('#caldeiraria-spools-list');
        if (listContainer) {
          listContainer.innerHTML = this.renderSpoolCards(this.getFilteredSpools());
          this.bindCardClicks();
        }
      });
    }

    // Botão Ler QRCode
    const btnQrCode = this.container.querySelector('#btn-caldeiraria-qrcode');
    if (btnQrCode) {
      btnQrCode.addEventListener('click', () => {
        if (typeof this.options.onOpenQrCode === 'function') {
          this.options.onOpenQrCode((scannedCode, spool) => {
            this.searchQuery = scannedCode;
            const input = this.container.querySelector('#caldeiraria-search-input');
            if (input) input.value = scannedCode;
            this.render();
          });
        }
      });
    }

    // Toggle do Acordeão de Processos
    const btnAccordion = this.container.querySelector('#btn-toggle-processes-accordion');
    if (btnAccordion) {
      btnAccordion.addEventListener('click', () => {
        this.isAccordionOpen = !this.isAccordionOpen;
        const block = this.container.querySelector('#caldeiraria-processes-block');
        const panel = this.container.querySelector('#processes-accordion-panel');
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

    // Toggle Histórico de Sucata
    const toggleScrap = this.container.querySelector('#toggle-caldeiraria-scrap');
    if (toggleScrap) {
      toggleScrap.addEventListener('change', (e) => {
        this.showScrapHistory = e.target.checked;
        const listContainer = this.container.querySelector('#caldeiraria-spools-list');
        if (listContainer) {
          listContainer.innerHTML = this.renderSpoolCards(this.getFilteredSpools());
          this.bindCardClicks();
        }
        if (this.showScrapHistory) {
          toast.info('Histórico de Sucata', 'Exibindo registro de não-conformidade nos spools.');
        }
      });
    }

    // Clique nos status do acordeão para filtrar
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

    // Remover filtro de status ativo
    const btnClearFilter = this.container.querySelector('#btn-clear-status-filter');
    if (btnClearFilter) {
      btnClearFilter.addEventListener('click', () => {
        this.selectedStatusFilter = null;
        this.render();
      });
    }

    this.bindCardClicks();
  }

  bindCardClicks() {
    // Clique em qualquer parte do Card de Spool
    const cards = this.container.querySelectorAll('.spool-item-card');
    cards.forEach(card => {
      const handleCardAction = () => {
        const code = card.getAttribute('data-spool-code');
        const status = card.getAttribute('data-spool-status');

        if (status === 'romaneio') {
          // Status Romaneio: Alert/Modal customizado com design industrial Alvenius
          this.showRomaneioModal();
          return;
        }

        // Demais status: executa continuidade e seleção do Spool
        toast.info(
          `Spool ${code}`,
          'Clique no botão Ler QRCode para validar ou avance para transferência.'
        );
        if (typeof this.options.onSpoolSelected === 'function') {
          this.options.onSpoolSelected(code);
        }
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

  /**
   * Exibe modal dialog customizado para status Romaneio
   */
  showRomaneioModal() {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      toast.warning('Romaneio', 'Processo concluido aguardando Romaneio');
      return;
    }

    modalRoot.classList.add('has-modal');
    modalRoot.innerHTML = `
      <div class="modal-backdrop" id="romaneio-alert-backdrop">
        <div class="modal-dialog modal-alert-dialog" role="dialog" aria-modal="true" aria-labelledby="romaneio-alert-title">
          <div class="modal-header modal-alert-header">
            <div class="modal-alert-header-info">
              <span class="modal-alert-icon">
                ${lucide('info', { size: 20, stroke: '#1956ce', strokeWidth: 2.2 })}
              </span>
              <h3 class="modal-alert-title" id="romaneio-alert-title">Romaneio</h3>
            </div>
            <button class="modal-alert-close-btn" id="romaneio-alert-btn-close" aria-label="Fechar" title="Fechar modal">
              ${lucide('x', { size: 16, stroke: '#64748b', strokeWidth: 2.2 })}
            </button>
          </div>
          <div class="modal-body modal-alert-body">
            <p class="modal-alert-message">Processo concluido aguardando Romaneio</p>
          </div>
          <div class="modal-footer modal-alert-footer">
            <button type="button" class="btn-modal-alert-ok" id="romaneio-alert-btn-ok">OK</button>
          </div>
        </div>
      </div>
    `;

    const closeModal = () => {
      modalRoot.innerHTML = '';
      modalRoot.classList.remove('has-modal');
      document.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    const btnOk = modalRoot.querySelector('#romaneio-alert-btn-ok');
    const btnClose = modalRoot.querySelector('#romaneio-alert-btn-close');
    const backdrop = modalRoot.querySelector('#romaneio-alert-backdrop');

    if (btnOk) btnOk.addEventListener('click', closeModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }

    if (btnOk) {
      setTimeout(() => btnOk.focus(), 50);
    }
  }
}
