/**
 * Componente Modal de Transferência
 * Responsabilidade Única: Seleção do tipo de transferência (COMPONENTE ou SPOOL)
 * Fidelidade visual absoluta ao layout de referência copilot-image-d3e025.png
 */

import { lucide } from './icons.js';

export class ModalTransferenciaComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.onSelectCallback = null;
    this.onCloseCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ onSelect, onClose } = {}) {
    this.onSelectCallback = onSelect;
    this.onCloseCallback = onClose;
    this.isOpen = true;
    this.render();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    this.isOpen = false;
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('has-modal');
    }
    document.removeEventListener('keydown', this.handleKeyDown);
    if (typeof this.onCloseCallback === 'function') {
      this.onCloseCallback();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('has-modal');
    this.container.innerHTML = `
      <div class="modal-backdrop" id="transfer-modal-backdrop">
        <div class="transfer-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="transfer-modal-title">
          <button class="transfer-btn-close-x" id="transfer-btn-close-x" aria-label="Fechar" title="Fechar modal">
            &times;
          </button>

          <div class="transfer-modal-header">
            <h3 class="transfer-modal-title" id="transfer-modal-title">
              <span>Selecione qual TIPO de</span>
              <span>TRANSFERÊNCIA</span>
            </h3>
          </div>

          <div class="transfer-modal-divider"></div>

          <div class="transfer-modal-body">
            <div class="modal-transfer-options">
              <!-- Opção 1: COMPONENTE -->
              <div class="transfer-option-card" data-transfer-type="componente" tabindex="0" role="button" aria-label="Transferência de Componente">
                <div class="transfer-icon-box">
                  <svg class="transfer-svg-icon" viewBox="0 0 36 36" fill="none" stroke="#1956ce" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="14" y="3.5" width="8" height="8" rx="1.5" transform="rotate(45 18 7.5)" />
                    <rect x="14" y="24.5" width="8" height="8" rx="1.5" transform="rotate(45 18 28.5)" />
                    <rect x="3.5" y="14" width="8" height="8" rx="1.5" transform="rotate(45 7.5 18)" />
                    <rect x="24.5" y="14" width="8" height="8" rx="1.5" transform="rotate(45 28.5 18)" />
                  </svg>
                </div>
                <div class="transfer-info">
                  <div class="transfer-info-title">COMPONENTE</div>
                  <div class="transfer-info-desc">Transferência componente / próximas etapas processo</div>
                </div>
              </div>

              <!-- Opção 2: SPOOL -->
              <div class="transfer-option-card" data-transfer-type="spool" tabindex="0" role="button" aria-label="Transferência de Spool">
                <div class="transfer-icon-box">
                  ${lucide('box', { size: 38, stroke: '#1956ce', strokeWidth: 2 })}
                </div>
                <div class="transfer-info">
                  <div class="transfer-info-title">SPOOL</div>
                  <div class="transfer-info-desc">Transferência spool / próximas etapas processo</div>
                </div>
              </div>
            </div>
          </div>

          <div class="transfer-modal-divider"></div>

          <div class="transfer-modal-footer">
            <button class="transfer-btn-close-bottom" id="transfer-btn-close-bottom" type="button" aria-label="Fechar modal">
              ${lucide('circle-x', { size: 18, stroke: '#ffffff', strokeWidth: 2.2 })}
              <span>Fechar</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const backdrop = this.container.querySelector('#transfer-modal-backdrop');
    const closeBtnX = this.container.querySelector('#transfer-btn-close-x');
    const closeBtnBottom = this.container.querySelector('#transfer-btn-close-bottom');

    const handleClose = (e) => {
      e.stopPropagation();
      this.close();
    };

    if (closeBtnX) closeBtnX.addEventListener('click', handleClose);
    if (closeBtnBottom) closeBtnBottom.addEventListener('click', handleClose);

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close();
        }
      });
    }

    const options = this.container.querySelectorAll('.transfer-option-card');
    options.forEach(card => {
      const selectAction = () => {
        const type = card.getAttribute('data-transfer-type');
        if (typeof this.onSelectCallback === 'function') {
          this.onSelectCallback(type);
        }
        this.close();
      };

      card.addEventListener('click', selectAction);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectAction();
        }
      });
    });
  }
}
