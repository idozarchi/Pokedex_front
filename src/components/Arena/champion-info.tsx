import { Progress } from "..//ui/ProgressBar/progress";

export type ChampionPokemon = {
  name: string;
  speed: number;
};

function getProgressBarClass(progress: number) {
  if (progress > 80) return "bg-[var(--color-success-green)]";
  if (progress > 30) return "bg-[var(--color-warning-yellow)]";
  return "bg-[var(--color-error-red)]";
}

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
      } min-w-[286px] max-h-[108px] m-4 p-2 text-white`}
    >
      <h2 className="text-2xl font-semibold mb-4">{pokemon.name}</h2>
      <Progress
        value={progress}
        max={maxProgress}
        className="w-full"
        indicatorClassName={getProgressBarClass(progress)}
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
