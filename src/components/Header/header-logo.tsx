import * as React from "react";

export const HeaderLogo: React.FC = () => (
  <div className="flex items-center gap-2">
    <img
      src="/header_logo.png"
      alt="Pokédex Logo"
      className="h-40 w-40 object-contain"
    />
  </div>
);

export default HeaderLogo;
