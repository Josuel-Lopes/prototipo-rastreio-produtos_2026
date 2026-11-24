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
          <div class="accent-divider-center"></div>

          <!-- Grid dos 6 Módulos -->
          <div class="menu-grid">
            
            <!-- 1. CADASTRO -->
            <div class="menu-action-card" data-action="navigate" data-route="cadastro" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <img src="assets/icon-cadastro.png" class="menu-box-icon" alt="Cadastro">
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">CADASTRO</span>
                <span class="menu-card-desc">Cadastro Spool e componentes</span>
              </div>
            </div>

            <!-- 2. CALDEIRARIA -->
            <div class="menu-action-card" data-action="navigate" data-route="caldeiraria" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <img src="assets/icon-caldeiraria.png" class="menu-box-icon" alt="Caldeiraria">
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">CALDEIRARIA</span>
                <span class="menu-card-desc">Ler QRCode Spool caldeiraria / próximas etapas processo</span>
              </div>
            </div>

            <!-- 3. REVESTIMENTO -->
            <div class="menu-action-card" data-action="navigate" data-route="revestimento" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <img src="assets/icon-revestimento.png" class="menu-box-icon" alt="Revestimento">
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">REVESTIMENTO</span>
                <span class="menu-card-desc">Ler QRCode Spool revestimento / próximas etapas processo</span>
              </div>
            </div>

            <!-- 4. PINTURA -->
            <div class="menu-action-card" data-action="navigate" data-route="pintura" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <img src="assets/icon-pintura.png" class="menu-box-icon" alt="Pintura">
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">PINTURA</span>
                <span class="menu-card-desc">Ler QRCode Spool pintura / próximas etapas processo</span>
              </div>
            </div>

            <!-- 5. VALIDAR QRCODE -->
            <div class="menu-action-card" data-action="open-qrcode" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <img src="assets/icon-validar-qrcode.png" class="menu-box-icon" alt="Validar QRCode">
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">VALIDAR QRCODE</span>
                <span class="menu-card-desc">Ler QRCode e validar / campos spool e componentes</span>
              </div>
            </div>

            <!-- 6. TRANSFERÊNCIA -->
            <div class="menu-action-card" data-action="open-transfer" tabindex="0" role="button">
              <div class="menu-icon-wrapper">
                <img src="assets/icon-transferencia.png" class="menu-box-icon" alt="Transferência">
              </div>
              <div class="menu-card-info">
                <span class="menu-card-title">TRANSFERÊNCIA</span>
                <span class="menu-card-desc">Ler QRCode e criar transferência / próximas etapas processo</span>
              </div>
            </div>

          </div>

          <!-- Módulo Inferior Largo: IR PARA SITE ALVENIUS -->
          <a href="https://www.alvenius.com.br" target="_blank" rel="noopener noreferrer" class="menu-bottom-btn" id="btn-ir-site-alvenius">
            <div class="menu-bottom-btn-icon">
              <img src="assets/icon-site-alvenius.png" class="menu-box-icon" alt="Site Alvenius">
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
