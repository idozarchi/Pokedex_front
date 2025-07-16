import { type Pokemon } from "../types/pokemon";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function fetchAllPokemonsFromBackend(
  limit: number,
  offset: number = 0,
  sort?: string,
  order?: string,
  search?: string
): Promise<{ results: Pokemon[] }> {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit.toString());
  if (offset) params.set("offset", offset.toString());
  if (sort) params.set("sort", sort);
  if (order) params.set("order", order);
  if (search) params.set("search", search);

  const res = await fetch(`${BACKEND_URL}/all-pokemons?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  const data = await res.json();
  return { results: data };
}

// Fetch the total count of pokemons from the backend
export async function fetchAllPokemonsCount(): Promise<number> {
  const res = await fetch(`${BACKEND_URL}/all-pokemons/count`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon count");
  return await res.json();
}
