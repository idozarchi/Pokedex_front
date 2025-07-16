import { useState } from "react";
import { Headline } from "../Headline/headline";
import { Filter } from "../ui/Filter/filter";
import type { Pokemon } from "../../types/pokemon";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";

// All strings and constants are imported from the constants file when it will merged

type ArenaHeaderProps = {
  headline: string;
  description: string;
  className?: string;
  filterTitle: string;
  filterOptions: Pokemon[];
  onPokemonChange: (pokemon: Pokemon) => void;
  currentTurn?: "user" | "opponent";
  isInFight?: boolean;
};

export const ArenaHeader = ({
  headline,
  description,
  className = "",
  filterTitle,
  filterOptions,
  onPokemonChange,
  currentTurn = "user",
  isInFight = false,
}: ArenaHeaderProps) => {
  const [hasChanged, setHasChanged] = useState(false);

  const handleFilterChange = (value: string | null) => {
    if (hasChanged || !value) return;

    const selectedPokemon = filterOptions.find(
      (pokemon) => pokemon.id === Number(value)
    );
    if (selectedPokemon) {
      onPokemonChange(selectedPokemon);
      setHasChanged(true);
    }
  };

  // Disable if already changed, or if in fight and not user's turn
  const isDisabled = hasChanged || (isInFight && currentTurn !== "user");

  const filterOptionsFormatted = filterOptions.map((pokemon) => ({
    label: (
      <div className="flex items-center justify-between w-full min-w-[256px]">
        <div className="flex items-center gap-3">
          <PokemonLogo size={36} imgSrc={pokemon.image} />
          <div className="flex flex-col">
            <span className="font-medium text-base leading-tight">
              {typeof pokemon.name === "string" ? pokemon.name : pokemon.name}
            </span>
            <span className="text-xs text-blue-700">
              Speed: {pokemon.speed ?? 0}
            </span>
          </div>
        </div>
        <span className="font-semibold text-base">
          Pwr. {pokemon.powerLevel ?? 0}
        </span>
      </div>
    ),
    value: pokemon.id.toString(),
  }));

  return (
    <div className={`arena-header mt-8 ${className}`}>
      <Headline className="text-5xl font-bold mb-4">{headline}</Headline>
      <p className="text-xl text-gray-600">{description}</p>

      <div className="flex items-start">
        <div className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
          <Filter
            options={filterOptionsFormatted}
            value={null}
            onChange={handleFilterChange}
            label={filterTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default ArenaHeader;
