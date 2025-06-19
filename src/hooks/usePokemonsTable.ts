import { useEffect, useState } from "react";
import { fetchPokemons, type Pokemon } from "../api/fetchPokemons";
import { sortPokemons } from "../utils/sortPokemons";

export function usePokemonsTable(
  fetchFn: (limit: number) => Promise<{ results: Pokemon[] }> = fetchPokemons
) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFn(900).then((data) => {
      setPokemons(data.results);
      setLoading(false);
    });
  }, [fetchFn]);

  let filteredPokemons = searchValue
    ? pokemons.filter((pokemon) =>
        pokemon.name.english.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [...pokemons];

  filteredPokemons = sortPokemons(filteredPokemons, filterValue);

  const total = filteredPokemons.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pagePokemons = filteredPokemons.slice(start, end);

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    pokemons,
    loading,
    searchValue,
    setSearchValue,
    filterValue,
    setFilterValue,
    total,
    pagePokemons,
  };
}
