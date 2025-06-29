export type PokemonAttribute = {
  label: string;
  value: string;
};

export function getPokemonAttributes({
  height,
  weight,
  category,
  abilities,
}: {
  height: string;
  weight: string;
  category: string;
  abilities: string[];
}): PokemonAttribute[] {
  return [
    { label: "Height", value: height },
    { label: "Weight", value: weight },
    { label: "Category", value: category },
    { label: "Abilities", value: abilities.join(", ") },
  ];
}
