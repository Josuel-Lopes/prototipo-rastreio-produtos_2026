/**
 * Tela de Cadastro de Spool e Componentes - Alvenius
 * Responsabilidade Única: Cadastro de Spool, associação de itens de componentes e ações de gravação/leitura
 * Conforme wireframe e print de referência copilot-image-c65f64.png
 */

import { toast } from '../components/toast.js';
import { lucide } from '../components/icons.js';
import { PageContainer } from '../components/page-container.js';
import { PageTitle } from '../components/page-title.js';
import { MOCK_SPOOL_CADASTRADO } from '../components/modal-qrcode.js';

export class CadastroView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.codigo = '';
    this.descricao = '';
    this.componentes = [];
  }

  render(initialData = {}) {
    if (!this.container) return;

    this.codigo = initialData.codigo || '';
    this.descricao = initialData.descricao || '';
    this.componentes = initialData.componentes ? [...initialData.componentes] : [];

    const isPreenchido = Boolean(this.codigo && this.codigo.trim());

    // Define o título padronizado na pill central flutuante
    PageTitle.setTitle('Cadastro');

    // Conteúdo principal da seção Spool e tabela de componentes
    const content = `
      <!-- Seção de dados do Spool com Código e Descrição -->
      <div class="spool-data-section">
        <div class="spool-section-title">SPOOL</div>
        <div class="spool-meta-row">
          <span class="spool-meta-label">Código &nbsp;:</span>
          <span class="spool-meta-value" id="cadastro-codigo-val">${this.codigo}</span>
        </div>
        <div class="spool-meta-row">
          <span class="spool-meta-label">Descrição:</span>
          <span class="spool-meta-value" id="cadastro-descricao-val">${this.descricao}</span>
        </div>
      </div>

      <!-- Quadro COMPONENTES -->
      <div class="cadastro-table-box">
        <div class="cadastro-table-header-title">COMPONENTES</div>
        <div class="cadastro-table-wrapper">
          <table class="table-components-cadastro">
            <thead>
              <tr>
                <th class="th-item">ITENS</th>
                <th class="th-desc">DESCRIÇÃO</th>
                <th class="th-qtd">QTD.</th>
              </tr>
            </thead>
            <tbody id="cadastro-table-body">
              ${this.renderTableRows()}
            </tbody>
          </table>
          <div id="cadastro-table-empty-placeholder" class="cadastro-table-empty-body" style="${this.componentes.length === 0 ? '' : 'display: none;'}"></div>
        </div>
      </div>
    `;

    // 3 Botões de Ação do Rodapé
    const footerActions = `
      <!-- Botão 1: Ler QRCode -->
      <button class="btn-cadastro-col btn-cadastro-qrcode" id="btn-cadastro-qrcode" type="button">
        ${lucide('qr-code', { size: 18, stroke: '#ffffff', strokeWidth: 2 })}
        <span>Ler QRCode</span>
      </button>

      <!-- Botão 2: Limpar -->
      <button class="btn-cadastro-col btn-cadastro-limpar ${isPreenchido ? 'btn-active' : ''}" id="btn-cadastro-limpar" type="button" ${isPreenchido ? '' : 'disabled'}>
        ${lucide('trash-2', { size: 18, strokeWidth: 2 })}
        <span>Limpar</span>
      </button>

      <!-- Botão 3: Gravar -->
      <button class="btn-cadastro-col btn-cadastro-gravar ${isPreenchido ? 'btn-active' : ''}" id="btn-cadastro-gravar" type="button" ${isPreenchido ? '' : 'disabled'}>
        ${lucide('save', { size: 18, strokeWidth: 2 })}
        <span>Gravar</span>
      </button>
    `;

    // Renderiza o envelope base reutilizável
    this.container.innerHTML = PageContainer.render({
      bannerTitle: 'SPOOL',
      bannerDescription: '<span class="banner-line-1" style="white-space: nowrap; display: block;">Realiza o cadastro de Spool e componentes iniciar processo</span><span class="banner-line-2" style="display: block;">produção.</span>',
      content,
      footerActions,
      containerClass: 'view-cadastro-container',
      cardClass: 'card-cadastro'
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
        <td class="col-desc">${comp.descricao}</td>
        <td class="col-qtd">${comp.qtd}</td>
      </tr>
    `).join('');
  }

  atualizarEstadoBotoes(habilitados) {
    const btnLimpar = this.container.querySelector('#btn-cadastro-limpar') || this.container.querySelector('#btn-limpar');
    const btnGravar = this.container.querySelector('#btn-cadastro-gravar') || this.container.querySelector('#btn-gravar');

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

  preencherDadosSpool(dados = MOCK_SPOOL_CADASTRADO) {
    const spool = dados || MOCK_SPOOL_CADASTRADO;
    this.codigo = spool.codigo || 'SPL-2024-001';
    this.descricao = spool.descricao || 'Tubo Condução Aço Carbono 4" Sch 40';
    this.componentes = spool.componentes && spool.componentes.length > 0 
      ? [...spool.componentes] 
      : [...MOCK_SPOOL_CADASTRADO.componentes];

    const valCodigo = this.container.querySelector('#cadastro-codigo-val');
    const valDescricao = this.container.querySelector('#cadastro-descricao-val');
    const tbody = this.container.querySelector('#cadastro-table-body');
    const emptyPlaceholder = this.container.querySelector('#cadastro-table-empty-placeholder');

    if (valCodigo) valCodigo.textContent = this.codigo;
    if (valDescricao) valDescricao.textContent = this.descricao;
    if (tbody) tbody.innerHTML = this.renderTableRows();
    if (emptyPlaceholder) emptyPlaceholder.style.display = 'none';

    this.atualizarEstadoBotoes(true);
  }

  limparFormulario() {
    this.codigo = '';
    this.descricao = '';
    this.componentes = [];

    const valCodigo = this.container.querySelector('#cadastro-codigo-val');
    const valDescricao = this.container.querySelector('#cadastro-descricao-val');
    const tbody = this.container.querySelector('#cadastro-table-body');
    const emptyPlaceholder = this.container.querySelector('#cadastro-table-empty-placeholder');

    if (valCodigo) valCodigo.textContent = '';
    if (valDescricao) valDescricao.textContent = '';
    if (tbody) tbody.innerHTML = '';
    if (emptyPlaceholder) emptyPlaceholder.style.display = 'block';

    this.atualizarEstadoBotoes(false);
  }

  gravarSpool() {
    const btnGravar = this.container.querySelector('#btn-cadastro-gravar');
    if (btnGravar && btnGravar.disabled) return;

    const codigo = this.codigo || 'SPL-2024-001';
    toast.success('Sucesso', `Spool ${codigo} gravado com sucesso!`);
  }

  bindEvents() {
    const btnQrCode = this.container.querySelector('#btn-cadastro-qrcode');
    const btnLimpar = this.container.querySelector('#btn-cadastro-limpar');
    const btnGravar = this.container.querySelector('#btn-cadastro-gravar');

    // Ação ao clicar em "Ler QRCode": Abre a modal ModalQrCodeComponent
    if (btnQrCode) {
      btnQrCode.addEventListener('click', () => {
        if (typeof this.options.onOpenQrCode === 'function') {
          this.options.onOpenQrCode((scannedCode, spool) => {
            this.preencherDadosSpool(spool);
          });
        }
      });
    }

    // Ação do Botão "Limpar": Limpa campos, tabela e desabilita botões
    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        if (btnLimpar.disabled) return;
        this.limparFormulario();
      });
    }

    // Ação do Botão "Gravar": Exibe toast de sucesso
    if (btnGravar) {
      btnGravar.addEventListener('click', () => {
        if (btnGravar.disabled) return;
        this.gravarSpool();
      });
    }
  }
}

