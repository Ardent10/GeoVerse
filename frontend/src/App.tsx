import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useAppState } from "./store";
import { Game } from "@modules/game/page";
import { Home } from "@modules/home/page";
import { useAuth } from "@modules/home/hooks";

function App() {
  const [state] = useAppState();
  const { fetchUser } = useAuth();

  useEffect(() => {
    // Fetch user data on initial render
    fetchUser();

    const clickSound = new Audio("/assets/mouseclick.wav");

    const playSound = (event: Event) => {
      if (event.target instanceof HTMLButtonElement) {
        clickSound.currentTime = 0;
        clickSound
          .play()
          .catch((error) => console.error("Audio play failed", error));
      }
    };

    document.addEventListener("click", playSound);

    return () => {
      document.removeEventListener("click", playSound);
    };
  }, [state.isMuted]);

  console.log("state=>", state);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
