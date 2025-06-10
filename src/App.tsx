import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header/header";
import AllPokemonsPage from "./pages/all-pokemons";
import MyPokemonsPage from "./pages/my-pokemons";

const AppContent = () => {
  const location = useLocation();
  const items = [
    {
      name: "All Pokémons",
      href: "/all-pokemons",
      isActive: location.pathname === "/all-pokemons",
    },
    {
      name: "My Pokémons",
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
        <Route path="*" element={<Navigate to="/all-pokemons" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
