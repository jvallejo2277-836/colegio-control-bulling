import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);

      if (response && response.access) {
        // Guarda token en localStorage
        localStorage.setItem("token", response.access);

        alert("Login exitoso");

        // Navegar al dashboard
       window.location.href = "/dashboard";

      } else {
        setErrorMsg("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMsg("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
