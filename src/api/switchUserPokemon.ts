import { getAuthHeaders } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function switchUserPokemon(fightId: string, newPokemonId: number) {
  const headers = await getAuthHeaders({ "Content-Type": "application/json" });

  const response = await fetch(`${BACKEND_URL}/fight/switch-pokemon`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fightId, newPokemonId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to switch user Pokémon");
  }

  return response.json();
}
