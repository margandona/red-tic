/**
 * Badge Component
 * Principio SOLID: Single Responsibility - Renderiza badge/logro
 */

export class BadgeComponent {
  constructor(badge, isUnlocked = false, isNew = false) {
    this.badge = badge;
    this.isUnlocked = isUnlocked;
    this.isNew = isNew;
  }

  render() {
    let clases = [];
    
    if (this.isUnlocked) {
      clases.push('badge--unlocked');
      if (this.isNew) {
        clases.push('badge--unlocking badge--unlocked-glow');
      }
    } else {
      clases.push('badge--locked');
    }

    const newBadgeTag = this.isNew ? '<div class="badge__new-badge">¡NUEVO!</div>' : '';

    return `
      <div class="badge ${clases.join(' ')}" data-badge-id="${this.badge.id}">
        <div class="badge__icon${this.isNew ? ' badge__icon--unlocking' : ''}">${this.badge.icono}</div>
        <div class="badge__name">${this.badge.nombre}</div>
        <div class="badge__description">${this.badge.descripcion}</div>
        <div class="badge__points">+${this.badge.puntos} pts</div>
        ${newBadgeTag}
      </div>
    `;
  }
}

export default BadgeComponent;
