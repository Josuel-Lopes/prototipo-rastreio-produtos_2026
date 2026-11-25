/**
 * Tela de Login - Alvenius (v2)
 * Responsabilidade Única: Interface de autenticação com fidelidade visual aos prints oficiais
 */

import { lucide } from '../components/icons.js';

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
                <span class="label-icon">${lucide('user', { size: 16, strokeWidth: 2, className: 'login-line-icon' })}</span>
                <span class="label-text">Usuário</span>
              </label>
              <input 
                type="text" 
                id="login-username" 
                class="form-input form-input-plain" 
                placeholder="Digite seu nome de usuário" 
                value="josuellopes"
                required
              />
            </div>

            <!-- Campo Senha -->
            <div class="form-group" style="margin-bottom: 0px;">
              <label class="form-label-with-icon" for="login-password">
                <span class="label-icon">${lucide('lock', { size: 16, strokeWidth: 2, className: 'login-line-icon' })}</span>
                <span class="label-text">Senha</span>
              </label>
              <input 
                type="password" 
                id="login-password" 
                class="form-input form-input-plain" 
                placeholder="Digite sua senha" 
                value="123456"
                required
              />
            </div>

            <!-- Botão Entrar com Ícone de Entrada Oficial Lucide -->
            <button type="submit" class="btn btn-primary btn-block btn-lg" id="btn-entrar">
              ${lucide('log-in', { size: 18, strokeWidth: 2.2 })}
              <span>ENTRAR</span>
            </button>
          </form>

          <!-- Rodapé Interno do Card -->
          <div class="login-card-footer">
            &reg; 2026 - Alvenius Tubos e Conexões - v2.3.0
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

      const username = (usernameInput && usernameInput.value.trim()) || 'josuellopes';
      const password = passwordInput ? passwordInput.value : '';

      if (typeof this.options.onLogin === 'function') {
        this.options.onLogin({ username, password });
      }
    });
  }
}

