\# Proyecto Antibullying - Estado del Proyecto (Checkpoint)



\## Estado actual (funciona)

\- Backend Django corriendo en: http://127.0.0.1:8000/

\- Frontend Next.js con menú y pantallas MVP:

&nbsp; - Personas (listado OK)

&nbsp; - Roles del Sistema (listado OK)

&nbsp; - Relaciones Persona (listado OK)

&nbsp; - Tester de Integridad (pantalla OK, pruebas básicas)



\## Decisiones arquitectónicas cerradas

\- Modelo pragmático: `persona` pertenece a un colegio (`persona.id\_colegio`).

&nbsp; - Personas pueden repetirse en otro colegio si fuera necesario (controlado).

\- BD MySQL con FK/UNIQUE/RESTRICT; evitamos triggers y SP por portabilidad.

\- Para `persona\_relacion`:

&nbsp; - Se eliminó UNIQUE redundante `uq\_relacion (id\_persona,id\_persona\_rel)`

&nbsp; - Se mantiene UNIQUE correcto `uq\_persona\_relacion (id\_persona,id\_tipo\_relacion,id\_persona\_rel)`

&nbsp; - Se agregó FK: `persona\_relacion.id\_tipo\_relacion -> cat\_tipo\_relacion.id\_tipo\_relacion`



\## Pendiente inmediato (próximos 3 pasos)

1\) Implementar validaciones de negocio en Django para `persona\_relacion` (serializer):

&nbsp;  - no self-relation

&nbsp;  - mismo colegio entre ambas personas (validación por código)

2\) Mejorar Tester de Integridad:

&nbsp;  - endpoint `POST /api/tester/run` que ejecute batería de pruebas (PASS/FAIL)

3\) CRUD real (create/edit/disable) para Relaciones Persona y luego Matrículas



\## Comandos para levantar

\### Backend

\- Activar venv y correr:

&nbsp; - `python manage.py runserver`



\### Frontend

\- `npm run dev`



\## Notas

\- El colegio activo se muestra en UI (Colegio activo ID: 1).

\- Hay datos demo cargados para mostrar MVP.



