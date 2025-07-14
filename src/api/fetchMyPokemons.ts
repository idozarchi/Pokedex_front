import { type Pokemon } from "../types/pokemon";
import { getAuthHeaders } from "./auth";
import { getCurrentUser } from "aws-amplify/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

async function getCurrentUserId(): Promise<string> {
  try {
    const user = await getCurrentUser();
    return user.userId;
  } catch (error) {
    console.error("Error getting current user ID:", error);
    throw new Error("User not authenticated");
  }
}

export async function fetchMyPokemonsFromBackend(
  limit: number,
  offset: number = 0,
  sort?: string,
  order?: string,
  search?: string
): Promise<{ results: Pokemon[]; ownedIds: number[] }> {
  const targetUserId = await getCurrentUserId();

  const headers = await getAuthHeaders();

  const res = await fetch(`${BACKEND_URL}/users/${targetUserId}/pokemons`, {
    headers,
  });

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
  let pokemons = Array.isArray(data) ? data : [];

  if (search) {
    const searchLower = search.toLowerCase();
    pokemons = pokemons.filter(
      (pokemon: any) =>
        pokemon.name?.toLowerCase().includes(searchLower) ||
        pokemon.description?.toLowerCase().includes(searchLower) ||
        pokemon.category?.toLowerCase().includes(searchLower)
    );
  }

  if (sort && order) {
    pokemons.sort((a: any, b: any) => {
      let aValue: any;
      let bValue: any;

      switch (sort) {
        case "name":
          aValue = a.name?.toLowerCase() || "";
          bValue = b.name?.toLowerCase() || "";
          break;
        case "powerLevel":
          aValue = a.powerLevel || 0;
          bValue = b.powerLevel || 0;
          break;
        case "HP":
          aValue = a.HP || 0;
          bValue = b.HP || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  const paginatedPokemons = pokemons.slice(offset, offset + limit);
  const ownedIds = pokemons.map((pokemon: any) => pokemon.id);

  return { results: paginatedPokemons, ownedIds };
}

export async function fetchMyPokemonsCount(search?: string): Promise<number> {
  const targetUserId = await getCurrentUserId();

  const headers = await getAuthHeaders();
  const res = await fetch(`${BACKEND_URL}/users/${targetUserId}/pokemons`, {
    headers,
  });

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
  const pokemons = Array.isArray(data) ? data : [];

  if (search) {
    const searchLower = search.toLowerCase();
    const filteredPokemons = pokemons.filter(
      (pokemon: any) =>
        pokemon.name?.toLowerCase().includes(searchLower) ||
        pokemon.description?.toLowerCase().includes(searchLower) ||
        pokemon.category?.toLowerCase().includes(searchLower)
    );
    return filteredPokemons.length;
  }

  return pokemons.length;
}
