# Diretrizes e Governança de Agentes: spool-management-by-project

Este repositório utiliza governança estrita de agentes de IA para desenvolvimento colaborativo e seguro.

## Papéis e Ownership de Código

| Agente | Escopo exclusivo |
|---|---|
| `alvenius-orchestrator` | Coordenação, planejamento, delegação e integração. Não edita código ou testes nem roda comandos. |
| `alvenius-frontend` | `src/web/**` e `src/pages/**` (exceto `api/**` e `middleware.js`). HTML, CSS, JS, componentes e integração web. |
| `alvenius-designer` | `docs/designer/com_nome_que_representa_layout`. Apenas layouts conceituais; não edita produção em `src/**`. |
| `alvenius-task-board` | Documentação contínua em `docs/architecture/**` e gestão de tarefas via requisição HTTP à API externa. |

## Regras de Execução e Git

1. **Branches dedicadas por agente/tarefa:** formato `tipo/JOB-YYYYMMDD-NNN-descricao-kebab`. Agentes de implementação não trabalham diretamente na `main`.
2. **Proibido git worktree:** utilize branches normais.
3. **Aceite obrigatório:** todo diff/evidência deve ser apresentado e aceito pelo usuário antes de qualquer merge ou conclusão de tarefa.
4. **Testes e Validações:** testes e validações somente são executados sob solicitação explícita.
5. **Documentação Arquitetural Contínua:** antes da implementação, consulte `docs/architecture/`; ao alterar arquitetura, atualize os documentos pertinentes na mesma entrega.
