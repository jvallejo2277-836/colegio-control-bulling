"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";

const API_BASE = "http://127.0.0.1:8000";

export default function PersonasPage() {
  const router = useRouter();
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("access") : null);
  const getActiveSchoolId = () =>
    typeof window !== "undefined" ? localStorage.getItem("activeSchoolId") : null;

  const fetchPersonas = async () => {
    setLoading(true);
    setError("");

    try {
      const token = getToken();
      const activeSchoolId = getActiveSchoolId();

      if (!token) {
        router.push("/login");
        return;
      }

      if (!activeSchoolId) {
        setError("No hay colegio activo seleccionado. Vuelve al login y selecciona un colegio.");
        setPersonas([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/personas/?id_colegio=${activeSchoolId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener personas");
      const data = await res.json();

      const personasFormateadas = (Array.isArray(data) ? data : []).map((p) => ({
        ...p,
        nombre_completo: `${p.nombres} ${p.apellido_paterno || ""} ${p.apellido_materno || ""}`.trim(),
      }));

      setPersonas(personasFormateadas);
    } catch (e) {
      setError("No se pudieron cargar las personas");
      setPersonas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeSchoolId = getActiveSchoolId();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Personas</h1>
          <p className="text-sm text-gray-500">
            Colegio activo ID: <span className="font-medium">{activeSchoolId || "-"}</span>
          </p>
        </div>

        <button
          className="btn-primary create-btn"
          onClick={() => setOpenModal(true)}
          disabled={!activeSchoolId}
        >
          <PlusIcon className="icon-btn" />
          Crear Persona
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <div className="card p-4">
          <p className="text-red-600 mb-3">{error}</p>
          <button className="btn-secondary" onClick={() => router.push("/login")}>
            Ir a Login / Seleccionar colegio
          </button>
        </div>
      ) : (
        <div className="card table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Colegio</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p) => (
                <tr key={p.id_persona}>
                  <td>{p.id_persona}</td>
                  <td>{p.nombre_completo}</td>
                  <td>{p.correo || "-"}</td>
                  <td>{p.id_colegio ?? "-"}</td>
                  <td>
                    <span className="tag-active">Sí</span>
                  </td>
                </tr>
              ))}
              {personas.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No hay personas para el colegio activo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {openModal && activeSchoolId && (
        <CrearPersonaModal
          onClose={() => setOpenModal(false)}
          refresh={fetchPersonas}
          activeSchoolId={activeSchoolId}
        />
      )}
    </div>
  );
}

function CrearPersonaModal({ onClose, refresh, activeSchoolId }) {
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);

  const crearPersona = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Falta token");
      if (!activeSchoolId) throw new Error("Falta colegio activo");

      const res = await fetch(`${API_BASE}/api/personas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombres,
          apellido_paterno: apellidoPaterno,
          apellido_materno: apellidoMaterno,
          correo,
          id_colegio: Number(activeSchoolId),
          consentimiento_datos: false,
          activo: true,
        }),
      });

      if (!res.ok) throw new Error("Error al crear persona");

      await refresh();
      onClose();
    } catch (e) {
      alert("Error al crear persona");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Crear Persona</h2>

        <div className="modal-body">
          <input className="input" placeholder="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} />
          <input className="input" placeholder="Apellido paterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
          <input className="input" placeholder="Apellido materno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
          <input className="input" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={crearPersona} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
