import Champion from "./chamion";
import ChampionInfo from "./champion-info";
import DialogueBox from "./dialogue-box";
import GameButton from "./game-button";
import { AttackButton } from "../../assets/pokador";
import { Pokador } from "../../assets/catch-button";
import { ATTACK_BUTTON_BACKGROUND_SRC } from "../../constants/header";
import { useState, useEffect } from "react";
import { calculateNewLifeBarApi } from "../../api/calculateNewLifeBarApi";
import EndOfFightModal from "../EndOfFightModal/end-of-fight-modal";
import ChoosePokemonModal from "../ChoosePokemonModal/choose-pokemon-modal";

export type ChampionData = {
  name: string;
  speed: number;
  progress: number;
  maxProgress: number;
  imageUrl: string;
};

const Arena = ({
  className = "",
  champion1Data,
  champion2Data,
  starter,
}: {
  className?: string;
  champion1Data: ChampionData;
  champion2Data: ChampionData;
  starter: "user" | "opponent";
}) => {
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
    } else if (champ2Life <= 0) {
      setWinner(champion1Data.name);
      setShowEndModal(true);
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

  return (
    <div
      className={`arena-background ${className} relative bg-cover bg-center w-full`}
      style={{
        backgroundImage: "url('/arena-background.png')",
      }}
    >
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-4">
        <div className="absolute top-0 right-0 m-4 min-w-[50%]">
          <ChampionInfo
            maxProgress={champion1Data.maxProgress}
            progress={champ1Life}
            pokemon={{ name: champion1Data.name, speed: champion1Data.speed }}
            disabled={turn !== "opponent"}
          />
        </div>
        <Champion
          imageUrl={champion1Data.imageUrl}
          className={`absolute bottom-14 left-36${
            isAttacking && turn === "opponent" ? " animate-vibrate" : ""
          }`}
        />
      </div>
      <DialogueBox
        className="w-[30%] h-[13%] relative top-20 justify-center"
        text={dialogue}
      ></DialogueBox>
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-4">
        <div className="absolute bottom-0 left-0 m-4 max-w-[400px]">
          <ChampionInfo
            maxProgress={champion2Data.maxProgress}
            progress={champ2Life}
            pokemon={{ name: champion2Data.name, speed: champion2Data.speed }}
            disabled={turn !== "user"}
          />
        </div>
        <Champion
          imageUrl={champion2Data.imageUrl}
          className={`absolute top-14 right-36 transform scale-x-[-1]${
            isAttacking && turn === "user" ? " animate-vibrate" : ""
          }`}
        />
      </div>
      {/* Only show buttons if not attacking */}
      {!isAttacking && (
        <div className="absolute bottom-8 right-10 flex flex-row gap-6">
          <GameButton
            title="ATTACK"
            svg={<AttackButton />}
            imageUrl={ATTACK_BUTTON_BACKGROUND_SRC}
            onClick={handleAttack}
          />
          <GameButton title="CATCH" svg={<Pokador />} />
        </div>
      )}
      {showEndModal && (
        <EndOfFightModal
          winner={winner || ""}
          winnerImageUrl={
            winner === champion1Data.name
              ? champion1Data.imageUrl
              : winner === champion2Data.name
              ? champion2Data.imageUrl
              : ""
          }
          onPlayAgain={() => setShowChooseModal(true)}
          onReturnToMenu={() => window.location.assign("/")}
        />
      )}
      {showChooseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <ChoosePokemonModal
            onSelect={async (pokemon) => {
              setShowChooseModal(false);
              window.location.href = `/arena?userId=${pokemon.id}`;
            }}
            onClose={() => setShowChooseModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Arena;
