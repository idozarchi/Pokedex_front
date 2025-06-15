import { calculateNewLifeBar } from "./calculateNewLifeBar";

export function calculateNewLifeBarApi(
  power: number,
  currentLife: number,
  maxLife: number
): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        resolve(currentLife);
      } else {
        resolve(calculateNewLifeBar(power, currentLife, maxLife));
      }
    }, 200);
  });
}
