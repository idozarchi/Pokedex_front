import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllPokemonsCount,
  fetchAllPokemonsFromBackend,
} from "../api/fetchAllPokemons";

export function useAllPokemonsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const getSortParams = useCallback(() => {
    switch (filterValue) {
      case "name-asc":
        return { sort: "name", order: "asc" };
      case "name-desc":
        return { sort: "name", order: "desc" };
      case "power-desc":
        return { sort: "powerLevel", order: "desc" };
      case "power-asc":
        return { sort: "powerLevel", order: "asc" };
      case "hp-desc":
        return { sort: "HP", order: "desc" };
      case "hp-asc":
        return { sort: "HP", order: "asc" };
      default:
        return {};
    }
  }, [filterValue]);

  // Query for paginated pokemons
  const { data: pokemonsData, isLoading: pokemonsLoading } = useQuery<
    { results: unknown[] } | undefined
  >({
    queryKey: ["pokemons", page, pageSize, searchValue, filterValue],
    queryFn: () => {
      const { sort, order } = getSortParams();
      return fetchAllPokemonsFromBackend(
        pageSize,
        (page - 1) * pageSize,
        sort,
        order,
        searchValue
      );
    },
    // @ts-expect-error: keepPreviousData is not in the type but is supported by React Query
    keepPreviousData: true,
  });

  // Query for total count
  const { data: totalData, isLoading: totalLoading } = useQuery<
    number | { count: number }
  >({
    queryKey: ["pokemons-count", searchValue],
    queryFn: () => fetchAllPokemonsCount(),
  });

  function getResults(data: unknown): unknown[] {
    if (
      data &&
      typeof data === "object" &&
      data !== null &&
      "results" in data
    ) {
      // @ts-expect-error: results is expected to exist on the backend response
      return data.results;
    }
    return [];
  }

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    pokemons: getResults(pokemonsData),
    loading: pokemonsLoading || totalLoading,
    searchValue,
    setSearchValue,
    filterValue,
    setFilterValue,
    total:
      typeof totalData === "object" &&
      totalData !== null &&
      "count" in totalData
        ? (totalData as { count: number }).count
        : typeof totalData === "number"
        ? totalData
        : 0,
    pagePokemons: getResults(pokemonsData),
  };
}
