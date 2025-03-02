import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useAppState } from "./store";
import { Game } from "@modules/game/page";
import { Home } from "@modules/home/page";

function App() {
  const [state] = useAppState();

  useEffect(() => {
    const clickSound = new Audio("/assets/mouseclick.wav");

    const playSound = (event: Event) => {
      // Check if the clicked element is a button
      if (event.target instanceof HTMLButtonElement && !state.isMuted) {
        clickSound.currentTime = 0;
        clickSound.play().catch((error) => console.error("Audio play failed", error));
      }
    };

    // Attach event listener to the document
    document.addEventListener("click", playSound);

    return () => {
      document.removeEventListener("click", playSound);
    };
  }, [state.isMuted]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
