import { useState, useEffect } from "react";
import { calculateNewLifeBarApi } from "../../api/calculateNewLifeBarApi";
import type { ChampionData } from "./arena";

export function useArenaState({
  champion1Data,
  champion2Data,
  starter,
}: {
  champion1Data: ChampionData;
  champion2Data: ChampionData;
  starter: "user" | "opponent";
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
  }, [champ1Life, champ2Life, champion1Data.name, champion2Data.name]);

  const handleAttack = async () => {
    setIsAttacking(true);
    setDialogue(
      turn === "user"
        ? `${champion2Data.name} Attacking!`
        : `${champion1Data.name} Attacking!`
    );
    if (turn === "user") {
      const newLife = await calculateNewLifeBarApi(
        champion2Data.speed,
        champ1Life,
        champion1Data.maxProgress
      );
      setTimeout(() => {
        setChamp1Life(newLife);
        setTurn("opponent");
        setIsAttacking(false);
        setDialogue(`${champion1Data.name} turn`);
      }, 700);
    } else {
      const newLife = await calculateNewLifeBarApi(
        champion1Data.speed,
        champ2Life,
        champion2Data.maxProgress
      );
      setTimeout(() => {
        setChamp2Life(newLife);
        setTurn("user");
        setIsAttacking(false);
        setDialogue(`${champion2Data.name} turn`);
      }, 600);
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
  };
}
