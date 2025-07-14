import { PokemonLogoSVG } from "../../assets/empty-search-icon";

export default function EmptySearch({
  text = "No Pokémon found.",
}: {
  text?: string;
}) {
  return (
    <div
      className="w-full min-h-[50vh] flex flex-col items-center justify-center bg-white border-b"
      style={{ borderRadius: 0 }}
    >
      <PokemonLogoSVG width={150} height={150} />
      <div className="mt-6 text-xl text-gray-500 text-center">{text}</div>
    </div>
  );
}
