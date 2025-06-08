import * as React from "react";

type HeaderLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  src,
  alt,
  className = "h-40 w-40 object-contain",
}) => (
  <div className="flex items-center gap-2">
    <img src={src} alt={alt} className={className} />
  </div>
);

export default HeaderLogo;
