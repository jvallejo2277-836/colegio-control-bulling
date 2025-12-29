import { apiFetch } from "./api";

export function getPersonas() {
  return apiFetch("/personas/");
}

export function createPersona(data) {
  return apiFetch("/personas/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
