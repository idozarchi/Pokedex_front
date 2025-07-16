import { getAuthHeaders } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export interface GetFightResponse {
  fightId: string;
  userPokemon: {
    id: number;
    name: string;
    image: string;
    HP: number;
    speed: number;
    category?: string;
    abilities?: string[][];
  };
  opponentPokemon: {
    id: number;
    name: string;
    image: string;
    HP: number;
    speed: number;
    category?: string;
    abilities?: string[][];
  };
  userPokemonHP: number;
  opponentPokemonHP: number;
  turn: "user" | "opponent";
  battleLog: string[];
  winnerId: number | null;
  status: "in-progress" | "finished";
  catchAttempts: number;
}

export async function getFight(fightId: string): Promise<GetFightResponse> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BACKEND_URL}/fight/details/${fightId}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch fight");
  }

  return response.json();
}
