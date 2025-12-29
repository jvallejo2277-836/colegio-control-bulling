// src/utils/auth.js

// ===============================
// TOKEN
// ===============================
export function getToken() {
  return localStorage.getItem("access");
}

export function isAuthenticated() {
  return !!localStorage.getItem("access");
}

// ===============================
// USER
// ===============================
export function getUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return null;
  }
}

// ===============================
// COLEGIO ACTIVO
// (fijo por sesión)
// ===============================
export function getActiveSchoolId() {
  const user = getUser();
  return user?.id_colegio ?? null;
}

// ===============================
// ROLES
// ===============================
export function getRoles() {
  const user = getUser();
  return user?.roles ?? [];
}

// ===============================
// GUARDAR AUTH DATA
// ===============================
export function saveAuthData(data) {
  // tokens
  if (data.access) localStorage.setItem("access", data.access);
  if (data.refresh) localStorage.setItem("refresh", data.refresh);

  // user (incluye id_colegio, colegio_nombre, roles)
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
}

// ===============================
// LOGOUT
// ===============================
export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}
