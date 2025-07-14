import Champion from "../Arena/chamion";

const PreFight = ({
  className = "",
  imageUrl,
  opponentUrl,
  userUrl,
}: {
  className?: string;
  imageUrl: string;
  opponentUrl: string;
  userUrl: string;
}) => {
  return (
    <div
      className={`w-full bg-cover bg-center relative ${className}`}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="absolute top-20 left-45">
        <Champion size={230} imageUrl={userUrl} />
      </div>
      <div className="absolute bottom-20 right-45">
        <Champion size={230} imageUrl={opponentUrl} />
      </div>
    </div>
  );
};

export default PreFight;
