import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card/card";
import { Separator } from "../ui/Separator/separator";
import { Button } from "../ui/Button/button";
import Champion from "../Arena/chamion";

type EndOfFightModalProps = {
  winner: string;
  winnerImageUrl: string;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
  title?: string;
  description?: {
    title: string;
    attributes: { label: string; value: string }[];
  };
};

export const EndOfFightModal = ({
  winnerImageUrl,
  onPlayAgain,
  onReturnToMenu,
  title,
  description,
}: EndOfFightModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-96 p-6">
        <CardHeader>
          <CardTitle className="text-xl mb-4">
            {title || "Fight Over!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-6">
            <Champion
              imageUrl={winnerImageUrl}
              size={200}
              className="mx-auto"
            />
          </div>
          {/* Render description attributes if present */}
          {description && description.attributes.length > 0 && (
            <div className="flex flex-col space-x-5 mb-4 w-full bg-system-background p-4">
              <CardTitle className="text-lg mb-4">
                {description.title}
              </CardTitle>
              <div className="flex flex-row space-x-5 mb-4">
                {description.attributes.map((attr) => (
                  <div className="flex flex-col space-y-2" key={attr.label}>
                    <span className="font-normal text-gray-400 mr-1 text-xs">
                      {attr.label}
                    </span>
                    <span>{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
