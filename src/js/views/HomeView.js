/**
 * Home View
 * Principio SOLID: Single Responsibility - Renderiza página home
 */

import { CLASES_ARRAY } from '../constants/clases.js';
import { ProgressBarComponent } from '../components/ProgressBarComponent.js';

export class HomeView {
  constructor(progressService, navigationService, user = null) {
    this.progressService = progressService;
    this.navigationService = navigationService;
    this.user = user;
  }

  render() {
    const progresoGeneral = this.progressService.obtenerProgresoGeneral();
    const progreso = this.progressService.obtenerProgreso();

    const tarjetas = CLASES_ARRAY.map((clase) => {
      const claseProgress = progreso.clases[clase.id] || { completada: false, progreso: 0 };
      const desbloqueada = this.navigationService.esClaseDesbloqueada(clase.id);
      const completada = claseProgress.completada;

      const claseClass = completada
        ? 'card--completed'
        : desbloqueada
          ? 'card--clickable'
          : 'card--disabled';

      return `
        <div class="card ${claseClass}" data-clase="${clase.id}">
          <div class="card__header">
            <div class="card__icon card__icon--${this.getColorVariant(clase.id)}">
              ${this.getIcon(clase.icono)}
            </div>
            <div>
              <h3 class="card__title">${clase.nombre}</h3>
              <p class="card__subtitle">${clase.descripcion}</p>
            </div>
            <div class="card__badge">
              ${completada ? '✓ Completada' : `Orden: ${clase.orden}`}
            </div>
          </div>
          <div class="card__content">
            <p class="card__description">${clase.duracion}</p>
            ${this.renderProgress(claseProgress.progreso)}
          </div>
          <div class="card__footer">
            <button 
              class="btn btn--primary btn--sm"
              ${!desbloqueada ? 'disabled' : ''}
              data-action="start-clase"
              data-clase="${clase.id}"
            >
              ${completada ? 'Ver nuevamente' : 'Comenzar'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="home-view">
        <section class="home-hero">
          <h1>Ayudantía TIC: Competencias Digitales para la Vida Académica</h1>
          <p>Completa las misiones para fortalecer tus habilidades digitales en el entorno académico.</p>
        </section>

        <section class="home-progress">
          <h2>Tu Progreso General</h2>
          <div id="progress-container"></div>
          <div class="progress-stats">
            <div class="stat">
              <span class="stat__label">Clases Completadas</span>
              <span class="stat__value">${Object.values(progreso.clases).filter((c) => c.completada).length}/${Object.keys(progreso.clases).length}</span>
            </div>
            <div class="stat">
              <span class="stat__label">Puntos Totales</span>
              <span class="stat__value">${progreso.puntos}</span>
            </div>
            <div class="stat">
              <span class="stat__label">Badges Desbloqueados</span>
              <span class="stat__value">${progreso.badges.length}/5</span>
            </div>
          </div>
        </section>

        <section class="home-clases">
          <h2>Misiones Disponibles</h2>
          <div class="clases-grid">
            ${tarjetas}
          </div>
        </section>
      </div>
    `;
  }

  renderProgress(porcentaje) {
    const pb = new ProgressBarComponent(porcentaje, 'Progreso de clase');
    return `<div class="progress-wrapper">${pb.render()}</div>`;
  }

  getIcon(icono) {
    const icons = {
      login: '🔓',
      email: '💬',
      document: '📄',
      star: '⭐',
      spreadsheet: '📊',
    };
    return icons[icono] || '📌';
  }

  getColorVariant(claseId) {
    const variants = {
      clase1: 'primary',
      clase2: 'secondary',
      clase3: 'accent',
      clase4: 'info',
      clase5: 'success',
    };
    return variants[claseId] || 'primary';
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners();
      this.renderProgressBar();
    }
  }

  attachListeners() {
    document.querySelectorAll('[data-action="start-clase"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const claseId = btn.dataset.clase;
        this.navigationService.ir(`/${claseId}`);
      });
    });
  }

  renderProgressBar() {
    const progreso = this.progressService.obtenerProgresoGeneral();
    const pb = new ProgressBarComponent(progreso, 'Progreso General');
    const container = document.querySelector('#progress-container');
    if (container) {
      container.innerHTML = pb.render();
    }
  }
}

export default HomeView;
