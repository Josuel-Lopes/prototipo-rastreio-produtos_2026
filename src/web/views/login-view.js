/**
 * Tela de Login - Alvenius
 * Responsabilidade Única: Interface de autenticação com logo dos 3 anéis, campos e rodapé institucional
 */

import { ALVENIUS_RINGS_SVG } from '../components/header.js';

export class LoginView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="view-login-container">
        
        <!-- Cabeçalho da Marca -->
        <div class="login-brand-header">
          <div class="login-rings-logo">
            ${ALVENIUS_RINGS_SVG}
          </div>
          <span class="brand-title" style="font-size: 22px; color: var(--color-primary-dark);">Alvenius</span>
          <span class="login-app-version">v1.3.1</span>
          
          <div class="floating-pill" style="margin-top: 4px;">
            <span class="pill-dot"></span>
            Rastreio de produtos
          </div>
        </div>

        <!-- Card Central de Login -->
        <div class="login-card">
          <h2 class="login-card-title">Login</h2>
          <p class="login-card-subtitle">Entre com seu usuário e senha para continuar.</p>

          <form id="form-login" autocomplete="on">
            <!-- Campo Usuário -->
            <div class="form-group">
              <label class="form-label" for="login-username">Usuário</label>
              <div class="input-container">
                <span class="input-icon-left">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input 
                  type="text" 
                  id="login-username" 
                  class="form-input has-icon-left" 
                  placeholder="Digite seu nome de usuário" 
                  value="josuel" 
                  required
                />
              </div>
            </div>

            <!-- Campo Senha -->
            <div class="form-group" style="margin-bottom: var(--space-xl);">
              <label class="form-label" for="login-password">Senha</label>
              <div class="input-container">
                <span class="input-icon-left">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input 
                  type="password" 
                  id="login-password" 
                  class="form-input has-icon-left" 
                  placeholder="Digite sua senha" 
                  value="••••••••" 
                  required
                />
              </div>
            </div>

            <!-- Botão Entrar -->
            <button type="submit" class="btn btn-primary btn-block btn-lg" id="btn-entrar">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <span>ENTRAR</span>
            </button>
          </form>

          <!-- Rodapé do Card -->
          <div class="login-card-footer">
            &copy; 2026 - Alvenius Tubos e Conexões - v1.3.1
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
