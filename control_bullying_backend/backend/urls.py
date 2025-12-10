from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from convivencia_escolar.views import (
    ColegioViewSet,
    PersonaViewSet,
    CursoViewSet,
    MatriculaViewSet,
    RolPersonaViewSet,
    PersonaRolViewSet,
    PersonaRelacionViewSet,
    UsuarioPersonaViewSet,
)

# Router principal
router = routers.DefaultRouter()
router.register(r'colegios', ColegioViewSet)
router.register(r'personas', PersonaViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'matriculas', MatriculaViewSet)
router.register(r'roles', RolPersonaViewSet)
router.register(r'persona-rol', PersonaRolViewSet)
router.register(r'persona-relacion', PersonaRelacionViewSet)
router.register(r'usuarios-persona', UsuarioPersonaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rutas manuales (login REST)
    path('api/', include('convivencia_escolar.urls')),

    # Rutas automáticas (Viewsets)
    path('api/', include(router.urls)),
]
