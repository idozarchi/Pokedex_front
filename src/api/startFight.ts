import { type Pokemon, fetchPokemonsByIds } from "./fetchPokemons";
import { getRandomPokemon } from "./getRandomPokemon";

export type StartFightResponse = {
  user: Pokemon;
  opponent: Pokemon;
  starter: "user" | "opponent";
};

export async function startFight(userId: number): Promise<StartFightResponse> {
  const opponent = await getRandomPokemon();
  if (!opponent) throw new Error("Could not find a random opponent");
  const [user] = await fetchPokemonsByIds([userId]);
  if (!user) throw new Error("Could not find user Pokémon");
  const starter = Math.random() < 0.5 ? "user" : "opponent";
  return { user, opponent, starter };
}
