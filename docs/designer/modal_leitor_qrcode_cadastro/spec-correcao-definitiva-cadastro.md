# Especificação Técnica Definitiva: Correção de Fidelidade Visual da Tela de Cadastro Mobile

> **Documentos de Referência Forense:**
> - **REFERÊNCIA:** `copilot-image-b478cb.png` (Tela de Cadastro Mobile Oficial de Referência - Estado Inicial)
> - **ATUAL:** `copilot-image-77e5f4.png` (Implementação atual com inconsistências)
> - **Destinatário:** Time de desenvolvimento frontend (`spool-management-by-project-frontend`)
> - **Data de Emissão:** 24/11/2026

---

## 1. Sumário Executivo da Análise Forense Comparativa

A comparação visual lado a lado entre a referência original (`b478cb`) e a versão implementada (`77e5f4`) revelou 4 discrepâncias críticas de geometria, respiro e acabamento visual:

| Componente / Seção | Na Referência (`b478cb`) | No Atual Incorreto (`77e5f4`) | Impacto Visual |
|---|---|---|---|
| **1. Margens Internas do Card e Banner SPOOL** | Card tem respiro/padding interno branco de **12px** em toda a volta. O banner cinza superior `SPOOL` **NÃO encosta nas laterais do card**; ele fica contido dentro da área branca com respiro nas laterais e acima. | Banner cinza está colado de ponta a ponta nas laterais do card (`width: 100%` sangrado), parecendo uma tampa acoplada. | Perda da moldura branca industrial do card. |
| **2. Quadro COMPONENTES** | Altura compacta (~90px a 100px total). **NÃO existem divisórias verticais** no subcabeçalho entre `ITENS`, `DESCRIÇÃO` e `QTD.`. Existe um respiro branco de **50px a 70px** livre até os botões. | Quadro esticado até encostar nos botões, com bordas verticais pesadas separando as colunas no subcabeçalho. | Sensação de tabela pesada e tela entulhada sem respiro. |
| **3. Rodapé e 3 Botões** | Botões não encostam no fundo do card (margem branca de ~12px a 14px abaixo). Botões desabilitados (Limpar e Gravar) têm fundo cinza suave `#e5e7eb` **SEM borda escura** (`border: none`). Cores suaves em tom pastel (`#fca5a5` e `#86efac`). Sem linha `border-top` no rodapé. | Borda cinza escura (`#cbd5e1`) nos botões desabilitados, linha divisória `border-top` desnecessária, botões colados no fundo. | Botões aparentam caixas duras e recortadas com excesso de contorno. |
| **4. Floating Pill "Cadastro"** | Sombra suave projetada (`box-shadow`), posicionamento milimétrico a cavaleiro 50/50 mascarando a linha azul inferior do header. | Implementação sem a sombra difusa correta ou com invasão visual desbalanceada. | Pill não "flutua" com destaque sobre o cabeçalho e card. |

---

## 2. Especificação Detalhada dos 4 Pontos Críticos

---

### PONTO 1: Container e Margens Internas do Card Principal

#### Análise Forense
- Na tela de referência, o `.card-cadastro` funciona como uma prancheta de fundo branco (`#ffffff`) contornada por uma borda técnica cinza-azulada (`1px solid #7188a4`).
- **O banner cinza `SPOOL` é um elemento interno**: ele possui largura contida, respeitando o padding lateral do card. Ele **NÃO** sangra até as bordas laterais do card.
- Nas laterais esquerda e direita do banner `SPOOL`, há uma faixa contínua de fundo branco de **12px**.
- Acima do banner `SPOOL`, entre a metade inferior da pill e o topo do banner, há respiro branco livre de **14px**.

#### Regras Geométricas
```text
+-------------------------------------------------------------+
| Card Borda Superior (border: 1px solid #7188a4)             |
|                                                             |
|           [ Metade Inferior da Pill "Cadastro" ]            |
|                                                             |
| <----------------- Respiro Branco (14px) -----------------> |
|                                                             |
|   +-----------------------------------------------------+   |
| 12px| [Banner Cinza SPOOL - background: #e5e7eb]        |12px
|   | | (i) Realiza o cadastro de Spool e componentes..   |   |
|   +-----------------------------------------------------+   |
|   | Linha Divisória Luminosa Azul (height: 2.5px)       |   |
+---+-----------------------------------------------------+---+
```

#### Regras CSS do Card e Banner

```css
/* Container Externo */
.view-cadastro-container,
.view-page-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* Card Principal: Mantém padding interno uniforme de 12px nas laterais e 14px na base */
.card-cadastro,
.card-page-base {
  width: calc(100% - 24px) !important;
  max-width: 360px !important;
  margin: 0 auto 24px auto !important;
  box-sizing: border-box !important;
  background: #ffffff !important;
  border: 1px solid #7188a4 !important;
  border-radius: 0px !important;
  /* Padding: 38px no topo (para acomodar a invasão da pill + 14px de respiro), 
     12px nas laterais e 14px na base */
  padding: 38px 12px 14px 12px !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: visible !important;
}

/* Banner Superior SPOOL: Fica DENTRO do padding do card, NÃO sangra */
.cadastro-info-banner,
.page-info-banner {
  width: 100% !important;
  background: #e5e7eb !important;
  border-radius: 0px !important;
  margin: 0 0 0 0 !important;
  padding: 8px 10px 8px 10px !important;
  box-sizing: border-box !important;
  text-align: center;
}

.cadastro-info-banner-title,
.page-info-banner-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.cadastro-info-banner-desc,
.page-info-banner-desc {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11.5px;
  color: #111827;
  line-height: 1.35;
  font-weight: 500;
}

.cadastro-info-banner-desc .info-icon,
.page-info-banner-desc .info-icon {
  flex-shrink: 0;
  display: inline-flex;
  color: #111827;
}

/* Linha luminosa imediatamente abaixo do banner */
.cadastro-accent-line,
.page-accent-line {
  width: 100% !important;
  height: 2.5px !important;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%) !important;
  margin: 0 0 14px 0 !important;
}
```

---

### PONTO 2: Quadro COMPONENTES e Subcabeçalho Limpo

#### Análise Forense
- Na referência (`b478cb`), o quadro `COMPONENTES` é extremamente compacto quando vazio. Ele **NÃO estica** verticalmente para preencher a tela até o rodapé.
- **Altura Total do Quadro Vazio:** ~90px a 100px.
  - Barra de título cinza "COMPONENTES": `28px`
  - Subcabeçalho de colunas (`ITENS`, `DESCRIÇÃO`, `QTD.`): `24px`
  - Área vazia interna: `~45px` a `48px`
- **Subcabeçalho SEM Divisórias Verticais:** As células `<th>` das colunas NÃO têm bordas verticais entre si. O texto flui limpo sobre o fundo `#f8fafc`:
  - `ITENS`: centralizado / alinhado à esquerda
  - `DESCRIÇÃO`: centralizado
  - `QTD.`: centralizado / alinhado à direita
  - Apenas a linha horizontal divisória inferior existe (`border-bottom: 1.5px solid #7188a4`).
- **Respiro Branco Livre Inferior:** Entre a borda inferior do quadro `COMPONENTES` e o topo da linha de 3 botões existe uma área branca livre e desobstruída de **50px a 70px** (nominalmente `60px`).

#### Regras Geométricas
```text
+-----------------------------------------------------+
| COMPONENTES                      (fundo #e5e7eb)    | <- 28px
|-----------------------------------------------------|
|   ITENS          DESCRIÇÃO                QTD.      | <- 24px (SEM divisórias verticais!)
|-----------------------------------------------------|
|                                                     |
|            (área vazia compacta ~46px)              | <- Corpo compacto (~46px)
|                                                     |
+-----------------------------------------------------+
|                                                     |
|                                                     |
| <------------- RESPIRO BRANCO LIVRE --------------> | <- 50px a 70px de fundo branco!
|                 (margin-bottom: 60px)               |
|                                                     |
+-----------------------------------------------------+
| [Ler QRCode]        [Limpar]           [Gravar]     | <- Botões do Rodapé
+-----------------------------------------------------+
```

#### Regras CSS do Quadro COMPONENTES

```css
/* Seção de Metadados SPOOL */
.spool-data-section {
  width: 100% !important;
  margin: 0 0 12px 0 !important;
  box-sizing: border-box;
}

.spool-section-title {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
  text-transform: uppercase;
}

.spool-meta-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 1.5px 0;
  font-size: 13px;
}

.spool-meta-label {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  white-space: pre;
}

.spool-meta-value {
  color: #1e293b;
  font-weight: 500;
  font-size: 13px;
  min-height: 18px;
}

/* Quadro COMPONENTES */
.cadastro-table-box {
  width: 100% !important;
  border: 1.5px solid #7188a4 !important;
  margin: 0 0 60px 0 !important; /* Respiro branco de 60px até os 3 botões! */
  background: #ffffff !important;
  box-sizing: border-box !important;
  overflow: hidden;
}

/* Barra de Título COMPONENTES */
.cadastro-table-header-title {
  background: #e5e7eb !important;
  font-weight: 700;
  color: #111827;
  text-align: center;
  padding: 5px 8px;
  height: 28px;
  line-height: 18px;
  border-bottom: 1.5px solid #7188a4 !important;
  font-size: 13px;
  text-transform: uppercase;
  box-sizing: border-box;
}

.cadastro-table-wrapper {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
}

.table-components-cadastro {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 12px;
  box-sizing: border-box;
}

.table-components-cadastro thead {
  background: #f8fafc;
}

/* Subcabeçalho de Colunas: SEM divisórias verticais! */
.table-components-cadastro th {
  padding: 4px 6px;
  font-size: 11px;
  font-weight: 700;
  color: #334155;
  border-bottom: 1.5px solid #7188a4 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important; /* CRÍTICO: Sem bordas verticais entre colunas! */
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  height: 24px;
}

.table-components-cadastro th.th-item {
  width: 25%;
  text-align: center;
  border-right: none !important;
}

.table-components-cadastro th.th-desc {
  width: 50%;
  text-align: center;
  border-right: none !important;
}

.table-components-cadastro th.th-qtd {
  width: 25%;
  text-align: center;
  border-right: none !important;
}

/* Corpo quando preenchido com dados */
.table-components-cadastro td.col-item {
  width: 25%;
  text-align: center;
  border-right: 1.5px solid #7188a4;
  font-weight: 700;
  padding: 6px 4px;
}

.table-components-cadastro td.col-desc {
  width: 50%;
  border-right: 1.5px solid #7188a4;
  padding: 6px 8px;
  font-size: 12px;
}

.table-components-cadastro td.col-qtd {
  width: 25%;
  text-align: right;
  padding: 6px 8px;
  font-weight: 600;
  font-size: 12px;
}

.table-components-cadastro tbody tr {
  border-bottom: 1px solid #cbd5e1;
}

.table-components-cadastro tbody tr:last-child {
  border-bottom: none;
}

/* Corpo quando VAZIO: Altura compacta ~46px (NÃO estica até o rodapé!) */
.cadastro-table-empty-body {
  height: 46px !important;
  min-height: 46px !important;
  max-height: 46px !important;
  background: #ffffff !important;
}
```

---

### PONTO 3: Rodapé e os 3 Botões de Ação

#### Análise Forense
- Na referência (`b478cb`):
  1. Os botões ficam dentro do card e **NÃO encostam no fundo**: o padding inferior do próprio card (`14px`) cria a margem branca limpa abaixo dos botões.
  2. **NÃO existe borda superior separando o rodapé**: remover qualquer `border-top: 1px solid ...` do container de botões.
  3. Botões 2 (Limpar) e 3 (Gravar) desabilitados:
     - Fundo cinza suave plano e homogêneo: `#e5e7eb`.
     - **SEM borda escura**: `border: none;`. Eles são blocos cinzas planos sem contornos pesados.
     - Ícones e textos: tons suaves e esmaecidos em pastel:
       - **Limpar (desabilitado):** Ícone Lucide `trash-2` e texto em tom rosa/salmão pastel `#fca5a5` (ou `#f87171` esmaecido).
       - **Gravar (desabilitado):** Ícone Lucide `save` e texto em tom verde-menta pastel `#86efac`.
  4. Botão 1 (Ler QRCode):
     - Fundo azul industrial `#1d4ed8` (ou `#1956ce`), texto e ícone brancos `#ffffff`, sem borda.

#### Regras CSS do Rodapé e Botões

```css
/* Container dos 3 Botões: Sem border-top, sem margin excessiva */
.card-footer-actions-cadastro,
.card-footer-actions-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 8px !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  border-top: none !important; /* CRÍTICO: Sem linha divisória superior */
  box-sizing: border-box !important;
}

/* Estilo Base dos 3 Botões */
.btn-cadastro-col {
  height: 44px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  border-radius: 0px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 5px !important;
  border: none !important; /* CRÍTICO: Sem bordas duras */
  box-sizing: border-box !important;
  outline: none;
}

/* Botão 1: Ler QRCode (Ativo Permanente) */
#btn-cadastro-qrcode {
  background: #1d4ed8 !important;
  color: #ffffff !important;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border: none !important;
}

#btn-cadastro-qrcode:hover {
  background: #1e40af !important;
}

#btn-cadastro-qrcode svg {
  stroke: #ffffff !important;
  width: 16px;
  height: 16px;
}

/* Botão 2: Limpar (Desabilitado - Estado Inicial) */
#btn-cadastro-limpar:disabled {
  background: #e5e7eb !important;
  border: none !important; /* CRÍTICO: Fundo plano, SEM borda escura! */
  color: #fca5a5 !important; /* Rosa pastel esmaecido */
  cursor: not-allowed;
  pointer-events: none;
  opacity: 1 !important;
}

#btn-cadastro-limpar:disabled svg {
  stroke: #fca5a5 !important;
  width: 16px;
  height: 16px;
}

/* Botão 2: Limpar (Habilitado quando preenchido) */
#btn-cadastro-limpar:not(:disabled) {
  background: #fee2e2 !important;
  color: #dc2626 !important;
  border: none !important;
  cursor: pointer;
}

#btn-cadastro-limpar:not(:disabled) svg {
  stroke: #dc2626 !important;
  width: 16px;
  height: 16px;
}

/* Botão 3: Gravar (Desabilitado - Estado Inicial) */
#btn-cadastro-gravar:disabled {
  background: #e5e7eb !important;
  border: none !important; /* CRÍTICO: Fundo plano, SEM borda escura! */
  color: #86efac !important; /* Verde-menta pastel esmaecido */
  cursor: not-allowed;
  pointer-events: none;
  opacity: 1 !important;
}

#btn-cadastro-gravar:disabled svg {
  stroke: #86efac !important;
  width: 16px;
  height: 16px;
}

/* Botão 3: Gravar (Habilitado quando preenchido) */
#btn-cadastro-gravar:not(:disabled) {
  background: #dcfce7 !important;
  color: #16a34a !important;
  border: none !important;
  cursor: pointer;
}

#btn-cadastro-gravar:not(:disabled) svg {
  stroke: #16a34a !important;
  width: 16px;
  height: 16px;
}
```

---

### PONTO 4: Floating Pill "Cadastro" (Acabamento e Sombra)

#### Análise Forense
- Na referência (`b478cb`):
  - A pill flutua exatamente no meio da linha azul inferior do header (`border-bottom: 2px solid #8ea8cc`).
  - Ela possui fundo branco 100% opaco (`#ffffff`) que corta e esconde com perfeição a linha azul atrás dela.
  - Possui cantos arredondados de `8px`.
  - Apresenta uma **sombra suave projetada** para baixo e para os lados (`box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);`), conferindo a tridimensionalidade limpa característica da referência.
  - A tipografia de "Cadastro" é em preto sólido (`#000000`), negrito `700`, `16px`.

#### Regras CSS da Pill Central Flutuante

```css
/* Posicionamento a Cavaleiro 50/50 sobre a linha do Header */
.header-center-pill {
  position: absolute !important;
  top: 145px !important; /* Eixo exato da linha inferior do header (Y=0 relativo ao card) */
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 300 !important; /* Sobrepõe header e card */
  pointer-events: none;
}

.header-center-pill .floating-pill {
  width: 220px !important;
  max-width: calc(100vw - 32px) !important;
  height: 48px !important;
  min-height: 48px !important;
  background-color: #ffffff !important;
  border: 1px solid #d0d7de !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12) !important; /* Sombra suave de elevação */
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #000000 !important;
  padding: 0 16px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  pointer-events: auto;
  letter-spacing: 0.2px;
  text-align: center;
  box-sizing: border-box !important;
  line-height: 1;
}

.header-center-pill .floating-pill span,
.header-center-pill #header-pill-label {
  display: inline-block;
  color: #000000 !important;
  font-weight: 700 !important;
  font-size: 16px !important;
}
```

---

## 3. Guia de Implementação Direta para o Frontend

Para que o desenvolvedor frontend aplique as correções imediatamente em `src/web/styles/views.css`, substitua o bloco correspondente da Tela de Cadastro pelo seguinte conjunto consolidado:

```css
/* ==========================================================================
   Tela de Cadastro Mobile - Correção de Fidelidade Estrita (b478cb)
   ========================================================================== */

/* 1. Card e Margens Internas */
.view-cadastro-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.card-cadastro {
  width: calc(100% - 24px) !important;
  max-width: 360px !important;
  margin: 0 auto 24px auto !important;
  box-sizing: border-box !important;
  background: #ffffff !important;
  border: 1px solid #7188a4 !important;
  border-radius: 0px !important;
  padding: 38px 12px 14px 12px !important; /* Respiro uniforme de 12px nas laterais */
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08) !important;
  position: relative !important;
  overflow: visible !important;
}

/* 2. Banner SPOOL Contido (Não sangra) */
.card-cadastro .cadastro-info-banner {
  width: 100% !important;
  background: #e5e7eb !important;
  border-radius: 0px !important;
  margin: 0 !important;
  padding: 8px 10px !important;
  box-sizing: border-box !important;
  text-align: center;
}

.card-cadastro .cadastro-info-banner-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.card-cadastro .cadastro-info-banner-desc {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11.5px;
  color: #111827;
  line-height: 1.35;
  font-weight: 500;
}

.card-cadastro .cadastro-accent-line {
  width: 100% !important;
  height: 2.5px !important;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%) !important;
  margin: 0 0 14px 0 !important;
}

/* 3. Seção Spool */
.card-cadastro .spool-data-section {
  width: 100% !important;
  margin: 0 0 12px 0 !important;
  box-sizing: border-box;
}

.card-cadastro .spool-section-title {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
  text-transform: uppercase;
}

.card-cadastro .spool-meta-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 1.5px 0;
  font-size: 13px;
}

.card-cadastro .spool-meta-label {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  white-space: pre;
}

.card-cadastro .spool-meta-value {
  color: #1e293b;
  font-weight: 500;
  font-size: 13px;
  min-height: 18px;
}

/* 4. Quadro COMPONENTES Compacto e Sem Divisórias Verticais no Header */
.card-cadastro .cadastro-table-box {
  width: 100% !important;
  border: 1.5px solid #7188a4 !important;
  margin: 0 0 60px 0 !important; /* Respiro livre de 60px até os 3 botões */
  background: #ffffff !important;
  box-sizing: border-box !important;
  overflow: hidden;
}

.card-cadastro .cadastro-table-header-title {
  background: #e5e7eb !important;
  font-weight: 700;
  color: #111827;
  text-align: center;
  padding: 5px 8px;
  height: 28px;
  line-height: 18px;
  border-bottom: 1.5px solid #7188a4 !important;
  font-size: 13px;
  text-transform: uppercase;
  box-sizing: border-box;
}

.card-cadastro .table-components-cadastro th {
  padding: 4px 6px;
  font-size: 11px;
  font-weight: 700;
  color: #334155;
  border-bottom: 1.5px solid #7188a4 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important; /* CRÍTICO: SEM divisórias verticais entre ITENS, DESCRIÇÃO e QTD. */
  box-sizing: border-box;
  text-align: center;
  text-transform: uppercase;
  height: 24px;
}

.card-cadastro .cadastro-table-empty-body {
  height: 46px !important;
  min-height: 46px !important;
  max-height: 46px !important;
  background: #ffffff !important;
}

/* 5. Rodapé e os 3 Botões de Ação */
.card-cadastro .card-footer-actions-cadastro {
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 8px !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  border-top: none !important; /* Sem divisória separando o rodapé */
  box-sizing: border-box !important;
}

.card-cadastro .btn-cadastro-col {
  height: 44px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  border-radius: 0px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 5px !important;
  border: none !important;
  box-sizing: border-box !important;
}

.card-cadastro #btn-cadastro-qrcode {
  background: #1d4ed8 !important;
  color: #ffffff !important;
  cursor: pointer;
}

.card-cadastro #btn-cadastro-limpar:disabled {
  background: #e5e7eb !important;
  border: none !important;
  color: #fca5a5 !important;
  cursor: not-allowed;
}

.card-cadastro #btn-cadastro-limpar:disabled svg {
  stroke: #fca5a5 !important;
}

.card-cadastro #btn-cadastro-gravar:disabled {
  background: #e5e7eb !important;
  border: none !important;
  color: #86efac !important;
  cursor: not-allowed;
}

.card-cadastro #btn-cadastro-gravar:disabled svg {
  stroke: #86efac !important;
}
```

---

## 4. Checklist Visual de Validação para Aceite

- [ ] **Banner SPOOL Contido:** As bordas do banner cinza não tocam na borda cinza-azulada do card; há 12px de moldura branca contínua nas laterais.
- [ ] **Subcabeçalho da Tabela sem Divisórias:** As colunas `ITENS`, `DESCRIÇÃO` e `QTD.` não possuem linhas verticais entre si.
- [ ] **Altura Compacta do Quadro:** O quadro `COMPONENTES` vazio tem altura total em torno de 98px e não se estende para baixo.
- [ ] **Espaço em Branco Pré-Rodapé:** Existe um vão limpo de 60px de fundo branco puro entre o quadro e a fileira de botões.
- [ ] **Botões Desabilitados Sem Borda:** Os botões Limpar e Gravar desabilitados têm fundo cinza suave e plano (`#e5e7eb`), sem contorno escuro.
- [ ] **Ícones e Textos Pastel:** O ícone e texto de Limpar estão em `#fca5a5` (rosa suave) e Gravar em `#86efac` (verde-menta suave).
- [ ] **Rodapé Flutuante Dentro do Card:** Os botões respeitam 14px de respiro branco abaixo deles, sem tocar na borda inferior do card e sem `border-top`.
- [ ] **Pill a Cavaleiro:** A pill flutua centralizada com sombra suave, 50% no header e 50% sobre o topo do card.
