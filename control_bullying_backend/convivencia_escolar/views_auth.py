from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import UsuarioPersona, Colegio, PersonaColegioRol, RolPersona


# -------------------------------------------------
# LOGIN (colegio se selecciona en el login)
# Body esperado:
# {
#   "username": "...",
#   "password": "...",
#   "id_colegio": 2   (opcional; requerido si tiene >1 colegio)
# }
# -------------------------------------------------
@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    requested_school_id = request.data.get("id_colegio")  # puede venir None

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

    # Defaults
    schools = []
    roles_by_school = {}
    active_school_id = None
    roles_list = []

    # Buscar persona asociada a Django User
    try:
        up = UsuarioPersona.objects.get(user=user)
        persona = up.persona

        # Colegios permitidos por persona_colegio_rol
        pcr_qs = PersonaColegioRol.objects.filter(id_persona=persona, activo=1)

        colegio_ids = pcr_qs.values_list("id_colegio__id_colegio", flat=True).distinct()
        colegios = (
            Colegio.objects.filter(id_colegio__in=colegio_ids, activo=1)
            .order_by("id_colegio")
        )
        schools = [{"id": c.id_colegio, "nombre": c.nombre} for c in colegios]

        # Armar roles por colegio (para que el frontend muestre rol correcto al elegir)
        for s in schools:
            sid = s["id"]
            rol_ids = (
                PersonaColegioRol.objects
                .filter(id_persona=persona, id_colegio_id=sid, activo=1)
                .values_list("id_rol_id", flat=True)
                .distinct()
            )
            roles = list(
                RolPersona.objects
                .filter(id_rol__in=rol_ids, activo=1)
                .values_list("nombre", flat=True)
            )
            roles_by_school[str(sid)] = roles

        # Determinar colegio activo según lo que venga en el login
        if requested_school_id is not None:
            # normalizar a int si viene string
            try:
                requested_school_id = int(requested_school_id)
            except (TypeError, ValueError):
                return Response(
                    {"detail": "id_colegio inválido"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # validar que esté permitido
            allowed_ids = {s["id"] for s in schools}
            if requested_school_id not in allowed_ids:
                return Response(
                    {
                        "detail": "El usuario no tiene acceso a ese colegio",
                        "schools": schools,
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

            active_school_id = requested_school_id

        else:
            # Si tiene más de 1 colegio, obligamos selección en login
            if len(schools) > 1:
                return Response(
                    {
                        "requires_school_selection": True,
                        "schools": schools,
                        "rolesBySchool": roles_by_school,
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email or "",
                            "id_persona": persona.id_persona,
                            "nombres": persona.nombres,
                            "apellido_paterno": persona.apellido_paterno,
                            "apellido_materno": persona.apellido_materno,
                        }
                    },
                    status=status.HTTP_200_OK
                )

            # Si tiene 0 o 1 colegio, dejamos activo el único (si existe)
            if len(schools) == 1:
                active_school_id = schools[0]["id"]
            else:
                active_school_id = None

        # roles del colegio activo
        if active_school_id is not None:
            roles_list = roles_by_school.get(str(active_school_id), [])

        colegio_nombre = None
        if active_school_id is not None:
            col = next((s for s in schools if s["id"] == active_school_id), None)
            colegio_nombre = col["nombre"] if col else None

        # Emitir JWT SOLO cuando ya hay colegio activo definido (o cuando no hay ninguno permitido)
        refresh = RefreshToken.for_user(user)

        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email or "",

            "id_persona": persona.id_persona,
            "id_colegio": active_school_id,
            "colegio_nombre": colegio_nombre,
            "roles": roles_list,

            "nombres": persona.nombres,
            "apellido_paterno": persona.apellido_paterno,
            "apellido_materno": persona.apellido_materno,
        }

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": user_data,

                # para UI
                "schools": schools,
                "activeSchoolId": active_school_id,
                "roles": roles_list,
                "rolesBySchool": roles_by_school,
            },
            status=status.HTTP_200_OK
        )

    except UsuarioPersona.DoesNotExist:
        # Si no hay persona, igual emitimos token pero sin contexto
        refresh = RefreshToken.for_user(user)

        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email or "",
            "id_persona": None,
            "id_colegio": None,
            "colegio_nombre": None,
            "roles": [],
            "nombres": user.username,
            "apellido_paterno": "",
            "apellido_materno": "",
        }

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": user_data,
                "schools": [],
                "activeSchoolId": None,
                "roles": [],
                "rolesBySchool": {},
            },
            status=status.HTTP_200_OK
        )


# -------------------------------------------------
# /api/profile/ (opcional, mantiene tu idea de "permitidos")
# -------------------------------------------------
class ProfileDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        up = UsuarioPersona.objects.filter(user=user).first()

        colegios_disponibles = []
        colegio_activo = None

        if up:
            persona = up.persona

            pcr_qs = PersonaColegioRol.objects.filter(id_persona=persona, activo=1)
            colegio_ids = pcr_qs.values_list("id_colegio__id_colegio", flat=True).distinct()

            colegios_disponibles = list(
                Colegio.objects
                .filter(id_colegio__in=colegio_ids, activo=1)
                .values("id_colegio", "nombre")
            )

        return Response(
            {
                "username": user.username,
                "id_colegio_activo": colegio_activo,
                "colegios_disponibles": colegios_disponibles,
            }
        )
