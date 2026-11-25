# Especificação de Design: Modal Leitor de QRCode e Tela de Cadastro

Este documento detalha o layout, a hierarquia de componentes DOM, as classes CSS recomendadas, as regras de espaçamento e o fluxo de interação para a **Tela de Cadastro** (estado inicial vazio) e o **Modal Leitor de QRCode**, de acordo com as referências oficiais:
- `copilot-image-c65f64.png` (Tela de Cadastro com campos em branco)
- `copilot-image-157449.png` (Modal Leitor de QRCode Industrial)

---

## 1. Tela de Cadastro: Especificação de Layout (`copilot-image-c65f64.png`)

### 1.1 Estado Inicial Vazio
No carregamento da tela de cadastro ou após acionamento do botão "Limpar", a interface deve obrigatoriamente apresentar o seguinte estado:
- **Campo `Código :`**: Vazio (`value = ""`), placeholder sutil indicando formato esperado (`Ex: SPL-2024-001`).
- **Campo `Descrição:`**: Vazio (`value = ""`), placeholder explicativo.
- **Tabela `COMPONENTES`**: 
  - Exibe exclusivamente a linha de cabeçalho com as colunas:
    1. `ITENS` (largura fixa 90px, alinhado ao centro)
    2. `DESCRIÇÃO` (largura flexível/fluida, alinhado à esquerda)
    3. `QTD.` (largura fixa 110px, alinhado à direita)
  - Sem registros inseridos no corpo da tabela (área vazia com altura mínima limpa ou placeholder neutro).
- **Botões de Ação Inferiores**:
  - **Botão "Ler QRCode"**: **ATIVO** (`#1d4ed8`), texto branco com ícone de QR Code, `cursor: pointer`.
  - **Botão "Limpar"**: **DESABILITADO** (`background: #f1f5f9; color: #94a3b8; border: 1px solid #cbd5e1; cursor: not-allowed; opacity: 0.65; pointer-events: none`).
  - **Botão "Gravar"**: **DESABILITADO** (`background: #f1f5f9; color: #94a3b8; border: 1px solid #cbd5e1; cursor: not-allowed; opacity: 0.65; pointer-events: none`).

### 1.2 Estrutura e Classes Recomendadas
```html
<div class="view-cadastro-container">
  <div class="card card-spool">
    <!-- Faixa Superior Cinza com Título SPOOL -->
    <div class="card-header-strip">
      <span class="card-header-title">SPOOL</span>
    </div>

    <div class="card-body">
      <!-- Caixa Informativa -->
      <div class="info-box">
        <i data-lucide="info" class="icon-info"></i>
        <span>Realiza o cadastro de Spool e componentes para iniciar processo de produção.</span>
      </div>
      <div class="accent-line"></div>

      <!-- Formulário de Identificação do Spool -->
      <div class="form-two-cols">
        <div class="form-group col-codigo">
          <label class="form-label" for="cadastro-codigo">Código :</label>
          <input 
            type="text" 
            id="cadastro-codigo" 
            class="form-input form-input-code" 
            placeholder="Ex: SPL-2024-001" 
            value="" 
          />
        </div>

        <div class="form-group col-descricao">
          <label class="form-label" for="cadastro-descricao">Descrição:</label>
          <input 
            type="text" 
            id="cadastro-descricao" 
            class="form-input" 
            placeholder="Descrição técnica detalhada do carretel spool" 
            value="" 
          />
        </div>
      </div>

      <!-- Faixa de Seção de Componentes -->
      <div class="section-strip-title">COMPONENTES</div>

      <!-- Tabela de Componentes -->
      <div class="table-responsive">
        <table class="table-components">
          <thead>
            <tr>
              <th class="col-item">ITENS</th>
              <th class="col-desc">DESCRIÇÃO</th>
              <th class="col-qtd">QTD.</th>
            </tr>
          </thead>
          <tbody id="cadastro-table-body" class="empty-state-tbody">
            <!-- Sem linhas de dados no estado inicial vazio -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Barra de Ações do Rodapé -->
    <div class="card-footer-actions">
      <!-- Botão Ativo (Azul) -->
      <button class="btn btn-primary" id="btn-cadastro-qrcode">
        <i data-lucide="qr-code"></i>
        <span>Ler QRCode</span>
      </button>

      <!-- Botões Desabilitados no Estado Vazio -->
      <button class="btn btn-disabled" id="btn-cadastro-limpar" disabled>
        <i data-lucide="trash-2"></i>
        <span>Limpar</span>
      </button>

      <button class="btn btn-disabled" id="btn-cadastro-gravar" disabled>
        <i data-lucide="save"></i>
        <span>Gravar</span>
      </button>
    </div>
  </div>
</div>
```

---

## 2. Modal Leitor de QRCode: Especificação de Layout (`copilot-image-157449.png`)

### 2.1 Visão Geral e Atmosfera Visual
O modal do leitor adota um padrão de **visor industrial de alta precisão**:
- Fundo escuro com desfoque de backdrop.
- Visor central preto fechado por **borda externa branca sólida de 4px**.
- **Quatro miras angulares nos cantos** na cor azul fluorescente (`#3b82f6`) para guiar a centralização da etiqueta.
- **QRCode Mockup centralizado** dentro do visor preto com alto contraste.
- **Card 1 de Instruções**: com título centralizado em caixa alta, passos objetivos 1 e 2, finalizado por barra inferior em gradiente azul fluente.
- **Card 2 de Histórico / Leitura**: com exibição inline dos dados em formato conciso, separados por barras verticais (`" | "`).
- **Botão Fechar**: vermelho sólido (`#dc2626`) com ícone de fechar em círculo (`circle-x`), estendendo-se por toda a largura inferior.

### 2.2 Estrutura e Classes Recomendadas
```html
<div class="modal-backdrop" id="qrcode-modal-backdrop">
  <div class="modal-dialog modal-dialog-scanner" role="dialog" aria-modal="true" aria-labelledby="modal-scanner-title">
    
    <!-- Cabeçalho do Leitor -->
    <div class="modal-header-scanner">
      <h2 class="modal-title-scanner" id="modal-scanner-title">Leitor de QRCode</h2>
      <div class="header-divider-scanner"></div>
    </div>

    <div class="modal-body-scanner">
      
      <!-- Visor Industrial com Borda Branca 4px e Miras Azuis -->
      <div class="scanner-viewfinder" aria-label="Visor da Câmera do Leitor">
        <!-- 4 Cantos Azuis Fluorescentes (#3b82f6) -->
        <span class="corner-bracket top-left"></span>
        <span class="corner-bracket top-right"></span>
        <span class="corner-bracket bottom-left"></span>
        <span class="corner-bracket bottom-right"></span>

        <!-- Linha Laser de Varredura Horizontal -->
        <div class="scanner-laser-line"></div>

        <!-- QRCode Mockup Centralizado -->
        <div class="qr-mockup-wrapper">
          <svg class="qr-mockup-svg" viewBox="0 0 100 100">
            <!-- Representação gráfica de alto contraste de QR Code -->
            <rect width="100" height="100" fill="#ffffff" />
            <path fill="#000000" d="M10,10 h30 v30 h-30 z M16,16 v18 h18 v-18 z M22,22 h6 v6 h-6 z" />
            <path fill="#000000" d="M60,10 h30 v30 h-30 z M66,16 v18 h18 v-18 z M72,22 h6 v6 h-6 z" />
            <path fill="#000000" d="M10,60 h30 v30 h-30 z M16,66 v18 h18 v-18 z M22,72 h6 v6 h-6 z" />
            <path fill="#000000" d="M45,15 h10 v5 h-10 z M45,25 h5 v10 h-5 z M55,30 h5 v5 h-5 z" />
            <path fill="#000000" d="M45,45 h20 v5 h-20 z M70,45 h15 v5 h-15 z M45,55 h10 v15 h-10 z" />
            <path fill="#000000" d="M60,60 h10 v10 h-10 z M75,60 h15 v10 h-15 z M60,75 h25 v15 h-25 z" />
          </svg>
        </div>
      </div>

      <!-- Card 1: Instruções de Leitura com Barra Gradiente -->
      <div class="card-scanner-instructions">
        <h3 class="instructions-title">Instruções de Leitura</h3>
        <ol class="instructions-steps">
          <li><strong>1.</strong> Aponte a câmera para o QRCode impresso no Spool.</li>
          <li><strong>2.</strong> Centralize a imagem dentro das 4 miras azuis fluorescentes.</li>
        </ol>
        <!-- Barra Gradiente Azul Inferior -->
        <div class="instructions-gradient-bar"></div>
      </div>

      <!-- Card 2: Último QRCode Lido (Formato Inline) -->
      <div class="card-scanner-last-read">
        <span class="last-read-label">Último QRCode lido:</span>
        <div class="last-read-content-inline" id="scanner-last-code-display">
          <span class="data-code">SPL-2024-001</span>
          <span class="data-pipe"> | </span>
          <span class="data-desc">Tubo Condução Aço Carbono 4" Sch 40</span>
          <span class="data-pipe"> | </span>
          <span class="data-components">3 componentes</span>
        </div>
      </div>

    </div>

    <!-- Rodapé: Botão Vermelho Sólido de Fechar -->
    <div class="modal-footer-scanner">
      <button class="btn btn-close-scanner" id="modal-scanner-btn-close">
        <i data-lucide="circle-x" class="icon-circle-x"></i>
        <span>Fechar</span>
      </button>
    </div>

  </div>
</div>
```

---

## 3. Especificação de Estilos CSS e Regras Visuais

### 3.1 O Visor Preto com Borda Branca 4px e Miras Azuis
```css
.scanner-viewfinder {
  position: relative;
  width: 260px;
  height: 260px;
  margin: 20px auto 16px auto;
  background-color: #000000;
  border: 4px solid #ffffff;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45), inset 0 0 16px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

/* Miras de Canto Azuis Fluorescentes */
.corner-bracket {
  position: absolute;
  width: 26px;
  height: 26px;
  border-color: #3b82f6;
  border-style: solid;
  pointer-events: none;
  filter: drop-shadow(0 0 4px #3b82f6);
}

.corner-bracket.top-left {
  top: 6px;
  left: 6px;
  border-width: 4px 0 0 4px;
}

.corner-bracket.top-right {
  top: 6px;
  right: 6px;
  border-width: 4px 4px 0 0;
}

.corner-bracket.bottom-left {
  bottom: 6px;
  left: 6px;
  border-width: 0 0 4px 4px;
}

.corner-bracket.bottom-right {
  bottom: 6px;
  right: 6px;
  border-width: 0 4px 4px 0;
}

/* Laser de Escaneamento Animado */
.scanner-laser-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #3b82f6;
  box-shadow: 0 0 10px #3b82f6, 0 0 4px #60a5fa;
  animation: scanLaser 2.2s ease-in-out infinite alternate;
  z-index: 5;
}

@keyframes scanLaser {
  0% { top: 12px; opacity: 0.8; }
  100% { top: calc(100% - 14px); opacity: 0.8; }
}

/* QRCode Mockup Centralizado */
.qr-mockup-wrapper {
  width: 148px;
  height: 148px;
  background-color: #ffffff;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 3.2 Card 1: Instruções de Leitura e Barra Gradiente
```css
.card-scanner-instructions {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0px;
  margin: 14px 20px 10px 20px;
  padding: 12px 16px 14px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.instructions-title {
  font-size: 13px;
  font-weight: 700;
  color: #0a2540;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin: 0 0 8px 0;
}

.instructions-steps {
  list-style: none;
  padding: 0;
  margin: 0;
}

.instructions-steps li {
  font-size: 12px;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 4px;
}

.instructions-steps li strong {
  color: #1e293b;
}

/* Barra Gradiente Azul na Borda Inferior */
.instructions-gradient-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
}
```

### 3.3 Card 2: Último QRCode Lido
```css
.card-scanner-last-read {
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 0px;
  margin: 0 20px 16px 20px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.last-read-label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.last-read-content-inline {
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.last-read-content-inline .data-code {
  color: #1d4ed8;
}

.last-read-content-inline .data-pipe {
  color: #94a3b8;
  margin: 0 4px;
  font-weight: 400;
}
```

### 3.4 Botão Fechar Vermelho Sólido
```css
.modal-footer-scanner {
  padding: 10px 20px 16px 20px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close-scanner {
  width: 100%;
  height: 42px;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 0px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.35);
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
}

.btn-close-scanner:hover {
  background-color: #b91c1c;
  box-shadow: 0 3px 8px rgba(220, 38, 38, 0.45);
}

.btn-close-scanner:active {
  background-color: #991b1b;
}
```

---

## 4. Fluxo de Interação e Máquina de Estados

### 4.1 Diagrama de Estados do Cadastro
```text
[ESTADO INICIAL VAZIO]
  - Código: ""
  - Descrição: ""
  - Tabela: 0 linhas
  - Botão "Ler QRCode": ATIVO
  - Botões "Limpar" / "Gravar": DESABILITADOS
         |
         | Clique em "Ler QRCode"
         v
[MODAL LEITOR ABERTO]
  - Visor industrial ativo com laser e miras #3b82f6
  - Card 1: Instruções e barra gradiente
  - Card 2: Último QRCode lido inline
  - Ação: Câmera ou Simulação captura o Spool
         |
         | Clique em "Fechar" ou leitura concluída
         v
[ESTADO PREENCHIDO (PÓS-SCAN)]
  - Código: "SPL-2024-001"
  - Descrição: "Tubo Condução Aço Carbono 4\" Sch 40"
  - Tabela: 3 componentes populados
  - Botão "Ler QRCode": ATIVO (permite trocar spool)
  - Botões "Limpar" e "Gravar": HABILITADOS
         |
         +---- Clique em "Limpar" -----> Retorna ao [ESTADO INICIAL VAZIO]
         |
         +---- Clique em "Gravar" -----> Salva spool e exibe feedback de sucesso
```

---

## 5. Acessibilidade e Contraste
1. **Contraste de Cores:**
   - O botão azul `#1d4ed8` com texto branco atinge razão de contraste **5.2:1**, em conformidade com o critério WCAG AA.
   - O botão vermelho `#dc2626` com texto branco atinge **4.8:1**, superando a taxa mínima necessária de 4.5:1.
   - O visor preto `#000000` com borda `#ffffff` (21:1) e miras azuis fluorescentes `#3b82f6` (8.5:1 sobre preto) proporciona máxima clareza em chão de fábrica ou ambiente de luminosidade variada.
2. **Navegação por Teclado:**
   - O modal implementa captura de foco (`focus trap`) e fechamento rápido via tecla `Escape`.
   - O botão "Fechar" recebe foco preferencial ao término do escaneamento.
