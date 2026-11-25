/**
 * Orquestrador Central da Aplicação - Alvenius
 * Responsabilidade Única: Controle de rotas, inicialização e orquestração de componentes, modais e views
 */

import { HeaderComponent } from './components/header.js';
import { toast } from './components/toast.js';
import { ModalTransferenciaComponent } from './components/modal-transferencia.js';
import { ModalProcessoTransferenciaComponent } from './components/modal-processo-transferencia.js';
import { ModalQrCodeComponent } from './components/modal-qrcode.js';
import { ModalProjetosComponent } from './components/modal-projetos.js';
import { lucide } from './components/icons.js';

import { LoginView } from './views/login-view.js';
import { MenuView } from './views/menu-view.js';
import { ProjetosView } from './views/projetos-view.js';
import { CadastroView } from './views/cadastro-view.js';
import { CaldeirariaView } from './views/caldeiraria-view.js';
import { RevestimentoView } from './views/revestimento-view.js';
import { PinturaView } from './views/pintura-view.js';
import { TransferenciaComponenteView } from './views/transferencia-componente-view.js';
import { TransferenciaSpoolView } from './views/transferencia-spool-view.js';
import { NovaTransferenciaView } from './views/nova-transferencia-view.js';
import { PropostaView } from './views/proposta-view.js';

import { getCurrentUser, setCurrentUser, logoutUser, getSpoolByCode } from './mocks/spools-mock.js';
import { getProjects, getActiveProject, setActiveProject, clearActiveProject, getProjectRef } from './mocks/projects-mock.js';
import { APP_VERSION } from './version.js';

// Sinalização de "Ambiente de demonstração" (ribbon, selo DEMO e marcas no PDF da proposta)
const DEMO_MODE = true;

// Rotas que dependem de um projeto ativo (app_active_project)
const PROJECT_ROUTES = new Set([
  'menu', 'cadastro', 'caldeiraria', 'revestimento', 'pintura',
  'transferencia', 'transferencia-componente', 'transferencia-spool',
  'nova-transferencia', 'nova-transferencia-spool'
]);

class App {
  constructor() {
    this.currentUser = getCurrentUser();
    this.currentRoute = 'login'; // Inicia na tela de login conforme wireframe
    this.activeSpoolProcess = 'caldeiraria-revestimento'; // Processo ativo de spool
    
    // Inicialização dos componentes modais e globais
    this.header = new HeaderComponent('app-header', {
      onNavigate: (route) => this.navigateTo(route),
      onLogout: () => this.handleLogout(),
      onSwitchProject: () => this.switchProject()
    });

    this.modalTransferencia = new ModalTransferenciaComponent('modal-root');
    this.modalProcessoTransferencia = new ModalProcessoTransferenciaComponent('modal-root');
    this.modalQrCode = new ModalQrCodeComponent('modal-root');
    this.modalProjetos = new ModalProjetosComponent('modal-root');

    // Inicialização das views
    this.views = {
      login: new LoginView('app-view', {
        onLogin: (credentials) => this.handleLogin(credentials)
      }),
      projetos: new ProjetosView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (mode) => this.openQrCodeScanner(null, mode || 'validar-qrcode'),
        onOpenProjects: () => this.openModalProjetos()
      }),
      menu: new MenuView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (mode) => this.openQrCodeScanner(null, mode || 'validar-qrcode'),
        onOpenTransfer: () => this.openModalTransferencia(),
        onSwitchProject: () => this.switchProject()
      }),
      cadastro: new CadastroView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (callback) => this.openQrCodeScanner(callback)
      }),
      caldeiraria: new CaldeirariaView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (callback) => this.openQrCodeScanner(callback),
        onSpoolSelected: (code) => this.handleSpoolSelected(code)
      }),
      revestimento: new RevestimentoView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (callback) => this.openQrCodeScanner(callback),
        onSpoolSelected: (code) => this.handleSpoolSelected(code)
      }),
      pintura: new PinturaView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (callback) => this.openQrCodeScanner(callback),
        onSpoolSelected: (code) => this.handleSpoolSelected(code)
      }),
      transferenciaComponente: new TransferenciaComponenteView('app-view', {
        onNavigate: (route, params) => this.navigateTo(route, params)
      }),
      transferenciaSpool: new TransferenciaSpoolView('app-view', {
        onNavigate: (route, params) => this.navigateTo(route, params)
      }),
      novaTransferencia: new NovaTransferenciaView('app-view', {
        onNavigate: (route, params) => this.navigateTo(route, params),
        onOpenQrCode: (callback, mode, processo) => {
          const actualMode = mode || (this.views?.novaTransferencia?.tipo === 'spool' ? 'transferencia-spool' : 'transferencia-componente');
          const actualProcess = processo || this.activeSpoolProcess;
          this.openQrCodeScanner(callback, actualMode, actualProcess);
        }
      }),
      proposta: new PropostaView('app-view', {
        onNavigate: (route, params) => this.navigateTo(route, params)
      })
    };

    window.navigateTo = (route, params) => this.navigateTo(route, params);
  }

  init() {
    console.log(`Alvenius Spool Management ${APP_VERSION} iniciado.`);
    
    const savedUser = sessionStorage.getItem('app_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        setCurrentUser(this.currentUser);
      } catch (e) {
        this.currentUser = null;
      }
    }

    const savedProcess = sessionStorage.getItem('app_spool_process');
    if (savedProcess) {
      this.activeSpoolProcess = savedProcess;
    }

    // Suporte a acesso direto via URL query parameter (?route=proposta) ou Hash (#proposta)
    const urlParams = new URLSearchParams(window.location.search);
    const queryRoute = urlParams.get('route');
    const hashRoute = window.location.hash.replace(/^#\/?/, '').trim();
    const isDirectProposta = queryRoute === 'proposta' || hashRoute === 'proposta';

    if (isDirectProposta) {
      this.navigateTo('proposta');
    } else {
      const savedRoute = sessionStorage.getItem('app_current_route');
      if (savedRoute && this.currentUser && this.currentUser.isLoggedIn) {
        this.navigateTo(savedRoute);
      } else {
        this.navigateTo('login');
      }
    }

    // Monitoramento de hash para navegação direta (#proposta)
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace(/^#\/?/, '').trim();
      if (h === 'proposta') {
        this.navigateTo('proposta');
      } else if (h === 'menu' && this.currentUser && this.currentUser.isLoggedIn) {
        this.navigateTo('menu');
      }
    });

    const savedScroll = sessionStorage.getItem('app_scroll_y');
    if (savedScroll && !isDirectProposta) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
      }, 50);
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('app_scroll_y', window.scrollY.toString());
    });
  }

  handleLogin({ username, password } = {}) {
    const finalUsername = (username && username.trim()) || 'josuellopes';

    const updatedUser = {
      username: finalUsername,
      name: finalUsername === 'josuellopes' ? 'josuellopes' : (finalUsername.charAt(0).toUpperCase() + finalUsername.slice(1)),
      isLoggedIn: true
    };
    
    setCurrentUser(updatedUser);
    this.currentUser = getCurrentUser();
    sessionStorage.setItem('app_user', JSON.stringify(this.currentUser));
    clearActiveProject();
    sessionStorage.setItem('app_current_route', 'projetos');

    toast.success('Login Realizado', `Bem vindo ao sistema Alvenius, ${this.currentUser?.username || 'josuellopes'}!`);
    this.navigateTo('projetos');
  }

  handleLogout() {
    logoutUser();
    this.currentUser = null;
    sessionStorage.removeItem('app_user');
    sessionStorage.removeItem('app_current_route');
    sessionStorage.removeItem('app_scroll_y');
    clearActiveProject();
    toast.info('Sessão Encerrada', 'Você saiu do sistema com segurança.');
    this.navigateTo('login');
  }

  navigateTo(route, params = {}) {
    // Permite visualização executiva direta da proposta sem obrigatoriedade de login
    if (route === 'proposta') {
      this.currentRoute = 'proposta';
      this.render();
      return;
    }

    const isAuthed = !!(this.currentUser && this.currentUser.isLoggedIn);

    // Menu e telas de etapas/cadastro/transferência exigem projeto ativo: sem projeto, volta à home de projetos
    if (isAuthed && PROJECT_ROUTES.has(route) && !getActiveProject()) {
      route = 'projetos';
      params = {};
    }

    if (isAuthed && route !== 'validar-qrcode' && route !== 'transferencia') {
      sessionStorage.setItem('app_current_route', route);
    }
    if (!isAuthed && route !== 'login') {
      this.currentRoute = 'login';
      this.render();
      return;
    }

    if (params && params.processo) {
      this.activeSpoolProcess = params.processo;
      sessionStorage.setItem('app_spool_process', this.activeSpoolProcess);
    }

    // Rotas de modais diretos
    if (route === 'validar-qrcode') {
      this.openQrCodeScanner(null, 'validar-qrcode');
      return;
    }

    if (route === 'transferencia') {
      this.openModalTransferencia();
      return;
    }

    if (route === 'revestimento') {
      this.currentRoute = 'revestimento';
      this.render();
      return;
    }

    if (route === 'pintura') {
      this.currentRoute = 'pintura';
      this.render();
      return;
    }

    if (route === 'transferencia-componente') {
      this.currentRoute = 'transferencia-componente';
      this.render();
      return;
    }

    if (route === 'transferencia-spool') {
      this.currentRoute = 'transferencia-spool';
      this.views.transferenciaSpool.setProcesso(this.activeSpoolProcess);
      this.render();
      return;
    }

    if (route === 'nova-transferencia-spool') {
      this.currentRoute = 'nova-transferencia-spool';
      this.views.novaTransferencia.setTipo('spool');
      this.views.novaTransferencia.setProcesso(this.activeSpoolProcess);
      this.render();
      return;
    }

    if (route === 'nova-transferencia') {
      this.currentRoute = 'nova-transferencia';
      this.views.novaTransferencia.setTipo('componente');
      this.render();
      return;
    }

    this.currentRoute = route;
    this.render();
  }

  getPillLabel(route) {
    const SPOOL_PILL_MAP = {
      'caldeiraria-revestimento': 'Caldeiraria',
      'revestimento-pintura': 'Revestimento',
      'pintura-faturamento': 'Pintura'
    };

    switch (route) {
      case 'cadastro': return 'Cadastro';
      case 'caldeiraria': return 'Caldeiraria';
      case 'revestimento': return 'Revestimento';
      case 'pintura': return 'Pintura';
      case 'transferencia':
      case 'transferencia-componente':
      case 'nova-transferencia': return 'Transferência';
      case 'nova-transferencia-spool':
      case 'transferencia-spool':
        return SPOOL_PILL_MAP[this.activeSpoolProcess] || 'Caldeiraria';
      case 'validar-qrcode': return 'Validar QRCode';
      default: return 'Rastreio de produtos';
    }
  }

  render() {
    // Caso especial: View executiva da Proposta Comercial possui cabeçalho e action bar próprios
    if (this.currentRoute === 'proposta') {
      const headerEl = document.getElementById('app-header');
      if (headerEl) headerEl.style.display = 'none';
      this.views.proposta.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const headerEl = document.getElementById('app-header');
    if (headerEl) headerEl.style.display = '';

    // 1. Atualiza Header
    this.header.render({
      user: this.currentUser,
      activeRoute: this.currentRoute,
      pillLabel: this.getPillLabel(this.currentRoute),
      project: getProjectRef(getActiveProject())
    });

    // 2. Renderiza a View correspondente
    if (this.currentRoute === 'login') {
      this.views.login.render();
    } else if (this.currentRoute === 'projetos') {
      this.views.projetos.render();
    } else if (this.currentRoute === 'menu') {
      this.views.menu.render();
    } else if (this.currentRoute === 'cadastro') {
      this.views.cadastro.render();
    } else if (this.currentRoute === 'caldeiraria') {
      this.views.caldeiraria.render();
    } else if (this.currentRoute === 'revestimento') {
      this.views.revestimento.render();
    } else if (this.currentRoute === 'pintura') {
      this.views.pintura.render();
    } else if (this.currentRoute === 'transferencia-componente') {
      this.views.transferenciaComponente.render();
    } else if (this.currentRoute === 'transferencia-spool') {
      this.views.transferenciaSpool.render();
    } else if (this.currentRoute === 'nova-transferencia' || this.currentRoute === 'nova-transferencia-spool') {
      this.views.novaTransferencia.render();
    }

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderGenericStageView(stageTitle, stageDescription) {
    this.header.render({
      user: this.currentUser,
      activeRoute: this.currentRoute,
      pillLabel: this.getPillLabel(this.currentRoute),
      project: getProjectRef(getActiveProject())
    });

    const mainContainer = document.getElementById('app-view');
    if (!mainContainer) return;

    mainContainer.innerHTML = `
      <div style="width: 100%; max-width: 1040px; margin: 0 auto;">
        <div class="card">
          <div class="card-header-strip">
            <span class="card-header-title">${stageTitle}</span>
          </div>
          <div class="card-body" style="text-align: center; padding: 48px 24px;">
            <div class="info-box" style="display: inline-flex; text-align: left; margin-bottom: 24px;">
              ${lucide('info', { size: 18, strokeWidth: 2 })}
              <span>${stageDescription}</span>
            </div>
            <h3 style="font-size: 20px; color: var(--color-navy); margin-bottom: 12px;">Etapa de Produção: ${stageTitle}</h3>
            <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto 28px auto;">
              Utilize o leitor óptico de QRCode para registrar a entrada de spools liberados da Caldeiraria nesta bancada de trabalho.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-primary btn-lg" id="btn-stage-scan-qrcode">
                ${lucide('qr-code', { size: 20, strokeWidth: 2 })}
                <span>Ler QRCode de Spool</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const btnScan = mainContainer.querySelector('#btn-stage-scan-qrcode');

    if (btnScan) {
      btnScan.addEventListener('click', () => {
        this.openQrCodeScanner((code, spool) => {
          toast.success(
            `${stageTitle} Atualizado`,
            `Spool ${code} registrado com sucesso na etapa de ${stageTitle.toLowerCase()}!`
          );
        });
      });
    }
  }

  openQrCodeScanner(onScanSuccess, mode = 'cadastro', processo = null) {
    const actualProcesso = processo || this.activeSpoolProcess;
    this.modalQrCode.open({
      mode,
      processo: actualProcesso,
      onScan: (codeOrData, extra) => {
        if (typeof onScanSuccess === 'function') {
          onScanSuccess(codeOrData, extra);
        }
      },
      onClose: (data) => {
        if ((mode === 'transferencia-componente' || mode === 'transferencia-spool' || mode === 'transferencia') && data) {
          if (typeof onScanSuccess === 'function') {
            onScanSuccess(data);
          }
        }
      }
    });
  }

  /** Limpa o projeto ativo e retorna à home de projetos */
  switchProject() {
    clearActiveProject();
    this.navigateTo('projetos');
  }

  openModalProjetos() {
    this.modalProjetos.open({
      projects: getProjects(),
      onSelect: (project) => {
        setActiveProject(project);
        toast.success('Projeto Selecionado', `${project.nome} (${project.codigo})`);
        this.navigateTo('menu');
      }
    });
  }

  openModalTransferencia() {
    this.modalTransferencia.open({
      onSelect: (tipo) => {
        if (tipo === 'componente') {
          this.navigateTo('transferencia-componente');
          return;
        }

        if (tipo === 'spool') {
          setTimeout(() => {
            this.modalProcessoTransferencia.open({
              onSelect: (processo) => {
                this.activeSpoolProcess = processo || 'caldeiraria-revestimento';
                sessionStorage.setItem('app_spool_process', this.activeSpoolProcess);
                this.navigateTo('transferencia-spool', { processo: this.activeSpoolProcess });
              }
            });
          }, 150);
          return;
        }
      }
    });
  }

  handleSpoolSelected(code) {
    const spool = getSpoolByCode(code);
    if (!spool) return;

    this.modalTransferencia.open({
      onSelect: (tipo) => {
        if (tipo === 'componente') {
          this.navigateTo('transferencia-componente');
          return;
        }

        if (tipo === 'spool') {
          setTimeout(() => {
            this.modalProcessoTransferencia.open({
              onSelect: (processo) => {
                this.activeSpoolProcess = processo || 'caldeiraria-revestimento';
                sessionStorage.setItem('app_spool_process', this.activeSpoolProcess);
                this.navigateTo('transferencia-spool', { processo: this.activeSpoolProcess });
              }
            });
          }, 150);
          return;
        }
      }
    });
  }
}

// Inicializa a aplicação ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  if (DEMO_MODE) document.body.classList.add('is-demo');
  const app = new App();
  app.init();
});

