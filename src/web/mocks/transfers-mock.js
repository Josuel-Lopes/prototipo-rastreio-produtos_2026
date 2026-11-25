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
    status: 'Aguardando PV',
    statusCor: '#06b6d4',
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
    status: 'Aguardando NF',
    statusCor: '#84cc16',
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
    status: 'Aguardando SC',
    statusCor: '#f97316',
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

export function getTransfersComponentes() {
  return [...transfersComponentesData];
}

export function getTransferComponenteById(id) {
  return transfersComponentesData.find(item => item.id === id);
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
    status: dados.status || 'Aguardando SC',
    statusCor: dados.statusCor || '#f97316',
    etapaAtual: dados.etapaAtual || 1,
    fornecedorOrigem: dados.fornecedorOrigem || '000052 - 01 - ALVENIUS',
    fornecedorDestino: dados.fornecedorDestino || '003385 - 01 - PETROPASY TECNOLOGIA',
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
