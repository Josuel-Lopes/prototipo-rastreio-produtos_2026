# Planejamento de Design: View de Proposta Comercial no App

Documento de especificação visual e estrutural para a implementação da tela navegável da Proposta Comercial no frontend do sistema `spool-management-by-project`.

---

## 1. Objetivo e Diretrizes da View no App

### 1.1 Objetivo
Disponibilizar uma visualização interativa, executiva e elegante da Proposta Comercial da MAXCODE42 para a Alvenius Tubos e Conexões diretamente dentro da aplicação, permitindo consulta ágil por gestores e exportação instantânea para formato PDF imprimível em padrão A4.

### 1.2 Declaração de Limite de Escopo (Aviso Mandatório)
> **Nota de Escopo:** Esta página interna (`/proposta` ou `proposta-view.js`) é um utilitário de visualização e apoio comercial interno do sistema. **Não faz parte do escopo técnico faturável nem dos entregáveis contratados das fases 0 a 6 do projeto Alvenius**. Seu desenvolvimento serve como catálogo vivo de requisitos e facilitador de apresentação comercial.

---

## 2. Paleta de Cores e Tokens Visuais

Baseado na identidade corporativa estabelecida em `proposals/proposta-template.json`:

| Token | Código HEX | Aplicação |
|---|---|---|
| `--color-navy` | `#0B2545` | Barras de título, cartões primários, cabeçalhos de tabela |
| `--color-royal` | `#1F4FD8` | Botões de ação primária, destaques, bordas ativas |
| `--color-royal-hover` | `#173EB0` | Hover de botões primários |
| `--color-industrial-gray` | `#5B6670` | Textos de apoio, subtítulos, bordas sutis |
| `--color-bg` | `#F2F4F7` | Fundo geral da página |
| `--color-surface` | `#FFFFFF` | Fundo de cards, seções e tabelas |
| `--color-border` | `#D0D5DD` | Divisores e contornos |
| `--color-success` | `#12B76A` | Tags de garantia e badges positivos |

---

## 3. Estrutura Visual e Componentes

A tela é organizada verticalmente em 7 blocos modulares contidos em um container centralizado de leitura (`max-width: 1080px`):

```
+--------------------------------------------------------------------------+
| BARRA SUPERIOR FIXA (Ações Rápidas)                                       |
| [Logo / Título]                         [ 📄 Salvar Proposta em PDF ]    |
+--------------------------------------------------------------------------+
| 1. CABEÇALHO EXECUTIVO                                                   |
|    - MAXCODE42 <-> Alvenius                                              |
|    - Código: PROP-2026-011 | Versão: 1.0 | Emissão: 24/11/2026           |
|    - Responsável Técnico: Josuel Lopes                                   |
+--------------------------------------------------------------------------+
| 2. SUMÁRIO EXECUTIVO & METAS DE NEGÓCIO                                  |
|    - 3 Destaques: Menos retrabalho | Decisão rápida | Operação simples    |
+--------------------------------------------------------------------------+
| 3. APRESENTAÇÃO MAXCODE42 (Grid de Métricas & Pilares)                   |
|    - [8+ Anos] [50 Repos] [26 Projetos] [100% Humano + IA]               |
|    - Pilares: Custo, Valor, Tempo, Qualidade                             |
|    - Engenharia: Clean Architecture, APIs, Zero Trust, LGPD              |
+--------------------------------------------------------------------------+
| 4. CATÁLOGO DAS FUNCIONALIDADES (Cards de Escopo)                        |
|    - Card por Módulo (1 a 5):                                            |
|      * Cabeçalho: Fase, Nome, Badges (Horas, Prazo, Valor)               |
|      * Objetivo de Negócio & Fluxo Passo a Passo                         |
|      * Área de Mockup / Wireframe / Diagrama de Fluxo                    |
+--------------------------------------------------------------------------+
| 5. TABELA CONSOLIDADA DE INVESTIMENTO & CRONOGRAMA                       |
|    - Grade de Fases 0 a 6 com Horas, Prazos e Valores                    |
|    - Totalizador Destacado: 248 h | 31 dias úteis | R$ 22.320,00         |
|    - Distribuição de Sprints & Marcos de Pagamento (30% / 40% / 30%)     |
+--------------------------------------------------------------------------+
| 6. GARANTIA, SUPORTE E NOVAS DEMANDAS                                    |
|    - 90 dias de garantia sem custo                                       |
|    - Taxa de novas demandas: R$ 90,00/h com aprovação prévia             |
+--------------------------------------------------------------------------+
| 7. BLOCO DE ACEITE E ASSINATURAS                                         |
|    - Alvenius Tubos e Conexões | MAXCODE42 (Josuel Lopes)                |
+--------------------------------------------------------------------------+
```

### 3.1 Detalhamento dos Componentes

#### A. Barra Superior Fixa (Action Bar)
- **Posição:** Fixa no topo em tela (desaparece na impressão).
- **Conteúdo à esquerda:** Tag "Proposta Comercial PROP-2026-011 · Alvenius".
- **Conteúdo à direita:**
  - Botão principal: **`[ 📄 Salvar Proposta em PDF ]`**
    - Estilo: Fundo `#1F4FD8`, texto branco, cantos arredondados (`radius: 8px`), ícone SVG de impressora/documento, sombra suave.
    - Efeito: Gatilho para `window.print()`.

#### B. Cabeçalho Executivo
- Exibição das duas marcas em destaque com divisor sutil.
- Metadados em grid de 4 colunas:
  - **Número:** PROP-2026-011
  - **Emissão:** 24/11/2026
  - **Validade:** 30 dias corridos
  - **Responsável Técnico:** Josuel Lopes (Full Stack Engineer)

#### C. Grid de Credenciais MAXCODE42
- 4 cards numéricos lado a lado:
  - `8+` Anos de experiência corporativa
  - `50` Repositórios ativos
  - `26` Projetos entregues
  - `100%` Parceria Humano + IA
- Tag list: Clean Architecture, APIs & Microsserviços, Cloud/Kubernetes, Segurança Zero Trust, LGPD e Continuous QA.

#### D. Cards de Funcionalidades (Fases 1 a 5)
Cada card possui:
- **Header:** Tag da Fase (`Fase 1: Rastreio de Produtos por QR Code`), badges laterais com `40 h`, `5 dias úteis`, `R$ 3.600,00`.
- **Corpo:**
  - *Problema resolvido / Objetivo*: Texto de negócio conciso.
  - *Fluxo operacional*: Lista numerada de 1 a 5 passos simples.
  - *Área de Preview Visual*: Espaço demarcado (`border: 1px dashed var(--color-border); background: #FAFBFD; border-radius: 8px; min-height: 120px;`) para ilustrações, diagramas ou screenshots conceituais.

#### E. Tabela Consolidada de Investimento e Sprints
- Tabela semântica `<table>` com cabeçalho azul marinho (`#0B2545`), linhas alternadas zebra e linha de rodapé com soma total (`R$ 22.320,00`).
- Cartões com visualização das Sprints (Sprint 1 a 4) e condições de pagamento (30% aprovação = R$ 6.696,00 / 40% Sprint 2 = R$ 8.928,00 / 30% homologação final = R$ 6.696,00).

#### F. Garantia e Novas Demandas
- Dois blocos em grid 2 colunas:
  - **Garantia 90 Dias Corridos:** Borda verde sutil, texto enfatizando correção sem custo de desvios do escopo homologado.
  - **Novas Demandas:** Taxa hora R$ 90,00/h, exigência de aprovação prévia por escrito, política de "sem cobrança surpresa".

---

## 4. Especificação de Estilos de Impressão para PDF (`@media print`)

A exportação para PDF é realizada acionando o diálogo nativo do navegador via `window.print()`. Para garantir um documento A4 corporativo, impecável e sem cortes erráticos, devem ser aplicadas as seguintes diretrizes CSS:

```css
@media print {
  /* 1. Reset de margens e fundo */
  @page {
    size: A4 portrait;
    margin: 15mm 12mm 15mm 12mm;
  }

  body {
    background: #FFFFFF !important;
    color: #1A1A1A !important;
    font-size: 11pt;
    line-height: 1.4;
  }

  /* 2. Ocultação de elementos da interface do sistema */
  .proposal-action-bar,
  .app-header,
  .app-sidebar,
  .app-navigation,
  .no-print {
    display: none !important;
  }

  /* 3. Controle do container para ocupar largura total da folha */
  .proposal-container {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }

  /* 4. Evitar quebras de página em meio a blocos críticos */
  .proposal-feature-card,
  .proposal-table-wrapper,
  .proposal-warranty-grid,
  .proposal-signatures {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 12pt;
  }

  /* 5. Tabela consolidada com repetição do cabeçalho caso quebre página */
  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  /* 6. Cores seguras para impressão de alto contraste */
  .proposal-badge,
  .proposal-stat-card {
    border: 1px solid #CCCCCC !important;
    box-shadow: none !important;
  }
}
```

---

## 5. Instruções de Implementação para o Frontend

1. **Localização do Componente:**
   - Criar `src/web/views/proposta-view.js` (ou componente modular equivalente consumido pelo router da aplicação).
2. **Origem dos Dados:**
   - Consumir o arquivo estruturado `proposals/proposta-template.json` via `fetch()` assíncrono ou importação modular, renderizando os valores dinamicamente.
3. **Interatividade do Botão PDF:**
   - Adicionar listener no botão `#btn-save-pdf`:
     ```javascript
     document.getElementById('btn-save-pdf').addEventListener('click', () => {
       window.print();
     });
     ```
4. **Isolamento de Estilos:**
   - Criar arquivo dedicado `src/web/css/proposta.css` ou encapsular sob classe `.view-proposta` para evitar poluição visual nas demais telas de produção.
