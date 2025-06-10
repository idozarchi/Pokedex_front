import * as React from "react";

export const PokemonLogoSVG = ({
  width = 48,
  height = 48,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
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
  </svg>
);
