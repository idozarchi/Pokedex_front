import { useEffect, useState } from "react";
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
  cancelId?: number; // <-- Optional prop for disabling a specific pokemon
};

const ChoosePokemonModal = ({
  onSelect,
  onClose,
  cancelId,
}: ChoosePokemonModalProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchMyPokemonsFromBackend(100)
      .then((data) => {
        setPokemons(Array.isArray(data.results) ? data.results : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <CircularLoader />
      </div>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-[90vw] relative max-h-[90vh] flex flex-col">
      <button onClick={onClose} className="absolute top-4 right-4">
        <ClearIcon className="cursor-pointer" />
      </button>
      <CardHeader>
        <CardTitle>Choose Your Pokémon</CardTitle>
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
                        className={`flex flex-row items-center rounded-full justify-center hover:border-blue-600 transition-transform border-2 ${translateY} ${
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
