from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ColegioViewSet, PersonaViewSet, CursoViewSet,
    MatriculaViewSet, RolPersonaViewSet, PersonaRolViewSet,
    PersonaRelacionViewSet, UsuarioPersonaViewSet
)

router = DefaultRouter()
router.register('colegios', ColegioViewSet)
router.register('personas', PersonaViewSet)
router.register('cursos', CursoViewSet)
router.register('matriculas', MatriculaViewSet)
router.register('roles', RolPersonaViewSet)
router.register('persona-rol', PersonaRolViewSet)
router.register('persona-relacion', PersonaRelacionViewSet)
router.register('usuarios-persona', UsuarioPersonaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
