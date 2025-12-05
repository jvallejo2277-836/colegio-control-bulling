@echo off
echo === Activando entorno virtual y levantando el servidor Django ===
cd /d "%~dp0"

REM Verifica si existe el entorno virtual
if not exist "venv\Scripts\Activate.ps1" (
    echo No se encontro la carpeta venv.
    echo Asegurate de estar en el directorio correcto.
    pause
    exit /b
)

REM Abre PowerShell, activa el entorno y ejecuta runserver
powershell -ExecutionPolicy Bypass -NoExit -Command ^
    "& { .\venv\Scripts\Activate.ps1; echo === Servidor en http://127.0.0.1:8000 ===; python manage.py runserver }"
