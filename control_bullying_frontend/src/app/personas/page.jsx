"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function PersonasPage() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const fetchPersonas = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/api/personas/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener personas");

      const data = await res.json();

      const personasFormateadas = data.map((p) => ({
        ...p,
        nombre_completo:
          `${p.nombres} ${p.apellido_paterno || ""} ${p.apellido_materno || ""}`.trim(),
      }));

      setPersonas(personasFormateadas);
    } catch (err) {
      setError("No se pudieron cargar las personas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  return (
    <div>
      {/* Encabezado */}
      <div className="page-header">
        <h1 className="page-title">Personas</h1>

        <button
          className="btn-primary create-btn"
          onClick={() => setOpenModal(true)}
        >
          <PlusIcon className="icon-btn" />
          Crear Persona
        </button>
      </div>

      {/* Tabla */}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
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
                  <td>{p.id_colegio}</td>
                  <td>
                    <span className="tag-active">Sí</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Crear Persona */}
      {openModal && (
        <CrearPersonaModal
          onClose={() => setOpenModal(false)}
          refresh={fetchPersonas}
        />
      )}
    </div>
  );
}

/* Modal para crear personas */
function CrearPersonaModal({ onClose, refresh }) {
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);

  const crearPersona = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/api/personas/", {
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
          id_colegio: 1,
          consentimiento_datos: false,
          activo: true,
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Error al crear persona");

      await refresh();
      onClose();
    } catch (err) {
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
          <input
            className="input"
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />

          <input
            className="input"
            placeholder="Apellido paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />

          <input
            className="input"
            placeholder="Apellido materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />

          <input
            className="input"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-primary"
            onClick={crearPersona}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
