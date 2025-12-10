import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/api/token/", {
      username,
      password,
    });

    return response.data;  // 👈 IMPORTANTE
  } catch (error) {
    console.error("Error en API login:", error);
    throw error;
  }
};

export default api;
