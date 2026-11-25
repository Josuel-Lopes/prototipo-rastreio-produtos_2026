/**
 * Tela Home de Projetos - Alvenius
 * Responsabilidade Única: primeira tela pós-login (Listar Projetos / Validar QRCode)
 * Reutiliza integralmente o layout e os eventos do MenuView
 */

import { MenuView } from './menu-view.js';

const PROJECT_HOME_MODULES = [
  { id: 'listar-projetos', title: 'LISTAR PROJETOS', subtitle: 'Selecione o projeto para acessar as etapas' },
  { id: 'validar-qrcode', title: 'VALIDAR QRCODE', subtitle: 'Ler QRCode e validar / campos spool e componentes', iconSrc: 'assets/icon-validar-qrcode.png' }
];

export class ProjetosView extends MenuView {
  getModules() {
    return PROJECT_HOME_MODULES;
  }

  renderTop() {
    return '';
  }

  handleAction(id) {
    if (id === 'listar-projetos') {
      if (typeof this.options.onOpenProjects === 'function') this.options.onOpenProjects();
      return;
    }
    super.handleAction(id);
  }
}
