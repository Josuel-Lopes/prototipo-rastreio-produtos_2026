/**
 * Componente Modal de Transferência
 * Responsabilidade Única: Seleção do tipo de transferência (COMPONENTE ou SPOOL)
 */

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
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="transfer-modal-title">
          <div class="modal-header">
            <h3 class="modal-title-center" id="transfer-modal-title">
              Selecione qual TIPO de TRANSFERÊNCIA
            </h3>
            <button class="modal-close-btn" id="transfer-btn-close-x" aria-label="Fechar">
              &times;
            </button>
          </div>

          <div class="modal-body">
            <div class="modal-transfer-options">
              <!-- Opção 1: COMPONENTE -->
              <div class="transfer-option-card" data-transfer-type="componente" tabindex="0" role="button">
                <div class="transfer-icon-box">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <div class="transfer-info">
                  <div class="transfer-info-title">COMPONENTE</div>
                  <div class="transfer-info-desc">Transferência componente / próximas etapas processo</div>
                </div>
              </div>

              <!-- Opção 2: SPOOL -->
              <div class="transfer-option-card" data-transfer-type="spool" tabindex="0" role="button">
                <div class="transfer-icon-box">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div class="transfer-info">
                  <div class="transfer-info-title">SPOOL</div>
                  <div class="transfer-info-desc">Transferência spool / próximas etapas processo</div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-danger" id="transfer-btn-close-bottom">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
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
