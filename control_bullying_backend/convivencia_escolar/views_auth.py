from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UsuarioPersona, PersonaRol

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)

    # Buscar persona asociada a Django User
    try:
        up = UsuarioPersona.objects.get(user=user)
        persona = up.persona
        colegio = persona.id_colegio

        # Obtener roles
        roles = PersonaRol.objects.filter(id_persona=persona).select_related("id_rol")
        roles_list = [r.id_rol.nombre for r in roles]

        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "id_persona": persona.id_persona,
            "id_colegio": colegio.id_colegio,
            "colegio_nombre": colegio.nombre,
            "roles": roles_list,
            "nombres": persona.nombres,
            "apellido_paterno": persona.apellido_paterno,
            "apellido_materno": persona.apellido_materno,
        }

    except UsuarioPersona.DoesNotExist:
        # Caso extremo, pero mantenemos estructura
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "id_persona": None,
            "id_colegio": None,
            "colegio_nombre": None,
            "roles": [],
            "nombres": user.username,
            "apellido_paterno": "",
            "apellido_materno": "",
        }

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": user_data,
    })
