# Guia de Implementação Visual: Fidelidade Menu Drawer e Telas Internas

Este documento especifica minuciosamente as diretrizes de design, layout e arquitetura CSS para sanar as divergências visuais detectadas entre os prints oficiais de referência (`copilot-image-ca7085.png`, `copilot-image-dc8611.png`, `copilot-image-988b75.png`) e o print gerado (`copilot-image-247960.png`).

---

## 1. Diagnóstico do Problema Crítico: A Pill Cortada ao Meio (`247960.png`)

### 1.1 Causa Raiz
No header da aplicação, a barra superior cinza possui altura de `145px`. A pill central flutuante (`.header-center-pill`) está posicionada a cavaleiro da linha inferior:
- `position: absolute; top: 145px; left: 50%; transform: translate(-50%, -50%);`
- Com altura de `56px`, a pill projeta **28px para cima** (dentro da barra cinza, de 117px a 145px) e **28px para baixo** (de 145px a 173px).
- O painel do drawer (`.header-drawer-panel`) está configurado como `position: fixed; top: 145px; height: calc(100vh - 145px);`.

No print `247960.png`, a metade inferior da pill (abaixo de 145px) foi coberta pelo painel do drawer porque:
1. O painel do drawer estava posicionado no DOM após a pill ou possuía um contexto de empilhamento / z-index que o colocava na frente da pill;
2. Como o drawer começava exatamente em `top: 145px`, sua superfície sólida/cinza cobriu a metade inferior da pill, enquanto a metade superior (dentro da barra do header acima de 145px) permaneceu visível, criando o efeito de **"corte ao meio"**.

### 1.2 Solução Visual Mandatória (Referência Oficial `ca7085.png`)
Na referência oficial, a pill flutuante está **100% INTEIRA, INTACTA e VISÍVEL NA FRENTE DE TUDO**:
- Fundo branco puro `#ffffff`.
- Cantos arredondados suaves `border-radius: 8px`.
- Borda sutil `1px solid #d0d7de`.
- Sombra suave projetada sobre o drawer: `box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18)`.
- **Hierarquia de Z-Index:**
  * `.header-center-pill`: `z-index: 200`
  * `.btn-header-hamburger`: `z-index: 250`
  * `.header-drawer-panel`: `z-index: 150`
- Dessa forma, o drawer se estende por trás da pill, e a pill sobrepõe-se elegantemente à borda e ao topo do drawer.

---

## 2. Posição e Padding do Topo do Menu Drawer

Como a metade inferior da pill penetra **28px** abaixo do topo do drawer (`top: 145px`), o conteúdo interno do menu não pode iniciar colado ao topo sob risco de colisão de texto e ícones.

### 2.1 Especificação de Compensação
- O container de conteúdo do drawer (`.drawer-content`) deve receber:
  ```css
  .drawer-content {
    max-width: 580px;
    margin: 0 auto;
    padding-top: 40px; /* Garante 12px de folga abaixo da borda da pill (28px + 12px) */
    padding-bottom: 32px;
    padding-left: 0;
    padding-right: 0;
  }
  ```
- O primeiro item interno (`.drawer-user-row` com a saudação "Bem vindo, **josuellopes**") ficará perfeitamente visível e legível, sem encavalar com a pill.

---

## 3. Fundo Translúcido com Efeito Blur (Referência `ca7085.png`)

O fundo do drawer deve permitir ver suavemente as formas e cores da tela interna ao fundo com desfoque elegante:
```css
.header-drawer-panel {
  position: fixed;
  top: 145px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - 145px);
  z-index: 150;
  background: rgba(225, 230, 238, 0.94);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
```

---

## 4. Lista de Navegação e Alinhamentos dos Módulos

Na referência `copilot-image-ca7085.png` e `copilot-image-dc8611.png`:
1. **Itens de Linha:**
   - Altura de linha consistente: `height: 52px;` ou `min-height: 52px; padding: 14px 0;`.
   - Divisórias azuis acinzentadas industriais: `border-bottom: 2px solid #7188a4;`.
   - Margem lateral de 16px: `margin: 0 16px;`.
2. **Ícones e Textos:**
   - Ícone do módulo à esquerda: Lucide SVG tamanho 22px, traço 2px, cor preta `#111827`.
   - Espaçamento ícone-texto: `gap: 14px;`.
   - Texto em caixa alta: `font-size: 16px; font-weight: 600; color: #111827; letter-spacing: 0.3px;`.
   - Chevron à direita: Lucide SVG `chevron-right` tamanho 22px, traço 2px, cor cinza `#6b7280`.
3. **Item da Tela Ativa (CADASTRO):**
   - Na tela ativa, o item correspondente no menu fica **esmaecido com opacidade suave**:
     ```css
     .mobile-drawer-nav-item.is-active,
     .mobile-drawer-nav-item[data-nav="cadastro"] {
       opacity: 0.45;
       cursor: default;
       pointer-events: none;
     }
     ```

---

## 5. Botão Sair no Rodapé

Na referência `copilot-image-ca7085.png` e `copilot-image-988b75.png`:
- **Geometria:** Retângulo fechado com cantos estritamente retos (`border-radius: 0px`).
- **Dimensões:** Altura de `52px`, largura integral respeitando as margens laterais de 16px (`width: calc(100% - 32px); margin: 24px 16px;`).
- **Borda:** `2px solid #7188a4`.
- **Fundo:** Transparente (hover suave `rgba(220, 38, 38, 0.06)`).
- **Conteúdo Centralizado:**
  - Ícone Lucide `log-out` (22px, stroke 2.2px, `#dc2626`).
  - Texto "Sair" (`font-size: 17px; font-weight: 600; color: #dc2626;`).
  - Centralização absoluta horizontal e vertical: `display: flex; align-items: center; justify-content: center; gap: 10px;`.

---

## 6. Variação: Menu Drawer da Home (`copilot-image-988b75.png`)

Na Home (`copilot-image-988b75.png`), o menu drawer possui composição enxuta:
1. Linha do Usuário: Ícone de usuário Lucide + "Bem vindo, **josuellopes**".
2. Linha divisória `2px solid #7188a4`.
3. Segunda linha divisória separadora `2px solid #7188a4`.
4. Botão "Sair" com cantos retos 0px, altura 52px, borda `2px solid #7188a4`, texto e ícone `#dc2626` centralizados.
5. **NÃO exibe a lista dos 8 módulos de trabalho**.

---

## 7. Folha de Estilos de Referência para o Frontend (`src/web/styles/header.css`)

```css
/* ==========================================================================
   Ajustes de Z-Index e Resolução da Pill Cortada
   ========================================================================== */

/* Botão hambúrguer sempre no topo absoluto */
.btn-header-hamburger {
  z-index: 250 !important;
}

/* Pill flutuante a cavaleiro sobreposta ao drawer sem corte */
.header-center-pill {
  position: absolute;
  top: 145px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200 !important; /* Sempre acima do drawer (z-index 150) */
  pointer-events: none;
}

.header-center-pill .floating-pill {
  width: 260px;
  height: 56px;
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  font-size: 16px;
  font-weight: 700;
  color: #0a2540;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

/* Drawer Dropdown Overlay */
.header-drawer-panel {
  display: none;
  position: fixed;
  top: 145px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - 145px);
  z-index: 150 !important; /* Atrás da pill (200) e hambúrguer (250) */
  background: rgba(225, 230, 238, 0.94);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

.app-header-container.menu-expanded .header-drawer-panel,
.menu-expanded .header-drawer-panel {
  display: block !important;
}

/* Conteúdo interno do drawer com folga da pill */
.drawer-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 40px 0 32px 0; /* 40px de padding-top para não colidir com os 28px da pill */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Linha do usuário */
.drawer-user-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 0 16px 0;
  margin: 0 16px 14px 16px;
  border-bottom: 2px solid #7188a4;
  box-sizing: border-box;
}

/* Itens de navegação */
.mobile-drawer-nav-list {
  list-style: none;
  margin: 0 16px;
  padding: 0;
}

.mobile-drawer-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  min-height: 52px;
  padding: 14px 0;
  border-bottom: 2px solid #7188a4;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.15s ease, background-color 0.15s ease;
  user-select: none;
  box-sizing: border-box;
}

.mobile-drawer-nav-item.is-active,
.mobile-drawer-nav-item[aria-current="page"] {
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
}

.drawer-item-icon {
  width: 22px;
  height: 22px;
  color: #111827;
}

.drawer-item-label {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.drawer-chevron {
  width: 22px;
  height: 22px;
  color: #6b7280;
}

/* Botão Sair com cantos retos 0px */
.btn-drawer-logout-home,
.btn-drawer-logout-work {
  border: 2px solid #7188a4;
  border-radius: 0px;
  background: transparent;
  height: 52px;
  margin: 24px 16px 24px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #dc2626;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
}

.btn-drawer-logout-home:hover,
.btn-drawer-logout-work:hover {
  background-color: rgba(220, 38, 38, 0.06);
}
```

