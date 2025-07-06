export async function attack(fightId: string) {
  const response = await fetch("http://localhost:3000/fight/attack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fightId }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Attack failed");
  }
  return response.json();
}