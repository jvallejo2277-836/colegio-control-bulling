"use client";

export default function Button({ children, onClick, variant = "primary", style = {}, ...props }) {
  const base = {
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s ease",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };

  const variants = {
    primary: {
      background: "#2563eb",
      color: "white",
    },
    danger: {
      background: "#dc2626",
      color: "white",
    },
    soft: {
      background: "#f1f5f9",
      color: "#334155",
    },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
