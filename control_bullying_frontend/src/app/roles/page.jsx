"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function RolesPage() {
  const router = useRouter();

  const [roles, setRoles] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("access") : null);
  const getActiveSchoolId = () =>
    typeof window !== "undefined" ? localStorage.getItem("activeSchoolId") : null;

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError("");

      try {
        const token = getToken();
        const activeSchoolId = getActiveSchoolId();

        if (!token) {
          setError("No hay sesión activa. Vuelve al login.");
          setLoading(false);
          router.push("/login");
          return;
        }

        if (!activeSchoolId) {
          setError("No hay colegio activo seleccionado. Vuelve al login y selecciona un colegio.");
          setLoading(false);
          return;
        }

        const url = `http://127.0.0.1:8000/api/roles/full/?id_colegio=${activeSchoolId}`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Error al cargar roles");

        const data = await res.json();
        setRoles(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los roles.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [router]);

  const toggle = (id) => setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeSchoolId = getActiveSchoolId();

  return (
    <div>
      <h1 className="page-title">Roles del Sistema</h1>

      <div style={{ marginBottom: 10, color: "#555", fontSize: 13 }}>
        Colegio activo ID: {activeSchoolId || "-"}
      </div>

      {loading ? (
        <p>Cargando…</p>
      ) : error ? (
        <div className="card" style={{ padding: 16 }}>
          <p style={{ color: "#b00020", marginBottom: 10 }}>{error}</p>

          {!activeSchoolId ? (
            <button className="btn-primary" onClick={() => router.push("/login")}>
              Ir a Login / Seleccionar colegio
            </button>
          ) : (
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          )}
        </div>
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

              <div className="card-badge">{rol.total_personas} personas</div>

              {expandido[rol.id_rol] ? (
                <ChevronUpIcon className="icon-sm" />
              ) : (
                <ChevronDownIcon className="icon-sm" />
              )}
            </div>

            {expandido[rol.id_rol] && (
              <div className="card-body">
                {rol.personas?.length === 0 ? (
                  <p>No hay personas asociadas.</p>
                ) : (
                  <ul className="person-list">
                    {rol.personas.map((p) => (
                      <li key={p.id_persona}>
                        <strong>{p.nombre_completo}</strong>
                        <br />
                        Colegio: {p.colegio_nombre}
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
