/**
 * Componente ModalRomaneioComponent - Alvenius Spool Management
 * Responsabilidade Única: Exibição do modal de aviso industrial padronizado
 * para spools com status Romaneio (aguardando próxima etapa/romaneio).
 */

import { lucide } from './icons.js';

export class ModalRomaneioComponent {
  constructor(containerId = 'modal-root') {
    this.containerId = containerId;
  }

  /**
   * Abre o modal de forma estática direta
   */
  static open(options = {}) {
    const containerId = (typeof options === 'string') ? options : (options?.containerId || 'modal-root');
    const onClose = typeof options === 'function' ? options : options?.onClose;
    const instance = new ModalRomaneioComponent(containerId);
    return instance.open({ onClose });
  }

  /**
   * Abre o modal no container configurado
   */
  open({ onClose } = {}) {
    const modalRoot = document.getElementById(this.containerId);
    if (!modalRoot) return;

    modalRoot.classList.add('has-modal');
    modalRoot.innerHTML = `
      <div class="modal-backdrop" id="romaneio-alert-backdrop">
        <div class="modal-dialog modal-alert-dialog" role="dialog" aria-modal="true" aria-labelledby="romaneio-alert-title">
          <div class="modal-header modal-alert-header">
            <div class="modal-alert-header-info">
              <span class="modal-alert-icon">
                ${lucide('info', { size: 20, stroke: '#1956ce', strokeWidth: 2.2 })}
              </span>
              <h3 class="modal-alert-title" id="romaneio-alert-title">Romaneio</h3>
            </div>
            <button class="modal-alert-close-btn" id="romaneio-alert-btn-close" aria-label="Fechar" title="Fechar modal">
              ${lucide('x', { size: 16, stroke: '#64748b', strokeWidth: 2.2 })}
            </button>
          </div>
          <div class="modal-body modal-alert-body">
            <p class="modal-alert-message">Processo concluido aguardando Romaneio</p>
          </div>
          <div class="modal-footer modal-alert-footer">
            <button type="button" class="btn-modal-alert-ok" id="romaneio-alert-btn-ok">OK</button>
          </div>
        </div>
      </div>
    `;

    const closeModal = () => {
      modalRoot.innerHTML = '';
      modalRoot.classList.remove('has-modal');
      document.removeEventListener('keydown', handleKeyDown);
      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    const btnOk = modalRoot.querySelector('#romaneio-alert-btn-ok');
    const btnClose = modalRoot.querySelector('#romaneio-alert-btn-close');
    const backdrop = modalRoot.querySelector('#romaneio-alert-backdrop');

    if (btnOk) btnOk.addEventListener('click', closeModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
    }

    if (btnOk) {
      setTimeout(() => btnOk.focus(), 50);
    }
  }
}
