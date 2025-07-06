export async function switchUserPokemon(fightId: string, newPokemonId: number) {
  const response = await fetch("/api/fight/switch-pokemon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fightId, newPokemonId }),
  });

  if (!response.ok) {
    throw new Error("Failed to switch user Pokémon");
  }

  return response.json();
}
