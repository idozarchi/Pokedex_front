import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/Card/card";
import { Separator } from "../ui/Separator/separator";
import { ClearIcon } from "../../assets/ClearIcon";
import { getPokemonAttributes } from "../../utils/pokemonAttributes";
import type { PokemonAttribute } from "../../utils/pokemonAttributes";

type PokemonInfoModalProps = {
  open: boolean;
  onClose: () => void;
  id?: number;
  name?: string;
  img?: string;
  description?: string;
  height?: string;
  weight?: string;
  category?: string;
  abilities?: string[];
};

export function PokemonInfoModal({
  open,
  onClose,
  id,
  name,
  img,
  description,
  height,
  weight,
  category,
  abilities,
}: PokemonInfoModalProps) {
  if (!open) return null;

  const attributes: PokemonAttribute[] = getPokemonAttributes({
    height: height ?? "?",
    weight: weight ?? "?",
    category: category ?? "?",
    abilities: abilities ?? [],
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="max-w-[502px] w-full rounded-md">
        <CardHeader className="flex flex-col items-start w-full">
          <div className="flex flex-row items-center w-full">
            <span className="text-xs text-gray-500">#{id ?? "?"}</span>
            <span className="flex-1" />
            <button onClick={onClose} className="ml-auto">
              <ClearIcon className="cursor-pointer" />
            </button>
          </div>
          <CardTitle className="text-2xl font-normal mb-2">{name}</CardTitle>
        </CardHeader>
        <img
          src={img || "/pokemon-placeholder.png"}
          alt={name ?? "?"}
          className="mb-1 w-[180px] h-[165px] mx-auto"
        />
        <CardContent>
          <CardDescription className="bg-neutral-100 p-4">
            <span className="mb-2">{description ?? "?"}</span>
            <Separator className="my-4" />
            <div className="flex flex-row space-x-5">
              {attributes.length > 0 ? (
                attributes.map((attr) => (
                  <div className="flex flex-col space-y-2" key={attr.label}>
                    <span className="font-normal text-gray-400 mr-1 text-xs">
                      {attr.label}
                    </span>
                    <span>{attr.value ?? "?"}</span>
                  </div>
                ))
              ) : (
                <span>?</span>
              )}
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default PokemonInfoModal;
