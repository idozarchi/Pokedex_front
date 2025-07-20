import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Arena from "../components/Arena/arena";
import { ArenaHeader } from "../components/ArenaHeader/areana-header";
import PreFight from "../components/PreFight/pre-fight";
import { PREFIGHT_BACKGROUND_SRC } from "../constants/header";
import { startFight } from "../api/startFight";
import { getFight } from "../api/getFight";
import type { GetFightResponse } from "../api/getFight";
import { fetchMyPokemonsFromBackend } from "../api/fetchMyPokemons";
import type { Pokemon } from "../types/pokemon";
import { switchUserPokemon } from "../api/switchUserPokemon";
import CircularLoader from "../components/ui/CircularLoader/CircularLoader";

export default function ArenaPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId")
    ? Number(params.get("userId"))
    : undefined;
  const fightId = params.get("fightId");
  const opponentId = params.get("opponentId")
    ? Number(params.get("opponentId"))
    : undefined;

  const [currentFight, setCurrentFight] = useState<GetFightResponse | null>(
    null
  );
  const [showPreFight, setShowPreFight] = useState(true);
  const [myPokemons, setMyPokemons] = useState<Pokemon[]>([]);
  const [currentUser, setCurrentUser] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTurn, setCurrentTurn] = useState<"user" | "opponent">("user");

  useEffect(() => {
    fetchMyPokemonsFromBackend(50)
      .then((data) => {
        setMyPokemons(data.results);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const initializeFight = async () => {
      setIsLoading(true);
      try {
        if (fightId) {
          const fight = await getFight(fightId);
          setCurrentFight(fight);
          setCurrentUser({
            ...fight.userPokemon,
            abilities:
              fight.userPokemon.abilities?.map((ability) =>
                Array.isArray(ability) ? ability[0] : ability
              ) || [],
          });
          setShowPreFight(false);
          setCurrentTurn(fight.turn);
        } else if (userId) {
          const newFight = await startFight(userId, opponentId);

          setCurrentFight({
            fightId: newFight.fightId,
            userPokemon: {
              ...newFight.user,
              image: newFight.user.image || "",
              HP: newFight.user.HP || 100,
              speed: newFight.user.speed || 0,
              abilities:
                newFight.user.abilities?.map((ability) => [ability]) || [],
            },
            opponentPokemon: {
              ...newFight.opponent,
              image: newFight.opponent.image || "",
              HP: newFight.opponent.HP || 100,
              speed: newFight.opponent.speed || 0,
              abilities:
                newFight.opponent.abilities?.map((ability) => [ability]) || [],
            },
            userPokemonHP: newFight.user.HP || 100,
            opponentPokemonHP: newFight.opponent.HP || 100,
            turn: newFight.starter,
            battleLog: [],
            winnerId: null,
            status: "in-progress",
            catchAttempts: 0,
          });
          setCurrentUser(newFight.user);
          setShowPreFight(true);
          setCurrentTurn(newFight.starter);

          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("fightId", newFight.fightId);
          newUrl.searchParams.delete("userId");
          window.history.replaceState({}, "", newUrl.toString());
        }
      } catch (error) {
        console.error("Failed to initialize fight:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFight();
  }, [fightId, userId]);

  const handlePokemonChange = async (newPokemon: Pokemon) => {
    if (currentFight) {
      try {
        const result = await switchUserPokemon(
          currentFight.fightId,
          newPokemon.id
        );
        if (result.success && result.fight) {
          setCurrentFight(result.fight);
          setCurrentUser({
            ...result.fight.userPokemon,
            abilities:
              result.fight.userPokemon.abilities?.map((ability) =>
                Array.isArray(ability) ? ability[0] : ability
              ) || [],
          });
        }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularLoader text="Loading fight..." />
      </div>
    );
  }

  if (!currentFight || !currentUser) {
    return <div className="p-10">No fight data available</div>;
  }

  const opponent = {
    ...currentFight.opponentPokemon,
    abilities:
      currentFight.opponentPokemon.abilities?.map((ability) =>
        Array.isArray(ability) ? ability[0] : ability
      ) || [],
  };

  const opponentMaxHP = currentFight.opponentPokemon.HP || 100;
  const userMaxHP = currentFight.userPokemon.HP || 100;
  const opponentHPPercent =
    (currentFight.opponentPokemonHP / opponentMaxHP) * 100;
  const userHPPercent = (currentFight.userPokemonHP / userMaxHP) * 100;

  return (
    <div className="bg-neutral-100 px-6 py-2 pb-0 mb-0 min-h-screen">
      <ArenaHeader
        headline="Fighting Arena"
        description="Start fighting against your opponent to win the battle"
        className="justify-center items-center text-center mb-2"
        filterTitle={currentUser?.name || "Pokemon"}
        filterOptions={myPokemons}
        onPokemonChange={handlePokemonChange}
        currentTurn={currentTurn}
        isInFight={!showPreFight}
        filterTooltip={
          <div className="text-sm">
            <div className="font-semibold mb-2">Switch Pokémon</div>
            <p className="mb-1">
              Select a different Pokémon to switch during battle.
            </p>
            <p className="text-yellow-300 font-medium">
              ⚠️ You can only switch once per battle!
            </p>
          </div>
        }
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
            key={`arena-${currentUser.id}-${currentFight.fightId}`}
            className="w-full h-[90%]"
            champion1Data={opponent}
            champion2Data={currentUser}
            starter={currentFight.turn}
            fightId={currentFight.fightId}
            initialChamp1HP={opponentHPPercent}
            initialChamp2HP={userHPPercent}
            onTurnChange={setCurrentTurn}
          />
        )}
      </div>
    </div>
  );
}
