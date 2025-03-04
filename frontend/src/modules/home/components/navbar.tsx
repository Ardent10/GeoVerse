import { AuthModal } from "@modules/common/components/authPopup";
import { Heading } from "@modules/common/components/heading";
import { Logo } from "@modules/common/components/logo";
import { UserProfile } from "@modules/common/components/profile";
import { useAppState } from "@store/index";
import { motion } from "framer-motion";
import { Button } from "pixel-retroui";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [state] = useAppState();

  return (
    <div className="w-full mt-8 flex justify-between items-center px-10">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Logo className="h-20 w-20 z-10" />
      <Heading className="text-5xl md:text-7xl font-bold drop-shadow-lg   text-yellow-400 heading" />
      <div className="flex gap-2 items-center">
        <Button
          borderColor="#ffff"
          className="px-4 py-2 text-lg font-bold bg-yellow-500 border-4 shadow-lg transition transform hover:scale-105 hover:bg-yellow-400 hover:text-white"
          onClick={() => {
            !state?.user.id ? setIsAuthOpen(true) : navigate("/game");
          }}
        >
          ▶ Play Now
        </Button>
        {state?.user.id && <UserProfile />}
      </div>
    </div>
  );
}
