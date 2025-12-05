import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando login con:", username, password);

    alert("Login enviado (mañana lo conectamos al servidor)");
  };

  return (
    <div style={styles.container}>
      <h2>Ingreso al Sistema</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: 350,
    margin: "80px auto",
    padding: 20,
    textAlign: "center",
    borderRadius: 10,
    background: "#f3f3f3",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc"
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    background: "#3498db",
    color: "white",
    cursor: "pointer"
  }
};
