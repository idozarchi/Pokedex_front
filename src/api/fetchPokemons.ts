export type Pokemon = {
  name: string;
  url: string;
};

export type FetchPokemonsResponse = {
  count: number;
  results: Pokemon[];
};

/**
 * Fetches a limited number of Pokémon from the local pokemon.json file in the public folder.
 * @param amount The number of Pokémon to return.
 */
export async function fetchPokemons(
  amount: number
): Promise<FetchPokemonsResponse> {
  const res = await fetch("/pokemon.json");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  const data = await res.json();
  const allPokemons: Pokemon[] = data || [];

  return {
    count: allPokemons.length,
    results: allPokemons.slice(0, amount),
  };
}
