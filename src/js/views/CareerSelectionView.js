/**
 * Career Selection View
 * Principio SOLID: Single Responsibility - Renderiza selección de carrera
 */

import { CARRERAS, listarCarreras } from '../constants/carreras.js';
import { ROUTES } from '../constants/routes.js';

export class CareerSelectionView {
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  render() {
    const carreras = listarCarreras();

    const tarjetas = carreras.map((carrera) => {
      return `
        <div class="career-card" data-carrera="${carrera.id}">
          <div class="career-card__icon">${carrera.icono}</div>
          <h3 class="career-card__title">${carrera.nombre}</h3>
          <p class="career-card__description">${carrera.descripcion}</p>
          <button 
            class="btn btn--primary btn--md"
            data-action="select-career"
            data-carrera="${carrera.id}"
          >
            Seleccionar
          </button>
        </div>
      `;
    }).join('');

    return `
      <div class="career-selection-view">
        <section class="career-hero">
          <h1>Selecciona tu Carrera</h1>
          <p>Debes seleccionar tu carrera para acceder a los recursos personalizados de tu programa académico.</p>
        </section>

        <section class="career-grid">
          ${tarjetas}
        </section>
      </div>
    `;
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    container.innerHTML = this.render();
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll('[data-action="select-career"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const carreraId = e.currentTarget.dataset.carrera;
        this.selectCarrera(carreraId);
      });
    });
  }

  selectCarrera(carreraId) {
    const carrera = CARRERAS[Object.keys(CARRERAS).find(
      (key) => CARRERAS[key].id === carreraId
    )];

    if (carrera) {
      // Notificar al navigationService que se seleccionó carrera
      this.navigationService.selectCarrera(carreraId);

      // Forzar navegación al home aun cuando ya estemos en la misma ruta
      if (window.location.hash !== `#${ROUTES.HOME}`) {
        window.location.hash = ROUTES.HOME;
      } else {
        window.dispatchEvent(new Event('hashchange'));
      }
    }
  }
}

export default CareerSelectionView;
