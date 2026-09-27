/**
 * Rutas disponibles en la aplicación
 * Principio SOLID: Single Responsibility - Define rutas
 */

export const ROUTES = {
  LANDING: '/',
  HOME: '/home',
  CLASE1: '/clase1',
  CLASE2: '/clase2',
  CLASE3: '/clase3',
  CLASE4: '/clase4',
  CLASE5: '/clase5',
  PERFIL: '/perfil',
  LEADERBOARD: '/leaderboard',
  NOTFOUND: '/404',
};

export const ROUTE_CONFIG = [
  {
    path: ROUTES.HOME,
    view: 'home',
    nombre: 'Inicio',
    visible: true,
    icono: 'home',
  },
  {
    path: ROUTES.CLASE1,
    view: 'clase',
    nombre: 'Clase 1',
    visible: true,
    icono: 'book',
    claseId: 'clase1',
  },
  {
    path: ROUTES.CLASE2,
    view: 'clase',
    nombre: 'Clase 2',
    visible: true,
    icono: 'book',
    claseId: 'clase2',
  },
  {
    path: ROUTES.CLASE3,
    view: 'clase',
    nombre: 'Clase 3',
    visible: true,
    icono: 'book',
    claseId: 'clase3',
  },
  {
    path: ROUTES.CLASE4,
    view: 'clase',
    nombre: 'Clase 4',
    visible: true,
    icono: 'star',
    claseId: 'clase4',
  },
  {
    path: ROUTES.CLASE5,
    view: 'clase',
    nombre: 'Bonus Excel',
    visible: true,
    icono: 'spreadsheet',
    claseId: 'clase5',
  },
  {
    path: ROUTES.PERFIL,
    view: 'perfil',
    nombre: 'Perfil',
    visible: true,
    icono: 'user',
  },
  {
    path: ROUTES.LEADERBOARD,
    view: 'leaderboard',
    nombre: 'Ranking',
    visible: false,
    icono: 'star',
  },
];
