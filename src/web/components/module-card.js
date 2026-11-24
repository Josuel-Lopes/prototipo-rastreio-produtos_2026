/**
 * Componente ModuleCard - Alvenius
 * Responsabilidade Única: renderizar um card de módulo (ícone, título, subtítulo)
 */

export function renderModuleCard({ id, title, subtitle, iconSrc }) {
  return `
    <div class="menu-card" data-route="${id}" role="button" tabindex="0">
      <div class="menu-card-icon-wrapper">
        <img src="${iconSrc}" alt="${title}" class="menu-card-icon-img" />
      </div>
      <h3 class="menu-card-title">${title}</h3>
      <p class="menu-card-subtitle">${subtitle}</p>
    </div>
  `;
}
