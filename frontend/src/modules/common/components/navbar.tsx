import { Button } from "pixel-retroui";
import { useAppState } from "../../../store";
import { AuthModal } from "../../home/components/authPopup";
import { useState } from "react";

export function Navbar() {
  const [state, dispatch] = useAppState();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleSound = () => {
    dispatch({
      type: "setIsMuted",
      payload: { isMuted: !state.isMuted },
    });
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white">
      <div className="flex items-center gap-3">
        <img src="/assets/logo.png" alt="GeoVerse" className="h-8 w-8" />
        <h1 className="text-xl font-bold">GeoVerse</h1>
      </div>

      <Button className="btn-hover" onClick={toggleSound}>
        {state?.isMuted ? (
          <img
            src="/assets/common/mute.png"
            alt="mute"
            width={30}
            height={30}
          />
        ) : (
          <img
            src="/assets/common/sound.png"
            alt="sound"
            width={30}
            height={30}
          />
        )}
      </Button>

      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">Score: {state?.score}</span>
        <Button className="btn-hover " onClick={() => setIsAuthOpen(true)}>
          Sign Up / Login
        </Button>

        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </nav>
  );
}
