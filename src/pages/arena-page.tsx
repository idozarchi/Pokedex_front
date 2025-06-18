import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Arena from "../components/Arena/arena";
import { ArenaHeader } from "../components/ArenaHeader/areana-header";
import PreFight from "../components/PreFight/pre-fight";
import { PREFIGHT_BACKGROUND_SRC } from "../constants/header";
import { startFight } from "../api/startFight";
import type { StartFightResponse } from "../api/startFight";
import { fetchMyPokemons } from "../api/fetchPokemons";
import type { Pokemon } from "../api/fetchPokemons";

export default function ArenaPage() {
  const location = useLocation();
  // Extract userId from query string
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId")
    ? Number(params.get("userId"))
    : undefined;
  const [fightData, setFightData] = useState<StartFightResponse | null>(null);
  const [showPreFight, setShowPreFight] = useState(true);
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [currentUser, setCurrentUser] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (userId) {
      startFight(userId)
        .then((data) => {
          setFightData(data);
          setCurrentUser(data.user);
        })
        .catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    fetchMyPokemons(50)
      .then((data) => {
        setMyPokemons(data.results);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreFight(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePokemonChange = (newPokemon: Pokemon) => {
    setCurrentUser(newPokemon);
  };

  if (!fightData || !currentUser) {
    return <div className="p-10">Loading...</div>;
  }

  const { opponent } = fightData;

  return (
    <div className="p-10 min-h-screen">
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
            opponentUrl={
              opponent?.image?.hires ||
              opponent?.image?.thumbnail ||
              opponent?.image?.sprite ||
              ""
            }
            userUrl={
              currentUser?.image?.hires ||
              currentUser?.image?.thumbnail ||
              currentUser?.image?.sprite ||
              ""
            }
          />
        ) : (
          <Arena
            className="w-full h-[90%]"
            champion1Data={opponent}
            champion2Data={currentUser}
            starter={fightData.starter}
          />
        )}
      </div>
    </div>
  );
}
