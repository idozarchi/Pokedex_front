import { useState, useEffect } from "react";
import { calculateNewLifeBarApi } from "../../api/calculateNewLifeBarApi";
import type { Pokemon } from "../../api/fetchPokemons";

import { putPokemon } from "../../api/putPokemon";

export function useArenaState({
  champion1Data,
  champion2Data,
  starter,
}: {
  champion1Data: Pokemon;
  champion2Data: Pokemon;
  starter: "user" | "opponent";
}) {
  const [turn, setTurn] = useState<"user" | "opponent">(() => starter);
  const [champ1Life, setChamp1Life] = useState(100);
  const [champ2Life, setChamp2Life] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);
  const [dialogue, setDialogue] = useState<string>(
    starter === "user"
      ? `${champion2Data.name.english} Is starting the fight!`
      : `${champion1Data.name.english} Is starting the fight!`
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [canCatchPokemon, setCanCatchPokemon] = useState(0);
  const [isCatching, setIsCatching] = useState(false);
  const [catchAnimationKey, setCatchAnimationKey] = useState(0);
  const [catchAttempts, setCatchAttempts] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (
      champ1Life > 0 &&
      champ1Life < champion1Data.base.HP * 0.5 &&
      !isAttacking
    ) {
      interval = setInterval(() => {
        setCanCatchPokemon((tick) => tick + 1);
      }, 500);
    } else {
      setCanCatchPokemon(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [champ1Life, champion1Data.base.HP, isAttacking]);

  useEffect(() => {
    if (champ1Life <= 0) {
      setWinner(champion2Data.name.english);
      setShowEndModal(true);
      setDialogue(`${champion1Data.name.english} fainted!`);
      putPokemon(champion1Data.id);
    } else if (champ2Life <= 0) {
      setWinner(champion1Data.name.english);
      setShowEndModal(true);
      setDialogue(`${champion2Data.name.english} fainted!`);
    }
  }, [
    champ1Life,
    champ2Life,
    champion1Data.id,
    champion1Data.name.english,
    champion2Data.name.english,
  ]);

  const handleAttack = async () => {
    setIsAttacking(true);
    setDialogue(
      turn === "user"
        ? `${champion2Data.name.english} Attacking!`
        : `${champion1Data.name.english} Attacking!`
    );
    if (turn === "user") {
      const newLife = await calculateNewLifeBarApi(
        champion2Data.base.Speed,
        champ1Life,
        champion1Data.base.HP
      );
      setTimeout(() => {
        setChamp1Life(newLife);
        setTurn("opponent");
        setIsAttacking(false);
        setDialogue(`${champion1Data.name.english} turn`);
      }, 700);
    } else {
      const newLife = await calculateNewLifeBarApi(
        champion1Data.base.Speed,
        champ2Life,
        champion2Data.base.HP
      );
      setTimeout(() => {
        setChamp2Life(newLife);
        setTurn("user");
        setIsAttacking(false);
        setDialogue(`${champion2Data.name.english} turn`);
      }, 600);
    }
  };

  const handleCatch = () => {
    if (catchAttempts >= 2) {
      setIsCatching(true);
      setCatchAnimationKey((k) => k + 1);
      setTimeout(() => {
        setIsCatching(false);
        setWinner(champion1Data.name.english);
        setShowEndModal(true);
        setDialogue("The Pokémon fled!");
      }, 1200);
      setCatchAttempts((a) => a + 1);
      setTurn((prev) => (prev === "user" ? "opponent" : "user"));
      return;
    }
    setIsCatching(true);
    setCatchAnimationKey((k) => k + 1);

    const lifePercent = champ1Life / champion1Data.base.HP;
    const catchProbability = Math.max(0.1, 1 - lifePercent); // min 10% chance
    const random = Math.random();
    const caught = random < catchProbability;

    if (!canCatchPokemon || !caught) {
      setDialogue("He got away!");
      setTimeout(() => {
        setIsCatching(false);
        setCatchAttempts((a) => a + 1);
      }, 1200);
      return;
    }
    setTimeout(() => {
      setIsCatching(false);
      setWinner(champion2Data.name.english); // user caught the opponent's Pokémon
      setShowEndModal(true);
      putPokemon(champion1Data.id);
    }, 1200);
    setCatchAttempts((a) => a + 1);
    setTurn((prev) => (prev === "user" ? "opponent" : "user"));
  };

  return {
    turn,
    setTurn,
    champ1Life,
    setChamp1Life,
    champ2Life,
    setChamp2Life,
    isAttacking,
    setIsAttacking,
    dialogue,
    setDialogue,
    showEndModal,
    setShowEndModal,
    winner,
    setWinner,
    showChooseModal,
    setShowChooseModal,
    handleAttack,
    handleCatch,
    canCatchPokemon,
    isCatching,
    catchAnimationKey,
    catchAttempts,
  };
}
