/**
 * Main App
 * Principio SOLID: Dependency Injection - Inyecta servicios
 */

import { User } from './models/User.js';
import StorageService from './services/storageService.js';
import ProgressService from './services/progressService.js';
import NavigationService from './services/navigationService.js';
import NavbarComponent from './components/NavbarComponent.js';
import SidebarComponent from './components/SidebarComponent.js';
import HomeView from './views/HomeView.js';
import LandingView from './views/LandingView.js';
import ClaseView from './views/ClaseView.js';
import ProfileView from './views/ProfileView.js';
import LeaderboardView from './views/LeaderboardView.js';
import { ROUTES } from './constants/routes.js';

class App {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // 1. Cargar o crear usuario
    this.user = this.loadOrCreateUser();

    // 2. Inicializar servicios
    this.progressService = new ProgressService(this.user.id);
    this.navigationService = new NavigationService(this.progressService, this.user);

    // 3. NO renderizar navbar/sidebar aquí - dejar que navigate() lo haga condicionalmente
    this.setupRouting();
  }

  loadOrCreateUser() {
    let user = StorageService.get('current_user');
    if (!user) {
      user = new User();
      StorageService.set('current_user', user.toJSON());
    } else {
      user = User.fromJSON(user);
    }
    
    return user;
  }

  renderNavbar() {
    const navbar = new NavbarComponent(this.progressService, this.navigationService);
    navbar.mount('#navbar-container');
  }

  renderSidebar() {
    const sidebar = new SidebarComponent(
      this.navigationService,
      this.progressService
    );
    sidebar.mount('#sidebar-container');
  }

  setupRouting() {
    window.addEventListener('hashchange', () => this.navigate());
    window.addEventListener('resize', () => {
      if (this.navigationService.currentRoute === ROUTES.LANDING) {
        this.renderView(ROUTES.LANDING);
      }
    });
    this.navigate();
  }

  navigate() {
    this.user = this.loadOrCreateUser();
    this.navigationService.user = this.user;
    
    const route = NavigationService.parseURL();
    this.navigationService.currentRoute = route;
    
    const appContainer = document.querySelector('#app');
    
    if (route === ROUTES.LANDING) {
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;
      document.body.classList.toggle('landing-mode', isDesktop);
      
      if (!isDesktop) {
        this.navigationService.ir(ROUTES.HOME);
        return;
      }
      
      appContainer.innerHTML = '';
      const landingView = new LandingView(this.navigationService);
      landingView.mount('#app');
      return;
    }
    
    this.renderNavbar();
    this.renderSidebar();
    this.renderView(route);
  }

  renderView(route) {
    const appContainer = document.querySelector('#app');
    appContainer.innerHTML = '';

    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    const isLandingDesktop = route === ROUTES.LANDING && isDesktop;

    document.body.classList.toggle('landing-mode', isLandingDesktop);

    if (route === ROUTES.LANDING && !isDesktop) {
      this.navigationService.ir(ROUTES.HOME);
      return;
    }

    if (isLandingDesktop) {
      const landingView = new LandingView(this.navigationService);
      landingView.mount('#app');
      return;
    }

    // Home
    if (route === ROUTES.HOME || route === '') {
      const homeView = new HomeView(
        this.progressService,
        this.navigationService,
        this.user
      );
      homeView.mount('#app');
      return;
    }

    // Perfil
    if (route === ROUTES.PERFIL) {
      const profileView = new ProfileView(
        this.progressService,
        this.navigationService,
        this.user
      );
      profileView.mount('#app');
      return;
    }

    // Leaderboard
    if (route === ROUTES.LEADERBOARD) {
      const leaderboardView = new LeaderboardView(
        this.progressService,
        StorageService
      );
      leaderboardView.mount('#app');
      return;
    }

    // Clases
    if (route.startsWith('/clase')) {
      const claseMatch = route.match(/clase(\d)/);
      if (claseMatch) {
        const claseId = `clase${claseMatch[1]}`;
        const claseView = new ClaseView(
          claseId,
          this.progressService,
          this.navigationService,
          this.user
        );
        claseView.mount('#app');
        return;
      }
    }

    // 404
    appContainer.innerHTML = '<div class="error-404">Página no encontrada</div>';
  }
}

// Iniciar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
