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
    <Card className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-[90vw] relative max-h-[90vh] flex flex-col">
      <button onClick={onClose} className="absolute top-4 right-4">
        <ClearIcon className="cursor-pointer" />
      </button>
      <CardHeader>
        <CardTitle>Choose Your Pokémon</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
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
                    return (
                      <button
                        key={pokemon.id}
                        onClick={() => setSelected(pokemon)}
                        type="button"
                        className={`flex flex-row items-center rounded-full justify-center hover:border-blue-600 transition-transform border-2 ${translateY} ${
                          isSelected ? "border-blue-600" : "border-transparent"
                        }`}
                        style={{ padding: 0 }}
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
