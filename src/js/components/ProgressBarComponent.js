/**
 * Progress Bar Component
 * Principio SOLID: Single Responsibility - Renderiza barra de progreso
 */

export class ProgressBarComponent {
  constructor(percentaje = 0, label = 'Progreso') {
    this.percentaje = Math.min(percentaje, 100);
    this.label = label;
  }

  render() {
    return `
      <div class="progress__label">
        <span class="progress__text">${this.label}</span>
        <span class="progress__percentage">${this.percentaje}%</span>
      </div>
      <div class="progress">
        <div 
          class="progress__bar" 
          style="width: ${this.percentaje}%"
        ></div>
      </div>
    `;
  }

  renderCircular() {
    const angle = (this.percentaje / 100) * 360;
    return `
      <div class="progress-circle" style="--progress-angle: ${angle}deg">
        <div class="progress-circle__content">
          <div class="progress-circle__percentage">${this.percentaje}%</div>
          <div class="progress-circle__label">${this.label}</div>
        </div>
      </div>
    `;
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
    }
  }

  update(nuevoPercentaje) {
    this.percentaje = Math.min(nuevoPercentaje, 100);
    const bar = document.querySelector('.progress__bar');
    if (bar) {
      bar.style.width = `${this.percentaje}%`;
    }
    const percentage = document.querySelector('.progress__percentage');
    if (percentage) {
      percentage.textContent = `${this.percentaje}%`;
    }
  }
}

export default ProgressBarComponent;
