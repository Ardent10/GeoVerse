import { Routes, Route } from "react-router";
import { Home } from "./modules/home/page";

import { useEffect } from "react";
import { useAppState } from "./store";

function App() {
  const [state] = useAppState();

  useEffect(() => {
    const clickSound = new Audio("/assets/mouseclick.wav");

    const playSound = () => {
      if (!state.isMuted) {
        clickSound.currentTime = 0;
        clickSound
          .play()
          .catch((error) => console.error("Audio play failed", error));
      }
    };

    window.addEventListener("click", playSound);

    return () => {
      window.removeEventListener("click", playSound);
    };
  }, [state.isMuted]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
