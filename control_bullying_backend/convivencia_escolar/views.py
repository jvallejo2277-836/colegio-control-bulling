from rest_framework import viewsets

from .models import (
    Colegio, Persona, Curso, Matricula,
    CatCategoriaRol, CatJornada, CatEstadoMatricula,
    RolPersona, PersonaRol, PersonaRelacion,
    UsuarioPersona
)
from .serializers import (
    ColegioSerializer, PersonaSerializer, CursoSerializer, MatriculaSerializer,
    RolPersonaSerializer, PersonaRolSerializer, PersonaRelacionSerializer,
    UsuarioPersonaSerializer
)


class ColegioViewSet(viewsets.ModelViewSet):
    queryset = Colegio.objects.all()
    serializer_class = ColegioSerializer


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer


class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


class MatriculaViewSet(viewsets.ModelViewSet):
    queryset = Matricula.objects.all()
    serializer_class = MatriculaSerializer


class RolPersonaViewSet(viewsets.ModelViewSet):
    queryset = RolPersona.objects.all()
    serializer_class = RolPersonaSerializer


class PersonaRolViewSet(viewsets.ModelViewSet):
    queryset = PersonaRol.objects.all()
    serializer_class = PersonaRolSerializer


class PersonaRelacionViewSet(viewsets.ModelViewSet):
    queryset = PersonaRelacion.objects.all()
    serializer_class = PersonaRelacionSerializer


class UsuarioPersonaViewSet(viewsets.ModelViewSet):
    queryset = UsuarioPersona.objects.all()
    serializer_class = UsuarioPersonaSerializer
