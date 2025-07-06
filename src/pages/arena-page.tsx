import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Arena from "../components/Arena/arena";
import { ArenaHeader } from "../components/ArenaHeader/areana-header";
import PreFight from "../components/PreFight/pre-fight";
import { PREFIGHT_BACKGROUND_SRC } from "../constants/header";
import { startFight } from "../api/startFight";
import type { StartFightResponse } from "../api/startFight";
import { fetchMyPokemonsFromBackend } from "../api/fetchMyPokemons";
import type { Pokemon } from "../types/pokemon";
import { switchUserPokemon } from "../api/switchUserPokemon";

export default function ArenaPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId")
    ? Number(params.get("userId"))
    : undefined;
  const [fightData, setFightData] = useState<StartFightResponse | null>(null);
  const [showPreFight, setShowPreFight] = useState(true);
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [currentUser, setCurrentUser] = useState<Pokemon | null>(null);

  // Fetch user's Pokémons
  useEffect(() => {
    fetchMyPokemonsFromBackend(50)
      .then((data) => {
        setMyPokemons(data.results);
      })
      .catch(console.error);
  }, []);

  const startFightWithPokemon = useCallback((pokemonId: number) => {
    startFight(pokemonId)
      .then((data) => {
        setFightData(data);
        setCurrentUser(data.user);
        setShowPreFight(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (userId) {
      startFightWithPokemon(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // When user selects a new Pokémon, start a new fight
  const handlePokemonChange = async (newPokemon: Pokemon) => {
    setCurrentUser(newPokemon);
    if (fightData) {
      try {
        await switchUserPokemon(fightData.fightId, newPokemon.id);
        // Optionally: refetch fightData here if you want to sync HP, etc.
      } catch (e) {
        console.error("Failed to update backend:", e);
      }
    }
  };

  useEffect(() => {
    if (showPreFight) {
      const timer = setTimeout(() => setShowPreFight(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPreFight]);

  if (!fightData || !currentUser) {
    return <div className="p-10">Loading...</div>;
  }

  const { opponent } = fightData;

  return (
    <div className="bg-neutral-100 px-6 py-2 pb-0 mb-0 min-h-screen">
      <ArenaHeader
        headline="Fighting Arena"
        description="Start fighting against your opponent to win the battle"
        className="justify-center items-center text-center mb-2"
        filterTitle="Pokemon"
        filterOptions={myPokemons}
        onPokemonChange={handlePokemonChange}
      />
      <div className="w-full h-screen">
        {showPreFight ? (
          <PreFight
            className="w-full h-[90%]"
            imageUrl={PREFIGHT_BACKGROUND_SRC}
            opponentUrl={opponent?.image || ""}
            userUrl={currentUser?.image || ""}
          />
        ) : (
          <Arena
            className="w-full h-[90%]"
            champion1Data={opponent}
            champion2Data={currentUser}
            starter={fightData.starter}
            fightId={fightData.fightId}
          />
        )}
      </div>
    </div>
  );
}
