# Fluxos Principais: spool-management-by-project

## 1. Fluxo de Navegação e Entrega Web
- O usuário acessa a aplicação web servida a partir de `src/web/` através do servidor HTTP básico em `src/server/`.
- A interface renderiza os elementos e scripts de frontend baseados em html, css, javascript.

## 2. Fluxo de Comunicação e Serviços
- A interface web em `src/web/` interage com o backend através de requisições HTTP para rotas de serviço em `src/server/`.
- Persistência: sem banco. Casos de persistência em banco são integrados modularmente sob demanda.
