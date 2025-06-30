import { type Pokemon } from "../types/pokemon";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function fetchMyPokemonsFromBackend(
  limit: number,
  offset: number = 0,
  sort?: string,
  order?: string,
  search?: string
): Promise<{ results: Pokemon[] }> {
  const params = new URLSearchParams();
  if (limit) params.append("limit", limit.toString());
  if (offset) params.append("offset", offset.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (search) params.append("search", search);

  const res = await fetch(`${BACKEND_URL}/my-pokemons?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch My Pokémons");
  const data = await res.json();
  return { results: data };
}

export async function fetchMyPokemonsCount(): Promise<number> {
  const res = await fetch(`${BACKEND_URL}/my-pokemons/count`);
  if (!res.ok) throw new Error("Failed to fetch My Pokémons count");
  const data = await res.json();
  if (typeof data === "object" && data !== null && "count" in data) {
    return data.count;
  }
  return data;
}
