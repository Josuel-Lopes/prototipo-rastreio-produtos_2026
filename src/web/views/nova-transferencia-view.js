/**
 * Tela de Criação de Transferência - Alvenius Spool Management
 * Responsabilidade Única: Cadastro e registro do processo de transferência com suporte a leitura de QRCode
 * Fidelidade visual absoluta ao layout de referência copilot-image-3a2fe1.png
 */

import { toast } from '../components/toast.js';
import { lucide } from '../components/icons.js';
import { PageContainer } from '../components/page-container.js';
import { PageTitle } from '../components/page-title.js';
import { addTransferComponente, addTransferSpool } from '../mocks/transfers-mock.js';
import { getActiveProject, getProjectRef } from '../mocks/projects-mock.js';
import { ProjectTag } from '../components/project-tag.js';

export const MOCK_TRANSFERENCIA_DADOS = {
  origem: {
    codigo: '000052',
    loja: '01',
    nome: 'ALVENIUS TUBOS E CONEXOES LTDA'
  },
  destino: {
    codigo: '003385',
    loja: '01',
    nome: 'PETROPASY TECNOLOGIA E SERVICOS'
  },
  terceiro: 'SIM',
  componentes: [
    { item: '01', codigo: 'FLW21224113Z211', qtd: '2 UN' },
    { item: '02', codigo: 'CUR90-16-SCH80', qtd: '1 UN' },
    { item: '03', codigo: 'TUB-COND-4-SCH40', qtd: '6000 MM' }
  ]
};

const PROCESSO_PILL_MAP = {
  'caldeiraria-revestimento': 'Caldeiraria',
  'revestimento-pintura': 'Revestimento',
  'pintura-faturamento': 'Pintura'
};

export class NovaTransferenciaView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.tipo = options.tipo || 'componente';
    this.processo = options.processo || 'caldeiraria-revestimento';
    this.origem = { codigo: '', loja: '', nome: '' };
    this.destino = { codigo: '', loja: '', nome: '' };
    this.terceiro = '';
    this.componentes = [];
    this.isPreenchido = false;
  }

  setTipo(tipo = 'componente') {
    if (this.tipo !== tipo) {
      this.tipo = tipo;
      this.limparFormulario(false);
    }
  }

  setProcesso(processo = 'caldeiraria-revestimento') {
    this.processo = processo;
    this.limparFormulario(false);
  }

  render(initialData = {}) {
    if (!this.container) return;

    if (initialData && initialData.tipo) {
      this.tipo = initialData.tipo;
    }

    if (initialData && initialData.processo) {
      this.processo = initialData.processo;
    }

    if (initialData && initialData.origem) {
      this.origem = { ...initialData.origem };
      this.destino = { ...initialData.destino };
      this.terceiro = initialData.terceiro || '';
      const list = initialData.itens || initialData.componentes;
      this.componentes = list ? [...list] : [];
      this.isPreenchido = Boolean(this.origem.codigo);
    }

    const isSpool = this.tipo === 'spool';

    // Define o título padronizado na pill central flutuante: Caldeiraria, Revestimento ou Pintura para spool; Transferência para componente
    const pillTitle = isSpool ? (PROCESSO_PILL_MAP[this.processo] || 'Caldeiraria') : 'Transferência';
    PageTitle.setTitle(pillTitle);

    const isPreenchido = this.isPreenchido;
    const tableTitle = isSpool ? 'SPOOLS' : 'COMPONENTES';

    // Conteúdo principal da seção FORNECEDOR, Terceiro e tabela de componentes
    const content = `
      <!-- Projeto ativo: toda transferência criada é gravada neste projeto -->
      <div class="project-context-bar stage-project-bar nova-transfer-project-bar">
        ${ProjectTag.renderRow(getProjectRef(getActiveProject()), { label: 'Projeto ativo:' })}
      </div>

      <!-- Seção FORNECEDOR (Origem e Destino) -->
      <div class="fornecedor-section">
        <div class="fornecedor-section-title">FORNECEDOR</div>
        
        <!-- Bloco Origem -->
        <div class="fornecedor-block">
          <div class="fornecedor-subheading">Origem</div>
          <div class="fornecedor-row fornecedor-row-cols">
            <div class="fornecedor-col fornecedor-col-cod">
              <span class="fornecedor-label">Código&nbsp;&nbsp;:</span>
              <span class="fornecedor-value ${this.origem.codigo ? '' : 'fornecedor-value-empty'}" id="transf-origem-codigo">${this.origem.codigo || '········'}</span>
            </div>
            <div class="fornecedor-col fornecedor-col-loja">
              <span class="fornecedor-label">Loja&nbsp;&nbsp;:</span>
              <span class="fornecedor-value ${this.origem.loja ? '' : 'fornecedor-value-empty'}" id="transf-origem-loja">${this.origem.loja || '··'}</span>
            </div>
          </div>
          <div class="fornecedor-row">
            <span class="fornecedor-label">Nome&nbsp;&nbsp;&nbsp;&nbsp;:</span>
            <span class="fornecedor-value ${this.origem.nome ? '' : 'fornecedor-value-empty'}" id="transf-origem-nome">${this.origem.nome || '····································'}</span>
          </div>
        </div>

        <!-- Bloco Destino -->
        <div class="fornecedor-block">
          <div class="fornecedor-subheading">Destino</div>
          <div class="fornecedor-row fornecedor-row-cols">
            <div class="fornecedor-col fornecedor-col-cod">
              <span class="fornecedor-label">Código&nbsp;&nbsp;:</span>
              <span class="fornecedor-value ${this.destino.codigo ? '' : 'fornecedor-value-empty'}" id="transf-destino-codigo">${this.destino.codigo || '········'}</span>
            </div>
            <div class="fornecedor-col fornecedor-col-loja">
              <span class="fornecedor-label">Loja&nbsp;&nbsp;:</span>
              <span class="fornecedor-value ${this.destino.loja ? '' : 'fornecedor-value-empty'}" id="transf-destino-loja">${this.destino.loja || '··'}</span>
            </div>
          </div>
          <div class="fornecedor-row">
            <span class="fornecedor-label">Nome&nbsp;&nbsp;&nbsp;&nbsp;:</span>
            <span class="fornecedor-value ${this.destino.nome ? '' : 'fornecedor-value-empty'}" id="transf-destino-nome">${this.destino.nome || '····································'}</span>
          </div>
        </div>
      </div>

      <!-- Pergunta sobre Terceiro com Ícone Circular (?) -->
      <div class="terceiro-section">
        <div class="terceiro-question-row">
          <span class="terceiro-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <span class="terceiro-question-text">Serviço realizado por terceiro?</span>
        </div>
        <div class="terceiro-answer ${this.terceiro ? '' : 'terceiro-answer-empty'}" id="transf-terceiro-val">
          ${this.terceiro || '··'}
        </div>
      </div>

      <!-- Quadro COMPONENTES / SPOOLS -->
      <div class="cadastro-table-box">
        <div class="cadastro-table-header-title">${tableTitle}</div>
        <div class="cadastro-table-wrapper">
          <table class="table-components-cadastro table-components-transferencia">
            <thead>
              <tr>
                <th class="th-item">ITENS</th>
                <th class="th-cod">CÓDIGOS</th>
                <th class="th-qtd">QTD.</th>
              </tr>
            </thead>
            <tbody id="transf-table-body">
              ${this.renderTableRows()}
            </tbody>
          </table>
          <div id="transf-table-empty-placeholder" class="cadastro-table-empty-body transf-table-empty ${this.componentes.length > 0 ? 'is-hidden' : ''}" style="${this.componentes.length > 0 ? 'display: none !important;' : ''}">
            <div class="transf-empty-hint">Aguardando leitura do QRCode...</div>
          </div>
        </div>
      </div>
    `;

    // 3 Botões de Ação do Rodapé
    const footerActions = `
      <!-- Botão 1: Ler QRCode -->
      <button class="btn-cadastro-col btn-cadastro-qrcode" id="btn-transf-qrcode" type="button" title="Ler QRCode de Romaneio de Transferência">
        ${lucide('qr-code', { size: 18, stroke: '#ffffff', strokeWidth: 2 })}
        <span>Ler QRCode</span>
      </button>

      <!-- Botão 2: Limpar -->
      <button class="btn-cadastro-col btn-cadastro-limpar ${isPreenchido ? 'btn-active' : ''}" id="btn-transf-limpar" type="button" ${isPreenchido ? '' : 'disabled'} title="Limpar formulário">
        ${lucide('trash-2', { size: 18, strokeWidth: 2 })}
        <span>Limpar</span>
      </button>

      <!-- Botão 3: Gravar -->
      <button class="btn-cadastro-col btn-cadastro-gravar ${isPreenchido ? 'btn-active' : ''}" id="btn-transf-gravar" type="button" ${isPreenchido ? '' : 'disabled'} title="Gravar transferência">
        ${lucide('save', { size: 18, strokeWidth: 2 })}
        <span>Gravar</span>
      </button>
    `;

    // Envelope no PageContainer padrão da Alvenius
    this.container.innerHTML = PageContainer.render({
      bannerTitle: 'Transferência',
      bannerDescription: '<span class="banner-line-1" style="white-space: nowrap; display: block;">Criar o registro do processo de transferência.</span>',
      content,
      footerActions,
      containerClass: 'view-nova-transferencia-container',
      cardClass: 'card-nova-transferencia'
    });

    this.bindEvents();
  }

  renderTableRows() {
    if (!this.componentes || this.componentes.length === 0) {
      return '';
    }

    return this.componentes.map(comp => `
      <tr>
        <td class="col-item">${comp.item}</td>
        <td class="col-cod">${comp.codigo}</td>
        <td class="col-qtd">${comp.qtd}</td>
      </tr>
    `).join('');
  }

  atualizarEstadoBotoes(habilitados) {
    if (!this.container) return;
    const btnLimpar = this.container.querySelector('#btn-transf-limpar');
    const btnGravar = this.container.querySelector('#btn-transf-gravar');

    if (btnLimpar) {
      btnLimpar.disabled = !habilitados;
      if (habilitados) {
        btnLimpar.removeAttribute('disabled');
        btnLimpar.classList.add('btn-active');
      } else {
        btnLimpar.setAttribute('disabled', 'disabled');
        btnLimpar.classList.remove('btn-active');
      }
    }

    if (btnGravar) {
      btnGravar.disabled = !habilitados;
      if (habilitados) {
        btnGravar.removeAttribute('disabled');
        btnGravar.classList.add('btn-active');
      } else {
        btnGravar.setAttribute('disabled', 'disabled');
        btnGravar.classList.remove('btn-active');
      }
    }
  }

  preencherDadosTransferencia(dados = null) {
    if (!dados) return;
    const data = dados;
    this.origem = data.origem ? { ...data.origem } : { ...this.origem };
    this.destino = data.destino ? { ...data.destino } : { ...this.destino };
    this.terceiro = data.terceiro !== undefined ? data.terceiro : (this.terceiro || 'SIM');
    const list = data.itens || data.componentes || [];
    this.componentes = Array.isArray(list)
      ? list.map((comp, idx) => ({
          item: comp.item || String(idx + 1).padStart(2, '0'),
          codigo: comp.codigo,
          qtd: comp.qtd || '1 UN',
          desc: comp.desc || '',
          projetoId: comp.projetoId || null
        }))
      : [];
    this.isPreenchido = Boolean(this.origem.codigo && this.componentes.length > 0);

    if (!this.container) return;

    // Atualização reativa do DOM
    const elOrigemCodigo = this.container.querySelector('#transf-origem-codigo');
    const elOrigemLoja = this.container.querySelector('#transf-origem-loja');
    const elOrigemNome = this.container.querySelector('#transf-origem-nome');

    const elDestinoCodigo = this.container.querySelector('#transf-destino-codigo');
    const elDestinoLoja = this.container.querySelector('#transf-destino-loja');
    const elDestinoNome = this.container.querySelector('#transf-destino-nome');

    const elTerceiro = this.container.querySelector('#transf-terceiro-val');
    const tbody = this.container.querySelector('#transf-table-body');
    const emptyPlaceholder = this.container.querySelector('#transf-table-empty-placeholder');

    if (elOrigemCodigo) {
      elOrigemCodigo.textContent = this.origem.codigo || '········';
      if (this.origem.codigo) {
        elOrigemCodigo.classList.remove('fornecedor-value-empty');
      } else {
        elOrigemCodigo.classList.add('fornecedor-value-empty');
      }
    }
    if (elOrigemLoja) {
      elOrigemLoja.textContent = this.origem.loja || '··';
      if (this.origem.loja) {
        elOrigemLoja.classList.remove('fornecedor-value-empty');
      } else {
        elOrigemLoja.classList.add('fornecedor-value-empty');
      }
    }
    if (elOrigemNome) {
      elOrigemNome.textContent = this.origem.nome || '····································';
      if (this.origem.nome) {
        elOrigemNome.classList.remove('fornecedor-value-empty');
      } else {
        elOrigemNome.classList.add('fornecedor-value-empty');
      }
    }

    if (elDestinoCodigo) {
      elDestinoCodigo.textContent = this.destino.codigo || '········';
      if (this.destino.codigo) {
        elDestinoCodigo.classList.remove('fornecedor-value-empty');
      } else {
        elDestinoCodigo.classList.add('fornecedor-value-empty');
      }
    }
    if (elDestinoLoja) {
      elDestinoLoja.textContent = this.destino.loja || '··';
      if (this.destino.loja) {
        elDestinoLoja.classList.remove('fornecedor-value-empty');
      } else {
        elDestinoLoja.classList.add('fornecedor-value-empty');
      }
    }
    if (elDestinoNome) {
      elDestinoNome.textContent = this.destino.nome || '····································';
      if (this.destino.nome) {
        elDestinoNome.classList.remove('fornecedor-value-empty');
      } else {
        elDestinoNome.classList.add('fornecedor-value-empty');
      }
    }

    if (elTerceiro) {
      elTerceiro.textContent = this.terceiro || '··';
      if (this.terceiro) {
        elTerceiro.classList.remove('terceiro-answer-empty');
      } else {
        elTerceiro.classList.add('terceiro-answer-empty');
      }
    }

    if (tbody) tbody.innerHTML = this.renderTableRows();
    if (emptyPlaceholder) {
      if (this.componentes.length > 0) {
        emptyPlaceholder.classList.add('is-hidden');
        if (emptyPlaceholder.style) {
          emptyPlaceholder.style.setProperty('display', 'none', 'important');
        }
      } else {
        emptyPlaceholder.classList.remove('is-hidden');
        if (emptyPlaceholder.style) {
          emptyPlaceholder.style.removeProperty('display');
        }
      }
    }

    this.atualizarEstadoBotoes(this.componentes.length > 0);
  }

  limparFormulario(showToast = false) {
    this.origem = { codigo: '', loja: '', nome: '' };
    this.destino = { codigo: '', loja: '', nome: '' };
    this.terceiro = '';
    this.componentes = [];
    this.isPreenchido = false;

    if (!this.container) return;

    const elOrigemCodigo = this.container.querySelector('#transf-origem-codigo');
    const elOrigemLoja = this.container.querySelector('#transf-origem-loja');
    const elOrigemNome = this.container.querySelector('#transf-origem-nome');

    const elDestinoCodigo = this.container.querySelector('#transf-destino-codigo');
    const elDestinoLoja = this.container.querySelector('#transf-destino-loja');
    const elDestinoNome = this.container.querySelector('#transf-destino-nome');

    const elTerceiro = this.container.querySelector('#transf-terceiro-val');
    const tbody = this.container.querySelector('#transf-table-body');
    const emptyPlaceholder = this.container.querySelector('#transf-table-empty-placeholder');

    if (elOrigemCodigo) {
      elOrigemCodigo.textContent = '········';
      elOrigemCodigo.classList.add('fornecedor-value-empty');
    }
    if (elOrigemLoja) {
      elOrigemLoja.textContent = '··';
      elOrigemLoja.classList.add('fornecedor-value-empty');
    }
    if (elOrigemNome) {
      elOrigemNome.textContent = '····································';
      elOrigemNome.classList.add('fornecedor-value-empty');
    }

    if (elDestinoCodigo) {
      elDestinoCodigo.textContent = '········';
      elDestinoCodigo.classList.add('fornecedor-value-empty');
    }
    if (elDestinoLoja) {
      elDestinoLoja.textContent = '··';
      elDestinoLoja.classList.add('fornecedor-value-empty');
    }
    if (elDestinoNome) {
      elDestinoNome.textContent = '····································';
      elDestinoNome.classList.add('fornecedor-value-empty');
    }

    if (elTerceiro) {
      elTerceiro.textContent = '··';
      elTerceiro.classList.add('terceiro-answer-empty');
    }

    if (tbody) tbody.innerHTML = '';
    if (emptyPlaceholder) {
      emptyPlaceholder.classList.remove('is-hidden');
      if (emptyPlaceholder.style) {
        emptyPlaceholder.style.removeProperty('display');
      }
    }

    this.atualizarEstadoBotoes(false);
    if (showToast) {
      toast.info('Formulário', 'Campos limpos');
    }
  }

  gravarTransferencia() {
    if (!this.container) return;
    const btnGravar = this.container.querySelector('#btn-transf-gravar');
    if (btnGravar && btnGravar.disabled) return;

    const isSpool = this.tipo === 'spool';
    const project = getActiveProject();
    if (!project) {
      toast.warning('Projeto', 'Selecione um projeto antes de gravar a transferência.');
      return;
    }
    // Defesa: itens lidos de outro projeto não entram na transferência
    const foreign = this.componentes.find(comp => comp.projetoId && comp.projetoId !== project.id);
    if (foreign) {
      toast.warning('Item de outro projeto', `${foreign.codigo} não pertence ao projeto ${project.codigo}.`);
      return;
    }

    if (isSpool) {
      addTransferSpool({
        projetoId: project.id,
        tipo: 'spool',
        processo: this.processo,
        status: 'Em Trânsito',
        statusCor: '#f59e0b',
        etapaAtual: 3, // Aguardando ROM
        fornecedorOrigem: `${this.origem.codigo || '000052'} - ${this.origem.loja || '01'} - ${this.origem.nome || 'ALVENIUS TUBOS E CONEXOES LTDA'}`,
        fornecedorDestino: `${this.destino.codigo || '003385'} - ${this.destino.loja || '01'} - ${this.destino.nome || 'PETROPASY TECNOLOGIA E SERVICOS'}`,
        terceiro: this.terceiro || 'SIM',
        spools: this.componentes.map(comp => ({
          codigo: comp.codigo,
          descricao: comp.desc || `Spool ${comp.codigo}`,
          quantidade: comp.qtd || '1 UN'
        }))
      });

      toast.success('Sucesso', `Transferência de Spool criada no projeto ${project.codigo}!`);

      if (typeof this.options.onNavigate === 'function') {
        setTimeout(() => {
          this.options.onNavigate('transferencia-spool', { processo: this.processo });
        }, 500);
      }
    } else {
      addTransferComponente({
        projetoId: project.id,
        tipo: 'componente',
        status: 'Em Trânsito',
        statusCor: '#f59e0b',
        etapaAtual: 3, // Aguardando ROM
        fornecedorOrigem: `${this.origem.codigo || '000052'} - ${this.origem.loja || '01'} - ${this.origem.nome || 'ALVENIUS TUBOS E CONEXOES LTDA'}`,
        fornecedorDestino: `${this.destino.codigo || '003385'} - ${this.destino.loja || '01'} - ${this.destino.nome || 'PETROPASY TECNOLOGIA E SERVICOS'}`,
        terceiro: this.terceiro || 'SIM',
        itens: this.componentes.map(comp => ({
          codigo: comp.codigo,
          descricao: comp.desc || `Item ${comp.item} - Peça Industrial Transferida`,
          quantidade: comp.qtd
        }))
      });

      toast.success('Sucesso', `Transferência criada no projeto ${project.codigo}!`);

      if (typeof this.options.onNavigate === 'function') {
        setTimeout(() => {
          this.options.onNavigate('transferencia-componente');
        }, 500);
      }
    }
  }

  bindEvents() {
    const btnQrCode = this.container.querySelector('#btn-transf-qrcode');
    const btnLimpar = this.container.querySelector('#btn-transf-limpar');
    const btnGravar = this.container.querySelector('#btn-transf-gravar');

    // Ação ao clicar em "Ler QRCode": Abre o leitor ModalQrCodeComponent
    if (btnQrCode) {
      btnQrCode.addEventListener('click', () => {
        if (typeof this.options.onOpenQrCode === 'function') {
          const mode = this.tipo === 'spool' ? 'transferencia-spool' : 'transferencia-componente';
          this.options.onOpenQrCode((dados) => {
            const list = dados?.itens || dados?.componentes;
            if (dados && Array.isArray(list) && list.length > 0) {
              this.preencherDadosTransferencia(dados);
            }
          }, mode, this.processo);
        }
      });
    }

    // Ação do Botão "Limpar": Restaura placeholders e desabilita botões
    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        if (btnLimpar.disabled) return;
        this.limparFormulario(true);
      });
    }

    // Ação do Botão "Gravar": Grava no mock e navega para lista
    if (btnGravar) {
      btnGravar.addEventListener('click', () => {
        if (btnGravar.disabled) return;
        this.gravarTransferencia();
      });
    }
  }
}
