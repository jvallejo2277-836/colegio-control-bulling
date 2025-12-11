"use client";

import { Inter } from "@next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const sinLayout = pathname.startsWith("/login");

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      if (sinLayout) {
        setReady(true);
        return;
      }

      const ok = await isAuthenticated();

      if (!ok) {
        router.push("/login");
        return;
      }
      setReady(true);
    }

    checkAuth();
  }, [pathname]);

  // Evita mostrar pantalla en blanco mientras valida
  if (!ready) return null;

  return (
    <html lang="es">
      <body className={inter.className + " app-body"}>
        {sinLayout ? (
          children
        ) : (
          <div className="layout-container">
            <Sidebar />
            <div className="main-content">
              <Header />
              <div className="page-content">{children}</div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
