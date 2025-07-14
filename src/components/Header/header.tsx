import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "./header-logo";
import HeaderMenu from "./header-menu";
import { Button } from "../ui/Button/button";
import { HEADER_LOGO_SRC } from "../../constants/header";
import ChoosePokemonModal from "../ChoosePokemonModal/choose-pokemon-modal";

type HeaderMenuItem = {
  name: string | React.ReactNode;
  href: string;
  isActive?: boolean;
};

type HeaderProps = {
  items: HeaderMenuItem[];
  onLogoClick?: () => void;
};

export function Header({ items, onLogoClick }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full flex items-center justify-between px-6 bg-white border-b h-20">
        <div className="flex items-center gap-6 flex-shrink-0">
          <HeaderLogo
            src={HEADER_LOGO_SRC}
            alt="Pokédex Logo"
            onClick={onLogoClick}
          />
          <HeaderMenu items={items} />
        </div>
        <Button size={"lg"} onClick={() => setShowModal(true)}>
          Start a Fight
        </Button>
      </header>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <ChoosePokemonModal
            onSelect={async (pokemon) => {
              setShowModal(false);
              navigate(`/arena?userId=${pokemon.id}`);
            }}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </>
  );
}

export default Header;
