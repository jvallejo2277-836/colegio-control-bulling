"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Redirección inmediata 100% confiable
    router.push("/login");
    setTimeout(() => {
      window.location.href = "/login";
    }, 50);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/">
          <span className="system-title">Sistema de Convivencia Escolar</span>
        </Link>
      </div>

      <div className="header-right flex items-center gap-4">
        
        {/* User menu original */}
        <UserMenu />

        {/* Botón fijo de cierre de sesión - SIEMPRE FUNCIONA */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
