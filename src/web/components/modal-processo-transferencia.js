/**
 * Componente Modal Selecionar Processo de Transferência (SPOOL)
 * Responsabilidade Única: Apresentação e seleção do processo entre etapas (Caldeiraria -> Revestimento -> Pintura -> Faturamento)
 * Fidelidade visual e estrutural a copilot-image-d865f8.png
 */

import { lucide } from './icons.js';

export class ModalProcessoTransferenciaComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.onSelectCallback = null;
    this.onCloseCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ onSelect, onSelectProcess, onClose } = {}) {
    this.onSelectCallback = onSelectProcess || onSelect;
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
      <div class="modal-backdrop" id="process-transfer-modal-backdrop">
        <div class="transfer-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="process-transfer-modal-title">
          <button class="transfer-btn-close-x" id="process-transfer-btn-close-x" aria-label="Fechar" title="Fechar modal">
            &times;
          </button>

          <div class="transfer-modal-header">
            <h3 class="transfer-modal-title" id="process-transfer-modal-title">
              <span>Selecione qual PROCESSO de</span>
              <span>TRANSFERÊNCIA</span>
            </h3>
          </div>

          <div class="transfer-modal-divider"></div>

          <div class="transfer-modal-body">
            <div class="modal-process-transfer-options">
              <!-- Card 1: CALDEIRARIA -> REVESTIMENTO -->
              <div class="process-transfer-card" data-process="caldeiraria-revestimento" tabindex="0" role="button" aria-label="Processo Caldeiraria para Revestimento">
                <div class="process-transfer-flow">
                  <div class="process-step-item">
                    <span class="process-step-icon">
                      ${lucide('paint-bucket', { size: 30, stroke: '#1956ce', strokeWidth: 2 })}
                    </span>
                    <span class="process-step-label">CALDEIRARIA</span>
                  </div>

                  <span class="process-arrow" aria-hidden="true">
                    ${lucide('arrow-right', { size: 22, stroke: '#64748b', strokeWidth: 2.5 })}
                  </span>

                  <div class="process-step-item">
                    <span class="process-step-icon">
                      ${lucide('spray-can', { size: 30, stroke: '#1956ce', strokeWidth: 2 })}
                    </span>
                    <span class="process-step-label">REVESTIMENTO</span>
                  </div>
                </div>

                <div class="process-transfer-desc">
                  Ler QRCode Spool caldeiraria / próximas etapas processo
                </div>
              </div>

              <!-- Card 2: REVESTIMENTO -> PINTURA -->
              <div class="process-transfer-card" data-process="revestimento-pintura" tabindex="0" role="button" aria-label="Processo Revestimento para Pintura">
                <div class="process-transfer-flow">
                  <div class="process-step-item">
                    <span class="process-step-icon">
                      ${lucide('spray-can', { size: 30, stroke: '#1956ce', strokeWidth: 2 })}
                    </span>
                    <span class="process-step-label">REVESTIMENTO</span>
                  </div>

                  <span class="process-arrow" aria-hidden="true">
                    ${lucide('arrow-right', { size: 22, stroke: '#64748b', strokeWidth: 2.5 })}
                  </span>

                  <div class="process-step-item">
                    <span class="process-step-icon">
                      ${lucide('paint-roller', { size: 30, stroke: '#1956ce', strokeWidth: 2 })}
                    </span>
                    <span class="process-step-label">PINTURA</span>
                  </div>
                </div>

                <div class="process-transfer-desc">
                  Ler QRCode Spool revestimento / próximas etapas processo
                </div>
              </div>

              <!-- Card 3: PINTURA -> FATURAMENTO -->
              <div class="process-transfer-card" data-process="pintura-faturamento" tabindex="0" role="button" aria-label="Processo Pintura para Faturamento">
                <div class="process-transfer-flow">
                  <div class="process-step-item">
                    <span class="process-step-icon">
                      ${lucide('paint-roller', { size: 30, stroke: '#1956ce', strokeWidth: 2 })}
                    </span>
                    <span class="process-step-label">PINTURA</span>
                  </div>

                  <span class="process-arrow" aria-hidden="true">
                    ${lucide('arrow-right', { size: 22, stroke: '#64748b', strokeWidth: 2.5 })}
                  </span>

                  <div class="process-step-item">
                    <span class="process-step-icon">
                      ${lucide('receipt-dollar', { size: 30, stroke: '#1956ce', strokeWidth: 2 })}
                    </span>
                    <span class="process-step-label">FATURAMENTO</span>
                  </div>
                </div>

                <div class="process-transfer-desc">
                  Ler QRCode Spool pintura / próximas etapas processo
                </div>
              </div>
            </div>
          </div>

          <div class="transfer-modal-divider"></div>

          <div class="transfer-modal-footer">
            <button class="transfer-btn-close-bottom" id="process-transfer-btn-close-bottom" type="button" aria-label="Fechar modal">
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
    const backdrop = this.container.querySelector('#process-transfer-modal-backdrop');
    const closeBtnX = this.container.querySelector('#process-transfer-btn-close-x');
    const closeBtnBottom = this.container.querySelector('#process-transfer-btn-close-bottom');

    const handleClose = (e) => {
      if (e) e.stopPropagation();
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

    const cards = this.container.querySelectorAll('.process-transfer-card');
    cards.forEach(card => {
      const selectAction = () => {
        const processKey = card.getAttribute('data-process');
        if (typeof this.onSelectCallback === 'function') {
          this.onSelectCallback(processKey);
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
