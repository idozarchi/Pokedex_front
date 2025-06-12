import Champion from "../Arena/chamion";

const PreFight = ({
  className = "",
  imageUrl,
  champion1Url,
  champion2Url,
}: {
  className?: string;
  imageUrl: string;
  champion1Url: string;
  champion2Url: string;
}) => {
  return (
    <div
      className={`w-full bg-cover bg-center relative ${className}`}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    >
      <div className="absolute top-20 left-45">
        <Champion size={230} imageUrl={champion1Url} />
      </div>
      <div className="absolute bottom-20 right-45">
        <Champion size={230} imageUrl={champion2Url} />
      </div>
    </div>
  );
};

export default PreFight;
