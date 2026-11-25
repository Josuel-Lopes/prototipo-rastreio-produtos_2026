/**
 * Mock de Dados de Transferência de Componentes e Spools - Alvenius
 * Responsabilidade Única: Fonte de dados simulada para romaneios/transferências entre fornecedores e etapas
 */

export const PIPELINE_STAGES = [
  { id: 1, key: 'sc', label: 'Aguardando SC', color: '#f97316' },
  { id: 2, key: 'pv', label: 'Aguardando PV', color: '#06b6d4' },
  { id: 3, key: 'rom', label: 'Aguardando ROM', color: '#0284c7' },
  { id: 4, key: 'nf', label: 'Aguardando NF', color: '#84cc16' },
  { id: 5, key: 'emitida', label: 'Nota Emitida', color: '#9ca3af' }
];

let transfersComponentesData = [
  {
    id: 'tr-001',
    sequencial: '0001',
    codigo: '000001',
    tipo: 'componente',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 3, // Aguardando ROM
    fornecedorOrigem: '000052 - 01 - ALVENIUS',
    fornecedorDestino: '003385 - 01 - PETROPASY TECNOLOGIA',
    inicio: '21/08/2026 às 00:00h',
    finalizado: '-- / -- / ---- às -- : --',
    itens: [
      { codigo: 'FLW21224113Z211', descricao: 'Flange Cego Aço Carbono 4" 150#', quantidade: 4 },
      { codigo: 'SP041400035004', descricao: 'Spool Curva 90° 4" SCH 40', quantidade: 2 },
      { codigo: 'CMP99014283A102', descricao: 'Conexão Tee Redução 4x2" ANSI', quantidade: 3 }
    ]
  },
  {
    id: 'tr-002',
    sequencial: '0002',
    codigo: '000002',
    tipo: 'componente',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 2, // Aguardando PV
    fornecedorOrigem: '000052 - 01 - ALVENIUS',
    fornecedorDestino: '004410 - 02 - VALE MINERAÇÃO',
    inicio: '21/08/2026 às 08:45h',
    finalizado: '-- / -- / ---- às -- : --',
    itens: [
      { codigo: 'VAL33019821B001', descricao: 'Válvula Esfera Monobloco 2" 300#', quantidade: 6 },
      { codigo: 'NIP11029384C005', descricao: 'Niple Sextavado Inox 316 2"', quantidade: 8 }
    ]
  },
  {
    id: 'tr-003',
    sequencial: '0003',
    codigo: '000003',
    tipo: 'componente',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 4, // Aguardando NF
    fornecedorOrigem: '000052 - 01 - ALVENIUS',
    fornecedorDestino: '001290 - 03 - BRASKEN PETROQUÍMICA',
    inicio: '20/08/2026 às 13:15h',
    finalizado: '-- / -- / ---- às -- : --',
    itens: [
      { codigo: 'TUB88123471K009', descricao: 'Tubo Sem Costura 6" SCH 80 ASTM A106', quantidade: 10 },
      { codigo: 'CUR55432190M012', descricao: 'Curva 45° Raio Longo 6"', quantidade: 4 },
      { codigo: 'JNT77651234P008', descricao: 'Junta Espiralada Inox Grafite 6" 300#', quantidade: 12 }
    ]
  },
  {
    id: 'tr-004',
    sequencial: '0004',
    codigo: '000004',
    tipo: 'componente',
    status: 'Concluído',
    statusCor: '#22c55e',
    etapaAtual: 5, // Nota Emitida
    fornecedorOrigem: '000052 - 01 - ALVENIUS',
    fornecedorDestino: '003385 - 01 - PETROPASY TECNOLOGIA',
    inicio: '19/08/2026 às 07:30h',
    finalizado: '20/08/2026 às 17:40h',
    itens: [
      { codigo: 'SP041400035004', descricao: 'Spool Montado Caldeiraria 4" ANSI', quantidade: 1 },
      { codigo: 'FLW21224113Z211', descricao: 'Flange Sobreposto SO 4" 150#', quantidade: 2 }
    ]
  },
  {
    id: 'tr-005',
    sequencial: '0005',
    codigo: '000005',
    tipo: 'componente',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 1, // Aguardando SC
    fornecedorOrigem: '000052 - 01 - ALVENIUS',
    fornecedorDestino: '005520 - 01 - USIMINAS SIDERURGIA',
    inicio: '22/08/2026 às 09:10h',
    finalizado: '-- / -- / ---- às -- : --',
    itens: [
      { codigo: 'CHP44091823S003', descricao: 'Chapa Reforço 3/8" ASTM A36', quantidade: 15 },
      { codigo: 'PAR66541290W002', descricao: 'Parafuso Estojo B7 com Porcas 2H 5/8"', quantidade: 60 }
    ]
  },
  {
    id: 'tr-006',
    sequencial: '0006',
    codigo: '000006',
    tipo: 'componente',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 3, // Aguardando ROM
    fornecedorOrigem: '000052 - 01 - ALVENIUS',
    fornecedorDestino: '002240 - 04 - CSN SIDERÚRGICA',
    inicio: '22/08/2026 às 11:25h',
    finalizado: '-- / -- / ---- às -- : --',
    itens: [
      { codigo: 'COL99128473D001', descricao: 'Coletor de Distribuição 8" c/ 3 derivações', quantidade: 1 }
    ]
  }
];

let transfersSpoolsData = [
  // --- Processo 1: Caldeiraria -> Revestimento ---
  {
    id: 'tr-spool-001',
    sequencial: '0001',
    codigo: '000001',
    tipo: 'spool',
    processo: 'caldeiraria-revestimento',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 3, // Aguardando ROM
    fornecedorOrigem: '000052 - 01 - ALVENIUS TUBOS E CONEXOES LTDA',
    fornecedorDestino: '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS',
    inicio: '21/08/2026 às 00:00h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400035004' },
      { codigo: 'SP041400035007' },
      { codigo: 'SP041400035046' },
      { codigo: 'SP041400035047' },
      { codigo: 'SP041400035051' },
      { codigo: 'SP041400035057' },
      { codigo: 'SP041400036013' },
      { codigo: 'SP041400036032' },
      { codigo: 'SP041400036042' },
      { codigo: 'SP041400036043' },
      { codigo: 'SP041400036045' },
      { codigo: 'SP041400038037' }
    ]
  },
  {
    id: 'tr-spool-002',
    sequencial: '0002',
    codigo: '000002',
    tipo: 'spool',
    processo: 'caldeiraria-revestimento',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 4, // Aguardando NF
    fornecedorOrigem: '000052 - 01 - ALVENIUS TUBOS E CONEXOES LTDA',
    fornecedorDestino: '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS',
    inicio: '03/09/2026 às 08:30h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400038038' },
      { codigo: 'SP041400038039' },
      { codigo: 'SP041400038040' },
      { codigo: 'SP041400038041' },
      { codigo: 'SP041400038042' }
    ]
  },
  {
    id: 'tr-spool-003',
    sequencial: '0003',
    codigo: '000003',
    tipo: 'spool',
    processo: 'caldeiraria-revestimento',
    status: 'Concluído',
    statusCor: '#22c55e',
    etapaAtual: 5, // Nota Emitida
    fornecedorOrigem: '000052 - 01 - ALVENIUS TUBOS E CONEXOES LTDA',
    fornecedorDestino: '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS',
    inicio: '10/09/2026 às 14:00h',
    finalizado: '11/09/2026 às 16:30h',
    spools: [
      { codigo: 'SP041400039001' },
      { codigo: 'SP041400039002' },
      { codigo: 'SP041400039003' }
    ]
  },

  // --- Processo 2: Revestimento -> Pintura ---
  {
    id: 'tr-spool-004',
    sequencial: '0004',
    codigo: '000004',
    tipo: 'spool',
    processo: 'revestimento-pintura',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 3, // Aguardando ROM
    fornecedorOrigem: '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS',
    fornecedorDestino: '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA',
    inicio: '12/09/2026 às 09:15h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400041001' },
      { codigo: 'SP041400041002' },
      { codigo: 'SP041400041005' },
      { codigo: 'SP041400041012' }
    ]
  },
  {
    id: 'tr-spool-005',
    sequencial: '0005',
    codigo: '000005',
    tipo: 'spool',
    processo: 'revestimento-pintura',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 3, // Aguardando ROM
    fornecedorOrigem: '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS',
    fornecedorDestino: '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA',
    inicio: '14/09/2026 às 11:30h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400042008' },
      { codigo: 'SP041400042009' },
      { codigo: 'SP041400042010' }
    ]
  },
  {
    id: 'tr-spool-006',
    sequencial: '0006',
    codigo: '000006',
    tipo: 'spool',
    processo: 'revestimento-pintura',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 4, // Aguardando NF
    fornecedorOrigem: '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS',
    fornecedorDestino: '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA',
    inicio: '15/09/2026 às 16:00h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400043003' },
      { codigo: 'SP041400043004' }
    ]
  },

  // --- Processo 3: Pintura -> Faturamento ---
  {
    id: 'tr-spool-007',
    sequencial: '0007',
    codigo: '000007',
    tipo: 'spool',
    processo: 'pintura-faturamento',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 3, // Aguardando ROM
    fornecedorOrigem: '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA',
    fornecedorDestino: '000052 - 01 - ALVENIUS FATURAMENTO / EXPEDICAO',
    inicio: '18/09/2026 às 08:00h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400045010' },
      { codigo: 'SP041400045011' },
      { codigo: 'SP041400045012' },
      { codigo: 'SP041400045015' }
    ]
  },
  {
    id: 'tr-spool-008',
    sequencial: '0008',
    codigo: '000008',
    tipo: 'spool',
    processo: 'pintura-faturamento',
    status: 'Em Trânsito',
    statusCor: '#f59e0b',
    etapaAtual: 4, // Aguardando NF
    fornecedorOrigem: '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA',
    fornecedorDestino: '000052 - 01 - ALVENIUS FATURAMENTO / EXPEDICAO',
    inicio: '19/09/2026 às 10:20h',
    finalizado: '-- / -- / ---- às -- : --',
    spools: [
      { codigo: 'SP041400046001' },
      { codigo: 'SP041400046002' }
    ]
  },
  {
    id: 'tr-spool-009',
    sequencial: '0009',
    codigo: '000009',
    tipo: 'spool',
    processo: 'pintura-faturamento',
    status: 'Concluído',
    statusCor: '#22c55e',
    etapaAtual: 5, // Nota Emitida
    fornecedorOrigem: '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA',
    fornecedorDestino: '000052 - 01 - ALVENIUS FATURAMENTO / EXPEDICAO',
    inicio: '20/09/2026 às 09:00h',
    finalizado: '20/09/2026 às 15:45h',
    spools: [
      { codigo: 'SP041400047020' },
      { codigo: 'SP041400047021' },
      { codigo: 'SP041400047022' }
    ]
  }
];

export function getTransfersComponentes() {
  return [...transfersComponentesData];
}

export function getTransferComponenteById(id) {
  return transfersComponentesData.find(item => item.id === id);
}

export function getTransfersSpools(processo = null) {
  if (processo) {
    return transfersSpoolsData.filter(item => item.processo === processo);
  }
  return [...transfersSpoolsData];
}

export function getTransferSpoolById(id) {
  return transfersSpoolsData.find(item => item.id === id);
}

export function addTransferSpool(dados = {}) {
  const nextSeqNum = transfersSpoolsData.length + 1;
  const sequencial = String(nextSeqNum).padStart(4, '0');
  const codigo = String(nextSeqNum).padStart(6, '0');
  const processo = dados.processo || 'caldeiraria-revestimento';

  let defaultOrigem = '000052 - 01 - ALVENIUS TUBOS E CONEXOES LTDA';
  let defaultDestino = '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS';

  if (processo === 'revestimento-pintura') {
    defaultOrigem = '003385 - 01 - PETROPASY TECNOLOGIA E SERVICOS';
    defaultDestino = '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA';
  } else if (processo === 'pintura-faturamento') {
    defaultOrigem = '004120 - 02 - VALE PINTURA E ACABAMENTO LTDA';
    defaultDestino = '000052 - 01 - ALVENIUS FATURAMENTO / EXPEDICAO';
  }

  const novaTransferencia = {
    id: `tr-spool-${Date.now()}`,
    sequencial,
    codigo,
    tipo: 'spool',
    processo,
    status: dados.status || 'Em Trânsito',
    statusCor: dados.statusCor || '#f59e0b',
    etapaAtual: dados.etapaAtual || 3,
    fornecedorOrigem: dados.fornecedorOrigem || defaultOrigem,
    fornecedorDestino: dados.fornecedorDestino || defaultDestino,
    terceiro: dados.terceiro || 'SIM',
    inicio: dados.inicio || new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date()).replace(',', ' às') + 'h',
    finalizado: dados.finalizado || '-- / -- / ---- às -- : --',
    spools: dados.spools && dados.spools.length > 0 ? dados.spools : [
      { codigo: 'SP041400035004' }
    ]
  };

  transfersSpoolsData.unshift(novaTransferencia);
  return novaTransferencia;
}

export function addTransferComponente(dados = {}) {
  const nextSeqNum = transfersComponentesData.length + 1;
  const sequencial = String(nextSeqNum).padStart(4, '0');
  const codigo = String(nextSeqNum).padStart(6, '0');

  const novaTransferencia = {
    id: `tr-${Date.now()}`,
    sequencial,
    codigo,
    tipo: dados.tipo || 'componente',
    status: dados.status || 'Em Trânsito',
    statusCor: dados.statusCor || '#f59e0b',
    etapaAtual: dados.etapaAtual || 1,
    fornecedorOrigem: dados.fornecedorOrigem || '000052 - 01 - ALVENIUS',
    fornecedorDestino: dados.fornecedorDestino || '003385 - 01 - PETROPASY TECNOLOGIA',
    terceiro: dados.terceiro || 'SIM',
    inicio: dados.inicio || new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date()).replace(',', ' às') + 'h',
    finalizado: dados.finalizado || '-- / -- / ---- às -- : --',
    itens: dados.itens && dados.itens.length > 0 ? dados.itens : [
      { codigo: `FLW${Date.now().toString().slice(-8)}`, descricao: 'Componente Padrão Alvenius', quantidade: 1 }
    ]
  };

  transfersComponentesData.unshift(novaTransferencia);
  return novaTransferencia;
}
