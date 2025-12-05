@echo off
echo === Activando entorno virtual (venv) ===
cd /d "%~dp0"
if exist "venv\Scripts\Activate.ps1" (
    powershell -ExecutionPolicy Bypass -NoExit -Command "& { .\venv\Scripts\Activate.ps1 }"
) else (
    echo No se encontró la carpeta venv. Asegúrate de estar en la ruta correcta.
)
