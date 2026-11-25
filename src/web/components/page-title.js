/**
 * Componente PageTitle - Alvenius Spool Management
 * Responsabilidade Única: Padronização e controle da pill/título central flutuante a cavaleiro
 */

export class PageTitle {
  /**
   * Atualiza dinamicamente o texto do título na pill do cabeçalho
   * @param {string} title - Novo título a ser exibido
   */
  static setTitle(title = 'Rastreio de produtos') {
    const pillLabel = document.getElementById('header-pill-label');
    if (pillLabel) {
      pillLabel.innerHTML = `<span>${title}</span>`;
    }
  }

  /**
   * Retorna a marcação HTML padronizada da pill flutuante a cavaleiro
   * @param {string} title - Texto do título
   * @param {object} [options] - Opções adicionais
   * @param {string} [options.id] - Identificador do label interno
   * @returns {string} HTML padronizado da pill
   */
  static render(title = 'Rastreio de produtos', options = {}) {
    const labelId = options.id || 'header-pill-label';
    return `
      <div class="header-center-pill" id="header-center-pill">
        <span class="floating-pill" id="${labelId}"><span>${title}</span></span>
      </div>
    `;
  }
}

export const pageTitle = PageTitle;
