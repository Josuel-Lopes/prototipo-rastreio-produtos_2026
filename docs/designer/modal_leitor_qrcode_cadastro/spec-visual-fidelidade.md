# Especificação Visual de Alta Fidelidade: Tela de Cadastro Mobile & Modal Leitor de QRCode

Este documento estabelece as especificações visuais de alta fidelidade para a **Tela de Cadastro Mobile** e o **Modal Leitor de QRCode**, extraídas da análise direta dos prints de referência oficiais:
- `copilot-image-c65f64.png` (Tela de Cadastro Mobile com estado inicial vazio)
- `copilot-image-157449.png` (Modal Leitor de QRCode Industrial em sobreposição)

---

## 1. Tokens de Design e Valores Canônicos

### 1.1 Paleta de Cores

| Token | Valor HEX / RGBA | Uso no Layout |
|---|---|---|
| `color-primary-blue` | `#1d4ed8` | Botão ativo "Ler QRCode", acentos principais |
| `color-neon-blue` | `#3b82f6` | Miras fluorescentes do visor, gradiente do banner e do card de instruções |
| `color-cyan-glow` | `#38bdf8` / `#67e8f9` | Feixe de brilho ciano no topo do visor da câmera |
| `color-card-border` | `#7188a4` | Borda externa do card principal e grades/divisórias da tabela de componentes |
| `color-card-bg` | `#ffffff` | Fundo do card principal, pill e cards de instrução/histórico |
| `color-banner-gray` | `#e2e8f0` | Fundo do banner de spool, topo do quadro componentes e botões desabilitados |
| `color-table-header` | `#f8fafc` | Fundo do subcabeçalho de colunas da tabela |
| `color-backdrop` | `rgba(18, 22, 30, 0.75)` | Fundo escuro translúcido com visualização esmaecida da tela posterior |
| `color-visor-bg` | `#000000` | Fundo do visor da câmera do leitor de QR Code |
| `color-visor-border` | `#ffffff` | Borda sólida de 4px contornando o visor da câmera |
| `color-btn-close` | `#dc2626` | Fundo do botão "Fechar" no modal |
| `color-disabled-trash` | `#f87171` | Ícone lixeira e texto do botão "Limpar" quando desabilitado |
| `color-disabled-save` | `#86efac` | Ícone disquete e texto do botão "Gravar" quando desabilitado |
| `color-text-dark` | `#111827` | Títulos e descrições escuras no banner cinza e instruções |
| `color-text-pure-white`| `#ffffff` | Título do modal, botões ativos, miras e bordas |
| `color-hamburger` | `#757c96` | Ícone de menu hambúrguer no header |

### 1.2 Dimensões, Espaçamentos e Geometrias

| Elemento | Dimensão / Propriedade | Valor Canônico |
|---|---|---|
| Largura máxima do Card Mobile | `max-width` | `360px` (margem lateral de `12px` em tela de 384px-414px) |
| Cantos do Card Principal | `border-radius` | `0px` (cantos retos industriais) |
| Borda do Card Principal | `border` | `1px solid #7188a4` |
| Floating Pill "Cadastro" | `border-radius` | `8px` (cantos arredondados com sombra suave) |
| Banner Cinza Superior | `background-color` | `#e2e8f0` (container único com título e info de produção) |
| Linha Gradiente Superior | `background` | `linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)` (altura `3px`) |
| Borda Quadro Componentes | `border` | `1.5px solid #7188a4` |
| Altura mínima corpo Componentes | `min-height` | `120px` (área limpa em branco quando vazio) |
| Grade de Botões do Rodapé | `display: grid` | `grid-template-columns: 1fr 1fr 1fr; gap: 6px; height: 46px` |
| Borda do Visor da Câmera | `border` | `4px solid #ffffff` |
| Cantos do Visor da Câmera | `border-radius` | `6px` (cantos suavemente arredondados) |
| Dimensões do Visor | `width` x `height` | `260px` x `260px` |
| Cards Internos do Modal | `border-radius`, `padding` | `8px`, `14px` |
| Botão "Fechar" do Modal | `height`, `border-radius` | `48px`, `8px` |

---

## 2. Tela de Cadastro Mobile (`copilot-image-c65f64.png`)

### 2.1 Header da Aplicação
- **Logotipo Alvenius**: Formado pelos 3 anéis entrelaçados característicos da identidade corporativa.
- **Identificação do Sistema**: "RASTREIO DE PRODUTOS" em caixa alta, tipografia sem serifa com peso semi-bold (`#0f172a`).
- **Badge de Versão**: Texto discreto `"v2.1.0"` em fonte cinza neutra (`#64748b`).
- **Menu Hambúrguer**: Ícone padrão de 3 barras horizontais em tom cinza específico (`#757c96`), posicionado na extremidade direita superior.

### 2.2 Floating Pill "Cadastro"
- **Posicionamento**: Centralizada horizontalmente a cavaleiro sobre a borda superior do Card principal (sobreposição com `margin-top: -16px` ou deslocamento vertical relativo).
- **Geometria e Estilo**:
  - `background-color: #ffffff`
  - `border-radius: 8px`
  - `padding: 6px 20px`
  - `font-size: 13px; font-weight: 700; color: #1e293b`
  - `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10)`
  - `border: 1px solid #e2e8f0`

### 2.3 Card Principal do Cadastro
- **Dimensões e Contenção**:
  - Largura: `100%` ocupando a largura disponível respeitando margens laterais de `12px` (`max-width: 360px`).
  - `border-radius: 0px` (cantos perfeitamente retos).
  - `border: 1px solid #7188a4` (tom cinza-azulado industrial nítido).
  - `background-color: #ffffff`.

### 2.4 Banner Superior Interno do Card
- **Estrutura Unificada**: Um único container cinza claro (`#e2e8f0`) posicionado no topo interno do Card principal contendo:
  1. **Título SPOOL**: Centralizado em negrito, `14px`, cor escura `#111827`.
  2. **Texto Descritivo de Operação**:
     - Ícone `info` Lucide (`14px`, cor `#111827`).
     - Texto de instrução: *"Realiza o cadastro de Spool e componentes iniciar processo produção."*
     - Tipografia: `12px`, cor `#111827`, peso `500`, espaçamento vertical compacto.
  3. **Divisória Inferior Brilhante**:
     - Imediatamente colada na base do container cinza claro.
     - Linha de `2.5px` a `3px` com acabamento `linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)`.

### 2.5 Seção de Identificação do Spool
- **Título de Seção**: `"SPOOL"` alinhado à esquerda em negrito (`13px`, `#1e293b`).
- **Campos de Entrada (Formulário)**:
  - Rótulo **"Código  :"**: Rótulo em negrito alinhado à esquerda, seguido pelo campo de entrada. No estado inicial vazio, `value = ""`.
  - Rótulo **"Descrição:"**: Rótulo em negrito alinhado à esquerda, seguido pelo campo de entrada textual. No estado inicial vazio, `value = ""`.
  - Estilo dos inputs: borda fina cinza `#cbd5e1`, cantos retos `0px`, altura `38px`, texto `#0f172a`.

### 2.6 Quadro COMPONENTES
- **Borda Externa**: Borda retangular sólida de `1.5px solid #7188a4`.
- **Faixa Superior do Quadro**:
  - Fundo cinza claro `#e2e8f0`.
  - Título `"COMPONENTES"` centralizado em negrito (`13px`, `#1e293b`).
  - Divisória inferior horizontal de `1.5px solid #7188a4`.
- **Subcabeçalho de Colunas**:
  - Colunas: `ITENS` | `DESCRIÇÃO` | `QTD.`.
  - Fundo: `#f8fafc`.
  - Divisórias verticais entre colunas: `1.5px solid #7188a4`.
  - Divisória horizontal inferior: `1.5px solid #7188a4`.
  - Alinhamentos: `ITENS` centralizado, `DESCRIÇÃO` alinhado à esquerda, `QTD.` alinhado à direita.
- **Área do Corpo (TBody)**:
  - **Estado Inicial Vazio**: Área em branco limpa com `min-height: 120px` sem registros adicionados.
  - **Estado Pós-Leitura**: Linhas preenchidas com dados dos componentes lidos pelo QR Code, com divisórias horizontais sutis `#e2e8f0`.

### 2.7 Rodapé de Ações (Grid de 3 Botões)
- **Container do Rodapé**:
  - `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;`
  - Altura uniforme dos botões: `46px`.
  - Cantos dos botões: `0px` ou `4px` estritamente contidos no grid.
- **Botão 1: "Ler QRCode" (Ativo)**:
  - `background-color: #1d4ed8` (azul vibrante Alvenius).
  - Texto e ícone Lucide `qr-code` em **branco puro (`#ffffff`)**.
  - `font-size: 13px; font-weight: 700; cursor: pointer`.
- **Botão 2: "Limpar" (Desabilitado no Estado Inicial)**:
  - `background-color: #e2e8f0` (cinza claro suave).
  - Ícone Lucide `trash-2` e texto em **rosa/vermelho claro esmaecido (`#f87171`)**.
  - `cursor: not-allowed; border: 1px solid #cbd5e1`.
- **Botão 3: "Gravar" (Desabilitado no Estado Inicial)**:
  - `background-color: #e2e8f0` (cinza claro suave).
  - Ícone Lucide `save` e texto em **verde claro esmaecido (`#86efac`)**.
  - `cursor: not-allowed; border: 1px solid #cbd5e1`.

---

## 3. Modal Leitor de QRCode (`copilot-image-157449.png`)

### 3.1 Backdrop Translúcido
- `background-color: rgba(18, 22, 30, 0.75)`
- `backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px)`
- Permite visualizar a tela de cadastro ao fundo de maneira esmaecida e focada.
- Centralização absoluta do conteúdo com padding vertical para telas menores.

### 3.2 Topo do Modal
- **Título**: `"Leitor de QRCode"` em **branco puro (`#ffffff`)**, peso negrito (`font-weight: 700`), tamanho `20px`, centralizado.
- **Linha Divisória**: Linha branca sutil de `1px` imediatamente abaixo do título (`rgba(255, 255, 255, 0.35)`), separando o cabeçalho do visor.

### 3.3 Visor da Câmera Industrial
- **Container do Visor**:
  - Fundo: preto absoluto (`#000000`).
  - Borda: **borda branca grossa de 4px sólida (`4px solid #ffffff`)**.
  - Cantos: **suavemente arredondados com `border-radius: 6px`**.
  - Dimensões: `width: 260px; height: 260px; margin: 18px auto; position: relative; overflow: hidden;`.
- **Elementos Visuais Internos do Visor**:
  1. **4 Miras Angulares de Canto**:
     - Posicionamento: top-left, top-right, bottom-left, bottom-right a `6px` das bordas internas.
     - Cor: **azul neon fluorescente (`#3b82f6`)**.
     - Espessura: `4px`.
     - Dimensão: `24px` de largura/altura por haste.
  2. **Feixe de Brilho Ciano no Topo**:
     - Efeito gradiente suave no topo do visor simulando emissor óptico:
       `background: linear-gradient(180deg, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0) 100%)`.
     - Altura: `28px`, posicionado em `top: 0; left: 0; right: 0;`.
  3. **QR Code Vetorial Estático**:
     - QR Code centralizado em vetor SVG branco sobre o fundo preto.
     - **Estático e limpo**: sem linha de animação de varredura laser contínua.
     - Dimensão: aproximadamente `140px` x `140px`, com alta legibilidade e nitidez geométrica.

### 3.4 Card 1: Card de Instruções
- **Estrutura do Card**:
  - Card branco independente (`background-color: #ffffff`).
  - `border-radius: 8px`.
  - `padding: 14px 16px`.
  - `margin: 0 16px 12px 16px`.
  - `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18)`.
  - `position: relative; overflow: hidden`.
- **Conteúdo**:
  - Título principal: `"Ler o QRCode do Spool e Componentes."` em negrito, `14px`, cor `#000000`.
  - Passo 1: `"1 - Ler o QRCode do Spool."` em negrito, `13px`, cor `#000000`, `margin-top: 6px`.
  - Passo 2: `"2 - Ler o QRCode dos componentes."` em negrito, `13px`, cor `#000000`, `margin-top: 4px`.
- **Linha Divisória Inferior Gradiente**:
  - Barra de `3.5px` na borda inferior do card.
  - Gradiente azul vibrante: `background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)`.

### 3.5 Card 2: Card do Último QRCode Lido
- **Estrutura do Card**:
  - Card branco independente (`background-color: #ffffff`).
  - `border-radius: 8px`.
  - `padding: 14px 16px`.
  - `margin: 0 16px 16px 16px`.
  - `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18)`.
- **Conteúdo**:
  - Rótulo: `"Último QRCode lido:"` em negrito, `14px`, cor `#000000`, alinhado à esquerda.
  - Linha de Dados Inline com Separadores:
    - `"SPL-2024-001 | Tubo Condução Aço Carbono 4\" Sch 40 | 3 componentes"`
    - Fonte com boa distinção técnica (`font-size: 12px; font-weight: 600; color: #1e293b`).
    - Separadores verticais em cor neutra (`#94a3b8`) com espaçamento simétrico.

### 3.6 Botão Fechar
- **Estrutura e Posicionamento**:
  - Botão de destaque na base do modal.
  - Largura: estende-se ocupando a largura útil alinhado aos cards (`margin: 0 16px 20px 16px`).
  - Altura: **`48px`**.
  - Cantos: **`border-radius: 8px`**.
- **Visual e Interação**:
  - Cor de fundo: vermelho vibrante **`#dc2626`** (hover `#b91c1c`).
  - Borda: `none`.
  - Ícone: Lucide `circle-x` em branco puro (`20px`).
  - Texto: `"Fechar"` em **branco puro (`#ffffff`)**, `font-size: 15px`, `font-weight: 700`.
  - `box-shadow: 0 3px 10px rgba(220, 38, 38, 0.40)`.

---

## 4. Diagramação ASCII de Alta Fidelidade

### 4.1 Tela de Cadastro Mobile (`copilot-image-c65f64.png`)
```text
======================================================================
[ (O)(O)(O) ] RASTREIO DE PRODUTOS  v2.1.0                     [ = ]
======================================================================
                         +-------------------+
                         |     Cadastro      |   <- Pill branca 8px r
                         +-------------------+      sombra suave
  +----------------------------------------------------------------+
  |  +----------------------------------------------------------+  |
  |  | SPOOL (14px Bold)                                        |  | <- Banner Cinza
  |  | (i) Realiza o cadastro de Spool e componentes iniciar    |  |    #e2e8f0
  |  |     processo produção.                                   |  |
  |  +----------------------------------------------------------+  |
  |  |=================== DIVISÓRIA GRADIENTE AZUL =============|  | <- #3b82f6 line
  |                                                                |
  |  SPOOL (Bold)                                                  |
  |  Código  : [                                                ]  |
  |  Descrição: [                                               ]  |
  |                                                                |
  |  +----------------------------------------------------------+  |
  |  |                       COMPONENTES                        |  | <- Faixa Cinza
  |  |----------------------------------------------------------|  |    #e2e8f0
  |  |    ITENS     |             DESCRIÇÃO             |  QTD. |  | <- Cabeçalho
  |  |--------------+-----------------------------------+-------|  |    Fundo #f8fafc
  |  |                                                          |  |
  |  |                                                          |  | <- Área vazia
  |  |                                                          |  |    (min-height:
  |  |                                                          |  |     120px)
  |  |                                                          |  |
  |  +----------------------------------------------------------+  |
  |                                                                |
  |  +-------------------+  +-------------------+  +------------+  |
  |  | [QR] Ler QRCode   |  | [X] Limpar        |  | [V] Gravar |  | <- Grid 1fr 1fr 1fr
  |  | (Azul #1d4ed8)    |  | (Cinza/Rosa       |  | (Cinza/    |  |    Altura 46px
  |  | (Ativo)           |  |  #f87171 Desab.)  |  |  Verde     |  |    Gap 6px
  |  +-------------------+  +-------------------+  |  #86efac)  |  |
  |                                                +------------+  |
  +----------------------------------------------------------------+
```

### 4.2 Modal Leitor de QRCode (`copilot-image-157449.png`)
```text
+----------------------------------------------------------------------+
| [Backdrop Translúcido rgba(18, 22, 30, 0.75) com fundo esmaecido]   |
|                                                                      |
|                         Leitor de QRCode                             | <- Branco 20px Bold
|             ----------------------------------------                 | <- Divisória sutil
|                                                                      |
|                     +----------------------+                         |
|                     |#====================#|  <- Borda Branca 4px    |
|                     ||^                  ^||  <- Feixe Ciano Topo    |
|                     ||*                  *||  <- Mira Azul Neon      |
|                     ||     +--------+     ||     (#3b82f6)           |
|                     ||     | █ ▄  █ |     ||                         |
|                     ||     | █ █  █ |     ||  <- QR Code Vetorial    |
|                     ||     | █ ▄  █ |     ||     Branco Estático     |
|                     ||     +--------+     ||                         |
|                     ||*                  *||  <- Cantos 6px          |
|                     |#====================#|                         |
|                     +----------------------+                         |
|                                                                      |
|       +------------------------------------------------------+       |
|       | Ler o QRCode do Spool e Componentes. (Bold 14px)     |       | <- Card 1 Branco
|       | 1 - Ler o QRCode do Spool. (Bold 13px)               |       |    Border-radius 8px
|       | 2 - Ler o QRCode dos componentes. (Bold 13px)        |       |    Padding 14px
|       |======================================================|       | <- Linha Gradiente
|       +------------------------------------------------------+       |    Azul #3b82f6
|                                                                      |
|       +------------------------------------------------------+       |
|       | Último QRCode lido: (Bold 14px)                      |       | <- Card 2 Branco
|       | SPL-2024-001 | Tubo Condução Aço Carbono 4" | 3 comp |       |    Inline com " | "
|       +------------------------------------------------------+       |
|                                                                      |
|       +------------------------------------------------------+       |
|       | [X] Fechar                (Vermelho Vibrante #dc2626)|       | <- Botão Altura 48px
|       +------------------------------------------------------+       |    Border-radius 8px
|                                                                      |
+----------------------------------------------------------------------+
```

---

## 5. Implementação CSS de Referência

```css
/* ========================================================
   TELA DE CADASTRO MOBILE - ESPECIFICAÇÃO DE FIDELIDADE
   ======================================================== */

.cadastro-mobile-container {
  width: 100%;
  max-width: 360px;
  margin: 20px auto 40px auto;
  padding: 0 12px;
  box-sizing: border-box;
  position: relative;
}

/* Pill "Cadastro" centralizada a cavaleiro */
.floating-pill-cadastro {
  display: inline-block;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 22px;
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

/* Card Principal Retangular 0px */
.card-principal-cadastro {
  background-color: #ffffff;
  border: 1px solid #7188a4;
  border-radius: 0px;
  padding: 24px 14px 14px 14px;
  box-sizing: border-box;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

/* Banner Superior Interno Cinza Claro */
.banner-spool-container {
  background-color: #e2e8f0;
  border-radius: 0px;
  padding: 10px 12px 10px 12px;
  margin-bottom: 0px;
}

.banner-spool-title {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
  text-transform: uppercase;
}

.banner-spool-info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #111827;
  line-height: 1.35;
}

/* Divisória Gradiente Azul Brilhante */
.banner-blue-divider {
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
  margin-bottom: 14px;
}

/* Seção SPOOL e Campos */
.secao-spool-titulo {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  text-align: left;
  margin: 10px 0 8px 0;
}

.form-linha-cadastro {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}

.form-linha-cadastro label {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  min-width: 78px;
}

.form-linha-cadastro input {
  flex: 1;
  height: 36px;
  border: 1px solid #cbd5e1;
  border-radius: 0px;
  padding: 0 10px;
  font-size: 13px;
  color: #0f172a;
  background-color: #ffffff;
}

/* Quadro COMPONENTES com Grade 1.5px #7188a4 */
.quadro-componentes {
  border: 1.5px solid #7188a4;
  margin: 14px 0 16px 0;
  box-sizing: border-box;
}

.quadro-componentes-header {
  background-color: #e2e8f0;
  border-bottom: 1.5px solid #7188a4;
  padding: 6px 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

.tabela-colunas-header {
  display: grid;
  grid-template-columns: 80px 1fr 90px;
  background-color: #f8fafc;
  border-bottom: 1.5px solid #7188a4;
  font-size: 11px;
  font-weight: 700;
  color: #334155;
  text-transform: uppercase;
}

.tabela-colunas-header span {
  padding: 6px 8px;
}

.tabela-colunas-header span:not(:last-child) {
  border-right: 1.5px solid #7188a4;
}

.col-itens { text-align: center; }
.col-desc  { text-align: left; }
.col-qtd   { text-align: right; }

.tabela-corpo-vazio {
  min-height: 120px;
  background-color: #ffffff;
}

/* Rodapé com Grid 1fr 1fr 1fr de Altura 46px */
.rodape-acoes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  height: 46px;
}

.btn-acao {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  border: none;
  border-radius: 0px;
  padding: 0 4px;
}

/* Botão Ler QRCode Ativo */
.btn-ler-qrcode {
  background-color: #1d4ed8;
  color: #ffffff;
  cursor: pointer;
}

/* Botão Limpar Desabilitado */
.btn-limpar-disabled {
  background-color: #e2e8f0;
  color: #f87171;
  border: 1px solid #cbd5e1;
  cursor: not-allowed;
}

/* Botão Gravar Desabilitado */
.btn-gravar-disabled {
  background-color: #e2e8f0;
  color: #86efac;
  border: 1px solid #cbd5e1;
  cursor: not-allowed;
}


/* ========================================================
   MODAL LEITOR DE QRCODE - ESPECIFICAÇÃO DE FIDELIDADE
   ======================================================== */

.modal-qrcode-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(18, 22, 30, 0.75);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
}

.modal-qrcode-dialog {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
}

/* Topo do Modal */
.modal-qrcode-topo {
  text-align: center;
  margin-bottom: 14px;
}

.modal-qrcode-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.modal-qrcode-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.35);
}

/* Visor Industrial da Câmera */
.visor-camera-container {
  width: 260px;
  height: 260px;
  margin: 14px auto 16px auto;
  background-color: #000000;
  border: 4px solid #ffffff;
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

/* Feixe Ciano no Topo do Visor */
.visor-feixe-ciano {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(180deg, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0) 100%);
  pointer-events: none;
  z-index: 4;
}

/* Miras Azuis Neon nos 4 Cantos */
.mira-neon {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: #3b82f6;
  border-style: solid;
  pointer-events: none;
  z-index: 5;
  filter: drop-shadow(0 0 6px #3b82f6);
}

.mira-top-left     { top: 6px; left: 6px; border-width: 4px 0 0 4px; }
.mira-top-right    { top: 6px; right: 6px; border-width: 4px 4px 0 0; }
.mira-bottom-left  { bottom: 6px; left: 6px; border-width: 0 0 4px 4px; }
.mira-bottom-right { bottom: 6px; right: 6px; border-width: 0 4px 4px 0; }

/* QR Code Vetorial Estático Centralizado */
.visor-qrcode-svg {
  width: 140px;
  height: 140px;
  z-index: 2;
}

/* Cards Brancos Independentes (Border Radius 8px, Padding 14px) */
.card-modal-branco {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
}

.card-instrucoes-titulo {
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 6px 0;
}

.card-instrucoes-passo {
  font-size: 13px;
  font-weight: 700;
  color: #000000;
  margin: 4px 0;
}

.card-instrucoes-gradiente {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.5px;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
}

/* Card 2: Último QRCode Lido */
.card-ultimo-codigo-label {
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 6px;
  text-align: left;
}

.card-ultimo-codigo-inline {
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-ultimo-codigo-inline .pipe {
  color: #94a3b8;
  padding: 0 4px;
}

/* Botão Fechar Vermelho Vibrante 48px com 8px Border-Radius */
.btn-fechar-modal {
  width: 100%;
  height: 48px;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(220, 38, 38, 0.40);
  transition: background-color 0.15s ease;
}

.btn-fechar-modal:hover {
  background-color: #b91c1c;
}
```

---

## 6. Lista de Verificação de Conformidade Visual

| Item | Requisito Canônico | Status |
|---|---|---|
| **Header** | Logotipo Alvenius 3 anéis + "RASTREIO DE PRODUTOS" + v2.1.0 + hambúrguer cinza `#757c96` | Conforme |
| **Pill Cadastro** | Retangular com cantos 8px, fundo branco, sombra suave, a cavaleiro sobre a borda superior | Conforme |
| **Card Principal** | Fundo branco, borda fina `#7188a4`, cantos 0px, largura 100% contida com margem lateral 12px (max 360px) | Conforme |
| **Banner Superior Spool**| Container único cinza claro `#e2e8f0` contendo título centralizado "SPOOL" (14px Bold) e linha informativa com ícone info | Conforme |
| **Divisória do Banner** | Linha gradiente azul brilhante `#3b82f6` imediatamente colada abaixo do banner | Conforme |
| **Inputs Spool** | "Código  :" e "Descrição:" com rótulos em negrito e valores vazios no estado inicial | Conforme |
| **Quadro Componentes** | Borda 1.5px `#7188a4`, faixa cinza `#e2e8f0` com "COMPONENTES" centralizado em negrito, subcabeçalho de colunas (ITENS \| DESCRIÇÃO \| QTD.) com divisórias verticais e corpo vazio min-height 120px | Conforme |
| **Botões do Rodapé** | Grid 1fr 1fr 1fr, gap 6px, altura 46px: Botão 1 ativo `#1d4ed8` com ícone QR Code branco; Botão 2 "Limpar" desabilitado cinza `#e2e8f0` com texto/ícone rosa claro `#f87171`; Botão 3 "Gravar" desabilitado cinza `#e2e8f0` com texto/ícone verde claro `#86efac` | Conforme |
| **Backdrop Modal** | `rgba(18, 22, 30, 0.75)` com desfoque permitindo ver tela ao fundo esmaecida | Conforme |
| **Topo Modal** | "Leitor de QRCode" em branco puro `#ffffff`, 20px negrito, centralizado com linha branca sutil | Conforme |
| **Visor da Câmera** | Quadro preto `#000000`, borda grossa branca de 4px, cantos arredondados de 6px, 4 miras neon `#3b82f6`, feixe ciano no topo e QR Code estático vetorizado branco | Conforme |
| **Card 1 (Instruções)** | Card branco independente com border-radius 8px, padding 14px, passos 1 e 2 em negrito e linha gradiente azul `#3b82f6` na base | Conforme |
| **Card 2 (Último Lido)**| Card branco independente com border-radius 8px, padding 14px, título "Último QRCode lido:" e dados inline separados por " \| " | Conforme |
| **Botão Fechar** | Botão vermelho vibrante `#dc2626`, altura 48px, border-radius 8px, ícone circle-x e texto branco negrito | Conforme |
