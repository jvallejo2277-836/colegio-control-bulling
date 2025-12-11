// src/utils/auth.js

// Decodifica un JWT
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

// Revisa si expiró
function isExpired(token) {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

// -------------------------------
// INTENTAR REFRESCAR TOKEN
// -------------------------------
async function tryRefresh() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return false;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    localStorage.setItem("token", data.access);
    return true;
  } catch (e) {
    return false;
  }
}

// -------------------------------
// FUNCIÓN PRINCIPAL
// -------------------------------
export async function isAuthenticated() {
  if (typeof window === "undefined") return false;

  let token = localStorage.getItem("token");

  // No hay token → no autenticado
  if (!token) return false;

  // Token válido → OK
  if (!isExpired(token)) return true;

  // Token expirado → intentar refresh
  const refreshed = await tryRefresh();

  if (refreshed) return true;

  // Nada funcionó → cerrar sesión
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  return false;
}
