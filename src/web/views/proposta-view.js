/**
 * View da Proposta Comercial - Alvenius & MAXCODE42
 * Responsabilidade Única: Renderização executiva da proposta, catálogo de funcionalidades,
 * tabela consolidada de investimento e acionamento de impressão PDF (@media print).
 */

import { lucide } from '../components/icons.js';

export const PROPOSTA_DATA = {
  meta: {
    id: "PROP-2026-011",
    version: "1.0",
    issuedAt: "24/11/2026",
    validityDays: 30,
    currency: "BRL",
    hourlyRate: 90,
    hoursPerBusinessDay: 8,
    title: "Sistema de Rastreio de Produtos e Gestão de Spools"
  },
  proponent: {
    name: "MAXCODE42",
    url: "https://maxcode42.com.br",
    slogan: "Construindo seu software - Código limpo, produto no centro e entregas orgânicas contínuas.",
    stats: [
      { label: "Anos de experiência corporativa", value: "8+" },
      { label: "Repositórios ativos", value: "50" },
      { label: "Projetos entregues", value: "26" },
      { label: "Parceria Humano + IA", value: "100%" }
    ],
    pillars: ["Custo", "Valor", "Tempo", "Qualidade"],
    engineering: [
      "Clean Architecture",
      "APIs & Microsserviços",
      "Cloud/Kubernetes",
      "Segurança Zero Trust",
      "LGPD",
      "Continuous QA"
    ],
    responsible: {
      name: "Josuel Lopes",
      url: "https://josuellopes.maxcode42.com.br",
      role: "Desenvolvedor Full Stack & Arquiteto",
      bio: "8+ anos em engenharia de software corporativa, arquitetura de sistemas, Node.js, React, TypeScript, APIs RESTful e IA contextual."
    }
  },
  client: {
    name: "Alvenius Tubos e Conexões",
    url: "https://alvenius.ind.br",
    about: "Líder em sistemas de tubulações ranhuradas (grooved), spools industriais, caldeiraria e revestimentos."
  },
  executiveSummary: {
    context: "A Alvenius é líder em sistemas de tubulações ranhuradas (grooved), spools industriais, caldeiraria e revestimentos. Quanto maior o volume de peças, maior o desafio de saber onde cada spool está, em que etapa e quanto custou. Esta proposta entrega controle em tempo real da produção, do pedido à expedição, com poucos cliques e sem papel.",
    outcomes: [
      {
        icon: "circle-check",
        title: "Menos retrabalho e perdas",
        desc: "Cada peça tem histórico completo rastreável, etapas registradas e operador responsável identificado."
      },
      {
        icon: "zap",
        title: "Decisão rápida e assertiva",
        desc: "Painel único da fábrica em tempo real para diretores e gerentes, eliminando esperas por relatórios manuais."
      },
      {
        icon: "scan-line",
        title: "Operação simples no chão de fábrica",
        desc: "Uso intuitivo por celular ou tablet via leitura óptica de QR Code diretamente na bancada de produção."
      }
    ]
  },
  features: [
    {
      id: "qr-rastreio",
      phase: 1,
      title: "Rastreio de Produtos por QR Code",
      businessGoal: "Saber em segundos o que é, onde está e em que etapa está cada peça, eliminando planilhas físicas e perdas no fluxo fabril.",
      steps: [
        "O sistema gera uma etiqueta padronizada com QR Code para cada spool ou componente cadastrado.",
        "O encarregado cola a etiqueta física na peça ao iniciar o processo de corte e montagem.",
        "A cada etapa (corte, solda, caldeiraria, revestimento, pintura, expedição), o operador lê o QR Code pelo celular.",
        "Confirma a transição de etapa com um toque; o sistema registra data, hora, bancada e responsável.",
        "O histórico cronológico completo da peça fica permanentemente disponível para consulta e auditoria."
      ],
      hours: 40,
      businessDays: 5,
      price: 3600,
      mockups: [
        {
          title: "Leitura do QR Code",
          desc: "Interface mobile responsiva de scanner óptico na bancada",
          svgType: "scanner"
        },
        {
          title: "Etiqueta Térmica",
          desc: "Padrão de código e metadados impressos na peça",
          svgType: "label"
        },
        {
          title: "Fluxo de Etapas",
          desc: "Corte → Solda → Caldeiraria → Revestimento → Pintura",
          svgType: "flow"
        }
      ]
    },
    {
      id: "gestao-spools",
      phase: 2,
      title: "Gestão de Spools e Projetos",
      businessGoal: "Proporcionar visão agregada por pedido e projeto fabril para garantir cumprimento estrito dos prazos de entrega acordados com os clientes.",
      steps: [
        "O gerente cadastra o projeto/pedido e seus spools correspondentes (ou importa lista padronizada).",
        "Define prazos de entrega, prioridade de atendimento e encarregado responsável pela ordem.",
        "O encarregado visualiza a fila diária de trabalho organizada e atualiza o andamento das frentes.",
        "O sistema calcula automaticamente o percentual consolidado de conclusão do projeto.",
        "Atrasos e pendências críticas são sinalizados visualmente com alertas em cores de alta prioridade."
      ],
      hours: 40,
      businessDays: 5,
      price: 3600,
      mockups: [
        {
          title: "Visão por Projeto",
          desc: "Progresso consolidado, spools liberados e pendências",
          svgType: "progress"
        },
        {
          title: "Ficha do Spool",
          desc: "Dimensões, peso, desenhos técnicos e histórico de movimentações",
          svgType: "spool-detail"
        },
        {
          title: "Hierarquia Fabril",
          desc: "Projeto → Spool → Componentes → Rota de Produção",
          svgType: "hierarchy"
        }
      ]
    },
    {
      id: "sucata-retrabalho",
      phase: 3,
      title: "Controle de Sucata e Retrabalho",
      businessGoal: "Tornar transparente e quantificável o custo oculto de materiais descartados ou reprocessados, identificando causas raízes para melhoria contínua.",
      steps: [
        "Ao identificar não conformidade na leitura do QR Code, o operador aciona 'Sucata' ou 'Retrabalho'.",
        "Seleciona o motivo em lista categorizada pré-configurada e, opcionalmente, anexa foto da evidência.",
        "O sistema abre a ocorrência de não conformidade automaticamente e notifica a gestão de qualidade.",
        "Ao sanar a falha ou reaproveitar o material, o encarregado registra o desfecho e encerra o chamado.",
        "Relatórios executivos consolidam causas recorrentes e mensuram o impacto financeiro das perdas."
      ],
      hours: 36,
      businessDays: 4.5,
      price: 3240,
      mockups: [
        {
          title: "Formulário de Ocorrência",
          desc: "Registro ágil de desvio, seleção de causa raiz e foto",
          svgType: "incident"
        },
        {
          title: "Análise de Motivos",
          desc: "Gráfico de pareto de perdas por posto e matéria-prima",
          svgType: "chart"
        }
      ]
    },
    {
      id: "painel-gerencial",
      phase: 4,
      title: "Painel Gerencial Executivo",
      businessGoal: "Oferecer aos diretores e gerentes uma torre de controle centralizada com indicadores em tempo real, eliminando a dependência de relatórios manuais.",
      steps: [
        "Gestores acessam o painel de bordo por qualquer navegador no computador, tablet ou celular.",
        "Acompanham volume de spools em trânsito por bancada, entregas no prazo, gargalos e índice de retrabalho.",
        "Filtram informações dinamicamente por número de projeto, cliente contratante ou faixa temporal.",
        "Exportam relatórios consolidados em formato PDF executivo ou planilha de dados sob demanda."
      ],
      hours: 48,
      businessDays: 6,
      price: 4320,
      mockups: [
        {
          title: "Dashboard em Tempo Real",
          desc: "KPIs operacionais, spools por fase e gargalos de produção",
          svgType: "dashboard"
        },
        {
          title: "Exportação Gerencial",
          desc: "Relatórios consolidados para diretoria em PDF e planilha",
          svgType: "report"
        }
      ]
    },
    {
      id: "integracao-erp",
      phase: 5,
      title: "Integração com o ERP / Sistema Legado",
      businessGoal: "Eliminar retrabalho de digitação dupla entre sistemas, mitigando inconsistências cadastrais e otimizando o fluxo de faturamento e expedição.",
      steps: [
        "O sistema consome pedidos de produção e ordens de fabricação já existentes no ERP Alvenius.",
        "Durante a jornada na fábrica, as etapas de produção concluídas retroalimentam a rastreabilidade interna.",
        "Na expedição final do spool com romaneio liberado, o status final é sincronizado com o ERP.",
        "Mecanismo de resiliência registra eventuais falhas transitórias de conexão e efetua reenvio automático."
      ],
      hours: 36,
      businessDays: 4.5,
      price: 3240,
      assumption: "A Alvenius disponibiliza credenciais de acesso, ambiente de testes e documentação dos endpoints do sistema legado a ser integrado.",
      mockups: [
        {
          title: "Diagrama de Integração",
          desc: "Fluxo bidirecional via API REST segura entre ERP e App",
          svgType: "integration"
        },
        {
          title: "Monitor de Sincronismo",
          desc: "Fila de mensagens, logs de auditoria e reprocessamento",
          svgType: "monitor"
        }
      ]
    }
  ],
  investment: {
    phases: [
      { phase: 0, name: "Descoberta, alinhamento técnico e design das interfaces", hours: 24, businessDays: 3, price: 2160 },
      { phase: 1, name: "Rastreio de Produtos por QR Code", hours: 40, businessDays: 5, price: 3600 },
      { phase: 2, name: "Gestão de Spools e Projetos", hours: 40, businessDays: 5, price: 3600 },
      { phase: 3, name: "Controle de Sucata e Retrabalho", hours: 36, businessDays: 4.5, price: 3240 },
      { phase: 4, name: "Painel Gerencial Executivo", hours: 48, businessDays: 6, price: 4320 },
      { phase: 5, name: "Integração com ERP / Sistema Legado", hours: 36, businessDays: 4.5, price: 3240 },
      { phase: 6, name: "Homologação, treinamento de usuários e entrada em produção", hours: 24, businessDays: 3, price: 2160 }
    ],
    totals: { hours: 248, businessDays: 31, approxWeeks: 6, price: 22320 },
    sprints: [
      { sprint: 1, title: "Sprint 1 (Fundação & Rastreio)", phases: "Fases 0 e 1", businessDays: 8, deliverables: "Design System, Arquitetura e Rastreio QR Code" },
      { sprint: 2, title: "Sprint 2 (Gestão de Produção)", phases: "Fase 2", businessDays: 5, deliverables: "Módulo de Spools, Ordens de Serviço e Projetos" },
      { sprint: 3, title: "Sprint 3 (Qualidade & Painel)", phases: "Fases 3 e 4", businessDays: 10.5, deliverables: "Controle de Sucata e Dashboard Gerencial" },
      { sprint: 4, title: "Sprint 4 (Integração & Go-Live)", phases: "Fases 5 e 6", businessDays: 7.5, deliverables: "Conector ERP, Homologação e Virada de Produção" }
    ],
    payment: [
      { milestone: "Aprovação formal da proposta comercial", percent: 30, amount: 6696, trigger: "Assinatura do contrato e início da Sprint 1" },
      { milestone: "Entrega e demonstração da Sprint 2", percent: 40, amount: 8928, trigger: "Conclusão das rotas de spools e transferência" },
      { milestone: "Homologação final e entrada em produção", percent: 30, amount: 6696, trigger: "Aceite de conformidade e liberação do sistema" }
    ]
  },
  postDelivery: {
    homologation: {
      responseBusinessDays: 5,
      rule: "A Alvenius valida cada funcionalidade entregue em até 5 dias úteis. As funcionalidades aprovadas formalmente passam a constituir o escopo homologado oficial do projeto."
    },
    warranty: {
      days: 90,
      coverage: "90 dias corridos de garantia integral pós-go-live cobrindo correção de eventuais desvios em relação ao escopo homologado sem qualquer custo adicional.",
      support: "Canais dedicados via e-mail e WhatsApp em dias úteis no horário comercial (8h às 18h), com SLA de primeiro atendimento de até 1 dia útil."
    },
    newRequests: {
      hourlyRate: 90,
      rule: "Quaisquer solicitações de funcionalidades adicionais ou alterações posteriores ao escopo homologado serão orçadas separadamente na taxa padrão de R$ 90,00/h. Toda demanda adicional contempla estimativa técnica formal prévia com discriminação de frentes (Backend, Frontend, Designer, Database e Testes) e somente será executada após aprovação formal por escrito pela Alvenius."
    }
  },
  assumptions: [
    "Disponibilidade de um interlocutor técnico da Alvenius para sanar dúvidas e validar entregas em homologação.",
    "Fornecimento tempestivo de credenciais, dados de amostra e documentação para integração com o ERP.",
    "Infraestrutura local de rede (Wi-Fi/4G) e dispositivos móveis (smartphones/tablets) operacionais na fábrica."
  ],
  outOfScope: [
    "Aquisição e fornecimento de hardware (smartphones, impressoras térmicas, etiquetas físicas ou leitores externos).",
    "Custos de hospedagem e contratação direta de infraestrutura em nuvem (servidores/banco de dados).",
    "Desenvolvimento de funcionalidades personalizadas não previstas nas Fases 0 a 6 deste documento.",
    "Treinamento presencial continuado além da carga horária prevista na Fase 6."
  ]
};

export class PropostaView {
  constructor(containerId = 'app-view', options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="view-proposta-wrapper">
        
        <!-- 1. Barra Superior Fixa de Ações (Action Bar - no-print) -->
        <header class="proposal-action-bar no-print" role="region" aria-label="Ações Rápidas da Proposta">
          <div class="proposal-bar-left">
            <button class="btn-bar-nav" id="btn-back-menu" title="Voltar ao Menu Principal">
              ${lucide('arrow-left', { size: 16, strokeWidth: 2 })}
              <span>Voltar</span>
            </button>
            <span class="proposal-bar-tag" title="Proposta Comercial ${PROPOSTA_DATA.meta.id} · Alvenius">
              ${lucide('file-text', { size: 14, strokeWidth: 2 })}
              <span class="proposal-bar-tag-text">Proposta Comercial ${PROPOSTA_DATA.meta.id} · Alvenius</span>
            </span>
          </div>
          <div class="proposal-bar-right">
            <button class="btn-save-pdf" id="btn-save-pdf" title="Gerar e salvar proposta em formato PDF A4" aria-label="Salvar Proposta em PDF">
              ${lucide('printer', { size: 18, strokeWidth: 2 })}
              <span class="btn-label-full">Salvar Proposta em PDF</span>
              <span class="btn-label-short" aria-hidden="true">Salvar PDF</span>
            </button>
          </div>
        </header>

        <!-- Container de Apresentação e Leitura -->
        <main class="proposal-container">
          <article class="proposal-sheet">
            
            <!-- Aviso Mandatório de Limite de Escopo -->
            <aside class="proposal-scope-notice no-print" role="note">
              ${lucide('info', { size: 20, strokeWidth: 2, className: 'flex-shrink-0' })}
              <div>
                <strong>Nota de Escopo:</strong> Esta página interna é um utilitário de visualização e apoio comercial interno do sistema. 
                Não faz parte do escopo técnico faturável nem dos entregáveis contratados das fases 0 a 6 do projeto Alvenius. 
                Seu desenvolvimento serve como catálogo vivo de requisitos e facilitador de apresentação comercial.
              </div>
            </aside>

            <!-- BLOCO 1: Cabeçalho Executivo -->
            <section class="proposal-header">
              <div class="proposal-header-brands">
                <!-- Marca Alvenius (Contratante) -->
                <div class="brand-alvenius-box">
                  <img src="assets/logo-alvenius-rings-clean.png" alt="Alvenius Tubos e Conexões" class="brand-alvenius-logo">
                  <div class="brand-alvenius-info">
                    <h2>${PROPOSTA_DATA.client.name}</h2>
                    <p>${PROPOSTA_DATA.client.about}</p>
                  </div>
                </div>

                <div class="brand-versus-divider">em parceria com</div>

                <!-- Marca MAXCODE42 (Proponente) -->
                <div class="brand-maxcode-box">
                  <img src="assets/icon-maxcode42.png" alt="MAXCODE42" class="brand-maxcode-icon" width="180" height="180">
                  <div class="brand-maxcode-info">
                    <div class="brand-maxcode-title">
                      <span class="brand-maxcode-name">${PROPOSTA_DATA.proponent.name}</span>
                      <span class="brand-maxcode-badge">Software House</span>
                    </div>
                    <div class="brand-maxcode-slogan">${PROPOSTA_DATA.proponent.slogan}</div>
                  </div>
                </div>
              </div>

              <!-- Banner de Título do Projeto -->
              <div class="proposal-main-title-box">
                <h1>${PROPOSTA_DATA.meta.title}</h1>
                <p>Proposta Comercial de Engenharia de Software e Rastreabilidade Fabril</p>
              </div>

              <!-- Grid de Metadados Executivos -->
              <div class="proposal-meta-grid">
                <div class="proposal-meta-card">
                  <div class="proposal-meta-label">Identificador / Versão</div>
                  <div class="proposal-meta-value highlight">${PROPOSTA_DATA.meta.id} · v${PROPOSTA_DATA.meta.version}</div>
                </div>
                <div class="proposal-meta-card">
                  <div class="proposal-meta-label">Data de Emissão</div>
                  <div class="proposal-meta-value">${PROPOSTA_DATA.meta.issuedAt}</div>
                </div>
                <div class="proposal-meta-card">
                  <div class="proposal-meta-label">Prazo de Validade</div>
                  <div class="proposal-meta-value">${PROPOSTA_DATA.meta.validityDays} dias corridos</div>
                </div>
                <div class="proposal-meta-card">
                  <div class="proposal-meta-label">Responsável Técnico</div>
                  <div class="proposal-meta-value proposal-meta-person">
                    ${this.renderDevAvatar('dev-avatar--sm')}
                    <span>${PROPOSTA_DATA.proponent.responsible.name}</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- BLOCO 2: Sumário Executivo & Metas de Negócio -->
            <section class="proposal-section">
              <div class="proposal-section-header">
                <span class="proposal-section-num">1</span>
                <h2>Sumário Executivo & Metas de Negócio</h2>
              </div>
              
              <p class="proposal-context-text">${PROPOSTA_DATA.executiveSummary.context}</p>

              <div class="proposal-goals-grid">
                ${PROPOSTA_DATA.executiveSummary.outcomes.map(goal => `
                  <div class="proposal-goal-card">
                    <div class="goal-card-icon">
                      ${lucide(goal.icon, { size: 24, strokeWidth: 2 })}
                    </div>
                    <div class="goal-card-title">${goal.title}</div>
                    <p class="goal-card-desc">${goal.desc}</p>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- BLOCO 3: Apresentação MAXCODE42 -->
            <section class="proposal-section">
              <div class="proposal-section-header">
                <span class="proposal-section-num">2</span>
                <h2>Apresentação MAXCODE42 & Engenharia</h2>
              </div>

              <!-- Faixa de Identidade MAXCODE42 -->
              <div class="maxcode-intro-banner">
                ${this.renderMaxcodeLogo('brand-maxcode-logo-plate--banner')}
                <p class="maxcode-intro-slogan">${PROPOSTA_DATA.proponent.slogan}</p>
              </div>

              <!-- 4 Cards Numéricos de Destaque -->
              <div class="metrics-grid">
                ${PROPOSTA_DATA.proponent.stats.map(s => `
                  <div class="metric-card">
                    <div class="metric-number">${s.value}</div>
                    <div class="metric-label">${s.label}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Pilares & Engenharia -->
              <div class="maxcode-pillars-box">
                <div class="pillars-title">Nossos 4 Pilares Fundamentais:</div>
                <div class="pillars-list">
                  ${PROPOSTA_DATA.proponent.pillars.map(p => `
                    <span class="pillar-badge">${p}</span>
                  `).join('')}
                </div>
                
                <div class="pillars-title" style="margin-top: 14px;">Arquitetura & Boas Práticas Adotadas:</div>
                <div class="engineering-tags-box">
                  ${PROPOSTA_DATA.proponent.engineering.map(eng => `
                    <span class="engineering-tag">
                      ${lucide('check', { size: 14, strokeWidth: 2.2, stroke: '#12B76A' })}
                      ${eng}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Responsável Técnico -->
              <div class="lead-profile-card">
                ${this.renderDevAvatar('dev-avatar--lg')}
                <div class="lead-info-text">
                  <h4>${PROPOSTA_DATA.proponent.responsible.name} - <span style="font-weight: 500; color: #1E3A8A;">${PROPOSTA_DATA.proponent.responsible.role}</span></h4>
                  <p>${PROPOSTA_DATA.proponent.responsible.bio}</p>
                </div>
              </div>
            </section>

            <!-- BLOCO 4: Catálogo das Funcionalidades (Fases 1 a 5) -->
            <section class="proposal-section">
              <div class="proposal-section-header">
                <span class="proposal-section-num">3</span>
                <h2>Catálogo de Funcionalidades Propostas (Fases 1 a 5)</h2>
              </div>

              <!-- Metodologia Multidisciplinar -->
              <div class="methodology-box">
                <h4>Metodologia Multidisciplinar de Estimativa & Matriz de Correlação</h4>
                <p>
                  Cada funcionalidade é decomposta em 5 frentes técnicas essenciais: 
                  <strong>Backend</strong>, <strong>Frontend</strong>, <strong>Designer UX/UI</strong>, <strong>Database</strong> e <strong>Continuous QA</strong>. 
                  A precificação respeita rigorosamente a taxa hora de <strong>R$ 90,00</strong> (jornada de 8h/dia útil), contemplando cálculo de correlação de impacto e reaproveitamento de componentes entre fases.
                </p>
              </div>

              <!-- Lista de Cards das Fases 1 a 5 -->
              <div class="features-list">
                ${PROPOSTA_DATA.features.map(f => this.renderFeatureCard(f)).join('')}
              </div>
            </section>

            <!-- BLOCO 5: Tabela Consolidada de Investimento & Cronograma -->
            <section class="proposal-section">
              <div class="proposal-section-header">
                <span class="proposal-section-num">4</span>
                <h2>Quadro Consolidado de Investimento & Cronograma</h2>
              </div>

              <div class="table-wrapper">
                <table class="proposal-table" aria-label="Tabela Consolidada de Fases e Investimento">
                  <thead>
                    <tr>
                      <th style="width: 70px;" class="text-center">Fase</th>
                      <th>Etapa / Módulo de Entrega</th>
                      <th class="text-center" style="width: 90px;">Horas</th>
                      <th class="text-center" style="width: 140px;">Prazo (dias úteis)</th>
                      <th class="text-right" style="width: 130px;">Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${PROPOSTA_DATA.investment.phases.map(item => `
                      <tr>
                        <td class="text-center cell-phase" data-label="Fase"><strong>${item.phase}</strong></td>
                        <td class="cell-name" data-label="Etapa / Módulo">${item.name}</td>
                        <td class="text-center" data-label="Horas">${item.hours} h</td>
                        <td class="text-center" data-label="Prazo (dias úteis)">${item.businessDays} d</td>
                        <td class="text-right" data-label="Valor (R$)">R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="text-center cell-total-title" colspan="2">TOTAL CONSOLIDADO DO PROJETO</td>
                      <td class="text-center" data-label="Horas">${PROPOSTA_DATA.investment.totals.hours} h</td>
                      <td class="text-center" data-label="Prazo">${PROPOSTA_DATA.investment.totals.businessDays} dias úteis (~${PROPOSTA_DATA.investment.totals.approxWeeks} semanas)</td>
                      <td class="text-right total-price" data-label="Valor Total">R$ ${PROPOSTA_DATA.investment.totals.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <!-- Sprints de Execução -->
              <div class="sprints-container">
                <div class="sprints-title">Ciclos de Entrega em Sprints Ágeis (2 semanas):</div>
                <div class="sprints-grid">
                  ${PROPOSTA_DATA.investment.sprints.map(s => `
                    <div class="sprint-card">
                      <div class="sprint-tag">Sprint ${s.sprint}</div>
                      <div class="sprint-phases">${s.phases}</div>
                      <div class="sprint-days">${s.businessDays} dias úteis</div>
                      <div style="font-size: 11px; color: #475569; margin-top: 6px;">${s.deliverables}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Condições de Pagamento -->
              <div class="payment-milestones-box">
                <div class="payment-title">Condições de Pagamento Vinculadas a Entregas:</div>
                <div class="payment-cards-grid">
                  ${PROPOSTA_DATA.investment.payment.map(p => `
                    <div class="payment-card">
                      <div class="payment-percent">${p.percent}%</div>
                      <div class="payment-milestone-name">${p.milestone}</div>
                      <div class="payment-amount">R$ ${p.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                      <div style="font-size: 11px; color: #64748B; margin-top: 4px;">Gatilho: ${p.trigger}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </section>

            <!-- BLOCO 6: Garantia, Suporte e Novas Demandas -->
            <section class="proposal-section">
              <div class="proposal-section-header">
                <span class="proposal-section-num">5</span>
                <h2>Garantia, Suporte, Homologação & Novas Demandas</h2>
              </div>

              <div class="warranty-grid">
                <!-- Garantia e Suporte -->
                <div class="warranty-card green-accent">
                  <div class="warranty-card-header">
                    ${lucide('circle-check', { size: 22, stroke: '#12B76A' })}
                    <h3>Garantia de 90 Dias & Suporte Ágil</h3>
                  </div>
                  <div class="warranty-card-body">
                    <p><strong>${PROPOSTA_DATA.postDelivery.warranty.coverage}</strong></p>
                    <p style="margin-top: 8px;">${PROPOSTA_DATA.postDelivery.warranty.support}</p>
                    <p style="margin-top: 8px; font-size: 12px; color: #64748B;">
                      <strong>Rito de Homologação:</strong> ${PROPOSTA_DATA.postDelivery.homologation.rule} (Prazo de validação: ${PROPOSTA_DATA.postDelivery.homologation.responseBusinessDays} dias úteis por entrega).
                    </p>
                  </div>
                </div>

                <!-- Novas Demandas -->
                <div class="warranty-card royal-accent">
                  <div class="warranty-card-header">
                    ${lucide('layers', { size: 22, stroke: '#1F4FD8' })}
                    <h3>Evoluções & Novas Demandas (Sem Surpresa)</h3>
                  </div>
                  <div class="warranty-card-body">
                    <p>${PROPOSTA_DATA.postDelivery.newRequests.rule}</p>
                    <ul class="warranty-list" style="margin-top: 8px;">
                      <li>Taxa hora acordada: <strong>R$ ${PROPOSTA_DATA.postDelivery.newRequests.hourlyRate.toFixed(2)} / hora</strong></li>
                      <li>Estimativa prévia formal por disciplina técnica</li>
                      <li>Início das atividades condicionado a autorização formal prévia</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Premissas e Limites de Escopo -->
              <div class="assumptions-grid">
                <div class="assumptions-card">
                  <h4>Premissas do Projeto</h4>
                  <ul>
                    ${PROPOSTA_DATA.assumptions.map(a => `<li>${a}</li>`).join('')}
                  </ul>
                </div>

                <div class="assumptions-card">
                  <h4>Fora do Escopo Contratado</h4>
                  <ul>
                    ${PROPOSTA_DATA.outOfScope.map(o => `<li>${o}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </section>

            <!-- BLOCO 7: Bloco Formal de Aceite e Assinaturas -->
            <section class="signatures-box" aria-label="Aceite Formal da Proposta Comercial">
              <div class="signatures-title">Aceite Formal da Proposta Comercial</div>
              
              <div class="signatures-grid">
                <!-- Assinatura Contratante -->
                <div class="signature-card">
                  <div class="signature-party">${PROPOSTA_DATA.client.name} (Contratante)</div>
                  <div class="signature-line"></div>
                  <div class="signature-label">Nome do Responsável / Cargo:</div>
                  <div class="signature-field signature-blank">________________________________________________</div>
                  
                  <div class="signature-label" style="margin-top: 14px;">Data de Aceite:</div>
                  <div class="signature-field">______ / ______ / 2026</div>

                  <div class="signature-label" style="margin-top: 14px;">Assinatura:</div>
                  <div class="signature-field signature-blank" style="color: #94A3B8;">________________________________________________</div>
                </div>

                <!-- Assinatura Proponente -->
                <div class="signature-card">
                  <div class="signature-party signature-party--logo">
                    ${this.renderMaxcodeLogo('brand-maxcode-logo-plate--sm')}
                    <span>(Proponente)</span>
                  </div>
                  <div class="signature-line"></div>
                  <div class="signature-label">Nome do Responsável / Cargo:</div>
                  <div class="signature-field"><strong>${PROPOSTA_DATA.proponent.responsible.name}</strong> · Arquiteto de Software</div>
                  
                  <div class="signature-label" style="margin-top: 14px;">Data de Emissão:</div>
                  <div class="signature-field">${PROPOSTA_DATA.meta.issuedAt}</div>

                  <div class="signature-label" style="margin-top: 14px;">Assinatura:</div>
                  <div class="signature-field signature-blank" style="color: #94A3B8;">________________________________________________</div>
                </div>
              </div>

              <footer class="proposal-footer">
                <div class="proposal-footer-brand">
                  <span class="brand-maxcode-logo-plate brand-maxcode-logo-plate--footer">
                    <img src="assets/logo-maxcode42-stacked.png" alt="MAXCODE42" class="brand-maxcode-logo brand-maxcode-logo--stacked" width="800" height="550" decoding="async">
                  </span>
                </div>
                <div>Construindo seu software com transparência e excelência técnica</div>
                <div style="margin-top: 4px;">
                  <a href="${PROPOSTA_DATA.proponent.url}" target="_blank" rel="noopener noreferrer">${PROPOSTA_DATA.proponent.url}</a> · 
                  <a href="${PROPOSTA_DATA.proponent.responsible.url}" target="_blank" rel="noopener noreferrer">${PROPOSTA_DATA.proponent.responsible.name}</a>
                </div>
              </footer>
            </section>

          </article>
        </main>

        <!-- Sinalização de Ambiente de Demonstração (somente impressão/PDF) -->
        <div class="demo-print-watermark print-only" aria-hidden="true">
          <span>Ambiente de</span><span>demonstração</span>
        </div>
        <div class="demo-print-footer print-only" aria-hidden="true">
          Ambiente de demonstração · Proposta comercial ${PROPOSTA_DATA.meta.id} · v${PROPOSTA_DATA.meta.version} · MAXCODE42 → Alvenius
        </div>

      </div>
    `;

    this.bindEvents();
  }

  renderMaxcodeLogo(modifier = '') {
    return `
      <span class="brand-maxcode-logo-plate ${modifier}">
        <img src="assets/logo-maxcode42-horizontal.png" alt="MAXCODE42" class="brand-maxcode-logo" width="800" height="227" decoding="async">
      </span>
    `;
  }

  renderDevAvatar(modifier = '') {
    const { name } = PROPOSTA_DATA.proponent.responsible;
    return `
      <a class="dev-avatar ${modifier}" href="https://github.com/josuel-lopes" target="_blank" rel="noopener noreferrer" title="${name} no GitHub" aria-label="Perfil de ${name} no GitHub">
        <span class="dev-avatar-fallback" aria-hidden="true">JL</span>
        <img class="dev-avatar-img" src="https://github.com/josuel-lopes.png?size=160" alt="Foto de ${name}" referrerpolicy="no-referrer" decoding="async">
      </a>
    `;
  }

  renderFeatureCard(feature) {
    return `
      <article class="proposal-feature-card" id="card-${feature.id}">
        <!-- Cabeçalho do Card -->
        <header class="feature-card-header">
          <div class="feature-header-left">
            <span class="feature-phase-badge">Fase ${feature.phase}</span>
            <h3 class="feature-title">${feature.title}</h3>
          </div>
          <div class="feature-metrics-badges">
            <span class="prop-badge">
              ${lucide('calendar', { size: 14, strokeWidth: 2 })}
              ${feature.hours} h
            </span>
            <span class="prop-badge">
              ${feature.businessDays} dias úteis
            </span>
            <span class="prop-badge price">
              R$ ${feature.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </header>

        <!-- Corpo do Card -->
        <div class="feature-card-body">
          <div class="feature-goal-box">
            <strong>Objetivo de Negócio & Problema Resolvido:</strong>
            <p>${feature.businessGoal}</p>
          </div>

          <div class="feature-steps-title">Fluxo Operacional Passo a Passo:</div>
          <ol class="feature-steps-list">
            ${feature.steps.map(step => `<li>${step}</li>`).join('')}
          </ol>

          <!-- Área de Preview Visual / Mockups / Diagramas -->
          <div class="feature-visual-area">
            <div class="visual-area-header">
              <span class="visual-area-title">
                ${lucide('scan-line', { size: 15, strokeWidth: 2 })}
                Representação Visual & Diagramas do Módulo:
              </span>
            </div>
            
            <div class="feature-mockup-grid">
              ${feature.mockups.map(m => `
                <div class="mockup-item">
                  <div style="background-color: #F1F5F9; border-radius: 4px; padding: 12px 6px; display: flex; align-items: center; justify-content: center; min-height: 70px;">
                    ${this.renderDiagramIcon(m.svgType)}
                  </div>
                  <div class="mockup-item-caption">${m.title}</div>
                  <div class="mockup-item-desc">${m.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          ${feature.assumption ? `
            <div class="feature-assumption-box">
              ${lucide('info', { size: 16, strokeWidth: 2 })}
              <span><strong>Premissa Específica:</strong> ${feature.assumption}</span>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }

  renderDiagramIcon(type) {
    switch (type) {
      case 'scanner':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 7h3v3H7z" fill="#EBF1FF" />
            <path d="M14 7h3v3h-3z" fill="#EBF1FF" />
            <path d="M7 14h3v3H7z" fill="#EBF1FF" />
            <line x1="2" y1="12" x2="22" y2="12" stroke="#EF4444" stroke-width="2" stroke-dasharray="2 2" />
          </svg>
        `;
      case 'label':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0B2545" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="#FFFFFF" />
            <line x1="7" y1="8" x2="17" y2="8" />
            <line x1="7" y1="12" x2="13" y2="12" />
            <rect x="15" y="11" width="3" height="3" fill="#1F4FD8" />
            <line x1="7" y1="16" x2="17" y2="16" stroke-dasharray="1 1" />
          </svg>
        `;
      case 'flow':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="5" cy="12" r="3" fill="#EBF1FF" />
            <circle cx="12" cy="12" r="3" fill="#EBF1FF" />
            <circle cx="19" cy="12" r="3" fill="#12B76A" stroke="#12B76A" />
            <line x1="8" y1="12" x2="9" y2="12" />
            <line x1="15" y1="12" x2="16" y2="12" />
          </svg>
        `;
      case 'progress':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0B2545" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <line x1="7" y1="9" x2="17" y2="9" stroke="#E2E8F0" stroke-width="4" />
            <line x1="7" y1="9" x2="14" y2="9" stroke="#1F4FD8" stroke-width="4" />
            <line x1="7" y1="15" x2="17" y2="15" stroke="#E2E8F0" stroke-width="4" />
            <line x1="7" y1="15" x2="11" y2="15" stroke="#12B76A" stroke-width="4" />
          </svg>
        `;
      case 'spool-detail':
      case 'hierarchy':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v6" />
            <path d="M5 14h14" />
            <path d="M5 14v6" />
            <path d="M19 14v6" />
            <rect x="9" y="8" width="6" height="6" rx="1" fill="#EBF1FF" />
          </svg>
        `;
      case 'incident':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        `;
      case 'chart':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" stroke-width="3" stroke="#EF4444" />
            <line x1="12" y1="20" x2="12" y2="4" stroke-width="3" stroke="#F59E0B" />
            <line x1="6" y1="20" x2="6" y2="14" stroke-width="3" stroke="#12B76A" />
            <line x1="3" y1="20" x2="21" y2="20" stroke="#0B2545" stroke-width="2" />
          </svg>
        `;
      case 'dashboard':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="8" height="8" rx="1" fill="#EBF1FF" />
            <rect x="13" y="3" width="8" height="5" rx="1" />
            <rect x="13" y="10" width="8" height="11" rx="1" fill="#EBF1FF" />
            <rect x="3" y="13" width="8" height="8" rx="1" />
          </svg>
        `;
      case 'report':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0B2545" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        `;
      case 'integration':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1F4FD8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="7" height="10" rx="1" />
            <rect x="15" y="7" width="7" height="10" rx="1" fill="#EBF1FF" />
            <path d="M9 10h6" stroke-dasharray="1 1" />
            <path d="M15 14H9" stroke-dasharray="1 1" />
            <path d="m13 8 2 2-2 2" />
            <path d="m11 16-2-2 2-2" />
          </svg>
        `;
      case 'monitor':
        return `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#12B76A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <path d="m6 10 3 3 6-6" />
          </svg>
        `;
      default:
        return lucide('box', { size: 32, stroke: '#1F4FD8', strokeWidth: 1.8 });
    }
  }

  bindEvents() {
    // 0. Fallback de iniciais "JL" caso a foto do GitHub não carregue
    this.container.querySelectorAll('.dev-avatar-img').forEach(img => {
      const fallback = () => img.remove();
      if (img.complete && img.naturalWidth === 0) {
        fallback();
      } else {
        img.addEventListener('error', fallback, { once: true });
      }
    });

    // 1. Botão Salvar em PDF (aciona diálogo nativo de impressão)
    const btnPdf = this.container.querySelector('#btn-save-pdf');
    if (btnPdf) {
      btnPdf.addEventListener('click', () => {
        // Título do documento define o nome sugerido do arquivo PDF
        const previousTitle = document.title;
        document.title = `Proposta Comercial ${PROPOSTA_DATA.meta.id} - Alvenius`;
        window.print();
        document.title = previousTitle;
      });
    }

    // 2. Botão Voltar ao Menu ou Login
    const btnBack = this.container.querySelector('#btn-back-menu');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (typeof this.options.onNavigate === 'function') {
          const savedUser = sessionStorage.getItem('app_user');
          let hasUser = false;
          try {
            hasUser = savedUser && JSON.parse(savedUser)?.isLoggedIn;
          } catch (e) {}
          this.options.onNavigate(hasUser ? 'menu' : 'login');
        }
      });
    }
  }
}
