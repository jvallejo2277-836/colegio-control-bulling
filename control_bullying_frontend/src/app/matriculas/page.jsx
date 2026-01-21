"use client";

import { useEffect, useMemo, useState } from "react";
import { getToken, getActiveSchoolId } from "@/utils/auth";

export default function MatriculasPage() {
  const [cursos, setCursos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [selectedCursoId, setSelectedCursoId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeSchoolId = getActiveSchoolId();

  const headers = useMemo(() => {
    const token = getToken();
    return token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : null;
  }, []);

  useEffect(() => {
    if (!headers) {
      setError("Usuario no autenticado.");
      setLoading(false);
      return;
    }
    if (!activeSchoolId) {
      setError("No hay colegio activo.");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1) Traer cursos
        const cursosRes = await fetch("http://127.0.0.1:8000/api/cursos/", {
          headers,
        });
        if (!cursosRes.ok) throw new Error(`Error cursos (${cursosRes.status})`);

        const cursosJson = await cursosRes.json();
        const cursosRows = Array.isArray(cursosJson) ? cursosJson : [];

        // Filtrar cursos por colegio activo (defensivo)
        const cursosDelColegio = cursosRows.filter((c) => {
          const colegioId =
            c.id_colegio?.id_colegio ??
            c.id_colegio ??
            c.colegio?.id_colegio ??
            null;
          return String(colegioId) === String(activeSchoolId);
        });

        setCursos(cursosDelColegio);

        // Si no hay curso seleccionado, elegir el primero automáticamente
        if (!selectedCursoId && cursosDelColegio.length > 0) {
          const firstId = cursosDelColegio[0].id_curso ?? "";
          setSelectedCursoId(String(firstId));
        }

        // 2) Traer matrículas
        const matsRes = await fetch("http://127.0.0.1:8000/api/matriculas/", {
          headers,
        });
        if (!matsRes.ok) throw new Error(`Error matrículas (${matsRes.status})`);

        const matsJson = await matsRes.json();
        const matsRows = Array.isArray(matsJson) ? matsJson : [];
        setMatriculas(matsRows);
      } catch (e) {
        console.error(e);
        setError(e.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSchoolId]);

  // Mapa para mostrar nombre del curso (y año/nivel si existe)
  const cursoMap = useMemo(() => {
    const m = new Map();
    cursos.forEach((c) => {
      const id = c.id_curso;
      const nombre = c.nombre ?? c.nombre_curso ?? `Curso ${id}`;
      const nivel = c.nivel ?? c.grado ?? "";
      const anio = c.anio ?? c.year ?? "";
      const label =
        [nombre, nivel && `(${nivel})`, anio && `- ${anio}`].filter(Boolean).join(" ");
      m.set(String(id), label);
    });
    return m;
  }, [cursos]);

  // Matriculas del curso seleccionado
  const matriculasFiltradas = useMemo(() => {
    if (!selectedCursoId) return [];
    return matriculas.filter((m) => {
      const cursoId =
        m.id_curso?.id_curso ?? m.id_curso ?? m.curso?.id_curso ?? null;
      return String(cursoId) === String(selectedCursoId);
    });
  }, [matriculas, selectedCursoId]);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Matrículas</h1>
      <p>
        Listado de matrículas (solo lectura). Colegio activo implícito + selector de curso.
      </p>

      <p>
        <b>Colegio activo:</b> {activeSchoolId ?? "-"}
      </p>

      {loading && <p>Cargando cursos y matrículas...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <label>
              <b>Curso:</b>{" "}
              <select
                value={selectedCursoId}
                onChange={(e) => setSelectedCursoId(e.target.value)}
                style={{ padding: "0.35rem", minWidth: "260px" }}
              >
                {cursos.length === 0 && <option value="">(Sin cursos)</option>}
                {cursos.map((c) => {
                  const id = String(c.id_curso);
                  const label = cursoMap.get(id) ?? `Curso ${id}`;
                  return (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          {selectedCursoId && (
            <p style={{ marginBottom: "0.5rem" }}>
              <b>Curso seleccionado:</b>{" "}
              {cursoMap.get(String(selectedCursoId)) ?? selectedCursoId}
            </p>
          )}

          {selectedCursoId && matriculasFiltradas.length === 0 && (
            <p>No hay matrículas para el curso seleccionado.</p>
          )}

          {selectedCursoId && matriculasFiltradas.length > 0 && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "0.5rem",
              }}
            >
              <thead>
                <tr>
                  <th style={th}>ID</th>
                  <th style={th}>ID Persona</th>
                  <th style={th}>Año</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Activo</th>
                </tr>
              </thead>
              <tbody>
                {matriculasFiltradas.map((m) => (
                  <tr key={m.id_matricula ?? m.id}>
                    <td style={td}>{m.id_matricula ?? m.id}</td>
                    <td style={td}>{m.id_persona}</td>
                    <td style={td}>{m.anio}</td>
                    <td style={td}>{m.id_estado_matricula}</td>
                    <td style={td}>{String(m.activo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
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
