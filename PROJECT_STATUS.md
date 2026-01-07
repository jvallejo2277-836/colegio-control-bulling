# Proyecto Antibullying – Estado del Proyecto (Checkpoint)

## 1. Estado actual (funciona)

- Backend Django corriendo en: http://127.0.0.1:8000/
- Frontend Next.js con menú y pantallas MVP:
  - Personas (listado OK)
  - Roles del Sistema (listado OK)
  - Relaciones Persona (listado OK)
  - Tester de Integridad (pantalla OK, pruebas básicas)

---

## 2. Decisiones arquitectónicas cerradas

### 2.1 Modelo de personas y colegios

- Modelo pragmático:
  - `persona` tiene un colegio base (`persona.id_colegio`)
  - **Se permite repetición controlada de personas en otros colegios**
- Durante una sesión **no existe ambigüedad**:
  - el colegio activo es único
  - gobierna toda la sesión

### 2.2 Base de datos

- BD MySQL con:
  - FK
  - UNIQUE
  - RESTRICT
- Se evitan:
  - triggers
  - stored procedures
- Motivo: portabilidad, claridad y menor acoplamiento al engine

### 2.3 persona_relacion

- Eliminado UNIQUE redundante:
  - `uq_relacion (id_persona,id_persona_rel)`
- Se mantiene UNIQUE correcto:
  - `uq_persona_relacion (id_persona,id_tipo_relacion,id_persona_rel)`
- FK vigente:
  - `persona_relacion.id_tipo_relacion → cat_tipo_relacion.id_tipo_relacion`

---

## 3. Decisiones de UX / Flujo de Usuario (CERRADAS)

- El **colegio activo se define SOLO en el login**
- El colegio activo:
  - gobierna toda la sesión
  - se muestra en la UI como referencia
- Para cambiar de colegio:
  - logout obligatorio
  - nuevo login
- No se usará selector de colegio persistente en header
- Se evita ambigüedad multi-colegio durante una sesión

---

## 4. Criterios de diseño del sistema (reglas del proyecto)

- Backend es la **fuente de verdad**
- Validaciones de negocio:
  - siempre en Django (serializers / services)
  - nunca solo en frontend
- Evitar lógica compleja en BD
- Preferir claridad y trazabilidad sobre optimización prematura
- Modelo pensado para:
  - mantenibilidad
  - onboarding de nuevos desarrolladores

---

## 5. Tester de Integridad (criterio oficial)

El **Tester de Integridad** es un componente clave del proyecto.

### Principio central
- Los testers **no validan UI**
- Los testers **no son CRUD**
- Los testers **fuerzan errores contra el modelo relacional**
- El objetivo es:
  - detectar inconsistencias
  - explicar *por qué* una regla se rompe

### Regla de diseño (obligatoria)
⚠️ **Un tester por tabla o relación** ⚠️

No se implementan “mega-testers” mezclando dominios.

---

## 6. Orden correcto de implementación de testers (acordado)

1) **Un tester por tabla**
   - Comenzar con: `persona`

2) **Un tester por relación**
   - Luego: `persona_rol`
   - Luego: `persona_relacion`

3) **UI del Tester**
   - Lista de testers disponibles
   - Ejecutar un tester individual
   - Mostrar resultados en fichas claras (PASS / FAIL + diagnóstico)

4) **Suite agregada**
   - Opción: “Ejecutar todos los testers”
   - Solo cuando los testers individuales estén estables

5) **Regla de oro**
   - ❌ No adelantar entidades que aún no entran al menú
   - ❌ No mezclar dominios (ej: matrícula / curso)
   - ✅ Avanzar incrementalmente y con control

---

## 7. Pendiente inmediato (próximos pasos)

1) Implementar validaciones de negocio en Django para `persona_relacion` (serializer):
   - no self-relation
   - mismo colegio entre ambas personas (según colegio activo)

2) Mejorar Tester de Integridad:
   - endpoint `POST /api/tester/run`
   - testers individuales por tabla / relación
   - resultado PASS / FAIL con diagnóstico

3) CRUD real (create / edit / disable) para:
   - Relaciones Persona
   - luego Matrículas

---

## 8. Comandos para levantar

### Backend
- Activar venv
- `python manage.py runserver`

### Frontend
- `npm run dev`

---

## 9. Notas operativas

- El colegio activo se muestra en UI (ejemplo: Colegio activo ID: 1)
- Hay datos demo cargados para mostrar MVP
- Este archivo es la **referencia oficial del estado del proyecto**

---

## 10. Autenticación y contexto de sesión (DECISIÓN CERRADA)

- El backend utiliza **JWT con SimpleJWT** para autenticación.
- El JWT identifica al usuario (**identidad**).
- El **colegio activo NO viaja en el token**.
- El colegio activo se gestiona en backend mediante un **contexto de usuario persistido** (`UsuarioContexto`).
- El backend es la **fuente de verdad** del colegio activo.

### Modo compatibilidad (temporal)
- Mientras el frontend migra:
  - Si existe colegio activo en backend → se utiliza ese.
  - Si NO existe → se acepta `?id_colegio=` como fallback.
- Este modo es **temporal y controlado**.
- Objetivo: no romper pantallas existentes mientras se refactoriza con orden.

---

## 11. Regla de trabajo – prevención de errores humanos (OBLIGATORIA)

- Toda modificación de código se entrega como **ARCHIVO COMPLETO**.
- No se entregan fragmentos ni instrucciones parciales para copiar/pegar.
- Si se requiere modificar un archivo existente:
  - el archivo actual se sube
  - se devuelve **completo y listo para reemplazar**.
- Objetivo:
  - evitar errores de integración
  - evitar omisiones involuntarias
  - asegurar trazabilidad y consistencia del proyecto

---

### Changelog
- **2026-01-07**
  - Confirmada autenticación JWT con SimpleJWT.
  - Incorporado concepto de colegio activo backend-driven.
  - Definido modo compatibilidad para transición sin quiebre.
  - Formalizada regla de entrega por archivos completos.
