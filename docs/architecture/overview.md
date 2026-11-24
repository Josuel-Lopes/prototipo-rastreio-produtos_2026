# Visão Geral da Arquitetura: spool-management-by-project

## Estado Documentado
Este documento reflete a arquitetura base inicial do repositório `spool-management-by-project`.

## Forma da Aplicação
- **Frontend:** html, css, javascript estruturado em `src/web/` (HTML, CSS e JavaScript básico).
- **Backend:** Node.js em `src/server/` fornecendo servidor HTTP básico para servir os arquivos estáticos e rotas de API.
- **Persistência:** sem banco. Caso evolua no futuro, modelos e migrações serão configurados sob demanda em `infra/` e `src/server/`.
- **Evolução:** Inicia com o básico funcional e permite avançar futuramente para outros frameworks ou bibliotecas conforme definido nas tarefas.

## Camadas e Diretórios
- `src/web/`: Páginas HTML, folhas de estilo CSS, scripts JavaScript do cliente e assets.
- `src/server/`: Ponto de entrada do servidor HTTP (`src/server/index.js`), serviços e regras de negócio.
- `src/pages/`: Estrutura para expansão de páginas e rotas.
- `infra/`: Scripts operacionais (ex.: `serve.sh`) e configurações.
- `tests/`: Testes unitários (`tests/unit/`), de integração (`tests/integration/`) e E2E (`tests/e2e/`).
- `docs/architecture/`: Documentação viva mantida pelo agente `alvenius-task-board`.
