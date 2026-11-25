/**
 * Componente Modal Listar Projetos - Alvenius
 * Responsabilidade Única: listar projetos (ProjectCard) e devolver o projeto selecionado
 * Reutiliza o padrão visual das modais de transferência (transfer-modal-*)
 */

import { lucide } from './icons.js';
import { ProjectCard } from './project-card.js';

export class ModalProjetosComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.projects = [];
    this.onSelectCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ projects = [], onSelect } = {}) {
    this.projects = projects;
    this.onSelectCallback = onSelect;
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
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) this.close();
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('has-modal');
    this.container.innerHTML = `
      <div class="modal-backdrop" id="projects-modal-backdrop">
        <div class="transfer-modal-dialog project-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="projects-modal-title">
          <button class="transfer-btn-close-x" id="projects-btn-close-x" aria-label="Fechar" title="Fechar modal">&times;</button>

          <div class="transfer-modal-header">
            <h3 class="transfer-modal-title" id="projects-modal-title">
              <span>Selecione qual</span>
              <span>PROJETO</span>
            </h3>
          </div>

          <div class="transfer-modal-divider"></div>

          <div class="transfer-modal-body project-modal-body">
            ${this.projects.length
              ? this.projects.map(p => ProjectCard.render(p)).join('')
              : '<p class="project-modal-empty">Nenhum projeto disponível.</p>'}
          </div>

          <div class="transfer-modal-divider"></div>

          <div class="transfer-modal-footer">
            <button class="transfer-btn-close-bottom" id="projects-btn-close-bottom" type="button" aria-label="Fechar modal">
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
    const backdrop = this.container.querySelector('#projects-modal-backdrop');
    this.container.querySelectorAll('#projects-btn-close-x, #projects-btn-close-bottom')
      .forEach(btn => btn.addEventListener('click', () => this.close()));

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    this.container.querySelectorAll('.project-item-card').forEach(card => {
      const select = () => {
        const project = this.projects.find(p => p.id === card.getAttribute('data-project-id'));
        this.close();
        if (project && typeof this.onSelectCallback === 'function') this.onSelectCallback(project);
      };
      card.addEventListener('click', select);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select();
        }
      });
    });
  }
}
