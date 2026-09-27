# Plan de Cierre del Proyecto de Gamificacion en el Aula

Fecha de analisis: 2026-04-05

Estado de ejecucion actualizado:
- Fase 0: AVANZADA (completa en repositorio; pendiente rotacion/revocacion cloud y saneamiento remoto si aplica).
- Fase 1: COMPLETADA (matriz de contenido y duracion 8 horas cerradas).

## 1) Estado actual real de la app

### Lo que SI esta implementado en codigo
- App SPA con rutas para Home, 4 clases, perfil y leaderboard.
- Flujo gamificado base: progreso por clase, puntos, badges y desbloqueo secuencial.
- Persistencia en localStorage (usuario + progreso).
- Componentes UI funcionando (navbar, sidebar, progress bar, badges, toasts, modal de badge, confetti).
- Vistas principales operativas: Home, Clase, Perfil, Leaderboard.
- Estructura de contenidos por clase en `src/js/constants/clases.js`.

### Lo que SI existe en documentacion
- Guias para crear actividades de Kahoot y Microsoft Forms por cada clase.
- Planes y documentos de fases (varios), aunque con estados no siempre consistentes entre si.

---

## 2) Faltantes detectados para terminar de verdad

## A. Contenido pedagogico y recursos
- Falta cerrar el contenido final 100% institucional de todas las clases (textos, ejemplos, evidencias, rubricas).
- Hay al menos un video de prueba evidente (Clase 1 usa un video placeholder), por lo que falta reemplazar por videos finales.
- Los enlaces de Kahoot actuales apuntan a canal/general; falta definir y publicar enlaces finales de quiz por clase.
- En Forms hay enlaces, pero falta validar que sean los formularios finales correctos por curso/grupo y no versiones borrador.

## B. Integracion funcional (brecha importante)
- Hoy la app permite marcar "Completar Mision" sin validar que el estudiante haya visto video o realizado Kahoot/Forms.
- No hay trazabilidad real de "actividad hecha" (solo checkboxes locales y boton de completar).
- No existe envio/registro de evidencias (capturas, archivos, URL de trabajo).

## C. Datos, usuarios y ranking
- El perfil usa datos de usuario "simulados" (nombre/email fijos), no datos reales del estudiante.
- El leaderboard funciona solo con datos locales del navegador (no ranking real multiusuario).
- No hay autenticacion real ni backend para consolidar progreso de toda la clase.

## D. Seguridad y operacion
- Existe un archivo de credenciales de Firebase Admin dentro de docs (alto riesgo): debe retirarse del repo y rotarse la llave.
- Falta politicas basicas de manejo de secretos (.gitignore + variables de entorno + proceso de rotacion).

## E. Producto/documentacion final
- Documentacion de estado tiene contradicciones (archivos que dicen "completado" vs "pendiente").
- Faltan criterios de aceptacion finales por fase (Done Definition) centralizados en un solo documento de cierre.
- Metadatos del proyecto aun parecen plantilla (author/repository), falta cierre para entrega formal.

---

## 3) Fases propuestas para terminar el proyecto

## Fase 0 - Blindaje critico (Seguridad) [Prioridad maxima]
Objetivo: evitar riesgo por exposicion de credenciales.

Tareas:
1. Revocar/rotar inmediatamente la service account expuesta.
2. Eliminar el JSON sensible del repositorio y del historial si fue publicado.
3. Agregar reglas de secretos en .gitignore y guia de variables de entorno.
4. Dejar un archivo ejemplo (`.env.example`) sin secretos.

Entregable:
- Proyecto sin secretos comprometidos + credenciales nuevas operativas.

Criterio de cierre:
- No existe ninguna clave privada en el repo ni en docs.

---

## Fase 1 - Congelacion de contenido academico
Objetivo: cerrar el contenido curricular final de las 4 clases.

Tareas:
1. Validar y ajustar objetivos, evidencias y practica autonoma de cada clase.
2. Definir rubrica minima por clase (logrado/parcial/no logrado).
3. Unificar lenguaje institucional y nivel (evitar texto demo o generico).
4. Validar duracion real por actividad (video + kahoot + forms + cierre).

Entregable:
- Matriz final de contenido por clase (C1-C4) aprobada por docente.

Criterio de cierre:
- Cada clase tiene contenido final aprobado y sin placeholders.

---

## Fase 2 - Produccion de videos finales (reemplazo de videos de prueba)
Objetivo: tener videos reales listos para uso en aula.

Tareas:
1. Preproduccion:
- Guion corto por clase (3-6 minutos recomendado).
- Storyboard rapido (pantalla a grabar + mensaje clave).
- Plantilla visual unificada (intro/outro, identidad del curso).
2. Produccion:
- Grabar 4 videos (uno por clase).
- Cuidar audio claro, ritmo y demostracion paso a paso.
3. Postproduccion:
- Editar, limpiar errores, subtitular (minimo auto-subtitulos revisados).
- Exportar en formato web (1080p o 720p optimizado).
4. Publicacion:
- Subir a canal institucional (YouTube no listado o plataforma institucional).
- Reemplazar URLs finales en la configuracion de clases.

Entregable:
- 4 videos finales publicados + enlaces insertados en la app.

Criterio de cierre:
- Ninguna clase usa video de prueba; todos los enlaces funcionan.

---

## Fase 3 - Actividades Kahoot y Forms finales
Objetivo: pasar de especificaciones a actividades reales publicadas.

Tareas:
1. Crear/publicar 4 Kahoots finales (uno por clase) con preguntas revisadas.
2. Crear/publicar 4 Forms finales con configuracion de puntuacion y feedback.
3. Verificar permisos de acceso (estudiantes con enlace pueden responder).
4. Guardar matriz maestra de enlaces finales (Kahoot + Forms por clase).
5. Actualizar enlaces en la app con URLs finales, no de canal generico.

Entregable:
- 8 actividades publicadas y enlazadas en app.

Criterio de cierre:
- Todos los botones de actividades abren recursos finales correctos.

---

## Fase 4 - Integracion de evidencia y validacion de completitud
Objetivo: que "Completar Mision" represente trabajo real.

Tareas:
1. Agregar check de evidencia minima antes de permitir completar clase.
2. Registrar estado de actividades por clase:
- Video visto.
- Kahoot realizado.
- Forms enviado.
3. Mejorar UX de confirmacion:
- Reemplazar alerts nativos por toasts/modales consistentes.
4. Agregar resumen de estado por clase (faltantes visibles para estudiante).

Entregable:
- Flujo de completitud validado (sin atajos falsos).

Criterio de cierre:
- No se puede completar una clase sin cumplir condiciones definidas.

---

## Fase 5 - Datos reales y cierre de gamificacion
Objetivo: dejar la experiencia lista para uso con estudiantes reales.

Tareas:
1. Sustituir datos simulados de perfil por datos reales del usuario.
2. Definir estrategia de usuarios:
- Opcion A: mantener local (piloto corto).
- Opcion B: migrar a backend/Firebase para uso multiusuario real.
3. Si se requiere ranking real, implementar persistencia compartida.
4. Validar integridad de puntos/badges con reglas de negocio simples.

Entregable:
- Perfil coherente con usuario real y roadmap de datos definido.

Criterio de cierre:
- El comportamiento de perfil/ranking coincide con el alcance del curso.

---

## Fase 6 - QA integral (tecnico + pedagogico)
Objetivo: asegurar calidad antes de lanzamiento final.

Tareas:
1. QA funcional:
- Navegacion completa.
- Desbloqueo de clases.
- Badges y puntos.
- Links de video/Kahoot/Forms.
2. QA UX/UI:
- Movil/tablet/escritorio.
- Legibilidad, contrastes, botones y mensajes.
3. QA pedagogico:
- Coherencia entre objetivo, actividad y evidencia.
- Tiempo real de clase.
4. QA de contenido:
- Ortografia, tono, consistencia institucional.

Entregable:
- Acta de pruebas con incidencias y correcciones aplicadas.

Criterio de cierre:
- 0 bloqueantes y 0 enlaces rotos.

---

## Fase 7 - Entrega final y material de presentacion
Objetivo: cerrar el proyecto para presentacion/implementacion.

Tareas:
1. Unificar documentacion final (estado real, arquitectura, uso docente, uso estudiante).
2. Preparar guion demo de 10-15 minutos.
3. Crear paquete de evidencias:
- Capturas de app.
- Ejemplo de resultados de Forms/Kahoot.
- Muestra de badges/progreso.
4. Ajustar metadata del repo para entrega formal.

Entregable:
- Proyecto listo para exponer y operar en aula.

Criterio de cierre:
- Demo completa sin fallos + evidencia compilada.

---

## 4) Cronograma sugerido (realista)

- Semana 1: Fase 0 + Fase 1.
- Semana 2: Fase 2 (videos).
- Semana 3: Fase 3 + Fase 4.
- Semana 4: Fase 5 + Fase 6 + Fase 7.

Si van justos de tiempo:
- Minimo viable de cierre: Fase 0 + Fase 2 + Fase 3 + Fase 6.

---

## 5) Backlog accionable inmediato (ordenado)

1. Seguridad: rotar y retirar credenciales expuestas.
2. Reemplazar videos de prueba por 4 videos finales.
3. Publicar 4 Kahoot + 4 Forms finales.
4. Actualizar enlaces finales en clases.
5. Bloquear "Completar Mision" hasta cumplir evidencias minimas.
6. Corregir perfil simulado y definir estrategia de datos reales.
7. Ejecutar QA integral y corregir bloqueantes.
8. Cerrar documentacion y preparar demo.

---

## 6) Checklist final de "Proyecto terminado"

- [ ] No hay secretos ni credenciales sensibles en el repo.
- [ ] 4/4 videos finales publicados y enlazados.
- [ ] 4/4 Kahoot publicados y enlazados.
- [ ] 4/4 Forms publicados y enlazados.
- [ ] Flujo de completitud valida actividades reales.
- [ ] Perfil y progreso coherentes con alcance real del curso.
- [ ] QA funcional y pedagogico aprobado.
- [ ] Documentacion final unica y consistente.
- [ ] Demo final lista (sin contenido de prueba).

---

## 7) Nota importante sobre alcance

Hoy la base tecnica esta avanzada y usable para prototipo/piloto. Lo que falta para "terminado" es principalmente:
- Cierre de contenido real (videos + actividades).
- Validacion de evidencias en el flujo.
- Endurecimiento de seguridad y consistencia de entrega.

Con esas fases completadas, el proyecto queda en nivel de implementacion real en aula, no solo demo.
