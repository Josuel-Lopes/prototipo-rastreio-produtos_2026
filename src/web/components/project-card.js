/**
 * Componente ProjectCard - Alvenius
 * Responsabilidade Única: card de projeto reaproveitando a estrutura/estilos do SpoolCard (spool-item-*)
 */

import { renderCardDateCol } from './spool-card.js';
import { projectStatusDefinitions } from '../mocks/projects-mock.js';

export class ProjectCard {
  /**
   * @param {object} project - Dados do projeto (projects-mock.js)
   * @returns {string} HTML do card
   */
  static render(project) {
    const statusLabel = projectStatusDefinitions[project.status]?.shortLabel || project.status;
    const total = Number(project.totalSpools) || 0;
    const done = Number(project.spoolsConcluidos) || 0;
    const percent = total ? Math.round((done / total) * 100) : 0;

    return `
      <div class="spool-item-card is-actionable project-item-card"
           data-project-id="${project.id}"
           role="button"
           tabindex="0"
           aria-label="Selecionar projeto ${project.nome} (${project.codigo})">
        <div class="spool-item-top">
          <span class="spool-badge-seq">${project.sequencial}</span>
          <span class="spool-badge-status status-${project.status}">${statusLabel}</span>
        </div>

        <h4 class="project-item-name">${project.nome}</h4>

        <div class="spool-item-code-row">
          <span class="spool-label-code">Código:</span>
          <span class="spool-item-code-text">${project.codigo}</span>
        </div>

        <div class="spool-item-desc-row">
          <span class="spool-label-desc">Cliente:</span>
          <span class="spool-desc-text">${project.cliente || '--'}</span>
        </div>

        <div class="spool-item-dates-grid">
          ${renderCardDateCol('Início:', project.inicio)}
          <div class="spool-date-divider" aria-hidden="true"></div>
          ${renderCardDateCol('Previsão de entrega:', project.previsaoEntrega)}
        </div>

        <div class="spool-item-desc-row">
          <span class="spool-label-desc">Descrição:</span>
          <span class="spool-desc-text">${project.descricao || '--'}</span>
        </div>

        <div class="project-item-footer">
          <div class="spool-scrap-header">
            <span class="spool-scrap-badge">${String(total).padStart(2, '0')}</span>
            <span class="spool-scrap-text">Spools</span>
          </div>
          <span class="project-item-percent">${percent}% concluído</span>
        </div>
        <div class="project-item-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-label="Progresso do projeto">
          <span class="project-item-progress-bar status-${project.status}" style="width: ${percent}%"></span>
        </div>
      </div>
    `;
  }
}
