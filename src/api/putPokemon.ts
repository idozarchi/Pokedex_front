// tfunc.ts
// Utility function to fetch a Pokémon by ID and insert it into my-pokemons.json (Node.js only)
// Usage: Call from a Node.js script or serverless function, not from the browser.

import { fetchPokemonsByIds, type Pokemon } from "./fetchPokemons";

/**
 * Adds a Pokémon by ID to localStorage under 'catchedPokemons'.
 * Returns the added Pokémon or null if not found or already present.
 */
export async function putPokemon(id: number): Promise<Pokemon | null> {
  // Get the Pokémon by ID
  const pokemons = await fetchPokemonsByIds([id]);
  const pokemon = pokemons[0];
  if (!pokemon) return null;

  // Get current caught pokemons from localStorage
  let myPokemons: Pokemon[] = [];
  try {
    const stored = localStorage.getItem("catchedPokemons");
    if (stored) {
      myPokemons = JSON.parse(stored);
    }
  } catch {
    myPokemons = [];
  }

  // Prevent duplicates
  if (myPokemons.some((p) => p.id === id)) return null;

  // Add the new Pokémon and update localStorage
  myPokemons.push(pokemon);
  localStorage.setItem("catchedPokemons", JSON.stringify(myPokemons));
  // Force a localStorage event for debugging
  window.dispatchEvent(new Event("storage"));
  return pokemon;
}
