import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header/header";
import AllPokemonsPage from "./pages/all-pokemons";
import MyPokemonsPage from "./pages/my-pokemons";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/all-pokemons" element={<AllPokemonsPage />} />
        <Route path="/my-pokemons" element={<MyPokemonsPage />} />
        <Route path="*" element={<Navigate to="/all-pokemons" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
