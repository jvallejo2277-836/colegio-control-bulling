# 📘 Sistema de Control y Convivencia Escolar Antibullying

Este proyecto implementa una plataforma moderna para la gestión integral de convivencia escolar, enfocada especialmente en la prevención, seguimiento y control de casos de bullying dentro de establecimientos educacionales.

El sistema combina un backend robusto en Django + REST API con un frontend modular en React + Vite, permitiendo una experiencia rápida, escalable y preparada para integraciones futuras (IoT, GPS, cámaras, alarmas, etc.).

---

## 🚀 Características principales

- Gestión de colegios, cursos, alumnos, apoderados y equipo de convivencia escolar.
- API REST completamente estructurada para interoperabilidad.
- Frontend moderno con componentes reutilizables.
- Preparado para integrar:
  - dispositivos móviles,
  - GPS,
  - sistemas de cámaras,
  - paneles de alerta,
  - sensores IoT,
  - aplicaciones para denuncias anónimas.

---

# 🏗️ Arquitectura del Proyecto

Estructura principal del repositorio:

colegio-control-bullying/
- control_bullying_backend/ (Django + DRF)
  - backend/ (configuración)
  - convivencia_escolar/ (modelos, serializers, vistas, rutas)
  - venv/ (entorno virtual, ignorado en Git)
- control_bullying_frontend/ (React + Vite)
  - src/
    - pages/Login.jsx
    - App.jsx
    - assets/
  - public/
- EERR/ (documentos técnicos, modelo de datos, respaldos SQL)
- README.md

---

# ⚙️ Instalación y Ejecución

## 🐍 Backend (Django)

1) Activar entorno virtual:

    cd control_bullying_backend
    venv\Scripts\activate

2) Instalar dependencias (cuando exista requirements.txt):

    pip install -r requirements.txt

3) Ejecutar servidor:

    python manage.py runserver

Backend disponible en:
- http://127.0.0.1:8000
- http://127.0.0.1:8000/api/

---

## ⚛️ Frontend (React + Vite)

1) Instalar dependencias:

    cd control_bullying_frontend
    npm install

2) Ejecutar servidor:

    npm run dev

Frontend disponible en:
- http://localhost:5173

---

# 🗂️ Endpoints principales (API REST)

| Recurso | URL Base | Descripción |
|--------|----------|-------------|
| Colegios | /api/colegios/ | CRUD de colegios |
| Personas | /api/personas/ | Alumnos, apoderados, funcionarios |
| Cursos | /api/cursos/ | Gestión de cursos y profesores jefes |
| Matrículas | /api/matriculas/ | Inscripción y seguimiento anual |
| Roles | /api/roles/ | Tipos de roles institucionales |
| Persona-Rol | /api/persona-rol/ | Asignación de roles |
| Persona-Relación | /api/persona-relacion/ | Vínculos familiares o administrativos |
| Usuarios-Persona | /api/usuarios-persona/ | Relación entre usuarios Django y personas |

---

# 🛣️ Roadmap del Proyecto

Próximas fases:

- Módulo de denuncias internas y externas.
- Flujos de derivación según la política de convivencia escolar.
- Panel de incidentes por curso.
- Integración con aplicaciones móviles (GPS, alertas).
- Integración con cámaras / VMS para registros automáticos.
- Sistema de reportes para UTP, directores y sostenedores.
- Dashboards con analítica avanzada.

---

# 🙌 Contribución

Por ahora es un proyecto personal.  
En el futuro se permitirá colaboración bajo estándares definidos.

---

# 📄 Licencia

Proyecto privado. Todos los derechos reservados.

---

# 👤 Autor

**José Miguel Vallejo**  
Consultor en Transformación Digital – Especialista en gobernanza tecnológica, IoT, automatización y plataformas educativas.

---
