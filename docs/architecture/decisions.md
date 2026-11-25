# Decisões Arquiteturais: spool-management-by-project

## ADR 001: Adoção do Modelo Multiagente e Governança
- **Contexto:** Necessidade de desenvolvimento seguro, modular e com controle estrito de contexto e consumo de tokens.
- **Decisão:** Workflow com agentes especializados, branches dedicadas por tarefa e governança de aceite obrigatório.
- **Consequências:** Clareza no ownership de arquivos, ausência de edições concorrentes na branch principal e rastreabilidade total.

## ADR 002: Stack e Tecnologias Iniciais (html, css, javascript)
- **Contexto:** Inicializar o projeto de acordo com a stack definida nas perguntas iniciais: frontend com `html, css, javascript`, persistência `sem banco` e testes com `nenhum` / `nenhum`.
- **Decisão:** Iniciar o projeto com o start mais leve e funcional possível respeitando essas tecnologias captadas, permitindo avançar e incorporar dependências ou frameworks adicionais de forma incremental sob demanda.
- **Consequências:** Inicialização rápida, sem dependências desnecessárias ou peso prematuro na partida, com total fidelidade ao escopo definido pelo usuário.

## ADR 003: Restrição Estrita de Papel do Orquestrador e Ownership dos Agentes
- **Contexto:** Determinação explícita do usuário para assegurar que o Orquestrador não atue como codificador nem execute alterações em artefatos de código, testes ou documentações de especialistas.
- **Decisão:** Formalização da regra inegociável em `docs/architecture/governanca-papeis-agentes.md`: o `alvenius-orchestrator` atua exclusivamente no gerenciamento, planejamento, delegação e integração de relatos; é terminantemente proibido de codificar ou alterar arquivos de produção. O ownership é estritamente distribuído entre `alvenius-frontend` (`src/web/**`), `alvenius-designer` (`docs/designer/**`) e `alvenius-task-board` (`docs/architecture/**` e API de tarefas).
- **Consequências:** Preservação da integridade do código, ausência de efeitos colaterais por ações não especializadas do orquestrador e garantia de delegação mandatória para os especialistas correspondentes.

## ADR 004: Diretrizes de Fidelidade Visual e Replicação de Layout a partir de Prints
- **Contexto:** Necessidade de garantir assertividade, consistência estética e conformidade visual estrita quando referências de interface são fornecidas via prints/capturas de tela, evitando divergências entre concepção e código.
- **Decisão:** Estabelecer protocolo obrigatório para `alvenius-designer` e `alvenius-frontend` estruturado em 4 pilares:
  1. **Extração Prévia de Tokens Numéricos:** Levantamento rigoroso de proporções, medidas (larguras %, alturas px, paddings, tamanhos de fonte, line-height, alinhamentos e códigos hexadecimais exatos de cores) antes de codificar ou modelar.
  2. **Papel Ativo do Designer:** O designer formaliza a anatomia visual e os tokens de layout (`tokens.json` e wireframe detalhado em `docs/designer/<nome_do_layout>`), eliminando suposições pelo frontend.
  3. **Viewport Fixo de Validação:** Adoção de resolução mobile alvo fixa (ex.: 360x740) e comparação visual do preview lado a lado com a imagem de referência antes de cada entrega para aceite.
  4. **Regra de Ouro em Caso de Dúvidas:** Diante de qualquer dúvida, inconsistência ou ambiguidade visual de layout, NUNCA adivinhar: SEMPRE parar e perguntar ao usuário antes de implementar.
- **Consequências:** Eliminação de retrabalho por suposições visuais, garantia de alta fidelidade visual (pixel precision), documentação viva de design tokens e clareza no alinhamento de expectativas com o usuário. Detalhes completos em `docs/architecture/diretrizes-fidelidade-prints.md`.
