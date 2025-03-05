import { AuthModal } from "@modules/common/components/authPopup";
import { Heading } from "@modules/common/components/heading";
import { Logo } from "@modules/common/components/logo";
import { UserProfile } from "@modules/common/components/profile";
import { useAppState } from "@store/index";
import { playSound } from "@utils/playSound";
import { motion } from "framer-motion";
import { Button } from "pixel-retroui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [state, dispatch] = useAppState();

  useEffect(() => {
    playSound("/sounds/game.mp3", state?.isMuted && state?.playGameSound);
  }, [state?.playGameSound, state?.isMuted]);

  return (
    <div className="w-full mt-8 flex justify-between items-center px-4 md:px-10">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Logo className="h-14 w-14 md:h-20 md:w-20 z-10" />
      <Heading className="text-4xl md:text-7xl font-bold drop-shadow-lg  text-yellow-400 heading" />
      <div className="flex gap-2 items-center">
        <Button
          borderColor="#ffff"
          className="px-3  md:px-4 py-1 text-lg font-bold bg-yellow-500 border-4 shadow-lg transition transform hover:scale-105 hover:bg-yellow-400 hover:text-white flex items-center justify-center"
          onClick={() => {
            dispatch({
              type: "SET_PLAY_GAME_SOUND",
              payload: { playGameSound: true },
            });
            !state?.user?.id ? setIsAuthOpen(true) : navigate("/game");
          }}
        >
          <span className="block md:hidden">
            <img src="/assets/common/play.png" className="h-3 w-3" alt="play" />
          </span>
          <div className="items-center gap-1 hidden md:flex">
            <img
              src="/assets/common/play1.png"
              className="h-5 w-5"
              alt="play"
            />
            Play Now
          </div>
        </Button>

        {state?.user?.id && <UserProfile />}
      </div>
    </div>
  );
}
