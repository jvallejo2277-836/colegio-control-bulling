"use client";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={header}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={closeBtn}>✖</button>
        </div>

        <div style={content}>{children}</div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  background: "white",
  width: "420px",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

const content = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};
