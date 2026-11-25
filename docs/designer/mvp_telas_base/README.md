# Guia de Design Visual (v2.0) — MVP Alvenius Rastreio de Produtos

Este documento estabelece as diretrizes de design, layout e arquitetura visual atualizadas (**Versão 2.0**) para guiar a implementação com fidelidade visual absoluta no frontend (`spool-management-by-project-frontend`), baseando-se estritamente nos prints de referência oficiais:
- `copilot-image-744368.png` (Desktop 1897x989)
- `copilot-image-d6f712.png` (Mobile 369x805)

> **Histórico de Arquivos:**  
> - `v1`: Preservada em `tokens.v1.json`, `wireframes.v1.md` e `README.v1.md`.  
> - `v2.0`: Arquivos ativos em `tokens.json`, `wireframes.md` e `README.md`, alinhados à especificação executiva dos prints de referência.

---

## 1. Especificações Críticas de Design (v2.0)

### 1.1 Header e Caixa de Rota Central
- **Header Global:**
  * **Desktop:** Altura fixa de `60px`, fundo cinza-azulado industrial `#ccd2da` (ou `#cfd5dd`), borda inferior sólida `2px solid #8ea8cc`.
  * **Mobile:** Altura fixa de `56px`, fundo `#ccd2da`, borda inferior `2px solid #8ea8cc`.
  * **Logo Alvenius:** Três anéis entrelaçados em azul com a etiqueta de versão oficial `v2.0.0` posicionada logo abaixo.
- **Caixa Central "Rastreio de produtos":**
  * **NÃO é oval/pílula:** Totalmente sem formato oval/pílula (`border-radius: 9999px` removido) e sem bolinha/dot.
  * **Geometria:** Cartão retangular limpo com cantos suaves (`border-radius: 8px`), fundo branco puro `#ffffff`, borda sutil `1px solid #d0d7de`, e sombra `0 4px 12px rgba(0, 0, 0, 0.12)`.
  * **Posicionamento Cavaleiro:** Montado a cavaleiro da linha inferior do header (50% sobre o header, 50% projetado para baixo da borda `#8ea8cc`).
  * **Tipografia:** Negrito 700, cor `#1a365d`, padding horizontal `24px` no desktop e `16px` no mobile.

### 1.2 Geometria e Cantos Retos Globais (`border-radius: 0px`)
- **Regra Geral Estrita:**
  * **Cards de Login:** `border-radius: 0px`.
  * **Módulos do Menu Principal:** Caixas de módulos com cantos estritamente vivos `border-radius: 0px`.
  * **Banners de Instrução:** Todos os banners (incluindo o banner da caldeiraria *"Clique no código SPOOL para continuar"*) têm estritamente `border-radius: 0px`.
  * **Caixas de Processos e Acordeão:** Cantos vivos `0px`.
  * **Campos de Entrada (Inputs):** Altura 46px, cantos vivos `border-radius: 0px`.
  * **Botões de Ação:** Botão ENTRAR, Ler QRCode, Limpar, Gravar, Fechar e Sair com `border-radius: 0px`.
  * **Cards de Spool e Modais:** `border-radius: 0px`.
- **ÚNICOS Elementos com Cantos Suaves ou Arredondados:**
  1. Caixa de rota central **"Rastreio de produtos"** (`border-radius: 8px`).
  2. Switch de sucata estilo iOS (`border-radius: 9999px`).
  3. Badges numéricas de 4 dígitos e tags de status (`border-radius: 4px`).

### 1.3 Card de Login e Espaçamentos
- **Desktop:**
  * Largura fixa de `520px`.
  * Padding amplo de `40px 36px 20px 36px`.
  * Superfície de fundo `#f3f4f6`.
  * Borda perimetral `1px solid #71889e`.
  * Cantos retos `border-radius: 0px`.
- **Mobile:**
  * Largura fluida de `calc(100% - 24px)`.
  * Padding de `24px 20px`.
  * Mesmo fundo `#f3f4f6` e borda `1px solid #71889e`.
- **Inputs:**
  * Altura fixa de `46px`.
  * Fundo branco puro `#ffffff`.
  * Cantos vivos `border-radius: 0px`.
- **Botão Principal ENTRAR:**
  * Altura fixa de `48px`.
  * Fundo azul vibrante `#1956ce` (hover `#1446a8`).
  * Cantos vivos `border-radius: 0px`.
  * Margem superior de `32px` e margem inferior de `40px`.
  * Tipografia: Negrito 700, caixa alta, texto branco `#ffffff`.
- **Rodapé do Card de Login:**
  * Texto oficial: `® 2026 - Alvenius Tubos e Conexões - v2.0.0`.
  * **Alinhamento:** Estritamente alinhado à **direita** (`text-align: right`) no canto inferior do card.
  * Tipografia: `11px`, cinza `#71889e`.

### 1.4 Disposição e Alinhamentos Verticais Centralizados
- **Menu Principal (`copilot-image-994e16.png`):**
  * Cada módulo do grid é um **bloco vertical** (`display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`).
  * **Sem círculo, badge ou fundo colorido atrás do ícone:** o ícone SVG em linha azul (`#1956ce` / `#0070ba`) fica diretamente sobre o fundo branco.
  * Hierarquia de cada caixa:
    1. **Ícone SVG no topo centralizado** (`32px x 32px`).
    2. **Título em caixa alta centralizado** (`15px`, bold, `#1956ce`).
    3. **Subtítulo centralizado** (`12px`, `#64748b`).
  * O botão inferior **"IR PARA SITE ALVENIUS"** adota exatamente a mesma estrutura: ícone de globo no topo centralizado, título centralizado e subtítulo centralizado.
- **Modal de Transferência (`copilot-image-a02192.png`):**
  * As opções **COMPONENTE** (ícone 4 diamantes) e **SPOOL** (ícone caixa isométrica) são caixas verticais retangulares com cantos vivos (`border-radius: 0px`), ícone no topo centralizado, título e subtítulo centralizados.
- **Caldeiraria (`copilot-image-0f5ec7.png` e `copilot-image-35565e.png`):**
  * Painel acordeão com alinhamento vertical estrito: cabeçalho `PROCESSOS | QTD.`, 8 status com bullets circulares coloridos à esquerda e badges numéricas de 4 dígitos alinhadas à direita.
  * Rodapé totalizador com `TOTAL` e badge azul royal `[1099]` na base.

---

## 2. Paleta de Cores e Tokens Principais

### 2.1 Identidade Visual e Tons Neutros
- **Azul Primário Ações / Login:** `#1956ce` (hover `#1446a8`, ativo `#0f3682`).
- **Azul Industrial Operacional:** `#0070ba` (módulos secundários, leitura qrcode).
- **Azul Escuro / Navy:** `#003366` / `#1a365d` (títulos de formulários e modais).
- **Header:** Fundo `#ccd2da` (ou `#cfd5dd`) e borda inferior `2px solid #8ea8cc`.
- **Card de Login:** Fundo `#f3f4f6`, borda `1px solid #71889e`.
- **Vermelho Alerta / Fechamento:** `#dc2626` (botão Sair, botão Fechar e botão `✕`).
- **Accent Line:** `linear-gradient(90deg, #1956ce 0%, #00a8ff 60%, transparent 100%)`.
- **Fundo Global:** `linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)`.
- **Superfície dos Cards:** `#ffffff` com borda fina `#cdd9e5` e cantos retos (`border-radius: 0px`).

### 2.2 Cores dos 8 Status dos Processos Chão de Fábrica
| Status | Cor Hex | Bullets | Badge Contagem | Significado Operacional |
|---|---|---|---|---|
| **Reservado** | `#f1c40f` | Bullet Amarelo | `[0052]` (cinza `#2d3748`) | Aguardando início |
| **Execução** | `#00bcd4` | Bullet Ciano | `[0007]` (cinza `#2d3748`) | Em processo de produção |
| **Pausado** | `#e67e22` | Bullet Laranja | `[0002]` (cinza `#2d3748`) | Aguardando para continuar |
| **Continua** | `#95a5a6` | Bullet Cinza | `[0000]` (cinza `#2d3748`) | Retornar para execução |
| **Finalizado** | `#27ae60` | Bullet Verde | `[0062]` (cinza `#2d3748`) | Aguardando Aprovação CQ |
| **Reversível** | `#8bc34a` | Bullet Verde-claro | `[0000]` (cinza `#2d3748`) | Retorna ao início do processo |
| **Sucata** | `#e74c3c` | Bullet Vermelho | `[0000]` (cinza `#2d3748`) | Descarte do produto |
| **Romaneio** | `#0070ba` | Bullet Azul | `[0976]` (cinza `#2d3748`) | Aguardando próxima etapa |
| **TOTAL** | `#0070ba` | — | `[1099]` (azul `#0070ba`) | Totalizador consolidado |

---

## 3. Ícones SVG Oficiais Mapeados

Todos os ícones estão disponíveis em SVG puro em `wireframes.md`:
1. **Logo Alvenius:** 3 anéis entrelaçados em azul com versão `v2.0.0` abaixo.
2. **CADASTRO:** Caixa isométrica 3D com `+` centralizado na face superior.
3. **CALDEIRARIA:** Panela/caldeirão de fundição com gota de metal fundido.
4. **REVESTIMENTO:** Spray atomizador de tinta/revestimento com gotículas.
5. **PINTURA:** Rolo de demão de pintura com armação e haste.
6. **VALIDAR QRCODE:** QRCode matricial com cantos quadrados.
7. **TRANSFERÊNCIA:** Furgão de transporte de carga em vista lateral.
8. **SITE ALVENIUS:** Globo esférico com linhas de latitude e longitude.
9. **COMPONENTE (Modal):** 4 diamantes/losangos interconectados por traços.
10. **Ações:** `[->] ENTRAR` (azul `#1956ce`), `[->] Sair` (vermelho `#dc2626`), `[:#:] Ler QRCode`, `[lixeira] Limpar`, `[disquete] Gravar`, `[⊗] Fechar` (vermelho).

---

## 4. Estrutura Modular Orientada ao Frontend

Para orientar diretamente a equipe de frontend (`spool-management-by-project-frontend`):
- **`src/web/index.html`**: Shell leve da aplicação com pontos de ancoragem (`#app-header`, `#app-content`, `#app-modals`).
- **`src/web/components/`**: Componentes reutilizáveis (Header/Navbar com hambúrguer mobile, RouteCard 8px a cavaleiro, InfoBox com cantos retos 0px, Acordeão de Processos, ToggleSwitch, SpoolCard com cantos retos 0px).
- **`src/web/views/`**: Módulos de telas individuais (Login com card 520px `#f3f4f6` e botão 48px `#1956ce`, Dashboard com grid vertical 1col/2col, Cadastro retangular, Caldeiraria com leitor).
- **`src/web/modals/`**: Modais autônomos com cantos retos 0px e caixas verticais (`modal-transferencia`, `modal-qrcode`).
- **CSS Global:** Classes utilitárias `.accent-line`, `.sharp-corners` (`border-radius: 0px`), `.status-badge`, `.action-box-vertical`, `.header-route-card`.

---

## 5. Arquivos Deste Pacote

- `tokens.json`: Definições v2.0 em JSON estruturado com tokens de geometria retangular, header 60px/56px, card 8px a cavaleiro e card de login 520px #f3f4f6.
- `wireframes.md`: Especificações completas v2.0 de layouts, caixas verticais, modais, responsividade e SVGs.
- `tokens.v1.json`, `wireframes.v1.md`, `README.v1.md`: Versão 1 arquivada para histórico e rastreabilidade.

