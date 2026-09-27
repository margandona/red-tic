/**
 * Sidebar Component
 * Principio SOLID: Single Responsibility - Renderiza sidebar
 */

export class SidebarComponent {
  constructor(navigationService, progressService) {
    this.navigationService = navigationService;
    this.progressService = progressService;
  }

  render() {
    const rutasDisponibles = this.navigationService.obtenerRutasDisponibles();
    const rutaActual = this.navigationService.obtenerRutaActual();

    const items = rutasDisponibles
      .map((route) => {
        const isActive = route.path === rutaActual;
        const claseData =
          route.claseId &&
          this.progressService.obtenerProgresoClase(route.claseId);
        const completada = claseData?.completada;

        return `
          <li class="sidebar__item">
            <a 
              href="#${route.path}" 
              class="sidebar__link ${isActive ? 'active' : ''}"
              data-route="${route.path}"
            >
              <span class="sidebar__icon">${this.getIcon(route.icono)}</span>
              <span>${route.nombre}</span>
              ${completada ? '<span class="sidebar__badge">✓</span>' : ''}
            </a>
          </li>
        `;
      })
      .join('');

    return `
      <aside class="sidebar">
        <div class="sidebar__header">
          <h3 class="sidebar__title">Navegación</h3>
          <p class="sidebar__subtitle">Completa cada misión</p>
        </div>
        <ul class="sidebar__menu">
          ${items}
        </ul>
      </aside>
    `;
  }

  getIcon(icono) {
    const icons = {
      home: '🏠',
      book: '📚',
      star: '⭐',
      user: '👤',
      email: '💬',
      login: '🔓',
      document: '📄',
      spreadsheet: '📊',
    };
    return icons[icono] || '📌';
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners();
    }
  }

  attachListeners() {
    document.querySelectorAll('.sidebar__link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.dataset.route;
        this.navigationService.ir(route);
        this.closeMobileSidebar();
      });
    });
  }

  closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburger-btn');
    
    if (sidebar && sidebar.classList.contains('sidebar--mobile-active')) {
      sidebar.classList.remove('sidebar--mobile-active');
      hamburger?.classList.remove('navbar__hamburger--active');
    }
  }
}

export default SidebarComponent;
