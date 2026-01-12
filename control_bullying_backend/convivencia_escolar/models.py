from django.db import models
from django.contrib.auth.models import User


class Colegio(models.Model):
    id_colegio = models.AutoField(primary_key=True)
    rbd = models.CharField(max_length=10, unique=True)
    nombre = models.CharField(max_length=150)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    comuna = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=100, blank=True, null=True)
    dependencia = models.CharField(max_length=30, blank=True, null=True)
    sostenedor = models.CharField(max_length=120, blank=True, null=True)
    email_contacto = models.CharField(max_length=150, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'colegio'

    def __str__(self):
        return f"{self.nombre} (RBD {self.rbd})"


class CatCategoriaRol(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cat_categoria_rol'

    def __str__(self):
        return self.nombre


class CatJornada(models.Model):
    id_jornada = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cat_jornada'

    def __str__(self):
        return self.nombre


class CatEstadoMatricula(models.Model):
    id_estado_matricula = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cat_estado_matricula'

    def __str__(self):
        return self.nombre


class Persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
    id_colegio = models.ForeignKey(
        Colegio,
        on_delete=models.PROTECT,
        db_column='id_colegio',
        related_name='personas',
    )
    rut = models.CharField(max_length=15, unique=True, blank=True, null=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    apellido_paterno = models.CharField(max_length=60, blank=True, null=True)
    apellido_materno = models.CharField(max_length=60, blank=True, null=True)
    correo = models.CharField(max_length=120, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    email_alt = models.CharField(max_length=150, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    consentimiento_datos = models.BooleanField()
    fecha_consentimiento = models.DateField(blank=True, null=True)
    fecha_alta = models.DateField(blank=True, null=True)
    activo = models.BooleanField()
    fecha_baja = models.DateField(blank=True, null=True)
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'persona'

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class RolPersona(models.Model):
    id_rol = models.AutoField(primary_key=True)
    id_categoria = models.ForeignKey(
        CatCategoriaRol,
        on_delete=models.PROTECT,
        db_column='id_categoria',
        related_name='roles',
    )
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rol_persona'

    def __str__(self):
        return self.nombre


class PersonaRol(models.Model):
    id_persona_rol = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_persona',
        related_name='roles_asignados',
    )
    id_rol = models.ForeignKey(
        RolPersona,
        on_delete=models.PROTECT,
        db_column='id_rol',
        related_name='personas_asignadas',
    )
    fecha_asignacion = models.DateField()
    fecha_fin = models.DateField(blank=True, null=True)
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persona_rol'

    def __str__(self):
        return f"{self.id_persona} - {self.id_rol}"


class Curso(models.Model):
    id_curso = models.AutoField(primary_key=True)
    id_colegio = models.ForeignKey(
        Colegio,
        on_delete=models.PROTECT,
        db_column='id_colegio',
        related_name='cursos',
    )
    nombre = models.CharField(max_length=50)
    nivel = models.CharField(max_length=20)
    anio = models.IntegerField()
    id_jornada = models.ForeignKey(
        CatJornada,
        on_delete=models.PROTECT,
        db_column='id_jornada',
        related_name='cursos',
    )
    id_profesor_jefe = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_profesor_jefe',
        related_name='cursos_jefe',
    )
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'curso'

    def __str__(self):
        return f"{self.nombre} ({self.anio})"


class Matricula(models.Model):
    id_matricula = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_persona',
        related_name='matriculas',
    )
    id_curso = models.ForeignKey(
        Curso,
        on_delete=models.PROTECT,
        db_column='id_curso',
        related_name='matriculas',
    )
    anio = models.IntegerField()
    id_estado_matricula = models.ForeignKey(
        CatEstadoMatricula,
        on_delete=models.PROTECT,
        db_column='id_estado_matricula',
        related_name='matriculas',
    )
    activo = models.BooleanField()
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'matricula'

    def __str__(self):
        return f"{self.id_persona} - {self.id_curso} ({self.anio})"
    

class PersonaRelacion(models.Model):
    id_persona_relacion = models.AutoField(primary_key=True)

    id_persona = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_persona',
        related_name='relaciones',
    )

    id_tipo_relacion = models.IntegerField(db_column='id_tipo_relacion')

    id_persona_rel = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_persona_rel',
        related_name='relaciones_inversas',
    )

    prioridad_contacto = models.IntegerField()
    observaciones = models.CharField(max_length=255, blank=True, null=True)
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persona_relacion'

    def __str__(self):
        return f"{self.id_persona_id} → {self.id_persona_rel_id} (tipo={self.id_tipo_relacion})"


class UsuarioPersona(models.Model):
    id_usuario_persona = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        db_column='user_id',
        related_name='perfil_persona',
    )
    persona = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_persona',
        related_name='usuarios_django',
    )
    fecha_creacion = models.DateTimeField()
    fecha_actualizacion = models.DateTimeField()
    fecha_baja = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario_persona'

    def __str__(self):
        return f"{self.user.username} ↔ {self.persona}"


# ✅ NUEVO: tabla de asignación multi-colegio/rol
class PersonaColegioRol(models.Model):
    id = models.AutoField(primary_key=True)

    id_persona = models.ForeignKey(
        Persona,
        on_delete=models.PROTECT,
        db_column='id_persona',
        related_name='colegios_roles',
    )

    id_colegio = models.ForeignKey(
        Colegio,
        on_delete=models.PROTECT,
        db_column='id_colegio',
        related_name='personas_roles',
    )

    id_rol = models.ForeignKey(
        RolPersona,
        on_delete=models.PROTECT,
        db_column='id_rol',
        related_name='personas_colegios',
    )

    activo = models.BooleanField()
    fecha_asignacion = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'persona_colegio_rol'

    def __str__(self):
        return f"Persona {self.id_persona_id} - Colegio {self.id_colegio_id} - Rol {self.id_rol_id}"
