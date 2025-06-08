import * as React from "react";
import HeaderLogo from "./header-logo";
import HeaderMenu from "./header-menu";
import { Button } from "../ui/Button/button";

// TODO:
// - Attach functionality for "Start a Fight" button (e.g., open modal, navigate, etc.)
// - Attach actual pages/routes to menu items in HeaderMenu

export const Header: React.FC = () => (
  <header className="w-full flex items-center justify-center px-6 py-3 bg-white border-b">
    <div className="flex items-center gap-6 flex-shrink-0">
      <HeaderLogo src="/header_logo.png" alt="Pokédex Logo" />{" "}
      <HeaderMenu
        items={[
          { name: "All Pokémons", href: "/pokemons", isActive: true },
          { name: "My Pokémons", href: "/my-pokemons" },
        ]}
      />
    </div>
    <div className="flex-1" />
    <Button>Start a Fight</Button>
  </header>
);

export default Header;
