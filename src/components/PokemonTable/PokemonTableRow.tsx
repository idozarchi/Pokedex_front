import { useState, useEffect } from "react";
import { type Pokemon } from "../../types/pokemon";
import { TableCell, TableRow } from "../ui/Table/table";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import PokemonInfoModal from "../PokemonInfoModal/PokemonInfoModal";
import { Pokador } from "../../assets/catch-button";

type PokemonTableRowProps = {
  pokemon: Pokemon;
  owned?: boolean;
};

export function PokemonTableRow({ pokemon, owned }: PokemonTableRowProps) {
  const [open, setOpen] = useState(false);

  const capitalize = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const formatDescriptionForTooltip = (description: string) => {
    if (!description) return "";
    return description
      .replace(/\.\s+/g, ".\n")
      .replace(/\?\s+/g, "?\n")
      .replace(/\!\s+/g, "!\n")
      .trim();
  };

  return (
    <>
      <TableRow
        className="bg-neutrals-white cursor-pointer"
        key={pokemon.id}
        onClick={() => setOpen(true)}
      >
        <TableCell className="px-4 text-left text-lg relative">
          <div className="flex items-center gap-4">
            <PokemonLogo imgSrc={pokemon.image || ""} />
            {capitalize(pokemon.name)}
          </div>
          {owned && (
            <Pokador
              className="absolute right-14 top-1/2 -translate-y-1/2"
              size={24}
            />
          )}
        </TableCell>
        <TableCell className="px-4 text-left">{pokemon.id}</TableCell>
        <TableCell
          className="px-4 max-w-[544px] truncate whitespace-nowrap overflow-hidden text-left"
          title={formatDescriptionForTooltip(
            capitalize(pokemon.description || "")
          )}
        >
          {pokemon.description || ""}
        </TableCell>
        <TableCell className="px-4 text-center">
          {pokemon.powerLevel ?? ""}
        </TableCell>
        <TableCell className="px-4 text-center">{pokemon.HP ?? ""}</TableCell>
      </TableRow>
      <PokemonInfoModal
        open={open}
        onClose={() => setOpen(false)}
        id={pokemon.id}
        name={capitalize(pokemon.name)}
        img={pokemon.image || ""}
        description={capitalize(pokemon.description || "")}
        height={pokemon.height || ""}
        weight={pokemon.weight + " kg" || ""}
        abilities={
          pokemon.abilities?.map((ability) => capitalize(ability)) || []
        }
        category={capitalize(pokemon.category || "")}
      />
    </>
  );
}
