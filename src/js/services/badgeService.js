/**
 * Badge Service
 * Principio SOLID: Single Responsibility - Maneja badges/logros
 */

import { BADGES, BADGES_ARRAY } from '../constants/badges.js';
import StorageService from './storageService.js';

export class BadgeService {
  static obtenerBadgesDesbloqueadas(badgeIds) {
    return badgeIds
      .map((id) => BADGES_ARRAY.find((b) => b.id === id))
      .filter(Boolean);
  }

  static obtenerBadgesPorClase(claseId) {
    return BADGES_ARRAY.filter((b) => b.clase === claseId);
  }

  static obtenerTodosBadges() {
    return BADGES_ARRAY;
  }

  static calcularProgresoBadges(badgesDesbloqueadas) {
    const total = BADGES_ARRAY.length;
    return Math.round((badgesDesbloqueadas.length / total) * 100);
  }

  static obtenerProximoBadge(badgesDesbloqueadas) {
    const proximos = BADGES_ARRAY.filter(
      (b) => !badgesDesbloqueadas.includes(b.id)
    );
    return proximos.length > 0 ? proximos[0] : null;
  }
}

export default BadgeService;
