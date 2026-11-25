/**
 * Tela de Caldeiraria - Alvenius
 * Responsabilidade Única: Acompanhamento de processos de caldeiraria, busca rápida,
 * acordeão retrátil dos 8 status com contadores, histórico de sucata e listagem de spools.
 */

import { getSpools, getCounters, statusDefinitions, updateSpoolStatus } from '../mocks/spools-mock.js';
import { toast } from '../components/toast.js';
import { lucide } from '../components/icons.js';

export class CaldeirariaView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.searchQuery = '';
    this.selectedStatusFilter = null;
    this.isAccordionOpen = true;
    this.showScrapHistory = false;
  }

  render() {
    if (!this.container) return;

    const countersData = getCounters();
    const spools = this.getFilteredSpools();

    this.container.innerHTML = `
      <div class="view-caldeiraria-container">

        <div class="card">
          
          <!-- Faixa Superior Cinza: Processo -->
          <div class="card-header-strip">
            <span class="card-header-title">Processo</span>
          </div>

          <div class="card-body">
            
            <!-- Barra de Mensagem Informativa (i) -->
            <div class="info-box">
              ${lucide('info', { size: 18, strokeWidth: 2 })}
              <span>Leitura Spool, iniciar, finalizar e executar processo produção.</span>
            </div>
            <div class="accent-line"></div>

            <!-- Barra de Busca Rápida e Botão Ler QRCode -->
            <div class="caldeiraria-search-bar">
              <div class="caldeiraria-search-input-wrapper">
                <span class="search-icon-left">
                  ${lucide('search', { size: 18, strokeWidth: 2 })}
                </span>
                <input 
                  type="text" 
                  id="caldeiraria-search-input" 
                  class="caldeiraria-search-input" 
                  placeholder="Buscar por código, status..." 
                  value="${this.searchQuery}"
                />
              </div>

              <!-- Botão Azul: Ler QRCode -->
              <button class="btn btn-primary" id="btn-caldeiraria-qrcode">
                ${lucide('qr-code', { size: 18, strokeWidth: 2 })}
                <span>Ler QRCode</span>
              </button>
            </div>

            <!-- Banner de Instrução em Destaque -->
            <div class="instruction-banner-highlight">
              ${lucide('info', { size: 18, strokeWidth: 2 })}
              <span>Clique no código SPOOL para continuar</span>
            </div>

            <!-- Acordeão Colapsável: PROCESSOS | QTD. -->
            <div class="process-accordion" id="process-accordion-block">
              <button class="accordion-header ${this.isAccordionOpen ? 'is-open' : ''}" id="btn-toggle-accordion" aria-expanded="${this.isAccordionOpen}">
                <div class="accordion-header-left">
                  <span class="accordion-icon-toggle">
                    ${this.isAccordionOpen ? lucide('chevron-up', { size: 16, strokeWidth: 2.5 }) : lucide('chevron-down', { size: 16, strokeWidth: 2.5 })}
                  </span>
                  <span class="accordion-title">PROCESSOS | QTD.</span>
                </div>
                <span class="accordion-badge-total">TOTAL [${countersData.total}]</span>
              </button>

              <div class="accordion-content ${this.isAccordionOpen ? 'is-open' : ''}" id="accordion-content-panel">
                <ul class="process-status-list">
                  ${this.renderStatusList(countersData)}
                </ul>

                <!-- Linha Rodapé do Painel: TOTAL [1099] -->
                <div class="process-total-footer-row">
                  <span class="total-footer-label">TOTAL</span>
                  <span class="total-footer-badge">[${countersData.total}]</span>
                </div>
              </div>
            </div>

            <!-- Toggle Switch Estilo iOS (Histórico de Sucata) -->
            <label class="toggle-wrapper" for="toggle-scrap-history">
              <span class="toggle-switch">
                <input type="checkbox" id="toggle-scrap-history" ${this.showScrapHistory ? 'checked' : ''} />
                <span class="toggle-slider"></span>
              </span>
              <span class="toggle-label-text">Click para exibir histórico de sucata</span>
            </label>

            <!-- Filtro Ativo (se houver) -->
            ${this.selectedStatusFilter ? `
              <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 13px; color: var(--color-text-muted);">Filtrado por:</span>
                <span class="badge-status ${this.selectedStatusFilter}">
                  ${statusDefinitions[this.selectedStatusFilter]?.label || this.selectedStatusFilter}
                </span>
                <button id="btn-clear-status-filter" style="font-size: 12px; color: var(--color-primary); cursor: pointer; text-decoration: underline;">
                  Remover filtro
                </button>
              </div>
            ` : ''}

            <!-- Lista de Cards de Spool -->
            <div class="spools-list-container" id="spools-list-container">
              ${this.renderSpoolCards(spools)}
            </div>

          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderStatusList(countersData) {
    const statuses = [
      { key: 'reservado', label: 'Reservado (aguardando início)', color: '#f1c40f', count: countersData.items.reservado },
      { key: 'execucao', label: 'Execução (em processo produção)', color: '#00bcd4', count: countersData.items.execucao },
      { key: 'pausado', label: 'Pausado (aguardando para continuar)', color: '#e67e22', count: countersData.items.pausado },
      { key: 'continua', label: 'Continua (retornar para execução)', color: '#95a5a6', count: countersData.items.continua },
      { key: 'finalizado', label: 'Finalizado (aguardando "Aprova CQ")', color: '#27ae60', count: countersData.items.finalizado },
      { key: 'reversivel', label: 'Reversível (retorna início processo.)', color: '#8bc34a', count: countersData.items.reversivel },
      { key: 'sucata', label: 'Sucata (descarte do produto)', color: '#e74c3c', count: countersData.items.sucata },
      { key: 'romaneio', label: 'Romaneio (aguardando próxima etapa)', color: '#0070ba', count: countersData.items.romaneio }
    ];

    return statuses.map(st => {
      const formattedCount = String(st.count).padStart(4, '0');
      const isSelected = this.selectedStatusFilter === st.key;
      return `
        <li class="process-status-item" data-filter-status="${st.key}" style="cursor: pointer; ${isSelected ? 'border-color: var(--color-primary); background-color: var(--color-primary-light);' : ''}">
          <div class="status-item-label">
            <span class="status-dot" style="background-color: ${st.color};"></span>
            <span>${st.label}</span>
          </div>
          <span class="status-count-badge">[${formattedCount}]</span>
        </li>
      `;
    }).join('');
  }

  renderSpoolCards(spools) {
    if (spools.length === 0) {
      return `
        <div class="empty-state-card">
          <p style="font-weight: 600; margin-bottom: 4px;">Nenhum spool encontrado</p>
          <p style="font-size: 13px;">Tente ajustar sua busca ou limpar os filtros de status.</p>
        </div>
      `;
    }

    return spools.map(spool => {
      const statusMeta = statusDefinitions[spool.status] || { shortLabel: spool.status, color: '#6c757d' };
      const hasScrap = spool.historicoSucata && spool.historicoSucata.length > 0;
      const scrapCount = hasScrap ? String(spool.historicoSucata.length).padStart(2, '0') : '00';

      return `
        <div class="spool-card" data-spool-id="${spool.id}" data-spool-code="${spool.codigo}">
          <!-- Cabeçalho do Card: Sequencial + Badge de Status -->
          <div class="spool-card-header">
            <span class="spool-seq-badge">${spool.sequencial}</span>
            <span class="badge-status ${spool.status}">
              ${statusMeta.shortLabel}
            </span>
          </div>

          <div class="spool-card-body">
            <!-- Linha do Código do Spool com label 'Código: ' -->
            <div class="spool-code-row">
              <span class="spool-code-label">Código:</span>
              <a href="#" class="spool-code-link" data-code="${spool.codigo}" title="Clique no código SPOOL para continuar">
                ${spool.codigo}
              </a>
            </div>

            <!-- Linha de Datas com Ícones de Calendário Oficiais Lucide -->
            <div class="spool-dates-row">
              <span class="spool-date-item">${lucide('calendar', { size: 14, strokeWidth: 2 })} <strong>Início:</strong> ${spool.inicio}</span>
              <span class="spool-date-item">${lucide('calendar', { size: 14, strokeWidth: 2 })} <strong>Finalizado:</strong> ${spool.finalizado}</span>
            </div>

            <!-- Descrição Técnica -->
            <div class="spool-desc-text">
              ${spool.descricao}
            </div>

            <!-- Histórico de Sucata -->
            <div style="font-size: 13px; color: var(--color-text-muted); margin-top: 6px;">
              <span>${scrapCount} Histórico de sucata:</span>
            </div>

            ${(this.showScrapHistory && hasScrap) ? `
              <div class="spool-scrap-history">
                <div class="spool-scrap-title">
                  ${lucide('circle-alert', { size: 14, strokeWidth: 2 })}
                  <span>Registro de Não-Conformidade / Sucata:</span>
                </div>
                ${spool.historicoSucata.map(h => `
                  <div>&bull; <strong>${h.data}</strong> [${h.usuario}]: ${h.motivo}</div>
                `).join('')}
              </div>
            ` : ''}

          </div>
        </div>
      `;
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
        s.codigo.toLowerCase().includes(q) ||
        s.descricao.toLowerCase().includes(q) ||
        s.status.toLowerCase().includes(q) ||
        s.sequencial.includes(q)
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
        const listContainer = this.container.querySelector('#spools-list-container');
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

    // Toggle Acordeão
    const btnAccordion = this.container.querySelector('#btn-toggle-accordion');
    const accordionContent = this.container.querySelector('#accordion-content-panel');
    if (btnAccordion && accordionContent) {
      btnAccordion.addEventListener('click', () => {
        this.isAccordionOpen = !this.isAccordionOpen;
        btnAccordion.classList.toggle('is-open', this.isAccordionOpen);
        accordionContent.classList.toggle('is-open', this.isAccordionOpen);
        btnAccordion.setAttribute('aria-expanded', String(this.isAccordionOpen));
      });
    }

    // Toggle Histórico de Sucata
    const toggleScrap = this.container.querySelector('#toggle-scrap-history');
    if (toggleScrap) {
      toggleScrap.addEventListener('change', (e) => {
        this.showScrapHistory = e.target.checked;
        const listContainer = this.container.querySelector('#spools-list-container');
        if (listContainer) {
          listContainer.innerHTML = this.renderSpoolCards(this.getFilteredSpools());
          this.bindCardClicks();
        }
        if (this.showScrapHistory) {
          toast.info('Histórico de Sucata', 'Exibindo detalhes de não-conformidade nos spools com ocorrências.');
        }
      });
    }

    // Clique nos status do acordeão para filtrar
    const statusItems = this.container.querySelectorAll('[data-filter-status]');
    statusItems.forEach(item => {
      item.addEventListener('click', () => {
        const statusKey = item.getAttribute('data-filter-status');
        if (this.selectedStatusFilter === statusKey) {
          this.selectedStatusFilter = null; // desmarca se clicar de novo
        } else {
          this.selectedStatusFilter = statusKey;
        }
        this.render();
      });
    });

    // Remover filtro
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
    const codeLinks = this.container.querySelectorAll('.spool-code-link');
    codeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const code = link.getAttribute('data-code');
        toast.info(
          `Spool ${code}`,
          'Próxima etapa: Ler QRCode para avançar no processo produtivo ou criar transferência.'
        );
        if (typeof this.options.onSpoolSelected === 'function') {
          this.options.onSpoolSelected(code);
        }
      });
    });
  }
}
