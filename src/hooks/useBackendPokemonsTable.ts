import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../types/pokemon";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

type FetchPageFn = (
  pageSize: number,
  offset: number,
  sort?: string,
  order?: string,
  search?: string
) => Promise<{ results: Pokemon[]; ownedIds: number[] }>;

type FetchCountFn = (search?: string) => Promise<number | { count: number }>;

export function useBackendPokemonsTable(
  fetchPageFn: FetchPageFn,
  fetchCountFn: FetchCountFn
) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 500);

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

  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [prevFilterValue, setPrevFilterValue] = useState<string | null>(null);

  useEffect(() => {
    const searchChanged = debouncedSearchValue !== prevSearchValue;
    const filterChanged = filterValue !== prevFilterValue;

    if (searchChanged || filterChanged) {
      if (
        (debouncedSearchValue && !prevSearchValue) ||
        (filterValue && !prevFilterValue)
      ) {
        setPreviousPage(page);
        setPage(1);
      } else if (
        (!debouncedSearchValue && prevSearchValue) ||
        (!filterValue && prevFilterValue)
      ) {
        if (previousPage > 1) {
          setPage(previousPage);
          setPreviousPage(1);
        }
      } else if (debouncedSearchValue || filterValue) {
        setPage(1);
      }

      setPrevSearchValue(debouncedSearchValue);
      setPrevFilterValue(filterValue);
    }
  }, [
    debouncedSearchValue,
    filterValue,
    page,
    previousPage,
    prevSearchValue,
    prevFilterValue,
  ]);

  const {
    data: pokemonsData,
    isLoading: pokemonsLoading,
    error: pokemonsError,
  } = useQuery({
    queryKey: ["pokemons", page, pageSize, debouncedSearchValue, filterValue],
    queryFn: () => {
      const { sort, order } = getSortParams();
      return fetchPageFn(
        pageSize,
        (page - 1) * pageSize,
        sort,
        order,
        debouncedSearchValue
      );
    },
  });

  const {
    data: totalData,
    isLoading: totalLoading,
    error: totalError,
  } = useQuery({
    queryKey: ["pokemons-count", debouncedSearchValue],
    queryFn: () => fetchCountFn(debouncedSearchValue),
  });

  function getResults(data: unknown): Pokemon[] {
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

  function getOwnedIds(data: unknown): number[] {
    if (
      data &&
      typeof data === "object" &&
      data !== null &&
      "ownedIds" in data
    ) {
      // @ts-expect-error: ownedIds is expected to exist on the backend response
      return data.ownedIds;
    }
    return [];
  }

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    pokemons: getResults(pokemonsData),
    ownedIds: getOwnedIds(pokemonsData),
    loading: pokemonsLoading || totalLoading,
    error: pokemonsError || totalError,
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
