type ChampionProps = {
  imageUrl: string;
  alt?: string;
  size?: number | string; // e.g., 200 or "200px"
  className?: string;
};

const Champion = ({
  imageUrl,
  alt = "Champion Pokémon",
  size = 200,
  className = "",
}: ChampionProps) => (
  <div
    className={`flex justify-center items-center ${className}`}
    style={{ width: size, height: size }}
  >
    <img
      src={imageUrl}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      draggable={false}
    />
  </div>
);

export default Champion;
