/**
 * Tela Menu Principal / Dashboard - Alvenius
 * Responsabilidade Única: Grade de navegação rápida com os 6 módulos principais e link para o site
 */

import { renderModuleCard } from '../components/module-card.js';

const SITE_URL = 'https://www.alvenius.com.br';

const MODULES = [
  { id: 'cadastro', title: 'CADASTRO', subtitle: 'Cadastro Spool e componentes', iconSrc: 'assets/icon-cadastro.png' },
  { id: 'caldeiraria', title: 'CALDEIRARIA', subtitle: 'Ler QRCode Spool caldeiraria / próximas etapas processo', iconSrc: 'assets/icon-caldeiraria.png' },
  { id: 'revestimento', title: 'REVESTIMENTO', subtitle: 'Ler QRCode Spool revestimento / próximas etapas processo', iconSrc: 'assets/icon-revestimento.png' },
  { id: 'pintura', title: 'PINTURA', subtitle: 'Ler QRCode Spool pintura / próximas etapas processo', iconSrc: 'assets/icon-pintura.png' },
  { id: 'validar-qrcode', title: 'VALIDAR QRCODE', subtitle: 'Ler QRCode e validar / campos spool e componentes', iconSrc: 'assets/icon-validar-qrcode.png' },
  { id: 'transferencia', title: 'TRANSFERÊNCIA', subtitle: 'Ler QRCode e criar transferência / próximas etapas processo', iconSrc: 'assets/icon-transferencia.png' },
  { id: 'site-alvenius', title: 'IR PARA SITE ALVENIUS', subtitle: 'Empresa, Produtos, Orçamento, Catálogos, Contato, etc.', iconSrc: 'assets/icon-site-alvenius.png' }
];

export class MenuView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="view-menu-container">
        <div class="menu-panel">
          <h2 class="menu-title">Clique no que deseja fazer</h2>
          <div class="accent-divider-center"></div>
          <div class="menu-grid">
            ${MODULES.map(renderModuleCard).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const cards = this.container.querySelectorAll('.menu-card');
    cards.forEach(card => {
      const handleAction = () => {
        const id = card.getAttribute('data-route');
        const { onNavigate, onOpenQrCode, onOpenTransfer } = this.options;

        if (id === 'validar-qrcode') {
          if (typeof onOpenQrCode === 'function') onOpenQrCode();
        } else if (id === 'transferencia') {
          if (typeof onOpenTransfer === 'function') onOpenTransfer();
        } else if (id === 'site-alvenius') {
          window.open(SITE_URL, '_blank', 'noopener,noreferrer');
        } else if (typeof onNavigate === 'function') {
          onNavigate(id);
        }
      };

      card.addEventListener('click', handleAction);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAction();
        }
      });
    });
  }
}
