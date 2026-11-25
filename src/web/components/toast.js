/**
 * Componente Toast / Alertas Flutuantes
 * Responsabilidade Única: Notificações não obstrutivas com auto-dismiss
 */

import { lucide } from './icons.js';

const TOAST_ICONS = {
  success: lucide('circle-check', { size: 22, strokeWidth: 2.2 }),
  info: lucide('info', { size: 22, strokeWidth: 2.2 }),
  warning: lucide('circle-alert', { size: 22, strokeWidth: 2.2 }),
  danger: lucide('circle-x', { size: 22, strokeWidth: 2.2 })
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
