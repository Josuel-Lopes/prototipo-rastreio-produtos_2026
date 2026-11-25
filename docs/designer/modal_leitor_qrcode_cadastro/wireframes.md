# Wireframes ASCII: Tela de Cadastro e Modal Leitor de QRCode

Este documento apresenta a diagramação em ASCII de alta fidelidade para os estados da tela de Cadastro e do Modal Leitor de QRCode da Alvenius Spool Management, conforme referências oficiais:
- `copilot-image-c65f64.png` (Tela de Cadastro no Estado Inicial Vazio)
- `copilot-image-157449.png` (Modal Leitor de QRCode Industrial)

---

## 1. Estado 1: Tela de Cadastro - Estado Inicial Vazio (`copilot-image-c65f64.png`)

Neste estado inicial:
- O campo `Código :` está completamente em branco / vazio.
- O campo `Descrição:` está completamente em branco / vazio.
- A tabela `COMPONENTES` exibe estritamente o cabeçalho (`ITENS`, `DESCRIÇÃO`, `QTD.`), com área de dados vazia (zero linhas).
- O botão **"Ler QRCode"** está em estado ativo (azul `#1d4ed8`).
- Os botões **"Limpar"** e **"Gravar"** estão desabilitados (cinza `#f1f5f9` / `#cbd5e1`, `cursor: not-allowed`).

```text
+----------------------------------------------------------------------------------------------------+
|  [Logo Alvenius]   v2.0.0                      RASTREIO DE PRODUTOS                         [= Menu]|
|====================================================================================================|
|                                         +------------------+                                       |
|                                         |     CADASTRO     |                                       |
|                                         +------------------+                                       |
|                                                                                                    |
|    +------------------------------------------------------------------------------------------+    |
|    | SPOOL                                                                                    |    |
|    +------------------------------------------------------------------------------------------+    |
|    |                                                                                          |    |
|    |  (i) Realiza o cadastro de Spool e componentes para iniciar processo de produção.        |    |
|    |  --------------------------------------------------------------------------------------  |    |
|    |                                                                                          |    |
|    |  +-------------------------------------+  +-------------------------------------------+  |    |
|    |  | Código :                            |  | Descrição:                                |  |    |
|    |  | [                                 ] |  | [                                       ] |  |    |
|    |  +-------------------------------------+  +-------------------------------------------+  |    |
|    |                                                                                          |    |
|    |  +------------------------------------------------------------------------------------+  |    |
|    |  | COMPONENTES                                                                        |  |    |
|    |  +------------------------------------------------------------------------------------+  |    |
|    |  |     ITENS     |                   DESCRIÇÃO                   |          QTD.      |  |    |
|    |  |---------------+-----------------------------------------------+--------------------|  |    |
|    |  |                                                                                    |  |    |
|    |  |           (Tabela vazia - nenhum componente associado no estado inicial)           |  |    |
|    |  |                                                                                    |  |    |
|    |  +---------------+-----------------------------------------------+--------------------+  |    |
|    |                                                                                          |    |
|    +------------------------------------------------------------------------------------------+    |
|    |  +-----------------------+   +-------------------+   +--------------------+              |    |
|    |  | [QR] Ler QRCode       |   | [X] Limpar        |   | [V] Gravar         |              |    |
|    |  | (Ativo - Azul #1d4ed8)|   | (Desabilitado)    |   | (Desabilitado)     |              |    |
|    |  +-----------------------+   +-------------------+   +--------------------+              |    |
|    +------------------------------------------------------------------------------------------+    |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Estado 2: Modal Leitor de QRCode (`copilot-image-157449.png`)

Neste estado:
- O modal sobrepõe o conteúdo com backdrop escuro translúcido com desfoque de fundo (`rgba(10, 20, 30, 0.75)` com blur).
- **Header:** Título centralizado `Leitor de QRCode` com barra horizontal separadora cinza-azulada `#8ea8cc`.
- **Visor Industrial:**
  * Caixa preta sólida com borda externa branca nítida de `4px`.
  * Quatro cantos de mira azuis fluorescentes (`#3b82f6`) com espessura de `4px`.
  * QR Code mockup branco/preto contrastado centralizado no visor.
  * Linha laser horizontal de varredura ativa.
- **Card 1 (Instruções):**
  * Título centralizado: `INSTRUÇÕES DE LEITURA`.
  * Passos 1 e 2 alinhados à esquerda.
  * Barra inferior estilizada com gradiente azul (`linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)`).
- **Card 2 (Último QRCode Lido):**
  * Título em caixa alta: `ÚLTIMO QRCODE LIDO:`.
  * Linha de dados inline em fonte monoespaçada, separada por `" | "`:
    `SPL-2024-001 | Tubo Condução Aço Carbono 4" Sch 40 | 3 componentes`
- **Botão Inferior Fechar:**
  * Botão de largura total vermelho sólido (`#dc2626`) com ícone circular de fechar `(X) Fechar`.

```text
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                  +----------------------------------------------------------+                      |
|                  |                     Leitor de QRCode                     |                      |
|                  |==========================================================|                      |
|                  |                                                          |                      |
|                  |                  +--------------------+                  |                      |
|                  |                  |#==================#|  <- Borda         |                      |
|                  |                  ||*                *||     Branca 4px   |                      |
|                  |                  ||   +----------+   ||                  |                      |
|                  |                  ||   | [█ ▄ █]  |   ||  <- Miras        |                      |
|                  |                  ||   | [▄ █ ▄]  |   ||     Azuis Fluores|                      |
|                  |                  ||   | [█ ▄ █]  |   ||     centes       |                      |
|                  |                  ||   +----------+   ||     #3b82f6      |                      |
|                  |                  ||*     QR MOCK    *||                  |                      |
|                  |                  |#==================#|                  |                      |
|                  |                  +--------------------+                  |                      |
|                  |                                                          |                      |
|                  |  +----------------------------------------------------+  |                      |
|                  |  |                INSTRUÇÕES DE LEITURA               |  |                      |
|                  |  |                                                    |  |                      |
|                  |  |  1. Aponte a câmera para o QRCode impresso no      |  |                      |
|                  |  |     Spool.                                         |  |                      |
|                  |  |  2. Centralize a imagem dentro das miras azuis.    |  |                      |
|                  |  |====================================================|  |  <- Barra Gradiente  |
|                  |  +----------------------------------------------------+  |     Azul Inferior    |
|                  |                                                          |                      |
|                  |  +----------------------------------------------------+  |                      |
|                  |  | ÚLTIMO QRCODE LIDO:                                |  |                      |
|                  |  | SPL-2024-001 | Tubo Condução Aço 4" | 3 componentes|  |  <- Dados Inline     |
|                  |  +----------------------------------------------------+  |     Separados por |  |
|                  |                                                          |                      |
|                  |  +----------------------------------------------------+  |                      |
|                  |  | [X] Fechar                       (Vermelho #dc2626)|  |  <- Botão Sólido     |
|                  |  +----------------------------------------------------+  |     com Ícone Fechar |
|                  +----------------------------------------------------------+                      |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Estado 3: Cadastro Preenchido Pós-Leitura (Pós-Scan)

Após a leitura do QR Code e fechamento do modal:
- O campo `Código :` é automaticamente preenchido com o código identificado (ex: `SPL-2024-001`).
- O campo `Descrição:` é populado com a descrição técnica cadastrada.
- A tabela `COMPONENTES` exibe as linhas de componentes vinculadas ao Spool.
- O botão **"Ler QRCode"** permanece disponível para nova leitura.
- Os botões **"Limpar"** e **"Gravar"** tornam-se habilitados e operacionais.

```text
+----------------------------------------------------------------------------------------------------+
|  [Logo Alvenius]   v2.0.0                      RASTREIO DE PRODUTOS                         [= Menu]|
|====================================================================================================|
|                                         +------------------+                                       |
|                                         |     CADASTRO     |                                       |
|                                         +------------------+                                       |
|                                                                                                    |
|    +------------------------------------------------------------------------------------------+    |
|    | SPOOL                                                                                    |    |
|    +------------------------------------------------------------------------------------------+    |
|    |                                                                                          |    |
|    |  (i) Realiza o cadastro de Spool e componentes para iniciar processo de produção.        |    |
|    |  --------------------------------------------------------------------------------------  |    |
|    |                                                                                          |    |
|    |  +-------------------------------------+  +-------------------------------------------+  |    |
|    |  | Código :                            |  | Descrição:                                |  |    |
|    |  | [ SPL-2024-001                    ] |  | [ Tubo Condução Aço Carbono 4" Sch 40   ] |  |    |
|    |  +-------------------------------------+  +-------------------------------------------+  |    |
|    |                                                                                          |    |
|    |  +------------------------------------------------------------------------------------+  |    |
|    |  | COMPONENTES                                                                        |  |    |
|    |  +------------------------------------------------------------------------------------+  |    |
|    |  |     ITENS     |                   DESCRIÇÃO                   |          QTD.      |  |    |
|    |  |---------------+-----------------------------------------------+--------------------|  |    |
|    |  |       01      | TUBO CONDUÇÃO AÇO CARBONO SCH40 4 POL         |             1015 MM|  |    |
|    |  |       02      | FLANGE SOBREPOSTO 4 POL 150 LBS ANSI B16.5    |                2 UN|  |    |
|    |  |       03      | SOLDA TOPO GTAW+SMAW CONEXÃO FLANGE           |            2 PASSES|  |    |
|    |  +---------------+-----------------------------------------------+--------------------+  |    |
|    |                                                                                          |    |
|    +------------------------------------------------------------------------------------------+    |
|    |  +-----------------------+   +-------------------+   +--------------------+              |    |
|    |  | [QR] Ler QRCode       |   | [X] Limpar        |   | [V] Gravar         |              |    |
|    |  | (Ativo - Azul #1d4ed8)|   | (Ativo - Neutro)  |   | (Ativo - Salvar)   |              |    |
|    |  +-----------------------+   +-------------------+   +--------------------+              |    |
|    +------------------------------------------------------------------------------------------+    |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
```
