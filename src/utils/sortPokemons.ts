import { type Pokemon } from "../api/fetchPokemons";

export function sortPokemons(
  pokemons: Pokemon[],
  filterValue: string | null
): Pokemon[] {
  switch (filterValue) {
    case "name-asc":
      return [...pokemons].sort((a, b) =>
        a.name.english.localeCompare(b.name.english)
      );
    case "name-desc":
      return [...pokemons].sort((a, b) =>
        b.name.english.localeCompare(a.name.english)
      );
    case "power-desc":
      return [...pokemons].sort(
        (a, b) => (b.base?.Attack ?? 0) - (a.base?.Attack ?? 0)
      );
    case "power-asc":
      return [...pokemons].sort(
        (a, b) => (a.base?.Attack ?? 0) - (b.base?.Attack ?? 0)
      );
    case "hp-desc":
      return [...pokemons].sort(
        (a, b) => (b.base?.HP ?? 0) - (a.base?.HP ?? 0)
      );
    case "hp-asc":
      return [...pokemons].sort(
        (a, b) => (a.base?.HP ?? 0) - (b.base?.HP ?? 0)
      );
    default:
      return pokemons;
  }
}
