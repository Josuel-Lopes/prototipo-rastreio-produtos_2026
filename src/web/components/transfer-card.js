/**
 * Componente TransferCard - Alvenius Spool Management
 * Responsabilidade Única: Renderização fiel do card de Transferência de Componentes e Spools
 * Fidelidade visual absoluta aos layouts de referência copilot-image-85fa22.png e copilot-image-93dd6b.png
 * Reutilizável tanto para "componente" quanto para "spool"
 */

import { lucide } from './icons.js';
import { PIPELINE_STAGES } from '../mocks/transfers-mock.js';

export class TransferCard {
  /**
   * Renderiza a marcação HTML de uma Transferência
   * @param {object} transfer - Objeto da transferência
   * @param {object} [options] - Opções de renderização
   * @param {string} [options.tipo='componente'] - 'componente' ou 'spool'
   * @param {boolean} [options.isExpanded=false] - Se a lista de componentes/spools está aberta
   * @returns {string} HTML do card
   */
  static render(transfer, options = {}) {
    const tipo = options.tipo || transfer.tipo || 'componente';
    const isExpanded = Boolean(options.isExpanded);

    const isComponente = tipo === 'componente';
    const itemsLabel = isComponente ? 'Componente:' : 'Spools:';

    const statusCor = transfer.statusCor || '#f59e0b';
    const etapaAtual = Number(transfer.etapaAtual || 1);

    // Itens vinculados (suporta itens ou spools)
    const itens = Array.isArray(transfer.itens) && transfer.itens.length > 0
      ? transfer.itens
      : (Array.isArray(transfer.spools) ? transfer.spools : []);

    // Renderiza a lista de itens vinculados
    const itemsListHtml = itens.map(item => {
      if (tipo === 'spool') {
        const spoolCode = (typeof item === 'object' && item !== null) ? (item.codigo || '') : String(item);
        return `
      <div class="transfer-item-code-entry">
        <span class="transfer-item-entry-label">codigo:</span> <span class="transfer-item-entry-code">${spoolCode}</span>
      </div>`;
      }

      return `
      <div class="transfer-item-code-entry">
        <span class="transfer-item-entry-label">codigo:</span>
        <span class="transfer-item-entry-code">${item.codigo}</span>
        ${item.descricao ? `<span class="transfer-item-entry-desc">- ${item.descricao}</span>` : ''}
        ${item.quantidade ? `<span class="transfer-item-entry-qty">(${item.quantidade}x)</span>` : ''}
      </div>`;
    }).join('');

    // Renderiza o pipeline de chevrons
    const pipelineHtml = PIPELINE_STAGES.map((stage) => {
      const isPast = stage.id < etapaAtual;
      const isCurrent = stage.id === etapaAtual;
      const isFuture = stage.id > etapaAtual;

      let stepClass = 'pipeline-step';
      let bgColor = '#e5e7eb';
      let textColor = '#4b5563';

      if (isCurrent) {
        stepClass += ' is-current';
        bgColor = stage.color;
        textColor = '#ffffff';
      } else if (isPast) {
        stepClass += ' is-past';
        bgColor = stage.color;
        textColor = '#ffffff';
      } else {
        stepClass += ' is-future';
        bgColor = '#e5e7eb';
        textColor = '#6b7280';
      }

      const style = `background-color: ${bgColor}; color: ${textColor};`;

      return `
        <div class="${stepClass}" style="${style}" title="${stage.label} ${isCurrent ? '(Etapa Atual)' : ''}">
          <span class="pipeline-step-text">${stage.label}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="transfer-item-card" data-transfer-id="${transfer.id}" data-transfer-type="${tipo}">
        <!-- Linha 1: Sequencial + Badge de Status Geral -->
        <div class="transfer-item-top">
          <span class="transfer-badge-seq">${transfer.sequencial || '0001'}</span>
          <span class="transfer-badge-status" style="background-color: ${statusCor};">
            ${transfer.status || 'Em Trânsito'}
          </span>
        </div>

        <!-- Linha 2: Código da Transferência -->
        <div class="transfer-item-code-row">
          <span class="transfer-label-code">Código:</span>
          <span class="transfer-code-value">${transfer.codigo || '000001'}</span>
        </div>

        <!-- Linha 3: Fornecedor (Origem e Destino) -->
        <div class="transfer-item-supplier-block">
          <div class="transfer-supplier-title">Fornecedor:</div>
          <div class="transfer-supplier-origin">
            <span class="supplier-key">Origem:</span>
            <span class="supplier-val">${transfer.fornecedorOrigem || '000052 - 01 - ALVENIUS'}</span>
          </div>
          <div class="transfer-supplier-destination">
            <span class="supplier-key">Destino:</span>
            <span class="supplier-val">${transfer.fornecedorDestino || '003385 - 01 - PETROPASY TECNOLOGIA'}</span>
          </div>
        </div>

        <!-- Linha 4: Datas em 2 Colunas com Divisor Vertical Central -->
        <div class="transfer-item-dates-grid">
          <div class="transfer-date-col">
            <div class="transfer-date-header">
              <span class="transfer-date-icon">${lucide('calendar', { size: 14, stroke: '#64748b', strokeWidth: 1.8 })}</span>
              <span class="transfer-date-label">Início:</span>
            </div>
            <div class="transfer-date-value">${transfer.inicio || '21/08/2026 às 00:00h'}</div>
          </div>

          <div class="transfer-date-divider" aria-hidden="true"></div>

          <div class="transfer-date-col">
            <div class="transfer-date-header">
              <span class="transfer-date-icon">${lucide('calendar', { size: 14, stroke: '#64748b', strokeWidth: 1.8 })}</span>
              <span class="transfer-date-label">Finalizado:</span>
            </div>
            <div class="transfer-date-value">${transfer.finalizado || '-- / -- / ---- às -- : --'}</div>
          </div>
        </div>

        <!-- Linha 5: Componente ou Spools (Rótulo + Botão de Expansão) -->
        <div class="transfer-item-components-section">
          <div class="transfer-components-header-row">
            <span class="transfer-components-label">${itemsLabel}</span>
            <button 
              type="button" 
              class="btn-toggle-transfer-items ${isExpanded ? 'is-expanded' : ''}" 
              data-toggle-transfer="${transfer.id}"
              aria-expanded="${isExpanded ? 'true' : 'false'}"
              aria-label="Expandir ou recolher lista de ${itemsLabel}"
              title="Clique para ${isExpanded ? 'ocultar' : 'exibir'} ${itemsLabel}"
            >
              <span class="btn-toggle-transfer-icon">
                ${lucide(isExpanded ? 'chevron-up' : 'chevron-down', { size: 16, stroke: '#1956ce', strokeWidth: 2.2 })}
              </span>
            </button>
          </div>

          <!-- Bloco Expansível com Códigos -->
          <div class="transfer-items-container ${isExpanded ? 'is-open' : 'is-collapsed'}" id="transfer-items-${transfer.id}">
            ${itens.length > 0 ? itemsListHtml : '<div class="transfer-no-items">Nenhum item vinculado</div>'}
          </div>
        </div>

        <!-- Linha 6: Pipeline de Status em Chevrons -->
        <div class="transfer-pipeline-section">
          <div class="transfer-pipeline-label">Status:</div>
          <div class="transfer-pipeline-bar" role="progressbar" aria-valuenow="${etapaAtual}" aria-valuemin="1" aria-valuemax="5">
            ${pipelineHtml}
          </div>
        </div>
      </div>
    `;
  }
}
