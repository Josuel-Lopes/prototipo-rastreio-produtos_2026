/**
 * Tela de Login - Alvenius (v2)
 * Responsabilidade Única: Interface de autenticação com fidelidade visual aos prints oficiais
 */

export class LoginView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="view-login-container">
        
        <!-- Card Central de Login -->
        <div class="login-card">
          <h2 class="login-card-title">Login</h2>
          <p class="login-card-subtitle">Entre com seu usuário e senha para continuar.</p>

          <form id="form-login" autocomplete="on">
            <!-- Campo Usuário -->
            <div class="form-group" style="margin-bottom: 22px;">
              <label class="form-label-with-icon" for="login-username">
                <span class="label-icon"><svg class="login-line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                <span class="label-text">Usuário</span>
              </label>
              <input 
                type="text" 
                id="login-username" 
                class="form-input form-input-plain" 
                placeholder="Digite seu nome de usuário" 
                required
              />
            </div>

            <!-- Campo Senha -->
            <div class="form-group" style="margin-bottom: 0px;">
              <label class="form-label-with-icon" for="login-password">
                <span class="label-icon"><svg class="login-line-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="11" width="16" height="10"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg></span>
                <span class="label-text">Senha</span>
              </label>
              <input 
                type="password" 
                id="login-password" 
                class="form-input form-input-plain" 
                placeholder="Digite sua senha" 
                required
              />
            </div>

            <!-- Botão Entrar com Ícone de Entrada -->
            <button type="submit" class="btn btn-primary btn-block btn-lg" id="btn-entrar">
              <!-- Ícone de seta de entrada [->] -->
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>ENTRAR</span>
            </button>
          </form>

          <!-- Rodapé Interno do Card -->
          <div class="login-card-footer">
            &reg; 2026 - Alvenius Tubos e Conexões - v2.0.0
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const form = this.container.querySelector('#form-login');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = this.container.querySelector('#login-username');
      const passwordInput = this.container.querySelector('#login-password');

      const username = usernameInput ? usernameInput.value.trim() : 'josuel';
      const password = passwordInput ? passwordInput.value : '';

      if (typeof this.options.onLogin === 'function') {
        this.options.onLogin({ username, password });
      }
    });
  }
}

