/**
 * Tela de Transferência - Componente - Alvenius Spool Management
 * Responsabilidade Única: Listagem, busca e registro do processo de transferência de componentes
 * Fidelidade visual absoluta aos layouts copilot-image-fc3082.png, copilot-image-85fa22.png e copilot-image-93dd6b.png
 */

import { getTransfersComponentes, addTransferComponente } from '../mocks/transfers-mock.js';
import { TransferCard } from '../components/transfer-card.js';
import { PageContainer } from '../components/page-container.js';
import { PageTitle } from '../components/page-title.js';
import { toast } from '../components/toast.js';
import { lucide } from '../components/icons.js';

export class TransferenciaComponenteView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.searchQuery = '';
    this.expandedCards = new Set(); // Armazena IDs dos cards com itens expandidos
  }

  getFilteredTransfers() {
    const list = getTransfersComponentes();
    const query = this.searchQuery.trim().toLowerCase();

    if (!query) return list;

    return list.filter(item => {
      const codeMatch = String(item.codigo || '').toLowerCase().includes(query);
      const seqMatch = String(item.sequencial || '').toLowerCase().includes(query);
      const statusMatch = String(item.status || '').toLowerCase().includes(query);
      const originMatch = String(item.fornecedorOrigem || '').toLowerCase().includes(query);
      const destMatch = String(item.fornecedorDestino || '').toLowerCase().includes(query);
      const dateMatch = String(item.inicio || '').toLowerCase().includes(query) ||
                        String(item.finalizado || '').toLowerCase().includes(query);

      const itemsMatch = Array.isArray(item.itens) && item.itens.some(it =>
        String(it.codigo || '').toLowerCase().includes(query) ||
        String(it.descricao || '').toLowerCase().includes(query)
      );

      return codeMatch || seqMatch || statusMatch || originMatch || destMatch || dateMatch || itemsMatch;
    });
  }

  toggleExpand(transferId) {
    if (this.expandedCards.has(transferId)) {
      this.expandedCards.delete(transferId);
    } else {
      this.expandedCards.add(transferId);
    }
    this.render();
  }

  handleCreateTransfer() {
    const novaTransferencia = addTransferComponente({
      tipo: 'componente',
      status: 'Aguardando SC',
      statusCor: '#f97316',
      etapaAtual: 1,
      fornecedorOrigem: '000052 - 01 - ALVENIUS',
      fornecedorDestino: '003385 - 01 - PETROPASY TECNOLOGIA',
      itens: [
        { codigo: `CMP${Date.now().toString().slice(-8)}`, descricao: 'Componente Inox Tubulação', quantidade: 2 },
        { codigo: `FLW${Date.now().toString().slice(-7)}A`, descricao: 'Flange Sobreposto 4"', quantidade: 2 }
      ]
    });

    // Auto-expande a nova transferência criada para visualização imediata
    this.expandedCards.add(novaTransferencia.id);

    toast.success(
      'Transferência Criada',
      `Romaneio de transferência ${novaTransferencia.codigo} gerado com sucesso!`
    );

    this.render();
  }

  render() {
    if (!this.container) return;

    // Define o título oficial na pill do header
    PageTitle.setTitle('Transferência');

    const transfers = this.getFilteredTransfers();

    // Renderiza a lista de cards de transferência
    let cardsHtml = '';
    if (transfers.length === 0) {
      cardsHtml = `
        <div class="transfer-empty-state">
          ${lucide('search', { size: 36, stroke: '#9ca3af', strokeWidth: 1.5 })}
          <div class="transfer-empty-title">Nenhuma transferência encontrada</div>
          <div class="transfer-empty-subtitle">Tente outro termo na busca por código, status ou data.</div>
        </div>
      `;
    } else {
      cardsHtml = transfers.map(item =>
        TransferCard.render(item, {
          tipo: 'componente',
          isExpanded: this.expandedCards.has(item.id)
        })
      ).join('');
    }

    const contentHtml = `
      <!-- Linha de Ação: Busca + Botão Criar Nova Transferência -->
      <div class="transfer-action-row">
        <div class="transfer-search-box">
          <span class="transfer-search-icon">
            ${lucide('search', { size: 18, stroke: '#9ca3af', strokeWidth: 2 })}
          </span>
          <input 
            type="text" 
            id="transfer-search-input" 
            class="transfer-search-input" 
            placeholder="Buscar por código, status, data" 
            value="${this.searchQuery}"
            autocomplete="off"
            aria-label="Buscar por código, status ou data"
          />
        </div>

        <!-- Botão Azul: Criar Nova Transferência com Ícone Circular de Adição -->
        <button class="btn-transfer-create" id="btn-create-transfer" type="button" title="Criar Nova Transferência">
          <span class="btn-transfer-create-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
          </span>
          <div class="btn-transfer-create-label">
            <span>Criar Nova</span>
            <span>Transferência</span>
          </div>
        </button>
      </div>

      <!-- Container da Lista de Cards de Transferência -->
      <div class="transfer-cards-list" id="transfer-cards-list">
        ${cardsHtml}
      </div>
    `;

    const footerActionsHtml = `
      <button class="btn-footer-action btn-footer-voltar" id="btn-transfer-voltar" type="button" style="grid-column: 1 / -1;">
        ${lucide('arrow-left', { size: 18, stroke: '#1956ce', strokeWidth: 2.2 })}
        <span>Voltar ao Menu</span>
      </button>
    `;

    // Envelope no PageContainer padrão da Alvenius
    this.container.innerHTML = PageContainer.render({
      bannerTitle: 'Transferência - Componente',
      bannerDescription: '<span class="banner-line-1" style="white-space: nowrap; display: block;">Lista e criar o registro do processo de transferência.</span>',
      content: contentHtml,
      footerActions: footerActionsHtml,
      containerClass: 'view-transferencia-componente-container',
      cardClass: 'card-transferencia-componente'
    });

    this.bindEvents();
  }

  bindEvents() {
    // 1. Campo de busca em tempo real
    const searchInput = this.container.querySelector('#transfer-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const filtered = this.getFilteredTransfers();
        const listContainer = this.container.querySelector('#transfer-cards-list');
        if (listContainer) {
          if (filtered.length === 0) {
            listContainer.innerHTML = `
              <div class="transfer-empty-state">
                ${lucide('search', { size: 36, stroke: '#9ca3af', strokeWidth: 1.5 })}
                <div class="transfer-empty-title">Nenhuma transferência encontrada</div>
                <div class="transfer-empty-subtitle">Tente outro termo na busca por código, status ou data.</div>
              </div>
            `;
          } else {
            listContainer.innerHTML = filtered.map(item =>
              TransferCard.render(item, {
                tipo: 'componente',
                isExpanded: this.expandedCards.has(item.id)
              })
            ).join('');
            this.bindCardEvents(listContainer);
          }
        }
      });
    }

    // 2. Botão Criar Nova Transferência
    const btnCreate = this.container.querySelector('#btn-create-transfer');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => {
        this.handleCreateTransfer();
      });
    }

    // 3. Botão Voltar ao Menu
    const btnVoltar = this.container.querySelector('#btn-transfer-voltar');
    if (btnVoltar) {
      btnVoltar.addEventListener('click', () => {
        if (typeof this.options.onNavigate === 'function') {
          this.options.onNavigate('menu');
        }
      });
    }

    // 4. Delegação de eventos dos cards
    const listContainer = this.container.querySelector('#transfer-cards-list');
    if (listContainer) {
      this.bindCardEvents(listContainer);
    }
  }

  bindCardEvents(container) {
    const toggleButtons = container.querySelectorAll('.btn-toggle-transfer-items');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const transferId = btn.getAttribute('data-toggle-transfer');
        if (transferId) {
          this.toggleExpand(transferId);
        }
      });
    });
  }
}
