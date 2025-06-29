import { useState } from "react";
import { type Pokemon } from "../../types/pokemon";
import { TableCell, TableRow } from "../ui/Table/table";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import PokemonInfoModal from "../PokemonInfoModal/PokemonInfoModal";

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
        <TableCell className="px-4 text-left text-lg flex items-center justify-begin gap-4">
          <PokemonLogo imgSrc={pokemon.image || ""} />
          {pokemon.name}
        </TableCell>
        <TableCell className="px-4 text-left">{pokemon.id}</TableCell>
        <TableCell
          className="px-4 max-w-[544px] truncate whitespace-nowrap overflow-hidden text-left"
          title={pokemon.description || ""}
        >
          {pokemon.description || ""}
        </TableCell>
        <TableCell className="px-4 text-left">
          Power level {pokemon.powerLevel ?? ""}
        </TableCell>
        <TableCell className="px-4 text-left">HP {pokemon.HP ?? ""}</TableCell>
      </TableRow>
      <PokemonInfoModal
        open={open}
        onClose={() => setOpen(false)}
        id={pokemon.id}
        name={pokemon.name}
        img={pokemon.image || ""}
        description={pokemon.description || ""}
        height={pokemon.height || ""}
        weight={pokemon.weight || ""}
        abilities={pokemon.abilities?.map((a) => a[0]) || []}
        category={pokemon.category || ""}
      />
    </>
  );
}
