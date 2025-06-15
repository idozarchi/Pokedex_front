import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card/card";
import { Separator } from "../ui/Separator/separator";
import { Button } from "../ui/Button/button";
import Champion from "../Arena/chamion";

type EndOfFightModalProps = {
  winner: string;
  winnerImageUrl: string;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
};

export const EndOfFightModal = ({
  winner,
  winnerImageUrl,
  onPlayAgain,
  onReturnToMenu,
}: EndOfFightModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-96 p-6 text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Fight Over!</CardTitle>
          <p className="text-xl mb-6">{winner} wins the battle!</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <div className="mb-6">
            <Champion
              imageUrl={winnerImageUrl}
              size={200}
              className="mx-auto"
            />
          </div>

          <Separator className="my-4 w-full" />

          <div className="flex gap-4 mt-6">
            <Button onClick={onPlayAgain} className="px-6 py-2">
              Switch Pokemon
            </Button>
            <Button
              variant="secondary"
              onClick={onReturnToMenu}
              className="px-6 py-2"
            >
              End Match
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndOfFightModal;
