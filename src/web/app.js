/**
 * Orquestrador Central da Aplicação - Alvenius
 * Responsabilidade Única: Controle de rotas, inicialização e orquestração de componentes, modais e views
 */

import { HeaderComponent } from './components/header.js';
import { toast } from './components/toast.js';
import { ModalTransferenciaComponent } from './components/modal-transferencia.js';
import { ModalQrCodeComponent } from './components/modal-qrcode.js';
import { lucide } from './components/icons.js';

import { LoginView } from './views/login-view.js';
import { MenuView } from './views/menu-view.js';
import { CadastroView } from './views/cadastro-view.js';
import { CaldeirariaView } from './views/caldeiraria-view.js';
import { RevestimentoView } from './views/revestimento-view.js';
import { PinturaView } from './views/pintura-view.js';
import { TransferenciaComponenteView } from './views/transferencia-componente-view.js';
import { NovaTransferenciaView } from './views/nova-transferencia-view.js';

import { getCurrentUser, setCurrentUser, logoutUser, getSpoolByCode } from './mocks/spools-mock.js';

class App {
  constructor() {
    this.currentUser = getCurrentUser();
    this.currentRoute = 'login'; // Inicia na tela de login conforme wireframe
    
    // Inicialização dos componentes modais e globais
    this.header = new HeaderComponent('app-header', {
      onNavigate: (route) => this.navigateTo(route),
      onLogout: () => this.handleLogout()
    });

    this.modalTransferencia = new ModalTransferenciaComponent('modal-root');
    this.modalQrCode = new ModalQrCodeComponent('modal-root');

    // Inicialização das views
    this.views = {
      login: new LoginView('app-view', {
        onLogin: (credentials) => this.handleLogin(credentials)
      }),
      menu: new MenuView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (mode) => this.openQrCodeScanner(null, mode || 'validar-qrcode'),
        onOpenTransfer: () => this.openModalTransferencia()
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
        onNavigate: (route) => this.navigateTo(route)
      }),
      novaTransferencia: new NovaTransferenciaView('app-view', {
        onNavigate: (route) => this.navigateTo(route),
        onOpenQrCode: (callback) => this.openQrCodeScanner(callback, 'transferencia-componente')
      })
    };
  }

  init() {
    console.log('Alvenius Spool Management v2.7.0 iniciado.');
    
    const savedUser = sessionStorage.getItem('app_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        setCurrentUser(this.currentUser);
      } catch (e) {
        this.currentUser = null;
      }
    }

    const savedRoute = sessionStorage.getItem('app_current_route');
    if (savedRoute && this.currentUser && this.currentUser.isLoggedIn) {
      this.navigateTo(savedRoute);
    } else {
      this.navigateTo('login');
    }

    const savedScroll = sessionStorage.getItem('app_scroll_y');
    if (savedScroll) {
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
    sessionStorage.setItem('app_current_route', 'menu');

    toast.success('Login Realizado', `Bem vindo ao sistema Alvenius, ${this.currentUser?.username || 'josuellopes'}!`);
    this.navigateTo('menu');
  }

  handleLogout() {
    logoutUser();
    this.currentUser = null;
    sessionStorage.removeItem('app_user');
    sessionStorage.removeItem('app_current_route');
    sessionStorage.removeItem('app_scroll_y');
    toast.info('Sessão Encerrada', 'Você saiu do sistema com segurança.');
    this.navigateTo('login');
  }

  navigateTo(route) {
    const isAuthed = !!(this.currentUser && this.currentUser.isLoggedIn);
    if (isAuthed && route !== 'validar-qrcode' && route !== 'transferencia') {
      sessionStorage.setItem('app_current_route', route);
    }
    if (!isAuthed && route !== 'login') {
      this.currentRoute = 'login';
      this.render();
      return;
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

    if (route === 'nova-transferencia') {
      this.currentRoute = 'nova-transferencia';
      this.render();
      return;
    }

    this.currentRoute = route;
    this.render();
  }

  getPillLabel(route) {
    switch (route) {
      case 'cadastro': return 'Cadastro';
      case 'caldeiraria': return 'Caldeiraria';
      case 'revestimento': return 'Revestimento';
      case 'pintura': return 'Pintura';
      case 'transferencia':
      case 'transferencia-componente':
      case 'nova-transferencia': return 'Transferência';
      case 'validar-qrcode': return 'Validar QRCode';
      default: return 'Rastreio de produtos';
    }
  }

  render() {
    // 1. Atualiza Header
    this.header.render({
      user: this.currentUser,
      activeRoute: this.currentRoute,
      pillLabel: this.getPillLabel(this.currentRoute)
    });

    // 2. Renderiza a View correspondente
    if (this.currentRoute === 'login') {
      this.views.login.render();
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
    } else if (this.currentRoute === 'nova-transferencia') {
      this.views.novaTransferencia.render();
    }

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderGenericStageView(stageTitle, stageDescription) {
    this.header.render({
      user: this.currentUser,
      activeRoute: this.currentRoute,
      pillLabel: this.getPillLabel(this.currentRoute)
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
              <button class="btn btn-outline btn-lg" id="btn-stage-back-menu">
                <span>Voltar ao Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const btnScan = mainContainer.querySelector('#btn-stage-scan-qrcode');
    const btnBack = mainContainer.querySelector('#btn-stage-back-menu');

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

    if (btnBack) {
      btnBack.addEventListener('click', () => {
        this.navigateTo('menu');
      });
    }
  }

  openQrCodeScanner(onScanSuccess, mode = 'cadastro') {
    this.modalQrCode.open({
      mode,
      onScan: (codeOrData, extra) => {
        if (typeof onScanSuccess === 'function') {
          onScanSuccess(codeOrData, extra);
        }
      },
      onClose: (data) => {
        if ((mode === 'transferencia-componente' || mode === 'transferencia') && data) {
          if (typeof onScanSuccess === 'function') {
            onScanSuccess(data);
          }
        }
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

        const tipoLabel = tipo === 'spool' ? 'SPOOL' : 'COMPONENTE';
        toast.info(
          'Transferência Selecionada',
          `Fluxo de transferência de ${tipoLabel} iniciado. Aponte o leitor para escanear a etiqueta de romaneio.`
        );
        // Em seguida abre o leitor de QR Code para continuar o processo
        setTimeout(() => {
          this.openQrCodeScanner((code) => {
            toast.success(
              'Transferência Concluída',
              `Registro de movimentação do ${tipoLabel} (${code}) gerado para a expedição.`
            );
          });
        }, 400);
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

        toast.success(
          'Avanço de Processo',
          `Spool ${spool.codigo} avançou para a próxima etapa via transferência de ${tipo.toUpperCase()}.`
        );
        if (this.currentRoute === 'caldeiraria') {
          this.views.caldeiraria.render();
        }
      }
    });
  }
}

// Inicializa a aplicação ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

