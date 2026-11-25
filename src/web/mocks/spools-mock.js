/**
 * Spool Management Mock Data - Alvenius
 * Dados simulados para o MVP de Rastreio de Produtos
 */

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

export const initialSpools = [
  {
    id: 'spool-0001',
    sequencial: '0001',
    codigo: 'SP-0414-00002-004',
    descricao: 'Carretel FS+FF 32pol x 9,53 x 1015mm 150 PSI',
    status: 'romaneio',
    inicio: '20/11/2026 às 08:30',
    finalizado: '22/11/2026 às 16:45',
    projeto: 'PRJ-VALE-CARAJAS-2026',
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
    projeto: 'PRJ-VALE-CARAJAS-2026',
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
    projeto: 'PRJ-PETROBRAS-SUBSEA-26',
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
    projeto: 'PRJ-PETROBRAS-SUBSEA-26',
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
    projeto: 'PRJ-SABESP-ETA-GUARA',
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
    projeto: 'PRJ-ANGLO-MINERACAO',
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
    projeto: 'PRJ-VALE-CARAJAS-2026',
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
    projeto: 'PRJ-PETROBRAS-SUBSEA-26',
    etapaAtual: 'Aguardando Início na Caldeiraria',
    historicoSucata: [],
    componentes: [
      { item: '01', descricao: 'REDUÇÃO EXCÊNTRICA 14X10POL SCH80 ASTM A234', qtd: '1 UN' },
      { item: '02', descricao: 'TUBO SEM COSTURA 14POL PAREDE SCH80', qtd: '1500 MM' },
      { item: '03', descricao: 'FLANGE PESCOÇO 14POL 300# RF', qtd: '1 UN' }
    ]
  }
];

// Estado reativo em memória no frontend
let state = {
  user: null,
  spools: JSON.parse(JSON.stringify(initialSpools)),
  counters: { ...statusDefinitions }
};

export function getSpools() {
  return state.spools;
}

export function getSpoolByCode(codigo) {
  if (!codigo) return null;
  const cleanCode = codigo.trim().toUpperCase();
  return state.spools.find(s => s.codigo.toUpperCase() === cleanCode) || null;
}

export function getCounters() {
  // Recalcula contadores baseado no array de spools somando com os totais industriais
  const base = {
    reservado: 52,
    execucao: 7,
    pausado: 2,
    continua: 0,
    finalizado: 62,
    reversivel: 0,
    sucata: 0,
    romaneio: 976
  };
  
  // Total geral oficial do wireframe = 1099
  const total = Object.values(base).reduce((acc, curr) => acc + curr, 0);

  return {
    items: base,
    total
  };
}

export function addSpool(novoSpool) {
  const nextSeqNum = state.spools.length + 1;
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
    projeto: novoSpool.projeto || 'PRJ-GERAL-ALVENIUS-2026',
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
  return spool;
}

export function updateSpoolStatus(codigo, novoStatus) {
  const spool = getSpoolByCode(codigo);
  if (!spool) return null;

  spool.status = novoStatus;
  const now = new Date();
  const dataFormatada = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} às ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  if (novoStatus === 'execucao' && spool.inicio.includes('--')) {
    spool.inicio = dataFormatada;
  }
  if (novoStatus === 'finalizado') {
    spool.finalizado = dataFormatada;
  }
  if (novoStatus === 'sucata') {
    spool.historicoSucata.push({
      data: dataFormatada,
      processo: 'Caldeiraria',
      motivo: 'Spool descartado via operação de escaneamento de campo.',
      usuario: state.user?.username || 'operador',
      acao: 'Classificado como Sucata'
    });
  }

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
  state = {
    user: null,
    spools: JSON.parse(JSON.stringify(initialSpools)),
    counters: { ...statusDefinitions }
  };
}
