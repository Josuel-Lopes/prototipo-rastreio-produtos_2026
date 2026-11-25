/**
 * Tela de Revestimento - Alvenius Spool Management
 * Responsabilidade Única: Acompanhamento de processos de revestimento, busca rápida,
 * acordeão retrátil de processos, histórico de sucata e listagem de spools.
 * Especialização modular de ProcessStageView para a etapa fabril de Revestimento.
 */

import { ProcessStageView } from './process-stage-view.js';

export class RevestimentoView extends ProcessStageView {
  constructor(containerId = 'app-view', options = {}) {
    super(containerId, options, {
      stageKey: 'revestimento',
      stageTitle: 'Revestimento',
      bannerDescription: 'Leitura Spool, iniciar, finalizar e executar processo revestimento.',
      containerClass: 'view-revestimento-container',
      cardClass: 'card-revestimento',
      toastUpdatedTitle: 'Revestimento Atualizado',
      toastStartedTitle: 'Revestimento Iniciado'
    });
  }
}
