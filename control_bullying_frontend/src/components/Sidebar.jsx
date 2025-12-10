"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// HeroIcons – Outline
import {
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      title: "Mantenedores",
      items: [
        { name: "Personas", path: "/personas", icon: UsersIcon },
        { name: "Colegios", path: "/colegios", icon: BuildingOfficeIcon },
        { name: "Cursos", path: "/cursos", icon: BookOpenIcon },
        { name: "Roles", path: "/roles", icon: PuzzlePieceIcon },
        {
          name: "Relaciones Persona",
          path: "/relaciones-persona",
          icon: UserGroupIcon,
        },
        {
          name: "Matrículas",
          path: "/matriculas",
          icon: ClipboardDocumentListIcon,
        },
      ],
    },
    {
      title: "Convivencia Escolar",
      items: [
        {
          name: "Casos de Bullying",
          path: "/bullying",
          icon: ExclamationTriangleIcon,
        },
        {
          name: "Intervenciones",
          path: "/intervenciones",
          icon: ClipboardDocumentListIcon,
        },
      ],
    },
    {
      title: "Herramientas",
      items: [
        {
          name: "Tester de Integridad",
          path: "/tester-integridad",
          icon: WrenchScrewdriverIcon,
        },
      ],
    },
    {
      title: "Administración",
      items: [
        {
          name: "Gestión de Usuarios",
          path: "/usuarios",
          icon: Cog6ToothIcon,
        },
      ],
    },
  ];

  return (
    <aside className="sidebar">
      {/* DASHBOARD */}
      <Link
        href="/dashboard"
        className={
          "sidebar-item " +
          (pathname.startsWith("/dashboard") ? "active" : "")
        }
      >
        <HomeIcon className="sidebar-icon" />
        <span>Dashboard</span>
      </Link>

      {/* SECCIONES */}
      {menu.map((section, index) => (
        <div key={index}>
          <div className="sidebar-section-title">{section.title}</div>

          {section.items.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={
                "sidebar-item " + (pathname.startsWith(item.path) ? "active" : "")
              }
            >
              <item.icon className="sidebar-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
