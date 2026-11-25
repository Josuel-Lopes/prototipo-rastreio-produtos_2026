/**
 * Spool Management Mock Data - Alvenius
 * Dados simulados para o MVP de Rastreio de Produtos
 */

import { getProjectRef } from './projects-mock.js';

export const defaultUserData = {
  username: 'josuellopes',
  name: 'josuellopes',
  role: 'Operador de Caldeiraria / Inspetor',
  matricula: 'ALV-2026-0414',
  departamento: 'Chão de Fábrica - Spools',
  isLoggedIn: false
};

export const currentUser = null;

export const statusDefinitions = {
  reservado: {
    key: 'reservado',
    label: 'Reservado (aguardando início)',
    shortLabel: 'Reservado',
    color: '#f1c40f',
    textColor: '#000000',
    count: 52
  },
  execucao: {
    key: 'execucao',
    label: 'Execução (em processo produção)',
    shortLabel: 'Execução',
    color: '#00bcd4',
    textColor: '#ffffff',
    count: 7
  },
  pausado: {
    key: 'pausado',
    label: 'Pausado (aguardando para continuar)',
    shortLabel: 'Pausado',
    color: '#e67e22',
    textColor: '#ffffff',
    count: 2
  },
  continua: {
    key: 'continua',
    label: 'Continua (retornar para execução)',
    shortLabel: 'Continua',
    color: '#95a5a6',
    textColor: '#ffffff',
    count: 0
  },
  finalizado: {
    key: 'finalizado',
    label: 'Finalizado (aguardando "Aprova CQ")',
    shortLabel: 'Finalizado',
    color: '#27ae60',
    textColor: '#ffffff',
    count: 62
  },
  reversivel: {
    key: 'reversivel',
    label: 'Reversível (retorna início processo.)',
    shortLabel: 'Reversível',
    color: '#8bc34a',
    textColor: '#ffffff',
    count: 0
  },
  sucata: {
    key: 'sucata',
    label: 'Sucata (descarte do produto)',
    shortLabel: 'Sucata',
    color: '#e74c3c',
    textColor: '#ffffff',
    count: 0
  },
  romaneio: {
    key: 'romaneio',
    label: 'Romaneio (aguardando próxima etapa)',
    shortLabel: 'Romaneio',
    color: '#0070ba',
    textColor: '#ffffff',
    count: 976
  }
};

export const initialSpoolsCaldeiraria = [
  {
    id: 'spool-0001',
    sequencial: '0001',
    codigo: 'SP-0414-00002-004',
    descricao: 'Carretel FS+FF 32pol x 9,53 x 1015mm 150 PSI',
    status: 'romaneio',
    inicio: '20/11/2026 às 08:30',
    finalizado: '22/11/2026 às 16:45',
    projetoId: 'prj-0414',
    etapaAtual: 'Romaneio / Expedição',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'TUBO AÇO CARBONO SCH40 32POL X 9.53MM', qtd: '1015 MM' },
      { item: '02', descricao: 'FLANGE SOBREPOSTO (SO) 32POL 150 LBS ANSI B16.5', qtd: '2 UN' },
      { item: '03', descricao: 'SOLDA TOPO CIRCUNFERENCIAL GTAW + SMAW', qtd: '2 PASSES' },
      { item: '04', descricao: 'REVESTIMENTO PRIMER EPÓXI ALTO SÓLIDOS 80 MICRA', qtd: '1 APLICAÇÃO' }
    ]
  },
  {
    id: 'spool-0002',
    sequencial: '0002',
    codigo: 'SP-0414-00002-005',
    descricao: 'Spool Curva 90° Curta 16pol x SCH80 com Flanges Soltos',
    status: 'execucao',
    inicio: '24/11/2026 às 09:15',
    finalizado: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0414',
    etapaAtual: 'Caldeiraria (Ponteamento e Solda)',
    historicoSucata: [
      {
        data: '22/11/2026',
        processo: 'Caldeiraria',
        motivo: 'Biselamento irregular na extremidade do tubo.',
        usuario: 'operador_1',
        acao: 'Retrabalho de chanfro'
      }
    ],
    componentes: [
      { item: '01', descricao: 'CURVA 90 GRAUS RAIO CURTO 16POL SCH80 ASTM A234 WPB', qtd: '1 UN' },
      { item: '02', descricao: 'FLANGE SOLTO (LAP JOINT) 16POL 300# FORJADO', qtd: '2 UN' },
      { item: '03', descricao: 'PESTANA AÇO INOX 316L 16POL TIPO C', qtd: '2 UN' }
    ]
  },
  {
    id: 'spool-0003',
    sequencial: '0003',
    codigo: 'SP-0414-00003-001',
    descricao: 'Carretel Reto 24pol x 12.7mm x 3200mm c/ Flange Pescoço',
    status: 'reservado',
    inicio: '-- / -- / ---- às -- : --',
    finalizado: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0427',
    etapaAtual: 'Aguardando Início na Caldeiraria',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'TUBO SEM COSTURA ASTM A106 GR.B 24POL PAREDE 12.7MM', qtd: '3200 MM' },
      { item: '02', descricao: 'FLANGE PESCOÇO WELDING NECK 24POL 150# RF', qtd: '2 UN' }
    ]
  },
  {
    id: 'spool-0004',
    sequencial: '0004',
    codigo: 'SP-0414-00003-002',
    descricao: 'Spool Tê 45° Redução 12pol x 8pol SCH40',
    status: 'pausado',
    inicio: '23/11/2026 às 14:00',
    finalizado: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0427',
    etapaAtual: 'Caldeiraria - Ajuste de Bisel Requerido',
    historicoSucata: [
      {
        data: '23/11/2026',
        processo: 'Corte',
        motivo: 'Comprimento cortado 12mm além da tolerância máxima no niple de extensão.',
        usuario: 'josuellopes',
        acao: 'Pausado para retrabalho dimensional'
      }
    ],
    componentes: [
      { item: '01', descricao: 'TÊ 45 GRAUS COM REDUÇÃO 12X8POL SCH40 A234 WPB', qtd: '1 UN' },
      { item: '02', descricao: 'NIPLE DE EXTENSÃO 8POL SCH40', qtd: '350 MM' },
      { item: '03', descricao: 'FLANGE DE ENCAIXE SOLDA 8POL 300#', qtd: '1 UN' }
    ]
  },
  {
    id: 'spool-0005',
    sequencial: '0005',
    codigo: 'SP-0414-00004-010',
    descricao: 'Carretel Coletor Distribuidor 8pol c/ 4 Derivações 2pol',
    status: 'finalizado',
    inicio: '18/11/2026 às 07:45',
    finalizado: '21/11/2026 às 11:20',
    projetoId: 'prj-0463',
    etapaAtual: 'Inspeção CQ e Teste Hidrostático Concluído',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'TUBO ASTM A53 GR.B 8POL SCH40 COM COSTURA', qtd: '4500 MM' },
      { item: '02', descricao: 'DERIVAÇÕES WELDOLET 2POL 3000# FORJADO', qtd: '4 UN' },
      { item: '03', descricao: 'CAP DE FECHAMENTO 8POL SCH40 CONCÊNTRICO', qtd: '1 UN' },
      { item: '04', descricao: 'FLANGE SOBREPOSTO 8POL 150# RF', qtd: '1 UN' }
    ]
  },
  {
    id: 'spool-0006',
    sequencial: '0006',
    codigo: 'SP-0414-00005-001',
    descricao: 'Spool Flange Cego 10pol com Furação Especial 8 Furos',
    status: 'sucata',
    inicio: '15/11/2026 às 10:00',
    finalizado: '15/11/2026 às 12:30',
    projetoId: 'prj-0463',
    etapaAtual: 'Reprovado pelo CQ - Destinado a Sucata',
    historicoSucata: [
      {
        data: '14/11/2026',
        processo: 'Caldeiraria',
        motivo: 'Deformação angular no flange após aperto.',
        usuario: 'operador_1',
        acao: 'Tentativa de desempeno'
      },
      {
        data: '15/11/2026',
        processo: 'Solda',
        motivo: 'Trinca no cordão de raiz detectada no ensaio por líquido penetrante (LP). Descarte total reprovado pelo CQ.',
        usuario: 'inspetor_cq',
        acao: 'Classificado como Sucata'
      }
    ],
    componentes: [
      { item: '01', descricao: 'FLANGE CEGO 10POL CLASSE 300 COM FURAÇÃO ESPECIAL', qtd: '1 UN' },
      { item: '02', descricao: 'NIPLE DE TESTE 2POL SCH80 NPT', qtd: '1 UN' }
    ]
  },
  {
    id: 'spool-0007',
    sequencial: '0007',
    codigo: 'SP-0414-00006-003',
    descricao: 'Spool Curva 45° 20pol x SCH40 c/ Flange Sobreposto',
    status: 'pausado',
    inicio: '05/11/2026 às 08:00',
    finalizado: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0414',
    etapaAtual: 'Pausado para Retrabalho de Pintura',
    historicoSucata: [
      {
        data: '05/11/2026',
        processo: 'Corte',
        motivo: 'Empeno térmico após corte a plasma de chanfro.',
        usuario: 'operador_corte',
        acao: 'Ajuste de extremidade'
      },
      {
        data: '12/11/2026',
        processo: 'Caldeiraria',
        motivo: 'Desalinhamento angular na montagem de derivação além da norma ASME B31.3.',
        usuario: 'operador_cald',
        acao: 'Desponteamento e realinhamento'
      },
      {
        data: '19/11/2026',
        processo: 'Pintura',
        motivo: 'Bolhas e destacamento de película primer por umidade superficial.',
        usuario: 'inspetor_cq',
        acao: 'Reprovado em CQ / Jateamento novo requerido'
      }
    ],
    componentes: [
      { item: '01', descricao: 'CURVA 45 GRAUS 20POL SCH40 A234 WPB', qtd: '1 UN' },
      { item: '02', descricao: 'FLANGE SOBREPOSTO 20POL 150# ANSI B16.5', qtd: '1 UN' }
    ]
  },
  {
    id: 'spool-0008',
    sequencial: '0008',
    codigo: 'SP-0414-00007-001',
    descricao: 'Carretel Redução Excêntrica 14pol x 10pol SCH80',
    status: 'reservado',
    inicio: '-- / -- / ---- às -- : --',
    finalizado: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0427',
    etapaAtual: 'Aguardando Início na Caldeiraria',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'REDUÇÃO EXCÊNTRICA 14X10POL SCH80 ASTM A234', qtd: '1 UN' },
      { item: '02', descricao: 'TUBO SEM COSTURA 14POL PAREDE SCH80', qtd: '1500 MM' },
      { item: '03', descricao: 'FLANGE PESCOÇO 14POL 300# RF', qtd: '1 UN' }
    ]
  }
];

export const initialSpoolsRevestimento = [
  {
    id: 'spool-rv-0001',
    sequencial: '0001',
    codigo: 'SP-0820-00010-001',
    descricao: 'Carretel 18pol x 4200mm c/ Revestimento Interno FBE 400µm',
    status: 'execucao',
    inicio: '24/11/2026 às 08:10',
    finalizado: '-- / -- / ---- às -- : --',
    inicioRevestimento: '24/11/2026 às 08:10',
    finalizadoRevestimento: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0414',
    etapaAtual: 'Aplicação de Epóxi Termofusão (FBE) em Cabine Automatizada',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'JATEAMENTO COM GRANALHA ANGULAR PADRÃO SA 2.5', qtd: '4200 MM' },
      { item: '02', descricao: 'PÓ DE RESINA EPÓXI TERMOFUSÃO SCOTCHKOTE 206N', qtd: '12 KG' },
      { item: '03', descricao: 'INSPEÇÃO DE ESPESSURA E DESCONTINUIDADE POR HOLIDAY DETECTOR', qtd: '1 ENSAIO' }
    ]
  },
  {
    id: 'spool-rv-0002',
    sequencial: '0002',
    codigo: 'SP-0820-00012-003',
    descricao: 'Spool Curva 90° 24pol Revestido 3LPE Tripla Camada Polietileno',
    status: 'finalizado',
    inicio: '21/11/2026 às 09:30',
    finalizado: '23/11/2026 às 15:40',
    inicioRevestimento: '21/11/2026 às 09:30',
    finalizadoRevestimento: '23/11/2026 às 15:40',
    projetoId: 'prj-0427',
    etapaAtual: 'CQ de Revestimento Aprovado / Holiday Test Concluído sem Poros',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'CAMADA 1: PRIMER EPÓXI LÍQUIDO DUAS PARTES (80µm)', qtd: '1 UN' },
      { item: '02', descricao: 'CAMADA 2: ADESIVO COPOLÍMERO POLIETILENO ENXERTADO (250µm)', qtd: '1 UN' },
      { item: '03', descricao: 'CAMADA 3: PEAD ALTA DENSIDADE EXTRUDADO (2.5MM)', qtd: '1 UN' }
    ]
  },
  {
    id: 'spool-rv-0003',
    sequencial: '0003',
    codigo: 'SP-0820-00014-002',
    descricao: 'Tubo Flangeado 12pol x 6000mm Aguardando Jateamento Granalha SA 2.5',
    status: 'reservado',
    inicio: '-- / -- / ---- às -- : --',
    finalizado: '-- / -- / ---- às -- : --',
    inicioRevestimento: '-- / -- / ---- às -- : --',
    finalizadoRevestimento: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0463',
    etapaAtual: 'Fila de Espera Cabine de Pré-Aquecimento e Jateamento',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'TUBO AÇO CARBONO COM COSTURA HELICOIDAL 12POL', qtd: '6000 MM' },
      { item: '02', descricao: 'REVESTIMENTO INTERNO POLIURETANO BI-COMPONENTE ALIMENTÍCIO', qtd: '1 DEMÃO' }
    ]
  },
  {
    id: 'spool-rv-0004',
    sequencial: '0004',
    codigo: 'SP-0820-00015-004',
    descricao: 'Distribuidor 16pol Revestimento Cerâmico Antidesgaste',
    status: 'romaneio',
    inicio: '19/11/2026 às 07:00',
    finalizado: '22/11/2026 às 17:15',
    inicioRevestimento: '19/11/2026 às 07:00',
    finalizadoRevestimento: '22/11/2026 às 17:15',
    projetoId: 'prj-0414',
    etapaAtual: 'Aprovado pelo CQ de Revestimento - Aguardando Romaneio',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'PASTILHAS DE ALUMINA ALTA DUREZA 92% AL2O3', qtd: '120 UN' },
      { item: '02', descricao: 'RESINA EPÓXI BI-COMPONENTE DE FIXAÇÃO ESTATIFICADA', qtd: '8 KG' }
    ]
  },
  {
    id: 'spool-rv-0005',
    sequencial: '0005',
    codigo: 'SP-0820-00018-001',
    descricao: 'Carretel 20pol SCH80 c/ Primer Epóxi Alta Espessura 150µm',
    status: 'pausado',
    inicio: '23/11/2026 às 11:20',
    finalizado: '-- / -- / ---- às -- : --',
    inicioRevestimento: '23/11/2026 às 11:20',
    finalizadoRevestimento: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0414',
    etapaAtual: 'Pausado para Ajuste de Temperatura da Estufa de Cura',
    historicoSucata: [
      {
        data: '23/11/2026',
        processo: 'Revestimento',
        motivo: 'Temperatura da chapa abaixo de 190°C na entrada da câmara de polietileno.',
        usuario: 'operador_rev',
        acao: 'Pausado para recalibração de queimadores'
      }
    ],
    componentes: [
      { item: '01', descricao: 'TUBO SEM COSTURA 20POL ASTM A106 GR.B', qtd: '3800 MM' },
      { item: '02', descricao: 'PRIMER EPÓXI FENÓLICO ALTA ESPESSURA 150 MICRA', qtd: '1 APLICAÇÃO' }
    ]
  },
  {
    id: 'spool-rv-0006',
    sequencial: '0006',
    codigo: 'SP-0820-00020-005',
    descricao: 'Spool Tê 45° 14pol x 10pol com Liner Interno PTFE',
    status: 'continua',
    inicio: '22/11/2026 às 13:00',
    finalizado: '-- / -- / ---- às -- : --',
    inicioRevestimento: '22/11/2026 às 13:00',
    finalizadoRevestimento: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0427',
    etapaAtual: 'Liberado pelo CQ para Retomada de Expansão Térmica de Liner',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'CAMISA DE PTFE PURO VIRGEM EXPANDIDO 4MM', qtd: '1 UN' },
      { item: '02', descricao: 'FLANGE DE CONTENÇÃO COM RESSALTO EMBUTIDO', qtd: '2 UN' }
    ]
  },
  {
    id: 'spool-rv-0007',
    sequencial: '0007',
    codigo: 'SP-0820-00022-002',
    descricao: 'Carretel 8pol com Descolamento de Revestimento Termofusão',
    status: 'sucata',
    inicio: '17/11/2026 às 08:00',
    finalizado: '18/11/2026 às 10:15',
    inicioRevestimento: '17/11/2026 às 08:00',
    finalizadoRevestimento: '18/11/2026 às 10:15',
    projetoId: 'prj-0427',
    etapaAtual: 'Reprovado no Teste de Aderência em X (ASTM D4541) - Destinado a Sucata',
    historicoSucata: [
      {
        data: '18/11/2026',
        processo: 'Revestimento',
        motivo: 'Delaminação completa da película de FBE por contaminação de cloretos no substrato de aço.',
        usuario: 'inspetor_revest',
        acao: 'Classificado como Sucata irrecuperável'
      }
    ],
    componentes: [
      { item: '01', descricao: 'TUBO AÇO CARBONO 8POL SCH80', qtd: '2500 MM' },
      { item: '02', descricao: 'RESINA TERMOFUSÃO CONTAMINADA', qtd: '6 KG' }
    ]
  }
];

export const initialSpoolsPintura = [
  {
    id: 'spool-pt-0001',
    sequencial: '0001',
    codigo: 'SP-0935-00001-002',
    descricao: 'Spool Carretel 28pol Pintura Poliuretano Alifático Azul Segurança Petrobras N-1219',
    status: 'finalizado',
    inicio: '22/11/2026 às 08:45',
    finalizado: '24/11/2026 às 14:00',
    inicioPintura: '22/11/2026 às 08:45',
    finalizadoPintura: '24/11/2026 às 14:00',
    projetoId: 'prj-0414',
    etapaAtual: 'Pintura Final Concluída / EPS 240µm Medida e Aprovada conforme N-2137',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'PRIMER EPÓXI RICO EM ZINCO POLIAMIDA (75µm)', qtd: '1 DEMÃO' },
      { item: '02', descricao: 'TINTA INTERMEDIÁRIA EPÓXI ÓXIDO DE FERRO MIO (100µm)', qtd: '1 DEMÃO' },
      { item: '03', descricao: 'ACABAMENTO ESMALTE POLIURETANO ALIFÁTICO AZUL 2.5PB 4/10', qtd: '1 DEMÃO (65µm)' }
    ]
  },
  {
    id: 'spool-pt-0002',
    sequencial: '0002',
    codigo: 'SP-0935-00003-001',
    descricao: 'Curva 45° 16pol SCH40 Aplicação 2ª Demão Esmalte Epóxi Amarelo Segurança',
    status: 'execucao',
    inicio: '24/11/2026 às 10:15',
    finalizado: '-- / -- / ---- às -- : --',
    inicioPintura: '24/11/2026 às 10:15',
    finalizadoPintura: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0414',
    etapaAtual: 'Aplicação de Esmalte Epóxi em Cabine de Pintura Airless',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'CURVA 45 GRAUS 16POL SCH40 COM PRIMER CURADO', qtd: '1 UN' },
      { item: '02', descricao: 'ESMALTE POLIURETANO BRILHANTE AMARELO SEGURANÇA 5Y 8/12', qtd: '3.5 L' }
    ]
  },
  {
    id: 'spool-pt-0003',
    sequencial: '0003',
    codigo: 'SP-0935-00004-005',
    descricao: 'Coletor 10pol c/ Primer Vinílico Aguardando Acabamento Verde Emblema Vale',
    status: 'reservado',
    inicio: '-- / -- / ---- às -- : --',
    finalizado: '-- / -- / ---- às -- : --',
    inicioPintura: '-- / -- / ---- às -- : --',
    finalizadoPintura: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0427',
    etapaAtual: 'Aguardando Desocupação de Bancada de Pintura Manual',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'COLETOR 10POL COM 3 DERIVAÇÕES FLANGEADAS', qtd: '1 UN' },
      { item: '02', descricao: 'ESMALTE POLIURETANO MONOCOMPONENTE VERDE EMBLEMA', qtd: '5 L' }
    ]
  },
  {
    id: 'spool-pt-0004',
    sequencial: '0004',
    codigo: 'SP-0935-00006-002',
    descricao: 'Spool Redução Concêntrica 20pol x 14pol Aguardando Condições Climáticas (UR < 85%)',
    status: 'pausado',
    inicio: '23/11/2026 às 16:30',
    finalizado: '-- / -- / ---- às -- : --',
    inicioPintura: '23/11/2026 às 16:30',
    finalizadoPintura: '-- / -- / ---- às -- : --',
    projetoId: 'prj-0427',
    etapaAtual: 'Pausado por Condição Ambiental Adversa (Ponto de Orvalho Próximo)',
    historicoSucata: [
      {
        data: '23/11/2026',
        processo: 'Pintura',
        motivo: 'Umidade relativa atingiu 88% e temperatura da peça ficou 2°C abaixo do ponto de orvalho.',
        usuario: 'inspetor_pint',
        acao: 'Pausado para preservar cura da tinta'
      }
    ],
    componentes: [
      { item: '01', descricao: 'REDUÇÃO CONCÊNTRICA 20X14POL ASTM A234 WPB', qtd: '1 UN' },
      { item: '02', descricao: 'TINTA DE ALTA TEMPERATURA SILICONE ALUMÍNIO 400°C', qtd: '2 L' }
    ]
  },
  {
    id: 'spool-pt-0005',
    sequencial: '0005',
    codigo: 'SP-0935-00007-004',
    descricao: 'Carretel 12pol c/ Pintura Externa Anticorrosiva C5-M Aprovada em Ensaio Aderência',
    status: 'romaneio',
    inicio: '20/11/2026 às 08:00',
    finalizado: '23/11/2026 às 11:30',
    inicioPintura: '20/11/2026 às 08:00',
    finalizadoPintura: '23/11/2026 às 11:30',
    projetoId: 'prj-0388',
    etapaAtual: 'Ensaio Pull-off Aderência > 12 MPa / Liberado para Romaneio',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'TUBO AÇO CARBONO 12POL SCH80 3500MM', qtd: '3500 MM' },
      { item: '02', descricao: 'SISTEMA DE PINTURA MARÍTIMO OFFSHORE ISO 12944-C5M', qtd: '3 CAMADAS' }
    ]
  },
  {
    id: 'spool-pt-0006',
    sequencial: '0006',
    codigo: 'SP-0935-00010-001',
    descricao: 'Spool Flange Cego 18pol Contaminação Irreversível por Óleo na Película',
    status: 'sucata',
    inicio: '18/11/2026 às 09:00',
    finalizado: '18/11/2026 às 15:20',
    inicioPintura: '18/11/2026 às 09:00',
    finalizadoPintura: '18/11/2026 às 15:20',
    projetoId: 'prj-0388',
    etapaAtual: 'Película Apresentou Crateras Severas por Óleo de Compressor - Descarte Sucata',
    historicoSucata: [
      {
        data: '18/11/2026',
        processo: 'Pintura',
        motivo: 'Filtro coalescente do compressor saturou, lançando aerossol de óleo na linha airless durante a demão final.',
        usuario: 'inspetor_pint',
        acao: 'Reprovação de lote e descarte de spool'
      }
    ],
    componentes: [
      { item: '01', descricao: 'FLANGE CEGO 18POL 300# CONTAMINADO', qtd: '1 UN' }
    ]
  }
];

export const initialSpools = initialSpoolsCaldeiraria;

// Contadores base estáticos e independentes para cada processo fabril
export const stageBaseCounters = {
  caldeiraria: {
    reservado: 52,
    execucao: 7,
    pausado: 2,
    continua: 0,
    finalizado: 62,
    reversivel: 0,
    sucata: 0,
    romaneio: 976
  },
  revestimento: {
    reservado: 38,
    execucao: 14,
    pausado: 5,
    continua: 1,
    finalizado: 45,
    reversivel: 2,
    sucata: 1,
    romaneio: 642
  },
  pintura: {
    reservado: 27,
    execucao: 11,
    pausado: 3,
    continua: 0,
    finalizado: 34,
    reversivel: 1,
    sucata: 2,
    romaneio: 446
  }
};

/**
 * Clona a lista inicial e resolve o vínculo de projeto (projetoId → código/nome de projects-mock.js)
 */
function withProjects(list) {
  return JSON.parse(JSON.stringify(list)).map(spool => ({ ...spool, ...(getProjectRef(spool.projetoId) || {}) }));
}

function createInitialState() {
  return {
    user: null,
    spoolsCaldeiraria: withProjects(initialSpoolsCaldeiraria),
    spoolsRevestimento: withProjects(initialSpoolsRevestimento),
    spoolsPintura: withProjects(initialSpoolsPintura),
    spools: [],
    counters: { ...statusDefinitions }
  };
}

// Estado reativo em memória no frontend
let state = createInitialState();

export function getSpools(stageKey = 'caldeiraria') {
  const key = String(stageKey).toLowerCase();
  if (key === 'revestimento') return state.spoolsRevestimento;
  if (key === 'pintura') return state.spoolsPintura;
  return state.spoolsCaldeiraria;
}

/**
 * Spools da etapa filtrados pelo projeto (sem projectId retorna a lista completa)
 */
export function getSpoolsByProject(stageKey = 'caldeiraria', projectId = null) {
  const list = getSpools(stageKey);
  return projectId ? list.filter(s => s.projetoId === projectId) : list;
}

export function getSpoolByCode(codigo, stageKey = null) {
  if (!codigo) return null;
  const cleanCode = codigo.trim().toUpperCase();

  if (stageKey) {
    const stageSpools = getSpools(stageKey);
    const found = stageSpools.find(s => s.codigo.toUpperCase() === cleanCode);
    if (found) return found;
  }

  // Busca em todos os processos caso não especificado ou não encontrado no estágio
  return (
    state.spoolsCaldeiraria.find(s => s.codigo.toUpperCase() === cleanCode) ||
    state.spoolsRevestimento.find(s => s.codigo.toUpperCase() === cleanCode) ||
    state.spoolsPintura.find(s => s.codigo.toUpperCase() === cleanCode) ||
    state.spools.find(s => s.codigo.toUpperCase() === cleanCode) ||
    null
  );
}

export function getCounters(stageKey = 'caldeiraria') {
  const key = String(stageKey).toLowerCase();
  let baseConfig = stageBaseCounters.caldeiraria;
  let initList = initialSpoolsCaldeiraria;
  let currentList = state.spoolsCaldeiraria;

  if (key === 'revestimento') {
    baseConfig = stageBaseCounters.revestimento;
    initList = initialSpoolsRevestimento;
    currentList = state.spoolsRevestimento;
  } else if (key === 'pintura') {
    baseConfig = stageBaseCounters.pintura;
    initList = initialSpoolsPintura;
    currentList = state.spoolsPintura;
  }

  const base = { ...baseConfig };

  // Ajusta dinamicamente a contagem conforme transições de status no mock em memória
  initList.forEach(initSpool => {
    const currentSpool = currentList.find(s => s.id === initSpool.id || s.codigo === initSpool.codigo);
    if (currentSpool && currentSpool.status !== initSpool.status) {
      if (base[initSpool.status] !== undefined && base[initSpool.status] > 0) {
        base[initSpool.status]--;
      }
      if (base[currentSpool.status] !== undefined) {
        base[currentSpool.status]++;
      }
    }
  });

  const total = Object.values(base).reduce((acc, curr) => acc + curr, 0);

  return {
    items: base,
    total
  };
}

/**
 * Grava um spool cadastrado vinculado ao projeto (entra na Caldeiraria como Reservado)
 * @param {object} novoSpool - { codigo, descricao, componentes, projetoId }
 * @returns {object} spool gravado
 */
/**
 * Contadores por status calculados somente com os spools do projeto na etapa
 * @returns {{items: object, total: number}}
 */
export function getCountersByProject(stageKey = 'caldeiraria', projectId = null) {
  if (!projectId) return getCounters(stageKey);
  const items = Object.keys(statusDefinitions).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  getSpoolsByProject(stageKey, projectId).forEach(s => {
    if (items[s.status] !== undefined) items[s.status]++;
  });
  const total = Object.values(items).reduce((acc, curr) => acc + curr, 0);
  return { items, total };
}

export function addSpool(novoSpool) {
  const nextSeqNum = state.spoolsCaldeiraria.length + 1;
  const sequencial = String(nextSeqNum).padStart(4, '0');
  
  const now = new Date();
  const dataFormatada = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} às ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const spool = {
    id: `spool-${sequencial}`,
    sequencial,
    codigo: novoSpool.codigo.trim().toUpperCase(),
    descricao: novoSpool.descricao.trim(),
    status: novoSpool.status || 'reservado',
    inicio: dataFormatada,
    finalizado: '-- / -- / ---- às -- : --',
    ...(getProjectRef(novoSpool.projetoId) || {}),
    etapaAtual: 'Cadastrado / Aguardando Início',
    historicoSucata: [],
    componentes: novoSpool.componentes && novoSpool.componentes.length > 0 
      ? novoSpool.componentes 
      : [
          { item: '01', descricao: 'TUBO AÇO CARBONO PADRÃO ALVENIUS', qtd: '1000 MM' },
          { item: '02', descricao: 'FLANGE SOBREPOSTO 150#', qtd: '2 UN' }
        ]
  };

  state.spools.unshift(spool);
  state.spoolsCaldeiraria.unshift(spool);
  return spool;
}

/**
 * Movimenta o spool na etapa e registra a movimentação com o projeto
 * @param {object} [projectRef] - { projetoId, projetoCodigo, projetoNome } do projeto ativo
 */
export function updateSpoolStatus(codigo, novoStatus, processo = 'Caldeiraria', projectRef = null) {
  const spool = getSpoolByCode(codigo);
  if (!spool) return null;
  const projeto = projectRef || getProjectRef(spool.projetoId) || {};

  spool.status = novoStatus;
  const now = new Date();
  const dataFormatada = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} às ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (processo === 'Revestimento') {
    if (novoStatus === 'execucao' && (!spool.inicioRevestimento || spool.inicioRevestimento.includes('--'))) {
      spool.inicioRevestimento = dataFormatada;
    }
    if ((novoStatus === 'finalizado' || novoStatus === 'romaneio') && (!spool.finalizadoRevestimento || spool.finalizadoRevestimento.includes('--'))) {
      spool.finalizadoRevestimento = dataFormatada;
    }
  } else if (processo === 'Pintura') {
    if (novoStatus === 'execucao' && (!spool.inicioPintura || spool.inicioPintura.includes('--'))) {
      spool.inicioPintura = dataFormatada;
    }
    if ((novoStatus === 'finalizado' || novoStatus === 'romaneio') && (!spool.finalizadoPintura || spool.finalizadoPintura.includes('--'))) {
      spool.finalizadoPintura = dataFormatada;
    }
  } else {
    if (novoStatus === 'execucao' && (!spool.inicioCaldeiraria || spool.inicioCaldeiraria.includes('--'))) {
      spool.inicioCaldeiraria = dataFormatada;
    }
    if ((novoStatus === 'finalizado' || novoStatus === 'romaneio') && (!spool.finalizadoCaldeiraria || spool.finalizadoCaldeiraria.includes('--'))) {
      spool.finalizadoCaldeiraria = dataFormatada;
    }
  }

  if (novoStatus === 'execucao' && spool.inicio && spool.inicio.includes('--')) {
    spool.inicio = dataFormatada;
  }
  if ((novoStatus === 'finalizado' || novoStatus === 'romaneio') && spool.finalizado && spool.finalizado.includes('--')) {
    spool.finalizado = dataFormatada;
  }
  if (novoStatus === 'sucata') {
    spool.historicoSucata.push({
      data: dataFormatada,
      processo: processo,
      motivo: `Spool descartado no processo ${processo} via operação de escaneamento de campo.`,
      usuario: state.user?.username || 'operador',
      acao: 'Classificado como Sucata',
      ...projeto
    });
  }

  if (!Array.isArray(spool.movimentacoes)) spool.movimentacoes = [];
  spool.movimentacoes.push({
    data: dataFormatada,
    processo,
    status: novoStatus,
    usuario: state.user?.username || 'operador',
    ...projeto
  });

  return spool;
}

export function getCurrentUser() {
  return state.user;
}

export function setCurrentUser(user) {
  if (!user) {
    state.user = null;
    return;
  }
  const username = user.username || 'josuellopes';
  state.user = {
    ...defaultUserData,
    ...user,
    username,
    name: user.name || (username === 'josuellopes' ? 'josuellopes' : (username.charAt(0).toUpperCase() + username.slice(1))),
    isLoggedIn: user.isLoggedIn !== undefined ? Boolean(user.isLoggedIn) : true
  };
}

export function logoutUser() {
  state.user = null;
}

export function resetMockState() {
  state = createInitialState();
}
