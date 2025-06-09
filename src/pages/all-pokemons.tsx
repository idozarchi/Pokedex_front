import { useEffect, useState } from "react";
import { PageToolbar } from "../components/PageToolBar/page-toolbar"; // Adjust path if needed
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "../components/ui/Table/table";
import { fetchPokemons, type Pokemon } from "../api/fetchPokemons";
import { PokemonLogo } from "../components/PokemonLogo/PokemonLogo"; // Adjust path as needed

export default function AllPokemonsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPokemons(100).then((data) => {
      setPokemons(data.results);
      setLoading(false);
    });
  }, []);

  function sortPokemons(
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
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            pagePokemons.map((pokemon) => (
              <TableRow className="bg-neutrals-white" key={pokemon.id}>
                <TableCell className="px-4 text-center flex items-center justify-begin gap-2">
                  <PokemonLogo imgSrc={pokemon.image?.sprite || ""} />
                  {pokemon.name.english}
                </TableCell>
                <TableCell className="px-4 text-center">{pokemon.id}</TableCell>
                <TableCell
                  className="px-4 max-w-[544px] truncate whitespace-nowrap overflow-hidden text-center"
                  title={pokemon.description}
                >
                  {pokemon.description}
                </TableCell>
                <TableCell className="px-4 text-center">
                  Power level {pokemon.base?.Attack ?? ""}
                </TableCell>
                <TableCell className="px-4 text-center">
                  {pokemon.base?.HP ?? ""}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </Table>
    </div>
  );
}
