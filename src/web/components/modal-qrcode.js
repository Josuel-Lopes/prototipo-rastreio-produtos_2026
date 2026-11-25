/**
 * Componente Modal Leitor de QRCode (Scanner Industrial)
 * Responsabilidade Única: Visor escuro com miras azuis fluorescentes e QRCode vetorizado,
 * exibição de instruções e retorno dos dados do Spool mockado lido.
 */

import { lucide } from './icons.js';

export const MOCK_SPOOL_CADASTRADO = {
  codigo: 'SPL-2024-001',
  descricao: 'Tubo Condução Aço Carbono 4" Sch 40',
  componentes: [
    { item: '1', descricao: 'Tubo Condução Aço Carbono 4" Sch 40 x 6000mm', qtd: '1 UN' },
    { item: '2', descricao: 'Flange WNRF 4" 150# ANSI B16.5', qtd: '2 UN' },
    { item: '3', descricao: 'Curva 90° LR 4" Sch 40 A234 WPB', qtd: '1 UN' }
  ]
};

export class ModalQrCodeComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.onScanCallback = null;
    this.onCloseCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ onScan, onClose, defaultCode = null } = {}) {
    this.onScanCallback = onScan;
    this.onCloseCallback = onClose;
    this.isOpen = true;
    this.render();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('has-modal');
    }
    document.removeEventListener('keydown', this.handleKeyDown);

    const payload = { ...MOCK_SPOOL_CADASTRADO };

    if (typeof this.onScanCallback === 'function') {
      this.onScanCallback(payload.codigo, payload);
    }
    if (typeof this.onCloseCallback === 'function') {
      this.onCloseCallback(payload.codigo, payload);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('has-modal');
    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-modal-header-title">
          
          <!-- Header no Topo (Branco puro, centralizado com linha fina clara abaixo) -->
          <div class="qrcode-top-header">
            <h2 class="qrcode-top-title" id="qrcode-modal-header-title">Leitor de QRCode</h2>
            <div class="qrcode-top-divider"></div>
          </div>

          <!-- Card 1: Visor da Câmera (Quadro preto com borda branca 4px, miras azuis, QRCode vetorizado sem laser) -->
          <div class="qrcode-camera-viewfinder" title="Área de Leitura de QRCode">
            <!-- Feixe de brilho ciano/azul no topo -->
            <div class="qrcode-viewfinder-glow-beam"></div>

            <!-- Caixa de enquadramento centralizada próxima ao QRCode com 4 miras azuis fluorescentes -->
            <div class="qrcode-scanner-frame">
              <div class="qrcode-corner top-left"></div>
              <div class="qrcode-corner top-right"></div>
              <div class="qrcode-corner bottom-left"></div>
              <div class="qrcode-corner bottom-right"></div>

              <!-- QRCode vetorizado SVG centralizado no quadro de enquadramento -->
              <svg class="qrcode-camera-svg" viewBox="0 0 100 100" width="135" height="135" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                <!-- Marcador Superior Esquerdo -->
                <rect x="6" y="6" width="26" height="26" fill="none" stroke="#ffffff" stroke-width="4" rx="2" />
                <rect x="14" y="14" width="10" height="10" fill="#ffffff" rx="1" />
                <!-- Marcador Superior Direito -->
                <rect x="68" y="6" width="26" height="26" fill="none" stroke="#ffffff" stroke-width="4" rx="2" />
                <rect x="76" y="14" width="10" height="10" fill="#ffffff" rx="1" />
                <!-- Marcador Inferior Esquerdo -->
                <rect x="6" y="68" width="26" height="26" fill="none" stroke="#ffffff" stroke-width="4" rx="2" />
                <rect x="14" y="76" width="10" height="10" fill="#ffffff" rx="1" />
                <!-- Padrões e Blocos Centrais -->
                <rect x="38" y="8" width="6" height="6" rx="1" />
                <rect x="50" y="8" width="6" height="6" rx="1" />
                <rect x="44" y="20" width="6" height="6" rx="1" />
                <rect x="56" y="20" width="6" height="6" rx="1" />
                <rect x="8" y="38" width="6" height="6" rx="1" />
                <rect x="20" y="44" width="6" height="6" rx="1" />
                <rect x="38" y="38" width="8" height="8" rx="1" />
                <rect x="52" y="38" width="6" height="6" rx="1" />
                <rect x="64" y="38" width="6" height="6" rx="1" />
                <rect x="76" y="38" width="6" height="6" rx="1" />
                <rect x="86" y="38" width="6" height="6" rx="1" />
                <rect x="38" y="52" width="6" height="6" rx="1" />
                <rect x="48" y="48" width="8" height="8" rx="1" />
                <rect x="62" y="52" width="6" height="6" rx="1" />
                <rect x="74" y="48" width="8" height="8" rx="1" />
                <rect x="86" y="52" width="6" height="6" rx="1" />
                <rect x="38" y="66" width="6" height="6" rx="1" />
                <rect x="50" y="66" width="8" height="8" rx="1" />
                <rect x="64" y="66" width="6" height="6" rx="1" />
                <rect x="76" y="66" width="8" height="8" rx="1" />
                <rect x="88" y="66" width="6" height="6" rx="1" />
                <rect x="38" y="80" width="8" height="8" rx="1" />
                <rect x="52" y="80" width="6" height="6" rx="1" />
                <rect x="64" y="80" width="8" height="8" rx="1" />
                <rect x="76" y="80" width="6" height="6" rx="1" />
                <rect x="86" y="82" width="6" height="6" rx="1" />
              </svg>
            </div>
          </div>

          <!-- Card 1: Instruções e Dados do Spool e Componentes (Card branco separado com cantos arredondados) -->
          <div class="qrcode-card-instructions">
            <div class="qrcode-instr-main-title">Ler o QRCode do Spool e Componentes.</div>
            <div class="qrcode-instr-item">1 - Ler o QRCode do Spool.</div>
            <div class="qrcode-instr-item">2 - Ler o QRCode dos componentes.</div>
            <div class="qrcode-blue-gradient-line"></div>

            <!-- Seção Spool e Componentes abaixo do separador azul -->
            <div class="qrcode-modal-spool-section">
              <div class="qrcode-modal-spool-title">Spool:</div>
              <div class="qrcode-modal-spool-meta">
                <span class="qrcode-modal-meta-label">Código:</span>
                <span class="qrcode-modal-meta-value">${MOCK_SPOOL_CADASTRADO.codigo}</span>
              </div>
              <div class="qrcode-modal-spool-meta">
                <span class="qrcode-modal-meta-label">Descrição:</span>
                <span class="qrcode-modal-meta-value">${MOCK_SPOOL_CADASTRADO.descricao}</span>
              </div>

              <!-- Listagem de Componentes -->
              <div class="qrcode-modal-components-box">
                <div class="qrcode-modal-comp-header-title">COMPONENTES</div>
                <table class="qrcode-modal-comp-table">
                  <thead>
                    <tr>
                      <th class="th-modal-item">ITENS</th>
                      <th class="th-modal-desc">DESCRIÇÃO</th>
                      <th class="th-modal-qtd">QTD.</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${MOCK_SPOOL_CADASTRADO.componentes.map(comp => `
                      <tr>
                        <td class="col-modal-item">${comp.item}</td>
                        <td class="col-modal-desc">${comp.descricao}</td>
                        <td class="col-modal-qtd">${comp.qtd}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Card 2: Último QRCode Lido (Card branco separado) -->
          <div class="qrcode-card-last-read">
            <div class="qrcode-last-read-title">Último QRCode lido:</div>
            <div class="qrcode-last-read-inline-data">SPL-2024-001 | Tubo Condução Aço Carbono 4" Sch 40 | 3 componentes</div>
          </div>

          <!-- Botão Fechar no Rodapé (Vermelho sólido #dc2626 com cantos 8px e ícone circle-x) -->
          <button class="qrcode-btn-close-red" id="qrcode-btn-close-bottom" type="button">
            ${lucide('circle-x', { size: 20, stroke: '#ffffff', strokeWidth: 2.2 })}
            <span>Fechar</span>
          </button>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const backdrop = this.container.querySelector('#qrcode-modal-backdrop');
    const closeBtnBottom = this.container.querySelector('#qrcode-btn-close-bottom');

    const handleClose = (e) => {
      e.stopPropagation();
      this.close();
    };

    if (closeBtnBottom) closeBtnBottom.addEventListener('click', handleClose);

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.close();
        }
      });
    }
  }
}

