# Guia de Design Visual — MVP Alvenius Rastreio de Produtos (v1)

Este documento estabelece as diretrizes de design, layout e arquitetura visual para orientar a implementação das telas do MVP no frontend (`spool-management-by-project-frontend`).

---

## 1. Identidade Visual e Filosofia de Interface

O sistema **Rastreio de Produtos (Spool Management)** é uma ferramenta industrial com foco em chão de fábrica e gestão de produção de carretéis (spools) e componentes. A interface deve ser clara, com alto contraste, excelente legibilidade e suporte tanto a desktops industriais quanto a tablets/coletores portáteis.

### 1.1 Cores Principais
- **Azul Primário Alvenius:** `#0070ba` (botões principais, destaques ativos, links).
- **Azul Escuro / Institucional:** `#005696` (cabeçalhos, badges totalizadoras).
- **Azul Escuro Profundo (Navy):** `#0d3b66` (textos de destaque e barras institucionais).
- **Azul Claro de Apoio:** `#e8f4fc` (fundos ativos e seleções).
- **Cinza de Fundo Global:** `#f0f2f5` (proporciona contraste com os cartões brancos).
- **Superfície dos Cartões:** `#ffffff` com borda sutil `#d2d8df` e cantos arredondados de 8px a 12px.

### 1.2 Paleta de Status dos Processos (Caldeiraria, Revestimento, Pintura)
Cada status possui uma cor de identificação rápida:
| Status | Cor Hex | Significado / Contexto |
|---|---|---|
| **Reservado** | `#f1c40f` (Amarelo) | Aguardando início |
| **Execução** | `#00bcd4` (Ciano) | Em processo de produção |
| **Pausado** | `#e67e22` (Laranja) | Aguardando para continuar |
| **Continua** | `#95a5a6` (Cinza) | Retornar para execução |
| **Finalizado** | `#27ae60` (Verde) | Aguardando Aprovação CQ |
| **Reversível** | `#8bc34a` (Verde-claro) | Retorna ao início do processo |
| **Sucata** | `#e74c3c` (Vermelho) | Descarte do produto |
| **Romaneio** | `#0070ba` (Azul) | Aguardando próxima etapa |

---

## 2. Tipografia e Espaçamentos

- **Família Tipográfica:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.
- **Escala de Tamanhos:**
  - `xs`: 11px (copyright, meta-informações secundárias).
  - `sm`: 12px (badges, versões, status secundários).
  - `base`: 14px (textos corridos, inputs, labels, tabelas).
  - `md`: 16px (botões primários, subtítulos, links de navegação).
  - `lg`: 18px (títulos de cartões, títulos modais).
  - `xl`: 20px (títulos de módulos).
  - `xxl`: 24px (título principal da tela de login).
- **Espaçamentos Padrão:**
  - Base de 4px: 4px, 8px, 12px, 16px, 24px, 32px.

---

## 3. Ícones Recomendados (SVG Inline)

Para garantir carregamento instantâneo e independência de conexões externas ou CDN:
- **Logo 3 Anéis Alvenius:** Três círculos entrelaçados estilizados com preenchimento em degradê ou linha contínua `#0070ba`.
- **Entrar / Sair:** Seta para a direita saindo de colchete ou retângulo (`M10 17l5-5-5-5...`).
- **Usuário:** Silhueta de cabeça e ombros.
- **Senha / Cadeado:** Arco superior e corpo do cadeado.
- **Cadastro:** Caixa cúbica com sinal de adição `+`.
- **Caldeiraria:** Soldador / arco elétrico com gota/chama.
- **Revestimento:** Pistola pulverizadora de spray.
- **Pintura:** Rolo de tinta com cabo.
- **Validar QRCode:** Mira quadrada de leitor com pontos de canto.
- **Transferência:** Caminhão furgão de transporte.
- **Site Alvenius:** Globo terrestre com meridianos.
- **Ler QRCode:** Símbolo de QR Code matricial.
- **Limpar:** Lixeira / trash can.
- **Gravar:** Ícone de disquete / save.
- **Fechar:** Ícone em cruz `✕`.

---

## 4. Componentes Base do Sistema

1. **Top Header & Navbar:**
   - Logotipo Alvenius + versão `v1.3.1`.
   - Barra com pílula de navegação central.
   - Menu com links em linha horizontal e destaque de página ativa.
   - Bloco de autenticação (usuário logado + botão de sair).

2. **Banner / Faixa Informativa (`info-box`):**
   - Fundo azul claro `#d1ecf1`, borda `#bee5eb`, texto `#0c5460` com ícone `(i)`.

3. **Painel de Processos Acordeão:**
   - Botão de cabeçalho expansível exibindo o totalizador.
   - Lista detalhada de status com marcador redondo (bullet colorido) e contador alinhado à direita.

4. **Card de Spool:**
   - Identificador numérico em destaque (ex.: `0001`).
   - Tag de status colorido no canto superior direito.
   - Código do produto em destaque clicável (`#0070ba`).
   - Datas de início e fim.
   - Descrição técnica do carretel.
   - Seção retrátil de sucata acionada por toggle switch.

5. **Modal de Transferência:**
   - Fundo escuro semitransparente, card centralizado, fechamento via tecla `Esc`, clique fora ou botão `✕`/`Fechar`.

6. **Modal Leitor de QRCode (Scanner):**
   - Viewfinder retangular escuro (`#0a0a0a`) simulando a área de captura da câmera.
   - Miras de canto nas 4 bordas em tom ciano (`#00bcd4` / `#00d2ff`).
   - Linha de varredura horizontal centralizada (efeito laser com glow).
   - Card inferior com handle, orientações "Ler o QRCode do Spool / PARA SEGUIR processo produto" e divisor gradiente azul.
   - Caixa informativa de "Último QRCode lido: Aguardando leitura...".
   - Botão inferior de fechamento em vermelho (`#dc3545`).

---

## 5. Diretrizes de Modularidade no Frontend

Para evitar manter todo o código concentrado no `index.html`, o frontend deve adotar uma estrutura modular baseada em responsabilidade única:
- **`src/web/index.html`**: Apenas o shell da aplicação com pontos de montagem (`#app-header`, `#app-content`, `#app-modals`).
- **`src/web/components/`**: Componentes reutilizáveis (Header/Navbar, InfoBox, Acordeão de Processos com os 8 status, ToggleSwitch, SpoolCard).
- **`src/web/views/`**: Módulos de telas individuais (Login, Dashboard, Cadastro, Caldeiraria).
- **`src/web/modals/`**: Modais autônomos invocados por eventos (`modal-transferencia`, `modal-qrcode`).
- **Comunicação por Eventos/Estado:** As ações de clique (ex.: botão `[:#:] Ler QRCode` no Cadastro ou na Caldeiraria) apenas invocam o `modal-qrcode` de forma compartilhada.

---

## 6. Artefatos de Suporte no Diretório

- `tokens.json`: Valores brutos de cores, tipografia, espaçamentos, raios e cores do scanner para uso no CSS.
- `wireframes.md`: Descrição estrutural de cada uma das 5 telas/estados da aplicação e dos 2 modais (Transferência e Leitor de QRCode), além da árvore modular recomendada.
