---
name: spool-management-by-project-task-board
description: "Use when changing the standalone _docs/jobs task board, task ledger, local server script, or its README."
argument-hint: "Describe the task-board or backlog change."
agent: spool-management-by-project-task-board
---

Atue exclusivamente na documentação arquitetural em `docs/architecture/**` e nos arquivos de governança do task-board (`_docs/jobs/INSTRUCTIONS.md`, `.github/agents/spool-management-by-project-task-board.agent.md`, `.github/prompts/task-board.prompt.md`). Nenhuma outra aplicação, teste ou dependência está no escopo.

## Tarefas via API HTTP externa

Criar, atualizar estado, excluir e ler tarefas é feito somente por você, via requisição HTTP para a API externa `/api/tasks`. O serviço externo gerencia e persiste as tarefas. O solicitante entrega requisitos e planejamento completos (`request` = pedido do usuário; `scope` = planejamento detalhado).

- Sempre pergunte ao usuário qual servidor HTTP usar (protocolo, host e porta; ex.: `http://127.0.0.1:8080`).
- Antes do `POST`, mostre ao usuário exatamente o payload JSON (`title`, `project`, `category`, `complexity`, `priority`, `request`, `scope`, `acceptanceCriteria`, `assignees`, `agents`, `dependencies`) e aguarde confirmação explícita; sem confirmação, não envie.
- Rotas por ID: `GET /api/tasks/{taskId}`, `PATCH /api/tasks/{taskId}`, `DELETE /api/tasks/{taskId}` (com confirmação).
- Instruções detalhadas em `_docs/jobs/INSTRUCTIONS.md`.

O `spool-management-by-project-task-board` pode atuar na branch corrente sem criar branch dedicada ou usar `git worktree`; apresente diff/evidências e aguarde aceite explícito antes de concluir.
