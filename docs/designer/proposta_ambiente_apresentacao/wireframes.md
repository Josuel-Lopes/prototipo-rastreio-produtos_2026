# Wireframes — Sinalização "Ambiente de demonstração"

Viewports de validação: **Desktop 1897x989** · **Mobile 360x740** · **Print A4 portrait (210x297mm, margens 12/10mm)**.

---

## 1. Desktop (≥768px) — tela de trabalho

```
+------------------------------------------------------------------------------------------+
| [◎◎◎]  RASTREIO DE PRODUTOS   INÍCIO CADASTRO CALDEIRARIA ...   | 👤 Bem vindo | Sair    |  header 60px (z 150)
|  v2.8.0 [DEMO]                                                                           |  ← selo inline após versão
+-----------------------------------------[ Caldeiraria ]----------------------------------+  pill a cavaleiro (inalterada)
|                                                                                          |
|                               CONTEÚDO DA TELA (inalterado)                              |
|                                                                                          |
|                                                                                          |
|                                                    ↕ body padding-bottom = 28px          |
+==========================================================================================+  border-top 2px #F5B700
| ● AMBIENTE DE DEMONSTRAÇÃO · Proposta comercial PROP-2026-011 · MAXCODE42 → Alvenius ·   |  ribbon 28px #0B2545
|   Dados fictícios                                    (1 linha, centralizado)             |  fixed bottom, z 140
+------------------------------------------------------------------------------------------+
```

Selo (zoom):
```
[◎◎◎]
v2.8.0 ┌──────┐
       │ DEMO │  9px/700 · #92400E / #FEF3C7 · borda #F5B700 · radius 4 · ml 4px
       └──────┘
```

## 2. Desktop — rota proposta (tela)

```
+------------------------------------------------------------------------------------------+
| [← Voltar] 📄 Proposta Comercial PROP-2026-011 · Alvenius     [ 🖨 Salvar Proposta em PDF ] |  action bar sticky (z 100)
+------------------------------------------------------------------------------------------+
|            +----------------------- .proposal-sheet (1080px) -----------------------+    |
|            | ⓘ Nota de Escopo ... (existente, no-print)                             |    |
|            | ...blocos 1–7...                                                        |    |
|            +-------------------------------------------------------------------------+    |
+==========================================================================================+
| ● AMBIENTE DE DEMONSTRAÇÃO · Proposta comercial PROP-2026-011 · MAXCODE42 → Alvenius ·   |  ribbon 28px
|   Dados fictícios                                                                        |
+------------------------------------------------------------------------------------------+
```
Sem marca d'água diagonal em tela.

## 3. Mobile 360x740

```
+------------------------------------+
| [◎◎◎] RASTREIO DE         [☰]      |  header 56px
|  v2.8.0 [DEMO]                     |
+-----------[ Caldeiraria ]----------+
|                                    |
|        CONTEÚDO (inalterado)       |
|                                    |
|                                    |
|            ↕ padding-bottom 24px   |
|              + safe-area           |
+====================================+  2px #F5B700
| ● AMBIENTE DE DEMONSTRAÇÃO ·       |  ribbon 24px, 11px, padding 0 8px
|   PROP-2026-011                    |  (1 linha, ≈300px de 344px úteis)
+------------------------------------+
```
Linha real: `● AMBIENTE DE DEMONSTRAÇÃO · PROP-2026-011` — "Proposta comercial", "MAXCODE42 → Alvenius" e "Dados fictícios" ocultos (presentes no `aria-label`).

Drawer aberto (z 250/300) cobre header, conteúdo e ribbon.

## 4. Print A4 — PDF da proposta (cada página)

```
+--------------------------------------------------+  210mm
|  margem 12mm                                     |
|  +--------------------------------------------+  |
|  | MAXCODE42  ⇄  Alvenius                     |  |
|  | PROP-2026-011 · v1.0 · 24/11/2026      .   |  |
|  |                                      .     |  |
|  | 1. Sumário executivo     A M B I .         |  |
|  | ....................   E N T E  D E        |  |  marca d'água:
|  | ................   D E M O N S .           |  |  64pt/800 · #0B2545 · opacity 0.07
|  | .............  T R A Ç Ã O                 |  |  rotate(-45deg) · centro da página
|  | 2. Apresentação  .                         |  |  2 linhas centralizadas
|  | ............                               |  |  z 9999 · position fixed (1x por página)
|  | ...                                        |  |
|  |                                            |  |
|  |            ↕ .proposal-sheet pb 10mm       |  |
|  |--------------------------------------------|  |  border-top 0.5pt #D0D5DD
|  | Ambiente de demonstração · Proposta comercial PROP-2026-011 · v1.0 · MAXCODE42 → Alvenius |  7.5pt #5B6670, centralizado
|  +--------------------------------------------+  |  fixed bottom (1x por página)
|  margem 12mm                                     |
+--------------------------------------------------+  297mm
```

Ocultos em print: header, action bar, ribbon, selo, `.proposal-scope-notice`, modais, toasts.

Dimensão estimada da marca d'água: maior linha "DEMONSTRAÇÃO" ≈ 210mm de largura a 64pt → diagonal útil da página ≈ 334mm; folga suficiente sem corte em -45°.
