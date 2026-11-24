/**
 * Tela Menu Principal / Dashboard - Alvenius
 * Responsabilidade Única: Grade de navegação rápida com os 6 módulos principais e link para o site
 */

export class MenuView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="view-menu-container">
        <div class="menu-card">
          <h2 class="menu-title">Clique no que deseja fazer</h2>

          <!-- Grid dos 6 Módulos -->
          <div class="menu-grid">
            
            <!-- 1. CADASTRO -->
            <div class="menu-action-card" data-action="navigate" data-route="cadastro" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <!-- Ícone Caixa com + -->
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  <line x1="12" y1="5" x2="12" y2="9"></line>
                  <line x1="10" y1="7" x2="14" y2="7"></line>
                </svg>
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">CADASTRO</span>
                <span class="menu-card-desc">Cadastro Spool e componentes</span>
              </div>
            </div>

            <!-- 2. CALDEIRARIA -->
            <div class="menu-action-card" data-action="navigate" data-route="caldeiraria" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <!-- Ícone Soldador / Caldeiraria com chama -->
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2c-4 4.5-6 8-6 11a6 6 0 0 0 12 0c0-3-2-6.5-6-11z"></path>
                  <path d="M12 18a2.5 2.5 0 0 0 2.5-2.5c0-1.5-1.5-3-2.5-4-1 1-2.5 2.5-2.5 4A2.5 2.5 0 0 0 12 18z"></path>
                </svg>
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">CALDEIRARIA</span>
                <span class="menu-card-desc">Ler QRCode Spool caldeiraria / próximas etapas processo</span>
              </div>
            </div>

            <!-- 3. REVESTIMENTO -->
            <div class="menu-action-card" data-action="navigate" data-route="revestimento" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <!-- Ícone Bico de pulverização / spray -->
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 3h4l2 5-3 3 6 6 3-3 5 2v4l-6-2-8-8L3 3z"></path>
                  <circle cx="18" cy="6" r="1"></circle>
                  <circle cx="21" cy="9" r="1"></circle>
                  <circle cx="16" cy="11" r="1"></circle>
                </svg>
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">REVESTIMENTO</span>
                <span class="menu-card-desc">Ler QRCode Spool revestimento / próximas etapas processo</span>
              </div>
            </div>

            <!-- 4. PINTURA -->
            <div class="menu-action-card" data-action="navigate" data-route="pintura" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <!-- Ícone Rolo de pintura com demão -->
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="3" width="16" height="6" rx="2"></rect>
                  <path d="M20 6h2v5a2 2 0 0 1-2 2h-7v4"></path>
                  <rect x="11" y="17" width="4" height="5" rx="1"></rect>
                </svg>
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">PINTURA</span>
                <span class="menu-card-desc">Ler QRCode Spool pintura / próximas etapas processo</span>
              </div>
            </div>

            <!-- 5. VALIDAR QRCODE -->
            <div class="menu-action-card" data-action="open-qrcode" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <!-- Ícone Moldura QRCode -->
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <path d="M7 17h.01M17 17h.01M7 7h.01M17 7h.01"></path>
                </svg>
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">VALIDAR QRCODE</span>
                <span class="menu-card-desc">Ler QRCode e validar / campos spool e componentes</span>
              </div>
            </div>

            <!-- 6. TRANSFERÊNCIA -->
            <div class="menu-action-card" data-action="open-transfer" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <!-- Ícone Caminhão de transporte -->
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">TRANSFERÊNCIA</span>
                <span class="menu-card-desc">Ler QRCode e criar transferência / próximas etapas processo</span>
              </div>
            </div>

          </div>

          <!-- Botão Inferior de Destaque para o Site Alvenius -->
          <a href="https://www.alvenius.com.br" target="_blank" rel="noopener noreferrer" class="menu-bottom-btn" id="btn-ir-site-alvenius">
            <div class="menu-bottom-btn-icon">
              <!-- Ícone Globo / Web -->
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div class="menu-bottom-btn-text">
              <span class="menu-bottom-title">IR PARA SITE ALVENIUS</span>
              <span class="menu-bottom-subtitle">Empresa, Produtos, Orçamento, Catálogos, Contato, etc.</span>
            </div>
          </a>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const cards = this.container.querySelectorAll('.menu-action-card');
    cards.forEach(card => {
      const handleAction = () => {
        const action = card.getAttribute('data-action');
        const route = card.getAttribute('data-route');

        if (action === 'navigate' && typeof this.options.onNavigate === 'function') {
          this.options.onNavigate(route);
        } else if (action === 'open-qrcode' && typeof this.options.onOpenQrCode === 'function') {
          this.options.onOpenQrCode();
        } else if (action === 'open-transfer' && typeof this.options.onOpenTransfer === 'function') {
          this.options.onOpenTransfer();
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
