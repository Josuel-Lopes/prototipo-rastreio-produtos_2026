# Diretrizes de Fidelidade Visual e Replicação de Layout a partir de Prints

Este documento define o padrão arquitetural e o fluxo operacional mandatório para os agentes `alvenius-designer` e `alvenius-frontend` ao receberem prints, capturas de tela ou imagens como referência para construção ou ajuste de interfaces no projeto `spool-management-by-project`.

---

## 1. Objetivo

Garantir fidelidade visual milimétrica (pixel precision), consistência estética e conformidade de layout ao transformar prints em artefatos visuais e componentes funcionais, eliminando suposições e retrabalho.

---

## 2. Pilares Fundamentais

### 2.1 Extração Prévia de Tokens Numéricos
Antes de qualquer linha de CSS/HTML ser escrita ou do wireframe ser finalizado:
- **Medidas e Proporções**: Extrair com rigor proporções e dimensões de cada elemento (larguras relativas `%`, larguras fixas, alturas em `px`, `min-height`/`max-width`).
- **Espaçamento**: Mapear `padding`, `margin`, `gap` de flex/grid.
- **Tipografia**: Identificar `font-size`, `line-height`, `font-weight`, `letter-spacing` e alinhamento de texto (`left`, `center`, `right`).
- **Cores Exatas**: Capturar os códigos hexadecimais (`#HEX`) exatos para background, bordas, fontes, sombras e estados interativos (hover/active/disabled).
- **Raios e Bordas**: Identificar `border-radius`, espessura e estilo de bordas.

### 2.2 Papel Ativo do Designer
- O agente `alvenius-designer` é o responsável por documentar formalmente a anatomia visual e os tokens de layout em `docs/designer/<nome_do_layout>`.
- O entregável do designer deve conter:
  - `tokens.json`: Cores hexadecimais, espaçamentos, tipografia e tamanhos formalizados.
  - Wireframe/especificação detalhada da estrutura dos blocos.
- O `alvenius-frontend` deve consumir esses tokens e wireframes diretamente, sem necessidade de deduzir ou inventar medidas.

### 2.3 Viewport Fixo de Validação
- **Resolução Alvo Padrão**: Fixar a resolução de teste mobile alvo (ex.: **360x740** ou a resolução exata do print fornecido).
- **Comparação Lado a Lado**: Antes de submeter ao aceite do usuário, inspecionar o preview navegável lado a lado com a imagem de referência fornecida, verificando alinhamento vertical/horizontal e proporções dos blocos.

### 2.4 Regra de Ouro em Caso de Dúvidas
> **Havendo qualquer dúvida, inconsistência, corte de imagem ou ambiguidade visual de layout nos prints recebidos, NUNCA adivinhe: SEMPRE pare e pergunte ao usuário antes de implementar ou formalizar o layout.**

---

## 3. Matriz de Responsabilidades

| Etapa | Responsável | Ação Esperada |
|---|---|---|
| Recepção do Print | `alvenius-orchestrator` / `alvenius-designer` | Analisar a imagem e encaminhar para documentação formal. |
| Mapeamento de Tokens | `alvenius-designer` | Inspecionar imagem, extrair medidas/cores e registrar `tokens.json`. |
| Dúvidas ou Ambiguidade | `alvenius-designer` / `alvenius-frontend` | Parar imediatamente e acionar o usuário para confirmação. |
| Codificação da Interface | `alvenius-frontend` | Codificar `src/web/**` ou `src/pages/**` respeitando fielmente os tokens do designer. |
| Validação Visual | `alvenius-frontend` | Conferir em viewport fixo (ex: 360x740) lado a lado com o print original. |
| Aceite do Usuário | Usuário | Aprovar preview navegável e conformidade visual antes de merge/conclusão. |
