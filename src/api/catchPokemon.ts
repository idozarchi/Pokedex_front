import { getAuthHeaders } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function catchPokemon(fightId: string) {
  const headers = await getAuthHeaders({ "Content-Type": "application/json" });

  const response = await fetch(`${BACKEND_URL}/fight/catch`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fightId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Catch failed");
  }
  return response.json();
}
