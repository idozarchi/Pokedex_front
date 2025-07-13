import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header/header";
import AllPokemonsPage from "./all-pokemons";
import MyPokemonsPage from "./my-pokemons";
import ArenaPage from "./arena-page";
import { Pokador } from "../assets/catch-button";

const HomeContent = () => {
  const location = useLocation();
  const items = [
    {
      name: "All Pokémons",
      href: "/all-pokemons",
      isActive: location.pathname === "/all-pokemons",
    },
    {
      name: (
        <span className="flex items-center gap-2">
          My Pokémons
          <span className="inline-flex items-center justify-center w-5 h-5">
            <Pokador size={18} />
          </span>
        </span>
      ),
      href: "/my-pokemons",
      isActive: location.pathname === "/my-pokemons",
    },
  ];

  return (
    <>
      <Header items={items} />
      <Routes>
        <Route path="/all-pokemons" element={<AllPokemonsPage />} />
        <Route path="/my-pokemons" element={<MyPokemonsPage />} />
        <Route path="/arena" element={<ArenaPage />} />
        <Route path="*" element={<Navigate to="/all-pokemons" replace />} />
      </Routes>
    </>
  );
};

function HomePage() {
  return <HomeContent />;
}

export default HomePage;
