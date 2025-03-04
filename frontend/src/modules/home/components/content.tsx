import { AuthModal } from "@modules/common/components/authPopup";
import { Toast } from "@modules/common/components/toast";
import { useAppState } from "@store/index";
import { motion } from "framer-motion";
import { Button } from "pixel-retroui";
import { useState } from "react";
import { useNavigate } from "react-router";

export function HeroContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [state, dispatch] = useAppState();
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center -mt-28 h-full">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <div className="relative flex flex-col items-center w-2/3 justify-center h-full text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg heading"
        >
          A World of Mystery and Adventure Awaits!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-sm md:text-xl max-w-lg text-gray-100 bg-black/50 p-3 rounded-lg"
        >
          Solve clues, explore new lands, and challenge your friends in the
          ultimate travel guessing game!
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8"
        >
          <Button
            borderColor="#ffff"
            className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
            // onClick={() => {
            //   !state?.user?.id ? setIsAuthOpen(true) : navigate("/game");
            // }}
            onClick={() =>
              dispatch({
                type: "SET_TOAST",
                payload: {
                  visible: true,
                  message: "toast message",
                  type: "success",
                },
              })
            }
          >
            ▶ Start Adventure
          </Button>
          <Button
            borderColor="#ffff"
            className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
            onClick={() =>
              window.open("https://github.com/Ardent10/GeoVerse", "_blank")
            }
          >
            <span className="flex items-center gap-2">
              <img
                src="assets/common/github.png"
                alt="github"
                height={20}
                width={20}
              />
              Star on GitHub
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
