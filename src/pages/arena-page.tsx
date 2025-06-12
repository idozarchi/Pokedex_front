import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Arena from "../components/Arena/arena";
import { ArenaHeader } from "../components/ArenaHeader/areana-header";
import PreFight from "../components/PreFight/pre-fight";
import { PREFIGHT_BACKGROUND_SRC } from "../constants/header";

// All strings and constants are imported from the constants file when it will merged

export default function ArenaPage() {
  const location = useLocation();
  const opponent = location.state?.opponent;
  const user = location.state?.user;
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
            opponentUrl={
              opponent?.image?.hires ||
              opponent?.image?.thumbnail ||
              opponent?.image?.sprite ||
              ""
            }
            userUrl={
              user?.image?.hires ||
              user?.image?.thumbnail ||
              user?.image?.sprite ||
              ""
            }
          />
        ) : (
          <Arena
            className="w-full h-[90%]"
            champion1Data={{
              name:
                typeof opponent?.name === "string"
                  ? opponent?.name
                  : opponent?.name?.english,
              speed: opponent?.base?.Speed || 0,
              progress: 100,
              maxProgress: opponent?.base?.HP || 0,
              imageUrl:
                opponent?.image?.hires ||
                opponent?.image?.thumbnail ||
                opponent?.image?.sprite ||
                "",
            }}
            champion2Data={{
              name:
                typeof user?.name === "string"
                  ? user?.name
                  : user?.name?.english,
              speed: user?.base?.Speed || 0,
              progress: 100,
              maxProgress: user?.base?.HP || 0,
              imageUrl:
                user?.image?.hires ||
                user?.image?.thumbnail ||
                user?.image?.sprite ||
                "",
            }}
          />
        )}
      </div>
    </div>
  );
}
