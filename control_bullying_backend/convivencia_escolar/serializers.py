from rest_framework import serializers
from .models import (
    Colegio, Persona, Curso, Matricula,
    CatCategoriaRol, CatJornada, CatEstadoMatricula,
    RolPersona, PersonaRol, PersonaRelacion,
    UsuarioPersona
)
from django.contrib.auth.models import User


def build_full_lastname(persona):
    if persona.apellido_paterno and persona.apellido_materno:
        return f"{persona.apellido_paterno} {persona.apellido_materno}"
    if persona.apellido_paterno:
        return persona.apellido_paterno
    if persona.apellido_materno:
        return persona.apellido_materno
    return persona.apellidos or ""


class ColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colegio
        fields = '__all__'


class PersonaSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = '__all__'

    def get_nombre_completo(self, obj):
        ap = build_full_lastname(obj)
        return f"{obj.nombres} {ap}".strip()


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = '__all__'


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


class RolPersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPersona
        fields = '__all__'


class PersonaRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaRol
        fields = '__all__'


class PersonaRelacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaRelacion
        fields = '__all__'


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

    def _get_colegio_id(self):
        colegio_id = None

        if isinstance(self.context, dict):
            colegio_id = self.context.get("id_colegio")

        if not colegio_id:
            req = self.context.get("request") if isinstance(self.context, dict) else None
            if req:
                colegio_id = req.query_params.get("id_colegio") or req.query_params.get("colegio")

        return str(colegio_id) if colegio_id is not None else None

    def get_total_personas(self, obj):
        colegio_id = self._get_colegio_id()
        if not colegio_id:
            return 0

        return PersonaRol.objects.filter(
            id_rol=obj.id_rol,
            id_persona__id_colegio=colegio_id
        ).count()

    def get_personas(self, obj):
        colegio_id = self._get_colegio_id()
        if not colegio_id:
            return []

        queryset = Persona.objects.filter(
            id_colegio=colegio_id,
            roles_asignados__id_rol=obj.id_rol
        ).order_by(
            "rut",
            "apellido_paterno",
            "apellido_materno",
            "nombres",
        )

        return PersonaInRolSerializer(queryset, many=True).data
