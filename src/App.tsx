import "./App.css";
import { Header } from "./components/Header/header"; // Adjust the path if needed
import AllPokemonsPage from "./pages/all-pokemons";

function App() {
  return (
    <>
      <Header />
      <AllPokemonsPage />
    </>
  );
}

export default App;
