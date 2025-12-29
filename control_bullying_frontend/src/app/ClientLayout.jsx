"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated, getActiveSchoolId } from "@/utils/auth";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Rutas que NO requieren layout ni colegio activo
  const sinLayout =
    pathname.startsWith("/login") ||
    pathname.startsWith("/select-colegio");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1) Rutas públicas (login / selección)
    if (sinLayout) {
      setReady(true);
      return;
    }

    // 2) Debe estar autenticado
    const ok = isAuthenticated();
    if (!ok) {
      router.push("/login");
      return;
    }

    // 3) Debe tener colegio activo (regla comercial)
    const activeSchoolId = getActiveSchoolId();
    if (!activeSchoolId) {
      // forzamos volver al login (donde se elige colegio)
      router.push("/login");
      return;
    }

    setReady(true);
  }, [pathname, router, sinLayout]);

  if (!ready) return null;

  return sinLayout ? (
    children
  ) : (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
