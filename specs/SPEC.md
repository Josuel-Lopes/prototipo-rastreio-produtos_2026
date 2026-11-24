# Especificação: spool-management-by-project

## 1. Visão Geral
spool management by project

## 2. Arquitetura e Tecnologias Iniciais
- **Frontend:** html, css, javascript (HTML semântico, CSS estruturado e JavaScript básico).
- **Backend:** Node.js com servidor HTTP básico para servir a aplicação web e futuras rotas de API.
- **Banco de Dados:** sem banco (projeto inicial sem banco ou conforme definido nas configurações iniciais; extensível futuramente).
- **Testes:** nenhum (unitários/integração) e nenhum (E2E opt-in).
- **Evolução:** O projeto inicia com a base simples definida (HTML, CSS e JS com servidor HTTP básico), com total flexibilidade para avançar futuramente para frameworks ou bibliotecas adicionais conforme demandas das tarefas.

## 3. Diretórios e Responsabilidades
- `src/web/`: Arquivos de interface (HTML, CSS, JavaScript e assets visuais).
- `src/server/`: Servidor HTTP básico e regras de negócio/serviços.
- `src/pages/`: Páginas e rotas de extensão.
- `infra/`: Scripts operacionais e configurações de ambiente.
- `tests/`: Suítes de testes unitários, integração e E2E.
- `docs/architecture/`: Documentação arquitetural contínua mantida pelo task-board.
- `docs/designer/`: Layouts conceituais criados pelo designer.
