/**
 * Projects Mock Data - Alvenius
 * Dados simulados de projetos (MVP) + persistência do projeto ativo em sessionStorage
 */

const ACTIVE_PROJECT_KEY = 'app_active_project';

export const projectStatusDefinitions = {
  planejamento: { key: 'planejamento', shortLabel: 'Planejamento' },
  execucao: { key: 'execucao', shortLabel: 'Execução' },
  concluido: { key: 'concluido', shortLabel: 'Concluído' }
};

export const projectsMock = [
  {
    id: 'prj-0414',
    sequencial: '0001',
    codigo: 'PRJ-2026-0414',
    nome: 'Adutora Industrial Usina Paraná',
    cliente: 'Usina Paraná Bioenergia S.A.',
    status: 'execucao',
    inicio: '12/08/2026',
    previsaoEntrega: '18/12/2026',
    descricao: 'Spools em aço carbono DN 300 a DN 600 para linha de adução de água bruta.',
    totalSpools: 48,
    spoolsConcluidos: 29
  },
  {
    id: 'prj-0427',
    sequencial: '0002',
    codigo: 'PRJ-2026-0427',
    nome: 'Estação Elevatória Norte',
    cliente: 'Companhia de Saneamento Vale Verde',
    status: 'execucao',
    inicio: '02/09/2026',
    previsaoEntrega: '30/01/2027',
    descricao: 'Barrilete de recalque com spools flangeados e revestimento epóxi interno.',
    totalSpools: 32,
    spoolsConcluidos: 11
  },
  {
    id: 'prj-0451',
    sequencial: '0003',
    codigo: 'PRJ-2026-0451',
    nome: 'Linha de Vapor Caldeira 3',
    cliente: 'Papel & Celulose Horizonte Ltda.',
    status: 'planejamento',
    inicio: '05/01/2027',
    previsaoEntrega: '28/04/2027',
    descricao: 'Caldeiraria de spools em aço liga para linha de vapor de alta pressão.',
    totalSpools: 24,
    spoolsConcluidos: 0
  },
  {
    id: 'prj-0388',
    sequencial: '0004',
    codigo: 'PRJ-2026-0388',
    nome: 'Sistema de Combate a Incêndio',
    cliente: 'Terminal Portuário Atlântico',
    status: 'concluido',
    inicio: '10/03/2026',
    previsaoEntrega: '25/07/2026',
    descricao: 'Rede de hidrantes com spools galvanizados e pintura de acabamento vermelha.',
    totalSpools: 56,
    spoolsConcluidos: 56
  },
  {
    id: 'prj-0463',
    sequencial: '0005',
    codigo: 'PRJ-2026-0463',
    nome: 'Captação de Água Bruta Rio Claro',
    cliente: 'Mineração Serra Alta S.A.',
    status: 'execucao',
    inicio: '21/09/2026',
    previsaoEntrega: '15/03/2027',
    descricao: 'Spools DN 800 com revestimento interno em poliuretano e externo em epóxi.',
    totalSpools: 18,
    spoolsConcluidos: 4
  },
  {
    id: 'prj-0479',
    sequencial: '0006',
    codigo: 'PRJ-2026-0479',
    nome: 'Ampliação ETA Vila Nova',
    cliente: 'Prefeitura Municipal de Vila Nova',
    status: 'planejamento',
    inicio: '01/02/2027',
    previsaoEntrega: '30/06/2027',
    descricao: 'Interligações em aço carbono com spools de caldeiraria e pintura industrial.',
    totalSpools: 12,
    spoolsConcluidos: 0
  }
];

export function getProjects() {
  return projectsMock.slice();
}

export function getProjectById(id) {
  return projectsMock.find(p => p.id === id) || null;
}

/**
 * Referência compacta de projeto gravada em spools/componentes/payloads
 * @param {string|object} idOrProject - id do projeto ou objeto com id
 * @returns {{projetoId: string, projetoCodigo: string, projetoNome: string}|null}
 */
export function getProjectRef(idOrProject) {
  const id = typeof idOrProject === 'string' ? idOrProject : idOrProject?.id;
  const project = getProjectById(id);
  if (!project) return null;
  return { projetoId: project.id, projetoCodigo: project.codigo, projetoNome: project.nome };
}

export function getActiveProject() {
  try {
    const raw = sessionStorage.getItem(ACTIVE_PROJECT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setActiveProject(project) {
  if (!project) return;
  sessionStorage.setItem(ACTIVE_PROJECT_KEY, JSON.stringify({
    id: project.id,
    codigo: project.codigo,
    nome: project.nome
  }));
}

export function clearActiveProject() {
  sessionStorage.removeItem(ACTIVE_PROJECT_KEY);
}
