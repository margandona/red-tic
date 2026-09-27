# Fase 0 - Seguridad: acciones criticas

Fecha: 2026-04-05

## Estado
- Se detecto un archivo de credenciales Firebase Admin expuesto en el repositorio.
- Se aplicaron reglas en `.gitignore` para bloquear nuevos commits de secretos.
- Se agrego `.env.example` para usar variables de entorno sin exponer claves reales.
- Se agrego escaneo local de secretos con `npm run security:scan`.

## Acciones aplicadas en este repo
1. Endurecimiento de `.gitignore` con patrones para archivos de credenciales.
2. Creacion de plantilla `.env.example` (sin valores reales).
3. Eliminacion del archivo sensible del arbol del proyecto.
4. Script de escaneo de secretos en `scripts/scan-secrets.js`.

## Validacion tecnica obligatoria antes de cada push
Ejecutar:

```bash
npm run security:scan
```

Resultado esperado:
- `PASS`: no se detectan secretos obvios.
- `FAIL`: revisar el archivo reportado y eliminar/rotar credencial antes de continuar.

## Si la clave fue commiteada antes: saneamiento de historial
Si el archivo sensible ya se subio a remoto, ademas de rotar la clave debes limpiar historial.

Comando sugerido (repositorio local):

```bash
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch docs/aula-educativa-firebase-adminsdk-fbsvc-f9a7f710d1.json" --prune-empty --tag-name-filter cat -- --all
```

Luego forzar push coordinado con el equipo:

```bash
git push origin --force --all
git push origin --force --tags
```

Nota: si usas GitHub, tambien puedes usar herramientas como BFG Repo-Cleaner.

## Acciones obligatorias fuera del codigo (pendientes)
1. Revocar la clave privada expuesta en Google Cloud/Firebase.
2. Crear una nueva clave de service account.
3. Reemplazar cualquier uso anterior de la clave comprometida.
4. Revisar historial y PRs donde se haya podido publicar la clave.
5. Si el repo fue publico, asumir compromiso total y rotar inmediatamente.

## Checklist rapido de cierre Fase 0
- [ ] Credencial expuesta revocada.
- [ ] Credencial nueva creada y almacenada de forma segura.
- [x] Ninguna clave privada en el repo actual.
- [ ] Flujos del proyecto operando con nuevas credenciales.
- [ ] Equipo notificado del incidente y de la rotacion.
- [x] Escaneo `npm run security:scan` pasando en local.
- [ ] (Si aplica) historial git saneado en remoto.

## Nota importante
Eliminar el archivo del repo no invalida una clave ya expuesta. La rotacion/revocacion es obligatoria para cerrar el riesgo.
