import HeaderLogo from "./header-logo";
import HeaderMenu from "./header-menu";
import { Button } from "../ui/Button/button";
import { HEADER_LOGO_SRC } from "../../constants/header";

type HeaderMenuItem = {
  name: string;
  href: string;
  isActive?: boolean;
};

type HeaderProps = {
  items: HeaderMenuItem[];
};

export function Header({ items }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="flex items-center gap-6 flex-shrink-0">
        <HeaderLogo src={HEADER_LOGO_SRC} alt="Pokédex Logo" />
        <HeaderMenu items={items} />
      </div>
      <Button>Start a Fight</Button>
    </header>
  );
}

export default Header;
