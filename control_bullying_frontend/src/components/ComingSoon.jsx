export default function ComingSoon({ title, note }) {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        {title}
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        {note || "Sección en construcción."}
      </p>
      <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
        <strong>Próximo:</strong> CRUD + conexión API + validaciones.
      </div>
    </div>
  );
}
