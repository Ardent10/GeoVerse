import React, { useEffect, useRef } from "react";
import { PixelPopup } from "@modules/common/components/popup";
import ConfettiBoom from "react-confetti-boom";
import { PixelButton } from "@modules/common/components/button";
import { useAppState } from "@store/index";
import { useGame } from "../hooks";

interface GuessPopupProps {
  isOpen: boolean;
  isCorrect: boolean;
  onClose: () => void;
}

const ResultPopup: React.FC<GuessPopupProps> = ({
  isOpen,
  isCorrect,
  onClose,
}) => {
  const [state, dispatch] = useAppState();
  const { fetchFunFact } = useGame();
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (state?.guessedCity && isOpen) {
      fetchFunFact(state.guessedCity);
    }
  }, [state?.guessedCity, state.showPopup]);

  useEffect(() => {
    winSound.current = new Audio("/sounds/win.mp3");
    loseSound.current = new Audio("/sounds/loose.mp3");

    if (isOpen) {
      if (isCorrect && winSound.current) {
        winSound.current.play();
      } else if (!isCorrect && loseSound.current) {
        loseSound.current.play();
      }
    }
  }, [isOpen, isCorrect]);

  function onCloseResultPopup() {
    dispatch({
      type: "RESET_GAME",
      payload: {},
    });
    onClose();
  }

  return (
    <PixelPopup
      isOpen={isOpen}
      onClose={onCloseResultPopup}
      title={isCorrect ? "🎉 Correct!" : "😢 Incorrect!"}
      className=" p-6 text-center"
    >
      <div className="mt-4 text-gray-700">
        <p className="text-lg font-semibold">Fun Fact:</p>
        <p className="text-sm">{state?.guessedCityResult?.funFact}</p>

        <p className="mt-3 text-lg font-semibold">Did You Know?</p>
        <p className="text-sm">{state?.guessedCityResult?.trivia}</p>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <PixelButton
          onClick={onCloseResultPopup}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Play Again
        </PixelButton>
        <PixelButton
          onClick={onCloseResultPopup}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Next
        </PixelButton>
      </div>
    </PixelPopup>
  );
};

export default ResultPopup;
