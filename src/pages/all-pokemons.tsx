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
import { usePokemonsTable } from "../hooks/usePokemonsTable";
import { PokemonTableRow } from "../components/PokemonTable/PokemonTableRow";
import { ALL_POKEMONS_PAGE } from "../constants/strings";

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
  } = usePokemonsTable();

  return (
    <div className="p-14 bg-neutral-100 min-h-screen">
      <PageToolbar
        title={ALL_POKEMONS_PAGE.TITLE}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={ALL_POKEMONS_PAGE.FILTER_OPTIONS}
        filterValue={filterValue}
        filterLabel="Sort By"
        onFilterChange={setFilterValue}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {ALL_POKEMONS_PAGE.TABLE_HEADS.map((head) => (
              <TableHead key={head.value} className="px-4 text-center">
                {head.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            pagePokemons.map((pokemon) => (
              <PokemonTableRow key={pokemon.id} pokemon={pokemon} />
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
    </div>
  );
}
