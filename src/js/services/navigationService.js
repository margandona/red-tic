/**
 * Navigation Service
 * Principio SOLID: Single Responsibility - Maneja navegación
 * Principio Dependency Injection: Recibe ProgressService
 */

import { ROUTE_CONFIG, ROUTES } from '../constants/routes.js';
import { CLASES_ARRAY } from '../constants/clases.js';
export class NavigationService {
  constructor(progressService, user = null) {
    this.progressService = progressService;
    this.user = user;
    this.currentRoute = ROUTES.LANDING;
  }

  navigateTo(ruta) {
    const route = ROUTE_CONFIG.find((r) => r.path === ruta);
    if (!route) return false;

    this.currentRoute = ruta;
    return true;
  }

  esClaseDesbloqueada(claseId) {
    return true;
  }

  obtenerRutasDisponibles() {
    return ROUTE_CONFIG.filter((route) => {
      if (!route.visible) return false;
      if (route.claseId) {
        return this.esClaseDesbloqueada(route.claseId);
      }
      return true;
    });
  }

  obtenerRutaActual() {
    return this.currentRoute;
  }

  ir(ruta) {
    if (this.navigateTo(ruta)) {
      window.location.hash = ruta;
      return true;
    }
    return false;
  }

  static parseURL() {
    const rawHash = window.location.hash.slice(1).trim();

    if (!rawHash) {
      return ROUTES.LANDING;
    }

    const normalizedRoute = rawHash.startsWith('/') ? rawHash : `/${rawHash}`;
    const isKnownRoute = ROUTE_CONFIG.some((route) => route.path === normalizedRoute);
    const isClassRoute = /^\/clase\d+$/.test(normalizedRoute);

    if (isKnownRoute || isClassRoute) {
      return normalizedRoute;
    }

    return ROUTES.LANDING;
  }
}

export default NavigationService;
