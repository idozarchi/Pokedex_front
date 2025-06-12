import { useEffect, useState } from "react";
import Arena from "../components/Arena/arena";
import { ArenaHeader } from "../components/ArenaHeader/areana-header";
import PreFight from "../components/PreFight/pre-fight";
import { PREFIGHT_BACKGROUND_SRC } from "../constants/header";

// All strings and constants are imported from the constants file when it will merged

export default function ArenaPage() {
  const [showPreFight, setShowPreFight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreFight(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-10 min-h-screen">
      <ArenaHeader
        headline="Fighting Arena"
        description="Start fighting against your opponent to win the battle"
        className="justify-center items-center text-center mb-2"
      />
      <div className="w-full h-screen">
        {showPreFight ? (
          <PreFight
            className="w-full h-[90%]"
            imageUrl={PREFIGHT_BACKGROUND_SRC}
            champion1Url={
              "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/025.png"
            }
            champion2Url={
              "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/001.png"
            }
          />
        ) : (
          <Arena
            className="w-full h-[90%]"
            champion1Data={{
              name: "Bulbazar",
              speed: 60,
              progress: 75,
              maxProgress: 340,
              imageUrl:
                "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/001.png",
            }}
            champion2Data={{
              name: "Picatchu",
              speed: 80,
              progress: 100,
              maxProgress: 300,
              imageUrl:
                "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/025.png",
            }}
          />
        )}
      </div>
    </div>
  );
}
