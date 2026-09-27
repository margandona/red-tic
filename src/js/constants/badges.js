/**
 * Sistema de logros/badges
 * Principio SOLID: Single Responsibility - Define estructura de badges
 */

export const BADGES = {
  ACCESO_LOGRADO: {
    id: 'acceso_logrado',
    nombre: 'Acceso Logrado',
    descripcion: 'Completaste Clase 1: Entrar al sistema',
    icono: '🔓',
    clase: 'clase1',
    color: '#F90598',
    puntos: 10,
  },
  COMUNICACION_ACTIVA: {
    id: 'comunicacion_activa',
    nombre: 'Comunicación Activa',
    descripcion: 'Completaste Clase 2: Comunícate académicamente',
    icono: '💬',
    clase: 'clase2',
    color: '#F02C7D',
    puntos: 15,
  },
  TRABAJO_CREADO: {
    id: 'trabajo_creado',
    nombre: 'Trabajo Creado',
    descripcion: 'Completaste Clase 3: Producción académica',
    icono: '📄',
    clase: 'clase3',
    color: '#EC5852',
    puntos: 20,
  },
  APRENDIZAJE_OPTIMIZADO: {
    id: 'aprendizaje_optimizado',
    nombre: 'Aprendizaje Optimizado',
    descripcion: 'Completaste Clase 4: IA y productividad',
    icono: '⚡',
    clase: 'clase4',
    color: '#00D9FF',
    puntos: 25,
  },
  MAESTRO_TOTAL: {
    id: 'maestro_total',
    nombre: 'Maestro Total',
    descripcion: 'Completaste todas las misiones',
    icono: '👑',
    clase: null,
    color: '#FFD700',
    puntos: 100,
  },
};

export const BADGES_ARRAY = Object.values(BADGES);

export const GETBADGE_POR_CLASE = (claseId) =>
  BADGES_ARRAY.find((b) => b.clase === claseId);

export const CALCULAR_PUNTOS_TOTALES = (badgesObtenidos) =>
  badgesObtenidos.reduce((sum, id) => {
    const badge = BADGES_ARRAY.find((b) => b.id === id);
    return sum + (badge?.puntos || 0);
  }, 0);
