import { Button } from "pixel-retroui";
import { useAppState } from "@store/index";
import { AuthModal } from "@modules/common/components/authPopup";
import { useState } from "react";
import { Heading } from "./heading";
import { Logo } from "./logo";
import { SoundToggleButton } from "./sound";
import { UserProfile } from "./profile";

export function Navbar() {
  const [state, dispatch] = useAppState();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-12 py-3  bg-gray-900 text-white h-16 flex-grow-0">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <div className="flex items-center gap-3">
        <Logo className="h-8 w-8" />
        <Heading className="text-xl md:text-2xl font-bold drop-shadow-lg   text-yellow-400 heading" />
      </div>

      <SoundToggleButton />

      <div className="flex items-center gap-4 ">
        <span className="text-lg font-semibold">Score: {state?.score}</span>
        <UserProfile />
      </div>
    </nav>
  );
}
