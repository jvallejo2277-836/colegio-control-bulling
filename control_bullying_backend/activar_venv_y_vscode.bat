@echo off
echo === Activando entorno virtual y abriendo VS Code ===
cd /d "%~dp0"

REM Verifica si existe el entorno virtual
if not exist "venv\Scripts\Activate.ps1" (
    echo No se encontro la carpeta venv.
    echo Asegurate de estar en el directorio del proyecto correcto.
    pause
    exit /b
)

REM Abre PowerShell, activa el entorno y lanza VS Code
powershell -ExecutionPolicy Bypass -NoExit -Command ^
    "& { .\venv\Scripts\Activate.ps1; code . }"
