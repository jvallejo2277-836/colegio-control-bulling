from rest_framework import serializers
from .models import (
    Colegio, Persona, Curso, Matricula,
    CatCategoriaRol, CatJornada, CatEstadoMatricula,
    RolPersona, PersonaRol, PersonaRelacion,
    UsuarioPersona
)
from django.contrib.auth.models import User
# -----------------------------
# COLEGIO
# -----------------------------
class ColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegio
        fields = '__all__'
# -----------------------------
# PERSONA
# -----------------------------
class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'


# -----------------------------
# CURSO
# -----------------------------
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


# -----------------------------
# MATRÍCULA
# -----------------------------
class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'


# -----------------------------
# CATÁLOGOS
# -----------------------------
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


# -----------------------------
# ROL PERSONA
# -----------------------------
class RolPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPersona
        fields = '__all__'


# -----------------------------
# ASIGNACIÓN DE ROLES
# -----------------------------
class PersonaRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaRol
        fields = '__all__'


# -----------------------------
# RELACIONES ENTRE PERSONAS
# -----------------------------
class PersonaRelacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaRelacion
        fields = '__all__'


# -----------------------------
# USUARIOS DJANGO ↔ PERSONA
# -----------------------------
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_active']


class UsuarioPersonaSerializer(serializers.ModelSerializer):
    user = UsuarioSerializer(read_only=True)

    class Meta:
        model = UsuarioPersona
        fields = '__all__'


class PersonaInRolSerializer(serializers.ModelSerializer):
    colegio_nombre = serializers.CharField(source="id_colegio.nombre", read_only=True)

    class Meta:
        model = Persona
        fields = [
            "id_persona",
            "rut",
            "nombres",
            "apellidos",
            "correo",
            "telefono",
            "colegio_nombre",
            "activo",
        ]


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
            "apellidos",
            "nombres",
        )
        return PersonaInRolSerializer(queryset, many=True).data
