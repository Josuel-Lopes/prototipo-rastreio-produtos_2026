/**
 * Componente ProcessesAccordionComponent - Alvenius Spool Management
 * Responsabilidade Única: Renderização e controle de estado do acordeão retrátil
 * de contadores de processos produtivos industriais (8 status normatizados).
 */

import { lucide } from './icons.js';
import { getCounters } from '../mocks/spools-mock.js';

export const PROCESS_STATUSES = [
  { key: 'reservado', name: 'Reservado', sub: '(aguardando início)', color: '#f59e0b' },
  { key: 'execucao', name: 'Execução', sub: '(em processo produção)', color: '#00bcd4' },
  { key: 'pausado', name: 'Pausado', sub: '(aguardando para continuar)', color: '#f97316' },
  { key: 'continua', name: 'Continua', sub: '(retornar para execução)', color: '#9ca3af' },
  { key: 'finalizado', name: 'Finalizado', sub: '(aguardando "Aprova CQ")', color: '#22c55e' },
  { key: 'reversivel', name: 'Reversível', sub: '(retorna início processo.)', color: '#84cc16' },
  { key: 'sucata', name: 'Sucata', sub: '(descarte do produto)', color: '#f87171' },
  { key: 'romaneio', name: 'Romaneio', sub: '(aguardando próxima etapa)', color: '#0284c7' }
];

export class ProcessesAccordionComponent {
  /**
   * Renderiza os itens de status com seus contadores e estilos
   */
  static renderStatusList(countersData = null, selectedStatusFilter = null) {
    const data = countersData || getCounters();

    return PROCESS_STATUSES.map(st => {
      const count = (data && data.items && data.items[st.key] !== undefined) ? data.items[st.key] : 0;
      const formattedCount = String(count).padStart(4, '0');
      const isSelected = selectedStatusFilter === st.key;

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

  /**
   * Renderiza a estrutura completa do acordeão retrátil
   */
  static render({
    isOpen = false,
    selectedStatusFilter = null,
    countersData = null,
    idPrefix = 'processes'
  } = {}) {
    const data = countersData || getCounters();
    const totalCount = data?.total ?? '0000';

    return `
      <!-- Bloco de Processos e Contadores (Acordeão) -->
      <div class="caldeiraria-processes-block ${isOpen ? 'is-open' : ''}" id="${idPrefix}-processes-block">
        <!-- Cabeçalho com Chevron à esquerda, PROCESSOS ao centro e QTD. à direita -->
        <div class="processes-block-header" id="btn-toggle-${idPrefix}-processes-accordion" role="button" tabindex="0" aria-expanded="${isOpen}">
          <div class="processes-chevron-box">
            ${isOpen 
              ? lucide('chevron-up', { size: 14, stroke: '#1e293b', strokeWidth: 2.5 }) 
              : lucide('chevron-down', { size: 14, stroke: '#1e293b', strokeWidth: 2.5 })}
          </div>
          <span class="processes-title-label">PROCESSOS</span>
          <span class="processes-qtd-label">QTD.</span>
        </div>

        <!-- Painel Expansível com os 8 Status -->
        <div class="processes-accordion-panel ${isOpen ? 'is-open' : ''}" id="${idPrefix}-processes-accordion-panel">
          <ul class="processes-status-list">
            ${ProcessesAccordionComponent.renderStatusList(data, selectedStatusFilter)}
          </ul>
        </div>

        <!-- Linha TOTAL com Badge Azul -->
        <div class="processes-total-row">
          <span class="processes-total-label">TOTAL</span>
          <span class="processes-total-badge">${totalCount}</span>
        </div>
      </div>
    `;
  }
}
