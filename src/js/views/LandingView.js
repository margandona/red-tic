/**
 * Landing View
 * Portada institucional para desktop
 */

import { ROUTES } from '../constants/routes.js';

export class LandingView {
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  render() {
    return `
      <section class="landing-view" aria-label="Portada institucional">
        <div class="landing-view__bg" role="presentation"></div>
        <div class="landing-view__overlay"></div>

        <article class="landing-view__content">
          <img
            class="landing-view__logo"
            src="./assets/images/logo-CA.png"
            alt="Centro de Aprendizaje Santo Tomas"
          />
          <p class="landing-view__eyebrow">Centro de Aprendizaje</p>
          <h1>Ayudantía TIC: Competencias Digitales para la Vida Académica</h1>
          <p>
            Programa práctico de 8 horas para mejorar tus habilidades digitales.
          </p>

          <div class="landing-view__actions">
            <button class="btn btn--primary btn--lg" data-route="${ROUTES.HOME}">
              Entrar
            </button>
            <button class="btn btn--secondary btn--lg" data-route="${ROUTES.PERFIL}">
              Mi Perfil
            </button>
            <button class="btn btn--info btn--lg" data-route="${ROUTES.LEADERBOARD}">
              Ver Ranking
            </button>
          </div>
        </article>
      </section>
    `;
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners();
    }
  }

  attachListeners() {
    document.querySelectorAll('[data-route]').forEach((button) => {
      button.addEventListener('click', () => {
        const route = button.getAttribute('data-route');
        if (route) {
          this.navigationService.ir(route);
        }
      });
    });
  }
}

export default LandingView;
