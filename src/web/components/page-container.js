/**
 * Componente Container Base de Páginas Industriais - Alvenius
 * Responsabilidade Única: Envelope padrão para views (Card base a cavaleiro, banner info, divisor azul e rodapé)
 */

import { lucide } from './icons.js';

export class PageContainer {
  /**
   * Renderiza a casca padronizada de uma página Alvenius
   * @param {object} config
   * @param {string} [config.bannerTitle] - Título no banner cinza (ex: "SPOOL")
   * @param {string} [config.bannerDescription] - Descrição no banner cinza com ícone info
   * @param {string} [config.content] - HTML do conteúdo principal
   * @param {string} [config.footerActions] - HTML dos botões de ação do rodapé
   * @param {string} [config.containerClass] - Classe adicional para o container externo
   * @param {string} [config.cardClass] - Classe adicional para o card
   * @returns {string} HTML do envelope completo
   */
  static render({
    bannerTitle = '',
    bannerDescription = '<span class="banner-line-1" style="white-space: nowrap; display: block;">Realiza o cadastro de Spool e componentes iniciar processo</span><span class="banner-line-2" style="display: block;">produção.</span>',
    content = '',
    footerActions = '',
    containerClass = '',
    cardClass = ''
  } = {}) {
    const bannerHtml = bannerTitle ? `
      <!-- Banner Informativo Superior Padrão -->
      <div class="page-info-banner cadastro-info-banner">
        <div class="page-info-banner-title cadastro-info-banner-title">${bannerTitle}</div>
        ${bannerDescription ? `
          <div class="page-info-banner-desc cadastro-info-banner-desc">
            <span class="info-icon">${lucide('info', { size: 14, strokeWidth: 2 })}</span>
            <span class="page-info-banner-desc-text">${bannerDescription}</span>
          </div>
        ` : ''}
      </div>
      <div class="page-accent-line cadastro-accent-line"></div>
    ` : '';

    const footerHtml = footerActions ? `
      <!-- Rodapé de Ações Padrão -->
      <div class="card-footer-actions-grid card-footer-actions-cadastro">
        ${footerActions}
      </div>
    ` : '';

    const containerClasses = ['view-page-container', containerClass].filter(Boolean).join(' ');
    const cardClasses = ['card-page-base', cardClass].filter(Boolean).join(' ');

    return `
      <div class="${containerClasses}">
        <div class="${cardClasses}">
          <div class="card-page-top-group">
            ${bannerHtml}
            ${content}
          </div>
          ${footerHtml}
        </div>
      </div>
    `;
  }
}
