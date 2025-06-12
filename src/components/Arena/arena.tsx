import Champion from "./chamion";
import ChampionInfo from "./champion-info";
import DialogueBox from "./dialogue-box";
import GameButton from "./game-button";
import { AttackButton } from "../../assets/pokador";
import { Pokador } from "../../assets/catch-button";
import { ATTACK_BUTTON_BACKGROUND_SRC } from "../../constants/header";

const Arena = ({ className = "" }: { className?: string }) => {
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
            maxProgress={300}
            progress={300}
            pokemon={{ name: "Bulbasaur", speed: 184 }}
            disabled={false}
          />
        </div>
        <Champion
          imageUrl={
            "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/001.png"
          }
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
            maxProgress={340}
            progress={75}
            pokemon={{ name: "Picachu", speed: 240 }}
            disabled={true}
          />
        </div>
        <Champion
          imageUrl={
            "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/025.png"
          }
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
