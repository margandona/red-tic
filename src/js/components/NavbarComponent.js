/**
 * Navbar Component
 * Principio SOLID: Single Responsibility - Renderiza navbar
 */

import { ROUTES } from '../constants/routes.js';

export class NavbarComponent {
  constructor(progressService, navigationService) {
    this.progressService = progressService;
    this.navigationService = navigationService;
  }

  render() {
    const progreso = this.progressService.obtenerProgresoGeneral();

    return `
      <nav class="navbar">
        <button id="hamburger-btn" class="navbar__hamburger" title="Menú" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="navbar__logo">🎮 Gamified</div>
        <div class="navbar__title">Ayudantía TIC: Competencias Digitales para la Vida Académica</div>
        <div class="navbar__actions">
          <button id="profile-btn" class="navbar__profile-btn" title="Mi Perfil">
            👤 Perfil
          </button>
          <div class="navbar__progress-mini">
            <span class="navbar__progress-text">Progreso</span>
            <div class="navbar__progress-circle">${progreso}%</div>
          </div>
        </div>
      </nav>
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
    // Botón de perfil
    document.getElementById('profile-btn')?.addEventListener('click', () => {
      if (this.navigationService) {
        this.navigationService.ir(ROUTES.PERFIL);
      } else {
        window.location.hash = '#/perfil';
      }
    });

    // Botón hamburguesa
    document.getElementById('hamburger-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleSidebar();
    });

    // Cerrar sidebar con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSidebar();
      }
    });

    // Cerrar sidebar al hacer click fuera
    document.addEventListener('click', (e) => {
      const sidebar = document.querySelector('.sidebar');
      const hamburger = document.getElementById('hamburger-btn');
      if (
        sidebar &&
        hamburger &&
        !sidebar.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        this.closeSidebar();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburger-btn');
    
    if (sidebar) {
      sidebar.classList.toggle('sidebar--mobile-active');
      hamburger.classList.toggle('navbar__hamburger--active');
    }
  }

  closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburger-btn');
    
    if (sidebar && sidebar.classList.contains('sidebar--mobile-active')) {
      sidebar.classList.remove('sidebar--mobile-active');
      hamburger.classList.remove('navbar__hamburger--active');
    }
  }
}

export default NavbarComponent;
