# 🚀 QUICK START - Comienza en 5 minutos

## 1️⃣ Abre el proyecto en el navegador

### Opción A: Directamente (la más simple)
```bash
# En Windows
start src/index.html

# En Mac
open src/index.html

# En Linux
xdg-open src/index.html
```

### Opción B: Con servidor (recomendado)
```bash
# Ejecuta desde la carpeta del proyecto
python -m http.server 8000

# Luego abre en navegador:
http://localhost:8000/src/index.html
```

### Opción C: Live Server en VS Code
1. Instala extensión: "Live Server"
2. Click derecho en `src/index.html`
3. Selecciona "Open with Live Server"

---

## 2️⃣ Prueba el sistema

**Verás**:
```
🏠 HOME
├─ Progreso General: 0% (barra)
├─ Clase 1 ✅ (desbloqueada)
│  └─ Botón: "Comenzar"
├─ Clase 2 🔒 (bloqueada)
├─ Clase 3 🔒 (bloqueada)
└─ Clase 4 🔒 (bloqueada)
```

**Haz esto**:
1. Click en "Comenzar" en Clase 1
2. Marca 3-4 checkboxes
3. Barra de progreso actualiza
4. Click en "Completar Misión"
5. ¡Badge desbloqueado! ✅
6. ¡Clase 2 está desbloqueada! 🎉

---

## 3️⃣ Verifica datos en localStorage

```
F12 → Application → LocalStorage → http://localhost:8000

Busca:
✓ gamified_app_current_user
✓ gamified_app_progress_usuario_XXXX
```

**Verás tus datos guardados** 💾

---

## 4️⃣ Personaliza Clase 1

Abre: `src/js/constants/clases.js`

Busca `CLASE1` y cambia:

```javascript
CLASE1: {
  id: 'clase1',
  nombre: 'Acceso al Sistema Académico', // ← CAMBIAR
  descripcion: 'Aprende cómo entrar al aula virtual', // ← CAMBIAR
  contenido: {
    introduccion: 'Bienvenido al sistema...', // ← CAMBIAR
    video: 'https://youtube.com/embed/VIDEO_ID', // ← CAMBIAR
    pasos: [
      'Encender computador',        // ← CAMBIAR
      'Abrir navegador',
      'Entrar al aula virtual',
      'Revisar asignatura',
      'Abrir correo',
      'Entrar a Teams'
    ],
    kahoot: 'https://kahoot.com/...', // ← CAMBIAR
  },
}
```

**Luego refecha la página (F5)** para ver los cambios.

---

## 5️⃣ Próximo: Personaliza otras clases

Repite el paso 4 para:
- `CLASE2` (Comunicación)
- `CLASE3` (Producción)
- `CLASE4` (IA)

---

## 📋 Recursos útiles

| Algo | Archivo |
|-----|--------|
| **Estructura completa** | [RESUMEN_EJECUTIVO.md](./docs/RESUMEN_EJECUTIVO.md) |
| **Guía de fases** | [GUIA_FASES.md](./docs/GUIA_FASES.md) |
| **Arquitectura técnica** | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| **Documentación completa** | [README.md](./README.md) |

---

## ⚠️ Si algo sale mal

### "No veo nada en la pantalla"
```
1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores rojos
4. Reporta el error completo
```

### "Los estilos no se cargan"
```
1. Cierra el navegador
2. Borra caché (Ctrl+Shift+Del)
3. Reabre el proyecto
```

### "LocalStorage no guarda"
```
1. DevTools → Application → Storage
2. Verifica que localStorage está habilitado
3. Cierra modo incógnito si está abierto
```

---

## 🎯 Checklist rápido

- [ ] Abriste index.html en navegador
- [ ] Ves la página Home con 4 clases
- [ ] Puedes hacer click en Clase 1
- [ ] Los checkboxes funcionan
- [ ] Puedes completar la clase
- [ ] Ves que avanzó el progreso
- [ ] Clase 2 está desbloqueada

Si todo ✅, **¡tu sistema funciona perfectamente!**

---

## 💡 TIP

**Usa Copilot para:**
```
"Update CLASE2 configuration with content about:
- Academic communication
- How to write formal emails
- How to submit assignments
- Add a link to Microsoft Forms"
```

Copilot generará el código listo para copiar-pegar.

---

## 🚀 ¡Siguiente!

1. ✅ Sistema funcionando
2. 👉 Personaliza contenido (GUIA_FASES.md)
3. 📹 Agrega videos reales
4. 🎯 Conexiona Kahoot/Forms
5. 🎨 Mejora diseño
6. 📱 Testa en mobile
7. 🚢 Deploy

---

**¿Dudas? Lee GUIA_FASES.md o pide ayuda a Copilot.** 
✨

