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
  filterTooltip?: React.ReactNode;
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
  filterTooltip,
}: ArenaHeaderProps) => {
  const [hasChanged, setHasChanged] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
        <span className="font-semibold text-sm">
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
        <div
          className="relative"
          onMouseEnter={() => filterTooltip && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
            <Filter
              options={filterOptionsFormatted}
              value={null}
              onChange={handleFilterChange}
              label={filterTitle}
            />
          </div>
          {filterTooltip && showTooltip && (
            <div className="absolute left-0 top-full mt-2 z-50 bg-gray-800 text-white text-sm rounded-md p-3 shadow-lg min-w-[250px]">
              <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 rotate-45"></div>
              {filterTooltip}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArenaHeader;
