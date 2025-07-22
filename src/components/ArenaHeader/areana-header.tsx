import { useState, useEffect } from "react";
import { Headline } from "../Headline/headline";
import { Filter } from "../ui/Filter/filter";
import type { Pokemon } from "../../types/pokemon";
import { PokemonLogo } from "../PokemonLogo/PokemonLogo";
import CircularLoader from "../ui/CircularLoader/CircularLoader";

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
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const BATCH_SIZE = 6;

  useEffect(() => {
    const initialBatch = filterOptions.slice(0, BATCH_SIZE);
    setDisplayedPokemons(initialBatch);
    setHasMore(filterOptions.length > BATCH_SIZE);
  }, [filterOptions]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedPokemons.length;
      const nextBatch = filterOptions.slice(
        currentLength,
        currentLength + BATCH_SIZE
      );

      if (nextBatch.length > 0) {
        setDisplayedPokemons((prev) => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < filterOptions.length);
      } else {
        setHasMore(false);
      }
      setLoadingMore(false);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        target.hasAttribute("data-slot") &&
        target.getAttribute("data-slot") === "dropdown-menu-content"
      ) {
        const { scrollTop, scrollHeight, clientHeight } = target;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;

        if (isNearBottom && hasMore && !loadingMore) {
          loadMore();
        }
      }
    };

    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [hasMore, loadingMore, displayedPokemons.length]);

  const handleFilterChange = (value: string | null) => {
    if (hasChanged || !value || value === "loading-trigger") return;

    const selectedPokemon = filterOptions.find(
      (pokemon) => pokemon.id === Number(value)
    );
    if (selectedPokemon) {
      onPokemonChange(selectedPokemon);
      setHasChanged(true);
    }
  };

  const isDisabled = hasChanged || (isInFight && currentTurn !== "user");

  const filterOptionsFormatted = displayedPokemons.map((pokemon) => ({
    label: (
      <div className="flex items-center cursor-pointer justify-between w-full min-w-[256px]">
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

  if (hasMore) {
    filterOptionsFormatted.push({
      label: (
        <div className="flex justify-center py-3">
          {loadingMore ? (
            <CircularLoader size={16} />
          ) : (
            <div className="text-xs text-gray-500">Scroll for more...</div>
          )}
        </div>
      ),
      value: "loading-trigger",
    });
  }

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
