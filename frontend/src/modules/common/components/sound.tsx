import { useAppState } from "@store/index";
import { stopSound, playSound } from "@utils/playSound";
import { Button } from "pixel-retroui";
import { useEffect } from "react";

interface SoundToggleButtonProps {
  variant?: "btn" | "text";
}
export function SoundToggleButton({ variant = "btn" }: SoundToggleButtonProps) {
  const [state, dispatch] = useAppState();

  const toggleSound = () => {
    const isMuted = !state?.isMuted;

    dispatch({ type: "SET_IS_MUTED", payload: { isMuted } });

    if (isMuted) {
      stopSound();
    } else {
      playSound("/sounds/interstellar.mp3", state?.playGameSound);
    }
  };

  return (
    <>
      {variant === "text" ? (
        <div onClick={toggleSound} className="flex items-center gap-2">
          {state?.isMuted ? (
            <>
              <img
                src="/assets/common/mute.png"
                alt="mute"
                width={30}
                height={30}
              />
              <span>UnMute</span>
            </>
          ) : (
            <>
              <img
                src="/assets/common/sound.png"
                alt="sound"
                width={30}
                height={30}
              />
              <span>UnMute</span>
            </>
          )}
        </div>
      ) : (
        <Button
          borderColor="white"
          className=" text-md font-bold   btn-hover bg-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          onClick={toggleSound}
        >
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
      )}
    </>
  );
}
