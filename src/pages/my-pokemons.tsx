import PokemonInfoModal from "../components/PokemonInfoModal/PokemonInfoModal";

export default function MyPokemonsPage() {
  return (
    <div className="p-14 bg-neutral-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Pokémons</h1>
      <p>This is a stub page for your Pokémons. Feature coming soon!</p>
      <PokemonInfoModal
        open={true}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        id={0}
        name={"Bulbasaur"}
        img={
          "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/001.png"
        }
        description={
          " A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
        }
        height={" 0.7 m"}
        weight={"   6.9 kg"}
        category={" Seed Pokémon"}
        abilities={["Overgrow", "Chlorophyll"]}
      ></PokemonInfoModal>
    </div>
  );
}
