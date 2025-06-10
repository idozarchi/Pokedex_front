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
}: PokemonLogoProps) =>
  imgSrc ? (
    <img
      src={imgSrc}
      width={size}
      height={size}
      alt="Pokémon Logo"
      {...props}
    />
  ) : (
    <PokemonLogoSVG width={size} height={size} {...props} />
  );

export default PokemonLogo;
