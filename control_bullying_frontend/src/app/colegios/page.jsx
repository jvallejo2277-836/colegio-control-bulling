"use client";

import { useEffect, useState } from "react";
import { getToken, getActiveSchoolId } from "@/utils/auth";

export default function ColegiosPage() {
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

    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/colegios/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error backend (${res.status})`);
        }

        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
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
      <h1>Colegios</h1>
      <p>Listado de colegios (solo lectura).</p>

      {activeSchoolId && (
        <p>
          <b>Colegio activo:</b> {activeSchoolId}
        </p>
      )}

      {loading && <p>Cargando colegios...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>No hay colegios para mostrar.</p>
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
              <th style={th}>RBD</th>
              <th style={th}>Nombre</th>
              <th style={th}>Comuna</th>
              <th style={th}>Región</th>
              <th style={th}>Activo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => {
              const isActive =
                String(c.id_colegio) === String(activeSchoolId);

              return (
                <tr
                  key={c.id_colegio}
                  style={isActive ? { background: "#fff7d6" } : undefined}
                >
                  <td style={td}>{c.id_colegio}</td>
                  <td style={td}>{c.rbd}</td>
                  <td style={td}>{c.nombre}</td>
                  <td style={td}>{c.comuna}</td>
                  <td style={td}>{c.region}</td>
                  <td style={td}>{String(c.activo)}</td>
                </tr>
              );
            })}
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
