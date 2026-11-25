/**
 * Componente TransferCard - Alvenius Spool Management
 * Responsabilidade Única: Renderização fiel do card de Transferência de Componentes e Spools
 * Fidelidade visual absoluta aos layouts de referência copilot-image-85fa22.png e copilot-image-93dd6b.png
 * Reutilizável tanto para "componente" quanto para "spool"
 */

import { lucide } from './icons.js';
import { ProjectTag } from './project-tag.js';
import { PIPELINE_STAGES, getTransferCounters } from '../mocks/transfers-mock.js';

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

    const etapaAtual = Number(transfer.etapaAtual || 1);
    const rawStatus = String(transfer.status || '').toLowerCase();
    const isConcluido = rawStatus.includes('conclu') || etapaAtual === 5;
    const badgeStatus = isConcluido ? 'Concluído' : 'Em Trânsito';
    const badgeColor = isConcluido ? '#22c55e' : '#f59e0b';

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
          <span class="transfer-badge-status" style="background-color: ${badgeColor};">
            ${badgeStatus}
          </span>
        </div>

        <!-- Linha 2: Código da Transferência -->
        <div class="transfer-item-code-row">
          <span class="transfer-label-code">Código:</span>
          <span class="transfer-code-value">${transfer.codigo || '000001'}</span>
        </div>

        <!-- Linha 2.1: Projeto vinculado à transferência -->
        ${ProjectTag.renderRow(transfer, { className: 'spool-item-project-row transfer-item-project-row' })}

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

  /**
   * Faixa "Projeto ativo" + contadores por status das transferências do projeto
   * @param {object} projectRef - getProjectRef(getActiveProject())
   * @param {Array} list - transferências do projeto (sem filtro de busca)
   */
  static renderProjectSummary(projectRef, list = []) {
    const c = getTransferCounters(list);
    return `
      <div class="project-context-bar stage-project-bar transfer-project-bar">
        ${ProjectTag.renderRow(projectRef, { label: 'Projeto ativo:' })}
        <div class="transfer-project-counters" aria-label="Transferências do projeto por status">
          <span class="transfer-counter is-transito"><strong>${c.emTransito}</strong> Em Trânsito</span>
          <span class="transfer-counter is-concluido"><strong>${c.concluido}</strong> Concluído</span>
          <span class="transfer-counter is-total"><strong>${c.total}</strong> Total</span>
        </div>
      </div>
    `;
  }

  /** Estado vazio: sem resultados na busca ou projeto sem transferências */
  static renderEmpty({ hasQuery = false, projectRef = null } = {}) {
    const title = hasQuery ? 'Nenhuma transferência encontrada' : 'Nenhuma transferência neste projeto';
    const subtitle = hasQuery
      ? 'Tente outro termo na busca por código, status ou data.'
      : `O projeto ${projectRef?.projetoCodigo || ''} ainda não possui transferências. Use "Criar Nova Transferência".`;
    return `
      <div class="transfer-empty-state">
        ${lucide('search', { size: 36, stroke: '#9ca3af', strokeWidth: 1.5 })}
        <div class="transfer-empty-title">${title}</div>
        <div class="transfer-empty-subtitle">${subtitle}</div>
      </div>
    `;
  }
}
