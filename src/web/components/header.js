/**
 * Componente Header Global & Navbar - Alvenius (v2)
 * Responsabilidade Única: Identidade da marca, status de autenticação, pill e rotas de topo
 * Fidelidade Máxima aos Prints Oficiais
 */

export const ALVENIUS_RINGS_SVG = `
<img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
`;

export const ICONS = {
  logout: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
  user: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
};

export class HeaderComponent {
  constructor(containerId = 'app-header', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.isDrawerOpen = false;
  }

  toggleDrawer(open) {
    this.isDrawerOpen = typeof open === 'boolean' ? open : !this.isDrawerOpen;
    const drawerEl = this.container.querySelector('#mobile-drawer-overlay');
    if (drawerEl) {
      if (this.isDrawerOpen) {
        drawerEl.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        drawerEl.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  }

  render({ user, activeRoute = 'login', pillLabel = 'Rastreio de produtos' }) {
    if (!this.container) return;

    this.isDrawerOpen = false;
    document.body.style.overflow = '';

    const isLoggedIn = !!(user && user.isLoggedIn);
    const isLoginPage = activeRoute === 'login' || !isLoggedIn;
    const isMenuPage = activeRoute === 'menu';
    const currentPill = pillLabel || (activeRoute === 'cadastro' ? 'Cadastro' : activeRoute === 'caldeiraria' ? 'Caldeiraria' : 'Rastreio de produtos');

    if (isLoginPage) {
      // 1. Header exclusivo para tela de Login:
      // Logo 3 anéis Alvenius com v2.0.0 abaixo, pill flutuante 'Rastreio de produtos' centralizada.
      // Zero menus, zero botões de usuário.
      this.container.innerHTML = `
        <div class="app-header-container header-mode-login">
          <div class="header-top-bar">
            <div class="header-brand-block" title="Alvenius - Rastreio de Produtos">
              <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
              <span class="brand-version-sub">v2.0.0</span>
            </div>

            <div class="header-center-pill">
              <span class="floating-pill">Rastreio de produtos</span>
            </div>

            <div class="header-spacer-right" aria-hidden="true"></div>
          </div>
        </div>
      `;
      this.bindEvents();
      return;
    }

    if (isMenuPage) {
      // 2. Header do Menu Principal (Dashboard):
      // Logo à esquerda com v2.0.0 abaixo, pill no centro, à direita separador vertical |,
      // ícone de usuário + 'Bem vindo, josuel', separador |, e botão 'Sair' com ícone e texto em vermelho (#dc2626).
      // Sem abas de navegação horizontal no menu e SEM menu hambúrguer no mobile (já está no início).
      this.container.innerHTML = `
        <div class="app-header-container header-mode-menu">
          <div class="header-top-bar">
            <div class="header-brand-block clickable" data-nav="menu" title="Menu Principal">
              <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
              <span class="brand-version-sub">v2.0.0</span>
            </div>

            <div class="header-center-pill">
              <span class="floating-pill">Rastreio de produtos</span>
            </div>

            <div class="header-user-actions header-desktop-user-actions">
              <span class="header-divider-v">|</span>
              <div class="user-profile-badge">
                <span class="user-profile-icon">${ICONS.user}</span>
                <span class="user-welcome-text">Bem vindo, <strong>${user.username || 'josuel'}</strong></span>
              </div>
              <span class="header-divider-v">|</span>
              <button class="btn-header-logout" id="btn-header-logout" title="Encerrar Sessão">
                ${ICONS.logout}
                <span>Sair</span>
              </button>
            </div>

            <!-- Mobile: apenas hambúrguer ☰ à direita -->
            <button class="btn-header-hamburger" id="btn-header-hamburger" aria-label="Abrir Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Drawer mobile: perfil do usuário e Sair -->
          <div class="mobile-drawer-overlay" id="mobile-drawer-overlay">
            <div class="mobile-drawer-content">
              <div class="mobile-drawer-topbar">
                <div class="mobile-drawer-brand">
                  <span class="mobile-drawer-title">RASTREIO DE PRODUTOS</span>
                </div>
                <button class="mobile-drawer-close-btn" id="mobile-drawer-close-btn" aria-label="Fechar Menu" title="Fechar Menu">✕</button>
              </div>
              <div class="mobile-drawer-user-row">
                <span class="user-profile-icon">${ICONS.user}</span>
                <span class="user-welcome-text">Bem vindo, <strong>${user.username || 'josuel'}</strong></span>
              </div>
              <div class="mobile-drawer-logout-box">
                <button class="btn-drawer-logout" id="btn-drawer-logout">
                  ${ICONS.logout}
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      this.bindEvents();
      return;
    }

    // 3. Header das Telas de Trabalho (Cadastro, Caldeiraria, etc.):
    // Logo 3 anéis + texto 'RASTREIO DE PRODUTOS' em caixa alta azul escuro à esquerda,
    // No desktop (> 768px): barra de navegação com tabs inline e usuário/Sair.
    // No mobile (<= 768px): botão hambúrguer (☰) que abre o drawer completo sobreposto (copilot-image-617cf9.png).
    this.container.innerHTML = `
      <div class="app-header-container header-mode-work">
        <div class="header-work-bar">
          
          <!-- Lado Esquerdo: Logo + Título RASTREIO DE PRODUTOS -->
          <div class="header-brand-inline clickable" data-nav="menu" title="Voltar ao Início">
            <div class="header-mini-rings">
              <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
            </div>
            <span class="header-brand-title">RASTREIO DE PRODUTOS</span>
          </div>

          <!-- Centro: Tabs Inline de Navegação (Desktop) -->
          <nav class="header-inline-tabs" aria-label="Navegação de Módulos">
            <ul class="header-tabs-list">
              <li>
                <a href="#" class="tab-link ${activeRoute === 'menu' ? 'active' : ''}" data-nav="menu">
                  INÍCIO
                </a>
              </li>
              <li>
                <a href="#" class="tab-link ${activeRoute === 'cadastro' ? 'active' : ''}" data-nav="cadastro">
                  CADASTRO
                </a>
              </li>
              <li>
                <a href="#" class="tab-link ${activeRoute === 'caldeiraria' ? 'active' : ''}" data-nav="caldeiraria">
                  CALDEIRARIA
                </a>
              </li>
              <li>
                <a href="#" class="tab-link ${activeRoute === 'revestimento' ? 'active' : ''}" data-nav="revestimento">
                  REVESTIMENTO
                </a>
              </li>
              <li>
                <a href="#" class="tab-link ${activeRoute === 'pintura' ? 'active' : ''}" data-nav="pintura">
                  PINTURA
                </a>
              </li>
              <li>
                <a href="#" class="tab-link ${activeRoute === 'validar-qrcode' ? 'active' : ''}" data-nav="validar-qrcode">
                  VALIDAR QRCODE
                </a>
              </li>
              <li>
                <a href="#" class="tab-link ${activeRoute === 'transferencia' ? 'active' : ''}" data-nav="transferencia">
                  TRANSFERÊNCIA
                </a>
              </li>
            </ul>
          </nav>

          <!-- Lado Direito Desktop: Usuário + Sair em Vermelho -->
          <div class="header-user-actions header-desktop-user-actions">
            <span class="header-divider-v">|</span>
            <div class="user-profile-badge">
              <span class="user-profile-icon">${ICONS.user}</span>
              <span class="user-welcome-text">Bem vindo, <strong>${user.username || 'josuel'}</strong></span>
            </div>
            <span class="header-divider-v">|</span>
            <button class="btn-header-logout" id="btn-header-logout" title="Encerrar Sessão">
              ${ICONS.logout}
              <span>Sair</span>
            </button>
          </div>

          <!-- Lado Direito Mobile: Botão Hambúrguer ☰ (visível apenas <= 768px nas telas internas) -->
          <button class="btn-header-hamburger" id="btn-header-hamburger" aria-label="Abrir Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#112346" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

        </div>

        <!-- Pill flutuante logo abaixo do header no centro -->
        <div class="header-center-pill">
          <span class="floating-pill">${currentPill}</span>
        </div>

        <!-- Drawer Mobile Completo Sobreposto (copilot-image-617cf9.png) -->
        <div class="mobile-drawer-overlay" id="mobile-drawer-overlay">
          <div class="mobile-drawer-content">
            
            <!-- Faixa superior: Logo 3 anéis Alvenius + texto 'RASTREIO DE PRODUTOS' (com v2.0.0 abaixo), e no canto direito o botão de fechar '✕' em vermelho/coral claro (#ef4444) -->
            <div class="mobile-drawer-topbar">
              <div class="mobile-drawer-brand clickable" data-nav="menu">
                <div class="mobile-drawer-logo-block">
                  <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
                  <span class="brand-version-sub">v2.0.0</span>
                </div>
                <span class="mobile-drawer-title">RASTREIO DE PRODUTOS</span>
              </div>
              <button class="mobile-drawer-close-btn" id="mobile-drawer-close-btn" aria-label="Fechar Menu" title="Fechar Menu">
                ✕
              </button>
            </div>

            <!-- Pill central flutuante correspondente (ex: 'Caldeiraria') -->
            <div class="mobile-drawer-pill-row">
              <span class="floating-pill">${currentPill}</span>
            </div>

            <!-- Linha do usuário: ícone 👤, texto Bem vindo, josuel -->
            <div class="mobile-drawer-user-row">
              <span class="user-profile-icon">${ICONS.user}</span>
              <span class="user-welcome-text">Bem vindo, <strong>${user.username || 'josuel'}</strong></span>
            </div>

            <!-- Lista vertical completa de itens com bordas horizontais divisórias -->
            <div class="mobile-drawer-nav-card">
              <ul class="mobile-drawer-nav-list">
                
                <li class="mobile-drawer-nav-item ${activeRoute === 'menu' ? 'active' : ''}" data-nav="menu" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 🏠 INÍCIO -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    <span class="drawer-item-label">INÍCIO</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item ${activeRoute === 'cadastro' ? 'active' : ''}" data-nav="cadastro" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 📦+ CADASTRO -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                        <line x1="12" y1="5" x2="12" y2="9"/>
                        <line x1="10" y1="7" x2="14" y2="7"/>
                      </svg>
                    </span>
                    <span class="drawer-item-label">CADASTRO</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item ${activeRoute === 'caldeiraria' ? 'active' : ''}" data-nav="caldeiraria" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 🥣💧 CALDEIRARIA -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 11h16a1 1 0 0 1 1 1v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2a1 1 0 0 1 1-1z"/>
                        <path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/>
                        <path d="M12 18c0 1.5-1 2.5-1 2.5s-1-1-1-2.5a1 1 0 0 1 2 0z" fill="#0070ba"/>
                      </svg>
                    </span>
                    <span class="drawer-item-label">CALDEIRARIA</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item ${activeRoute === 'revestimento' ? 'active' : ''}" data-nav="revestimento" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 🧴 REVESTIMENTO -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="7" y="10" width="8" height="11" rx="0"/>
                        <path d="M9 10V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4"/>
                        <path d="M7 6h6"/>
                        <path d="M10 3h4"/>
                        <circle cx="18" cy="5" r="1" fill="#0070ba"/>
                        <circle cx="21" cy="7" r="1" fill="#0070ba"/>
                        <circle cx="19" cy="9" r="1" fill="#0070ba"/>
                      </svg>
                    </span>
                    <span class="drawer-item-label">REVESTIMENTO</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item ${activeRoute === 'pintura' ? 'active' : ''}" data-nav="pintura" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 🖌️ PINTURA -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="4" y="3" width="16" height="6" rx="0"/>
                        <path d="M12 9v4a2 2 0 0 0 2 2h2v6"/>
                        <line x1="2" y1="6" x2="4" y2="6"/>
                        <line x1="20" y1="6" x2="22" y2="6"/>
                      </svg>
                    </span>
                    <span class="drawer-item-label">PINTURA</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item ${activeRoute === 'validar-qrcode' ? 'active' : ''}" data-nav="validar-qrcode" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 🏁 VALIDAR QRCODE -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        <rect x="14" y="14" width="3" height="3" fill="#0070ba"/>
                        <rect x="18" y="18" width="3" height="3" fill="#0070ba"/>
                        <line x1="14" y1="18" x2="14" y2="21"/>
                        <line x1="18" y1="14" x2="21" y2="14"/>
                      </svg>
                    </span>
                    <span class="drawer-item-label">VALIDAR QRCODE</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item ${activeRoute === 'transferencia' ? 'active' : ''}" data-nav="transferencia" role="button" tabindex="0">
                  <div class="drawer-item-left">
                    <span class="drawer-item-icon">
                      <!-- 🚚 TRANSFERÊNCIA -->
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="6" width="13" height="10" rx="0"/>
                        <path d="M14 9h4l3 3v4h-7V9z"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="17.5" cy="18.5" r="2.5"/>
                      </svg>
                    </span>
                    <span class="drawer-item-label">TRANSFERÊNCIA</span>
                  </div>
                  <span class="drawer-chevron">›</span>
                </li>

                <li class="mobile-drawer-nav-item" data-action="external" role="button" tabindex="0">
                  <a href="https://www.alvenius.com.br" target="_blank" rel="noopener noreferrer" class="drawer-item-external-link">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        <!-- 🌐 IR PARA SITE ALVENIUS -->
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                      </span>
                      <span class="drawer-item-label">IR PARA SITE ALVENIUS</span>
                    </div>
                    <span class="drawer-chevron">›</span>
                  </a>
                </li>

              </ul>
            </div>

            <!-- Linha de Sair no Rodapé do Drawer -->
            <div class="mobile-drawer-logout-box">
              <button class="btn-drawer-logout" id="btn-drawer-logout">
                ${ICONS.logout}
                <span>Sair</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Botão Hambúrguer (Mobile)
    const hamburgerBtn = this.container.querySelector('#btn-header-hamburger');
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDrawer(true);
      });
    }

    // Botão Fechar Drawer '✕' (Mobile)
    const closeBtn = this.container.querySelector('#mobile-drawer-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDrawer(false);
      });
    }

    // Links de navegação (desktop e mobile drawer)
    const navLinks = this.container.querySelectorAll('[data-nav]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-nav');
        this.toggleDrawer(false);
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(route);
        }
      });
    });

    // Itens externos no drawer
    const externalLinks = this.container.querySelectorAll('[data-action="external"]');
    externalLinks.forEach(item => {
      item.addEventListener('click', () => {
        this.toggleDrawer(false);
      });
    });

    // Botão de Sair Desktop
    const logoutBtn = this.container.querySelector('#btn-header-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof this.options.onLogout === 'function') {
          this.options.onLogout();
        }
      });
    }

    // Botão de Sair Mobile Drawer
    const drawerLogoutBtn = this.container.querySelector('#btn-drawer-logout');
    if (drawerLogoutBtn) {
      drawerLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDrawer(false);
        if (typeof this.options.onLogout === 'function') {
          this.options.onLogout();
        }
      });
    }
  }
}

