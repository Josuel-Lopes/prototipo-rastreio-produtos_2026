/**
 * Tela de Caldeiraria - Alvenius Spool Management
 * Responsabilidade Única: Acompanhamento de processos de caldeiraria, busca rápida,
 * acordeão retrátil de processos, histórico de sucata e listagem de spools.
 * Especialização modular de ProcessStageView para a etapa fabril de Caldeiraria.
 */

import { ProcessStageView } from './process-stage-view.js';

export class CaldeirariaView extends ProcessStageView {
  constructor(containerId = 'app-view', options = {}) {
    super(containerId, options, {
      stageKey: 'caldeiraria',
      stageTitle: 'Caldeiraria',
      bannerDescription: 'Leitura Spool, iniciar, finalizar e executar processo produção.',
      containerClass: 'view-caldeiraria-container',
      cardClass: 'card-caldeiraria',
      toastUpdatedTitle: 'Processo Atualizado',
      toastStartedTitle: 'Processo Iniciado'
    });
  }
}

