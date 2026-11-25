# Especificação Técnica de Geometria e Fidelidade Visual: Tela de Cadastro Mobile

> **Documento de Referência:** Análise de alta fidelidade baseada na captura de tela `copilot-image-1468d9.png` (Tela de Cadastro Mobile - Estado Inicial).  
> **Destinatário:** Time de desenvolvimento frontend (`spool-management-by-project-frontend`).  
> **Objetivo:** Estabelecer com precisão matemática e visual as regras de posicionamento geométrico, sobreposição de camadas (*z-index*), respiros internos e estilização dos componentes.

---

## 1. Diagrama de Geometria e Camadas (Header, Pill e Card)

```text
+-------------------------------------------------------------------------+
| HEADER MOBILE                                                           |
| [Logo Alvenius]   RASTREIO DE PRODUTOS   v2.1.0                [= Menu] |
|                                                                         |
|============================[ LINHA #8ea8cc ]============================| <- Linha inferior do header (Y = 0)
|                 +-------------------------------------+                 |
|                 |                                     |                 | <- Metade superior da Pill (24px)
|.................|              CADASTRO               |.................| <- Eixo central da Pill / Linha do header
|                 |                                     |                 | <- Metade inferior da Pill (24px)
|   +-------------+-------------------------------------+-------------+   | <- Borda superior do Card (.card-cadastro)
|   |             | (Pill sobreposta com z-index: 300)  |             |   |
|   |             +-------------------------------------+             |   |
|   |                                                                 |   |
|   | <--------------- Respiro Branco Livre (14px) -----------------> |   | <- Espaço branco entre a Pill e o Banner
|   |                                                                 |   |
|   | +-------------------------------------------------------------+ |   |
|   | | SPOOL                                                       | |   | <- Início do Banner Cinza (#e5e7eb)
|   | | (i) Realiza o cadastro de Spool e componentes para iniciar..| |   |
|   | +-------------------------------------------------------------+ |   |
|   | ================== DIVISÓRIA LUMINOSA AZUL ==================== |   |
```

---

## 2. Especificação Detalhada por Seção

### 2.1 Header e Floating Pill "Cadastro"

#### Altura e Linha Divisória do Header
- **Altura Total do Cabeçalho Mobile:** `54px` (área de conteúdo com padding interno de `10px 16px`).
- **Linha Divisória Inferior:** `border-bottom: 2px solid #8ea8cc;` ocupando 100% da largura da viewport.
- **Posicionamento do Header:** `position: relative; width: 100%; background: #ffffff; z-index: 100;`.

#### Floating Pill "Cadastro"
- **Dimensões e Geometria:**
  - `width: 220px;`
  - `height: 48px;`
  - `border-radius: 8px;`
  - `background: #ffffff;` (fundo branco 100% sólido e opaco para mascarar por completo a linha do cabeçalho atrás dela).
  - `box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);`
  - `border: 1px solid #e2e8f0;` (ou sem borda, sustentado pela sombra suave).
- **Posicionamento "A Cavaleiro" (Overlap 50/50):**
  - Fica perfeitamente centralizada na horizontal (`left: 50%; transform: translateX(-50%);`).
  - Fica sobreposta à linha divisória inferior do header: exatamente metade da pill (`24px`) fica para dentro do header e a outra metade (`24px`) avança sobre a área de conteúdo/card principal.
  - Implementação recomendada:
    - Se filha do container do header: `position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%); z-index: 300;`
    - Se no container da página: `position: relative; margin-top: -24px; margin-left: auto; margin-right: auto; z-index: 300;`
- **Camada de Sobreposição (*z-index*):**
  - `z-index: 300;` (garante que a pill fique acima da borda do header e acima da borda superior do card).
- **Tipografia e Alinhamento do Texto "Cadastro":**
  - `display: flex; align-items: center; justify-content: center; height: 100%;`
  - `font-size: 16px;`
  - `font-weight: 700;` (negrito acentuado).
  - `color: #000000;`
  - `letter-spacing: 0.3px;`

---

### 2.2 Card Principal e Cálculo de Espaço para a Pill

#### Geometria do Card Principal (`.card-cadastro`)
- **Largura:** `calc(100% - 24px);`
- **Largura Máxima:** `max-width: 360px;`
- **Alinhamento:** `margin: 0 auto;` (centralizado horizontalmente na tela mobile).
- **Borda Externa:** `border: 1px solid #7188a4;` (linha cinza-azulada técnica).
- **Cantos:** `border-radius: 0px;` (cantos retos industriais).
- **Fundo:** `background-color: #ffffff;`

#### Relação Geométrica: Topo do Card vs. Pill
- O topo da borda superior do card fica posicionado na linha de encontro do header ou ligeiramente sob a metade inferior da pill.
- Como a pill tem altura de `48px` e metade dela (`24px`) avança abaixo da linha divisória do header:
  - A pill sobrepõe o centro da borda superior do card.
  - A metade inferior da pill invade `24px` para dentro da área superior do card.

#### Espaçamento Superior Interno (Respiro para o Banner SPOOL)
- **Regra de Respiro Branco:** Entre a borda inferior da pill e o topo do banner cinza `SPOOL`, deve haver rigorosamente **14px** de respiro livre com fundo branco do card.
- **Cálculo da Distância:**
  $$\text{Padding Superior do Card} = \text{Invasão da Pill (24px)} + \text{Respiro Livre (14px)} = 38\text{px}$$
- **CSS Aplicado:**
  - No container do card: `padding-top: 38px;` (ou no banner SPOOL: `margin-top: 38px;`).
  - Dessa forma, o banner cinza fica completamente desimpedido, sem qualquer colisão visual com a pill.

---

### 2.3 Banner SPOOL, Caixa Informativa e Divisória Luminosa

#### Estrutura do Banner Cinza (`.banner-spool`)
- **Fundo:** `#e5e7eb` (cinza neutro claro uniforme).
- **Cantos:** `border-radius: 0px;` (cantos perfeitamente retos).
- **Largura:** 100% da largura interna do card (`margin-left: -12px; margin-right: -12px; width: calc(100% + 24px);` ou sem padding horizontal no card-header).
- **Padding Interno:** `8px 12px 10px 12px;`.
- **Título SPOOL:**
  - `font-size: 14px;`
  - `font-weight: 700;`
  - `color: #111827;`
  - `text-align: center;`
  - `margin-bottom: 6px;`
- **Linha Informativa de Produção:**
  - `display: flex; align-items: center; justify-content: center; gap: 6px;`
  - **Ícone `info`:** Ícone de informação (Lucide `info` ou SVG), cor `#111827`, tamanho `14px`.
  - **Texto:** *"Realiza o cadastro de Spool e componentes para iniciar processo de produção."*
  - `font-size: 11.5px; line-height: 1.35; color: #111827; font-weight: 500; text-align: center;`

#### Divisória Luminosa Azul
- **Posição:** Imediatamente colada na base inferior do banner cinza SPOOL.
- **Altura:** `3px;`
- **Fundo Gradiente Luminoso:**
  ```css
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.35);
  ```

---

### 2.4 Campos de Entrada (Código e Descrição)

- **Container dos Campos:** Margem superior de `12px` e inferior de `12px`.
- **Rótulos (`label`):**
  - Rótulo `"Código  :"` e rótulo `"Descrição:"`: `font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 4px; display: block;`
- **Campos de Entrada (`input`):**
  - `height: 36px;`
  - `background-color: #ffffff;`
  - `border: 1px solid #7188a4;` (ou `#cbd5e1`).
  - `border-radius: 0px;`
  - `font-size: 13px; color: #0f172a; padding: 0 8px;`
  - **Estado Inicial Vazio:** `value = ""` com placeholder neutro.

---

### 2.5 Quadro COMPONENTES (Tabela com Estado Inicial Vazio)

#### Borda e Cabeçalhos
- **Contorno do Quadro:** `border: 1.5px solid #7188a4; border-radius: 0px; overflow: hidden; margin-bottom: 14px;`
- **Cabeçalho de Seção ("COMPONENTES"):**
  - `background-color: #e5e7eb;`
  - `color: #111827;`
  - `font-size: 13px; font-weight: 700; text-align: center;`
  - `padding: 6px 0;`
  - `border-bottom: 1.5px solid #7188a4;`
- **Linha de Colunas (Subcabeçalho da Tabela):**
  - `background-color: #f8fafc;`
  - `border-bottom: 1.5px solid #7188a4;`
  - **Coluna ITENS:** `width: 75px; text-align: center; font-size: 11px; font-weight: 700; color: #334155; border-right: 1.5px solid #7188a4; padding: 6px 4px;`
  - **Coluna DESCRIÇÃO:** `text-align: left; font-size: 11px; font-weight: 700; color: #334155; border-right: 1.5px solid #7188a4; padding: 6px 8px;`
  - **Coluna QTD.:** `width: 80px; text-align: right; font-size: 11px; font-weight: 700; color: #334155; padding: 6px 6px;`

#### Corpo Vazio da Tabela
- **Altura Mínima no Estado Inicial:** `min-height: 120px;` (área branca limpa aguardando leitura do QR Code).
- **Fundo:** `#ffffff;`

---

### 2.6 Rodapé de Ações: Grade dos 3 Botões

- **Layout do Container:**
  ```css
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  height: 44px;
  margin-top: 10px;
  ```

#### Botão 1: "Ler QRCode" (Ativo)
- **Estado:** Habilitado / Interativo (`cursor: pointer`).
- **Fundo:** `#1d4ed8` (azul corporativo Alvenius).
- **Cor do Texto e Ícone:** `#ffffff` (branco puro).
- **Tipografia:** `font-size: 12px; font-weight: 700;`
- **Cantos:** `border-radius: 0px; border: none;`
- **Ícone:** Lucide `qr-code` com tamanho de `16px`.
- **Efeito Hover:** `background-color: #1e40af;`

#### Botão 2: "Limpar" (Desabilitado no Estado Inicial)
- **Estado:** Desabilitado (`disabled`, `cursor: not-allowed; pointer-events: none;`).
- **Fundo:** `#e5e7eb` (cinza neutro claro).
- **Borda:** `1px solid #cbd5e1;`
- **Cor do Texto e Ícone:** `#f87171` (vermelho/rosa claro esmaecido de ação destrutiva desativada).
- **Tipografia:** `font-size: 12px; font-weight: 700;`
- **Ícone:** Lucide `trash-2` com tamanho de `16px`, cor `#f87171`.

#### Botão 3: "Gravar" (Desabilitado no Estado Inicial)
- **Estado:** Desabilitado (`disabled`, `cursor: not-allowed; pointer-events: none;`).
- **Fundo:** `#e5e7eb` (cinza neutro claro).
- **Borda:** `1px solid #cbd5e1;`
- **Cor do Texto e Ícone:** `#86efac` (verde claro esmaecido de confirmação desativada).
- **Tipografia:** `font-size: 12px; font-weight: 700;`
- **Ícone:** Lucide `save` com tamanho de `16px`, cor `#86efac`.

---

## 3. Seletores e Folha de Estilos CSS Recomendada

```css
/* ==========================================================================
   CSS CANÔNICO PARA A TELA DE CADASTRO MOBILE (ALVENIUS - FIDELIDADE MÁXIMA)
   ========================================================================== */

/* 1. Header Mobile */
.app-header {
  position: relative;
  width: 100%;
  height: 54px;
  background-color: #ffffff;
  border-bottom: 2px solid #8ea8cc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 100;
}

/* 2. Floating Pill "Cadastro" A Cavaleiro */
.pill-cadastro-floating {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 48px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pill-cadastro-text {
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 0.3px;
  user-select: none;
}

/* 3. Container da Página e Card Principal */
.cadastro-page-container {
  width: 100%;
  padding: 0 12px 32px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-cadastro {
  width: calc(100% - 24px);
  max-width: 360px;
  margin: 0 auto;
  background-color: #ffffff;
  border: 1px solid #7188a4;
  border-radius: 0px;
  box-sizing: border-box;
  /* 24px (sobreposição da metade inferior da pill) + 14px (respiro branco livre) = 38px */
  padding-top: 38px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 14px;
  position: relative;
  z-index: 50;
}

/* 4. Banner Cinza SPOOL e Divisória Luminosa */
.banner-spool {
  background-color: #e5e7eb;
  border-radius: 0px;
  margin-left: -12px;
  margin-right: -12px;
  padding: 8px 12px 10px 12px;
  box-sizing: border-box;
}

.banner-spool-title {
  margin: 0 0 6px 0;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-spool-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 500;
  color: #111827;
  line-height: 1.35;
  text-align: center;
}

.banner-spool-info svg,
.banner-spool-info .icon-info {
  width: 14px;
  height: 14px;
  color: #111827;
  flex-shrink: 0;
}

.banner-spool-divider {
  height: 3px;
  margin-left: -12px;
  margin-right: -12px;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.35);
}

/* 5. Formulário de Identificação do Spool */
.form-cadastro-spool {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.form-group-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-label-cadastro {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

.form-input-cadastro {
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #7188a4;
  border-radius: 0px;
  font-size: 13px;
  color: #0f172a;
  padding: 0 8px;
  box-sizing: border-box;
}

.form-input-cadastro:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 2px rgba(29, 78, 216, 0.15);
}

/* 6. Quadro COMPONENTES e Tabela */
.quadro-componentes {
  border: 1.5px solid #7188a4;
  border-radius: 0px;
  overflow: hidden;
  margin-bottom: 12px;
}

.quadro-header-strip {
  background-color: #e5e7eb;
  border-bottom: 1.5px solid #7188a4;
  padding: 6px 0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.5px;
}

.table-componentes {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

.table-componentes th {
  background-color: #f8fafc;
  border-bottom: 1.5px solid #7188a4;
  font-size: 11px;
  font-weight: 700;
  color: #334155;
  padding: 6px 4px;
  letter-spacing: 0.3px;
}

.table-componentes th.col-itens {
  width: 75px;
  text-align: center;
  border-right: 1.5px solid #7188a4;
}

.table-componentes th.col-desc {
  text-align: left;
  border-right: 1.5px solid #7188a4;
  padding-left: 8px;
}

.table-componentes th.col-qtd {
  width: 80px;
  text-align: right;
  padding-right: 6px;
}

.table-empty-body {
  min-height: 120px;
  height: 120px;
  background-color: #ffffff;
}

/* 7. Grid de Botões de Ação */
.grid-botoes-acoes {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  height: 44px;
}

.btn-acao {
  height: 44px;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  box-sizing: border-box;
}

/* Botão Ler QRCode (Ativo) */
.btn-acao-ler {
  background-color: #1d4ed8;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-acao-ler:hover {
  background-color: #1e40af;
}

/* Botão Limpar (Desabilitado) */
.btn-acao-limpar {
  background-color: #e5e7eb;
  color: #f87171;
  border: 1px solid #cbd5e1;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-acao-limpar svg,
.btn-acao-limpar .icon-trash {
  color: #f87171;
}

/* Botão Gravar (Desabilitado) */
.btn-acao-gravar {
  background-color: #e5e7eb;
  color: #86efac;
  border: 1px solid #cbd5e1;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-acao-gravar svg,
.btn-acao-gravar .icon-save {
  color: #86efac;
}
```

---

## 4. Estrutura de Marcação HTML Recomendada

```html
<!-- Cabeçalho com a Floating Pill "Cadastro" sobreposta à borda inferior -->
<header class="app-header">
  <div class="header-logo-container">
    <img src="assets/logo-alvenius-rings.png" alt="Alvenius" class="header-logo" />
    <span class="header-title">RASTREIO DE PRODUTOS</span>
    <span class="header-version">v2.1.0</span>
  </div>
  <button class="header-menu-btn" aria-label="Menu principal">
    <i data-lucide="menu"></i>
  </button>

  <!-- Pill Cadastro a Cavaleiro -->
  <div class="pill-cadastro-floating">
    <span class="pill-cadastro-text">Cadastro</span>
  </div>
</header>

<!-- Área de Conteúdo Mobile -->
<main class="cadastro-page-container">
  <section class="card-cadastro">
    
    <!-- Banner Cinza Superior SPOOL -->
    <div class="banner-spool">
      <h2 class="banner-spool-title">SPOOL</h2>
      <div class="banner-spool-info">
        <i data-lucide="info" class="icon-info"></i>
        <span>Realiza o cadastro de Spool e componentes para iniciar processo de produção.</span>
      </div>
    </div>
    <!-- Divisória Luminosa Azul -->
    <div class="banner-spool-divider"></div>

    <!-- Campos de Identificação -->
    <div class="form-cadastro-spool">
      <div class="form-group-item">
        <label for="input-codigo-spool" class="form-label-cadastro">Código  :</label>
        <input 
          type="text" 
          id="input-codigo-spool" 
          class="form-input-cadastro" 
          placeholder="Ex: SPL-2024-001" 
          value="" 
        />
      </div>

      <div class="form-group-item">
        <label for="input-descricao-spool" class="form-label-cadastro">Descrição:</label>
        <input 
          type="text" 
          id="input-descricao-spool" 
          class="form-input-cadastro" 
          placeholder="Descrição do Spool" 
          value="" 
        />
      </div>
    </div>

    <!-- Quadro COMPONENTES -->
    <div class="quadro-componentes">
      <div class="quadro-header-strip">COMPONENTES</div>
      <table class="table-componentes">
        <thead>
          <tr>
            <th class="col-itens">ITENS</th>
            <th class="col-desc">DESCRIÇÃO</th>
            <th class="col-qtd">QTD.</th>
          </tr>
        </thead>
        <tbody class="table-empty-body">
          <!-- Corpo Vazio: min-height 120px no estado inicial -->
        </tbody>
      </table>
    </div>

    <!-- Grade de Botões de Ação -->
    <div class="grid-botoes-acoes">
      <!-- Botão Ativo -->
      <button type="button" class="btn-acao btn-acao-ler" id="btn-ler-qrcode">
        <i data-lucide="qr-code"></i>
        <span>Ler QRCode</span>
      </button>

      <!-- Botões Desabilitados -->
      <button type="button" class="btn-acao btn-acao-limpar" id="btn-limpar" disabled>
        <i data-lucide="trash-2" class="icon-trash"></i>
        <span>Limpar</span>
      </button>

      <button type="button" class="btn-acao btn-acao-gravar" id="btn-gravar" disabled>
        <i data-lucide="save" class="icon-save"></i>
        <span>Gravar</span>
      </button>
    </div>

  </section>
</main>
```

---

## 5. Checklist de Validação para Aceite Visual

1. [x] **Pill "Cadastro":** Mede exatamente 220px × 48px com raio de 8px e fundo branco sólido opaco cobrindo a linha `#8ea8cc`.
2. [x] **Alinhamento a Cavaleiro:** Linha divisória inferior do header passa exatamente pelo meio (altura 24px) da pill.
3. [x] **Respiro de 14px:** O banner cinza "SPOOL" não colide nem toca na pill; há 14px visíveis de respiro branco entre a borda inferior da pill e o topo do banner.
4. [x] **Banner Cinza SPOOL:** Fundo `#e5e7eb`, cantos retos `0px`, título SPOOL centralizado em negrito e linha com ícone info centralizada.
5. [x] **Divisória Azul:** Faixa luminosa de 3px com gradiente azul `#1d4ed8` -> `#3b82f6` -> `#60a5fa`.
6. [x] **Tabela COMPONENTES:** Borda técnica `#7188a4`, subcabeçalho de colunas e corpo limpo com `min-height: 120px` no estado inicial.
7. [x] **Botões do Rodapé:** 3 botões em linha com proporções equilibradas (Ler QRCode azul ativo, Limpar em cinza/rosa claro desabilitado e Gravar em cinza/verde claro desabilitado).
