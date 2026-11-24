/**
 * Componente Header Global & Navbar - Alvenius
 * Responsabilidade Única: Identidade da marca, status de autenticação, pill e rotas de topo
 */

export const ALVENIUS_RINGS_SVG = `
<svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 3 anéis entrelaçados Alvenius -->
  <circle cx="36" cy="35" r="22" stroke="#0070ba" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.95"/>
  <circle cx="60" cy="35" r="22" stroke="#005696" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.95"/>
  <circle cx="84" cy="35" r="22" stroke="#00bcd4" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.95"/>
</svg>
`;

export const ICONS = {
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  cadastro: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
  caldeiraria: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  qrcode: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`
};

export class HeaderComponent {
  constructor(containerId = 'app-header', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  render({ user, activeRoute = 'login', pillLabel = 'Rastreio de produtos' }) {
    if (!this.container) return;

    const isLoggedIn = !!(user && user.isLoggedIn);
    const isLoginPage = activeRoute === 'login' || !isLoggedIn;
    const currentPill = isLoginPage ? 'Rastreio de produtos' : (pillLabel || (activeRoute === 'cadastro' ? 'Cadastro' : activeRoute === 'caldeiraria' ? 'Caldeiraria' : 'Rastreio de produtos'));

    if (isLoginPage) {
      // Header exclusivo para tela de Login:
      // Apenas o logo Alvenius (3 anéis + v1.3.1) à esquerda e a pill central 'Rastreio de produtos'
      // Sem ações de usuário (Bem vindo / Sair) e sem barra de navegação
      this.container.innerHTML = `
        <div class="app-header-container">
          <div class="header-top-bar">
            <div class="header-brand" title="Alvenius - Rastreio de Produtos">
              <div class="brand-logo-rings">
                ${ALVENIUS_RINGS_SVG}
              </div>
              <div class="brand-info">
                <span class="brand-title">Alvenius</span>
                <span class="brand-version">v1.3.1</span>
              </div>
            </div>

            <div class="header-center-pill">
              <span class="floating-pill">
                <span class="pill-dot"></span>
                ${currentPill}
              </span>
            </div>

            <!-- Espaçador invisível para manter a pill central perfeitamente centralizada -->
            <div class="header-user-spacer" style="min-width: 130px;" aria-hidden="true"></div>
          </div>
        </div>
      `;
      this.bindEvents();
      return;
    }

    // Usuário autenticado
    const isMenuPage = activeRoute === 'menu';

    // Barra de navegação horizontal (Tabs secundárias)
    // Exibida apenas nas telas de trabalho/processo; oculta no Menu Principal (onde estão os 6 cards de ação)
    const navBarHtml = !isMenuPage ? `
      <nav class="header-nav-bar" aria-label="Navegação secundária">
        <ul class="header-nav-list">
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'menu' ? 'active' : ''}" data-nav="menu">
              INÍCIO
            </a>
          </li>
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'cadastro' ? 'active' : ''}" data-nav="cadastro">
              CADASTRO
            </a>
          </li>
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'caldeiraria' ? 'active' : ''}" data-nav="caldeiraria">
              CALDEIRARIA
            </a>
          </li>
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'revestimento' ? 'active' : ''}" data-nav="revestimento">
              REVESTIMENTO
            </a>
          </li>
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'pintura' ? 'active' : ''}" data-nav="pintura">
              PINTURA
            </a>
          </li>
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'validar-qrcode' ? 'active' : ''}" data-nav="validar-qrcode">
              VALIDAR QRCODE
            </a>
          </li>
          <li class="header-nav-item">
            <a href="#" class="header-nav-link ${activeRoute === 'transferencia' ? 'active' : ''}" data-nav="transferencia">
              TRANSFERÊNCIA
            </a>
          </li>
        </ul>
      </nav>
    ` : '';

    this.container.innerHTML = `
      <div class="app-header-container">
        <!-- Faixa Superior Global -->
        <div class="header-top-bar">
          <div class="header-brand" data-nav="menu" title="Voltar ao Menu Principal">
            <div class="brand-logo-rings">
              ${ALVENIUS_RINGS_SVG}
            </div>
            <div class="brand-info">
              <span class="brand-title">Alvenius</span>
              <span class="brand-version">v1.3.1</span>
            </div>
          </div>

          <div class="header-center-pill">
            <span class="floating-pill">
              <span class="pill-dot"></span>
              ${currentPill}
            </span>
          </div>

          <div class="header-user-actions">
            <span class="user-badge">
              Bem vindo, <strong>${user.username || 'josuel'}</strong>
            </span>
            <button class="btn-header-logout" id="btn-header-logout" title="Encerrar Sessão">
              ${ICONS.logout}
              <span>Sair</span>
            </button>
          </div>
        </div>

        ${navBarHtml}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Links de navegação
    const navLinks = this.container.querySelectorAll('[data-nav]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-nav');
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(route);
        }
      });
    });

    // Botão de Sair
    const logoutBtn = this.container.querySelector('#btn-header-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof this.options.onLogout === 'function') {
          this.options.onLogout();
        }
      });
    }
  }
}
