/**
 * Componente ProjectTag - Alvenius
 * Responsabilidade Única: identificação compacta do projeto (código · nome) reutilizada em
 * cards de spool, cadastro e modal de leitura de QRCode
 */

import { lucide } from './icons.js';

/**
 * Lê a referência de projeto no formato { projetoCodigo, projetoNome } (spool, payload ou getProjectRef)
 */
function normalize(ref) {
  if (!ref || !ref.projetoCodigo) return null;
  return { codigo: ref.projetoCodigo, nome: ref.projetoNome || '' };
}

export const ProjectTag = {
  /**
   * Badge "PRJ-2026-0414 · Nome do projeto" (nome truncado com reticências)
   * @param {object} ref - { projetoCodigo, projetoNome } (spool vinculado ou getProjectRef)
   * @returns {string} HTML ('' quando não há projeto)
   */
  render(ref) {
    const project = normalize(ref);
    if (!project) return '';
    const title = `${project.codigo}${project.nome ? ' · ' + project.nome : ''}`;
    return `
      <span class="project-tag" title="Projeto: ${title}">
        <span class="project-tag-icon" aria-hidden="true">${lucide('folder-kanban', { size: 12, strokeWidth: 2.2 })}</span>
        <span class="project-tag-code">${project.codigo}</span>
        ${project.nome ? `<span class="project-tag-sep" aria-hidden="true">·</span><span class="project-tag-name">${project.nome}</span>` : ''}
      </span>
    `;
  },

  /**
   * Linha rotulada "Projeto:" + badge, usada em cards e no cadastro
   * @param {object} ref - { projetoCodigo, projetoNome }
   * @param {object} [options]
   * @param {string} [options.label='Projeto:'] - rótulo da linha
   * @param {string} [options.className=''] - classe extra
   * @param {string} [options.emptyText=''] - texto exibido quando não há projeto ('' oculta a linha)
   */
  renderRow(ref, { label = 'Projeto:', className = '', emptyText = '' } = {}) {
    const tag = this.render(ref);
    if (!tag && !emptyText) return '';
    return `
      <div class="project-tag-row ${className}">
        <span class="project-tag-label">${label}</span>
        ${tag || `<span class="project-tag-empty">${emptyText}</span>`}
      </div>
    `;
  }
};
