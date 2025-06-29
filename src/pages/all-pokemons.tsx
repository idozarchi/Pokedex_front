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
import { CircularLoader } from "../components/ui/Loader/circular-loader";

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
        title="All Pokémons"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={[
          { label: "Name", value: "name" },
          { label: "ID", value: "id" },
          { label: "Power Level", value: "power" },
          { label: "HP Level", value: "hp" },
        ]}
        filterValue={filterValue}
        filterLabel="Sort By"
        onFilterChange={setFilterValue}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 text-center">Pokemon Name</TableHead>
            <TableHead className="px-4 text-center">ID</TableHead>
            <TableHead className="px-4 max-w-[544px] text-center">
              Description
            </TableHead>
            <TableHead className="px-4 text-center">Power Level</TableHead>
            <TableHead className="px-4 text-center">HP Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <CircularLoader size={32} />
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
