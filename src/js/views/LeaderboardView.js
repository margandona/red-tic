/**
 * Leaderboard View
 * Muestra ranking de estudiantes por puntos
 */

import { ProgressBarComponent } from '../components/ProgressBarComponent.js';
import { ROUTES } from '../constants/routes.js';

export class LeaderboardView {
  constructor(progressService, storageService) {
    this.progressService = progressService;
    this.storageService = storageService;
  }

  render() {
    const estudiantes = this.obtenerEstudiantes();
    const ranking = this.generarRanking(estudiantes);
    const usuarioActual = this.progressService.obtenerProgreso();

    return `
      <div class="leaderboard-view">
        <div class="leaderboard-header">
          <h1>🏆 Ranking de Estudiantes</h1>
          <p>Top 10 jugadores por puntos acumulados</p>
        </div>

        ${this.renderTuPosicion(ranking, usuarioActual)}
        ${this.renderRanking(ranking)}

        <div class="leaderboard-footer">
          <button class="btn btn--secondary" id="back-home-btn">
            ← Volver al Inicio
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Obtiene todos los estudiantes guardados
   */
  obtenerEstudiantes() {
    const estudiantes = [];
    
    // Buscar todos los registros de progreso
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key?.startsWith('progress_')) {
        const userId = key.replace('progress_', '');
        const progressData = this.storageService.get(key);
        
        if (progressData) {
          estudiantes.push({
            userId,
            progreso: progressData,
            puntos: progressData.puntos || 0,
          });
        }
      }
    }

    return estudiantes;
  }

  /**
   * Genera ranking ordenado por puntos
   */
  generarRanking(estudiantes) {
    return estudiantes
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, 10)
      .map((est, index) => ({
        ...est,
        posicion: index + 1,
        medalla: this.getMedalla(index),
      }));
  }

  /**
   * Retorna la medalla según posición
   */
  getMedalla(index) {
    const medallas = ['🥇', '🥈', '🥉'];
    return medallas[index] || '•';
  }

  /**
   * Renderiza tu posición en el ranking
   */
  renderTuPosicion(ranking, usuarioActual) {
    const tuPosicion = ranking.findIndex((e) => e.progreso.id === usuarioActual.id);

    if (tuPosicion === -1) {
      // No estás en top 10
      return `
        <div class="leaderboard-section">
          <div class="tu-posicion">
            <div class="tu-posicion__icon">📍</div>
            <div class="tu-posicion__info">
              <div class="tu-posicion__label">Tu Posición</div>
              <div class="tu-posicion__rank">#${ranking.length + 1}+</div>
              <div class="tu-posicion__points">${usuarioActual.puntos} puntos</div>
            </div>
            <div class="tu-posicion__cta">
              Sigue completando misiones para subir de ranking
            </div>
          </div>
        </div>
      `;
    }

    const tu = ranking[tuPosicion];
    return `
      <div class="leaderboard-section">
        <div class="tu-posicion tu-posicion--ranked">
          <div class="tu-posicion__icon">${tu.medalla}</div>
          <div class="tu-posicion__info">
            <div class="tu-posicion__label">Tu Posición</div>
            <div class="tu-posicion__rank">#${tu.posicion}</div>
            <div class="tu-posicion__points">${tu.puntos} puntos</div>
          </div>
          <div class="tu-posicion__reward">
            ${this.getRecompensaPorPosicion(tu.posicion)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Retorna la recompensa según la posición
   */
  getRecompensaPorPosicion(posicion) {
    if (posicion === 1) return '👑 ¡Eres el campeón!';
    if (posicion === 2) return '⭐ Muy cerca del 1º';
    if (posicion === 3) return '✨ En el podio!';
    if (posicion <= 5) return '🎯 Top 5!';
    if (posicion <= 10) return '📈 Top 10!';
    return '';
  }

  /**
   * Renderiza la tabla de ranking completa
   */
  renderRanking(ranking) {
    const filas = ranking
      .map((est, index) => {
        const posicion = index + 1;
        const medallaClass = posicion <= 3 ? `ranking-row--medal-${posicion}` : '';

        return `
          <tr class="ranking-row ${medallaClass}">
            <td class="ranking-cell ranking-cell__posicion">
              <div class="ranking-posicion">
                <span class="ranking-medalla">${est.medalla}</span>
                <span class="ranking-numero">#${posicion}</span>
              </div>
            </td>
            <td class="ranking-cell ranking-cell__usuario">
              <div class="ranking-usuario">
                <span class="ranking-avatar">${this.getAvatarPorPuntos(est.puntos)}</span>
                <div class="ranking-info">
                  <div class="ranking-nombre">Estudiante ${est.userId.substring(0, 8)}</div>
                  <div class="ranking-meta">${est.progreso.ultimaActualizacion || 'Recientemente activo'}</div>
                </div>
              </div>
            </td>
            <td class="ranking-cell ranking-cell__progreso">
              <div class="ranking-progreso">
                <div class="ranking-progreso-bar">
                  <div class="ranking-progreso-fill" style="width: ${Math.min((est.puntos / 500) * 100, 100)}%"></div>
                </div>
              </div>
            </td>
            <td class="ranking-cell ranking-cell__puntos">
              <span class="ranking-puntos">${est.puntos}</span>
              <span class="ranking-puntos-label">pts</span>
            </td>
          </tr>
        `;
      })
      .join('');

    return `
      <div class="leaderboard-section">
        <div class="leaderboard-table-container">
          <table class="leaderboard-table">
            <thead>
              <tr class="ranking-header">
                <th class="ranking-cell ranking-cell__posicion">Posición</th>
                <th class="ranking-cell ranking-cell__usuario">Estudiante</th>
                <th class="ranking-cell ranking-cell__progreso">Progreso</th>
                <th class="ranking-cell ranking-cell__puntos">Puntos</th>
              </tr>
            </thead>
            <tbody>
              ${filas}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * Retorna avatar según puntos
   */
  getAvatarPorPuntos(puntos) {
    if (puntos >= 400) return '⭐';
    if (puntos >= 300) return '🌟';
    if (puntos >= 200) return '✨';
    if (puntos >= 100) return '💫';
    if (puntos >= 50) return '🎯';
    return '📚';
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners();
    }
  }

  attachListeners() {
    document.getElementById('back-home-btn')?.addEventListener('click', () => {
      window.location.hash = `#${ROUTES.HOME}`;
    });
  }
}

export default LeaderboardView;
