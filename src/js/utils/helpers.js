/**
 * Helper utilities
 * Principio SOLID: Single Responsibility - Funciones utilitarias
 */

export const formatearFecha = (fecha) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(fecha));
};

export const formatearTiempo = (fecha) => {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(fecha));
};

export const calcularTiempoTranscurrido = (fecha) => {
  const ahora = new Date();
  const pasado = new Date(fecha);
  const diferencia = ahora - pasado;

  const minutos = Math.floor(diferencia / 60000);
  const horas = Math.floor(diferencia / 3600000);
  const dias = Math.floor(diferencia / 86400000);

  if (minutos < 1) return 'hace un momento';
  if (minutos < 60) return `hace ${minutos}m`;
  if (horas < 24) return `hace ${horas}h`;
  if (dias < 7) return `hace ${dias}d`;

  return formatearFecha(fecha);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const generarId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
