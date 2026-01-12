"use client";

import { useEffect, useState } from "react";
import { getToken, getActiveSchoolId } from "@/utils/auth";

export default function RelacionesPersonaPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    const activeSchoolId = getActiveSchoolId();

    if (!token) {
      setError("Usuario no autenticado.");
      setLoading(false);
      return;
    }

    if (!activeSchoolId) {
      setError("No hay colegio activo.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/persona-relacion/?id_colegio=${activeSchoolId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error backend (${res.status})`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Relaciones Persona</h1>
      <p>
        Gestión de relaciones entre personas (alumno, apoderado, docente, etc.)
      </p>

      {loading && <p>Cargando relaciones...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>No hay relaciones registradas para este colegio.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Persona</th>
              <th style={th}>Tipo relación</th>
              <th style={th}>Persona relacionada</th>
              <th style={th}>Prioridad</th>
              <th style={th}>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id_persona_relacion}>
                <td style={td}>{row.persona_nombre}</td>
                <td style={td}>{row.tipo_relacion_nombre}</td>
                <td style={td}>{row.persona_rel_nombre}</td>
                <td style={td}>{row.prioridad_contacto}</td>
                <td style={td}>{row.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: "0.5rem",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "0.5rem",
};
