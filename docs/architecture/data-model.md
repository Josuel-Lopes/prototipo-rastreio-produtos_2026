# Modelo de Dados: spool-management-by-project

## Persistência
- Banco de dados inicial: **sem banco**.
- Se configurado "sem banco", a persistência direta em banco de dados fica postergada até que uma tarefa de negócio demande infraestrutura de dados.
- Caso o projeto evolua para utilizar banco de dados, os modelos e migrações serão estruturados em `src/server/` e `infra/`.
