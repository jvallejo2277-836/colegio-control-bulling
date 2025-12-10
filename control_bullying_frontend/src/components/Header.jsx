"use client";

import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">🎓</span>
        <span className="system-name">Sistema de Convivencia Escolar</span>
      </div>
      <UserMenu />
    </header>
  );
}
