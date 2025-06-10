import HeaderLogo from "./header-logo";
import HeaderMenu from "./header-menu";
import { Button } from "../ui/Button/button";
import { HEADER_LOGO_SRC } from "../../constants/header";

// TODO:
// - Attach functionality for "Start a Fight" button (e.g., open modal, navigate, etc.)
// - Attach actual pages/routes to menu items in HeaderMenu

export function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-6 flex-shrink-0">
        <HeaderLogo src={HEADER_LOGO_SRC} alt="Pokédex Logo" />
        <HeaderMenu
          items={[
            { name: "All Pokémons", href: "/pokemons", isActive: true },
            { name: "My Pokémons", href: "/my-pokemons" },
          ]}
        />
      </div>
      <Button>Start a Fight</Button>
    </header>
  );
}

export default Header;
