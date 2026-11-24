/**
 * Componente Toast / Alertas Flutuantes
 * Responsabilidade Única: Notificações não obstrutivas com auto-dismiss
 */

const TOAST_ICONS = {
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  danger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
};

export class ToastManager {
  constructor(rootId = 'toast-root') {
    this.root = document.getElementById(rootId);
    if (!this.root) {
      this.root = document.createElement('div');
      this.root.id = rootId;
      document.body.appendChild(this.root);
    }
  }

  show({ title, message, type = 'info', duration = 3800 }) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSvg = TOAST_ICONS[type] || TOAST_ICONS.info;

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" title="Fechar">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    };

    closeBtn.addEventListener('click', dismiss);

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }

    this.root.appendChild(toast);
  }

  success(title, message, duration) {
    this.show({ title, message, type: 'success', duration });
  }

  info(title, message, duration) {
    this.show({ title, message, type: 'info', duration });
  }

  warning(title, message, duration) {
    this.show({ title, message, type: 'warning', duration });
  }

  error(title, message, duration) {
    this.show({ title, message, type: 'danger', duration });
  }
}

export const toast = new ToastManager();
