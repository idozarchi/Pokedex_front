import Champion from "./chamion";
import ChampionInfo from "./champion-info";
import DialogueBox from "./dialogue-box";
import GameButton from "./game-button";
import { AttackButton } from "../../assets/attack-button";
import { Pokador } from "../../assets/catch-button";
import { ATTACK_BUTTON_BACKGROUND_SRC } from "../../constants/header";
import { useArenaState } from "../../hooks/useArenaState";
import EndOfFightModal from "../EndOfFightModal/end-of-fight-modal";
import ChoosePokemonModal from "../ChoosePokemonModal/choose-pokemon-modal";
import type { Pokemon } from "../../types/pokemon";

export type ChampionData = {
  id: number;
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
  fightId,
  initialChamp1HP,
  initialChamp2HP,
  onTurnChange,
}: {
  className?: string;
  champion1Data: Pokemon;
  champion2Data: Pokemon;
  starter: "user" | "opponent";
  fightId: string;
  initialChamp1HP?: number;
  initialChamp2HP?: number;
  onTurnChange?: (turn: "user" | "opponent") => void;
}) => {
  const {
    turn,
    champ1Life,
    champ2Life,
    isAttacking,
    dialogue,
    showEndModal,
    winner,
    showChooseModal,
    handleAttack,
    setShowChooseModal,
    canCatchPokemon,
    handleCatch,
    isCatching,
    catchAnimationKey,
  } = useArenaState({
    champion1Data,
    champion2Data,
    starter,
    fightId,
    initialChamp1HP,
    initialChamp2HP,
    onTurnChange,
  });

  return (
    <div
      className={`arena-background ${className} pb-0 mb-0 relative bg-cover bg-center w-full h-max-[570px]`}
      style={{
        backgroundImage: "url('/arena-background.png')",
      }}
    >
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-2">
        <div className="absolute top-0 right-0 m-3 w-[40%]">
          <ChampionInfo
            maxProgress={100}
            progress={champ1Life}
            actualMaxHP={champion1Data.HP || 100}
            pokemon={{
              name: champion1Data.name,
              speed: champion1Data.speed || 0,
            }}
            disabled={turn !== "opponent"}
          />
        </div>
        <Champion
          imageUrl={champion1Data.image || ""}
          className={`absolute bottom-20 left-54 ${
            isAttacking && turn === "opponent" ? " animate-vibrate" : ""
          }${champ1Life <= 0 ? " animate-faint-right" : ""}`}
        />
      </div>
      <DialogueBox
        className="w-[40%] h-[17%] relative top-30 justify-center"
        text={dialogue}
      ></DialogueBox>
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-2">
        <div className="absolute bottom-0 left-0 m-3 w-[40%]">
          <ChampionInfo
            maxProgress={100}
            progress={champ2Life}
            actualMaxHP={champion2Data.HP || 100}
            pokemon={{
              name: champion2Data.name,
              speed: champion2Data.speed || 0,
            }}
            disabled={turn !== "user"}
          />
        </div>
        <Champion
          imageUrl={champion2Data.image || ""}
          className={`absolute top-20 right-54 transform scale-x-[-1] ${
            isAttacking && turn === "user" ? "animate-vibrate" : ""
          }${champ2Life <= 0 ? " animate-faint-right" : ""}`}
        />
      </div>
      {!isAttacking && (
        <div className="absolute bottom-5 right-6 flex flex-row gap-6">
          <GameButton
            title="ATTACK"
            svg={<AttackButton />}
            imageUrl={ATTACK_BUTTON_BACKGROUND_SRC}
            onClick={handleAttack}
          />
          <GameButton
            title="CATCH"
            svg={<Pokador />}
            className={canCatchPokemon ? "animate-vibrate" : ""}
            key={canCatchPokemon}
            onClick={handleCatch}
            disabled={turn === "opponent" || !canCatchPokemon}
          />
        </div>
      )}
      {isCatching && (
        <div
          key={catchAnimationKey}
          className="fixed left-1/2 top-1/2 z-50 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            animation: `pokador-catch-move 1.2s cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        >
          <div>
            <Pokador size={200} />
          </div>
        </div>
      )}
      {showEndModal && (
        <EndOfFightModal
          title={
            winner === champion1Data.name
              ? `${champion2Data.name} Lost the match`
              : `You Caught ${champion1Data.name}!`
          }
          winner={winner || ""}
          winnerImageUrl={
            winner === champion1Data.name
              ? champion2Data.image || ""
              : champion1Data.image || ""
          }
          description={
            winner !== champion1Data.name
              ? {
                  title: champion1Data.name,
                  attributes: [
                    { label: "Speed", value: String(champion1Data.speed) },
                    { label: "Category", value: champion1Data.category || "?" },
                    {
                      label: "Abilities",
                      value:
                        champion1Data.abilities?.map((a) => a[0]).join(", ") ||
                        "",
                    },
                  ],
                }
              : undefined
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
            cancelId={
              winner !== champion2Data.name ? champion2Data.id : undefined
            }
          />
        </div>
      )}
    </div>
  );
};

export default Arena;
