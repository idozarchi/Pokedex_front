import { PageToolbar } from "../components/PageToolBar/page-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "../components/ui/Table/table";
import { useBackendPokemonsTable } from "../hooks/useBackendPokemonsTable";
import {
  fetchAllPokemonsFromBackend,
  fetchAllPokemonsCount,
} from "../api/fetchAllPokemons";
import { PokemonTableRow } from "../components/PokemonTable/PokemonTableRow";
import { type Pokemon } from "../types/pokemon";
import EmptySearch from "../components/EmptySearch/empty-search";
import CircularLoader from "../components/ui/CircularLoader/CircularLoader";

export default function AllPokemonsPage() {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    searchValue,
    setSearchValue,
    filterValue,
    setFilterValue,
    total,
    pagePokemons,
    error,
    ownedIds,
  } = useBackendPokemonsTable(
    fetchAllPokemonsFromBackend,
    fetchAllPokemonsCount
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <PageToolbar
        title="All Pokémons"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={[
          { label: "Name (A-Z)", value: "name-asc" },
          { label: "Name (Z-A)", value: "name-desc" },
          { label: "Power (High-Low)", value: "power-desc" },
          { label: "Power (Low-High)", value: "power-asc" },
          { label: "HP (High-Low)", value: "hp-desc" },
          { label: "HP (Low-High)", value: "hp-asc" },
        ]}
        filterValue={filterValue}
        filterLabel="ID"
        onFilterChange={setFilterValue}
      />
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px] bg-white rounded-md border border-gray-200">
          <CircularLoader />
        </div>
      ) : (
        <Table className="rounded-md overflow-hidden border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 text-left">Pokemon Name</TableHead>
              <TableHead className="px-4 text-left">ID</TableHead>
              <TableHead className="px-4 max-w-[544px] text-left">
                Description
              </TableHead>
              <TableHead className="px-4 text-center">Power Level</TableHead>
              <TableHead className="px-4 text-center">HP Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagePokemons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="p-0 border-0">
                  <EmptySearch text="No Pokémons were found" />
                </TableCell>
              </TableRow>
            ) : (
              pagePokemons.map((pokemon) => (
                <PokemonTableRow
                  key={(pokemon as Pokemon).id}
                  pokemon={pokemon as Pokemon}
                  owned={ownedIds.includes(pokemon.id)}
                />
              ))
            )}
          </TableBody>
          <TableFooter
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            rowsPerPageOptions={[5, 10, 20, 30]}
          />
        </Table>
      )}
    </div>
  );
}
