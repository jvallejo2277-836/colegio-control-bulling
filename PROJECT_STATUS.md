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


## 11.1 Regla de oro – Next.js App Router (PREVENCIÓN DE ERRORES)

🧠 Regla de oro para evitar errores en App Router

- Client Component → interactividad
  - onClick, useState, useEffect, handlers de eventos
  - debe declarar: "use client"
  - NO puede exportar metadata

- Server Component → estructura y contexto
  - metadata
  - fetch / acceso a datos
  - layout y composición
  - es el comportamiento por defecto (sin "use client")

📌 Patrón recomendado cuando se requiere ambos:
- page.jsx → Server Component (metadata, layout)
- PageClient.jsx → Client Component (UI interactiva)

Esta regla es obligatoria para mantener estabilidad y evitar errores de build/runtime.


---

### Changelog
- **2026-01-07**
  - Confirmada autenticación JWT con SimpleJWT.
  - Incorporado concepto de colegio activo backend-driven.
  - Definido modo compatibilidad para transición sin quiebre.
  - Formalizada regla de entrega por archivos completos.
- **2026-01-13**
  - Incorporado marco normativo mínimo y Protocolo Base de Convivencia Escolar (estados, campos obligatorios y reglas de transición).


	Nota: La persona afectada (víctima) puede ser cualquier integrante de la comunidad educativa
	(estudiante, docente, asistente, directivo o apoderado), según el tipo de caso.

###  Nota legal: En casos que revistan carácter de delito (por ejemplo abuso sexual, agresión grave,
     amenazas graves u otros), el establecimiento tiene obligación legal de denunciar a la autoridad
     competente. El sistema actúa como apoyo de registro y activación del protocolo, y no reemplaza
     las obligaciones legales ni la investigación penal.


###
### ✅ DB-first: si una tabla existe en BD pero no hay modelo catálogo en Django, se trabaja con IntegerField(db_column=...) + lookups por join/query, y recién al final se convierte a FK.


## 12. Convivencia Escolar – Marco normativo y Protocolo Base (MVP) (DECISIÓN CERRADA)

### 12.1 Objetivo
Este módulo define el **marco legal mínimo** y el **protocolo base** que gobierna el modelo de “casos” del sistema.
El sistema **no reemplaza** al Reglamento Interno ni al Equipo de Convivencia: actúa como plataforma de **gestión, trazabilidad y evidencia**.

### 12.2 Marco normativo mínimo (Chile) – Implicancias para el sistema
Obligatorio (para defensa y cumplimiento):
- Existencia de **Reglamento Interno** con normas de convivencia y procedimientos.
- Existencia de **Encargado/a de Convivencia Escolar** (responsable del proceso).
- Enfoque: **prevención + medidas formativas**, no solo sanción.
- **Debido proceso**: decisiones fundadas, registro de acciones, proporcionalidad y trazabilidad.

No obligatorio (pero recomendado / valor agregado):
- Herramienta digital (la ley no obliga software).
- Métricas avanzadas, scoring, IA, etc. (se dejan como roadmap).

### 12.3 Protocolo Base de Abordaje (Plantilla adaptable por colegio)
Fases del proceso:
1) Detección → 2) Evaluación Inicial → 3) Investigación → 4) Resolución → 5) Seguimiento → 6) Cierre

### 12.4 Estados oficiales del CASO (núcleo del modelo)
Estados (mínimos):
- CREADO
- EN_EVALUACION
- EN_INVESTIGACION
- RESUELTO
- EN_SEGUIMIENTO
- CERRADO

Regla: **RESUELTO ≠ CERRADO** (el cierre exige seguimiento o verificación final).

### 12.5 Campos mínimos obligatorios por caso (MVP)
- Fecha/hora de creación
- Origen del reporte (docente / alumno / apoderado / observación / otro)
- Descripción inicial
- Personas involucradas (rol en el caso: denunciante / afectado / denunciado / testigo)
- Estado actual del caso
- Bitácora de acciones (acción, responsable, fecha/hora, observación)
- Resolución con fundamento (medidas + responsable + fecha)
- Fecha de cierre + responsable + observación final

### 12.6 Reglas de transición de estados (Paso 4)
Principios:
- No hay “culpables” en CREADO / EN_EVALUACION: solo **registro y evaluación**.
- Ninguna sanción “automática”: toda medida requiere **fundamento** y responsable.
- Toda transición debe generar **evento/auditoría** (quién, cuándo, desde/hacia, motivo).



Para casos con denuncia obligatoria (flag requiere_denuncia = true):
- Se agrega estado DERIVADO_A_AUTORIDAD.
- El sistema llega hasta registrar la denuncia (fecha, institución, identificador/parte, responsable y observación).
- Se exige evidencia adjunta o justificación “sin evidencia”.
- Se bloquea el cierre (CERRADO) si no existe registro de denuncia.
Nota: El sistema no verifica la veracidad externa; el responsable final es el funcionario/establecimiento. Todo queda auditado.



Transiciones mínimas:
- CREADO → EN_EVALUACION (Encargado Convivencia)
- EN_EVALUACION → EN_INVESTIGACION (Encargado Convivencia)
- EN_INVESTIGACION → RESUELTO (Encargado Convivencia / Dirección según reglamento)
- RESUELTO → EN_SEGUIMIENTO (Encargado Convivencia)
- EN_SEGUIMIENTO → CERRADO (Encargado Convivencia)

Restricciones:
- No se permite saltar EN_INVESTIGACION si el caso fue clasificado como violencia/acoso.
- CERRADO exige: resolución registrada + verificación final (seguimiento o constatación)





