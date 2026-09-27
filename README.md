# 🎮 Tu Primer Sistema Académico - Gamificado

**Sistema educativo gamificado** construido con **HTML5, CSS3, JavaScript vanilla** siguiendo principios **SOLID, Clean Code y arquitectura modular**.

---

## 📋 Características

✅ **100% Responsive** - Funciona en desktop, tablet y mobile
✅ **No dependencias externas** - Vanilla JS, CSS puro
✅ **Gamificación real** - Badges, puntos, progreso
✅ **Persistencia** - LocalStorage para guardar progreso
✅ **Arquitectura escalable** - Fácil agregar más clases
✅ **SOLID principles** - Código limpio y mantenible

---

## 🏗️ Arquitectura

### Estructura de Carpetas

```
src/
├── index.html                 # 🎯 Punto de entrada
├── js/
│   ├── app.js                # 🚀 Inicializador principal
│   ├── constants/             # ⚙️ Configuración
│   │   ├── clases.js
│   │   ├── badges.js
│   │   └── routes.js
│   ├── models/                # 🗂️ Modelos de datos
│   │   ├── User.js
│   │   └── Progress.js
│   ├── services/              # 🔧 Servicios (lógica negocio)
│   │   ├── storageService.js
│   │   ├── progressService.js
│   │   ├── navigationService.js
│   │   └── badgeService.js
│   ├── components/            # 🧩 Componentes UI
│   │   ├── NavbarComponent.js
│   │   ├── SidebarComponent.js
│   │   ├── ProgressBarComponent.js
│   │   └── BadgeComponent.js
│   ├── views/                 # 📄 Vistas (páginas)
│   │   ├── HomeView.js
│   │   └── ClaseView.js
│   └── utils/                 # 🛠️ Utilidades
│       └── helpers.js
├── css/
│   ├── main.css              # 📌 Principal (imports)
│   ├── variables.css         # 🎨 Diseño tokens
│   ├── components/
│   │   ├── navbar.css
│   │   ├── sidebar.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── progressbar.css
│   │   └── badge.css
│   └── pages/
│       ├── home.css
│       └── clase.css
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── modules/
    ├── clase1.html
    ├── clase2.html
    ├── clase3.html
    └── clase4.html
```

---

## 🎯 Principios SOLID Aplicados

### S - Single Responsibility
- Cada clase/componente tiene **una única responsabilidad**
- `StorageService` → solo persistencia
- `ProgressService` → solo lógica de progreso
- `NavbarComponent` → solo renderiza navbar

### O - Open/Closed
- Abierto para extensión (nuevas clases, badges)
- Cerrado para modificación (no cambiar código existente)
- Configuración centralizada en `constants/`

### L - Liskov Substitution
- Componentes intercambiables
- Vistas seguir interfaz estándar

### I - Interface Segregation
- Servicios con métodos específicos
- No obligar a usar métodos innecesarios

### D - Dependency Injection
- Servicios inyectados en constructores
- `App` → `ProgressService` → componentes

---

## 📱 Características Técnicas

### LocalStorage
```javascript
StorageService.set('user_data', userData);
const data = StorageService.get('user_data');
```

### Sistema de Progreso
```javascript
progressService.completarClase('clase1');  // Completa
progressService.obtenerProgresoGeneral();   // 0-100%
progressService.obtenerBadgesDesbloqueadas(); // Array de badges
```

### Navegación con Hash
```
/ → Home
/#/clase1 → Clase 1
/#/clase2 → Clase 2
```

### Gamificación
- **4 Clases** que se desbloquean progresivamente
- **5 Badges** (uno por clase + maestro total)
- **Sistema de puntos** acumulativo
- **Barra de progreso** visual

---

## 🚀 Cómo Iniciar

### 1. Clonar/Descargar
```bash
git clone [repo]
cd proyecto
```

### 2. Abrir en navegador
```bash
# Opción 1: Abrir directamente
open src/index.html

# Opción 2: Con Live Server (VS Code)
Right-click → Open with Live Server

# Opción 3: Con Python
python -m http.server 8000
# Luego ir a http://localhost:8000/src/index.html
```

---

## ✨ Extensibilidad

### Agregar Nueva Clase

1. **constants/clases.js** - Definir clase
```javascript
export const CLASES = {
  CLASE5: {
    id: 'clase5',
    nombre: 'Nueva Clase',
    orden: 5,
    // ...
  }
}
```

2. **constants/badges.js** - Agregar badge
```javascript
export const BADGES = {
  NUEVO_BADGE: {
    id: 'nuevo',
    nombre: 'Logro',
    clase: 'clase5',
    // ...
  }
}
```

3. **views/ClaseView.js** - Ya funciona automáticamente

---

## 🎨 Sistema de Colores

```css
--color-primary: #f90598      /* Rosa */
--color-secondary: #f02c7d    /* Rosa oscuro */
--color-accent: #ec5852       /* Rojo */
--color-info: #00d9ff         /* Cyan */
--color-success: #00d084      /* Verde */
```

---

## 📊 Base de Datos Local

**localStorage** estructura:
```json
{
  "gamified_app_current_user": {
    "id": "usuario_12345",
    "nombre": "Estudiante",
    "email": "..."
  },
  "gamified_app_progress_usuario_12345": {
    "clases": {
      "clase1": { "completada": true, "progreso": 100 },
      "clase2": { "completada": false, "progreso": 0 }
    },
    "badges": ["acceso_logrado"],
    "puntos": 45
  }
}
```

---

## 🔄 Flujo de Usuario

```
1. Usuario entra → Crea/Carga datos
   ↓
2. Ve Home → Muestra clases desbloqueadas
   ↓
3. Abre Clase 1 → Sigue pasos
   ↓
4. Marca checkboxes → Progreso actualiza
   ↓
5. Completa clase → Badge desbloqueado
   ↓
6. Clase 2 desbloqueada automáticamente
   ↓
7. Repite hasta completar todas
   ↓
8. ¡Maestro Total! 👑
```

---

## 🛠️ Desarrollo

### Agregar componente nuevo
```javascript
// src/js/components/MiComponente.js
export class MiComponente {
  constructor(datos) {
    this.datos = datos;
  }

  render() {
    return `<div>HTML aquí</div>`;
  }

  mount(selector) {
    document.querySelector(selector).innerHTML = this.render();
  }
}
```

### Agregar servicio
```javascript
// src/js/services/miService.js
export class MiService {
  metodo1() { /* ... */ }
  metodo2() { /* ... */ }
}
```

---

## 📋 Checklist Fases

- [x] **Fase 1** - Estructura base
- [x] **Fase 2** - Diseño visual
- [x] **Fase 3** - Sistema de progreso
- [ ] **Fase 4** - Clase 1 (personalización)
- [ ] **Fase 5** - Clase 2
- [ ] **Fase 6** - Clase 3
- [ ] **Fase 7** - Clase 4 (IA)
- [ ] **Fase 8** - Sistema de logros (UI mejorada)
- [ ] **Fase 9** - Optimización móvil
- [ ] **Fase 10** - Contenido real (videos, forms)

---

## 📚 Próximos Pasos

1. **Customizar contenido** de cada clase
2. **Agregar videos reales** en secciones
3. **Integrar Kahoot, Forms, Edpuzzle**
4. **Agregar animaciones** con CSS
5. **Conectar con backend** (Firebase opcional)
6. **PWA** - Offline support

---

## 👤 Autor
**Tu Nombre** | Sistema Académico Gamificado  
*Diseñado para TICS | Centro de Aprendizaje*

---

## 📄 Licencia
MIT

---

## 🤝 Contributing
Fork → Branch → Commit → Push → PR

¡Contribuciones bienvenidas! 🚀
