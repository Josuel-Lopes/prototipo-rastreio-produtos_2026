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
            <button class="modal-close-btn-red" id="transfer-btn-close-x" aria-label="Fechar" title="Fechar modal">
              ✕
            </button>
          </div>

          <div class="modal-body">
            <div class="modal-transfer-options">
              <!-- Opção 1: COMPONENTE -->
              <div class="transfer-option-card" data-transfer-type="componente" tabindex="0" role="button">
                <div class="transfer-icon-box">
                  <img src="assets/icon-componente.png" class="transfer-box-icon" alt="Componente">
                </div>
                <div class="transfer-info">
                  <div class="transfer-info-title">COMPONENTE</div>
                  <div class="transfer-info-desc">Transferência componente / próximas etapas processo</div>
                </div>
              </div>

              <!-- Opção 2: SPOOL -->
              <div class="transfer-option-card" data-transfer-type="spool" tabindex="0" role="button">
                <div class="transfer-icon-box">
                  <img src="assets/icon-spool.png" class="transfer-box-icon" alt="Spool">
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
              <!-- Ícone [⊗] Fechar -->
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
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
