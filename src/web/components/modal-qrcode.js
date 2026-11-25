/**
 * Componente Modal Leitor de QRCode (Scanner Industrial)
 * Responsabilidade Única: Visor escuro com miras azuis, laser animado e simulação de leitura interativa
 */

import { getSpoolByCode, getSpools, updateSpoolStatus } from '../mocks/spools-mock.js';
import { toast } from './toast.js';
import { lucide } from './icons.js';

export class ModalQrCodeComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.lastScannedCode = null;
    this.onScanCallback = null;
    this.onCloseCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ onScan, onClose, defaultCode = null } = {}) {
    this.onScanCallback = onScan;
    this.onCloseCallback = onClose;
    this.lastScannedCode = defaultCode || null;
    this.isOpen = true;
    this.render();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    this.isOpen = false;
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('has-modal');
    }
    document.removeEventListener('keydown', this.handleKeyDown);
    if (typeof this.onCloseCallback === 'function') {
      this.onCloseCallback(this.lastScannedCode);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  // Efeito sonoro industrial simulado de bipe de scanner via Web Audio API (sem assets externos)
  playBeep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignora erro se áudio não permitido pelo navegador
    }
  }

  triggerScan(codeToScan) {
    if (!codeToScan || !codeToScan.trim()) {
      toast.warning('Aviso', 'Digite ou selecione um código para simular o escaneamento.');
      return;
    }

    const code = codeToScan.trim().toUpperCase();
    this.lastScannedCode = code;
    this.playBeep();

    // Efeito visual de flash no viewfinder
    const vf = this.container.querySelector('.scanner-viewfinder-container');
    if (vf) {
      vf.style.transition = 'box-shadow 0.15s ease';
      vf.style.boxShadow = 'inset 0 0 30px #00d2ff, 0 0 20px rgba(0, 210, 255, 0.6)';
      setTimeout(() => {
        if (vf) vf.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.8)';
      }, 300);
    }

    // Atualiza caixa do último código lido
    const lastDisplay = this.container.querySelector('#scanner-last-code-display');
    if (lastDisplay) {
      lastDisplay.innerHTML = `<span style="color: #0070ba;">${code}</span>`;
    }

    const spool = getSpoolByCode(code);
    if (spool) {
      toast.success('QRCode Lido com Sucesso!', `Spool ${spool.codigo} identificado. Status: ${spool.status.toUpperCase()}`);
    } else {
      toast.info('Código Escaneado', `Código ${code} capturado pelo sensor.`);
    }

    if (typeof this.onScanCallback === 'function') {
      this.onScanCallback(code, spool);
    }
  }

  render() {
    if (!this.container) return;

    const spoolsList = getSpools();
    const defaultPlaceholderCode = spoolsList.length > 0 ? spoolsList[0].codigo : 'SP-0414-00002-004';

    this.container.classList.add('has-modal');
    this.container.innerHTML = `
      <div class="modal-backdrop" id="qrcode-modal-backdrop">
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="qrcode-modal-title">
          
          <!-- Cabeçalho do Leitor com Pill Centralizada -->
          <div class="modal-header">
            <div class="scanner-pill-header">
              <span class="floating-pill" id="qrcode-modal-title">
                Leitor de QRCode
              </span>
            </div>
            <button class="modal-close-btn-red" id="qrcode-btn-close-x" aria-label="Fechar" title="Fechar leitor">
              ${lucide('x', { size: 18, strokeWidth: 2.5 })}
            </button>
          </div>

          <div class="modal-body">
            <!-- Viewfinder da Câmera com Miras Ciano e Linha Laser -->
            <div class="scanner-viewfinder-container" title="Área de Leitura de QRCode">
              <div class="scanner-grid-bg"></div>
              
              <!-- 4 Miras de Canto Ciano Brilhante -->
              <div class="scanner-corner top-left"></div>
              <div class="scanner-corner top-right"></div>
              <div class="scanner-corner bottom-left"></div>
              <div class="scanner-corner bottom-right"></div>

              <!-- Linha de Varredura Laser Horizontal Animada Central -->
              <div class="scanner-laser-line"></div>
            </div>

            <!-- Card Branco Inferior com Handle Cinza -->
            <div class="scanner-instructions-card">
              <div class="scanner-handle"></div>
              <div class="scanner-instruction-line1">Ler o QRCode do Spool.</div>
              <div class="scanner-instruction-line2">PARA SEGUIR processo produto.</div>
              <div class="accent-line" style="margin: 10px 0 12px 0;"></div>

              <!-- Caixa do Último QRCode Lido -->
              <div class="scanner-last-code-box">
                <span class="scanner-last-label">Último QRCode lido:</span>
                <span class="scanner-last-value" id="scanner-last-code-display">
                  ${this.lastScannedCode || '<em style="color:#94a3b8; font-weight:normal;">Aguardando leitura...</em>'}
                </span>
              </div>
            </div>

            <!-- Painel Interativo de Simulação para Coletor / Demonstração -->
            <div class="scanner-simulation-actions">
              <button class="btn btn-primary btn-block" id="btn-simulate-instant-scan" style="font-size: 13px;">
                ${lucide('zap', { size: 16, strokeWidth: 2 })}
                <span>Simular Leitura Automática</span>
              </button>
            </div>

            <div class="scanner-manual-input-box">
              <input 
                type="text" 
                id="scanner-manual-code-input" 
                class="form-input" 
                placeholder="Ex: SP-0414-00002-004"
                value="${defaultPlaceholderCode}"
                style="font-size: 13px; font-family: monospace;"
              />
              <button class="btn btn-outline" id="btn-scan-manual-code" style="padding: 6px 12px; font-size: 13px;">
                Escanear
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-danger" id="qrcode-btn-close-bottom">
              ${lucide('circle-x', { size: 16, strokeWidth: 2.2 })}
              <span>Fechar</span>
            </button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const backdrop = this.container.querySelector('#qrcode-modal-backdrop');
    const closeBtnX = this.container.querySelector('#qrcode-btn-close-x');
    const closeBtnBottom = this.container.querySelector('#qrcode-btn-close-bottom');

    const handleClose = (e) => {
      e.stopPropagation();
      this.close();
    };

    if (closeBtnX) closeBtnX.addEventListener('click', handleClose);
    if (closeBtnBottom) closeBtnBottom.addEventListener('click', handleClose);

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close();
        }
      });
    }

    // Botão de simular leitura automática (escolhe um spool do mock)
    const btnSimulate = this.container.querySelector('#btn-simulate-instant-scan');
    if (btnSimulate) {
      btnSimulate.addEventListener('click', () => {
        const spools = getSpools();
        const randomSpool = spools[Math.floor(Math.random() * spools.length)];
        const code = randomSpool ? randomSpool.codigo : 'SP-0414-00002-004';
        
        const manualInput = this.container.querySelector('#scanner-manual-code-input');
        if (manualInput) manualInput.value = code;

        this.triggerScan(code);
      });
    }

    // Botão de escanear código manual digitado
    const btnManual = this.container.querySelector('#btn-scan-manual-code');
    const inputManual = this.container.querySelector('#scanner-manual-code-input');
    if (btnManual && inputManual) {
      const runManual = () => {
        this.triggerScan(inputManual.value);
      };
      btnManual.addEventListener('click', runManual);
      inputManual.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          runManual();
        }
      });
    }
  }
}
