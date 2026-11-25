/**
 * Componente SpoolCard - Alvenius
 * Responsabilidade Única: Renderização fiel do card de processo de Spool conforme o padrão visual industrial
 * Utilizado em Caldeiraria, Revestimento, Pintura, Montagem e Expedição
 */

import { lucide } from './icons.js';
import { statusDefinitions } from '../mocks/spools-mock.js';

/**
 * Extrai e formata estritamente a data no padrão dd/MM/yyyy
 * @param {string} dateStr - Data original (ex: "23/11/2026 às 15:30")
 * @returns {string} Data formatada dd/MM/yyyy
 */
function formatScrapDate(dateStr) {
  if (!dateStr) return '';
  const str = String(dateStr).trim();
  const ddmmyyyyMatch = str.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
  if (ddmmyyyyMatch) return ddmmyyyyMatch[0];

  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;

  return str.split(' ')[0] || str;
}

export class SpoolCard {
  /**
   * Renderiza a marcação HTML de um Spool individual
   * @param {object} spool - Objeto com os dados do spool
   * @param {object} [options] - Opções de renderização
   * @param {boolean} [options.showScrapHistory=false] - Se o switch geral de sucata está ativo (auto expandir)
   * @returns {string} HTML do card
   */
  static render(spool, options = {}) {
    const showScrap = Boolean(options.showScrapHistory);
    const statusMeta = statusDefinitions[spool.status] || {
      shortLabel: spool.status,
      color: '#0ea5e9'
    };

    const hasScrap = Array.isArray(spool.historicoSucata) && spool.historicoSucata.length > 0;
    const scrapCount = hasScrap ? String(spool.historicoSucata.length).padStart(2, '0') : '00';
    const isExpanded = showScrap && hasScrap;
    const isRomaneio = spool.status === 'romaneio';

    // Determina o rótulo do status
    const statusLabel = statusMeta.shortLabel || spool.status;

    return `
      <div class="spool-item-card ${isRomaneio ? 'is-romaneio' : 'is-actionable'}" 
           data-spool-id="${spool.id}" 
           data-spool-code="${spool.codigo}" 
           data-spool-status="${spool.status || ''}"
           role="button" 
           tabindex="0"
           title="${isRomaneio ? 'Processo concluído aguardando Romaneio' : 'Clique para continuar com o Spool ' + spool.codigo}">
        <!-- Topo do Card: Sequencial + Badge de Status -->
        <div class="spool-item-top">
          <span class="spool-badge-seq">${spool.sequencial || '0001'}</span>
          <span class="spool-badge-status status-${spool.status || 'romaneio'}">${statusLabel}</span>
        </div>

        <!-- Linha do Código do Spool -->
        <div class="spool-item-code-row">
          <span class="spool-label-code">Código:</span>
          <span class="spool-item-code-link spool-item-code-text" data-code="${spool.codigo}">${spool.codigo}</span>
        </div>

        <!-- Linha de Datas e Horários em Duas Colunas com Divisor Vertical Central -->
        <div class="spool-item-dates-grid">
          <div class="spool-date-col">
            <div class="spool-date-header">
              <span class="spool-date-icon">${lucide('calendar', { size: 14, stroke: '#64748b', strokeWidth: 1.8 })}</span>
              <span class="spool-date-label">Início:</span>
            </div>
            <div class="spool-date-value">${spool.inicio || '-- / -- / ---- às -- : --'}</div>
          </div>

          <div class="spool-date-divider" aria-hidden="true"></div>

          <div class="spool-date-col">
            <div class="spool-date-header">
              <span class="spool-date-icon">${lucide('calendar', { size: 14, stroke: '#64748b', strokeWidth: 1.8 })}</span>
              <span class="spool-date-label">Finalizado:</span>
            </div>
            <div class="spool-date-value">${spool.finalizado || '-- / -- / ---- às -- : --'}</div>
          </div>
        </div>

        <!-- Linha da Descrição (Abaixo das Datas) -->
        <div class="spool-item-desc-row">
          <span class="spool-label-desc">Descrição:</span>
          <span class="spool-desc-text">${spool.descricao || '--'}</span>
        </div>

        <!-- Bloco de Sucata (SEMPRE EXIBIDO, MESMO QUE 0) -->
        <div class="spool-scrap-detail-box ${isExpanded ? 'is-open' : ''} ${hasScrap ? 'has-scrap' : 'has-no-scrap'}">
          <div class="spool-scrap-header"><span class="spool-scrap-badge">${scrapCount}</span> <span class="spool-scrap-text">Histórico de sucata:</span></div>
          ${hasScrap ? `
            <div class="spool-scrap-panel ${isExpanded ? 'is-open' : 'is-collapsed'}">
              ${spool.historicoSucata.map(h => {
                const dataFormatada = formatScrapDate(h.data);
                const processo = h.processo || 'Caldeiraria';
                return `
                  <div class="spool-scrap-line"><span class="spool-scrap-line-date">${dataFormatada}</span> <span class="spool-scrap-line-sep">-</span> <span class="spool-scrap-line-process">${processo}</span></div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
