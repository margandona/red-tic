/**
 * Progress Service
 * Principio SOLID: Single Responsibility - Gestiona progreso del usuario
 * Principio Dependency Injection: Recibe StorageService
 */

import { Progress } from '../models/Progress.js';
import StorageService from './storageService.js';
import { BADGES, GETBADGE_POR_CLASE } from '../constants/badges.js';
import BadgeUnlockModal from '../components/BadgeUnlockModal.js';
import { ToastNotification } from '../components/ToastNotification.js';

export class ProgressService {
  constructor(userId) {
    this.userId = userId;
    this.progress = this.cargar();
    this.nuevosBadges = [];
  }

  cargar() {
    const stored = StorageService.get(`progress_${this.userId}`);
    const progress = stored ? Progress.fromJSON(stored) : new Progress(this.userId);

    // Migra automaticamente progresos antiguos cuando se agregan nuevas clases.
    if (stored) {
      StorageService.set(`progress_${this.userId}`, progress.toJSON());
    }

    return progress;
  }

  guardar() {
    StorageService.set(`progress_${this.userId}`, this.progress.toJSON());
  }

  completarClase(claseId) {
    if (!this.esEvidenciaCompleta(claseId)) {
      return false;
    }

    const success = this.progress.completarClase(claseId);
    if (success) {
      const badgeDesbloqueado = this.intentarDesbloquearBadge(claseId);
      this.verificarMaestroTotal();
      this.guardar();
      
      // Mostrar toast de clase completada
      ToastNotification.success(`¡Clase completada! +10 puntos`, 3000);
      
      // Mostrar modal si se desbloqueó un badge
      if (badgeDesbloqueado) {
        setTimeout(() => {
          const modal = new BadgeUnlockModal(badgeDesbloqueado);
          modal.show();
        }, 500);
      }
    }
    return success;
  }

  intentarDesbloquearBadge(claseId) {
    const badgesActuales = [...this.progress.badges];
    const badge = GETBADGE_POR_CLASE(claseId);
    
    if (badge && !badgesActuales.includes(badge.id)) {
      this.progress.agregarBadge(badge.id);
      this.progress.puntos += badge.puntos;
      this.nuevosBadges.push(badge.id);
      return badge;
    }
    return null;
  }

  verificarMaestroTotal() {
    const todasCompletas = Object.values(this.progress.clases).every(
      (c) => c.completada
    );
    if (todasCompletas && !this.progress.badges.includes(BADGES.MAESTRO_TOTAL.id)) {
      this.progress.agregarBadge(BADGES.MAESTRO_TOTAL.id);
      this.progress.puntos += BADGES.MAESTRO_TOTAL.puntos;
      this.nuevosBadges.push(BADGES.MAESTRO_TOTAL.id);
      
      // Mostrar modal del badge maestro
      setTimeout(() => {
        const modal = new BadgeUnlockModal(BADGES.MAESTRO_TOTAL);
        modal.show();
      }, 500);
    }
  }

  actualizarProgreso(claseId, porcentaje) {
    this.progress.actualizarProgreso(claseId, porcentaje);
    this.guardar();
  }

  obtenerProgreso() {
    return this.progress;
  }

  obtenerProgresoGeneral() {
    return this.progress.obtenerProgresoGeneral();
  }

  obtenerProgresoClase(claseId) {
    return this.progress.clases[claseId];
  }

  obtenerEvidenciaClase(claseId) {
    return StorageService.getEvidence(this.userId, claseId);
  }

  actualizarEvidenciaClase(claseId, partialState) {
    return StorageService.updateEvidence(this.userId, claseId, partialState);
  }

  marcarVideoVisto(claseId) {
    return this.actualizarEvidenciaClase(claseId, { videoVisto: true });
  }

  marcarKahootCompletado(claseId) {
    return this.actualizarEvidenciaClase(claseId, { kahootCompletado: true });
  }

  marcarFormularioCompletado(claseId) {
    return this.actualizarEvidenciaClase(claseId, { formularioCompletado: true });
  }

  esEvidenciaCompleta(claseId) {
    const evidencia = this.obtenerEvidenciaClase(claseId);
    return evidencia.videoVisto && evidencia.kahootCompletado && evidencia.formularioCompletado;
  }

  obtenerRequisitosPendientes(claseId) {
    const evidencia = this.obtenerEvidenciaClase(claseId);
    const pendientes = [];

    if (!evidencia.videoVisto) {
      pendientes.push('Marcar video como visto');
    }

    if (!evidencia.kahootCompletado) {
      pendientes.push('Completar Quiz');
    }

    if (!evidencia.formularioCompletado) {
      pendientes.push('Confirmar formulario');
    }

    return pendientes;
  }

  obtenerBadgesDesbloqueadas() {
    return this.progress.badges;
  }

  obtenerPuntosTotal() {
    return this.progress.puntos;
  }

  esNuevoBadge(badgeId) {
    return this.nuevosBadges.includes(badgeId);
  }

  limpiarNuevosBadges() {
    this.nuevosBadges = [];
  }

  reiniciar() {
    this.progress = new Progress(this.userId);
    this.nuevosBadges = [];
    StorageService.clearEvidence(this.userId);
    this.guardar();
  }
}

export default ProgressService;
