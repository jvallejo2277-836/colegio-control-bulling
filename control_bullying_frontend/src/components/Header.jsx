"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, logout } from "@/utils/auth";

export default function Header() {
  const router = useRouter();

  const [nombre, setNombre] = useState("Usuario");
  const [rol, setRol] = useState("Sin rol");
  const [colegio, setColegio] = useState("");

  useEffect(() => {
    const u = getUser();

    if (!u) return;

    const nombreCompleto =
      [u.nombres, u.apellido_paterno, u.apellido_materno]
        .filter(Boolean)
        .join(" ") ||
      u.username ||
      "Usuario";

    setNombre(nombreCompleto);
    setRol((u.roles && u.roles[0]) || "Sin rol");
    setColegio(u.colegio_nombre || "");
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    setTimeout(() => {
      window.location.href = "/login";
    }, 50);
  };

  const handleChangeSchool = () => {
    // Cambiar colegio = cerrar sesión (regla comercial)
    handleLogout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/dashboard">
          <span className="system-title">Sistema de Convivencia Escolar</span>
        </Link>
      </div>

      <div
        className="header-right"
        style={{ display: "flex", gap: 16, alignItems: "center" }}
      >
        <div style={{ textAlign: "right", lineHeight: 1.2 }}>
          <div style={{ fontWeight: 700 }}>{nombre}</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {rol}
            {colegio ? ` · ${colegio}` : ""}
          </div>
        </div>

        <button
          onClick={handleChangeSchool}
          style={{
            padding: "6px 10px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          Cambiar colegio
        </button>

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
