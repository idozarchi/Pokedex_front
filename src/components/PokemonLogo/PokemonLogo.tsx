import * as React from "react";

export type PokemonLogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  imgSrc?: string;
};

export const PokemonLogo: React.FC<PokemonLogoProps> = ({
  size = 48,
  imgSrc,
  ...props
}) =>
  imgSrc ? (
    <img
      src={imgSrc}
      width={size}
      height={size}
      alt="Pokémon Logo"
      {...props}
    />
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      {...props}
      aria-label="Pokémon Logo"
    >
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="#2A75BB"
        strokeWidth="4"
        fill="#FFCB05"
      />
      <circle
        cx="24"
        cy="24"
        r="10"
        stroke="#2A75BB"
        strokeWidth="4"
        fill="#fff"
      />
      <circle cx="24" cy="24" r="5" fill="#2A75BB" />
      {/* You can replace this with a more detailed SVG for the real Pokémon logo */}
    </svg>
  );

export default PokemonLogo;
