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
  if (!res.ok) {
    let errorMsg = "Failed to fetch My Pokémons";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      errorMsg = "An unknown error occurred while fetching My Pokémons.";
    }
    throw new Error(errorMsg);
  }
  const data = await res.json();
  return { results: data };
}

export async function fetchMyPokemonsCount(): Promise<number> {
  const res = await fetch(`${BACKEND_URL}/my-pokemons/count`);
  if (!res.ok) {
    let errorMsg = "Failed to fetch My Pokémons count";
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {
      errorMsg = "An unknown error occurred while fetching My Pokémons count.";
    }
    throw new Error(errorMsg);
  }
  const data = await res.json();
  if (typeof data === "object" && data !== null && "count" in data) {
    return data.count;
  }
  if (typeof data === "number") {
    return data;
  }
  throw new Error("Unexpected response format when fetching My Pokémons count");
}
