import { Progress } from "..//ui/ProgressBar/progress";

export type ChampionPokemon = {
  name: string;
  speed: number;
};

export const ChampionInfo = ({
  maxProgress,
  progress,
  pokemon,
  disabled = false,
}: {
  maxProgress: number;
  progress: number;
  pokemon: ChampionPokemon;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`${
        disabled
          ? "bg-extended-gradient-disabled opacity-80"
          : "bg-extended-gradient-default"
      } min-w-[300px] max-h-[150px] m-4 p-2 text-white`}
    >
      <h2 className="text-2xl font-semibold mb-4">{pokemon.name}</h2>
      <Progress
        value={progress}
        max={maxProgress}
        className="w-full [&>*]:bg-green-500"
      />
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="font-light">
          Speed: <span className="font-semibold">{pokemon.speed}</span>
        </span>
        <span className="font-light">
          {(progress / 100) * maxProgress}/{maxProgress}
        </span>
      </div>
    </div>
  );
};

export default ChampionInfo;
