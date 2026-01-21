"use client";

export default function ReportesPage() {
  // MVP: por ahora vacío (después lo conectamos a backend)
  const reportes = [];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>
        Reportes
      </h1>

      <p style={{ marginTop: 0, marginBottom: 14, color: "#555" }}>
        Un <strong>reporte</strong> es el registro inicial de un incidente informado
        al establecimiento (puede ser anónimo o autenticado).
        <br />
        <strong>Reporte ≠ Denuncia a la autoridad</strong> (PDI / Carabineros / Fiscalía).
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          type="button"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #0b5fff",
            background: "#0b5fff",
            color: "white",
            cursor: "pointer",
            fontWeight: 700,
          }}
          onClick={() => alert("Próximo: crear reporte (formulario MVP).")}
        >
          Crear reporte
        </button>

        <button
          type="button"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => alert("Próximo: filtros (estado / canal / fecha).")}
        >
          Filtros
        </button>
      </div>

      <div
        style={{
          border: "1px solid #e6e6e6",
          borderRadius: 10,
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          style={{
            padding: 12,
            borderBottom: "1px solid #eee",
            fontWeight: 800,
          }}
        >
          Reportes recientes
        </div>

        {reportes.length === 0 ? (
          <div style={{ padding: 12, color: "#666" }}>
            Aún no hay reportes. Crea el primer reporte para comenzar.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                <th style={{ padding: 12 }}>ID</th>
                <th style={{ padding: 12 }}>Fecha</th>
                <th style={{ padding: 12 }}>Canal</th>
                <th style={{ padding: 12 }}>Estado</th>
                <th style={{ padding: 12 }}>Resumen</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f3f3f3" }}>
                  <td style={{ padding: 12 }}>{r.id}</td>
                  <td style={{ padding: 12 }}>{r.fecha}</td>
                  <td style={{ padding: 12 }}>{r.canal}</td>
                  <td style={{ padding: 12 }}>{r.estado}</td>
                  <td style={{ padding: 12 }}>{r.resumen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: 14, color: "#777", fontSize: 13 }}>
        Próximo: crear reporte (modo anónimo/autenticado), involucrados,
        adjuntos y conversión a caso.
      </div>
    </div>
  );
}
