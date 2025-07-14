import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
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
  const location = useLocation();
  const isOnArenaPage = location.pathname === "/arena";

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

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
        <div className="flex items-center gap-3">
          <Button
            size={"lg"}
            onClick={() => setShowModal(true)}
            disabled={isOnArenaPage}
          >
            Start a Fight
          </Button>
          <Button size={"lg"} variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
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
