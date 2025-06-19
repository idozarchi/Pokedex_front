import { useState } from "react";
import { type Pokemon } from "../../api/fetchPokemons";
import { TableCell, TableRow } from "../ui/Table/table";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import PokemonInfoModal from "../PokemonInfoModal/PokemonInfoModal";
import { Pokador } from "../../assets/catch-button";

type PokemonTableRowProps = {
  pokemon: Pokemon;
};

export function PokemonTableRow({ pokemon }: PokemonTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        className="bg-neutrals-white cursor-pointer"
        key={pokemon.id}
        onClick={() => setOpen(true)}
      >
        <TableCell className="px-4 text-center flex items-center justify-begin gap-2">
          <PokemonLogo imgSrc={pokemon.image?.hires || ""} />
          {pokemon.name.english}
          {pokemon.catched && (
            <span className="flex-shrink-0 flex-grow-0 min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] flex items-center">
              <Pokador size={20} />
            </span>
          )}
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
      <PokemonInfoModal
        open={open}
        onClose={() => setOpen(false)}
        id={pokemon.id}
        name={pokemon.name.english}
        img={pokemon.image?.hires || ""}
        description={pokemon.description}
        height={pokemon.profile?.height || ""}
        weight={pokemon.profile?.weight || ""}
        category={pokemon.species || ""}
        abilities={pokemon.profile?.ability?.map((a) => a[0]) || []}
      />
    </>
  );
}
