# Wireframes & Diagramas Estruturais: Fidelidade do Menu Drawer

Este documento apresenta a diagramação estrutural detalhada em ASCII para garantir fidelidade visual absoluta em relação às referências oficiais:
- `copilot-image-ca7085.png`: Menu Drawer expandido na tela ativa de **Cadastro** (com a Pill 100% visível e item "CADASTRO" esmaecido).
- `copilot-image-dc8611.png`: Menu Drawer expandido em telas internas gerais com rolagem.
- `copilot-image-988b75.png`: Menu Drawer expandido na **Home**.
- Resolução do problema registrado em `copilot-image-247960.png` (onde a pill aparecia cortada na metade horizontal).

---

## 1. Diagrama de Camadas e Hierarquia de Z-Index (Solução da Pill Cortada)

### 1.1 O Que Ocorria no Erro (`247960.png`)
```
Y = 0px   +--------------------------------------------------------+
          | Header Cinza (#c0c2c7)                                 |
          | [Logo + v2.0.0]                               [X Fechar]|
Y = 117px |             +----------------------------+             |
          |             | Metade Superior da Pill    |             |  <-- Visível sobre o Header
Y = 145px +=============+============================+=============+  <-- Borda inferior Header / Top do Drawer
          | XXXXXXXXXXXX| Metade Inferior CORTADA    |XXXXXXXXXXXXX|  <-- Coberta pelo fundo cinza do Drawer!
          |             +----------------------------+             |
          |                                                        |
          |   Drawer cinza com z-index inadequado cobrindo a pill  |
          |   ou stacking context isolado cortando a projeção      |
          +--------------------------------------------------------+
```

### 1.2 Como Deve Ser Conforme a Referência Oficial (`ca7085.png`)
```
Y = 0px   +--------------------------------------------------------+
          | Header Cinza (#c0c2c7)                                 |  z-index: 140 / 160
          | [Logo] RASTREIO DE PRODUTOS                    [X Red] |  Hamburger z-index: 250
Y = 117px |             +----------------------------+             |
          |             |                            |             |
Y = 145px +-------------|   PILL BRANCA 100% INTACTA |-------------+  <-- Linha de corte 145px
          |             |   border-radius: 8px       |             |      (Pill passa por cima sem corte!)
          |             |   box-shadow: 0 4px 14px...|             |
Y = 173px |             +----------------------------+             |  z-index: 200 (Frente do Drawer)
          |                                                        |
Y = 185px |   [padding-top compensatório de 40px no .drawer-content]|  z-index: 150 (Fundo translúcido)
          |   +--------------------------------------------------+ |
Y = 185px |   | (icon user)  Bem vindo, josuellopes              | |  Primeiro elemento inicia
          |   +--------------------------------------------------+ |  com folga visual de 12px
          |   ==================================================== |  abaixo da Pill!
          |                                                        |
```

---

## 2. Wireframe: Menu Drawer em Telas Internas (Modo Work / Cadastro)
> Referência: `copilot-image-ca7085.png` e `copilot-image-dc8611.png`

```
+==================================================================+
|  [Logo 3 anéis]  RASTREIO DE PRODUTOS                   [X Red]  |  Header: 145px, #c0c2c7
|      v2.0.0                                                      |  Border-bottom: 2px solid #8ea8cc
|                                                                  |
|                      +------------------------+                  |
|                      |        CADASTRO        |                  |  Pill flutuante a cavaleiro
+======================|  (Fundo Branco Puro)   |==================+  Top: 145px, z-index: 200
|                      |  border-radius: 8px    |                  |  Height: 56px, Width: 260px
|                      |  sombra suave visível  |                  |  100% INTEIRA E SEM CORTE!
|                      +------------------------+                  |
|                                                                  |  Drawer Panel:
|                                                                  |  background: rgba(225,230,238,0.94)
|                                                                  |  backdrop-filter: blur(5px)
|                                                                  |  top: 145px, z-index: 150
|    [user]  Bem vindo, josuellopes                                |  Drawer-content padding-top: 40px
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [home]          INÍCIO                                  [>]   |  Item 52px, ícone #111827, chevron #6b7280
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [pkg-plus]      CADASTRO (opacidade 0.45 esmaecido)     [>]   |  ITEM ATIVO: opacity: 0.45
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [paint-bucket]  CALDEIRARIA                             [>]   |  Item normal: opacity 1.0
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [layers]        REVESTIMENTO                            [>]   |  Item normal: opacity 1.0
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [brush]         PINTURA                                 [>]   |  Item normal: opacity 1.0
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [qr-code]       VALIDAR QRCODE                          [>]   |  Item normal: opacity 1.0
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [arrow-left-right] TRANSFERÊNCIA                        [>]   |  Item normal: opacity 1.0
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|    [globe]         IR PARA SITE ALVENIUS                   [>]   |  Item normal: opacity 1.0
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|   +----------------------------------------------------------+   |
|   |                   [log-out]   Sair                       |   |  Botão Sair:
|   +----------------------------------------------------------+   |  Height: 52px, border-radius: 0px
|                                                                  |  border: 2px solid #7188a4
|                                                                  |  Cor do ícone e texto: #dc2626
+==================================================================+
```

---

## 3. Wireframe: Menu Drawer na Tela Inicial (Modo Home)
> Referência: `copilot-image-988b75.png`

```
+==================================================================+
|  [Logo 3 anéis]                                         [X Red]  |  Header: 145px, #c0c2c7
|      v2.0.0                                                      |  Border-bottom: 2px solid #8ea8cc
|                                                                  |
|                      +------------------------+                  |
|                      |  Rastreio de produtos  |                  |  Pill flutuante da Home
+======================|  (Fundo Branco Puro)   |==================+  Top: 145px, z-index: 200
|                      |  border-radius: 8px    |                  |  100% INTEIRA E SEM CORTE!
|                      +------------------------+                  |
|                                                                  |  Drawer Panel da Home:
|                                                                  |  (SEM LISTA DE MÓDULOS)
|    [user]  Bem vindo, josuellopes                                |
|   ------------------------------------------------------------   |  Linha divisória: 2px solid #7188a4
|                                                                  |
|   ------------------------------------------------------------   |  Segunda linha divisória separadora
|                                                                  |
|   +----------------------------------------------------------+   |
|   |                   [log-out]   Sair                       |   |  Botão Sair:
|   +----------------------------------------------------------+   |  Height: 52px, border-radius: 0px
|                                                                  |  border: 2px solid #7188a4
|                                                                  |  Cor do ícone e texto: #dc2626
+==================================================================+
```

---

## 4. Detalhes de Alinhamento e Espaçamentos Críticos

1. **Margem Lateral Uniforme:**
   - Todos os elementos internos do drawer (`.drawer-user-row`, `.mobile-drawer-nav-item`, `.btn-drawer-logout`) respeitam `margin-left: 16px` e `margin-right: 16px`.
2. **Divisória Contínua:**
   - `border-bottom: 2px solid #7188a4`.
3. **Alinhamento do Item de Navegação:**
   - Lado Esquerdo: Ícone (22px Lucide) + Espaço (14px) + Texto em Caixa Alta (16px, bold `#111827`).
   - Lado Direito: Chevron Lucide `chevron-right` (22px, `#6b7280`).
4. **Item Ativo Esmaecido:**
   - Na tela ativa correspondente (ex: CADASTRO na tela de cadastro), aplicar `opacity: 0.45` e `pointer-events: none`.
5. **Botão Sair:**
   - Cantos estritamente retos (`border-radius: 0px`).
   - Borda azul-acinzentada industrial `2px solid #7188a4`.
   - Conteúdo centralizado (`display: flex; justify-content: center; align-items: center; gap: 10px`).
   - Cor vermelha `#dc2626`.
