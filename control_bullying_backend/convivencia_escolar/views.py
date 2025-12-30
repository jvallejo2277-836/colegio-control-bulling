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
        colegio_id = self.request.query_params.get("id_colegio") or self.request.query_params.get("colegio")
        if not colegio_id:
            return qs.none()
        return qs.filter(id_colegio=colegio_id)


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
        Retorna los roles con todos los datos expandidos,
        filtrando las personas por id_colegio si se entrega.
        """
        colegio_id = request.query_params.get("id_colegio") or request.query_params.get("colegio")

        roles = self.get_queryset()
        serializer = RolPersonaFullSerializer(
            roles,
            many=True,
            context={"request": request, "id_colegio": colegio_id}
        )
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
