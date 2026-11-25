/**
 * Componente Modal Leitor de QRCode (Scanner Industrial)
 * Responsabilidade Única: Visor escuro com miras azuis fluorescentes e QRCode vetorizado,
 * exibição de instruções e retorno dos dados do Spool mockado lido.
 */

import { lucide } from './icons.js';
import { toast } from './toast.js';

export const MOCK_SPOOL_CADASTRADO = {
  codigo: 'SP-0414-00001-001',
  descricao: 'Tubo Condução Aço Carbono 4" Sch 40',
  componentes: [
    { item: '1', descricao: 'Tubo Condução Aço Carbono 4" Sch 40 x 6000mm', qtd: '1 UN' },
    { item: '2', descricao: 'Flange WNRF 4" 150# ANSI B16.5', qtd: '2 UN' },
    { item: '3', descricao: 'Curva 90° LR 4" Sch 40 A234 WPB', qtd: '1 UN' }
  ]
};

export const MOCK_VALIDAR_ITEMS = [
  {
    tipo: 'spool',
    tipoLabel: 'Spool',
    textoModal: 'Spool: SP041500345003 - CARRETEL FS+FF 20POL X 6,35 X 2961MM 150 PSI',
    textoUltimoLido: 'SP041500345003 - CARRETEL FS+FF 20POL X 6,35 X 2961MM 150 PSI',
    codigo: 'SP041500345003'
  },
  {
    tipo: 'componente',
    tipoLabel: 'Componente',
    textoModal: 'Componente: COD_PRODUTO: FLW21224113Z211 | COD_FORNEC: 005436 | CORRIDA: teste FS | DESC: Flange solto, 20pol, face plana, dimensões conforme AWWA C 207 TAB.2 CLASSE D',
    textoUltimoLido: 'COD_PRODUTO: FLW21224113Z211 | COD_FORNEC: 005436 | CORRIDA: teste FS | DESC: Flange solto, 20pol, face plana, dimensões conforme AWWA C 207 TAB.2 CLASSE D',
    codigo: 'FLW21224113Z211'
  },
  {
    tipo: 'spool',
    tipoLabel: 'Spool',
    textoModal: 'Spool: SP-0414-00001-001 - Tubo Condução Aço Carbono 4" Sch 40',
    textoUltimoLido: 'SP-0414-00001-001 - Tubo Condução Aço Carbono 4" Sch 40',
    codigo: 'SP-0414-00001-001'
  },
  {
    tipo: 'componente',
    tipoLabel: 'Componente',
    textoModal: 'Componente: COD_PRODUTO: TB4012431 | COD_FORNEC: 001290 | CORRIDA: C-4412 | DESC: Tubo Condução Aço Carbono 4" Sch 40 x 6000mm NBR 5590',
    textoUltimoLido: 'COD_PRODUTO: TB4012431 | COD_FORNEC: 001290 | CORRIDA: C-4412 | DESC: Tubo Condução Aço Carbono 4" Sch 40 x 6000mm NBR 5590',
    codigo: 'TB4012431'
  }
];

export class ModalQrCodeComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.mode = 'cadastro'; // 'cadastro', 'caldeiraria' ou 'validar-qrcode'
    this.spool = null;
    this.isScanned = false;
    this.validarScanIndex = 0;
    this.lastScannedItem = null;
    this.showingSuccessModal = false;
    this.onScanCallback = null;
    this.onCloseCallback = null;
    this.onActionCallback = null;
    this.onStartCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ mode = 'cadastro', spool = null, isScanned = false, onScan, onClose, onAction, onStart, defaultCode = null } = {}) {
    this.mode = mode;
    this.spool = spool;
    this.isScanned = Boolean(isScanned);
    this.onScanCallback = onScan;
    this.onCloseCallback = onClose;
    this.onActionCallback = onAction || onStart;
    this.onStartCallback = onStart || onAction;
    if (this.mode === 'validar-qrcode') {
      this.validarScanIndex = 0;
      this.lastScannedItem = null;
      this.showingSuccessModal = false;
      this.isScanned = false;
    }
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

    if (this.mode !== 'cadastro') {
      if (typeof this.onCloseCallback === 'function') {
        this.onCloseCallback();
      }
      return;
    }

    if (this.isScanned) {
      const payload = { ...MOCK_SPOOL_CADASTRADO };

      if (typeof this.onScanCallback === 'function') {
        this.onScanCallback(payload.codigo, payload);
      }
      if (typeof this.onCloseCallback === 'function') {
        this.onCloseCallback(payload.codigo, payload);
      }
    } else {
      if (typeof this.onCloseCallback === 'function') {
        this.onCloseCallback(null, null);
      }
    }
  }

  closeWithoutCallbacks() {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('has-modal');
    }
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      if (this.mode === 'validar-qrcode' && this.showingSuccessModal) {
        this.showingSuccessModal = false;
        this.render();
      } else {
        this.close();
      }
    }
  }

  getProcessName() {
    if (this.mode === 'revestimento') return 'Revestimento';
    if (this.mode === 'pintura') return 'Pintura';
    return 'Caldeiraria';
  }

  getActionConfig(status, processName = null) {
    const key = (status || 'reservado').toLowerCase();
    const proc = processName || this.getProcessName();

    switch (key) {
      case 'reservado':
        return {
          instructionHtml: '<strong>INICIAR</strong> processo produto.',
          buttonLabel: 'Iniciar',
          buttonColor: '#f59e0b',
          nextStatus: 'execucao',
          toastTitle: `${proc} Iniciado`,
          toastMessage: (codigo) => `Spool ${codigo} iniciado com sucesso! Status: Execução.`
        };
      case 'execucao':
        return {
          instructionHtml: '<strong>FINALIZAR</strong> processo produto.',
          buttonLabel: 'Finalizar',
          buttonColor: '#22c55e',
          nextStatus: 'finalizado',
          toastTitle: `${proc} Finalizado`,
          toastMessage: (codigo) => `Spool ${codigo} finalizado com sucesso! Status: Finalizado.`
        };
      case 'pausado':
        return {
          instructionHtml: '<strong>CONTINUAR</strong> processo produto.',
          buttonLabel: 'Continuar',
          buttonColor: '#f97316',
          nextStatus: 'execucao',
          toastTitle: `${proc} Retomado`,
          toastMessage: (codigo) => `Spool ${codigo} retomado com sucesso! Status: Execução.`
        };
      case 'continua':
        return {
          instructionHtml: '<strong>EXECUTAR</strong> processo produto.',
          buttonLabel: 'Executar',
          buttonColor: '#00bcd4',
          nextStatus: 'execucao',
          toastTitle: `${proc} em Execução`,
          toastMessage: (codigo) => `Spool ${codigo} colocado em execução! Status: Execução.`
        };
      case 'finalizado':
        return {
          instructionHtml: '<strong>APROVAR CQ</strong> / Romaneio.',
          buttonLabel: 'Aprovar CQ',
          buttonColor: '#1956ce',
          nextStatus: 'romaneio',
          toastTitle: 'CQ Aprovado',
          toastMessage: (codigo) => `Spool ${codigo} aprovado pelo CQ e enviado para Romaneio!`
        };
      case 'reversivel':
        return {
          instructionHtml: '<strong>REINICIAR</strong> processo produto.',
          buttonLabel: 'Reiniciar',
          buttonColor: '#84cc16',
          nextStatus: 'execucao',
          toastTitle: `${proc} Reiniciado`,
          toastMessage: (codigo) => `Spool ${codigo} reiniciado com sucesso! Status: Execução.`
        };
      default:
        return {
          instructionHtml: '<strong>INICIAR</strong> processo produto.',
          buttonLabel: 'Iniciar',
          buttonColor: '#f59e0b',
          nextStatus: 'execucao',
          toastTitle: `${proc} Atualizado`,
          toastMessage: (codigo) => `Spool ${codigo} iniciado com sucesso!`
        };
    }
  }

  getStatusBadge(status) {
    const map = {
      reservado: { bg: '#f1c40f', text: '#000000', label: 'Reservado' },
      execucao: { bg: '#00bcd4', text: '#ffffff', label: 'Execução' },
      pausado: { bg: '#e67e22', text: '#ffffff', label: 'Pausado' },
      continua: { bg: '#95a5a6', text: '#ffffff', label: 'Continua' },
      finalizado: { bg: '#27ae60', text: '#ffffff', label: 'Finalizado' },
      reversivel: { bg: '#8bc34a', text: '#ffffff', label: 'Reversível' },
      sucata: { bg: '#e74c3c', text: '#ffffff', label: 'Sucata' },
      romaneio: { bg: '#0070ba', text: '#ffffff', label: 'Romaneio' }
    };
    const key = (status || 'reservado').toLowerCase();
    return map[key] || { bg: '#f1c40f', text: '#000000', label: status || 'Reservado' };
  }

  renderQrCodeSvg() {
    return `
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
    `;
  }

  renderPlayIcon(fill = '#ffffff') {
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="${fill}" stroke="${fill}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>`;
  }

  renderViewfinder(includeQrSvg = false) {
    return `
      <div class="qrcode-camera-viewfinder" id="qrcode-camera-viewfinder" title="${includeQrSvg ? 'QRCode capturado' : 'Clique para ler o QRCode'}" role="button" tabindex="0">
        <!-- Feixe de brilho ciano/azul no topo -->
        <div class="qrcode-viewfinder-glow-beam"></div>

        <!-- Linha horizontal de scan laser azul brilhante -->
        <div class="qrcode-viewfinder-laser-line"></div>

        <!-- Caixa de enquadramento centralizada com 4 miras azuis fluorescentes -->
        <div class="qrcode-scanner-frame">
          <div class="qrcode-corner top-left"></div>
          <div class="qrcode-corner top-right"></div>
          <div class="qrcode-corner bottom-left"></div>
          <div class="qrcode-corner bottom-right"></div>
          ${includeQrSvg ? this.renderQrCodeSvg() : ''}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('has-modal');

    if (this.mode === 'validar-qrcode') {
      if (this.showingSuccessModal) {
        this.renderValidarSuccessModal();
      } else {
        this.renderValidarQrCodeMode();
      }
    } else if (this.mode !== 'cadastro') {
      this.renderCaldeirariaMode();
    } else {
      this.renderCadastroMode();
    }

    this.bindEvents();
  }

  renderCaldeirariaMode() {
    const spool = this.spool || {
      codigo: 'SP-0414-00003-001',
      descricao: 'Carretel Reto 24pol x 12.7mm x 3200mm c/ Flange Pescoço',
      status: 'reservado'
    };
    const badgeInfo = this.getStatusBadge(spool.status);
    const actionConfig = this.getActionConfig(spool.status, this.getProcessName());
    const playColor = this.isScanned ? '#ffffff' : '#9ca3af';

    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-floating-pill-title">
          
          <!-- Topo: Pílula flutuante grafite escuro com cantos arredondados -->
          <div class="qrcode-floating-pill-header">
            <div class="qrcode-floating-pill" id="qrcode-floating-pill-title">Leitor de QRCode</div>
          </div>

          <!-- Card 1: Visor da Câmera (Com ou sem desenho SVG do QRCode simulado dependendo de isScanned) -->
          ${this.renderViewfinder(this.isScanned)}

          <!-- Botão Azul "Simula Ler QRCode" posicionado logo abaixo do visor da câmera -->
          <div class="qrcode-scan-action-wrap">
            <button 
              class="qrcode-btn-modal-scan ${this.isScanned ? 'is-scanned' : ''}" 
              id="btn-modal-trigger-scan" 
              type="button" 
              title="${this.isScanned ? 'QRCode lido com sucesso' : 'Clique para simular a leitura do QRCode'}"
              ${this.isScanned ? 'disabled' : ''}
            >
              ${this.isScanned 
                ? `${lucide('check', { size: 18, stroke: '#ffffff', strokeWidth: 2.5 })} <span>QRCode Lido com Sucesso</span>`
                : `${lucide('qr-code', { size: 18, stroke: '#ffffff', strokeWidth: 2 })} <span>Simula Ler QRCode</span>`
              }
            </button>
          </div>

          <!-- Card 2: Instrução e Dados do Spool Clicado -->
          <div class="qrcode-card-instruction-caldeiraria">
            <!-- Badge do status do spool no topo -->
            <div class="qrcode-status-badge" style="background-color: ${badgeInfo.bg}; color: ${badgeInfo.text};">
              ${badgeInfo.label}
            </div>

            <!-- Textos de Instrução -->
            <div class="qrcode-instr-caldeiraria-line1">Ler o QRCode do Spool.</div>
            <div class="qrcode-instr-caldeiraria-line2">${actionConfig.instructionHtml}</div>

            <!-- Linha horizontal azul com degradê luminoso -->
            <div class="qrcode-blue-gradient-line"></div>

            <!-- Bloco de Informações do Spool clicado -->
            <div class="qrcode-spool-info-block">
              <div class="qrcode-spool-info-heading">SPOOL</div>
              <div class="qrcode-spool-info-row">
                <span class="qrcode-spool-info-label">Código &nbsp;:</span>
                <span class="qrcode-spool-info-code">
                  ${this.isScanned 
                    ? spool.codigo 
                    : '<span class="qrcode-placeholder-text">Aguardando leitura do QRCode...</span>'
                  }
                </span>
              </div>
              <div class="qrcode-spool-info-row">
                <span class="qrcode-spool-info-label">Descrição:</span>
                <span class="qrcode-spool-info-desc">
                  ${this.isScanned 
                    ? spool.descricao 
                    : '<span class="qrcode-placeholder-text">Clique em "Simula Ler QRCode" acima para capturar</span>'
                  }
                </span>
              </div>
            </div>
          </div>

          <!-- Card 3: Último QRCode lido (Aguardando leitura... inicialmente, preenchido após leitura) -->
          <div class="qrcode-card-last-read">
            <div class="qrcode-last-read-title">Último QRCode lido:</div>
            ${this.isScanned 
              ? `<div class="qrcode-last-read-inline-data">${spool.codigo} ${spool.descricao}</div>` 
              : `<div class="qrcode-waiting-text">Aguardando leitura...</div>`
            }
          </div>

          <!-- Rodapé de Botões: Grid com 2 botões (Ação dinâmica habilitada após leitura + Fechar em vermelho vivo) -->
          <div class="qrcode-actions-grid">
            <button 
              class="qrcode-btn-iniciar ${!this.isScanned ? 'is-disabled' : ''}" 
              id="qrcode-btn-iniciar" 
              type="button" 
              ${!this.isScanned ? 'disabled' : ''}
              style="${this.isScanned 
                ? `background-color: ${actionConfig.buttonColor} !important; border-color: ${actionConfig.buttonColor} !important; color: #ffffff !important;` 
                : 'background-color: #e5e7eb !important; border-color: #e5e7eb !important; color: #9ca3af !important;'}"
            >
              ${this.renderPlayIcon(playColor)}
              <span>${actionConfig.buttonLabel}</span>
            </button>
            <button class="qrcode-btn-close-red-caldeiraria" id="qrcode-btn-close-bottom" type="button">
              ${lucide('circle-x', { size: 18, stroke: '#ffffff', strokeWidth: 2.2 })}
              <span>Fechar</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  renderCadastroMode() {
    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-modal-header-title">
          
          <!-- Header no Topo (Branco puro, centralizado com linha fina clara abaixo) -->
          <div class="qrcode-top-header">
            <h2 class="qrcode-top-title" id="qrcode-modal-header-title">Leitor de QRCode</h2>
            <div class="qrcode-top-divider"></div>
          </div>

          <!-- Card 1: Visor da Câmera (Com ou sem desenho SVG do QRCode dependendo de isScanned) -->
          ${this.renderViewfinder(this.isScanned)}

          <!-- Botão Azul "Simula Ler QRCode" posicionado logo abaixo do visor da câmera -->
          <div class="qrcode-scan-action-wrap">
            <button 
              class="qrcode-btn-modal-scan ${this.isScanned ? 'is-scanned' : ''}" 
              id="btn-modal-trigger-scan" 
              type="button" 
              title="${this.isScanned ? 'QRCode lido com sucesso' : 'Clique para simular a leitura do QRCode'}"
              ${this.isScanned ? 'disabled' : ''}
            >
              ${this.isScanned 
                ? `${lucide('check', { size: 18, stroke: '#ffffff', strokeWidth: 2.5 })} <span>QRCode Lido com Sucesso</span>`
                : `${lucide('qr-code', { size: 18, stroke: '#ffffff', strokeWidth: 2 })} <span>Simula Ler QRCode</span>`
              }
            </button>
          </div>

          <!-- Card 2: Instruções e Dados do Spool e Componentes -->
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
                <span class="qrcode-modal-meta-value">
                  ${this.isScanned 
                    ? MOCK_SPOOL_CADASTRADO.codigo 
                    : '<span class="qrcode-placeholder-text">Aguardando leitura do QRCode...</span>'
                  }
                </span>
              </div>
              <div class="qrcode-modal-spool-meta">
                <span class="qrcode-modal-meta-label">Descrição:</span>
                <span class="qrcode-modal-meta-value">
                  ${this.isScanned 
                    ? MOCK_SPOOL_CADASTRADO.descricao 
                    : '<span class="qrcode-placeholder-text">Clique em "Simula Ler QRCode" acima para capturar</span>'
                  }
                </span>
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
                    ${this.isScanned 
                      ? MOCK_SPOOL_CADASTRADO.componentes.map(comp => `
                        <tr>
                          <td class="col-modal-item">${comp.item}</td>
                          <td class="col-modal-desc">${comp.descricao}</td>
                          <td class="col-modal-qtd">${comp.qtd}</td>
                        </tr>
                      `).join('')
                      : `
                        <tr>
                          <td colspan="3" class="col-modal-placeholder text-center" style="padding: 16px; color: #9ca3af; font-style: italic;">Aguardando leitura do QRCode do Spool e componentes...</td>
                        </tr>
                      `
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Card 3: Último QRCode Lido -->
          <div class="qrcode-card-last-read">
            <div class="qrcode-last-read-title">Último QRCode lido:</div>
            ${this.isScanned 
              ? `<div class="qrcode-last-read-inline-data">SP-0414-00001-001 | Tubo Condução Aço Carbono 4" Sch 40 | 3 componentes</div>` 
              : `<div class="qrcode-waiting-text">Aguardando leitura...</div>`
            }
          </div>

          <!-- Botão Fechar no Rodapé -->
          <button class="qrcode-btn-close-red" id="qrcode-btn-close-bottom" type="button">
            ${lucide('circle-x', { size: 20, stroke: '#ffffff', strokeWidth: 2.2 })}
            <span>Fechar</span>
          </button>

        </div>
      </div>
    `;
  }

  renderValidarSuccessModal() {
    const item = this.lastScannedItem || MOCK_VALIDAR_ITEMS[0];
    const isSpool = item.tipo === 'spool';
    const label = isSpool ? 'Spool:' : 'Componente:';
    const cleanContent = item.textoModal.replace(/^(Spool:\s*|Componente:\s*)/i, '');

    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-modal-validar-success-title">
          
          <!-- Topo: "Leitor de QRCode" com linha divisória cinza -->
          <div class="qrcode-top-header">
            <h2 class="qrcode-top-title" id="qrcode-modal-validar-success-title">Leitor de QRCode</h2>
            <div class="qrcode-top-divider"></div>
          </div>

          <!-- Card Branco Central de Sucesso -->
          <div class="qrcode-modal-success-card">
            <!-- Botão fechar X vermelho no canto superior direito -->
            <button class="qrcode-success-close-x" id="btn-success-close-x" type="button" aria-label="Fechar" title="Fechar">&times;</button>
            
            <!-- Ícone circular verde com checkmark -->
            <div class="qrcode-success-icon-wrap">
              <div class="qrcode-success-circle-icon">
                ${lucide('check', { size: 30, stroke: '#ffffff', strokeWidth: 3 })}
              </div>
            </div>

            <!-- Título: Sucesso -->
            <h3 class="qrcode-success-title">Sucesso</h3>

            <!-- Mensagem: O QRCode está conforme e Válido. -->
            <p class="qrcode-success-subtitle">O QRCode está conforme e Válido.</p>

            <!-- Exibição dos dados validados -->
            <div class="qrcode-success-data-box">
              <strong class="qrcode-success-data-label">${label}</strong>
              <span class="qrcode-success-data-val">${cleanContent}</span>
            </div>

            <!-- Linha divisória horizontal cinza clara -->
            <div class="qrcode-success-card-divider"></div>

            <!-- Botão Vermelho com ícone circle-x: Fechar -->
            <button class="qrcode-btn-close-red" id="btn-success-close-bottom" type="button">
              ${lucide('circle-x', { size: 20, stroke: '#ffffff', strokeWidth: 2.2 })}
              <span>Fechar</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  renderValidarQrCodeMode() {
    const item = this.lastScannedItem;

    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-modal-validar-title">
          
          <!-- Topo: Leitor de QRCode centralizado com divisória horizontal -->
          <div class="qrcode-top-header">
            <h2 class="qrcode-top-title" id="qrcode-modal-validar-title">Leitor de QRCode</h2>
            <div class="qrcode-top-divider"></div>
          </div>

          <!-- Card 1: Visor da Câmera (Com ou sem desenho SVG do QRCode dependendo de isScanned) -->
          ${this.renderViewfinder(this.isScanned)}

          <!-- Card 2: Instrução e Botão de Leitura -->
          <div class="qrcode-card-validar-instruction">
            <div class="qrcode-validar-instr-line1">Ler o QRCode do Spool e Componentes.</div>
            <div class="qrcode-validar-instr-line2">
              <span class="qrcode-asterisk-red">*</span> Verificar os campos e dados, validar o QRCode.
            </div>
            <div class="qrcode-validar-btn-wrap">
              <button 
                class="qrcode-btn-validar-scan" 
                id="btn-validar-scan" 
                type="button" 
                title="Clique para ler o QRCode"
              >
                ${lucide('qr-code', { size: 18, stroke: '#ffffff', strokeWidth: 2 })}
                <span>Ler QRCode</span>
              </button>
            </div>
          </div>

          <!-- Card 3: Último QRCode Lido -->
          <div class="qrcode-card-last-read">
            <div class="qrcode-last-read-title">Último QRCode lido:</div>
            ${item 
              ? `<div class="qrcode-validar-last-read-data">${item.textoUltimoLido}</div>` 
              : `<div class="qrcode-waiting-text-center">Aguardando leitura...</div>`
            }
          </div>

          <!-- Rodapé: Botão Fechar Vermelho em toda a largura -->
          <button class="qrcode-btn-close-red" id="qrcode-btn-close-bottom" type="button">
            ${lucide('circle-x', { size: 20, stroke: '#ffffff', strokeWidth: 2.2 })}
            <span>Fechar</span>
          </button>

        </div>
      </div>
    `;
  }

  bindEvents() {
    const backdrop = this.container.querySelector('#qrcode-modal-backdrop');
    const closeBtnBottom = this.container.querySelector('#qrcode-btn-close-bottom');
    const btnSuccessCloseX = this.container.querySelector('#btn-success-close-x');
    const btnSuccessCloseBottom = this.container.querySelector('#btn-success-close-bottom');
    const btnIniciar = this.container.querySelector('#qrcode-btn-iniciar');
    const btnTriggerScan = this.container.querySelector('#btn-modal-trigger-scan');
    const btnValidarScan = this.container.querySelector('#btn-validar-scan');
    const viewfinder = this.container.querySelector('#qrcode-camera-viewfinder');

    // Ao fechar a modal de Sucesso: volta para a modal do Leitor de QRCode
    const handleCloseSuccess = (e) => {
      e.stopPropagation();
      this.showingSuccessModal = false;
      this.render();
    };

    if (btnSuccessCloseX) btnSuccessCloseX.addEventListener('click', handleCloseSuccess);
    if (btnSuccessCloseBottom) btnSuccessCloseBottom.addEventListener('click', handleCloseSuccess);

    // Ao fechar a modal do Leitor: fecha a modal e volta para o menu
    const handleClose = (e) => {
      e.stopPropagation();
      if (this.mode === 'validar-qrcode' && this.showingSuccessModal) {
        this.showingSuccessModal = false;
        this.render();
        return;
      }
      this.close();
    };

    if (closeBtnBottom) closeBtnBottom.addEventListener('click', handleClose);

    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          handleClose(e);
        }
      });
    }

    // Ação "Ler QRCode" na modal de Validação: intercala itens e abre a modal de Sucesso
    const handleTriggerScanValidar = (e) => {
      e.stopPropagation();
      const item = MOCK_VALIDAR_ITEMS[this.validarScanIndex % MOCK_VALIDAR_ITEMS.length];
      this.validarScanIndex++;
      this.lastScannedItem = item;
      this.isScanned = true;
      this.showingSuccessModal = true;

      if (typeof this.onScanCallback === 'function') {
        this.onScanCallback(item.codigo, item);
      }

      this.render();
    };

    if (btnValidarScan) {
      btnValidarScan.addEventListener('click', handleTriggerScanValidar);
    }

    // Ação "Ler QRCode" nos outros modos (Cadastro / Caldeiraria)
    const handleTriggerScanGeneral = (e) => {
      e.stopPropagation();
      if (this.mode === 'validar-qrcode') {
        handleTriggerScanValidar(e);
        return;
      }
      if (!this.isScanned) {
        this.isScanned = true;
        if (this.mode !== 'cadastro') {
          this.renderCaldeirariaMode();
        } else {
          this.renderCadastroMode();
        }
        this.bindEvents();
      }
    };

    if (btnTriggerScan) {
      btnTriggerScan.addEventListener('click', handleTriggerScanGeneral);
    }

    if (viewfinder) {
      viewfinder.addEventListener('click', handleTriggerScanGeneral);
    }

    if (btnIniciar) {
      btnIniciar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.isScanned) return;
        const currentSpool = this.spool;
        const actionConfig = this.getActionConfig(currentSpool?.status, this.getProcessName());
        this.closeWithoutCallbacks();
        if (typeof this.onActionCallback === 'function') {
          this.onActionCallback(currentSpool, actionConfig);
        } else if (typeof this.onStartCallback === 'function') {
          this.onStartCallback(currentSpool, actionConfig);
        }
      });
    }
  }
}

