/**
 * Componente Modal Leitor de QRCode (Scanner Industrial)
 * Responsabilidade Única: Visor escuro com miras azuis fluorescentes e QRCode vetorizado,
 * exibição de instruções e retorno dos dados do Spool mockado lido.
 */

import { lucide } from './icons.js';
import { toast } from './toast.js';
import { ProjectTag } from './project-tag.js';
import { getActiveProject, getProjectRef, getProjects } from '../mocks/projects-mock.js';
import { getSpoolByCode, getSpools } from '../mocks/spools-mock.js';

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
    codigo: 'SP041500345003',
    projetoId: 'prj-0414'
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

export const MOCK_TRANSFER_POOL = [
  {
    codigo: 'FLW21224113Z211',
    qtd: '2 UN',
    desc: 'Flange solto, 20pol, face plana, dimensões conforme AWWA C 207 TAB.2 CLASSE D',
    rawQr: 'COD_PRODUTO: FLW21224113Z211 | COD_FORNEC: 005436 | CORRIDA: teste FS | DESC: Flange solto, 20pol, face plana, dimensões conforme AWWA C 207 TAB.2 CLASSE D'
  },
  {
    codigo: 'FLA31258019Z111',
    qtd: '1 UN',
    desc: 'Flange sobreposto, 20pol, face plana, aço carbono forjado ASTM A105',
    rawQr: 'COD_PRODUTO: FLA31258019Z111 | COD_FORNEC: 005436 | CORRIDA: teste FF | DESC: Flange sobreposto, 20pol, face plana, aço carbono forjado ASTM A105'
  },
  {
    codigo: 'CUR90-16-SCH80',
    qtd: '1 UN',
    desc: 'Curva 90 Graus 16pol Sch 80 ASTM A234 WPB',
    rawQr: 'COD_PRODUTO: CUR90-16-SCH80 | COD_FORNEC: 003385 | CORRIDA: K-8819 | DESC: Curva 90 Graus 16pol Sch 80 ASTM A234 WPB'
  },
  {
    codigo: 'TUB-COND-4-SCH40',
    qtd: '6000 MM',
    desc: 'Tubo Condução Aço Carbono 4" Sch 40 x 6000mm NBR 5590',
    rawQr: 'COD_PRODUTO: TUB-COND-4-SCH40 | COD_FORNEC: 001290 | CORRIDA: C-4412 | DESC: Tubo Condução Aço Carbono 4" Sch 40 x 6000mm NBR 5590'
  },
  {
    codigo: 'TE40-SCH40',
    qtd: '1 UN',
    desc: 'Te Reto 4pol Sch 40 ASTM A234 WPB',
    rawQr: 'COD_PRODUTO: TE40-SCH40 | COD_FORNEC: 005436 | CORRIDA: T-1022 | DESC: Te Reto 4pol Sch 40 ASTM A234 WPB'
  }
];

export const MOCK_SPOOL_TRANSFER_POOL = [
  { codigo: 'SP041400035004', qtd: '1 UN', desc: 'Spool Curva 90° 4" SCH 40', rawQr: 'SPOOL: SP041400035004 | PROJ: ALV-2026 | ETAPA: CALDEIRARIA' },
  { codigo: 'SP041400035007', qtd: '1 UN', desc: 'Spool Reta 4" SCH 40', rawQr: 'SPOOL: SP041400035007 | PROJ: ALV-2026 | ETAPA: CALDEIRARIA' },
  { codigo: 'SP041400035046', qtd: '1 UN', desc: 'Spool Curva 45° 4" SCH 80', rawQr: 'SPOOL: SP041400035046 | PROJ: ALV-2026 | ETAPA: CALDEIRARIA' },
  { codigo: 'SP041400035047', qtd: '1 UN', desc: 'Spool Tee 4x2" ANSI 150#', rawQr: 'SPOOL: SP041400035047 | PROJ: ALV-2026 | ETAPA: CALDEIRARIA' },
  { codigo: 'SP041400035051', qtd: '1 UN', desc: 'Spool Redução Excêntrica 6x4"', rawQr: 'SPOOL: SP041400035051 | PROJ: ALV-2026 | ETAPA: CALDEIRARIA' },
  { codigo: 'SP041400035057', qtd: '1 UN', desc: 'Spool Coletor 8" Caldeiraria', rawQr: 'SPOOL: SP041400035057 | PROJ: ALV-2026 | ETAPA: CALDEIRARIA' }
];

export const FORNECEDORES_MAP = {
  '000052': { codigo: '000052', loja: '01', nome: 'ALVENIUS TUBOS E CONEXOES LTDA' },
  '005436': { codigo: '005436', loja: '01', nome: 'TUBOS BRASIL LTDA' },
  '003385': { codigo: '003385', loja: '01', nome: 'PETROPASY TECNOLOGIA E SERVICOS' },
  '004120': { codigo: '004120', loja: '02', nome: 'USINAGEM E MONTAGEM VALE' }
};

export class ModalQrCodeComponent {
  constructor(containerId = 'modal-root') {
    this.container = document.getElementById(containerId);
    this.isOpen = false;
    this.mode = 'cadastro'; // 'cadastro', 'caldeiraria' ou 'validar-qrcode'
    this.processo = 'caldeiraria-revestimento'; // Usado quando mode === 'transferencia-spool'
    this.spool = null;
    this.isScanned = false;
    this.validarScanIndex = 0;
    this.lastScannedItem = null;
    this.showingSuccessModal = false;
    this.transferData = null;
    this.onScanCallback = null;
    this.onCloseCallback = null;
    this.onActionCallback = null;
    this.onStartCallback = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  open({ mode = 'cadastro', spool = null, isScanned = false, processo = 'caldeiraria-revestimento', onScan, onClose, onAction, onStart, defaultCode = null } = {}) {
    this.mode = mode;
    this.processo = processo || 'caldeiraria-revestimento';
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
    } else if (this.isTransferMode()) {
      this.isScanned = false;
      let defOrigemCode = '000052';
      let defDestinoCode = '003385';
      if (this.mode === 'transferencia-spool') {
        if (this.processo === 'revestimento-pintura') {
          defOrigemCode = '003385';
          defDestinoCode = '004120';
        } else if (this.processo === 'pintura-faturamento') {
          defOrigemCode = '004120';
          defDestinoCode = '000052';
        }
      }
      this.transferData = {
        realizador: 'terceiro',
        origem: { ...(FORNECEDORES_MAP[defOrigemCode] || { codigo: '', loja: '', nome: '' }) },
        destino: { ...(FORNECEDORES_MAP[defDestinoCode] || { codigo: '', loja: '', nome: '' }) },
        terceiro: 'SIM',
        componentes: [],
        ultimoLido: '',
        scanIndex: 0
      };
    }
    this.isOpen = true;
    this.render();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  isTransferMode() {
    return this.mode === 'transferencia-componente' || this.mode === 'transferencia-spool' || this.mode === 'transferencia';
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('has-modal');
    }
    document.removeEventListener('keydown', this.handleKeyDown);

    if (this.isTransferMode()) {
      const isSpool = this.mode === 'transferencia-spool';
      const hasComponentes = this.transferData && this.transferData.componentes && this.transferData.componentes.length > 0;
      let payload = null;
      if (hasComponentes) {
        let defOrigemCode = '000052';
        let defDestinoCode = '003385';
        if (isSpool) {
          if (this.processo === 'revestimento-pintura') {
            defOrigemCode = '003385';
            defDestinoCode = '004120';
          } else if (this.processo === 'pintura-faturamento') {
            defOrigemCode = '004120';
            defDestinoCode = '000052';
          }
        }

        const origem = (this.transferData.origem && this.transferData.origem.codigo)
          ? { ...this.transferData.origem }
          : { ...(FORNECEDORES_MAP[defOrigemCode] || FORNECEDORES_MAP['000052']) };
        const destino = (this.transferData.destino && this.transferData.destino.codigo)
          ? { ...this.transferData.destino }
          : { ...(FORNECEDORES_MAP[defDestinoCode] || FORNECEDORES_MAP['003385']) };

        payload = {
          origem,
          destino,
          terceiro: this.transferData.realizador === 'terceiro' ? 'SIM' : 'NÃO',
          itens: [...this.transferData.componentes],
          componentes: [...this.transferData.componentes],
          tipo: isSpool ? 'spool' : 'componente',
          processo: this.processo,
          ...(getProjectRef(getActiveProject()) || {})
        };
      }

      if (typeof this.onCloseCallback === 'function') {
        this.onCloseCallback(payload);
      }
      return;
    }

    if (this.mode !== 'cadastro') {
      if (typeof this.onCloseCallback === 'function') {
        this.onCloseCallback();
      }
      return;
    }

    if (this.isScanned) {
      const payload = { ...MOCK_SPOOL_CADASTRADO, ...(getProjectRef(getActiveProject()) || {}) };

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

  /**
   * Faixa de contexto com o projeto (do spool em leitura ou o projeto ativo)
   */
  renderProjectContext() {
    const row = ProjectTag.renderRow(getProjectRef(getActiveProject()), { label: 'Projeto ativo:' });
    return row ? `<div class="project-context-bar qrcode-project-context">${row}</div>` : '';
  }

  /** Spool lido pertence a outro projeto que não o ativo? (modos de etapa) */
  isForeignSpool(spool = this.spool) {
    const project = getActiveProject();
    return Boolean(spool && project && spool.projetoId && spool.projetoId !== project.id);
  }

  /** Spool da mesma etapa vinculado a outro projeto (simulação de leitura indevida no DEMO) */
  findForeignStageSpool() {
    return getSpools(this.mode).find(s => this.isForeignSpool(s)) || null;
  }

  warnForeignSpool(spool = this.spool, label = 'Spool') {
    toast.warning(
      `${label} de outro projeto`,
      `${label} ${spool.codigo} pertence ao projeto ${spool.projetoCodigo} · ${spool.projetoNome}. Troque o projeto para movimentá-lo.`
    );
  }

  /** Etapa (spools-mock) de origem do processo de transferência de spool */
  getTransferStageKey() {
    if (this.processo === 'revestimento-pintura') return 'revestimento';
    if (this.processo === 'pintura-faturamento') return 'pintura';
    return 'caldeiraria';
  }

  /**
   * DEMO: item lido que pertence a outro projeto (transferência).
   * Spool: spool real da etapa de origem vinculado a outro projeto; Componente: item do pool em outro projeto.
   */
  findForeignTransferItem() {
    const active = getActiveProject();
    if (!active) return null;
    if (this.mode === 'transferencia-spool') {
      const spool = getSpools(this.getTransferStageKey()).find(s => this.isForeignSpool(s));
      return spool ? { codigo: spool.codigo, desc: spool.descricao, ...getProjectRef(spool.projetoId) } : null;
    }
    const other = getProjects().find(p => p.id !== active.id);
    const item = MOCK_TRANSFER_POOL[(this.transferData?.scanIndex || 0) % MOCK_TRANSFER_POOL.length];
    return other && item ? { codigo: item.codigo, desc: item.desc, ...getProjectRef(other.id) } : null;
  }

  /**
   * Resolve o projeto do item lido na validação (spool cadastrado no mock ou vínculo do próprio QRCode)
   */
  resolveScannedProject(item) {
    if (!item || item.tipo !== 'spool') return null;
    const spool = getSpoolByCode(item.codigo);
    if (spool && spool.projetoId) return getProjectRef(spool.projetoId);
    return item.projetoId ? getProjectRef(item.projetoId) : null;
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

  /**
   * Feedback de leitura colado ao leitor (faixa sobre a borda inferior do visor), visível sem scroll.
   * @param {{type: 'success'|'warning'|'error', html: string}|null} feedback
   */
  renderReadFeedback(feedback) {
    if (!feedback || !feedback.html) return '';
    const icons = {
      success: lucide('circle-check', { size: 16, stroke: '#067647', strokeWidth: 2.2 }),
      warning: lucide('circle-alert', { size: 16, stroke: '#b45309', strokeWidth: 2.2 }),
      error: lucide('circle-x', { size: 16, stroke: '#b42318', strokeWidth: 2.2 })
    };
    const type = icons[feedback.type] ? feedback.type : 'warning';
    const role = type === 'success' ? 'status' : 'alert';
    return `
      <div class="qrcode-read-feedback is-${type} ${feedback.className || ''}" id="qrcode-read-feedback" role="${role}" aria-live="${type === 'success' ? 'polite' : 'assertive'}">
        ${icons[type]}
        <span>${feedback.html}</span>
      </div>
    `;
  }

  /** Garante que o feedback de leitura esteja visível (sem rolagem manual). */
  revealReadFeedback() {
    const el = this.container && this.container.querySelector('#qrcode-read-feedback');
    if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ block: 'nearest' });
  }

  renderViewfinder(includeQrSvg = false, feedback = null) {
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
        ${this.renderReadFeedback(feedback)}
      </div>
    `;
  }

  render() {
    if (!this.container) return;

    this.container.classList.add('has-modal');

    if (this.isTransferMode()) {
      this.renderTransferenciaMode();
    } else if (this.mode === 'validar-qrcode') {
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

  renderTransferenciaMode() {
    const isSpool = this.mode === 'transferencia-spool';
    const data = this.transferData || {
      realizador: 'terceiro',
      origem: { codigo: '', loja: '', nome: '' },
      destino: { codigo: '', loja: '', nome: '' },
      terceiro: 'SIM',
      componentes: [],
      ultimoLido: '',
      scanIndex: 0
    };
    const isAlvenius = data.realizador === 'alvenius';
    const origemLabel = isAlvenius ? 'Origem Alvenius:' : 'Origem Terceiro:';

    const DESTINO_ETAPAS = {
      'caldeiraria-revestimento': 'Revestimento',
      'revestimento-pintura': 'Pintura',
      'pintura-faturamento': 'Faturamento'
    };
    const etapaDestinoNome = isSpool ? (DESTINO_ETAPAS[this.processo] || 'serviço') : 'serviço';
    const step3Text = isSpool
      ? `3 - Ler o QRCode do Spool para ${etapaDestinoNome}.`
      : '3 - Ler o QRCode do Componente para serviço.';

    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-floating-pill-title">
          
          <!-- Topo: Pílula escura flutuante central com o título "Leitor de QRCode" -->
          <div class="qrcode-floating-pill-header">
            <div class="qrcode-floating-pill" id="qrcode-floating-pill-title">Leitor de QRCode</div>
          </div>
          ${this.renderProjectContext()}

          <!-- Card 1: Visor da Câmera (Com desenho SVG do QRCode simulado) -->
          ${this.renderViewfinder(data.componentes.length > 0, this.getTransferFeedback(data, isSpool))}

          <!-- Botão azul para simular leitura "Simula Ler QRCode" -->
          <div class="qrcode-scan-action-wrap">
            <button 
              class="qrcode-btn-modal-scan" 
              id="btn-modal-trigger-scan" 
              type="button" 
              title="Clique para simular a leitura do QRCode"
            >
              ${lucide('qr-code', { size: 18, stroke: '#ffffff', strokeWidth: 2 })}
              <span>Simula Ler QRCode</span>
            </button>
            <button class="qrcode-btn-demo-foreign demo-only" id="btn-modal-demo-foreign-transfer" type="button" title="Simula a leitura de um item que pertence a outro projeto">
              Simular leitura de ${isSpool ? 'spool' : 'componente'} de outro projeto
            </button>
          </div>

          <!-- Card 2: Card Branco de Conteúdo -->
          <div class="qrcode-card-transferencia">
            <!-- Cabeçalho de texto instrucional -->
            <div class="qrcode-instr-transfer-header">
              <div class="qrcode-instr-transfer-title">Ler QRCode do ${isSpool ? 'Spool' : 'Componente'}.</div>
              <div class="qrcode-instr-transfer-step">1 - Selecione realizador.</div>
              <div class="qrcode-instr-transfer-step">2 - Selecione o fornecedor.</div>
              <div class="qrcode-instr-transfer-step">${step3Text}</div>
            </div>

            <!-- Linha horizontal com degradê azul luminoso -->
            <div class="qrcode-blue-gradient-line"></div>

            <!-- Pergunta com ícone circular (?) -->
            <div class="qrcode-transfer-realizador-section">
              <div class="qrcode-transfer-question-row">
                <span class="qrcode-transfer-question-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                <span class="qrcode-transfer-question-text">Serviço realizado por?</span>
              </div>
              <div class="qrcode-transfer-radios-row">
                <label class="qrcode-radio-label">
                  <input 
                    type="radio" 
                    name="modal-transfer-realizador" 
                    value="alvenius" 
                    ${isAlvenius ? 'checked' : ''} 
                    class="qrcode-radio-input" 
                    id="radio-realizador-alvenius"
                  />
                  <span>Alvenius</span>
                </label>
                <label class="qrcode-radio-label">
                  <input 
                    type="radio" 
                    name="modal-transfer-realizador" 
                    value="terceiro" 
                    ${!isAlvenius ? 'checked' : ''} 
                    class="qrcode-radio-input" 
                    id="radio-realizador-terceiro"
                  />
                  <span>Terceiro</span>
                </label>
              </div>
            </div>

            <!-- Campo Dropdown 1: Origem Terceiro: -->
            <div class="qrcode-transfer-form-group">
              <label class="qrcode-transfer-label" for="qrcode-select-origem">${origemLabel}</label>
              <div class="qrcode-select-wrapper">
                <select class="qrcode-transfer-select" id="qrcode-select-origem">
                  <option value="" ${!data.origem.codigo ? 'selected' : ''}>Selecione...</option>
                  <option value="000052" ${data.origem.codigo === '000052' ? 'selected' : ''}>000052 - 01 - ALVENIUS TUBOS E CONEXOES LTDA</option>
                  <option value="003385" ${data.origem.codigo === '003385' ? 'selected' : ''}>003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS</option>
                  <option value="004120" ${data.origem.codigo === '004120' ? 'selected' : ''}>004120 - 02 - USINAGEM E MONTAGEM VALE</option>
                  <option value="005436" ${data.origem.codigo === '005436' ? 'selected' : ''}>005436 - 01 - TUBOS BRASIL LTDA</option>
                </select>
                <div class="qrcode-select-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Campo Dropdown 2: Destino Fornecedor: -->
            <div class="qrcode-transfer-form-group">
              <label class="qrcode-transfer-label" for="qrcode-select-destino">Destino Fornecedor:</label>
              <div class="qrcode-select-wrapper">
                <select class="qrcode-transfer-select" id="qrcode-select-destino">
                  <option value="" ${!data.destino.codigo ? 'selected' : ''}>Selecione...</option>
                  <option value="000052" ${data.destino.codigo === '000052' ? 'selected' : ''}>000052 - 01 - ALVENIUS TUBOS E CONEXOES LTDA</option>
                  <option value="003385" ${data.destino.codigo === '003385' ? 'selected' : ''}>003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS</option>
                  <option value="004120" ${data.destino.codigo === '004120' ? 'selected' : ''}>004120 - 02 - USINAGEM E MONTAGEM VALE</option>
                </select>
                <div class="qrcode-select-arrow" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Tabela de Spools ou Componentes adicionados -->
            <div class="qrcode-transfer-comp-section">
              <div class="qrcode-transfer-comp-title">${isSpool ? 'Spools' : 'Componente'}</div>
              <div class="qrcode-transfer-table-box">
                <table class="qrcode-transfer-table">
                  <thead>
                    <tr>
                      <th class="th-transfer-item">ITENS</th>
                      <th class="th-transfer-cod">CÓDIGO</th>
                      <th class="th-transfer-action"></th>
                    </tr>
                  </thead>
                  <tbody id="qrcode-transfer-tbody">
                    ${data.componentes.map((comp, idx) => `
                      <tr data-index="${idx}">
                        <td class="col-transfer-item">${comp.item || String(idx + 1).padStart(2, '0')}</td>
                        <td class="col-transfer-cod">${comp.codigo}</td>
                        <td class="col-transfer-action">
                          <button type="button" class="btn-remove-transfer-comp" data-index="${idx}" title="Remover ${isSpool ? 'spool' : 'componente'} ${comp.codigo}">
                            ${lucide('trash-2', { size: 16, stroke: '#ef4444', strokeWidth: 1.8 })}
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                    ${data.componentes.length === 0 ? `
                      <tr>
                        <td colspan="3" class="col-transfer-empty">Aguardando leitura do QRCode...</td>
                      </tr>
                    ` : ''}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- Card 3: Último QRCode lido: -->
          <div class="qrcode-card-last-read">
            <div class="qrcode-last-read-title">Último QRCode lido:</div>
            ${data.ultimoLido 
              ? `<div class="qrcode-last-read-inline-data" id="qrcode-transfer-last-read">${data.ultimoLido}</div>` 
              : `<div class="qrcode-waiting-text" id="qrcode-transfer-last-read">Aguardando leitura...</div>`
            }
          </div>

          <!-- Botão inferior de fechar -->
          <button class="qrcode-btn-close-red" id="qrcode-btn-close-bottom" type="button" title="Fechar e aplicar dados na transferência">
            ${lucide('circle-x', { size: 20, stroke: '#ffffff', strokeWidth: 2.2 })}
            <span>Fechar</span>
          </button>

        </div>
      </div>
    `;
  }

  getTransferFeedback(data, isSpool) {
    const label = isSpool ? 'Spool' : 'Componente';
    if (data.foreignItem) {
      const f = data.foreignItem;
      return {
        type: 'warning',
        className: 'qrcode-foreign-alert qrcode-transfer-foreign-alert',
        html: `${label} <strong>${f.codigo}</strong> pertence ao projeto <strong>${f.projetoCodigo}</strong> · ${f.projetoNome}. Não foi adicionado à transferência.`
      };
    }
    if (data.lastAdded) {
      return { type: 'success', html: `${label} <strong>${data.lastAdded}</strong> adicionado à transferência.` };
    }
    return null;
  }

  getStageFeedback(spool, isForeign) {
    if (!this.isScanned) return null;
    if (isForeign) {
      return {
        type: 'warning',
        className: 'qrcode-foreign-alert',
        html: `Spool <strong>${spool.codigo}</strong> pertence ao projeto <strong>${spool.projetoCodigo || 'não identificado'}</strong>${spool.projetoNome ? ` · ${spool.projetoNome}` : ''}. Movimentação bloqueada.`
      };
    }
    return { type: 'success', html: `Spool <strong>${spool.codigo}</strong> lido com sucesso.` };
  }

  renderCaldeirariaMode() {
    const spool = this.spool || {
      codigo: 'SP-0414-00003-001',
      descricao: 'Carretel Reto 24pol x 12.7mm x 3200mm c/ Flange Pescoço',
      status: 'reservado'
    };
    const badgeInfo = this.getStatusBadge(spool.status);
    const actionConfig = this.getActionConfig(spool.status, this.getProcessName());
    const isForeign = this.isScanned && this.isForeignSpool(spool);
    const canAct = this.isScanned && !isForeign;
    const playColor = canAct ? '#ffffff' : '#9ca3af';
    const foreignDemoSpool = !this.isScanned ? this.findForeignStageSpool() : null;

    this.container.innerHTML = `
      <div class="modal-backdrop qrcode-backdrop-fullscreen" id="qrcode-modal-backdrop">
        <div class="qrcode-container-wrapper" role="dialog" aria-modal="true" aria-labelledby="qrcode-floating-pill-title">
          
          <!-- Topo: Pílula flutuante grafite escuro com cantos arredondados -->
          <div class="qrcode-floating-pill-header">
            <div class="qrcode-floating-pill" id="qrcode-floating-pill-title">Leitor de QRCode</div>
          </div>
          ${this.renderProjectContext()}

          <!-- Card 1: Visor da Câmera (Com ou sem desenho SVG do QRCode simulado dependendo de isScanned) -->
          ${this.renderViewfinder(this.isScanned, this.getStageFeedback(spool, isForeign))}

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
            ${foreignDemoSpool ? `
              <button class="qrcode-btn-demo-foreign demo-only" id="btn-modal-demo-foreign" type="button" title="Simula a leitura de um spool que pertence a outro projeto">
                Simular leitura de spool de outro projeto
              </button>
            ` : ''}
          </div>

          <!-- Card 2: Instrução e Dados do Spool Clicado -->
          <div class="qrcode-card-instruction-caldeiraria">
            <!-- Badge do status do spool no topo -->
            <div class="qrcode-status-badge" style="background-color: ${badgeInfo.bg}; color: ${badgeInfo.text};">
              ${badgeInfo.label}
            </div>

            <!-- Textos de Instrução -->
            <div class="qrcode-instr-caldeiraria-line1">Ler o QRCode do Spool.</div>
            ${isForeign
              ? `<div class="qrcode-instr-caldeiraria-line2 is-blocked">Movimentação bloqueada: spool de outro projeto.</div>`
              : `<div class="qrcode-instr-caldeiraria-line2">${actionConfig.instructionHtml}</div>`}

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
              ${this.isScanned ? ProjectTag.renderRow(spool, { className: 'qrcode-spool-project-row' }) : ''}
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
              class="qrcode-btn-iniciar ${!canAct ? 'is-disabled' : ''}" 
              id="qrcode-btn-iniciar" 
              type="button" 
              ${!canAct ? 'disabled' : ''}
              style="${canAct 
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
          ${this.renderProjectContext()}

          <!-- Card 1: Visor da Câmera (Com ou sem desenho SVG do QRCode dependendo de isScanned) -->
          ${this.renderViewfinder(this.isScanned, this.isScanned ? { type: 'success', html: `Spool <strong>${MOCK_SPOOL_CADASTRADO.codigo}</strong> lido · ${MOCK_SPOOL_CADASTRADO.componentes.length} componentes.` } : null)}

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
              ${ProjectTag.renderRow(item, { className: 'qrcode-success-project-row', emptyText: isSpool ? 'Spool sem projeto vinculado' : '' })}
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
          ${this.renderViewfinder(this.isScanned, item ? { type: 'success', html: `QRCode válido: <strong>${item.codigo}</strong>${item.projetoCodigo ? ` · ${item.projetoCodigo}` : ''}` } : null)}

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
              ? `<div class="qrcode-validar-last-read-data">${item.textoUltimoLido}</div>${ProjectTag.renderRow(item, { className: 'qrcode-last-read-project-row' })}` 
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
    this.revealReadFeedback();
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
      const baseItem = MOCK_VALIDAR_ITEMS[this.validarScanIndex % MOCK_VALIDAR_ITEMS.length];
      const item = { ...baseItem, ...(this.resolveScannedProject(baseItem) || {}) };
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

    // Ação "Ler QRCode" nos outros modos (Cadastro / Caldeiraria / Transferência)
    const handleTriggerScanGeneral = (e) => {
      e.stopPropagation();
      if (this.mode === 'validar-qrcode') {
        handleTriggerScanValidar(e);
        return;
      }
      if (this.isTransferMode()) {
        const isSpool = this.mode === 'transferencia-spool';
        const pool = isSpool ? MOCK_SPOOL_TRANSFER_POOL : MOCK_TRANSFER_POOL;
        const nextItem = pool[this.transferData.scanIndex % pool.length];
        this.transferData.scanIndex++;
        const nextNum = String(this.transferData.componentes.length + 1).padStart(2, '0');
        this.transferData.componentes.push({
          item: nextNum,
          codigo: nextItem.codigo,
          qtd: nextItem.qtd,
          desc: nextItem.desc,
          ...(getProjectRef(getActiveProject()) || {})
        });
        this.transferData.ultimoLido = nextItem.rawQr;
        this.transferData.foreignItem = null;
        this.transferData.lastAdded = nextItem.codigo;
        this.isScanned = true;
        this.render();
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
        if (this.mode !== 'cadastro' && this.isForeignSpool()) this.warnForeignSpool();
      }
    };

    // DEMO: leitura de item de outro projeto na transferência → bloqueado (não entra na lista)
    const btnDemoForeignTransfer = this.container.querySelector('#btn-modal-demo-foreign-transfer');
    if (btnDemoForeignTransfer && this.isTransferMode()) {
      btnDemoForeignTransfer.addEventListener('click', (e) => {
        e.stopPropagation();
        const foreign = this.findForeignTransferItem();
        if (!foreign) return;
        this.transferData.foreignItem = foreign;
        this.transferData.lastAdded = null;
        this.transferData.ultimoLido = `${this.mode === 'transferencia-spool' ? 'SPOOL' : 'COD_PRODUTO'}: ${foreign.codigo} | PROJ: ${foreign.projetoCodigo}`;
        this.render();
        this.warnForeignSpool(foreign, this.mode === 'transferencia-spool' ? 'Spool' : 'Componente');
      });
    }

    // DEMO: simula leitura de spool vinculado a outro projeto (validação de projeto na etapa)
    const btnDemoForeign = this.container.querySelector('#btn-modal-demo-foreign');
    if (btnDemoForeign) {
      btnDemoForeign.addEventListener('click', (e) => {
        e.stopPropagation();
        const foreign = this.findForeignStageSpool();
        if (!foreign) return;
        this.spool = foreign;
        this.isScanned = true;
        this.render();
        this.warnForeignSpool(foreign);
      });
    }

    if (btnTriggerScan) {
      btnTriggerScan.addEventListener('click', handleTriggerScanGeneral);
    }

    if (viewfinder) {
      viewfinder.addEventListener('click', handleTriggerScanGeneral);
    }

    // Eventos específicos do modo Transferência (Spool ou Componente)
    if (this.isTransferMode()) {
      const isSpool = this.mode === 'transferencia-spool';
      const pool = isSpool ? MOCK_SPOOL_TRANSFER_POOL : MOCK_TRANSFER_POOL;
      const removeBtns = this.container.querySelectorAll('.btn-remove-transfer-comp');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.index, 10);
          if (!isNaN(idx) && this.transferData && this.transferData.componentes[idx]) {
            this.transferData.componentes.splice(idx, 1);
            this.transferData.lastAdded = null;
            this.transferData.foreignItem = null;
            this.transferData.componentes.forEach((comp, i) => {
              comp.item = String(i + 1).padStart(2, '0');
            });
            if (this.transferData.componentes.length === 0) {
              this.transferData.ultimoLido = '';
              this.isScanned = false;
            } else {
              // Atualiza o último lido para o último item restante na lista
              const lastRemaining = this.transferData.componentes[this.transferData.componentes.length - 1];
              const poolItem = pool.find(p => p.codigo === lastRemaining.codigo);
              if (poolItem) {
                this.transferData.ultimoLido = poolItem.rawQr;
              }
            }
            this.render();
          }
        });
      });

      const radioAlvenius = this.container.querySelector('#radio-realizador-alvenius');
      const radioTerceiro = this.container.querySelector('#radio-realizador-terceiro');
      if (radioAlvenius) {
        radioAlvenius.addEventListener('change', () => {
          if (radioAlvenius.checked && this.transferData) {
            this.transferData.realizador = 'alvenius';
            this.transferData.terceiro = 'NÃO';
            this.render();
          }
        });
      }
      if (radioTerceiro) {
        radioTerceiro.addEventListener('change', () => {
          if (radioTerceiro.checked && this.transferData) {
            this.transferData.realizador = 'terceiro';
            this.transferData.terceiro = 'SIM';
            this.render();
          }
        });
      }

      const selectOrigem = this.container.querySelector('#qrcode-select-origem');
      const selectDestino = this.container.querySelector('#qrcode-select-destino');
      if (selectOrigem) {
        selectOrigem.addEventListener('change', (e) => {
          const val = e.target.value;
          if (this.transferData) {
            if (val === '') {
              this.transferData.origem = { codigo: '', loja: '', nome: '' };
            } else if (FORNECEDORES_MAP[val]) {
              this.transferData.origem = { ...FORNECEDORES_MAP[val] };
            }
          }
        });
      }
      if (selectDestino) {
        selectDestino.addEventListener('change', (e) => {
          const val = e.target.value;
          if (this.transferData) {
            if (val === '') {
              this.transferData.destino = { codigo: '', loja: '', nome: '' };
            } else if (FORNECEDORES_MAP[val]) {
              this.transferData.destino = { ...FORNECEDORES_MAP[val] };
            }
          }
        });
      }
    }

    if (btnIniciar) {
      btnIniciar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.isScanned) return;
        const currentSpool = this.spool;
        if (this.isForeignSpool(currentSpool)) {
          this.warnForeignSpool(currentSpool);
          return;
        }
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

