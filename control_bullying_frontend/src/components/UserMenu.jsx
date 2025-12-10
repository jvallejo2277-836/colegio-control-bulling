"use client";

import { useState } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const iniciales = "JP"; // Más adelante lo haremos dinámico

  return (
    <div className="user-menu">
      <div className="avatar" onClick={toggle}>
        {iniciales}
      </div>

      {open && (
        <div className="menu-dropdown">
          <div className="menu-title">Juan Pérez (Administrador)</div>

          <div className="menu-section-title">Administración del Sistema</div>
          <a href="#" className="menu-item">Mantenedores</a>
          <a href="#" className="menu-item">Seguridad</a>
          <a href="#" className="menu-item">Herramientas</a>

          <div className="menu-section-title">Cuenta</div>
          <a href="#" className="menu-item">Mi Perfil</a>
          <a href="/login" className="menu-item logout">Cerrar Sesión</a>
        </div>
      )}
    </div>
  );
}
