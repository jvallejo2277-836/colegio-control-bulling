"use client";

import { useState } from "react";

export default function TesterIntegridad() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------------------------------
  // LISTA DE PRUEBAS DE INTEGRIDAD
  // ---------------------------------------
  const pruebas = [
    // PRUEBA 1
    {
      id: 1,
      nombre: "Crear persona SIN colegio",
      ejecutar: async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/personas/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombres: "Juan",
            apellidos: "Pérez",
            rut: "99999999-9",
            id_colegio: null,
          }),
        });

        return await res.json();
      },
    },

    // PRUEBA 2
    {
      id: 2,
      nombre: "Crear persona con colegio inexistente",
      ejecutar: async () => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/api/personas/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombres: "Carlos",
            apellidos: "Gómez",
            rut: "88888888-8",
            id_colegio: 9999,
          }),
        });

        return await res.json();
      },
    },

    // PRUEBA 3
    {
      id: 3,
      nombre: "Eliminar colegio con personas asociadas",
      ejecutar: async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/colegios/1/", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Siempre leemos como texto
        const text = await res.text();

        // Caso: Django devuelve HTML por error de FK
        if (text.startsWith("<")) {
          return {
            error: "HTML recibido (restricción FK activada)",
            detalle: "No se puede eliminar colegio con personas asociadas.",
          };
        }

        // Si se borra (204), entonces está mal
        if (res.status === 204) {
          return {
            error: "ERROR GRAVE: Se eliminó el colegio, pero NO debía permitirse",
          };
        }

        // Intentamos parsear JSON
        try {
          return JSON.parse(text);
        } catch (e) {
          return { error: "Respuesta no interpretable", raw: text };
        }
      },
    },
  ];

  // ---------------------------------------
  // EJECUTAR TODAS LAS PRUEBAS
  // ---------------------------------------
  const ejecutarTodas = async () => {
    setLoading(true);
    const nuevosResultados = [];

    for (const prueba of pruebas) {
      try {
        const resultado = await prueba.ejecutar();
        nuevosResultados.push({
          id: prueba.id,
          nombre: prueba.nombre,
          resultado,
        });
      } catch (error) {
        nuevosResultados.push({
          id: prueba.id,
          nombre: prueba.nombre,
          resultado: error.toString(),
        });
      }
    }

    setResults(nuevosResultados);
    setLoading(false);
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧪 Tester de Integridad del Modelo</h1>

      <button onClick={ejecutarTodas} style={styles.button} disabled={loading}>
        {loading ? "Ejecutando..." : "Ejecutar todas las pruebas"}
      </button>

      <div style={styles.results}>
        {results.map((r) => (
          <div key={r.id} style={styles.card}>
            <h3>{r.nombre}</h3>
            <pre style={styles.pre}>
              {JSON.stringify(r.resultado, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------
// ESTILOS
// ---------------------------------------
const styles = {
  container: {
    padding: 30,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  button: {
    padding: "12px 24px",
    background: "#0070f3",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
    fontSize: 18,
    marginBottom: 30,
  },
  results: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 20,
  },
  card: {
    padding: 20,
    background: "#f5f5f5",
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  pre: {
    background: "#fff",
    padding: 10,
    borderRadius: 4,
    fontSize: 12,
    overflowX: "auto",
  },
};
