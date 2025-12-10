"use client";

import { Inter } from "@next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const sinLayout = pathname.startsWith("/login");

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
