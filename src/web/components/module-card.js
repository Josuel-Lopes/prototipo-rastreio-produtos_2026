/**
 * Componente ModuleCard - Alvenius
 * Responsabilidade Única: renderizar um card de módulo com ícones vetoriais fiéis do Lucide Icons (#0a2540), título e subtítulo
 */

import { lucide } from './icons.js';

export const MODULE_ICONS = {
  cadastro: lucide('package-plus', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' }),
  caldeiraria: lucide('paint-bucket', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' }),
  revestimento: lucide('spray-can', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' }),
  pintura: lucide('paint-roller', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' }),
  'validar-qrcode': lucide('qr-code', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' }),
  transferencia: lucide('truck', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' }),
  'site-alvenius': lucide('globe', { size: 34, stroke: '#0a2540', strokeWidth: 2, className: 'menu-card-icon-svg' })
};

export function renderModuleCard({ id, title, subtitle, iconSrc }) {
  const iconHtml = MODULE_ICONS[id] || (iconSrc ? `<img src="${iconSrc}" alt="${title}" class="menu-card-icon-img" />` : '');

  return `
    <div class="menu-card" data-route="${id}" role="button" tabindex="0">
      <div class="menu-card-icon-wrapper">
        ${iconHtml}
      </div>
      <h3 class="menu-card-title">${title}</h3>
      <p class="menu-card-subtitle">${subtitle}</p>
    </div>
  `;
}

