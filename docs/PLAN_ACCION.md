# 🎯 PLAN DE ACCIÓN: QUÉ FALTA PARA COMPLETAR EL PROGRAMA

## 📋 Resumen Ejecutivo

**Tienes**: 62% del sistema completado (estructura + diseño + progreso base)
**Falta**: 38% (contenido personalizado + página de perfil + hamburger menu)
**Tiempo estimado**: 3-5 días de trabajo

---

## 🔴 TAREAS CRÍTICAS (Hacerlas PRIMERO)

### TAREA 1: Crear Página de Perfil (FASE 8)
**Criticidad**: 🔴 CRITICAL
**Tiempo**: 2 horas
**Archivos**: 
- ✏️ Crear: `src/js/views/ProfileView.js`
- ✏️ Editar: `src/js/app.js`
- ✏️ Editar: `src/js/constants/routes.js`
- ✏️ Crear: `src/css/pages/profile.css`

**Qué hacer**:
```javascript
// ProfileView.js debe mostrar:
1. Nombre usuario
2. Todos los badges (locked/unlocked)
3. Puntos totales
4. Progreso por clase
5. Botón "Reiniciar progreso"
6. Fecha de última actividad
```

**Ubicación en menú**: `RUTAS.PERFIL: '/perfil'`

---

### TAREA 2: Agregar Hamburger Menu Funcional (FASE 9)
**Criticidad**: 🔴 CRITICAL
**Tiempo**: 1.5 horas
**Archivos**:
- ✏️ Editar: `src/js/components/NavbarComponent.js`
- ✏️ Editar: `src/js/components/SidebarComponent.js`
- ✏️ Editar: `src/css/components/navbar.css`
- ✏️ Editar: `src/css/layout.css`

**Qué hacer**:
```javascript
// NavbarComponent debe:
1. Detectar si es mobile
2. Mostrar button hamburguesa (☰) en mobile
3. Al click, toggle sidebar
4. Agregar overlay para cerrar

// SidebarComponent debe:
1. Tener estado visible/hidden
2. Animación de entrada (left slide)
3. Cerrar al click en link
4. Cerrar con ESC
```

---

### TAREA 3: Personalizar Clase 1 Completamente (FASE 4)
**Criticidad**: 🟡 IMPORTANT
**Tiempo**: 1 hora
**Archivos**:
- ✏️ Editar: `src/js/constants/clases.js` (CLASE1)

**Qué cambiar en CLASE1**:
```javascript
CLASE1: {
  nome: 'Acceso al Sistema Académico',
  descripcion: 'Aprende cómo entrar al aula virtual',
  
  contenido: {
    // Cambiar estos textos
    introduccion: `
      Bienvenido a tu primer sistema académico.
      En esta clase aprenderás a acceder correctamente 
      a la plataforma y explorar todas sus funciones.
    `,
    
    // Cambiar a video REAL (YouTube embed)
    video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
    
    // Estos pasos son CORRECTOS del programa
    pasos: [  ✅ ESTÁN BIEN
      'Encender computador',
      'Abrir navegador',
      'Entrar al aula virtual',
      'Revisar asignatura',
      'Abrir correo',
      'Entrar a Teams'
    ],
    
    // Cambiar a Kahoot REAL
    kahoot: 'https://kahoot.com/join/KAHOOT_ID_AQUI',
  }
}
```

**Dónde conseguir videos**:
- YouTube: Buscar "acceso aula virtual" o grabar propio
- Enlace: `https://www.youtube.com/embed/VIDEO_ID`

**Dónde crear Kahoot**:
- Ir a kahoot.com
- Crear quiz
- Compartir URL

---

## 🟡 TAREAS IMPORTANTES (Después de las críticas)

### TAREA 4: Personalizar Clase 2 (FASE 5)
**Criticidad**: 🟡 IMPORTANT
**Tiempo**: 1 hora
**Archivo**: `src/js/constants/clases.js` (CLASE2)

```javascript
CLASE2: {
  nombre: 'Comunicación Académica',
  descripcion: 'Envía correos formales y sube tareas',
  
  contenido: {
    // Video sobre enviar correos
    video: 'https://www.youtube.com/embed/VIDEO_CORREO',
    
    // Cambiar a Microsoft Form REAL
    formulario: 'https://forms.office.com/TU_FORM_ID',
    
    // Cambiar a Edpuzzle REAL (opcional)
    edpuzzle: 'https://edpuzzle.com/TU_EDPUZZLE_ID',
  }
}
```

### TAREA 5: Personalizar Clase 3 (FASE 6)
**Criticidad**: 🟡 IMPORTANT
**Tiempo**: 1 hora
**Archivo**: `src/js/constants/clases.js` (CLASE3)

```javascript
CLASE3: {
  nombre: 'Producción Académica',
  descripcion: 'Crea documentos profesionales',
  
  contenido: {
    herramientas: ['Word', 'PowerPoint', 'Excel'],
    
    // Links a videos de YouTube (no necesitas crear propios)
    videos: {
      word: 'https://www.youtube.com/embed/WORD_VIDEO',
      powerpoint: 'https://www.youtube.com/embed/PPT_VIDEO',
      excel: 'https://www.youtube.com/embed/EXCEL_VIDEO'
    },
    
    // Template descargable (documento Word/PowerPoint)
    template: 'https://drive.google.com/TU_TEMPLATE_URL',
    
    // Kahoot sobre producción académica
    kahoot: 'https://kahoot.com/join/KAHOOT_PRODUCCION'
  }
}
```

### TAREA 6: Personalizar Clase 4 (FASE 7)
**Criticidad**: 🟡 IMPORTANT
**Tiempo**: 1 hora
**Archivo**: `src/js/constants/clases.js` (CLASE4)

```javascript
CLASE4: {
  nombre: 'Mejora tu Aprendizaje con IA',
  descripcion: 'Optimiza tu productividad con Copilot',
  
  contenido: {
    introduccion: `
      Descubre cómo usar inteligencia artificial
      (especialmente GitHub Copilot) para mejorar
      tu productividad académica.
    `,
    
    // Video sobre Copilot o IA
    video: 'https://www.youtube.com/embed/VIDEO_IA',
    
    actividad: 'Escribe un texto y mejóralo con Copilot',
    
    // Edpuzzle final
    form: 'https://forms.office.com/FORM_FINAL',
  }
}
```

---

## 🟢 TAREAS OPCIONALES (Mejoras)

### TAREA 7: Animación de Desbloqueo de Badges
**Criticidad**: 🟢 OPTIONAL
**Tiempo**: 1.5 horas

Agregar confetti/animación cuando se desbloquea un badge:
```javascript
// En completarClase():
if (badgeDesbloqueado) {
  mostrarAnimacionConfetti();
  reproducirSonitoExito();
}
```

### TAREA 8: Mejorar Mobile UX
**Criticidad**: 🟢 OPTIONAL
**Tiempo**: 1 hora

- Agregar notificaciones toast
- Mejorar spacing en mobile
- Agregar ripple effect en buttons

### TAREA 9: Agregar Leaderboard
**Criticidad**: 🟢 OPTIONAL
**Tiempo**: 2 horas

Mostrar estudiantes con más puntos (si hay múltiples usuarios)

---

## ✅ CHECKLIST PARA COMPLETAR

```
ESTRUCTURA: ✅ COMPLETADA
[x] Modelos
[x] Servicios
[x] Componentes
[x] CSS variables

FASES 1-3: ✅ COMPLETADAS
[x] Fase 1 (Estructura Base)
[x] Fase 2 (Diseño Visual)
[x] Fase 3 (Sistema Progreso)

FASES 4-10: 🔄 PENDIENTES
[ ] TAREA 1: ProfileView (Fase 8) ← PRIMERO
[ ] TAREA 2: Hamburger Menu (Fase 9) ← SEGUNDO
[ ] TAREA 3: Personalizar Clase 1 (Fase 4)
[ ] TAREA 4: Personalizar Clase 2 (Fase 5)
[ ] TAREA 5: Personalizar Clase 3 (Fase 6)
[ ] TAREA 6: Personalizar Clase 4 (Fase 7)
[ ] TAREA 7: Animaciones (Fase 8)
[ ] TAREA 8: Mobile UX (Fase 9)
[ ] TAREA 9: Leaderboard (opcional)
```

---

## 🚀 ORDEN RECOMENDADO DE TRABAJO

### Día 1 (4 horas)
- [ ] Tarea 1: ProfileView
- [ ] Tarea 2: Hamburger Menu

### Día 2 (3 horas)
- [ ] Tarea 3: Clase 1 personalizada
- [ ] Tarea 4: Clase 2 personalizada

### Día 3 (3 horas)
- [ ] Tarea 5: Clase 3 personalizada
- [ ] Tarea 6: Clase 4 personalizada

### Día 4 (2 horas)
- [ ] Tarea 7: Animaciones
- [ ] Testing en mobile

### Día 5 (1 hora)
- [ ] Fixes finales
- [ ] Deploy

---

## 🎯 CÓMO USAR ESTE PLAN

### Paso 1: Abre todos los archivos a editar
```
Mantén abiertos en VS Code:
- src/js/constants/clases.js
- src/js/views/ProfileView.js (crear)
- src/js/components/NavbarComponent.js
```

### Paso 2: Copia un prompt
De las tareas anteriores

### Paso 3: Usa Copilot
Pega el prompt en el chat de Copilot

### Paso 4: Implementa
Copilot genera el código, tú lo adaptas

### Paso 5: Prueba
Recarga el navegador (F5)

---

## 📞 PREGUNTAS FRECUENTES

**P: ¿Dónde obtengo videos?**
R: YouTube (busca "cómo acceder aula virtual") o graba los propios

**P: ¿Cómo creo un Kahoot?**
R: 
1. Ve a kahoot.com
2. Crea quiz
3. Copia el URL para unirse (share link)
4. Pega en constants/clases.js

**P: ¿Cómo creo un Microsoft Form?**
R:
1. Ve a forms.office.com
2. Nuevo formulario
3. Diseña preguntas
4. Copia el URL de compartir
5. Pega en constants/clases.js

**P: ¿Puedo usar YouTube?**
R: Sí, busca y obtén el VIDEO_ID: `https://www.youtube.com/watch?v=VIDEO_ID` y usa `https://www.youtube.com/embed/VIDEO_ID`

**P: ¿Cuánto tiempo me toma todo?**
R: Tareas críticas (1-2) = 3.5 horas
    Todas las tareas = 1-2 días

---

## 🎁 BONUS: PROMPTS LISTOS

### ProfileView
```
"Create a ProfileView.js that shows:
- User name
- All badges (locked and unlocked with icons)
- Total points
- Progress for each class
- Button to reset progress
- Last activity date
Style it like the HomeView"
```

### Hamburger Menu
```
"Add a hamburger menu to NavbarComponent:
- Show button (☰) only on mobile (max-width: 768px)
- When clicked, toggle sidebar visibility
- Close sidebar when clicking a link
- Close sidebar with ESC key
- Add smooth animation (left slide)"
```

---

**¿Quieres que comience con la TAREA 1 o prefieres hacer algo específico primero?**
