from django.contrib import admin
from .models import (
    Colegio, Persona, Curso, Matricula,
    CatCategoriaRol, CatJornada, CatEstadoMatricula,
    RolPersona, PersonaRol, PersonaRelacion,
    UsuarioPersona
)

# ============================
#   CONFIGURACIONES GENERALES
# ============================


class TimeStampedReadOnly(admin.ModelAdmin):
    """Mixin para bloquear edición de fechas."""
    readonly_fields = ("fecha_creacion", "fecha_actualizacion", "fecha_baja")


# ============================
#           COLEGIO
# ============================

@admin.register(Colegio)
class ColegioAdmin(TimeStampedReadOnly):
    list_display = ("id_colegio", "rbd", "nombre", "comuna", "region", "activo")
    search_fields = ("rbd", "nombre", "comuna", "region")
    list_filter = ("region", "activo")


# ============================
#           PERSONA
# ============================

class PersonaRolInline(admin.TabularInline):
    model = PersonaRol
    extra = 1
    autocomplete_fields = ("id_rol",)
    readonly_fields = ("fecha_creacion", "fecha_actualizacion", "fecha_baja")


class PersonaRelacionInline(admin.TabularInline):
    model = PersonaRelacion
    fk_name = "id_persona"
    extra = 1


@admin.register(Persona)
class PersonaAdmin(TimeStampedReadOnly):
    list_display = ("id_persona", "nombre_completo", "colegio", "activo")
    search_fields = ("nombres", "apellidos")  # NO mostrar RUT
    list_filter = ("activo", "id_colegio")
    inlines = [PersonaRolInline, PersonaRelacionInline]

    def nombre_completo(self, obj):
        return f"{obj.nombres} {obj.apellidos}"

    def colegio(self, obj):
        return obj.id_colegio.nombre


# ============================
#        CATÁLOGOS
# ============================

@admin.register(CatCategoriaRol)
class CatCategoriaRolAdmin(TimeStampedReadOnly):
    list_display = ("id_categoria", "nombre", "activo")
    list_filter = ("activo",)
    search_fields = ("nombre",)


@admin.register(CatJornada)
class CatJornadaAdmin(TimeStampedReadOnly):
    list_display = ("id_jornada", "nombre", "activo")
    search_fields = ("nombre",)


@admin.register(CatEstadoMatricula)
class CatEstadoMatriculaAdmin(TimeStampedReadOnly):
    list_display = ("id_estado_matricula", "nombre", "activo")
    search_fields = ("nombre",)


# ============================
#           ROLES
# ============================

@admin.register(RolPersona)
class RolPersonaAdmin(TimeStampedReadOnly):
    list_display = ("id_rol", "nombre", "id_categoria", "activo")
    list_filter = ("id_categoria", "activo")
    search_fields = ("nombre",)


@admin.register(PersonaRol)
class PersonaRolAdmin(TimeStampedReadOnly):
    list_display = ("id_persona_rol", "id_persona", "id_rol", "fecha_asignacion")
    list_filter = ("id_rol",)
    autocomplete_fields = ("id_persona", "id_rol")


# ============================
#           CURSOS
# ============================

@admin.register(Curso)
class CursoAdmin(TimeStampedReadOnly):
    list_display = ("id_curso", "nombre", "nivel", "anio", "id_colegio", "id_profesor_jefe")
    list_filter = ("nivel", "anio", "id_colegio")
    search_fields = ("nombre",)


# ============================
#          MATRÍCULAS
# ============================

@admin.register(Matricula)
class MatriculaAdmin(TimeStampedReadOnly):
    list_display = ("id_matricula", "id_persona", "id_curso", "anio", "id_estado_matricula")
    list_filter = ("anio", "id_estado_matricula")
    autocomplete_fields = ("id_persona", "id_curso", "id_estado_matricula")


# ============================
#       USUARIO PERSONA
# ============================

@admin.register(UsuarioPersona)
class UsuarioPersonaAdmin(TimeStampedReadOnly):
    list_display = ("id_usuario_persona", "user", "persona")
    autocomplete_fields = ("user", "persona")
