"""
URL configuration for backend project.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Incluimos TODAS las rutas de la app convivencia_escolar
    path('', include('convivencia_escolar.urls')),
]
