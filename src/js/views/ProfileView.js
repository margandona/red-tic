/**
 * Profile View
 * Principio SOLID: Single Responsibility - Renderiza página de perfil
 */

import { ProgressBarComponent } from '../components/ProgressBarComponent.js';
import { BadgeComponent } from '../components/BadgeComponent.js';
import { BADGES_ARRAY } from '../constants/badges.js';
import { ROUTES } from '../constants/routes.js';
import StorageService from '../services/storageService.js';

export class ProfileView {
  constructor(progressService, navigationService, user = null) {
    this.progressService = progressService;
    this.navigationService = navigationService;
    this.user = user;
  }

  render() {
    const progress = this.progressService.obtenerProgreso();
    const progresoGeneral = this.progressService.obtenerProgresoGeneral();
    const badgesDesbloqueadas = progress.badges;
    const puntosTotales = progress.puntos;

    // Contar badges desbloqueados
    const badgesCount = badgesDesbloqueadas.length;
    const totalBadges = BADGES_ARRAY.length;

    const userData = {
      nombre: 'Estudiante Gamificado',
      email: 'estudiante@academia.com',
      createdAt: new Date(progress.ultimaActualizacion),
    };

    return `
      <div class="profile-view">
        <!-- Header -->
        <div class="profile-header">
          <div class="profile-avatar">👤</div>
          <div class="profile-info">
            <h1 class="profile-name">${userData.nombre}</h1>
            <p class="profile-email">${userData.email}</p>
            <p class="profile-joined">Miembro desde ${this.formatearFecha(userData.createdAt)}</p>
          </div>
        </div>

        <!-- Stats Grid -->
        <section class="profile-stats">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <span class="stat-label">Progreso General</span>
              <span class="stat-value">${progresoGeneral}%</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <span class="stat-label">Badges Desbloqueados</span>
              <span class="stat-value">${badgesCount}/${totalBadges}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-content">
              <span class="stat-label">Puntos Totales</span>
              <span class="stat-value">${puntosTotales}</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <span class="stat-label">Clases Completadas</span>
              <span class="stat-value">${Object.values(progress.clases).filter((c) => c.completada).length}/${Object.keys(progress.clases).length}</span>
            </div>
          </div>
        </section>

        <!-- Progress Overview -->
        <section class="profile-section">
          <h2>Progreso General</h2>
          <div id="progress-overview"></div>
        </section>

        <!-- Clases Progress -->
        <section class="profile-section">
          <h2>Progreso por Clase</h2>
          <div class="clases-progress">
            ${this.renderClasesProgress(progress.clases)}
          </div>
        </section>

        <!-- Badges Section -->
        <section class="profile-section">
          <h2>Logros Desbloqueados</h2>
          <div class="badges-container">
            ${this.renderBadges(badgesDesbloqueadas)}
          </div>
        </section>

        <!-- Actions -->
        <section class="profile-actions">
          <button class="btn btn--secondary" id="reset-progress-btn">
            🔄 Reiniciar Progreso
          </button>
          <button class="btn btn--primary" id="back-home-btn">
            ← Volver al Inicio
          </button>
        </section>
      </div>
    `;
  }

  renderClasesProgress(clases) {
    return Object.entries(clases)
      .map(([claseId, datos], index) => {
        const claseName = this.getNombreClase(claseId);
        const icono = this.getIconoClase(claseId);
        const estado = datos.completada ? 'completada' : 'en-progreso';

        return `
          <div class="clase-progress-item ${estado}">
            <div class="clase-progress-header">
              <span class="clase-icon">${icono}</span>
              <span class="clase-name">${claseName}</span>
              <span class="clase-status">
                ${datos.completada ? '✓ Completada' : `${datos.progreso}%`}
              </span>
            </div>
            <div class="clase-progress-bar">
              <div class="clase-progress-fill" style="width: ${datos.progreso}%"></div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  renderBadges(badgesIds) {
    return BADGES_ARRAY.map((badge) => {
      const isUnlocked = badgesIds.includes(badge.id);
      const isNew = isUnlocked && this.progressService.esNuevoBadge(badge.id);
      const badgeComponent = new BadgeComponent(badge, isUnlocked, isNew);
      return badgeComponent.render();
    }).join('');
  }

  formatearFecha(fecha) {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(fecha));
  }

  getNombreClase(claseId) {
    const nombres = {
      clase1: 'Acceso al Sistema',
      clase2: 'Comunicación Académica',
      clase3: 'Producción Académica',
      clase4: 'Mejora con IA',
      clase5: 'Bonus Track Excel',
    };
    return nombres[claseId] || 'Clase';
  }

  getIconoClase(claseId) {
    const iconos = {
      clase1: '🔓',
      clase2: '💬',
      clase3: '📄',
      clase4: '⚡',
      clase5: '📊',
    };
    return iconos[claseId] || '📚';
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners();
      this.renderProgressOverview();
    }
  }

  attachListeners() {
    // Botón reiniciar progreso
    document.getElementById('reset-progress-btn')?.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres reiniciar tu progreso? Esta acción no se puede deshacer.')) {
        this.progressService.reiniciar();
        alert('¡Progreso reiniciado!');
        this.navigationService.ir(ROUTES.HOME);
      }
    });

    // Botón volver a inicio
    document.getElementById('back-home-btn')?.addEventListener('click', () => {
      this.navigationService.ir(ROUTES.HOME);
    });
  }

  renderProgressOverview() {
    const progresoGeneral = this.progressService.obtenerProgresoGeneral();
    const pb = new ProgressBarComponent(progresoGeneral, 'Tu Progreso General');
    const container = document.querySelector('#progress-overview');
    if (container) {
      container.innerHTML = pb.render();
    }
  }
}

export default ProfileView;
