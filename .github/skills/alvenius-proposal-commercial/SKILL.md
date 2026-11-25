---
name: spool-management-by-project-commercial
description: "Use when: elaborating, structuring, pricing or formatting software commercial proposals for new features in spool-management-by-project."
---

# spool-management-by-project commercial workflow

## Quando usar

Use esta skill sempre que for necessário:
- Estruturar propostas comerciais para novas funcionalidades ou módulos no projeto Alvenius.
- Definir escopo técnico e funcional de tecnologia (software, integrações, requisitos).
- Estimar prazos, cronograma de entregas (MVP, sprints) e alocação de especialistas (Frontend, Backend, Design).
- Elaborar modelos de precificação, premissas de projeto, SLAs e termos contratuais de software.
- Revisar a viabilidade comercial e técnica de novas demandas apresentadas pelo cliente.

## Processo de Elaboração de Proposta

1. **Entendimento da Demanda e Dores do Negócio:**
   - Analisar os requisitos do cliente (ex: rastreabilidade de spools, leitor QRCode, módulo de sucata, integração ERP).
   - Identificar os impactos operacionais e ganhos de produtividade no chão de fábrica.

2. **Dimensionamento Técnico e Matriz de Impacto/Precificação (Regra Obrigatória):**
   Ao orçar ou adicionar qualquer nova funcionalidade, aplicar o cálculo discriminado por disciplina técnica e a matriz de relação com o existente:
   - **Disciplinas de cálculo obrigatórias:**
     - **Backend:** regras de negócio, serviços, endpoints, orquestração e integrações.
     - **Frontend:** interfaces gráficas, componentes visuais, formulários e integração com APIs.
     - **Designer:** arquitetura de informação, UX/UI, protótipos de baixa/alta fidelidade e design tokens.
     - **Database:** modelagem relacional/não-relacional, tabelas, migrações de dados, índices e queries.
     - **Testes:** plano de testes, testes unitários, testes de integração, testes E2E e validação QA.
   - **Matriz de Relação e Impacto (Aproveitamento / Alteração / Soma):**
     - **Relacionada com reaproveitamento:** se a nova funcionalidade puder usufruir de artefatos já criados, calcular o desconto do esforço e **subtrair** tempo e valor equivalentes.
     - **Relacionada com necessidade de alteração:** se exigir refatorações ou modificações nas funcionalidades anteriores, dimensionar o esforço extra e **adicionar** tempo e valor correspondentes.
     - **Não relacionada (independente):** se não houver impacto nas funcionalidades anteriores, apenas **somar** tempo e valor ao acumulado da proposta e ao total final.
   - **Individualidade das Métricas:** toda funcionalidade deve ter explicitados seu tempo (horas/dias) e valor financeiro (R$) individuais.

3. **Parâmetros Comerciais Oficiais:**
   - **Valor/Hora Base da Proposta:** R$ 90,00/h.
   - **Valor/Hora para Novas Funcionalidades / Solicitações Pós-Entrega:** R$ 90,00/h (com aprovação prévia).
   - **Prazo de Garantia de Software e Ajustes Pós-Entrega:** 90 dias corridos após entrada em produção (sem custo adicional para correção de desvios do escopo homologado).

4. **Estrutura Padrão da Proposta:**
   Toda proposta gerada em `proposals/` deve conter:
   - **Cabeçalho:** Cliente (Alvenius Tubos e Conexões), Projeto, Data, Versão e Responsável.
   - **Sumário Executivo:** Contexto e objetivos estratégicos da entrega.
   - **Metodologia de Estimativa:** Apresentação da decomposição técnica (Backend, Frontend, Designer, Database, Testes) e da matriz de impacto aplicada.
   - **Escopo Técnico e Funcional:** Descrição cirúrgica das funcionalidades, interfaces e regras de negócio com tempo e valor individuais.
   - **Arquitetura da Solução:** Tecnologias adotadas, padrões de segurança e integrações.
   - **Cronograma e Fases:** Detalhamento por sprint/fase com entregáveis claros.
   - **Estimativa de Investimento:** Modelo de contratação (escopo fechado, squad dedicada ou time & materials) com consolidado final derivado da soma dos individuais.
   - **Premissas e Critérios de Aceite:** O que está incluído, o que está fora de escopo e condições para homologação.

5. **Governança e Entrega:**
   - Salvar a proposta em formato Markdown (e opcionalmente PDF/HTML de apresentação) em `proposals/`.
   - Apresentar o resumo ao usuário/orquestrador para alinhamento e validação comercial.
