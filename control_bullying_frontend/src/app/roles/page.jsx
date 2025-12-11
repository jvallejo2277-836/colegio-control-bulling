"use client";

import { useEffect, useState } from "react";
import {
  UsersIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/roles/full/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("API ROLES FULL →", data);
        setRoles(data);
      } catch (err) {
        console.error("Error cargando roles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const toggle = (id) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <h1 className="page-title">Roles del Sistema</h1>

      {loading ? (
        <p>Cargando…</p>
      ) : (
        roles.map((rol) => (
          <div key={rol.id_rol} className="card">
            <div className="card-header" onClick={() => toggle(rol.id_rol)}>
              <div className="card-title">
                <UsersIcon className="icon-md" />
                <strong>{rol.nombre}</strong>
              </div>

              <div className="card-subtitle">
                Categoría: <span>{rol.categoria}</span>
              </div>

              <div className="card-badge">
                {rol.total_personas} personas
              </div>

              {expandido[rol.id_rol] ? (
                <ChevronUpIcon className="icon-sm" />
              ) : (
                <ChevronDownIcon className="icon-sm" />
              )}
            </div>

            {expandido[rol.id_rol] && (
              <div className="card-body">
                {rol.personas.length === 0 ? (
                  <p className="empty">No hay personas asociadas.</p>
                ) : (
                  <ul className="person-list">
                    {rol.personas.map((p) => (
                      <li key={p.id_persona} className="person-item">
                        <div>
                          <strong>
                            {p.nombre_completo}
                          </strong>
                          <br />
                          Colegio: {p.colegio_nombre}
                        </div>

                        <div className="person-small">
                          <span>Correo: {p.correo || "—"}</span>
                          <span>Tel: {p.telefono || "—"}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
