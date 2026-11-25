<div align="center">

# PROPOSTA COMERCIAL

## Sistema de Rastreio de Produtos e Gestão de Spools

**Preparada para** Alvenius Tubos e Conexões · **Por** MAXCODE42

*Construindo seu software — Código limpo, produto no centro e entregas orgânicas contínuas.*

</div>

> **Paleta de referência:** Azul marinho `#0B2545` · Azul royal `#1F4FD8` · Cinza industrial `#5B6670` · Fundo claro `#F2F4F7`

---

## 1. Identificação

| Campo | Informação |
|---|---|
| **Cliente (Contratante)** | Alvenius Tubos e Conexões — <https://alvenius.ind.br> |
| **Proponente** | MAXCODE42 — <https://maxcode42.com.br> |
| **Responsável técnico** | Josuel Lopes — <https://josuellopes.maxcode42.com.br> |
| **Projeto** | Sistema de Rastreio de Produtos e Gestão de Spools |
| **Proposta nº / Versão** | `PROP-2026-001` / v1.0 |
| **Data de emissão** | 24/11/2026 |
| **Validade** | 30 dias corridos |

---

## 2. Sumário Executivo

A Alvenius é líder em sistemas de tubulações ranhuradas (*grooved*), spools industriais, caldeiraria e revestimentos. Quanto maior o volume de peças, maior o desafio de saber **onde cada spool está, em que etapa e quanto custou**.

Esta proposta entrega controle em tempo real da produção, **do pedido à expedição**, com poucos cliques e sem papel. O resultado esperado:

- **Menos retrabalho e perdas:** cada peça tem histórico e responsável.
- **Decisão rápida:** diretores e gerentes veem a fábrica em um painel único.
- **Operação simples:** o encarregado usa o celular ou tablet no chão de fábrica.

---

## 3. Sobre a MAXCODE42

**8+ anos** de experiência · **50** repositórios · **26** projetos entregues · **100% Humano + IA**

Nossos quatro pilares em todo projeto: **Custo · Valor · Tempo · Qualidade**.

**Como construímos:** Clean Architecture (sistema fácil de evoluir), APIs e microsserviços, Cloud/Kubernetes, segurança Zero Trust, aderência à LGPD e Continuous QA (qualidade verificada a cada entrega).

**Responsável:** Josuel Lopes, desenvolvedor Full Stack com 8+ anos em engenharia de software corporativa, arquitetura, Node.js, React, TypeScript, APIs RESTful e IA contextual.

---

## 4. Funcionalidades Propostas

> Cada funcionalidade segue o roteiro: **problema → como funciona → telas → dimensionamento multidisciplinar → prazo → investimento**.
> Valor/hora de referência: **R$ 90,00**. Dia útil = 8 horas.

### 4.0 Metodologia de Estimativa e Composição de Custos

Toda funcionalidade incluída no projeto ou adicionada sob demanda é precificada a partir de dois pilares obrigatórios: **composição multidisciplinar** e **matriz de correlação de impacto**.

#### 1. Composição Multidisciplinar por Disciplina Técnica
O esforço base ($T_{\text{base}}$) e o custo de cada funcionalidade são calculados considerando individualmente as 5 frentes técnicas:
$$T_{\text{base}} = T_{\text{backend}} + T_{\text{frontend}} + T_{\text{designer}} + T_{\text{database}} + T_{\text{testes}}$$

- **Backend ($T_{\text{backend}}$):** Regras de negócio, rotas e controllers, lógica de serviços, mensageria e integrações REST/ERP.
- **Frontend ($T_{\text{frontend}}$):** Telas web e mobile, componentes de interface, validações no cliente e consumo de APIs.
- **Designer ($T_{\text{designer}}$):** UX/UI, wireframes, protótipos de alta fidelidade e design tokens/componentes visuais.
- **Database ($T_{\text{database}}$):** Modelagem de dados relacional, esquemas, criação/alteração de tabelas, migrations e queries.
- **Testes ($T_{\text{testes}}$):** Testes unitários, testes de integração, testes end-to-end (E2E) e roteiro de homologação/QA.

#### 2. Matriz de Correlação e Impacto com Funcionalidades Anteriores
A cada nova funcionalidade adicionada, avalia-se tecnicamente a relação com o que já existe ou foi orçado anteriormente no escopo:

| Cenário de Correlação | Critério Técnico | Cálculo de Tempo ($T_{\text{funcionalidade}}$) | Impacto no Orçamento Consolidado |
|---|---|---|---|
| **A. Relacionada com Reaproveitamento** | A nova funcionalidade aproveita estruturas, endpoints, tabelas ou componentes já desenvolvidos. | $T = T_{\text{base}} - T_{\text{reaproveitado}}$ | **Subtrai** tempo e valor correspondentes à economia de esforço pelo reúso. |
| **B. Relacionada com Necessidade de Alteração** | Não é possível reaproveitar diretamente e a nova funcionalidade exige refatorações ou modificações no escopo existente. | $T = T_{\text{base}} + T_{\text{alteração}}$ | **Adiciona** tempo e valor correspondentes às alterações nas funcionalidades anteriores. |
| **C. Não Relacionada (Independente)** | A funcionalidade é modular e isolada, sem interferência ou vínculo com funcionalidades anteriores. | $T = T_{\text{base}}$ | **Soma** tempo e valor ao acumulado da proposta e ao valor final. |

#### 3. Regra de Precificação e Métricas Individuais
- O valor financeiro individual de cada funcionalidade é obtido multiplicando o tempo ajustado pela taxa hora acordada:
  $$V_{\text{funcionalidade}} = T_{\text{funcionalidade}} \times \text{R\$ 90,00}$$
- **Métricas Individuais Obrigatórias:** Toda funcionalidade é apresentada com seu tempo (horas e dias úteis) e valor financeiro (R$) próprios e destacados.
- O investimento e prazo totais do projeto resultam da consolidação das entregas individuais:
  $$T_{\text{total}} = \sum_{i=1}^{n} T_{\text{funcionalidade}_i} \qquad \text{e} \qquad V_{\text{total}} = \sum_{i=1}^{n} V_{\text{funcionalidade}_i}$$

---

### 4.1 Rastreio de Produtos por QR Code

**Objetivo de negócio e problema resolvido**
Hoje a localização e o status das peças dependem de planilhas, papel e perguntas de corredor. Com um QR Code por peça, qualquer pessoa sabe *o que é, onde está e em que etapa* em segundos.

**Como funciona na prática**
1. O sistema gera uma etiqueta com QR Code para cada spool/produto.
2. O encarregado cola a etiqueta na peça.
3. A cada etapa (corte, solda, revestimento, inspeção, expedição), o operador aponta o celular para o QR Code.
4. Ele confirma a etapa com um toque; o sistema registra data, hora e responsável.
5. O histórico completo da peça fica disponível para consulta.

**Telas e exemplos visuais**
> 📷 *Espaço reservado: print da tela de leitura do QR Code*
> 📷 *Espaço reservado: modelo da etiqueta impressa*
> 📊 *Espaço reservado: diagrama do fluxo de etapas da peça*

| Horas | Prazo | Investimento |
|---|---|---|
| 40 h | 5 dias úteis | **R$ 3.600,00** |

---

### 4.2 Gestão de Spools e Projetos

**Objetivo de negócio e problema resolvido**
Cada projeto reúne dezenas ou centenas de spools. Sem visão agrupada, é difícil saber se o pedido do cliente será entregue no prazo.

**Como funciona na prática**
1. O gerente cadastra o projeto/pedido e seus spools (ou importa uma lista).
2. Define prazo, prioridade e responsável.
3. O encarregado vê a fila de trabalho do dia e atualiza o andamento.
4. O sistema calcula automaticamente o percentual de conclusão do projeto.
5. Atrasos e pendências ficam destacados em cores.

**Telas e exemplos visuais**
> 📷 *Espaço reservado: lista de projetos com percentual de conclusão*
> 📷 *Espaço reservado: detalhe do spool (dados, etapas, histórico)*
> 📊 *Espaço reservado: diagrama projeto → spools → etapas*

| Horas | Prazo | Investimento |
|---|---|---|
| 40 h | 5 dias úteis | **R$ 3.600,00** |

---

### 4.3 Controle de Sucata e Retrabalho

**Objetivo de negócio e problema resolvido**
Material descartado ou refeito é custo escondido. Sem registro, não se sabe onde, quando e por que ocorre.

**Como funciona na prática**
1. Na leitura do QR Code, o operador escolhe "Sucata" ou "Retrabalho".
2. Informa o motivo em uma lista simples e, se quiser, anexa uma foto.
3. O sistema abre a ocorrência e avisa o responsável.
4. Ao resolver, o encarregado encerra a ocorrência.
5. Relatórios mostram os motivos mais frequentes e o custo estimado das perdas.

**Telas e exemplos visuais**
> 📷 *Espaço reservado: formulário de ocorrência*
> 📊 *Espaço reservado: gráfico de perdas por motivo*

| Horas | Prazo | Investimento |
|---|---|---|
| 36 h | 4,5 dias úteis | **R$ 3.240,00** |

---

### 4.4 Painel Gerencial

**Objetivo de negócio e problema resolvido**
Diretores e gerentes precisam de uma visão única da fábrica, sem esperar relatórios manuais.

**Como funciona na prática**
1. O gestor acessa o painel pelo navegador, no computador ou celular.
2. Vê indicadores: spools por etapa, entregas no prazo, atrasos e perdas.
3. Filtra por projeto, cliente ou período.
4. Exporta relatórios em PDF ou planilha.

**Telas e exemplos visuais**
> 📷 *Espaço reservado: painel com indicadores principais*
> 📊 *Espaço reservado: exemplo de relatório exportado*

| Horas | Prazo | Investimento |
|---|---|---|
| 48 h | 6 dias úteis | **R$ 4.320,00** |

---

### 4.5 Integração com o ERP / Sistema Atual

**Objetivo de negócio e problema resolvido**
Digitar a mesma informação duas vezes gera erro e perda de tempo.

**Como funciona na prática**
1. O sistema recebe automaticamente os pedidos e cadastros já existentes na Alvenius.
2. Quando o spool é expedido, o status retorna ao sistema atual.
3. Falhas de comunicação são registradas e reenviadas automaticamente.

**Telas e exemplos visuais**
> 📊 *Espaço reservado: diagrama de integração entre os sistemas*
> 📷 *Espaço reservado: tela de monitoramento das integrações*

| Horas | Prazo | Investimento |
|---|---|---|
| 36 h | 4,5 dias úteis | **R$ 3.240,00** |

> Premissa: a Alvenius disponibiliza acesso e documentação do sistema a ser integrado.

---

## 5. Quadro Consolidado de Investimento e Cronograma

| Fase | Etapa | Horas | Prazo (dias úteis) | Valor (R$) |
|---|---|---:|---:|---:|
| 0 | Descoberta, alinhamento e design das telas | 24 h | 3 | 2.160,00 |
| 1 | Rastreio por QR Code | 40 h | 5 | 3.600,00 |
| 2 | Gestão de Spools e Projetos | 40 h | 5 | 3.600,00 |
| 3 | Controle de Sucata e Retrabalho | 36 h | 4,5 | 3.240,00 |
| 4 | Painel Gerencial | 48 h | 6 | 4.320,00 |
| 5 | Integração com ERP | 36 h | 4,5 | 3.240,00 |
| 6 | Homologação, treinamento e entrada em produção | 24 h | 3 | 2.160,00 |
| | **TOTAL** | **248 h** | **31 dias úteis (~6 semanas)** | **R$ 22.320,00** |

**Entregas por sprint (2 semanas):**

| Sprint | Conteúdo | Dias úteis |
|---|---|---:|
| 1 | Fase 0 + Fase 1 | 8 |
| 2 | Fase 2 | 5 |
| 3 | Fases 3 e 4 | 10,5 |
| 4 | Fase 5 + Fase 6 | 7,5 |

**Condições de pagamento (sugestão):** 30% na aprovação (R$ 6.696,00) · 40% na entrega da Sprint 2 (R$ 8.928,00) · 30% na homologação final (R$ 6.696,00).

---

## 6. Pós-Entrega, Homologação e Novas Demandas

### 6.1 Homologação
- A Alvenius testa cada entrega e aprova por escrito (e-mail ou ata).
- Prazo de resposta de homologação: até **5 dias úteis** por entrega.
- O que for aprovado passa a ser o **escopo homologado**.

### 6.2 Garantia e Suporte
- **90 dias corridos** de acompanhamento após a entrada em produção.
- Correção de desvios em relação ao escopo homologado **sem custo adicional**.
- Canal de suporte: e-mail e WhatsApp em horário comercial; resposta em até 1 dia útil.

### 6.3 Novas Solicitações
- Alteração ou funcionalidade fora do escopo homologado é **orçada à parte**, seguindo a **Metodologia de Estimativa e Composição de Custos** (Seção 4.0).
- Cada nova funcionalidade tem seu esforço decomposto nas 5 frentes técnicas: **Backend, Frontend, Designer, Database e Testes**.
- Aplica-se a análise de impacto:
  - **Reaproveitamento identificado:** subtrai tempo e valor correspondentes ao reúso de componentes existentes.
  - **Alterações necessárias no existente:** adiciona tempo e valor correspondentes ao retrabalho/adaptação nas funcionalidades anteriores.
  - **Sem impacto mútuo (independente):** soma tempo e valor diretamente à proposta e ao cronograma.
- Cada nova funcionalidade é entregue com seu **tempo e valor individuais**, somados ao investimento consolidado.
- Taxa hora padrão: **R$ 90,00/hora**.
- A MAXCODE42 envia estimativa de horas e prazo; **o trabalho só começa após aprovação prévia** da Alvenius.
- Não há cobrança surpresa: o valor aprovado é o valor cobrado.

---

## 7. Premissas e Fora de Escopo

**Premissas:** acesso a um responsável da Alvenius para dúvidas e homologação; fornecimento de dados e acessos para a integração; internet e dispositivos (celular/tablet) no chão de fábrica.

**Fora de escopo:** compra de hardware (impressoras de etiqueta, leitores, tablets), hospedagem em nuvem (orçada separadamente), customizações não listadas e conteúdo de treinamento além do previsto.

---

## 8. Aceite

| Alvenius Tubos e Conexões | MAXCODE42 |
|---|---|
| Nome: ______________________ | Josuel Lopes |
| Data: ____/____/______ | Data: ____/____/______ |
| Assinatura: __________________ | Assinatura: __________________ |

<div align="center">

**MAXCODE42** · Código limpo, produto no centro · <https://maxcode42.com.br>

</div>
