import { type Pokemon } from "../api/fetchPokemons";

export function sortPokemons(
  pokemons: Pokemon[],
  filterValue: string | null
): Pokemon[] {
  switch (filterValue) {
    case "name":
      return [...pokemons].sort((a, b) =>
        a.name.english.localeCompare(b.name.english)
      );
    case "id":
      return [...pokemons].sort((a, b) => a.id - b.id);
    case "power":
      return [...pokemons].sort(
        (a, b) => (b.base?.Attack ?? 0) - (a.base?.Attack ?? 0)
      );
    case "hp":
      return [...pokemons].sort(
        (a, b) => (b.base?.HP ?? 0) - (a.base?.HP ?? 0)
      );
    default:
      return pokemons;
  }
}
