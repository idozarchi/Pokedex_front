export type Pokemon = {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
    [key: string]: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
    [key: string]: number;
  };
  species: string;
  description: string;
  evolution: {
    next?: [string, string][];
    [key: string]: any;
  };
  profile: {
    height: string;
    weight: string;
    egg: string[];
    ability: [string, string][];
    gender: string;
    [key: string]: any;
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
    [key: string]: string;
  };
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
  const allPokemons: Pokemon[] = data.results || data;

  return {
    count: allPokemons.length,
    results: allPokemons.slice(0, amount),
  };
}

export async function fetchMyPokemons(
  amount: number
): Promise<FetchPokemonsResponse> {
  // Try to get from localStorage first
  let mergedPokemons: Pokemon[] = [];
  try {
    const stored = localStorage.getItem("catchedPokemons");
    if (stored) {
      mergedPokemons = JSON.parse(stored);
    }
  } catch {
    mergedPokemons = [];
  }

  // Also fetch from /my-pokemons.json and merge (preventing duplicates)
  try {
    const res = await fetch("/my-pokemons.json");
    if (res.ok) {
      const data = await res.json();
      const allPokemons: Pokemon[] = data.results || data;
      const existingIds = new Set(mergedPokemons.map((p) => p.id));
      for (const p of allPokemons) {
        if (!existingIds.has(p.id)) {
          mergedPokemons.push(p);
        }
      }
    }
  } catch {
    // Ignore fetch errors
  }

  return {
    count: mergedPokemons.length,
    results: mergedPokemons.slice(0, amount),
  };
}

export async function fetchPokemonsByIds(ids: number[]): Promise<Pokemon[]> {
  const res = await fetch("/pokemon.json");
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  const data = await res.json();
  const allPokemons: Pokemon[] = data.results || data;
  return allPokemons.filter((pokemon) => ids.includes(pokemon.id));
}
