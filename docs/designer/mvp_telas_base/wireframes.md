# Wireframes e Estrutura de Telas — MVP Alvenius

Este documento descreve detalhadamente a composição estrutural, hierarquia visual e comportamento de cada uma das telas do MVP de apresentação do sistema **Rastreio de Produtos (Spool Management)**.

---

## 1. Tela de Login

### 1.1 Header da Aplicação
- **Logotipo Alvenius:** 3 anéis interligados em azul (`#0070ba`), centralizados ou alinhados ao topo.
- **Versão:** `v1.3.1` logo abaixo do logotipo em tipografia secundária (`textMuted`, 12px).
- **Pill Flutuante Superior:** Badge arredondada (`border-radius: 9999px`), fundo branco com sombra sutil (`box-shadow: 0 2px 6px rgba(0,0,0,0.1)`), texto em caixa alta/capitalizada: **"Rastreio de produtos"** em tom cinza azulado.

### 1.2 Plano de Fundo
- Gradiente linear cinza claro (`#f0f2f5` para `#e5e9ee`) com padrão gráfico sutil de linhas onduladas curvas.

### 1.3 Card Central de Autenticação
- **Container:** Card branco, cantos arredondados (12px), sombra suave, largura máxima de ~420px centralizado vertical e horizontalmente.
- **Cabeçalho do Card:**
  - Título principal: **Login** (h2, negrito, cor `#212529`).
  - Subtítulo: "Entre com seu usuário e senha para continuar." (`#6c757d`, 14px).
- **Campos de Formulário:**
  - **Usuário:**
    - Ícone à esquerda: usuário (outline).
    - Campo de texto com placeholder: `"Digite seu nome de usuário"`.
    - Borda cinza clara arredondada (8px), foco azul Alvenius (`#0070ba`).
  - **Senha:**
    - Ícone à esquerda: cadeado (outline).
    - Campo do tipo password com placeholder: `"Digite sua senha"`.
- **Botão de Ação Primária:**
  - Largura 100%, fundo azul `#0070ba`, texto branco em negrito.
  - Ícone de seta para a direita `[->]` seguido do texto **"ENTRAR"**.
  - Efeito hover: azul escuro `#005b99`.
- **Rodapé do Card:**
  - Separador sutil ou espaçamento superior.
  - Texto de copyright centralizado (11px, cor `#6c757d`): `"© 2026 - Alvenius Tubos e Conexões - v1.3.1"`.

---

## 2. Tela de Menu Principal / Dashboard

### 2.1 Header Superior Global
- **Lado Esquerdo:** Logotipo 3 anéis + indicação da versão `v1.3.1`.
- **Centro:** Pill flutuante **"Rastreio de produtos"**.
- **Lado Direito:**
  - Saudação: "Bem vindo, **josuel**" (ou usuário logado).
  - Botão de saída: estilo outline/link com ícone de logout `[->]` e label **"Sair"**.

### 2.2 Card Principal / Menu Grid
- **Container Central:** Card branco amplo centralizado, cantos arredondados, borda sutil.
- **Título de Ação:** "Clique no que deseja fazer" (h3 centralizado, peso 600).
- **Grid de Módulos (2 colunas no desktop / 1 coluna no mobile):**
  1. **CADASTRO:**
     - Ícone: Caixa tridimensional com `+`.
     - Título: **CADASTRO**.
     - Descrição: "Cadastro Spool e componentes".
  2. **CALDEIRARIA:**
     - Ícone: Soldador / caldeiraria com chama/gota.
     - Título: **CALDEIRARIA**.
     - Descrição: "Ler QRCode Spool caldeiraria / próximas etapas processo".
  3. **REVESTIMENTO:**
     - Ícone: Bico de pulverização/spray com gotículas.
     - Título: **REVESTIMENTO**.
     - Descrição: "Ler QRCode Spool revestimento / próximas etapas processo".
  4. **PINTURA:**
     - Ícone: Rolo de pintura com demão.
     - Título: **PINTURA**.
     - Descrição: "Ler QRCode Spool pintura / próximas etapas processo".
  5. **VALIDAR QRCODE:**
     - Ícone: Moldura de QRCode com cantos destacados.
     - Título: **VALIDAR QRCODE**.
     - Descrição: "Ler QRCode e validar / campos spool e componentes".
  6. **TRANSFERÊNCIA:**
     - Ícone: Caminhão de transporte / carga.
     - Título: **TRANSFERÊNCIA**.
     - Descrição: "Ler QRCode e criar transferência / próximas etapas processo".
- **Botão Inferior de Destaque:**
  - Largura 100%, formato retangular com borda e cantos arredondados.
  - Ícone: Globo / Web.
  - Título: **IR PARA SITE ALVENIUS**.
  - Subtexto: "Empresa, Produtos, Orçamento, Catálogos, Contato, etc.".

---

## 3. Tela de Cadastro (Spool e Componentes)

### 3.1 Header com Navbar de Navegação
- **Topo:** Logo Alvenius, versão e título **"RASTREIO DE PRODUTOS"**.
- **Barra de Navegação Horizontal (Tabs/Links):**
  - Links: `INÍCIO`, `CADASTRO` (ativo/destacado com sublinhado ou pill azul), `CALDEIRARIA`, `REVESTIMENTO`, `PINTURA`, `VALIDAR QRCODE`, `TRANSFERÊNCIA`.
  - Direita: Perfil do usuário e botão `Sair`.
- **Pill Indicador de Rota:** Pill destacada com texto **"Cadastro"**.

### 3.2 Card de Cadastro
- **Faixa de Título:** Faixa cinza clara (`#eaedf1`) com texto em caixa alta: **SPOOL**.
- **Barra de Mensagem/Orientação:**
  - Caixa de alerta informativa (`#d1ecf1` com texto `#0c5460`), ícone `(i)`:
  - Texto: "Realiza o cadastro de Spool e componentes iniciar processo produção.".
- **Formulário SPOOL:**
  - Linha com 2 colunas ou layout flexível:
    - **Código:** Campo de texto (ex.: `SP-0414-00002-004`).
    - **Descrição:** Campo de texto descritivo longo.
- **Seção COMPONENTES:**
  - Barra de título cinza: **COMPONENTES**.
  - Tabela estruturada com cabeçalho cinza:
    - Coluna 1: **ITENS** (número do item / ID).
    - Coluna 2: **DESCRIÇÃO** (detalhamento do tubo, curva, flange, etc.).
    - Coluna 3: **QTD.** (quantidade unitária ou métrica).
  - Linhas da tabela com zebrado sutil e hover.
- **Barra de Ações (Footer do Card):**
  - Alinhamento à direita (ou distribuído):
    - Botão azul Alvenius: `[:#:] Ler QRCode`.
    - Botão cinza neutro: `[lixeira] Limpar`.
    - Botão verde de confirmação: `[disquete] Gravar`.

---

## 4. Tela de Caldeiraria (Processo e Listagem)

### 4.1 Header e Pill de Identificação
- Navbar com link `CALDEIRARIA` ativo.
- Pill central: **"Caldeiraria"**.

### 4.2 Card "Processo"
- **Barra de Informação (i):** "Leitura Spool, iniciar, finalizar e executar processo produção.".
- **Barra de Ação Rápida e Busca:**
  - Input de busca amplo com ícone de lupa: placeholder `"Buscar por código, status..."`.
  - Botão azul adjacente: `[:#:] Ler QRCode`.
- **Banner de Instrução:**
  - Faixa amarela clara/info com borda arredondada: "Clique no código SPOOL para continuar".

### 4.3 Acordeão de Métricas de Processos
- **Cabeçalho do Acordeão (Retrátil):**
  - Ícone de expansão `[^]` / recolhimento `[v]`.
  - Texto: **PROCESSOS | QTD.**.
  - Badge no canto direito com contador total: **TOTAL 1099** (badge azul `#0070ba` com texto branco).
- **Conteúdo Expandido (Lista com marcadores de cor):**
  1. `[ponto amarelo #f1c40f]` **Reservado (aguardando início)** -> badge `[0052]`
  2. `[ponto ciano #00bcd4]` **Execução (em processo produção)** -> badge `[0007]`
  3. `[ponto laranja #e67e22]` **Pausado (aguardando para continuar)** -> badge `[0002]`
  4. `[ponto cinza #95a5a6]` **Continua (retornar para execução)** -> badge `[0000]`
  5. `[ponto verde #27ae60]` **Finalizado (aguardando "Aprova CQ")** -> badge `[0062]`
  6. `[ponto verde-claro #8bc34a]` **Reversível (retorna início processo.)** -> badge `[0000]`
  7. `[ponto vermelho #e74c3c]` **Sucata (descarte do produto)** -> badge `[0000]`
  8. `[ponto azul #0070ba]` **Romaneio (aguardando próxima etapa)** -> badge `[0976]`
  - Linha Totalizadora: **TOTAL:** badge azul `[1099]`.

### 4.4 Filtro de Histórico de Sucata
- Toggle switch estilizado (on/off): "Click para exibir histórico de sucata".

### 4.5 Lista de Cards de Spool
- Card de item com borda arredondada e sombra:
  - **Cabeçalho do Card:**
    - Badge identificador sequencial cinza/azul: `0001`.
    - Tag de status ciano/azul: `Romaneio` (ou status correspondente).
  - **Dados Principais:**
    - **Código:** Link clicável em azul `SP-0414-00002-004`.
    - **Início:** `-- / -- / ---- às -- : --`
    - **Finalizado:** `-- / -- / ---- às -- : --`
    - **Descrição:** `Carretel FS+FF 32pol x 9,53 x 1015mm 150 PSI`
  - **Sub-seção:**
    - Texto secundário: `"00 Histórico de sucata:"` (expansível se toggle ativo).

---

## 5. Modal de Transferência

### 5.1 Estrutura do Modal
- **Backdrop:** Fundo escurecido semi-transparente (`rgba(0, 0, 0, 0.5)`).
- **Caixa de Diálogo Central:** Card branco centralizado com cantos arredondados (12px), largura máxima ~540px.
- **Header do Modal:**
  - Botão fechar `[X]` no canto superior direito.
  - Título centralizado: **"Selecione qual TIPO de TRANSFERÊNCIA"** (peso 600, 18px).

### 5.2 Opções de Seleção (Cards Interativos)
- **Opção 1 - COMPONENTE:**
  - Card retangular com borda cinza, hover com borda azul e sombra.
  - Ícone: Diamantes / peças de componentes.
  - Título: **COMPONENTE** (negrito, cor escura).
  - Subtítulo: "Transferência componente / próximas etapas processo".
- **Opção 2 - SPOOL:**
  - Card retangular com borda cinza, hover com borda azul e sombra.
  - Ícone: Caixa cúbica / carretel spool.
  - Título: **SPOOL** (negrito, cor escura).
  - Subtítulo: "Transferência spool / próximas etapas processo".

### 5.3 Rodapé do Modal
- Botão inferior centralizado ou à direita:
  - Estilo: Vermelho perigo / cancelar (`#dc3545`).
  - Ícone `[x]` com label **"Fechar"**.

---

## 6. Modal Leitor de QRCode

### 6.1 Estrutura do Modal e Backdrop
- **Backdrop:** Escurecido semi-transparente (`rgba(0, 0, 0, 0.65)`).
- **Container Central:** Card branco de largura média (~480px a ~520px), cantos arredondados (12px), centralizado na tela.

### 6.2 Cabeçalho
- **Pill/Título Superior:** Pílula arredondada em destaque com texto **"Leitor de QRCode"** (fundo branco ou azul claro, tipografia semibold).
- **Botão Fechar Rápido:** Botão `[X]` no canto superior direito.

### 6.3 Viewfinder da Câmera (Área de Leitura)
- **Painel da Câmera:**
  - Superfície retangular escura (`#0a0a0a` ou vídeo simulado da webcam).
  - Altura aproximada de 240px a 280px com cantos arredondados (8px).
- **Miras de Canto (Crosshair Corners):**
  - Quatro cantos demarcados no centro da área útil em tom ciano brilhante (`#00bcd4` / `#00d2ff`), com espessura de 3px a 4px e comprimento de 24px em cada direção.
- **Linha de Escaneamento (Scanning Laser):**
  - Linha horizontal ciano brilhante centralizada com efeito de brilho suave (`box-shadow: 0 0 8px rgba(0, 210, 255, 0.7)`), simulando varredura contínua ou ativa.

### 6.4 Painel de Instruções (Card de Orientações)
- **Container:** Caixa com fundo branco/cinza muito suave logo abaixo do visor.
- **Barra de Puxador (Handle):** Linha/barra arredondada sutil no topo (`#d2d8df`, 36px de largura por 4px de altura).
- **Mensagem de Instrução:**
  - Linha 1: Texto cinza médio regular: `"Ler o QRCode do Spool."`.
  - Linha 2: Texto em caixa alta e negrito: **"PARA SEGUIR processo produto."**.
- **Divisor:** Linha horizontal com gradiente azul (`linear-gradient(90deg, transparent, #0070ba, transparent)`).

### 6.5 Caixa do Último QRCode Lido
- **Container:** Bloco retangular com fundo levemente acinzentado (`#f8f9fa`), borda sutil (`#e5e9ee`) e cantos arredondados (6px).
- **Rótulo Superior:** `"Último QRCode lido:"` (12px, cor `#6c757d`).
- **Estado Inicial / Texto de Leitura:**
  - `"Aguardando leitura..."` em cor atenuada ou estilo itálico/mono.
  - Ao detectar código: texto em negrito escuro com badge de sucesso (ex.: `SP-0414-00002-004`).

### 6.6 Ação de Fechamento
- **Botão Inferior:**
  - Botão vermelho perigo / cancelar (`#dc3545`, hover `#c82333`).
  - Ícone de cruz `[x]` seguido de **"Fechar"**.

---

## 7. Diretrizes de Modularidade e Componentização

Para evitar concentração excessiva de código no `index.html` e garantir alta manutenibilidade, o frontend deve estruturar as interfaces em componentes de **responsabilidade única**:

### 7.1 Divisão Modular Recomendada
```
src/web/
├── index.html                    <- Shell leve da aplicação (apenas montagem e root containers)
├── style.css                     <- Estilos globais e tokens CSS
├── app.js                        <- Inicializador e roteamento simples de telas
├── components/
│   ├── header.js                 <- Barra superior global, pill flutuante, perfil e logout
│   ├── navbar.js                 <- Navegação por abas com destaque de rota ativa
│   ├── info-box.js               <- Banner informativo padronizado com ícone (i)
│   ├── accordion-processos.js    <- Acordeão retrátil com os 8 status e badges numéricas
│   ├── toggle-switch.js          <- Chave liga/desliga para histórico de sucata
│   └── spool-card.js             <- Card unitário com dados, status e histórico
├── views/
│   ├── view-login.js             <- Tela de autenticação e validações
│   ├── view-dashboard.js         <- Grid de 6 botões de ação e link externo
│   ├── view-cadastro.js          <- Formulário de Spool, tabela de componentes e ações
│   └── view-caldeiraria.js       <- Visão geral da caldeiraria, busca e listagem
└── modals/
    ├── modal-base.js             <- Estrutura genérica de backdrop, animação e fechamento
    ├── modal-transferencia.js    <- Diálogo de seleção (Componente vs Spool)
    └── modal-qrcode.js           <- Viewfinder de câmera, miras, laser e leitor simulado
```

### 7.2 Regras de Separação de Responsabilidade
1. **Shell Limpo:** `index.html` contém apenas a declaração de containers (`#app-header`, `#app-content`, `#app-modals`, `#app-toast`).
2. **Templates e Renderizadores Isolados:** Cada view e componente exporta sua função de renderização (`render()`) e vinculação de eventos (`mount()` / `bindEvents()`).
3. **Gerenciador de Modais:** Modais são montados e desmontados sob demanda no container `#app-modals`, permitindo reaproveitamento do `modal-qrcode` a partir do botão de busca da Caldeiraria, do botão do Cadastro ou do módulo de Validação de QRCode.

