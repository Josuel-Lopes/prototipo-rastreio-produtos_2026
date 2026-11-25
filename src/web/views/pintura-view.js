/**
 * Tela de Pintura - Alvenius Spool Management
 * Responsabilidade Única: Acompanhamento de processos de pintura, busca rápida,
 * acordeão retrátil de processos, histórico de sucata e listagem de spools.
 * Especialização modular de ProcessStageView para a etapa fabril de Pintura.
 */

import { ProcessStageView } from './process-stage-view.js';

export class PinturaView extends ProcessStageView {
  constructor(containerId = 'app-view', options = {}) {
    super(containerId, options, {
      stageKey: 'pintura',
      stageTitle: 'Pintura',
      bannerDescription: 'Leitura Spool, iniciar, finalizar e executar processo pintura.',
      containerClass: 'view-pintura-container',
      cardClass: 'card-pintura',
      toastUpdatedTitle: 'Pintura Atualizada',
      toastStartedTitle: 'Pintura Iniciada'
    });
  }
}
