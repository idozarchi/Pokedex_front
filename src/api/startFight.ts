import { type Pokemon } from "../types/pokemon";
import { getAuthHeaders } from "./auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export type StartFightResponse = {
  fightId: string;
  user: Pokemon;
  opponent: Pokemon;
  starter: "user" | "opponent";
};

export async function startFight(
  userPokemonId: number,
  opponentId?: number
): Promise<StartFightResponse> {
  const headers = await getAuthHeaders({ "Content-Type": "application/json" });

  console.log("Starting fight with Pokemon ID:", userPokemonId);
  console.log("Opponent ID:", opponentId);
  console.log("Auth headers:", headers ? "Present" : "Missing");

  const body: { userPokemonId: number; opponentId?: number } = {
    userPokemonId,
  };
  if (opponentId) {
    body.opponentId = opponentId;
  }

  const response = await fetch(`${BACKEND_URL}/fight/start`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("Fight start error:", error);
    throw new Error(
      error.message || `Failed to start fight (${response.status})`
    );
  }

  const data = await response.json();
  return data;
}
