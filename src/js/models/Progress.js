/**
 * Modelo Progress
 * Principio SOLID: Single Responsibility - Representa progreso de usuario
 */

export class Progress {
  constructor(userId) {
    this.userId = userId;
    this.clases = {
      clase1: { completada: false, fecha: null, progreso: 0 },
      clase2: { completada: false, fecha: null, progreso: 0 },
      clase3: { completada: false, fecha: null, progreso: 0 },
      clase4: { completada: false, fecha: null, progreso: 0 },
      clase5: { completada: false, fecha: null, progreso: 0 },
    };
    this.badges = [];
    this.puntos = 0;
    this.ultimaActualizacion = new Date();
  }

  completarClase(claseId) {
    if (this.clases[claseId]) {
      this.clases[claseId].completada = true;
      this.clases[claseId].fecha = new Date();
      this.clases[claseId].progreso = 100;
      this.ultimaActualizacion = new Date();
      return true;
    }
    return false;
  }

  actualizarProgreso(claseId, progreso) {
    if (this.clases[claseId]) {
      this.clases[claseId].progreso = Math.min(progreso, 100);
      this.ultimaActualizacion = new Date();
    }
  }

  agregarBadge(badgeId) {
    if (!this.badges.includes(badgeId)) {
      this.badges.push(badgeId);
      return true;
    }
    return false;
  }

  obtenerProgresoGeneral() {
    const total = Object.values(this.clases).length;
    const completadas = Object.values(this.clases).filter((c) => c.completada)
      .length;
    return Math.round((completadas / total) * 100);
  }

  obtenerClasesSiguiente() {
    const claseIds = ['clase1', 'clase2', 'clase3', 'clase4', 'clase5'];
    for (const id of claseIds) {
      if (!this.clases[id].completada) {
        return id;
      }
    }
    return null;
  }

  toJSON() {
    return {
      userId: this.userId,
      clases: this.clases,
      badges: this.badges,
      puntos: this.puntos,
      ultimaActualizacion: this.ultimaActualizacion.toISOString(),
    };
  }

  static fromJSON(json) {
    const progress = new Progress(json.userId);
    progress.clases = {
      ...progress.clases,
      ...(json.clases || {}),
    };
    progress.badges = json.badges || [];
    progress.puntos = json.puntos || 0;
    progress.ultimaActualizacion = json.ultimaActualizacion
      ? new Date(json.ultimaActualizacion)
      : new Date();
    return progress;
  }
}
