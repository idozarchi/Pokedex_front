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

  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (search) params.append("search", search);

  const res = await fetch(
    `${BACKEND_URL}/users/${targetUserId}/pokemons?${params.toString()}`,
    {
      headers,
    }
  );

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
  const pokemons = Array.isArray(data) ? data : [];
  const ownedIds = pokemons.map((pokemon: any) => pokemon.id);

  return { results: pokemons, ownedIds };
}

export async function fetchMyPokemonsCount(search?: string): Promise<number> {
  const targetUserId = await getCurrentUserId();

  const headers = await getAuthHeaders();

  // Build query parameters
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const url = search
    ? `${BACKEND_URL}/users/${targetUserId}/pokemons?${params.toString()}`
    : `${BACKEND_URL}/users/${targetUserId}/pokemons`;

  const res = await fetch(url, {
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

  return pokemons.length;
}
