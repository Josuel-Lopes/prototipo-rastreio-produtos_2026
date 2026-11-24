---
name: spool-management-by-project-workflow
description: "Use when: implementing or debugging spool-management-by-project features, coordinating backend and frontend work, checking spec alignment, deciding on test execution, or updating the project memory with durable decisions."
---

# spool-management-by-project workflow

## Quando usar

Use esta skill para qualquer tarefa relacionada ao projeto spool-management-by-project, especialmente quando:

- houver necessidade de implementar ou revisar funcionalidade do app;
- o trabalho exigir coordenação entre frontend e designer;
- a spec, o código existente ou as instruções do projeto divergirem;
- for preciso decidir se testes devem ou não ser executados;
- o agente precisar registrar decisões técnicas importantes na memória do projeto.

## Processo obrigatório

- Suas respostas devem ser diretas, curtas e objetivas; só detalhe quando solicitado.

### 1. Ler as fontes de verdade antes de decidir

Antes de propor alterações, leia em ordem:

1. `specs/SPEC.md`
2. `.github/copilot-instructions.md`
3. instruções relevantes em `.github/prompts/`
4. `memory/index.json` quando disponível

### 2. Definir o tipo de trabalho

Classifique a tarefa antes de editar arquivos:

- Frontend: construir todo o HTML, CSS e JavaScript e toda a parte visual e funcional das páginas e componentes, bem como a integração da web com o backend.
- Designer: criar layouts das páginas e componentes solicitados em diretório `docs/designer/com_nome_que_representa_layout`.
- Orquestração: quando a mudança cruza áreas ou exige coordenação de múltiplos agentes.

### 3. Isolar a execução e preparar o aceite

- Antes de qualquer edição, o orchestrator atribui ao agente uma branch dedicada à tarefa. Não crie nem use `git worktree`. Agentes de implementação nunca editam a branch principal.
- Quando a tarefa envolver vários agentes, avalie se os caminhos são independentes: se forem, atribua branches distintas para execução em paralelo.
- `spool-management-by-project-orchestrator` e `spool-management-by-project-task-board` são exceções: atuam na branch corrente, sem branch dedicada.
- Ao terminar, entregue diff e evidências. Para mudança visual, disponibilize preview navegável por navegador; para mudança sem UI, declare expressamente que preview web não se aplica.
- Apresente o resultado e aguarde aprovação explícita do usuário antes de realizar merge ou concluir.
