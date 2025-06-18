import Champion from "./chamion";
import ChampionInfo from "./champion-info";
import DialogueBox from "./dialogue-box";
import GameButton from "./game-button";
import { AttackButton } from "../../assets/pokador";
import { Pokador } from "../../assets/catch-button";
import { ATTACK_BUTTON_BACKGROUND_SRC } from "../../constants/header";
import { useArenaState } from "./useArenaState";
import EndOfFightModal from "../EndOfFightModal/end-of-fight-modal";
import ChoosePokemonModal from "../ChoosePokemonModal/choose-pokemon-modal";
import type { Pokemon } from "../../api/fetchPokemons";

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
}: {
  className?: string;
  champion1Data: Pokemon;
  champion2Data: Pokemon;
  starter: "user" | "opponent";
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
  } = useArenaState({ champion1Data, champion2Data, starter });

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
            maxProgress={champion1Data.base.HP}
            progress={champ1Life}
            pokemon={{
              name: champion1Data.name.english,
              speed: champion1Data.base.Speed,
            }}
            disabled={turn !== "opponent"}
          />
        </div>
        <Champion
          imageUrl={champion1Data.image?.hires || ""}
          className={`absolute bottom-14 left-36 ${
            isAttacking && turn === "opponent" ? " animate-vibrate" : ""
          }${champ1Life <= 0 ? " animate-faint-right" : ""}`}
        />
      </div>
      <DialogueBox
        className="w-[30%] h-[13%] relative top-20 justify-center"
        text={dialogue}
      ></DialogueBox>
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-4">
        <div className="absolute bottom-0 left-0 m-4 max-w-[400px]">
          <ChampionInfo
            maxProgress={champion2Data.base.HP}
            progress={champ2Life}
            pokemon={{
              name: champion2Data.name.english,
              speed: champion2Data.base.Speed,
            }}
            disabled={turn !== "user"}
          />
        </div>
        <Champion
          imageUrl={champion2Data.image?.hires || ""}
          className={`absolute top-14 right-36 transform scale-x-[-1]${
            isAttacking && turn === "user" ? " animate-vibrate" : ""
          }${champ2Life <= 0 ? " animate-faint-right" : ""}`}
        />
      </div>
      {!isAttacking && (
        <div className="absolute bottom-8 right-10 flex flex-row gap-6">
          <GameButton
            title="ATTACK"
            svg={<AttackButton />}
            imageUrl={ATTACK_BUTTON_BACKGROUND_SRC}
            onClick={handleAttack}
          />
          <GameButton
            title="CATCH"
            svg={<Pokador />}
            className={
              champ1Life > 0 && champ1Life < champion1Data.base.HP * 0.3
                ? "animate-vibrate"
                : ""
            }
            key={canCatchPokemon}
            onClick={handleCatch}
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
            winner === champion1Data.name.english
              ? `${champion2Data.name.english} Lost the match`
              : `You Caught ${champion1Data.name.english}!`
          }
          winner={winner || ""}
          winnerImageUrl={
            winner === champion1Data.name.english
              ? champion2Data.image?.hires || ""
              : champion1Data.image?.hires || ""
          }
          description={
            winner !== champion1Data.name.english
              ? {
                  title: champion1Data.name.english,
                  attributes: [
                    { label: "Speed", value: String(champion1Data.base.Speed) },
                    { label: "Category", value: champion1Data.species || "?" },
                    {
                      label: "Abilities",
                      value:
                        champion1Data.profile?.ability
                          ?.map((a) => a[0])
                          .join(", ") || "",
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
          />
        </div>
      )}
    </div>
  );
};

export default Arena;
