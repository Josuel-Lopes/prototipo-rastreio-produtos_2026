### Alvenius - Rastreio de Produtos e Gerenciamento de Spool por Projeto

#### Data: 24/11/2026

##### Developer: Josuel A. Lopes

<br/>

#### About

---

Projeto MVP de prototipagem e validação de interface para rastreio de produtos industriais, gerenciamento e cadastro de Spool por projeto (Alvenius Tubos e Conexões).
Construído com Vanilla HTML5, CSS3 moderno e JavaScript ES Modules, com mock client-side e conformidade com especificações industriais mobile-first (resolução base iPhone 390x844).

- HTML5
- CSS3 (Flexbox & CSS Grid)
- JavaScript (ES6+ Modules)
- Lucide Icons (SVG Inline)
- Mobile-First Industrial UI
- GitHub Pages

<br/>

#### Projeto: `Protótipo Rastreio de Produtos`

---

<br/>

#### 📋 Sumário

---

- [📋 Sumário](#-sumário)
- [📂 Arquitetura e diretórios](#-arquitetura-e-diretórios)
- [📦 Tecnologias e Pacotes](#-tecnologias-e-pacotes)
- [🧰 Estrutura da Aplicação](#-estrutura-da-aplicação)
- [🔥 Como executar localmente](#-como-executar-localmente)
- [📑 Padronização](#-padronização)
- [🚀 Publicação no GitHub Pages](#-publicação-no-github-pages)
- [🔖 Versionamento](#-versionamento)
- [📜 Licença](#-licença)

<br/>

#### 📂 Arquitetura e diretórios

---

Estrutura de pastas organizada para segregação clara entre especificações, documentação técnica, servidor de desenvolvimento e a aplicação estática frontend:

```text
.
├── docs/
│   ├── architecture/                   # Visão geral, fluxos, modelo de dados e governança
│   │   ├── decisions.md
│   │   ├── flows.md
│   │   ├── governanca-papeis-agentes.md
│   │   └── overview.md
│   └── designer/                       # Especificações visuais, tokens e wireframes
│       ├── fidelidade_menu_drawer_telas_internas/
│       ├── modal_leitor_qrcode_cadastro/
│       └── mvp_telas_base/
├── src/
│   ├── server/                         # Servidor HTTP estático nativo para desenvolvimento
│   │   └── index.js
│   └── web/                            # Aplicação SPA Frontend Vanilla
│       ├── index.html                  # Ponto de entrada único mobile-first
│       ├── app.js                      # Roteador SPA hash-based e inicialização
│       ├── style.css                   # Importador global de estilos
│       ├── assets/                     # Logos, ícones dos módulos e recursos visuais
│       ├── components/                 # Componentes de interface modulares e reutilizáveis
│       │   ├── header.js               # Header fixo com drawer lateral e navegação
│       │   ├── icons.js                # Renderizador inline de ícones Lucide SVG
│       │   ├── modal-qrcode.js         # Modal leitor e validador de QR Code
│       │   ├── modal-romaneio.js       # Modal industrial de aviso de Romaneio
│       │   ├── modal-transferencia.js  # Modal para movimentação de setor/etapa
│       │   ├── module-card.js          # Cartão de módulo para menu principal
│       │   ├── page-container.js       # Container padronizado de layout
│       │   ├── page-title.js           # Gerenciador da pill de título no header
│       │   ├── processes-accordion.js  # Acordeão retrátil de contadores de processos
│       │   ├── spool-card.js           # Card industrial de spool com datas e status
│       │   └── toast.js                # Notificações visuais flutuantes
│       ├── mocks/                      # Repositório de dados em memória client-side
│       │   └── spools-mock.js
│       ├── styles/                     # Estilos segregados por escopo
│       │   ├── components.css
│       │   ├── header.css
│       │   ├── main.css
│       │   ├── modals.css
│       │   └── views.css
│       └── views/                      # Telas da aplicação (renderizadas dinamicamente)
│           ├── cadastro-view.js
│           ├── caldeiraria-view.js
│           ├── login-view.js
│           ├── menu-view.js
│           ├── pintura-view.js
│           ├── process-stage-view.js   # Classe base para etapas produtivas fabris
│           └── revestimento-view.js
├── serve.sh                            # Script executável de inicialização rápida
├── package.json
└── README.md
```

<br/>

#### 📦 Tecnologias e Pacotes

---

- **HTML5**: Estruturação semântica adaptada a dispositivos industriais portáteis.
- **CSS3 Moderno**: CSS Custom Properties (variáveis de tema Alvenius), Layout Flexbox, CSS Grid e media queries para viewport mobile.
- **JavaScript (ES6+)**: Vanilla JS modular nativo (`type="module"`), dispensando etapas complexas de bundler/transpiler.
- **Lucide Icons**: Ícones vetoriais modernos renderizados como SVG Inline de alto desempenho.
- **Node.js**: Servidor nativo via módulo `node:http` para servir os arquivos estáticos durante o desenvolvimento.

<br/>

#### 🧰 Estrutura da Aplicação

---

A interface foi projetada como uma **Single Page Application (SPA)** leve e autossuficiente:

1. **Roteamento Hash-based**:
   - `#login`: Autenticação e entrada no sistema com validação de credenciais.
   - `#menu`: Hub central com cartões de acesso rápido aos módulos fabris e drawer lateral.
   - `#cadastro`: Formulário técnico de vinculação e registro de spools e componentes.
   - `#caldeiraria`: Lista de spools em processo, leitor de QR Code para inspeção e transferência de etapa.

2. **Gerenciamento de Estado**:
   - Estado em memória (`spools-mock.js`) simulando comunicação com backend industrial e persistência de ciclo de vida.
   - Histórico de eventos e alterações de status acessíveis de forma reativa na interface.

<br/>

#### 🔥 Como executar localmente

---

##### Pré-requisitos
- Node.js (versão 18+) **ou** Python 3 instalado na máquina.

##### Opção 1: Usando o servidor integrado Node.js (Recomendado)
```bash
# Inicialização via npm
npm start

# Ou via script bash
chmod +x serve.sh
./serve.sh
```
Acesse no navegador: [http://localhost:3000](http://localhost:3000)

##### Opção 2: Usando `npx serve`
```bash
npx serve src/web -l 3000
```

##### Opção 3: Usando Python 3
```bash
python3 -m http.server 3000 -d src/web
```

> **Dica Mobile DevTools**: No navegador (Chrome/Edge/Firefox), abra as ferramentas de desenvolvedor (`F12`), ative a emulação de dispositivos móveis e selecione a resolução **iPhone 12/13/14 Pro (390 x 844)** para visualização com fidelidade ao design industrial.

<br/>

#### 📑 Padronização

---

- **Mobile-First Industrial**: Densidade de toque ajustada para operação em piso de fábrica, botões com áreas mínimas de toque (44px) e contrastes em conformidade WCAG AA.
- **Convenção de Nomes**:
  - Arquivos e seletores CSS: `kebab-case`.
  - Módulos e funções JS: `camelCase` para instâncias/métodos e `PascalCase` para construtores e views.
- **Segregação de Estilos**: Variáveis globais em `styles/main.css`, elementos reutilizáveis em `styles/components.css` e especificidades de tela em `styles/views.css`.

<br/>

#### 🚀 Publicação no GitHub Pages

---

A aplicação é 100% estática e utiliza caminhos relativos em seus módulos e assets, sendo perfeitamente compatível com a hospedagem gratuita do **GitHub Pages**.

##### 1. Publicação automatizada via GitHub Actions (Recomendado)

Crie o arquivo de workflow `.github/workflows/deploy-pages.yml` no seu repositório:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master # ou main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Define o diretório onde index.html e assets estão localizados
          path: 'src/web'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

##### 2. Configuração no Repositório GitHub

1. Vá até as configurações do repositório no GitHub: **Settings > Pages**.
2. Na seção **Build and deployment**:
   - Em **Source**, selecione **GitHub Actions**.
3. Realize um push na branch principal (`master` ou `main`).
4. O GitHub Actions executará o deploy automaticamente e disponibilizará o link no painel:
   `https://<seu-usuario>.github.io/<nome-do-repositorio>/`

##### 3. Cuidados Essenciais com Rotas e Assets no GitHub Pages

- **Rotas SPA via Hash (`#`)**: Como o roteamento é baseado em `window.location.hash` (`#login`, `#menu`, `#cadastro`, etc.), o servidor do GitHub Pages sempre servirá o `index.html` na raiz sem disparar erros 404 de rotas inexistentes em recarregamentos de tela (`F5`).
- **Caminhos Relativos**: Todos os imports no JavaScript (`./components/...`) e links de CSS/imagens no HTML utilizam caminhos relativos (`./`), permitindo que a aplicação funcione tanto na raiz de um domínio quanto em subpastas de repositórios GitHub Pages.

<br/>

#### 🔖 Versionamento

---

Este projeto adota as convenções do [Semantic Versioning (SemVer)](https://semver.org/lang/pt-BR/):

- Versão Atual: **`v2.6.0`**

##### Histórico Recente

- **`v2.6.0`**:
  - Implementação da tela de **Transferência - Componente** (`copilot-image-fc3082.png`, `copilot-image-85fa22.png` e `copilot-image-93dd6b.png`):
    - Abertura direta a partir da seleção de "COMPONENTE" na Modal de Transferência.
    - PageTitle "Transferência" e PageContainer padrão Alvenius com banner informativo "Transferência - Componente".
    - Linha de ação superior com busca em tempo real por código, status, fornecedor ou data e botão azul "Criar Nova Transferência" com ícone circular de adição.
    - Componente modular e reutilizável `TransferCard`, projetado para suportar tanto transferências de "componente" quanto de "spool".
    - Expansão e colapso reativo da lista de itens vinculados (`codigo: ...`), com alternância fluida do ícone chevron (`v` e `^`).
    - Pipeline de progresso de status com 5 etapas encadeadas em formato chevron com clip-path CSS (`Aguardando SC`, `Aguardando PV`, `Aguardando ROM`, `Aguardando NF`, `Nota Emitida`), destacando visualmente a etapa corrente com preenchimento cromático e tipografia dedicada.
    - Mock de dados de transferências `transfers-mock.js` com múltiplas movimentações industriais e suporte à adição imediata de novos romaneios.
- **`v2.5.0`**:
  - Refinamento visual e funcional de alta fidelidade da Modal de Transferência (`copilot-image-d3e025.png`):
    - Diálogo retangular centralizado com bordas arredondadas (`border-radius: 8px`), sombra suave e botão 'X' vermelho superior direito.
    - Cabeçalho com título centralizado em duas linhas ("Selecione qual TIPO de TRANSFERÊNCIA") e linhas divisórias finas e sutis.
    - Card de seleção **COMPONENTE**: ícone geométrico exclusivo de 4 losangos vazados em azul industrial (`#1956ce`), tipografia com peso bold e descrição operacional de próximas etapas.
    - Card de seleção **SPOOL**: ícone de caixa/pacote em azul industrial (`#1956ce`), tipografia bold e descrição operacional de próximas etapas.
    - Botão inferior "Fechar" em vermelho (`#dc2626`) em largura total com cantos arredondados (6px), ícone de círculo com X (`circle-x`) e texto em branco.
    - Suporte completo a navegação via teclado (`Enter`, `Espaço`, `Escape`) e fechamento via backdrop ou botões.
- **`v2.4.0`**:
  - Implementação completa da Modal "Validar QRCode" (`copilot-image-bb7df0.png` e `copilot-image-aed5ce.png`):
    - Leitor de QRCode com visor de câmera, miras azuis fluorescentes, glow beam e animação laser.
    - Card de instruções com verificação de campos e dados (marcador asterisco vermelho).
    - Botão azul centralizado "Ler QRCode" com fluxo de simulação em tempo real.
    - Intercalação automática de dados validados a cada scan: alternância contínua entre Spools e Componentes técnicos rastreáveis.
    - Modal de Sucesso desacoplada: badge circular com checkmark verde, status de conformidade e validade, exibição dos dados detalhados e fechamento duplo (botão 'X' superior e botão 'Fechar' inferior).
    - Retorno fluido para o leitor exibindo o QRCode renderizado no visor e preenchimento dinâmico do card "Último QRCode lido".
    - Fechamento suave do leitor com retorno à tela Home / Menu.
- **`v2.3.0`**:
  - Componentização modular avançada:
    - `ProcessesAccordionComponent`: componente reutilizável do acordeão retrátil com os 8 status e contadores.
    - `ModalRomaneioComponent`: modal industrial desacoplado para aviso de Romaneio.
    - `ProcessStageView`: classe base padronizada para etapas de produção (Caldeiraria, Revestimento, Pintura), eliminando duplicação de código.
  - Diferenciação total e dados aleatorizados entre Caldeiraria, Revestimento e Pintura:
    - Peças e especificações técnicas exclusivas para cada etapa (corte/solda, FBE/3LPE/liners e poliuretano Petrobras N-1219/Vale).
    - Status operacionais, históricos de sucata e quantidades em lista independentes e não-idênticos.
    - Contadores e Totais Gerais fabris totalmente distintos e reativos (Caldeiraria: 1099, Revestimento: 748, Pintura: 524).
- **`v2.2.0`**:
  - Tela de Caldeiraria com fidelidade milimétrica a prints
  - Componente reutilizável SpoolCard com status e datas em 2 colunas
  - Acordeão expansível de processos com contadores
  - Histórico de sucata in-line controlado pelo toggle
  - Modal de leitura de QRCode da Caldeiraria com dados dinâmicos do Spool
  - Modal customizado para Romaneio
- **`v2.1.0`**:
  - Ajustes de conformidade visual, drawer de navegação e componentes modais
- **`v2.0.0`**:
  - Nova identidade visual, arquitetura modular e layout mobile-first industrial

<br/>

#### 📜 Licença

---

Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais informações.

