import { useState } from "react";
import { Headline } from "../Headline/headline";
import { Filter } from "../ui/Filter/filter";
import type { Pokemon } from "../../api/fetchPokemons";

// All strings and constants are imported from the constants file when it will merged

type ArenaHeaderProps = {
  headline: string;
  description: string;
  className?: string;
  filterTitle: string;
  filterOptions: Pokemon[];
  onPokemonChange: (pokemon: Pokemon) => void;
};

export const ArenaHeader = ({
  headline,
  description,
  className = "",
  filterTitle,
  filterOptions,
  onPokemonChange,
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

  const filterOptionsFormatted = filterOptions.map((pokemon) => ({
    label:
      typeof pokemon.name === "string" ? pokemon.name : pokemon.name.english,
    value: pokemon.id.toString(),
  }));

  return (
    <div className={`arena-header ${className}`}>
      <Headline className="text-5xl font-bold mb-4">{headline}</Headline>
      <p className="text-xl text-gray-600">{description}</p>

      <div className="flex items-start">
        <div className={hasChanged ? "opacity-50 pointer-events-none" : ""}>
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
