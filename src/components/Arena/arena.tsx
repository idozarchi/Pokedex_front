import Champion from "./chamion";
import ChampionInfo from "./champion-info";
import DialogueBox from "./dialogue-box";
import GameButton from "./game-button";
import { AttackButton } from "../../assets/pokador";
import { Pokador } from "../../assets/catch-button";
import { ATTACK_BUTTON_BACKGROUND_SRC } from "../../constants/header";
import { useState } from "react";

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
            progress={champion1Data.progress}
            pokemon={{ name: champion1Data.name, speed: champion1Data.speed }}
            disabled={turn !== "opponent"}
          />
        </div>
        <Champion
          imageUrl={champion1Data.imageUrl}
          className="absolute bottom-14 left-36"
        />
      </div>
      <DialogueBox
        className="w-[30%] h-[13%] relative top-20 justify-center"
        text={"Bulbasaur lost 50 points!"}
      ></DialogueBox>
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-4">
        <div className="absolute bottom-0 left-0 m-4 max-w-[400px]">
          <ChampionInfo
            maxProgress={champion2Data.maxProgress}
            progress={champion2Data.progress}
            pokemon={{ name: champion2Data.name, speed: champion2Data.speed }}
            disabled={turn !== "user"}
          />
        </div>
        <Champion
          imageUrl={champion2Data.imageUrl}
          className="absolute top-14 right-36 transform scale-x-[-1]"
        />
      </div>
      <div className="absolute bottom-8 right-10 flex flex-row gap-6">
        <GameButton
          title="ATTACK"
          svg={<AttackButton />}
          imageUrl={ATTACK_BUTTON_BACKGROUND_SRC}
        />
        <GameButton title="CATCH" svg={<Pokador />} />
      </div>
    </div>
  );
};

export default Arena;
