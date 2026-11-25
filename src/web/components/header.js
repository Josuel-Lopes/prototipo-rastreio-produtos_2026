/**
 * Componente Header Global & Navbar - Alvenius (v2.2.0)
 * Responsabilidade Única: Identidade da marca, status de autenticação, pill e rotas de topo
 * Arquitetura Unificada e Condicional sem recriação destrutiva no expandir/colapsar.
 */

import { lucide } from './icons.js';
import { PageTitle } from './page-title.js';

export const ICONS = {
  logout: lucide('log-out', { size: 16, strokeWidth: 2.2, className: 'header-icon-logout' }),
  user: lucide('user', { size: 24, stroke: '#111827', strokeWidth: 2, className: 'header-icon-user' }),
  menu: `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" stroke="#757c96" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="0" y1="2" x2="24" y2="2"></line><line x1="0" y1="10" x2="24" y2="10"></line><line x1="0" y1="18" x2="24" y2="18"></line></svg>`,
  close: lucide('x', { size: 24, stroke: '#ef4444', strokeWidth: 2.2, className: 'header-icon-close' })
};

export class HeaderComponent {
  constructor(containerId = 'app-header', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.isMenuExpanded = false;
    this.initialized = false;
    this.lastState = null;
  }

  /**
   * Expansão / Colapso suave sem reconstruir o header
   * Alterna apenas a classe no container e o ícone do botão
   */
  toggleMenu(forceState) {
    this.isMenuExpanded = typeof forceState === 'boolean' ? forceState : !this.isMenuExpanded;

    if (!this.container) return;

    const innerHeader = this.container.querySelector('#app-header-inner');
    const hamburgerBtn = this.container.querySelector('#btn-header-hamburger');

    if (this.isMenuExpanded) {
      this.container.classList.add('menu-expanded');
      if (innerHeader) innerHeader.classList.add('menu-expanded');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) {
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.innerHTML = ICONS.close;
        hamburgerBtn.setAttribute('aria-label', 'Fechar Menu');
        hamburgerBtn.setAttribute('title', 'Fechar Menu');
      }
    } else {
      this.container.classList.remove('menu-expanded');
      if (innerHeader) innerHeader.classList.remove('menu-expanded');
      document.body.style.overflow = '';
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.innerHTML = ICONS.menu;
        hamburgerBtn.setAttribute('aria-label', 'Abrir Menu');
        hamburgerBtn.setAttribute('title', 'Abrir Menu');
      }
    }
  }

  /**
   * Renderiza a casca estática unificada caso ainda não tenha sido criada
   */
  ensureStructure() {
    if (this.initialized && this.container.querySelector('.app-header-container')) {
      return;
    }

    this.container.innerHTML = `
      <div class="app-header-container" id="app-header-inner">
        
        <!-- Barra Superior Primária -->
        <div class="header-main-bar">
          
          <!-- Lado Esquerdo: Logo + Versão (Login / Home) OU Logo + Versão + Título (Work screens) -->
          <div class="header-brand-section">
            <div class="header-brand-block" id="header-brand-block" title="Alvenius">
              <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
              <span class="brand-version-sub" id="header-brand-version">v2.2.0</span>
            </div>
            
            <div class="header-brand-inline" id="header-brand-work" title="Voltar ao Início" data-nav="menu">
              <div class="header-brand-logo-col">
                <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius" class="brand-logo-img">
                <span class="brand-version-sub">v2.2.0</span>
              </div>
              <span class="header-brand-title">RASTREIO DE PRODUTOS</span>
            </div>
          </div>

          <!-- Centro Desktop: Tabs inline de trabalho -->
          <nav class="header-inline-tabs" id="header-inline-tabs" aria-label="Navegação de Módulos">
            <ul class="header-tabs-list">
              <li><a href="#" class="tab-link" data-nav="menu">INÍCIO</a></li>
              <li><a href="#" class="tab-link" data-nav="cadastro">CADASTRO</a></li>
              <li><a href="#" class="tab-link" data-nav="caldeiraria">CALDEIRARIA</a></li>
              <li><a href="#" class="tab-link" data-nav="revestimento">REVESTIMENTO</a></li>
              <li><a href="#" class="tab-link" data-nav="pintura">PINTURA</a></li>
              <li><a href="#" class="tab-link" data-nav="validar-qrcode">VALIDAR QRCODE</a></li>
              <li><a href="#" class="tab-link" data-nav="transferencia">TRANSFERÊNCIA</a></li>
            </ul>
          </nav>

          <!-- Lado Direito Desktop: Usuário + Sair -->
          <div class="header-user-actions" id="header-desktop-user-actions">
            <span class="header-divider-v">|</span>
            <div class="user-profile-badge">
              <span class="user-profile-icon">${ICONS.user}</span>
              <span class="user-welcome-text">Bem vindo, <strong id="header-user-name">josuellopes</strong></span>
            </div>
            <span class="header-divider-v">|</span>
            <button class="btn-header-logout" id="btn-header-logout" title="Encerrar Sessão">
              ${ICONS.logout}
              <span>Sair</span>
            </button>
          </div>

          <!-- Botão Hambúrguer Mobile (Topo Direito) -->
          <button class="btn-header-hamburger" id="btn-header-hamburger" aria-label="Abrir Menu" title="Abrir Menu">
            ${ICONS.menu}
          </button>

          <!-- Espaçador de compensação para Login -->
          <div class="header-spacer-right" id="header-spacer-right" aria-hidden="true"></div>

        </div>

        <!-- Pill Central Flutuante -->
        ${PageTitle.render('Rastreio de produtos')}

        <!-- Painel Dropdown do Menu Expandido (Home e Work Screens) -->
        <div class="header-drawer-panel" id="header-drawer-panel">
          <div class="drawer-backdrop" id="drawer-backdrop"></div>
          <div class="drawer-content" id="drawer-content">
            
            <!-- 1. Linha do Usuário (Compartilhada Mobile / Work) -->
            <div class="drawer-user-row" id="drawer-user-row">
              <span class="user-profile-icon">${lucide('user', { size: 24, stroke: '#111827', strokeWidth: 2 })}</span>
              <span class="user-welcome-text">Bem vindo, <strong id="drawer-user-name">josuel</strong></span>
            </div>

            <!-- 2. Sub-painel Exclusivo da Home: Apenas botão Sair (sem barra divisória extra) -->
            <div class="home-drawer-section" id="home-drawer-section">
              <button class="btn-drawer-logout" id="btn-home-drawer-logout" title="Encerrar Sessão">
                ${lucide('log-out', { size: 22, stroke: '#dc2626', strokeWidth: 2.2 })}
                <span>Sair</span>
              </button>
            </div>

            <!-- 3. Sub-painel Exclusivo das Telas de Trabalho (copilot-image-ed8d08.png & dc8611.png): Lista de 8 módulos + scroll + botão Sair -->
            <div class="work-drawer-section" id="work-drawer-section">
              <div class="mobile-nav-panel">
                <ul class="mobile-drawer-nav-list" id="work-drawer-nav-list">
                  
                  <li class="mobile-drawer-nav-item" data-nav="menu" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('home', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">INÍCIO</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-nav="cadastro" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('package-plus', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">CADASTRO</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-nav="caldeiraria" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('paint-bucket', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">CALDEIRARIA</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-nav="revestimento" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('spray-can', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">REVESTIMENTO</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-nav="pintura" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('paint-roller', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">PINTURA</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-nav="validar-qrcode" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('qr-code', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">VALIDAR QRCODE</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-nav="transferencia" role="button" tabindex="0">
                    <div class="drawer-item-left">
                      <span class="drawer-item-icon">
                        ${lucide('truck', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                      </span>
                      <span class="drawer-item-label">TRANSFERÊNCIA</span>
                    </div>
                    <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                  </li>

                  <li class="mobile-drawer-nav-item" data-action="external" role="button" tabindex="0">
                    <a href="https://www.alvenius.com.br" target="_blank" rel="noopener noreferrer" class="drawer-item-external-link">
                      <div class="drawer-item-left">
                        <span class="drawer-item-icon">
                          ${lucide('globe', { size: 22, stroke: '#111827', strokeWidth: 2 })}
                        </span>
                        <span class="drawer-item-label">IR PARA SITE ALVENIUS</span>
                      </div>
                      <span class="drawer-chevron">${lucide('chevron-right', { size: 22, stroke: '#6b7280', strokeWidth: 2 })}</span>
                    </a>
                  </li>

                </ul>
              </div>

              <div class="work-drawer-logout-box">
                <button class="btn-drawer-logout" id="btn-work-drawer-logout" title="Encerrar Sessão">
                  ${lucide('log-out', { size: 22, stroke: '#dc2626', strokeWidth: 2.2 })}
                  <span>Sair</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;

    this.bindEvents();
    this.initialized = true;
  }

  /**
   * Atualização condicional de visibilidade e dados sem recriar o DOM
   */
  render({ user, activeRoute = 'login', pillLabel = 'Rastreio de produtos' } = {}) {
    if (!this.container) return;

    this.ensureStructure();

    // Fecha o drawer sempre que há transição de rota/renderização
    this.toggleMenu(false);

    const isLoggedIn = !!(user && user.isLoggedIn);
    const isLoginPage = activeRoute === 'login' || !isLoggedIn;
    const isHome = isLoggedIn && activeRoute === 'menu';
    const isWorkScreen = isLoggedIn && !isLoginPage && !isHome;

    const username = user?.username || 'josuel';
    const currentPill = pillLabel || (activeRoute === 'cadastro' ? 'Cadastro' : activeRoute === 'caldeiraria' ? 'Caldeiraria' : 'Rastreio de produtos');

    const innerHeader = this.container.querySelector('#app-header-inner');
    if (!innerHeader) return;

    // Remove todas as classes de modo anteriores
    innerHeader.classList.remove('mode-login', 'mode-home', 'mode-work');

    // Atualiza nome do usuário em todos os locais
    const userNames = this.container.querySelectorAll('#header-user-name, #drawer-user-name');
    userNames.forEach(el => { el.textContent = username; });

    // Atualiza texto da pill central
    PageTitle.setTitle(isWorkScreen ? currentPill : 'Rastreio de produtos');

    if (isLoginPage) {
      // 1. ESTADO LOGIN:
      // Exibe: Logo 3 anéis + v2.2.0 à esquerda e pill "Rastreio de produtos" no centro.
      // NÃO exibe: Usuário, Sair, hambúrguer, nem menu expandido.
      innerHeader.classList.add('mode-login');
      return;
    }

    if (isHome) {
      // 2. ESTADO HOME:
      // Exibe: Logo 3 anéis + v2.2.0 à esquerda, pill "Rastreio de produtos" no centro.
      // Desktop: | 👤 Bem vindo, {user} | 🚪 Sair.
      // Mobile: Botão hambúrguer no topo direito.
      // Menu expandido da Home: Exibe APENAS 👤 Bem vindo, {user} + divisor + botão retangular [-> Sair.
      // NÃO exibe lista de módulos no menu expandido da Home!
      innerHeader.classList.add('mode-home');
      return;
    }

    if (isWorkScreen) {
      // 3. ESTADO TELAS DE TRABALHO:
      // Exibe: Logo 3 anéis + RASTREIO DE PRODUTOS à esquerda, pill da tela ativa no centro.
      // Desktop: tabs de trabalho + | 👤 Bem vindo, {user} | 🚪 Sair.
      // Mobile: Botão hambúrguer no topo direito.
      // Menu expandido das demais telas: Exibe 👤 Bem vindo + lista completa dos 8 módulos com chevron + botão Sair.
      innerHeader.classList.add('mode-work');

      // Atualiza tabs desktop ativas
      const tabs = this.container.querySelectorAll('.tab-link');
      tabs.forEach(tab => {
        const route = tab.getAttribute('data-nav');
        if (route === activeRoute) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      // Atualiza itens do menu expandido ativos
      const drawerItems = this.container.querySelectorAll('.mobile-drawer-nav-item');
      drawerItems.forEach(item => {
        const route = item.getAttribute('data-nav');
        if (route === activeRoute) {
          item.classList.add('active');
          item.classList.add('is-active');
          item.setAttribute('aria-current', 'page');
        } else {
          item.classList.remove('active');
          item.classList.remove('is-active');
          item.removeAttribute('aria-current');
        }
      });
    }
  }

  bindEvents() {
    // 1. Alternância de menu mobile
    const hamburgerBtn = this.container.querySelector('#btn-header-hamburger');
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu();
      });
    }

    // 2. Fechar ao clicar no backdrop translúcido
    const backdrop = this.container.querySelector('#drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu(false);
      });
    }

    const drawerPanel = this.container.querySelector('#header-drawer-panel');
    if (drawerPanel) {
      drawerPanel.addEventListener('click', (e) => {
        if (e.target === drawerPanel) {
          e.preventDefault();
          this.toggleMenu(false);
        }
      });
    }

    // 3. Links de navegação interna (desktop e mobile)
    const navItems = this.container.querySelectorAll('[data-nav]');
    navItems.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-nav');
        this.toggleMenu(false);
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(route);
        }
      });
    });

    // 4. Links externos
    const externalLinks = this.container.querySelectorAll('[data-action="external"]');
    externalLinks.forEach(item => {
      item.addEventListener('click', () => {
        this.toggleMenu(false);
      });
    });

    // 5. Botões de Sair (Desktop, Home Drawer, Work Drawer)
    const logoutButtons = this.container.querySelectorAll('#btn-header-logout, #btn-home-drawer-logout, #btn-work-drawer-logout');
    logoutButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMenu(false);
        if (typeof this.options.onLogout === 'function') {
          this.options.onLogout();
        }
      });
    });
  }
}
