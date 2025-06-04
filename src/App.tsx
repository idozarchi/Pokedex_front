import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <p className="font-[var(--font-family-mulish)] text-[var(--font-size-lg)] leading-[var(--line-height-lg)] font-[var(--font-weight-bold)]">
        Large Bold Heading
      </p>
    </>
  );
}

export default App;
