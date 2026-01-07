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

- Modelo pragmático:
  - `persona` pertenece a un colegio (`persona.id_colegio`)
  - Personas pueden repetirse en otro colegio si fuera necesario (controlado)
- BD MySQL con FK / UNIQUE / RESTRICT
  - Se evitan triggers y stored procedures por portabilidad
- Para `persona_relacion`:
  - Eliminado UNIQUE redundante `uq_relacion (id_persona,id_persona_rel)`
  - Se mantiene UNIQUE correcto  
    `uq_persona_relacion (id_persona,id_tipo_relacion,id_persona_rel)`
  - FK:
    `persona_relacion.id_tipo_relacion -> cat_tipo_relacion.id_tipo_relacion`

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

## 5. Pendiente inmediato (próximos 3 pasos)

1) Implementar validaciones de negocio en Django para `persona_relacion` (serializer):
   - no self-relation
   - mismo colegio entre ambas personas (validación por código)

2) Mejorar Tester de Integridad:
   - endpoint `POST /api/tester/run`
   - batería de pruebas con resultado PASS / FAIL

3) CRUD real (create / edit / disable) para:
   - Relaciones Persona
   - luego Matrículas

---

## 6. Comandos para levantar

### Backend
- Activar venv
- `python manage.py runserver`

### Frontend
- `npm run dev`

---

## 7. Notas operativas

- El colegio activo se muestra en UI (ejemplo: Colegio activo ID: 1)
- Hay datos demo cargados para mostrar MVP
- Este archivo es la referencia oficial del estado del proyecto
