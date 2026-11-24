/**
 * Tela de Cadastro de Spool e Componentes - Alvenius
 * Responsabilidade Única: Cadastro de Spool, associação de itens de componentes e ações de gravação/leitura
 */

import { addSpool, getSpoolByCode } from '../mocks/spools-mock.js';
import { toast } from '../components/toast.js';

export class CadastroView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.componentes = [
      { item: '01', descricao: 'TUBO AÇO CARBONO SCH40 32POL X 9.53MM', qtd: '1015 MM' },
      { item: '02', descricao: 'FLANGE SOBREPOSTO 32POL 150 LBS ANSI B16.5', qtd: '2 UN' },
      { item: '03', descricao: 'SOLDA TOPO CIRCUNFERENCIAL GTAW+SMAW', qtd: '2 PASSES' }
    ];
  }

  render(initialData = {}) {
    if (!this.container) return;

    const defaultCodigo = initialData.codigo || 'SP-0414-00002-004';
    const defaultDescricao = initialData.descricao || 'Carretel FS+FF 32pol x 9,53 x 1015mm 150 PSI';

    if (initialData.componentes && initialData.componentes.length > 0) {
      this.componentes = [...initialData.componentes];
    }

    this.container.innerHTML = `
      <div class="view-cadastro-container">
        <div class="card">
          
          <!-- Faixa Superior Cinza: SPOOL -->
          <div class="card-header-strip">
            <span class="card-header-title">SPOOL</span>
          </div>

          <div class="card-body">
            
            <!-- Barra de Mensagem Informativa (i) -->
            <div class="info-box">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <span>Realiza o cadastro de Spool e componentes iniciar processo produção.</span>
            </div>

            <!-- Formulário SPOOL (Código e Descrição) -->
            <div class="form-two-cols">
              <div class="form-group">
                <label class="form-label" for="cadastro-codigo">Código</label>
                <input 
                  type="text" 
                  id="cadastro-codigo" 
                  class="form-input" 
                  placeholder="Ex: SP-0414-00002-004" 
                  value="${defaultCodigo}" 
                  style="font-family: monospace; font-weight: 600;"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="cadastro-descricao">Descrição</label>
                <input 
                  type="text" 
                  id="cadastro-descricao" 
                  class="form-input" 
                  placeholder="Descrição técnica detalhada do carretel spool" 
                  value="${defaultDescricao}" 
                />
              </div>
            </div>

            <!-- Faixa Seção: COMPONENTES -->
            <div class="section-strip-title">COMPONENTES</div>

            <!-- Tabela Estruturada de Componentes -->
            <div class="table-responsive">
              <table class="table-components">
                <thead>
                  <tr>
                    <th class="col-item">ITENS</th>
                    <th>DESCRIÇÃO</th>
                    <th class="col-qtd">QTD.</th>
                  </tr>
                </thead>
                <tbody id="cadastro-table-body">
                  ${this.renderTableRows()}
                </tbody>
              </table>
            </div>

            <!-- Adicionar Item Rápido -->
            <div class="quick-add-component-bar">
              <input type="text" id="add-item-num" class="form-input" placeholder="Item" value="0${this.componentes.length + 1}" style="font-family: monospace;" />
              <input type="text" id="add-item-desc" class="form-input" placeholder="Descrição do componente (tubo, flange, luva...)" />
              <input type="text" id="add-item-qtd" class="form-input" placeholder="Ex: 1 UN / 500 MM" />
              <button class="btn btn-outline" id="btn-add-item-row" style="padding: 9px 16px;">
                + Adicionar Item
              </button>
            </div>

          </div>

          <!-- Barra de Ações (Footer do Card) -->
          <div class="card-footer-actions">
            <!-- Botão Ler QRCode -->
            <button class="btn btn-primary" id="btn-cadastro-qrcode">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <path d="M7 17h.01M17 17h.01M7 7h.01M17 7h.01"></path>
              </svg>
              <span>Ler QRCode</span>
            </button>

            <!-- Botão Limpar -->
            <button class="btn btn-clear" id="btn-cadastro-limpar">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Limpar</span>
            </button>

            <!-- Botão Gravar -->
            <button class="btn btn-success" id="btn-cadastro-gravar">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span>Gravar</span>
            </button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderTableRows() {
    if (this.componentes.length === 0) {
      return `<tr><td colspan="3" style="text-align:center; color: var(--color-text-muted); padding: 18px;">Nenhum componente vinculado.</td></tr>`;
    }

    return this.componentes.map(comp => `
      <tr>
        <td class="col-item">${comp.item}</td>
        <td>${comp.descricao}</td>
        <td class="col-qtd">${comp.qtd}</td>
      </tr>
    `).join('');
  }

  bindEvents() {
    const btnQrCode = this.container.querySelector('#btn-cadastro-qrcode');
    const btnLimpar = this.container.querySelector('#btn-cadastro-limpar');
    const btnGravar = this.container.querySelector('#btn-cadastro-gravar');
    const btnAddItem = this.container.querySelector('#btn-add-item-row');

    // Ler QRCode via modal
    if (btnQrCode) {
      btnQrCode.addEventListener('click', () => {
        if (typeof this.options.onOpenQrCode === 'function') {
          this.options.onOpenQrCode((scannedCode, spool) => {
            const inputCodigo = this.container.querySelector('#cadastro-codigo');
            const inputDescricao = this.container.querySelector('#cadastro-descricao');
            if (inputCodigo) inputCodigo.value = scannedCode;
            if (spool) {
              if (inputDescricao) inputDescricao.value = spool.descricao;
              if (spool.componentes) {
                this.componentes = [...spool.componentes];
                const tbody = this.container.querySelector('#cadastro-table-body');
                if (tbody) tbody.innerHTML = this.renderTableRows();
              }
            }
          });
        }
      });
    }

    // Limpar formulário
    if (btnLimpar) {
      btnLimpar.addEventListener('click', () => {
        const inputCodigo = this.container.querySelector('#cadastro-codigo');
        const inputDescricao = this.container.querySelector('#cadastro-descricao');
        if (inputCodigo) inputCodigo.value = '';
        if (inputDescricao) inputDescricao.value = '';
        this.componentes = [];
        const tbody = this.container.querySelector('#cadastro-table-body');
        if (tbody) tbody.innerHTML = this.renderTableRows();
        toast.info('Formulário Limpo', 'Os campos e a lista de componentes foram limpos.');
      });
    }

    // Gravar Spool
    if (btnGravar) {
      btnGravar.addEventListener('click', () => {
        const inputCodigo = this.container.querySelector('#cadastro-codigo');
        const inputDescricao = this.container.querySelector('#cadastro-descricao');

        const codigo = inputCodigo ? inputCodigo.value.trim() : '';
        const descricao = inputDescricao ? inputDescricao.value.trim() : '';

        if (!codigo) {
          toast.warning('Atenção', 'Informe o Código do Spool antes de gravar.');
          if (inputCodigo) inputCodigo.focus();
          return;
        }

        if (!descricao) {
          toast.warning('Atenção', 'Informe a Descrição do Spool antes de gravar.');
          if (inputDescricao) inputDescricao.focus();
          return;
        }

        // Salva no mock em memória
        const spoolCriado = addSpool({
          codigo,
          descricao,
          componentes: [...this.componentes]
        });

        toast.success('Spool Gravado com Sucesso!', `Código ${spoolCriado.codigo} inserido no processo com status RESERVADO.`);

        // Redireciona para caldeiraria para visualizar o card após 1.2s
        setTimeout(() => {
          if (typeof this.options.onNavigate === 'function') {
            this.options.onNavigate('caldeiraria');
          }
        }, 1200);
      });
    }

    // Adicionar novo item na tabela
    if (btnAddItem) {
      btnAddItem.addEventListener('click', () => {
        const inputItem = this.container.querySelector('#add-item-num');
        const inputDesc = this.container.querySelector('#add-item-desc');
        const inputQtd = this.container.querySelector('#add-item-qtd');

        const itemNum = inputItem ? inputItem.value.trim() : '';
        const itemDesc = inputDesc ? inputDesc.value.trim() : '';
        const itemQtd = inputQtd ? inputQtd.value.trim() : '';

        if (!itemDesc) {
          toast.warning('Atenção', 'Informe a descrição do componente para adicionar.');
          return;
        }

        this.componentes.push({
          item: itemNum || String(this.componentes.length + 1).padStart(2, '0'),
          descricao: itemDesc,
          qtd: itemQtd || '1 UN'
        });

        const tbody = this.container.querySelector('#cadastro-table-body');
        if (tbody) tbody.innerHTML = this.renderTableRows();

        if (inputDesc) inputDesc.value = '';
        if (inputQtd) inputQtd.value = '';
        if (inputItem) inputItem.value = String(this.componentes.length + 1).padStart(2, '0');

        toast.info('Item Adicionado', `Componente ${itemDesc} incluído na lista.`);
      });
    }
  }
}
