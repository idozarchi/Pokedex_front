import * as React from "react";
import { PokemonLogoSVG } from "../../assets/PokemonLogoSVG";

export type PokemonLogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  imgSrc?: string;
};

export const PokemonLogo = ({
  size = 48,
  imgSrc,
  ...props
}: PokemonLogoProps) => (
  <div
    className="flex items-center justify-center rounded-full bg-primary-50 overflow-hidden"
    style={{ width: size, height: size }}
  >
    {imgSrc ? (
      <img
        src={imgSrc}
        alt="Pokémon Logo"
        className="object-contain max-w-full max-h-full"
        style={{ width: size * 0.8, height: size * 0.8 }}
      />
    ) : (
      <PokemonLogoSVG width={size * 0.75} height={size * 0.75} {...props} />
    )}
  </div>
);

export default PokemonLogo;
