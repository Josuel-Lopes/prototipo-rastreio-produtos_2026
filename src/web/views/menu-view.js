/**
 * Tela Menu Principal / Dashboard - Alvenius
 * Responsabilidade Única: Grade de navegação rápida dos módulos do projeto ativo e link para o site
 */

import { renderModuleCard } from '../components/module-card.js';
import { lucide } from '../components/icons.js';
import { getActiveProject } from '../mocks/projects-mock.js';

const SITE_URL = 'https://www.alvenius.com.br';

const MODULES = [
  { id: 'cadastro', title: 'CADASTRO', subtitle: 'Cadastro Spool e componentes', iconSrc: 'assets/icon-cadastro.png' },
  { id: 'caldeiraria', title: 'CALDEIRARIA', subtitle: 'Ler QRCode Spool caldeiraria / próximas etapas processo', iconSrc: 'assets/icon-caldeiraria.png' },
  { id: 'revestimento', title: 'REVESTIMENTO', subtitle: 'Ler QRCode Spool revestimento / próximas etapas processo', iconSrc: 'assets/icon-revestimento.png' },
  { id: 'pintura', title: 'PINTURA', subtitle: 'Ler QRCode Spool pintura / próximas etapas processo', iconSrc: 'assets/icon-pintura.png' },
  { id: 'transferencia', title: 'TRANSFERÊNCIA', subtitle: 'Ler QRCode e criar transferência / próximas etapas processo', iconSrc: 'assets/icon-transferencia.png' },
  { id: 'site-alvenius', title: 'IR PARA SITE ALVENIUS', subtitle: 'Empresa, Produtos, Orçamento, Catálogos, Contato, etc.', iconSrc: 'assets/icon-site-alvenius.png' }
];

export class MenuView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  getModules() {
    return MODULES;
  }

  /** Bloco do projeto ativo acima do título (com atalho para trocar de projeto) */
  renderTop() {
    const project = getActiveProject();
    if (!project) return '';
    return `
      <div class="active-project-bar" aria-label="Projeto ativo">
        <span class="active-project-icon" aria-hidden="true">${lucide('folder-kanban', { size: 22, stroke: '#1956ce', strokeWidth: 2 })}</span>
        <div class="active-project-info">
          <span class="active-project-label">Projeto ativo</span>
          <strong class="active-project-name">${project.nome}</strong>
          <span class="active-project-code">${project.codigo}</span>
        </div>
        <button type="button" class="active-project-switch" id="btn-switch-project">
          ${lucide('arrow-left-right', { size: 14, strokeWidth: 2.2 })}
          <span>Trocar projeto</span>
        </button>
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="view-menu-container">
        <div class="menu-panel">
          ${this.renderTop()}
          <h2 class="menu-title">Clique no que deseja fazer</h2>
          <div class="menu-divider"></div>
          <div class="menu-grid">
            ${this.getModules().map(renderModuleCard).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  handleAction(id) {
    const { onNavigate, onOpenQrCode, onOpenTransfer } = this.options;

    if (id === 'validar-qrcode') {
      if (typeof onOpenQrCode === 'function') onOpenQrCode('validar-qrcode');
    } else if (id === 'transferencia') {
      if (typeof onOpenTransfer === 'function') onOpenTransfer();
    } else if (id === 'site-alvenius') {
      window.open(SITE_URL, '_blank', 'noopener,noreferrer');
    } else if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
  }

  bindEvents() {
    const switchBtn = this.container.querySelector('#btn-switch-project');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        if (typeof this.options.onSwitchProject === 'function') this.options.onSwitchProject();
      });
    }

    const cards = this.container.querySelectorAll('.menu-card');
    cards.forEach(card => {
      const handleAction = () => this.handleAction(card.getAttribute('data-route'));

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
