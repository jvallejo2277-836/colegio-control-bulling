"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAuthData } from "@/utils/auth";

const API_BASE = "http://127.0.0.1:8000";

export default function LoginPage() {
  const router = useRouter();

  // credenciales
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // estado UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // etapa selección colegio (según tu backend)
  const [requiresSchool, setRequiresSchool] = useState(false);
  const [schools, setSchools] = useState([]);
  const [rolesBySchool, setRolesBySchool] = useState({});
  const [selectedSchool, setSelectedSchool] = useState("");

  // (opcional) guardar user recibido en etapa 1
  const [tempUser, setTempUser] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body = { username, password };

      // ✅ ETAPA 2: mandamos id_colegio
      if (requiresSchool) {
        if (!selectedSchool) {
          setError("Debe seleccionar un colegio.");
          setLoading(false);
          return;
        }
        body.id_colegio = selectedSchool;
      }

      const res = await fetch(`${API_BASE}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // -----------------------------------------
      // ✅ RESPUESTA ETAPA 1: requiere colegio
      // -----------------------------------------
      if (data.requires_school_selection) {
        const schoolsList = data.schools || [];
        const rolesMap = data.rolesBySchool || {};
        const userObj = data.user || null;

        setRequiresSchool(true);
        setSchools(schoolsList);
        setRolesBySchool(rolesMap);
        setTempUser(userObj);

        // Guardamos lista de colegios para el resto de la app
        try {
          localStorage.setItem("schools", JSON.stringify(schoolsList));
        } catch {}

        setLoading(false);
        return;
      }

      // -----------------------------------------
      // ✅ RESPUESTA ETAPA 2: login completo (tokens)
      // -----------------------------------------
      // Aquí tu backend ya debería devolver access/refresh (o equivalente)
      // Tu helper saveAuthData debe dejarlos en localStorage.
      saveAuthData(data);

      // Guardar colegio activo seleccionado (el contexto del sistema)
      if (selectedSchool) {
        localStorage.setItem("activeSchoolId", String(selectedSchool));
      }

      // Asegurar que schools quede guardado (por si no estaba)
      if (schools && schools.length > 0) {
        localStorage.setItem("schools", JSON.stringify(schools));
      }

      // Guardar user si viene en etapa 2; si no, usar tempUser
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else if (tempUser) {
        localStorage.setItem("user", JSON.stringify(tempUser));
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Sistema de Convivencia Escolar</h1>

        {!requiresSchool && <p className="login-subtitle">Inicio de sesión</p>}

        {requiresSchool && (
          <p className="login-subtitle">
            Seleccione el colegio con el que desea trabajar
          </p>
        )}

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* -------------------------
              ETAPA 1: CREDENCIALES
          ------------------------- */}
          {!requiresSchool && (
            <>
              <div className="form-group">
                <label>Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </>
          )}

          {/* -------------------------
              ETAPA 2: SELECCIÓN COLEGIO
          ------------------------- */}
          {requiresSchool && (
            <div className="form-group">
              <label>Colegio</label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                required
              >
                <option value="">-- Seleccione --</option>
                {schools.map((c) => (
                  <option key={String(c.id)} value={String(c.id)}>
                    {c.nombre}
                  </option>
                ))}
              </select>

              {selectedSchool && rolesBySchool[String(selectedSchool)] && (
                <small style={{ marginTop: 6, display: "block", color: "#666" }}>
                  Rol: {rolesBySchool[String(selectedSchool)].join(", ")}
                </small>
              )}
            </div>
          )}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading
              ? "Procesando..."
              : requiresSchool
              ? "Ingresar al colegio"
              : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
