from rest_framework import serializers
from .models import (
    Colegio, Persona, Curso, Matricula,
    CatCategoriaRol, CatJornada, CatEstadoMatricula,
    RolPersona, PersonaRol, PersonaRelacion,
    UsuarioPersona
)
from django.contrib.auth.models import User

# ============================================================
# UTILIDAD — Combina automáticamente los dos apellidos
# ============================================================

def build_full_lastname(persona):
    """
    Retorna apellido paterno + apellido materno
    o el campo antiguo 'apellidos' si ambos vienen vacíos.
    """
    if persona.apellido_paterno and persona.apellido_materno:
        return f"{persona.apellido_paterno} {persona.apellido_materno}"
    if persona.apellido_paterno:
        return persona.apellido_paterno
    if persona.apellido_materno:
        return persona.apellido_materno
    return persona.apellidos or ""


# ============================================================
# COLEGIO
# ============================================================

class ColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegio
        fields = '__all__'


# ============================================================
# PERSONA
# ============================================================

class PersonaSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = '__all__'

    def get_nombre_completo(self, obj):
        ap = build_full_lastname(obj)
        return f"{obj.nombres} {ap}".strip()


# ============================================================
# CURSO
# ============================================================

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


# ============================================================
# MATRÍCULA
# ============================================================

class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'


# ============================================================
# CATÁLOGOS
# ============================================================

class CatCategoriaRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatCategoriaRol
        fields = '__all__'


class CatJornadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatJornada
        fields = '__all__'


class CatEstadoMatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatEstadoMatricula
        fields = '__all__'


# ============================================================
# ROL PERSONA
# ============================================================

class RolPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPersona
        fields = '__all__'


# ============================================================
# ASIGNACIÓN DE ROLES
# ============================================================

class PersonaRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaRol
        fields = '__all__'


# ============================================================
# RELACIONES ENTRE PERSONAS
# ============================================================

class PersonaRelacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaRelacion
        fields = '__all__'


# ============================================================
# USUARIOS DJANGO ↔ PERSONA
# ============================================================

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_active']


class UsuarioPersonaSerializer(serializers.ModelSerializer):
    user = UsuarioSerializer(read_only=True)

    class Meta:
        model = UsuarioPersona
        fields = '__all__'


# ============================================================
# PERSONA REDUCIDA PARA ROLES
# ============================================================

class PersonaInRolSerializer(serializers.ModelSerializer):
    colegio_nombre = serializers.CharField(source="id_colegio.nombre", read_only=True)
    nombre_completo = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = [
            "id_persona",
            "rut",
            "nombres",
            "apellido_paterno",
            "apellido_materno",
            "nombre_completo",
            "correo",
            "telefono",
            "colegio_nombre",
            "activo",
        ]

    def get_nombre_completo(self, obj):
        ap = build_full_lastname(obj)
        return f"{obj.nombres} {ap}".strip()


# ============================================================
# ROL PERSONA — FULL
# ============================================================

class RolPersonaFullSerializer(serializers.ModelSerializer):
    categoria = serializers.CharField(source="id_categoria.nombre", read_only=True)
    personas = serializers.SerializerMethodField()
    total_personas = serializers.SerializerMethodField()

    class Meta:
        model = RolPersona
        fields = [
            "id_rol",
            "nombre",
            "categoria",
            "descripcion",
            "activo",
            "fecha_creacion",
            "fecha_actualizacion",
            "fecha_baja",
            "total_personas",
            "personas",
        ]

    def get_total_personas(self, obj):
        return obj.personas_asignadas.count()

    def get_personas(self, obj):
        queryset = Persona.objects.filter(
            roles_asignados__id_rol=obj.id_rol
        ).order_by(
            "id_colegio",
            "rut",
            "apellido_paterno",
            "apellido_materno",
            "nombres",
        )

        return PersonaInRolSerializer(queryset, many=True).data
