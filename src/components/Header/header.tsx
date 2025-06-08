import * as React from "react";
import HeaderLogo from "./header-logo";
import HeaderMenu from "./header-menu";
import { Button } from "../ui/Button/button";

export const Header: React.FC = () => (
  <header className="w-full flex items-center justify-center px-6 py-3 bg-white border-b">
    <div className="flex items-center gap-6 flex-shrink-0">
      <HeaderLogo />
      <HeaderMenu />
    </div>
    <div className="flex-1" />
    <Button>Start a Fight</Button>
  </header>
);

export default Header;
