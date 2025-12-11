"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();

  // Cargar usuario desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // 👉 Logout seguro y sin interferencias
  const handleLogout = () => {
    console.log("CERRANDO SESIÓN…");

    // 1. Eliminar tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // 2. Cerrar menú inmediatamente
    setIsOpen(false);

    // 3. Redirigir sin esperar re-render
    setTimeout(() => {
      router.push("/login");
    }, 50);
  };

  // Click fuera del menú
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón del menú */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}  // 🔥 FIX: toggle real
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded"
      >
        <span>{user ? user.username : "Usuario"}</span>
        <span>▾</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-2 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 py-1 text-xs uppercase text-gray-500">
            Usuario
          </div>

          <div className="px-3 py-2 font-medium">
            {user ? user.username : "Sin usuario"}
          </div>

          <hr className="my-2" />

          {/* 🔥 BOTÓN DE LOGOUT 100% FUNCIONAL */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-red-600 font-semibold hover:bg-red-100 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
