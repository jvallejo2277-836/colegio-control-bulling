export function isAuthenticated() {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");

  // No hay token → no autenticado
  if (!token) return false;

  try {
    // Decodificar el payload del JWT
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);

    // Token expirado
    if (payload.exp && payload.exp < now) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}
