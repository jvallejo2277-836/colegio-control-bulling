"use client";

import { useEffect, useState } from "react";
import { getToken, getActiveSchoolId } from "@/utils/auth";

export default function CursosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeSchoolId = getActiveSchoolId();

  useEffect(() => {
    const token = getToken();

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
        // Traemos todos y filtramos por colegio activo en frontend (read-only)
        const res = await fetch("http://127.0.0.1:8000/api/cursos/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error backend (${res.status})`);
        }

        const json = await res.json();
        const rows = Array.isArray(json) ? json : [];

        // Filtro defensivo: si el backend ya filtra, igual funciona; si no filtra, lo hacemos aquí.
        const filtered = rows.filter(
          (c) => String(c.id_colegio) === String(activeSchoolId)
        );

        setData(filtered);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSchoolId]);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Cursos</h1>
      <p>Listado de cursos (solo lectura) filtrado por colegio activo.</p>

      <p>
        <b>Colegio activo:</b> {activeSchoolId}
      </p>

      {loading && <p>Cargando cursos...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>No hay cursos para este colegio.</p>
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
              <th style={th}>ID</th>
              <th style={th}>Nombre</th>
              <th style={th}>Nivel</th>
              <th style={th}>Año</th>
              <th style={th}>Activo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.id_curso}>
                <td style={td}>{c.id_curso}</td>
                <td style={td}>{c.nombre}</td>
                <td style={td}>{c.nivel}</td>
                <td style={td}>{c.anio}</td>
                <td style={td}>{String(c.activo)}</td>
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
