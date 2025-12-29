import { apiFetch } from "./api";

export function getRolesFull() {
  return apiFetch("/roles/full/");
}
