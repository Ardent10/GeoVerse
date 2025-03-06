import { AuthModal } from "@modules/common/components/authPopup";
import { useState } from "react";
import { Heading } from "./heading";
import { Logo } from "./logo";
import { SoundToggleButton } from "./sound";
import { UserProfile } from "./profile";
import { Score } from "./score";
import { HowToPlay } from "./howToPlay";

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-12 py-3 bg-blue-600 text-white h-16">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <Logo className="h-8 w-8" />

      <Heading className="md:ml-32 text-xl md:text-2xl font-bold drop-shadow-lg text-yellow-400 heading" />

      <div className="flex items-center gap-4 md:gap-2">
        <Score />

        <div className="hidden md:flex gap-2">
          <HowToPlay />
          <SoundToggleButton />
        </div>

        <UserProfile />
      </div>
    </nav>
  );
}
