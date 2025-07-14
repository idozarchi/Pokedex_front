import { useState, useEffect } from "react";
import type { Pokemon } from "../types/pokemon";

import { attack as attackApi } from "../api/attack";
import { catchPokemon as catchApi } from "../api/catchPokemon";

export function useArenaState({
  champion1Data,
  champion2Data,
  starter,
  fightId,
}: {
  champion1Data: Pokemon;
  champion2Data: Pokemon;
  starter: "user" | "opponent";
  fightId: string;
}) {
  const [turn, setTurn] = useState<"user" | "opponent">(() => starter);
  const [champ1Life, setChamp1Life] = useState(100);
  const [champ2Life, setChamp2Life] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);
  const [dialogue, setDialogue] = useState<string>(
    starter === "user"
      ? `${champion2Data.name} Is starting the fight!`
      : `${champion1Data.name} Is starting the fight!`
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [canCatchPokemon, setCanCatchPokemon] = useState(0);
  const [isCatching, setIsCatching] = useState(false);
  const [catchAnimationKey, setCatchAnimationKey] = useState(0);
  const [catchAttempts, setCatchAttempts] = useState(0);

  useEffect(() => {
    const maxHP = champion1Data.HP || 100;
    const hpPercent = (champ1Life / maxHP) * 100;

    const canCatch =
      hpPercent <= 30 &&
      turn === "user" &&
      catchAttempts < 3 &&
      !isAttacking &&
      !showEndModal;

    if (canCatch) {
      const interval = setInterval(() => {
        setCanCatchPokemon((tick) => tick + 1);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setCanCatchPokemon(0);
    }
  }, [
    champ1Life,
    champion1Data.HP,
    turn,
    catchAttempts,
    isAttacking,
    showEndModal,
  ]);
  useEffect(() => {
    if (champ1Life <= 0) {
      setWinner(champion2Data.name);
      setShowEndModal(true);
      setDialogue(`${champion1Data.name} fainted!`);
    } else if (champ2Life <= 0) {
      setWinner(champion1Data.name);
      setShowEndModal(true);
      setDialogue(`${champion2Data.name} fainted!`);
    }
  }, [
    champ1Life,
    champ2Life,
    champion1Data.id,
    champion1Data.name,
    champion2Data.name,
  ]);

  const handleAttack = async () => {
    setIsAttacking(true);
    setDialogue(
      turn === "user"
        ? `${champion2Data.name} Attacking!`
        : `${champion1Data.name} Attacking!`
    );
    try {
      const result = await attackApi(fightId);
      if (turn === "user") {
        setTimeout(() => {
          setChamp1Life(result.lifebar);
          setTurn(result.turn);
          setIsAttacking(false);
          setDialogue(`${champion1Data.name} turn`);
        }, 700);
      } else {
        setTimeout(() => {
          setChamp2Life(result.lifebar);
          setTurn(result.turn);
          setIsAttacking(false);
          setDialogue(`${champion2Data.name} turn`);
        }, 600);
      }
      if (result.status === "finished") {
        setShowEndModal(true);
        setWinner(
          result.winnerId === champion2Data.id
            ? champion2Data.name
            : champion1Data.name
        );
        setDialogue("The fight is over!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setDialogue(error.message || "Attack failed");
      setIsAttacking(false);
    }
  };

  const handleCatch = async () => {
    setIsCatching(true);
    setCatchAnimationKey((k) => k + 1);
    try {
      const result = await catchApi(fightId);
      setCatchAttempts((a) => a + 1);

      if (result.status === "finished") {
        setWinner(
          result.winnerId === champion2Data.id
            ? champion2Data.name
            : champion1Data.name
        );
        setShowEndModal(true);
        setDialogue(result.message);
        if (result.winnerId === champion2Data.id) {
        }
      } else {
        setDialogue(result.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setDialogue(error.message || "Catch failed");
    } finally {
      setTimeout(() => setIsCatching(false), 1200);
    }
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
