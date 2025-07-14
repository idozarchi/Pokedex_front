export async function catchPokemon(fightId: string) {
  const response = await fetch("http://localhost:3000/fight/catch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fightId }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Catch failed");
  }
  return response.json();
}