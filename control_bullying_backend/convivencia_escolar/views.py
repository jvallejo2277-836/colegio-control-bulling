from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import (
    Colegio, Persona, Curso, Matricula,
    CatCategoriaRol, CatJornada, CatEstadoMatricula,
    RolPersona, PersonaRol, PersonaRelacion,
    UsuarioPersona
)

from .serializers import (
    ColegioSerializer, PersonaSerializer, CursoSerializer, MatriculaSerializer,
    RolPersonaSerializer, RolPersonaFullSerializer,
    PersonaRolSerializer, PersonaRelacionSerializer,
    UsuarioPersonaSerializer
)


class ColegioViewSet(viewsets.ModelViewSet):
    queryset = Colegio.objects.all()
    serializer_class = ColegioSerializer


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

    def get_queryset(self):
        qs = Persona.objects.all()

        colegio_id = self.request.query_params.get("colegio")
        if colegio_id:
            qs = qs.filter(id_colegio=colegio_id)

        return qs


class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all()
    serializer_class = MatriculaSerializer


class RolPersonaViewSet(viewsets.ModelViewSet):
    queryset = RolPersona.objects.all()
    serializer_class = RolPersonaSerializer

    # -----------------------------
    # ENDPOINT PERSONALIZADO: /api/roles/full/
    # -----------------------------
    @action(detail=False, methods=['get'], url_path='full')
    def get_full(self, request):
        """
        Retorna los roles con todos los datos expandidos
        (incluye categoría de rol y permite uso en tablas avanzadas del frontend).
        """
        roles = self.get_queryset()
        serializer = RolPersonaFullSerializer(roles, many=True)
        return Response(serializer.data)


class PersonaRolViewSet(viewsets.ModelViewSet):
    queryset = PersonaRol.objects.all()
    serializer_class = PersonaRolSerializer


class PersonaRelacionViewSet(viewsets.ModelViewSet):
    queryset = PersonaRelacion.objects.all()
    serializer_class = PersonaRelacionSerializer


class UsuarioPersonaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioPersona.objects.all()
    serializer_class = UsuarioPersonaSerializer
