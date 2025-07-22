import { useEffect, useState, useRef } from "react";
import { fetchMyPokemonsFromBackend } from "../../api/fetchMyPokemons";
import type { Pokemon } from "../../types/pokemon";
import PokemonLogo from "../PokemonLogo/PokemonLogo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/Card/card";
import { ClearIcon } from "../../assets/ClearIcon";
import CircularLoader from "../ui/CircularLoader/CircularLoader";
import { Button } from "../ui/Button/button";
import { Separator } from "../ui/Separator/separator";

type ChoosePokemonModalProps = {
  onSelect: (pokemon: Pokemon) => void;
  onClose: () => void;
  cancelId?: number;
};

const ChoosePokemonModal = ({
  onSelect,
  onClose,
  cancelId,
}: ChoosePokemonModalProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const LIMIT = 12;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    fetchMyPokemonsFromBackend(LIMIT, 0, "speed", "desc")
      .then((data) => {
        const newPokemons = Array.isArray(data.results) ? data.results : [];
        setPokemons(newPokemons);
        setHasMore(newPokemons.length === LIMIT);
        setOffset(LIMIT);
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const data = await fetchMyPokemonsFromBackend(
        LIMIT,
        offset,
        "speed",
        "desc"
      );
      const newPokemons = Array.isArray(data.results) ? data.results : [];

      // Filter out any duplicates based on Pokemon ID
      const existingIds = new Set(pokemons.map((p) => p.id));
      const uniqueNewPokemons = newPokemons.filter(
        (pokemon) => !existingIds.has(pokemon.id)
      );

      console.log(
        "Filtered duplicates:",
        newPokemons.length - uniqueNewPokemons.length
      );

      setPokemons((prev) => [...prev, ...uniqueNewPokemons]);
      setHasMore(newPokemons.length === LIMIT);
      setOffset((prev) => prev + LIMIT);
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, offset]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <CircularLoader />
      </div>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-lg p-8 min-w-[500px] max-w-[90vw] relative max-h-[90vh] flex flex-col">
      <button onClick={onClose} className="absolute top-4 right-4">
        <ClearIcon className="cursor-pointer" />
      </button>
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Pokémon</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-none">
        <div className="flex flex-col gap-15 items-center">
          {Array.from({ length: Math.ceil(pokemons.length / 3) }).map(
            (_, rowIdx) => (
              <div
                key={rowIdx}
                className="flex flex-row gap-12 w-full justify-center"
              >
                {pokemons
                  .slice(rowIdx * 3, rowIdx * 3 + 3)
                  .map((pokemon, colIdx) => {
                    const isMiddle = colIdx === 1;
                    const isEvenRow = rowIdx % 2 === 0;
                    const translateY = isMiddle
                      ? isEvenRow
                        ? "translate-y-1"
                        : "-translate-y-1"
                      : "";
                    const isSelected = selected?.id === pokemon.id;
                    const isDisabled =
                      cancelId !== undefined && pokemon.id === cancelId;
                    return (
                      <button
                        key={pokemon.id}
                        onClick={() => !isDisabled && setSelected(pokemon)}
                        type="button"
                        className={`flex flex-row items-center cursor-pointer rounded-full justify-center hover:border-blue-600 transition-transform border-2 ${translateY} ${
                          isSelected ? "border-blue-600" : "border-transparent"
                        }`}
                        style={{
                          padding: 0,
                          opacity: isDisabled ? 0.5 : 1,
                          pointerEvents: isDisabled ? "none" : "auto",
                        }}
                        disabled={isDisabled}
                      >
                        <PokemonLogo
                          name={pokemon.name}
                          imgSrc={pokemon.image || ""}
                          size={86}
                        />
                      </button>
                    );
                  })}
              </div>
            )
          )}
          {loadingMore && (
            <div className="flex justify-center py-4">
              <CircularLoader size={32} />
            </div>
          )}
          {hasMore && <div ref={observerRef} className="h-4" />}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-center">
        <Button
          className="w-26 h-10"
          onClick={() => {
            if (selected) {
              onSelect(selected);
            }
          }}
          disabled={!selected}
        >
          Start Battle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChoosePokemonModal;
