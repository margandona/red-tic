# 🏗️ ARQUITECTURA DEL PROYECTO

## 📐 Patrón de Diseño

**MVC (Model-View-Controller) + Dependency Injection**

```
┌─────────────────────────────────────────────────────┐
│                    APP (Main)                       │
│         Orquestador Central - Inicialización        │
└──┬─────────────┬──────────────┬────────────────────┘
   │             │              │
   ▼             ▼              ▼
┌─────┐   ┌──────────┐   ┌────────────────┐
│ M O │   │ S E R    │   │  C O M P O    │
│ D E │   │ V I C E  │   │  N E N T E S  │
│ E L │   │ S        │   │               │
└─────┘   └──────────┘   └────────────────┘
   │             │              │
   └─────────────┴──────────────┘
              ▼
        ┌──────────────┐
        │  V I E W S   │
        └──────────────┘
              ▼
        ┌──────────────┐
        │     HTML     │
        └──────────────┘
```

---

## 📦 Capas de Arquitectura

### 1️⃣ **Capa de Modelos** (`/models`)
Define la estructura de datos

```
▌ User.js        → Representa un usuario
▌ Progress.js    → Representa progreso del usuario
```

**Responsabilidad**: Validación, serialización
**No contiene**: Lógica de negocio compleja

---

### 2️⃣ **Capa de Servicios** (`/services`)
Lógica de negocio centralizada

```
▌ storageService.js    → Persistencia en localStorage
▌ progressService.js   → Lógica de progreso
▌ navigationService.js → Gestión de rutas
▌ badgeService.js      → Lógica de badges
```

**Responsabilidad**: Operaciones sobre datos
**No contiene**: HTML, interacción con DOM

---

### 3️⃣ **Capa de Componentes** (`/components`)
Elementos UI reutilizables

```
▌ NavbarComponent      → Barra de navegación
▌ SidebarComponent     → Menú lateral
▌ ProgressBarComponent → Barra de progreso
▌ BadgeComponent       → Visualización de badges
```

**Responsabilidad**: Renderizar HTML de componentes UI
**No contiene**: Lógica de negocio

---

### 4️⃣ **Capa de Vistas** (`/views`)
Páginas completas

```
▌ HomeView.js  → Home principal
▌ ClaseView.js → Vista genérica de clase
```

**Responsabilidad**: Orquestar componentes + servicios
**No contiene**: Lógica de UI individual

---

### 5️⃣ **Capa de Constantes** (`/constants`)
Configuración centralizada

```
▌ clases.js  → Definición de todas las clases
▌ badges.js  → Definición de todos los badges
▌ routes.js  → Rutas disponibles
```

**Responsabilidad**: Single Source of Truth
**No contiene**: Lógica

---

### 6️⃣ **Capa de Utilidades** (`/utils`)
Funciones helper globales

```
▌ helpers.js → formatearFecha, debounce, etc
```

**Responsabilidad**: Funciones puras reutilizables
**No contiene**: Estado

---

## 🔄 Flujo de Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Click en botón
       ▼
┌─────────────────────┐
│  Component/View     │
│  - Captura evento   │
│  - Llama Service    │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│  Service             │
│  - Actualiza modelo  │
│  - Guarda en Storage │
│  - Retorna resultado │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Component/View      │
│  - Recibe resultado  │
│  - Re-renderiza      │
│  - Usuario ve cambio │
└──────────────────────┘
```

---

## 🎯 Principios Implementados

### Single Responsibility Principle (SRP)
```javascript
// ✅ BIEN - Cada clase hace una cosa
class StorageService {
  static set(clave, valor) { /* persistir */ }
}

class ProgressService {
  completarClase(claseId) { /* actualizar progreso */ }
}

// ❌ MAL - Clase hace múltiples cosas
class MegaService {
  persistir() { /* ... */ }
  actualizarProgreso() { /* ... */ }
  renderizar() { /* ... */ }
}
```

### Dependency Injection
```javascript
// ✅ BIEN - Inyectar dependencias
class HomeView {
  constructor(progressService, navigationService) {
    this.progressService = progressService;
    this.navigationService = navigationService;
  }
}

// ❌ MAL - Crear dentro
class HomeView {
  constructor() {
    this.progressService = new ProgressService();
  }
}
```

### Configuration Over Convention
```javascript
// Toda la configuración en constants/
export const CLASES = {
  CLASE1: { id: 'clase1', nombre: '...', ... },
}

// Servicios usan constants, no hard-coded
```

---

## 🧬 Estructura de Datos

### Usuario
```javascript
{
  id: "usuario_1234567890",
  nombre: "Estudiante",
  email: "estudiante@example.com",
  createdAt: "2024-01-15T10:30:00",
  ultimaActividad: "2024-01-15T14:45:00"
}
```

### Progreso (localStorage)
```javascript
{
  userId: "usuario_1234567890",
  clases: {
    clase1: { completada: true, fecha: "...", progreso: 100 },
    clase2: { completada: false, fecha: null, progreso: 0 },
    clase3: { completada: false, fecha: null, progreso: 0 },
    clase4: { completada: false, fecha: null, progreso: 0 }
  },
  badges: ["acceso_logrado"],
  puntos: 35,
  ultimaActualizacion: "2024-01-15T14:45:00"
}
```

---

## 🔌 Extensión del Sistema

### Caso 1: Agregar nueva clase

1. **constants/clases.js**
```javascript
export const CLASES = {
  // ...
  CLASE5: {
    id: 'clase5',
    nombre: 'Nueva Misión',
    // ...
  }
}
```

2. **constants/badges.js**
```javascript
export const BADGES = {
  // ...
  NUEVO_LOGRO: {
    id: 'nuevo_logro',
    clase: 'clase5',
    // ...
  }
}
```

3. **Listo!** - El sistema se adapta automáticamente

### Caso 2: Agregar nuevo servicio

```javascript
// services/nuevoService.js
export class NuevoService {
  constructor(depe1, depe2) {
    this.depe1 = depe1;
    this.depe2 = depe2;
  }

  hacerAlgo() { /* ... */ }
}

// Inyectar en App.js
this.nuevoService = new NuevoService(dep1, dep2);
```

---

## 📱 Responsive Design

```css
/* Mobile First */
@media (min-width: 768px) {
  /* Cambios para tablet/desktop */
}

/* Breakpoints usados */
320px  → Mobile pequeño
768px  → Tablet
1024px → Desktop
1440px → Desktop grande
```

---

## 🎨 Sistema de Temasbase

Variables CSS centralizadas en `variables.css`:

```css
--color-primary: #f90598
--spacing-unit: 8px
--font-size-base: 1rem
--shadow-base: 0 1px 3px ...
```

Fácil cambiar tema globalmente.

---

## 🧪 Testing (Futuro)

Estructura preparada para agregar tests:

```
tests/
├── unit/
│   ├── models/
│   ├── services/
│   └── utils/
└── integration/
```

---

## 🚀 Performance

- ✅ Sin dependencias externas
- ✅ DOM mínimo
- ✅ localStorage (caché local)
- ✅ Arquitectura eficiente

---

## 📊 Diagrama de Dependencias

```
App
├── User (Model)
├── StorageService
├── ProgressService
│   ├── StorageService
│   ├── Progress (Model)
│   └── BADGES (Constants)
├── NavigationService
│   ├── ProgressService
│   ├── CLASES_ARRAY (Constants)
│   └── ROUTES (Constants)
├── NavbarComponent
│   └── ProgressService
├── SidebarComponent
│   ├── NavigationService
│   └── ProgressService
├── HomeView
│   ├── ProgressService
│   ├── NavigationService
│   └── ProgressBarComponent
└── ClaseView
    ├── ProgressService
    ├── NavigationService
    └── ProgressBarComponent
```

---

## 🔐 Seguridad

- localStorage es local del navegador (solo usuario actual)
- Validación de datos en modelos
- No hay datos sensibles en localStorage

---

## 🎓 Conclusión

**Arquitectura limpia**, **escalable**, **mantenible** y **extensible**.

Perfecta para un proyecto educativo que puede crecer.

