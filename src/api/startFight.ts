import { type Pokemon } from "../types/pokemon";

export type StartFightResponse = {
  fightId: string;
  user: Pokemon;
  opponent: Pokemon;
  starter: "user" | "opponent";
};

export async function startFight(
  userPokemonId: number
): Promise<StartFightResponse> {
  const response = await fetch("http://localhost:3000/fight/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userPokemonId }),
  });

  if (!response.ok) {
    throw new Error("Failed to start fight");
  }

  const data = await response.json();
  return data;
}
