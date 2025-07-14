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
  userId?: string
): Promise<{ results: Pokemon[] }> {
  const targetUserId = userId || (await getCurrentUserId());

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
  return { results: data };
}

export async function fetchMyPokemonsCount(userId?: string): Promise<number> {
  const { results } = await fetchMyPokemonsFromBackend(userId);
  return results.length;
}
