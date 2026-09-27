# Fase 4: Validación de Evidencia - Plan de Implementación

**Estado:** Iniciando  
**Bloqueador:** Fase 3 completada ✓  
**Dependencias:** Clases.js actualizado con Kahoots, Forms, Videos reales ✓  

---

## 1. Objetivo Fase 4

**Bloquear el botón "Completar Misión" en ClaseView hasta que el estudiante cumple:**
- [ ] Ver video completo (tracking de reproducción ≥ 90% duración)
- [ ] Completar Kahoot (intentar al menos una respuesta, guardar score)
- [ ] Enviar formulario Forms (marcar como completado)

**Resultado:** No podrá avanzar a próxima clase sin cumplir evidencia mínima.

---

## 2. Datos a Persistir (localStorage)

**Estructura por estudiante/clase:**
```javascript
// storage.js: Nueva estructura
"progress_C1" = {
  videoWatched: false,        // boolean
  videoDuration: 0,           // segundos
  videoProgress: 0,           // % completado
  kahootAttempted: false,     // boolean
  kahootScore: 0,             // puntos
  formSubmitted: false,       // boolean
  formSubmitTime: "2026-04-06T15:30:00Z", // ISO timestamp
  completedAt: null,          // fecha de cierre clase
  status: "in-progress"       // [not-started, in-progress, completed]
}
```

---

## 3. Componentes a Modificar

### A. ProgressService (Nueva lógica de validación)

```javascript
// progressService.js - Nuevo método
export const esEvidenciaCompleta = (claseId) => {
  const evidence = obtenerEvidenciaClase(claseId);
  return evidence.videoWatched && evidence.kahootAttempted && evidence.formSubmitted;
};

export const obtenerRequerimientosNoCompletados = (claseId) => {
  const evidence = obtenerEvidenciaClase(claseId);
  const faltantes = [];
  
  if (!evidence.videoWatched) faltantes.push('Ver video');
  if (!evidence.kahootAttempted) faltantes.push('Intentar Kahoot');
  if (!evidence.formSubmitted) faltantes.push('Enviar Formulario');
  
  return faltantes;
};
```

### B. ClaseView (UI de bloqueo y tracking)

**Cambios principales:**

1. **Estado del botón "Completar Misión"**
   - ✓ HABILITADO: Si evidencia completa
   - ✗ DESHABILITADO: Si falta algo
   - Con tooltip mostrando qué falta

2. **Carrusel de validación (antes del botón)**
   ```
   ☐ Ver video (70 min)
   ☐ Completar Kahoot  
   ☐ Enviar Formulario
   
   [Completa esto para desbloquear "Completar Misión"]
   ```

3. **Tracking de video** (en componente de reproducción)
   - Detectar cuando YouTube iframe llega a 90% duración
   - Guardar progreso en localStorage
   - Mostrar progreso visual

4. **Redirección a Kahoot/Forms**
   - Botones como popups/nuevas ventanas
   - Callback de verificación (checar localStorage periódicamente)

### C. StorageService (Métodos de persistencia)

```javascript
// storageService.js - Nuevos métodos
export const registrarVideoVisto = (claseId, duracionVista) => {
  const evidence = obtenerEvidencia(claseId);
  evidence.videoWatched = true;
  evidence.videoProgress = duracionVista;
  guardarEvidencia(claseId, evidence);
};

export const registrarKahootIntento = (claseId, score) => {
  const evidence = obtenerEvidencia(claseId);
  evidence.kahootAttempted = true;
  evidence.kahootScore = score;
  guardarEvidencia(claseId, evidence);
};

export const registrarFormularioEnviado = (claseId) => {
  const evidence = obtenerEvidencia(claseId);
  evidence.formSubmitted = true;
  evidence.formSubmitTime = new Date().toISOString();
  guardarEvidencia(claseId, evidence);
};
```

---

## 4. Integración por Componente

### Video Tracking (YouTube embed)
```javascript
// ClaseView.js - evento de progreso
window.addEventListener('message', (e) => {
  if (e.data.type === 'onStateChange' && e.data.data === 0) { // video ended
    const duracion = obtenerDuracionVideo(); // desde YouTube API
    if (duracion >= duracionMinima * 0.9) {
      registrarVideoVisto(claseId, duracion);
    }
  }
});
```

### Kahoot Tracking
```javascript
// ClaseView.js - window post-Kahoot
window.addEventListener('beforeunload', () => {
  // Simular: Si Kahoot tuvo respuestas, marcar kahootAttempted
  // En producción: usar Kahoot API o webhook
});
```

### Forms Tracking
```javascript
// ClaseView.js - polling periódico
setInterval(() => {
  // Checar si formulario fue enviado (Microsoft Forms no provee hook directo)
  // Opción 1: Usuario hace click en botón "Marcar como enviado"
  // Opción 2: Script personalizado en Forms
}, 3000);
```

---

## 5. Tareas de Implementación (Prioridad)

### SPRINT 1: Core
- [ ] Actualizar StorageService con métodos de evidencia
- [ ] Agregar lógica en ClaseView para validar estado botón
- [ ] Crear componente "Carrusel de Validación" reutilizable
- [ ] Implementar tracking de video YouTube (90%)

**Estimado:** 4-6 horas

### SPRINT 2: Kahoot + Forms Feedback
- [ ] Integrar polling de Forms
- [ ] Crear botón manual "Confirmar envío de Formulario"
- [ ] Investigar Kahoot API para automatizar (o usar polling)
- [ ] Añadir toast notifications de validación

**Estimado:** 3-4 horas

### SPRINT 3: QA + Edge Cases
- [ ] Validar persistencia multi-sesión
- [ ] Pruebas en móvil (video tracking)
- [ ] Manejo de reintentos (ej: usuario recarga sin guardar)
- [ ] Testing offline (si localStorage se perdió)

**Estimado:** 2-3 horas

---

## 6. Mockups de UI

### Estado BLOQUEADO (Falta evidencia)
```
┌─ CLASE 1: Acceso al Sistema ──────────────────────┐
│                                                   │
│  Validación de Evidencia                          │
│  ─────────────────────────────────────────────    │
│  ⭕ Ver video completo (45/120 min)               │
│  ⭕ Completar Kahoot (no iniciado)                │
│  ⭕ Enviar Formulario (no enviado)                │
│                                                   │
│  🔒 Completar Misión                              │
│  (Completa todo arriba para desbloquear)          │
│                                                   │
└───────────────────────────────────────────────────┘
```

### Estado DESBLOQUEADO (Evidencia completa)
```
┌─ CLASE 1: Acceso al Sistema ──────────────────────┐
│                                                   │
│  Validación de Evidencia                          │
│  ─────────────────────────────────────────────    │
│  ✅ Ver video completo                            │
│  ✅ Completar Kahoot (Score: 80%)                 │
│  ✅ Enviar Formulario - Juan Pérez                │
│                                                   │
│  🟢 Completar Misión [Desbloqueada]               │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## 7. Testing Manual (Checklist)

### Pre-Fase 4
- [ ] Clases.js cargue sin errores (Kahoot/Form URLs accesibles)
- [ ] Videos embebidos en YouTube muestren correctamente
- [ ] localStorage no tenga conflictos con estructura anterior

### Post-Implementación
- [ ] Botón bloqueado inicial → desbloqueado after completar
- [ ] Video 90% → registrado en storage
- [ ] Kahoot intento → registrado manually (o via API)
- [ ] Forms envío → confirmación manual (o via webhook)
- [ ] Refresh página → estado se persiste
- [ ] Próxima clase se desbloquea tras Completar Misión

---

## 8. Consideraciones Especiales

### Limitación: Kahoot API
- Kahoot Challenge API **no expone score directamente**
- Soluciones:
  1. **Manual:** Botón "Confirmar que completé Kahoot" post-regreso
  2. **Polling:** Re-preguntar cada 3 seg si se ingresó al Kahoot
  3. **Webhook:** Registrar en backend (requiere servidor)

**Recomendación:** Opción 1 (botón manual) es simple y confiable.

### Limitación: Microsoft Forms
- Forms **no expone estado de envío directamente**
- Soluciones:
  1. **Manual:** Botón "Confirmar que envié el Formulario"
  2. **QR/Token:** Código que usuario copia tras envío
  3. **Webhook:** Microsoft Forms connector (requiere Power Automate)

**Recomendación:** Opción 1 (botón manual) para MVP.

### Video Tracking (YouTube)
- **Desafío:** YouTube iframe no expone duración con CORS
- **Solución:** Usar evento `onPlayerStateChange` + estimación de progreso
- **Fallback:** UI que invite "Marca aquí cuando termines" + botón manual

---

## 9. Rollout

**Semana 1 (Mañana):**
1. Implementar SPRINT 1 (core)
2. Testear con C1 y C2 (videos ya disponibles)
3. Validar Kahoot/Forms accesibles

**Semana 2:**
1. Completar SPRINT 2 (Kahoot/Forms feedback)
2. Preparar para QA
3. Documentar procedimiento de "confirmación manual"

**Semana 3:**
1. SPRINT 3 QA
2. Testing multi-dispositivo
3. Ajustes antes de Fase 5 (data analytics)

---

## 10. Matriz de Decisión (Video Tracking)

| Opción | Complejidad | Confiabilidad | Recomendación |
|--------|-------------|---------------|---------------|
| YouTube API + iframe | MEDIA | ALTA | ✓ Ideal |
| Event listener (time updates) | BAJA | MEDIA | Fallback |
| Manual button "Vi todo" | MUY BAJA | MEDIA | MVP |
| Polling localStorage | MEDIA | BAJA | No |

**Selección:** YouTube API (Media esfuerzo, máxima confiabilidad).

---

## Próximos Commits

1. `feat: add evidence tracking infrastructure (storageService)`
2. `feat: implement completion validation in ClaseView`
3. `feat: add validation UI component for class requirements`
4. `feat: integrate YouTube watched tracking`
5. `refactor: migrate all Kahoot/Form URLs to real links`

---

**Proyecto casi en meta.** Una vez Fase 4 esté working, el flujo pedagógico quedará cerrado (Fase 5-7 son reportes y analytics).

