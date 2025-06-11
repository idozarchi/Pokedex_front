import { ArenaHeader } from "../components/ArenaHeader/areana-header";

// All strings and constants are imported from the constants file when it will merged

export default function ArenaPage() {
  return (
    <div className="p-14 bg-neutral-100 min-h-screen">
      <ArenaHeader
        headline="Fighting Arena"
        description="Start fighting against your opponent to win the battle"
        className="justify-center items-center text-center mb-8"
      />
    </div>
  );
}
