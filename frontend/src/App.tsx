import { Routes, Route } from "react-router";
import { Home } from "./modules/home/page";
import { LoginPage, SignupPage } from "./modules/auth";
import { AuthProvider } from "./contexts/authContext";
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
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
