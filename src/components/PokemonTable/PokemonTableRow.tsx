import { type Pokemon } from "../../api/fetchPokemons";
import { TableCell, TableRow } from "../ui/Table/table";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";

type PokemonTableRowProps = {
  pokemon: Pokemon;
};

export function PokemonTableRow({ pokemon }: PokemonTableRowProps) {
  return (
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
  );
}
