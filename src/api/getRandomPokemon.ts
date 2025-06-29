import { fetchPokemons } from "./fetchPokemons";
import type { Pokemon } from "./fetchPokemons";

export async function getRandomPokemon(): Promise<Pokemon | undefined> {
  const { results } = await fetchPokemons(1000);
  if (!results || results.length === 0) return undefined;
  const idx = Math.floor(Math.random() * results.length);
  return results[idx];
}
