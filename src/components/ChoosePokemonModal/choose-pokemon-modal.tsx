import { useEffect, useState } from "react";
import { fetchMyPokemons } from "../../api/fetchPokemons";
import type { Pokemon } from "../../api/fetchPokemons";
import PokemonLogo from "../PokemonLogo/PokemonLogo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/Card/card";
import { ClearIcon } from "../../assets/ClearIcon";
import { Button } from "../ui/Button/button";
import { Separator } from "../ui/Separator/separator";

type ChoosePokemonModalProps = {
  onSelect: (pokemon: Pokemon) => void;
  onClose: () => void;
};

const ChoosePokemonModal = ({ onSelect, onClose }: ChoosePokemonModalProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchMyPokemons(100).then((data) => {
      setPokemons(Array.isArray(data.results) ? data.results : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <Card className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-[90vw] relative">
      <button onClick={onClose} className="absolute top-4 right-4">
        <ClearIcon className="cursor-pointer" />
      </button>
      <CardHeader>
        <CardTitle>Choose Your Pokémon</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 items-center">
          {Array.from({ length: Math.ceil(pokemons.length / 3) }).map(
            (_, rowIdx) => (
              <div
                key={rowIdx}
                className="flex flex-row gap-4 w-full justify-center"
              >
                {pokemons
                  .slice(rowIdx * 3, rowIdx * 3 + 3)
                  .map((pokemon, colIdx) => {
                    const isMiddle = colIdx === 1;
                    const isEvenRow = rowIdx % 2 === 0;
                    const translateY = isMiddle
                      ? isEvenRow
                        ? "translate-y-4"
                        : "-translate-y-4"
                      : "";
                    const isSelected = selected?.id === pokemon.id;
                    return (
                      <button
                        key={pokemon.id}
                        onClick={() => setSelected(pokemon)}
                        type="button"
                        className={`flex flex-row items-center justify-center p-4 hover:bg-yellow-100 rounded transition-transform border-2 ${translateY} ${
                          isSelected
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-transparent"
                        }`}
                      >
                        <PokemonLogo
                          name={
                            typeof pokemon.name === "string"
                              ? pokemon.name
                              : pokemon.name.english
                          }
                          imgSrc={
                            typeof pokemon.image === "string"
                              ? pokemon.image
                              : pokemon.image?.hires ||
                                pokemon.image?.thumbnail ||
                                pokemon.image?.sprite ||
                                ""
                          }
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
          className="w-30 h-12"
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
