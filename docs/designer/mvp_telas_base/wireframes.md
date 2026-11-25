# Wireframes e Especificação de Interface (v2.0) — MVP Alvenius

Este documento estabelece as especificações de tela, hierarquia visual, dimensões e referências exatas de componentes para a implementação do sistema **Rastreio de Produtos (Spool Management)** no frontend (`spool-management-by-project-frontend`), com fidelidade visual absoluta aos prints de referência oficiais:
- `copilot-image-744368.png` (Desktop 1897x989)
- `copilot-image-d6f712.png` (Mobile 369x805)

---

## 1. Regras Fundamentais de Design: Geometria, Alinhamentos e Espaçamentos

### 1.1 Header e Caixa de Rota Centralizada ("Rastreio de produtos")
- **Header Global:**
  - **Desktop:** Altura fixa de `60px`, fundo cinza-azulado industrial `#ccd2da` (ou `#cfd5dd`), com borda inferior sólida de `2px solid #8ea8cc`.
  - **Mobile:** Altura fixa de `56px`, mesmo fundo `#ccd2da` e borda inferior `2px solid #8ea8cc`.
  - **Logotipo Alvenius:** Três anéis entrelaçados em traço azul contínuo, com a versão oficial `v2.0.0` logo abaixo (`11px`, cinza `#64748b`, peso 500, centralizado).
- **Caixa Central "Rastreio de produtos":**
  - **NÃO é oval/pílula:** Proibido uso de formato pílula `9999px` e proibido marcador/dot/bolinha.
  - **Formato:** Cartão retangular limpo com cantos suaves (`border-radius: 8px`), fundo branco `#ffffff`, borda sutil `1px solid #d0d7de`, e sombra destacada (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)`).
  - **Posicionamento Cavaleiro:** Montado estritamente **a cavaleiro da linha inferior do header** (50% de sua altura sobreposto ao header e 50% projetado para baixo da borda inferior `#8ea8cc`).
  - **Tipografia:** Texto `"Rastreio de produtos"` em negrito `700`, cor azul escuro `#1a365d`, padding horizontal `24px` no desktop e `16px` no mobile.

### 1.2 Regra Estrita de Cantos Retos Globais (`border-radius: 0px`)
- **Princípio Industrial Alvenius:** A estética do chão de fábrica Alvenius é técnica, limpa, geométrica e profissional.
- **Cantos Estritamente Vivos / Retos (`border-radius: 0px`):**
  - **Cards de Login:** `border-radius: 0px`.
  - **Módulos do Menu Principal:** `border-radius: 0px`.
  - **Banners de Instrução:** Fundo informativo e banner na caldeiraria ("Clique no código SPOOL para continuar") têm estritamente `border-radius: 0px`.
  - **Caixas de Processos e Painel Acordeão:** Cabeçalhos e blocos de processo têm estritamente `border-radius: 0px`.
  - **Inputs e Campos de Texto:** Todos os inputs têm cantos vivos `border-radius: 0px`.
  - **Botões de Ação:** Botão `ENTRAR`, `Ler QRCode`, `Limpar`, `Gravar`, `Fechar`, `Sair` possuem estritamente `border-radius: 0px`.
  - **Cards de Spool e Modais:** Caixas retangulares com cantos vivos `0px`.
- **ÚNICOS Elementos do Sistema com Cantos Suaves ou Arredondados:**
  1. **Caixa de Rota Central:** `"Rastreio de produtos"` com cantos suaves (`border-radius: 8px`).
  2. **Switch de Sucata:** Chave liga/desliga estilo iOS com trilho arredondado (`border-radius: 9999px`).
  3. **Badges Numéricas e Tags de Status:** Contadores numéricos de 4 dígitos (`border-radius: 4px`).

### 1.3 Card de Login e Espaçamentos
- **Desktop:**
  - Largura fixa de `520px`.
  - Padding interno amplo de `40px 36px 20px 36px`.
  - Superfície em cinza claro industrial `#f3f4f6`.
  - Borda nítida de `1px solid #71889e`.
  - Cantos vivos (`border-radius: 0px`).
- **Mobile:**
  - Largura fluida `calc(100% - 24px)`.
  - Padding interno compacto de `24px 20px`.
  - Mesmo padrão de cor de fundo `#f3f4f6` e borda `#71889e`.
- **Campos de Entrada (Inputs):**
  - Altura fixa de `46px`.
  - Fundo branco puro `#ffffff`.
  - Cantos vivos (`border-radius: 0px`).
  - Borda sutil `1px solid #cbd5e1`.
- **Botão Principal ENTRAR:**
  - Altura fixa de `48px`.
  - Azul vibrante `#1956ce` (hover `#1446a8`).
  - Cantos vivos (`border-radius: 0px`).
  - Margem superior de `32px` e margem inferior de `40px`.
  - Tipografia: Caixa alta, negrito `700`, cor branca `#ffffff`, tamanho `16px`.
- **Rodapé do Card de Login:**
  - Texto oficial: `® 2026 - Alvenius Tubos e Conexões - v2.0.0`.
  - **Posicionamento:** Estritamente alinhado à **direita** (`text-align: right`) no canto inferior do card.
  - Tipografia: `11px`, cinza `#71889e`.

### 1.4 Regra de Disposição e Alinhamentos Verticais
- **Menu Principal e Modais de Seleção:**
  - As caixas de ação **NÃO são dispostas horizontalmente** com ícone ao lado de texto.
  - Toda caixa de módulo no Menu Principal e todo bloco no Modal de Transferência é um **bloco retangular com alinhamento vertical centralizado (`display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`)**:
    1. **Ícone SVG no Topo:** Diretamente exposto em traço contínuo azul (`#1956ce` / `#0070ba`), sem círculo, sem badge e sem fundo colorido atrás do ícone.
    2. **Título Centralizado:** Imediatamente abaixo do ícone (`font-size: 15px`, `font-weight: 700`, caixa alta, azul `#1956ce`).
    3. **Subtítulo Centralizado:** Logo abaixo do título (`font-size: 12px`, cor cinza `#64748b`, peso normal, margem superior de 4px).
  - O botão largo inferior **"IR PARA SITE ALVENIUS"** segue o mesmo alinhamento vertical (ícone de globo no topo, título centralizado e subtítulo centralizado).

---

## 2. Elementos Globais de Identidade Visual

### 2.1 Plano de Fundo Global (Background)
- **Gradiente:** Suave cinza-claro (`linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)`).
- **Textura de Fundo:** Padrão sutil em SVG de linhas onduladas / fitas fluidas 3D (`opacity: 0.05` a `0.08`), conferindo aspecto industrial e tecnológico moderno sem poluir a leitura dos cartões.

### 2.2 Logotipo Alvenius (3 Anéis Entrelaçados)
- **Forma:** Três círculos estilizados sobrepostos e entrelaçados em traço contínuo azul institucional.
- **Versão:** Texto `v2.0.0` logo abaixo dos 3 anéis em tipografia compacta (`11px`, cinza `#64748b`, peso 500, centralizado).
- **SVG do Logo com Versão:**
```html
<div class="logo-alvenius-block" style="display:flex; flex-direction:column; align-items:center;">
  <svg width="46" height="32" viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="21" rx="14" ry="14" stroke="#1956ce" stroke-width="4.5" fill="none"/>
    <ellipse cx="32" cy="18" rx="14" ry="14" stroke="#0088dd" stroke-width="4.5" fill="none"/>
    <ellipse cx="42" cy="21" rx="14" ry="14" stroke="#005b99" stroke-width="4.5" fill="none"/>
  </svg>
  <span style="font-size:11px; color:#64748b; font-weight:500; margin-top:2px;">v2.0.0</span>
</div>
```

### 2.3 Caixa de Rota Central Montada a Cavaleiro
- **Substitui pills arredondadas 9999px:** Agora padronizada como cartão retangular com cantos suaves `border-radius: 8px`.
- **Estilo:** Fundo `#ffffff`, borda `1px solid #d0d7de`, sombra `0 4px 12px rgba(0,0,0,0.12)`, padding `8px 24px`.
- **Posição:** Montado a cavaleiro da linha divisória do header (`top: 50%` do eixo inferior do header, projetando metade para fora).
- **Sem marcadores:** Nenhum dot verde/azul, nenhuma bolinha. Texto direto, limpo e legível.

---

## 3. Tela de Login (`copilot-image-744368.png` Desktop / `copilot-image-d6f712.png` Mobile)

### 3.1 Visão Geral e Layout
- **Header Superior:** Altura de `60px` (desktop) ou `56px` (mobile), cor `#ccd2da`, borda inferior `2px solid #8ea8cc`.
- **Logo Alvenius:** 3 anéis no lado esquerdo com etiqueta `v2.0.0` abaixo.
- **Caixa Central:** `"Rastreio de produtos"` em cartão de `8px` a cavaleiro da linha inferior.
- **Container Central:** Card posicionado centralizadamente no viewport sobre fundo neutro.

### 3.2 Card de Login
- **Dimensões Desktop:** Largura fixa de `520px`, padding interno `40px 36px 20px 36px`.
- **Dimensões Mobile:** Largura `calc(100% - 24px)`, padding interno `24px 20px`.
- **Superfície:** Fundo `#f3f4f6`, borda perimetral `1px solid #71889e`, cantos retos (`border-radius: 0px`).
- **Título do Card:**
  - `Login` (h2, `22px`, cor azul marinho `#1a365d`, peso 700, margem inferior `4px`).
  - Subtítulo: `"Entre com seu usuário e senha para continuar."` (`13px`, `#64748b`, margem inferior `18px`).
- **Campos de Entrada (Cantos Retos):**
  - **Campo Usuário:**
    - Label com ícone: `<span class="icon">👤</span> Usuário` (`13px`, peso 600, `#334155`).
    - Input: Altura `46px`, fundo `#ffffff`, borda `1px solid #cbd5e1`, cantos retos (`border-radius: 0px`), padding `10px 14px`, placeholder `"Digite seu usuário"`. Foco: `border-color: #1956ce`, `outline: none`.
  - **Campo Senha:**
    - Label com ícone: `<span class="icon">🔒</span> Senha` (`13px`, peso 600, `#334155`).
    - Input: Altura `46px`, `type="password"`, fundo `#ffffff`, cantos retos (`border-radius: 0px`), padding `10px 14px`.
- **Botão de Ação Primária ENTRAR:**
  - Altura fixa: `48px`.
  - Cor: Azul `#1956ce` (hover `#1446a8`), largura `100%`.
  - Cantos vivos: `border-radius: 0px`.
  - Espaçamentos verticais: Margem superior de `32px` e margem inferior de `40px`.
  - Conteúdo: `[->] ENTRAR` em caixa alta e negrito `700`.
- **Rodapé do Card de Login:**
  - Posicionamento: **Alinhado estritamente à direita** no canto inferior do card (`text-align: right`).
  - Texto: `® 2026 - Alvenius Tubos e Conexões - v2.0.0`.
  - Estilo: `font-size: 11px`, cor `#71889e`.

---

## 4. Tela de Menu Principal / Dashboard (`copilot-image-994e16.png`)

### 4.1 Header Superior Global
- **Dimensões:** Altura `60px` no desktop e `56px` no mobile.
- **Cor:** Fundo `#ccd2da` (ou `#cfd5dd`), borda inferior `2px solid #8ea8cc`.
- **Estrutura Desktop (`space-between`):**
  - **Lado Esquerdo:** Bloco do logotipo (3 anéis entrelaçados em azul) com versão `v2.0.0` logo abaixo.
  - **Centro:** Caixa de rota retangular montada a cavaleiro com cantos suaves `8px`: **"Rastreio de produtos"**.
  - **Lado Direito (Barra de Usuário):**
    - Bloco de perfil: Ícone `👤` + texto `"Bem vindo, "` + negrito `"josuel"` (`#1e293b`, 14px).
    - Divisor vertical `|` cinza claro (`#cbd5e1`).
    - Botão/Link de Logout: Ícone de saída e label **"Sair"** em **vermelho vibrante** (`#dc2626`), hover `#b91c1c`.

### 4.2 Card Central do Menu (Cantos Retos)
- **Container:** Card branco de largura máxima `820px`, margem superior `28px`, centralizado, cantos retos (`border-radius: 0px`), borda `1px solid #cdd9e5`, padding `24px 28px`.
- **Cabeçalho do Menu:**
  - Título centralizado: **"Clique no que deseja fazer"** (`18px`, peso 700, `#1a365d`).
  - Linha divisória inferior sutil com gradiente azul:
    `height: 2px; background: linear-gradient(90deg, transparent, #1956ce 40%, #00a8ff 60%, transparent); margin: 10px auto 20px; width: 60%;`
- **Grid de Módulos (2 colunas no desktop / 1 coluna no mobile):**
  - **Estrutura de cada caixa de ação:** Bloco vertical retangular com cantos retos (`border-radius: 0px`), borda fina `1px solid #cdd9e5`, fundo `#ffffff`, padding `18px 14px`, cursor pointer.
  - **Disposição Interna Rigorosamente Vertical e Centralizada:**
    - `display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`
    - **Ícone SVG no Topo:** Ícone azul `#1956ce` (ou `#0070ba`) de tamanho `32px x 32px`, sem círculo ou fundo decorativo atrás.
    - **Título Centralizado:** Margem superior de `10px`, cor `#1956ce`, `font-size: 15px`, `font-weight: 700`, caixa alta.
    - **Subtítulo Centralizado:** Margem superior de `4px`, cor `#64748b`, `font-size: 12px`, peso regular.
    - Hover: `border-color: #1956ce; background-color: #f8fafc;` (sem alteração de raio de borda, cantos vivos 0px).
  - **Os 6 Módulos do Grid:**
    1. **CADASTRO:**
       - Ícone: Caixa isométrica 3D com sinal `+` no topo.
       - Título: **CADASTRO**
       - Subtítulo: `"Cadastro Spool e componentes"`
    2. **CALDEIRARIA:**
       - Ícone: Panela/caldeirão de fundição com gota de metal fundido.
       - Título: **CALDEIRARIA**
       - Subtítulo: `"Ler QRCode Spool caldeiraria / próximas etapas processo"`
    3. **REVESTIMENTO:**
       - Ícone: Frasco de spray pulverizador com gotículas atomizadas.
       - Título: **REVESTIMENTO**
       - Subtítulo: `"Ler QRCode Spool revestimento / próximas etapas processo"`
    4. **PINTURA:**
       - Ícone: Rolo de pintura com armação, haste e demão fresca.
       - Título: **PINTURA**
       - Subtítulo: `"Ler QRCode Spool pintura / próximas etapas processo"`
    5. **VALIDAR QRCODE:**
       - Ícone: Matriz clássica de QRCode com cantos demarcados.
       - Título: **VALIDAR QRCODE**
       - Subtítulo: `"Ler QRCode e validar / campos spool e componentes"`
    6. **TRANSFERÊNCIA:**
       - Ícone: Furgão/caminhão de carga em vista lateral.
       - Título: **TRANSFERÊNCIA**
       - Subtítulo: `"Ler QRCode e criar transferência / próximas etapas processo"`
- **Módulo Inferior Largo (Cantos Retos):**
  - Bloco que ocupa a largura total (ou span de 2 colunas):
  - **IR PARA SITE ALVENIUS:**
    - Estrutura vertical centralizada:
      - Ícone no topo: Globo terrestre estilizado azul `#0070ba` (`32px x 32px`).
      - Título centralizado: **IR PARA SITE ALVENIUS** (`15px`, peso 700, cor `#0070ba`).
      - Subtítulo centralizado: `"Empresa, Produtos, Orçamento, Catálogos, Contato, etc."` (`12px`, cor `#64748b`).
    - Borda `1px solid #cdd9e5`, cantos retos (`border-radius: 0px`), padding `18px 14px`.

---

## 4. Tela de Cadastro de Spool (`copilot-image-8b3d2b.png`)

### 4.1 Header Unificado com Navegação por Abas (Inline Tabs)
- **Barra Superior Institucional:**
  - Lado esquerdo: Logotipo 3 anéis em azul + texto em caixa alta e negrito **"RASTREIO DE PRODUTOS"** (`#0a2540`, `16px`).
  - Navegação Inline com Abas (horizontal):
    - `INÍCIO`
    - `CADASTRO` (**Ativo**, destacado com cor `#0070ba` e linha sublinhada/indicador azul inferior de 2px)
    - `CALDEIRARIA`
    - `REVESTIMENTO`
    - `PINTURA`
    - `VALIDAR QRCODE`
    - `TRANSFERÊNCIA`
  - Lado direito: Perfil do usuário (`👤 josuel`) + divisor `|` + botão `Sair` em **vermelho** (`#dc2626`).

### 4.2 Caixa de Identificação de Rota
- Posicionada a cavaleiro do header: Cartão retangular branco com cantos suaves (`border-radius: 8px`), borda `1px solid #d0d7de`, sombra `0 4px 12px rgba(0,0,0,0.12)`: **"Cadastro"**.

### 4.3 Card de Cadastro e Seções (Cantos Retos)
- **Faixa de Título SPOOL:**
  - Faixa cinza suave (`#eaedf1`), padding `8px 16px`, cantos retos (`border-radius: 0px`), texto em caixa alta: **SPOOL** (`14px`, peso 700, `#334155`).
- **Barra de Orientação Informativa:**
  - Fundo azul claro `#dbeafe`, borda `1px solid #bfdbfe`, padding `10px 16px`, cantos retos (`border-radius: 0px`), cor `#1e40af` com ícone `ⓘ`:
  - `"Realiza o cadastro de Spool e componentes iniciar processo produção."`
  - Linha divisória inferior em gradiente azul sutil (`.accent-line`).
- **Formulário SPOOL:**
  - Layout em grid/flex:
    - **Código :** Label `Código :` (`13px`, peso 600) seguido de campo de entrada retangular com cantos retos (`border-radius: 0px`, border `#cbd5e1`, padding `8px 12px`). Exemplo: `SP-0414-00002-004`.
    - **Descrição:** Label `Descrição:` seguido de campo de texto retangular com cantos retos (`border-radius: 0px`).
- **Faixa de Título COMPONENTES:**
  - Faixa cinza suave (`#eaedf1`), padding `8px 16px`, cantos retos (`border-radius: 0px`), texto: **COMPONENTES** (`14px`, peso 700, `#334155`).
- **Tabela de Componentes (Cantos Retos):**
  - Tabela com cantos retos (`border-radius: 0px`), bordas `#e2e8f0`.
  - Cabeçalho cinza suave:
    | ITENS | DESCRIÇÃO | QTD. |
  - Linhas com visual limpo, bordas inferiores `#e2e8f0`, alinhamento proporcional (ITENS: 15%, DESCRIÇÃO: 70%, QTD.: 15%).
- **Barra Inferior de Ações (Footer do Card - Cantos Retos):**
  - Alinhamento à direita (com wrap no mobile):
    - Botão Azul Royal: `[:#:] Ler QRCode` (fundo `#0070ba`, texto branco, cantos retos `border-radius: 0px`, padding `10px 18px`).
    - Botão Cinza Claro: `[lixeira] Limpar` (fundo `#eaedf1`, borda `1px solid #cbd5e1`, texto `#475569`, cantos retos `border-radius: 0px`, padding `10px 18px`).
    - Botão Cinza Claro / Neutro: `[disquete] Gravar` (fundo `#eaedf1`, borda `1px solid #cbd5e1`, texto `#475569`, cantos retos `border-radius: 0px`, padding `10px 18px`).

---

## 5. Tela de Caldeiraria (`copilot-image-0f5ec7.png` e `copilot-image-35565e.png`)

### 5.1 Header e Caixa de Identificação
- Navbar com link `CALDEIRARIA` ativo.
- Caixa de identificação com cantos suaves (`border-radius: 8px`): **"Caldeiraria"**.

### 5.2 Card "Processo" (Cantos Retos)
- Faixa de cabeçalho cinza: **Processo** (cantos retos `border-radius: 0px`).
- Barra informativa com ícone `ⓘ`: `"Leitura Spool, iniciar, finalizar e executar processo produção."` com linha gradiente azul (`.accent-line`).
- **Barra de Ação Rápida e Busca (Cantos Retos):**
  - Layout flex com input e botão lado a lado:
    - Input de busca: cantos retos (`border-radius: 0px`), borda `1px solid #cbd5e1`, fundo `#ffffff`, padding `9px 12px`, placeholder `"Buscar por código, status..."`.
    - Botão azul royal ao lado: `[:#:] Ler QRCode` (fundo `#0070ba`, texto branco, cantos retos `border-radius: 0px`, padding `9px 16px`, sem arredondamento).
- **Banner de Instrução Destacado (Cantos Estritamente Retos 0px):**
  - Fundo azul claro suave (`#eff6ff`), borda `1px solid #93c5fd`, cantos estritamente retos (`border-radius: 0px`), padding `10px 14px`, margem `12px 0`:
  - **"Clique no código SPOOL para continuar"** (azul escuro `#1d4ed8`, peso 600, centralizado).

### 5.3 Painel Acordeão "PROCESSOS | QTD." (Expandido)
- **Cabeçalho do Acordeão:**
  - Faixa cinza claro (`#eaedf1`), cantos retos (`border-radius: 0px`), padding `10px 16px`, display flex, justify-content space-between:
  - Texto em caixa alta: **PROCESSOS | QTD.** (`13px`, peso 700, `#334155`).
  - Ícone de recolhimento `[^]` no canto direito.
- **Lista dos 8 Status com Bullets Redondos e Badges de 4 Dígitos Alinhadas à Direita:**
  - Cada item é uma linha horizontal flex (`display: flex; align-items: center; justify-content: space-between; padding: 7px 16px; border-bottom: 1px solid #f1f5f9;`):
    * Lado esquerdo: Bullet circular (`width: 9px; height: 9px; border-radius: 50%; margin-right: 10px;`) + Texto do status (`13px`, cor `#334155`).
    * Lado direito: Badge retangular com cantos suaves (`border-radius: 4px; padding: 2px 8px; font-family: monospace; font-size: 12px; font-weight: 700; background: #2d3748; color: #ffffff;`).
  | Status | Cor Bullet | Texto da Linha | Badge Numérica |
  |---|---|---|---|
  | Reservado | `#f1c40f` (Amarelo) | Reservado (aguardando início) | `[0052]` |
  | Execução | `#00bcd4` (Ciano) | Execução (em processo produção) | `[0007]` |
  | Pausado | `#e67e22` (Laranja) | Pausado (aguardando para continuar) | `[0002]` |
  | Continua | `#95a5a6` (Cinza) | Continua (retornar para execução) | `[0000]` |
  | Finalizado | `#27ae60` (Verde) | Finalizado (aguardando "Aprova CQ") | `[0062]` |
  | Reversível | `#8bc34a` (Verde claro) | Reversível (retorna início processo.) | `[0000]` |
  | Sucata | `#e74c3c` (Vermelho) | Sucata (descarte do produto) | `[0000]` |
  | Romaneio | `#0070ba` (Azul) | Romaneio (aguardando próxima etapa) | `[0976]` |
- **Rodapé Totalizador do Painel (Alinhado na Base):**
  - Linha final com fundo `#f8fafc`, padding `10px 16px`, display flex, justify-content space-between:
  - Texto em negrito: **TOTAL** (`14px`, peso 700, `#1e293b`).
  - Badge destacada em azul royal vibrante `#0070ba` com texto branco: `[1099]`.

### 5.4 Toggle Switch de Histórico de Sucata (Estilo iOS)
- Controle interativo:
  - Chave liga/desliga com trilho arredondado (`border-radius: 9999px`), largura 38px, altura 20px, manopla circular branca de 16px.
  - Texto adjacente: `"Click para exibir histórico de sucata"` (`13px`, `#64748b`).

### 5.5 Cards de Spool Listados (Cantos Retos)
- Container retangular com cantos retos (`border-radius: 0px`), fundo `#ffffff`, borda `1px solid #cdd9e5`, padding `16px`, margem inferior `12px`:
  - **Topo do Card:**
    - Badge sequencial cinza à esquerda com cantos suaves: `0001` (`border-radius: 4px`, bg `#64748b`, color `#fff`).
    - Tag de status à direita com cantos suaves: `Romaneio` (`border-radius: 4px`, bg `#e0f2fe`, color `#0284c7`, peso 700).
  - **Corpo do Card:**
    - Linha de Código em destaque: `Código: ` `<a href="#" style="color:#0070ba; font-weight:700; text-decoration:none;">SP-0414-00002-004</a>`.
    - Linhas de Data com ícone de calendário `📅`:
      * `Início: -- / -- / ---- às -- : --`
      * `Finalizado: -- / -- / ---- às -- : --`
    - Descrição técnica do spool: `"Carretel FS+FF 32pol x 9,53 x 1015mm 150 PSI"` (`13px`, `#475569`).
    - Seção de sucata: `"00 Histórico de sucata:"` (visível quando toggle ativo).

---

## 6. Modal de Seleção de Transferência (`copilot-image-a02192.png`)

### 6.1 Estrutura e Backdrop
- Fundo escuro semi-transparente (`rgba(0, 0, 0, 0.6)`).
- Diálogo centralizado em card branco de largura máxima ~`480px`, cantos retos (`border-radius: 0px`), borda `1px solid #cdd9e5`, padding `24px 20px`.
- Botão fechar `[✕]` em **vermelho** (`#dc2626`) no canto superior direito.

### 6.2 Cabeçalho
- Título centralizado: **"Selecione qual TIPO de TRANSFERÊNCIA"** (`16px`, peso 700, `#1a365d`).
- Linha divisória com gradiente azul (`.accent-line`) logo abaixo do título.

### 6.3 Caixas de Opções (Blocos Verticais Retangulares com Cantos Vivos)
Cada opção é um bloco retangular de cantos vivos (`border-radius: 0px`), borda `1px solid #cdd9e5`, fundo `#ffffff`, padding `18px 14px`, margem inferior `14px`, cursor pointer, com alinhamento vertical e centralizado:
- `display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`
- Hover: `border-color: #0070ba; background-color: #f8fafc;`

1. **COMPONENTE:**
   - **Ícone no Topo:** 4 diamantes interconectados em azul royal `#0070ba` (`32px x 32px`), centralizado, sem círculo ou fundo colorido atrás.
   - **Título Centralizado:** **COMPONENTE** (`15px`, peso 700, cor `#0070ba`, margem superior de 8px).
   - **Subtítulo Centralizado:** `"Transferência componente / próximas etapas processo"` (`12px`, cor `#64748b`, margem superior de 4px).
2. **SPOOL:**
   - **Ícone no Topo:** Caixa isométrica de spool em azul royal `#0070ba` (`32px x 32px`), centralizado, sem círculo ou fundo colorido atrás.
   - **Título Centralizado:** **SPOOL** (`15px`, peso 700, cor `#0070ba`, margem superior de 8px).
   - **Subtítulo Centralizado:** `"Transferência spool / próximas etapas processo"` (`12px`, cor `#64748b`, margem superior de 4px).

### 6.4 Rodapé do Modal (Cantos Retos)
- Botão vermelho de cancelamento com cantos retos:
  - Fundo vermelho `#dc2626`, texto branco, cantos retos (`border-radius: 0px`), padding `10px 24px`, font-weight 600, display block, margem: 12px auto 0:
  - Conteúdo: `[⊗] Fechar`.

---

## 7. Modal Leitor de QRCode (`copilot-image-9d163b.png`)

### 7.1 Backdrop e Layout
- Backdrop escuro semi-transparente (`rgba(0, 0, 0, 0.75)`).
- Card central de largura máxima ~`420px`, cantos retos (`border-radius: 0px`), borda `1px solid #475569`, fundo `#ffffff`, padding `16px`.

### 7.2 Topo e Caixa de Identificação
- Caixa retangular superior com cantos suaves (`border-radius: 8px`), fundo branco, borda `1px solid #d0d7de`: **"Leitor de QRCode"**.

### 7.3 Viewfinder da Câmera (Área de Leitura)
- **Superfície do Visor:** Quadrado preto puro `#000000` de aproximadamente `260px x 260px`, cantos retos (`border-radius: 0px`), relativo no centro.
- **Miras de Canto (Crosshair Corners):**
  - Quatro cantos demarcados em **azul ciano brilhante** (`#00bcd4` / `#00a8ff`), espessura de 3.5px, comprimento de 28px nos cantos superior-esquerdo, superior-direito, inferior-esquerdo e inferior-direito.
- **Linha Laser Central de Varredura:**
  - Linha horizontal ciano neon (`#00d2ff`) com glow (`box-shadow: 0 0 10px rgba(0, 210, 255, 0.9)`), simulando varredura contínua.

### 7.4 Bloco Inferior de Instrução e Última Leitura
- **Texto de Instrução:**
  - Linha 1: `"Ler o QRCode do Spool."` (`13px`, cor `#475569`, centralizado).
  - Linha 2 em destaque: **"PARA SEGUIR processo produto."** (`14px`, peso 700, cor `#1e293b`, centralizado).
- **Linha de Destaque Gradiente:** `.accent-line` centralizada.
- **Caixa do Último QRCode Lido (Cantos Retos):**
  - Bloco retangular com fundo cinza suave (`#f8fafc`), borda `1px solid #cbd5e1`, cantos retos (`border-radius: 0px`), padding `8px 12px`, margem `10px 0`:
  - Rótulo: `"Último QRCode lido:"` (`12px`, `#64748b`).
  - Texto de status: `"Aguardando leitura..."` (`13px`, cor `#1e293b`, font-family monospace).
- **Botão Fechar (Cantos Retos):**
  - Botão vermelho centralizado com cantos retos: `[⊗] Fechar` (bg `#dc2626`, cor branca, cantos retos `border-radius: 0px`, padding `10px 28px`).

---

## 8. Coleção Completa de Ícones SVG Oficiais (Inline)

Ícones em SVG puro, com traço azul escuro/royal (`#0070ba`), espessura uniforme de 2px, sem círculos ou fundos coloridos atrás:

### 8.1 Ícone Caixa Isométrica com `+` (CADASTRO)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
  <line x1="12" y1="22.08" x2="12" y2="12"/>
  <line x1="12" y1="5" x2="12" y2="9"/>
  <line x1="10" y1="7" x2="14" y2="7"/>
</svg>
```

### 8.2 Ícone Panela/Caldeirão com Gota (CALDEIRARIA)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 11h16a1 1 0 0 1 1 1v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2a1 1 0 0 1 1-1z"/>
  <path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/>
  <path d="M12 18c0 1.5-1 2.5-1 2.5s-1-1-1-2.5a1 1 0 0 1 2 0z" fill="#0070ba"/>
</svg>
```

### 8.3 Ícone Spray/Pulverizador com Gotas (REVESTIMENTO)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="7" y="10" width="8" height="11" rx="0"/>
  <path d="M9 10V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4"/>
  <path d="M7 6h6"/>
  <path d="M10 3h4"/>
  <circle cx="18" cy="5" r="1" fill="#0070ba"/>
  <circle cx="21" cy="7" r="1" fill="#0070ba"/>
  <circle cx="19" cy="9" r="1" fill="#0070ba"/>
</svg>
```

### 8.4 Ícone Rolo de Pintura com Haste (PINTURA)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="3" width="16" height="6" rx="0"/>
  <path d="M12 9v4a2 2 0 0 0 2 2h2v6"/>
  <line x1="2" y1="6" x2="4" y2="6"/>
  <line x1="20" y1="6" x2="22" y2="6"/>
</svg>
```

### 8.5 Ícone Clássico QRCode (VALIDAR QRCODE)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="7" height="7"/>
  <rect x="14" y="3" width="7" height="7"/>
  <rect x="3" y="14" width="7" height="7"/>
  <rect x="14" y="14" width="3" height="3" fill="#0070ba"/>
  <rect x="18" y="18" width="3" height="3" fill="#0070ba"/>
  <line x1="14" y1="18" x2="14" y2="21"/>
  <line x1="18" y1="14" x2="21" y2="14"/>
</svg>
```

### 8.6 Ícone Caminhão de Entrega Lateral (TRANSFERÊNCIA)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="1" y="6" width="13" height="10" rx="0"/>
  <path d="M14 9h4l3 3v4h-7V9z"/>
  <circle cx="5.5" cy="18.5" r="2.5"/>
  <circle cx="17.5" cy="18.5" r="2.5"/>
</svg>
```

### 8.7 Ícone Globo Terrestre (SITE ALVENIUS)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="2" y1="12" x2="22" y2="12"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
</svg>
```

### 8.8 Ícone 4 Diamantes Interconectados (Modal Transferência - COMPONENTE)
```html
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0070ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="7" height="7" rx="0" transform="rotate(45 5.5 5.5)"/>
  <rect x="13" y="2" width="7" height="7" rx="0" transform="rotate(45 16.5 5.5)"/>
  <rect x="2" y="13" width="7" height="7" rx="0" transform="rotate(45 5.5 16.5)"/>
  <rect x="13" y="13" width="7" height="7" rx="0" transform="rotate(45 16.5 16.5)"/>
  <line x1="9.5" y1="5.5" x2="12.5" y2="5.5"/>
  <line x1="9.5" y1="16.5" x2="12.5" y2="16.5"/>
  <line x1="5.5" y1="9.5" x2="5.5" y2="12.5"/>
  <line x1="16.5" y1="9.5" x2="16.5" y2="12.5"/>
</svg>
```

---

## 9. Responsividade e Adaptação Mobile (< 768px)

Como identificado nas capturas de tela operacionais em dispositivos móveis (`copilot-image-d6f712.png` 369x805):

### 9.1 Header Mobile com Menu Hambúrguer
- **Estrutura do Header Mobile (`< 768px`):**
  - **Altura fixa exata:** `56px`.
  - **Cores:** Fundo `#ccd2da` (ou `#cfd5dd`), borda inferior sólida `2px solid #8ea8cc`.
  - **Lado Esquerdo:**
    - Logo Alvenius (3 anéis entrelaçados) em tamanho compacto acompanhado da versão `v2.0.0` logo abaixo.
    - Texto em caixa alta e negrito: **"RASTREIO DE PRODUTOS"** (`14px` a `15px`, cor `#0a2540`, margem esquerda `8px`).
  - **Centro:**
    - Caixa de rota retangular **"Rastreio de produtos"** montada a cavaleiro da linha inferior (50% sobre o header, 50% projetado para baixo), cantos suaves `border-radius: 8px`, fundo branco, borda `1px solid #d0d7de`, sombra `0 4px 12px rgba(0,0,0,0.12)`. Não é oval/pílula, sem bolinha/dot.
  - **Lado Direito:**
    - Botão de Menu Hambúrguer `☰` (`display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 0px; cursor: pointer; color: #1e293b; font-size: 20px;`).
- **Gaveta de Navegação (Mobile Drawer / Dropdown):**
  - Acionado pelo botão hambúrguer `☰`.
  - Exibe a lista vertical das abas: `INÍCIO`, `CADASTRO`, `CALDEIRARIA`, `REVESTIMENTO`, `PINTURA`, `VALIDAR QRCODE`, `TRANSFERÊNCIA`.
  - Abaixo da lista de abas: Dados do operador (`👤 Bem vindo, josuel`) e botão **"Sair"** em vermelho (`#dc2626`).

### 9.2 Otimização de Layout Mobile
- **Container Global:** Margens laterais compactas (`8px` a `12px`), permitindo que os cartões ocupem quase `100%` da largura da tela do smartphone.
- **Card de Login no Mobile:** Largura fluida `calc(100% - 24px)`, padding `24px 20px`, fundo `#f3f4f6`, borda `1px solid #71889e`, cantos vivos `0px`.
- **Card Padding no Mobile:** Reduzido de `24px` para `12px` a `14px`, maximizando o espaço útil para dados técnicos e tabelas.
- **Grid do Menu Principal no Mobile:**
  - Colapsa de 2 colunas para **1 coluna vertical única** (`grid-template-columns: 1fr`).
  - Cada caixa de ação mantém o layout vertical (ícone no topo centralizado, título centralizado, subtítulo centralizado) com cantos estritamente retos `0px`.
- **Busca e Botão de Leitura no Mobile:**
  - Flexbox responsivo: campo de busca ocupa `flex: 1` e botão `Ler QRCode` fica alinhado ao lado ou quebra para largura total em telas muito estreitas (`< 400px`).
- **Footer de Ações no Cadastro:**
  - Botões `Ler QRCode`, `Limpar` e `Gravar` organizados em flex vertical ou grade adaptada (`width: 100%` em telas estreitas para facilitar toque do operador de luvas, sempre com cantos vivos `0px`).

---

## 10. Diretrizes de Arquitetura Frontend Recomendadas

```
src/web/
├── index.html                    <- Shell leve com root containers (#app-header, #app-content, #app-modals)
├── style.css                     <- CSS compilado a partir dos tokens v2.0 (bordas retangulares 0px, header 60px/56px, etc.)
├── app.js                        <- Inicializador da aplicação, roteamento e toggle do menu mobile
├── components/
│   ├── header.js                 <- Header com logo Alvenius, versão v2.0.0, caixa de rota 8px a cavaleiro e hambúrguer mobile
│   ├── navbar.js                 <- Abas horizontais no desktop e gaveta dropdown no mobile
│   ├── route-card.js             <- Caixa central retangular 8px a cavaleiro da linha inferior
│   ├── info-box.js               <- Banner informativo com cantos retos 0px e gradiente azul divisor
│   ├── accordion-processos.js    <- Acordeão retrátil com os 8 status, bullets e badges de 4 dígitos
│   ├── toggle-switch.js          <- Chave liga/desliga estilo iOS para histórico de sucata
│   └── spool-card.js             <- Card retangular (cantos vivos 0px) com badges, datas e link do código
├── views/
│   ├── view-login.js             <- Formulário 520px com usuário, senha, botão royal #1956ce e copyright à direita
│   ├── view-dashboard.js         <- Grid vertical 1col (mobile) ou 2col (desktop) com ícones no topo e cantos 0px
│   ├── view-cadastro.js          <- Formulário SPOOL retangular, tabela e botões de cantos vivos 0px
│   └── view-caldeiraria.js       <- Busca com leitor, banner de instrução retangular 0px e cards de spool
└── modals/
    ├── modal-base.js             <- Diálogo genérico retangular 0px com backdrop e botão fechar [✕]
    ├── modal-transferencia.js    <- Blocos verticais retangulares 0px Componente e Spool
    └── modal-qrcode.js           <- Scanner com viewfinder preto, miras ciano neon e laser ativo
```


