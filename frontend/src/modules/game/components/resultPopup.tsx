import React, { useEffect, useRef } from "react";
import { PixelPopup } from "@modules/common/components/popup";
import ConfettiBoom from "react-confetti-boom";
import { PixelButton } from "@modules/common/components/button";
import { useAppState } from "@store/index";
import { useGame } from "../hooks";

interface GuessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  funFact: string;
  trivia: string;
}

const ResultPopup: React.FC<GuessPopupProps> = ({
  isOpen,
  onClose,
  isCorrect,
  funFact,
  trivia,
}) => {
  const [state] = useAppState();
  const { fetchFunFact } = useGame();
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (state?.selectedCountry && isOpen) {
      fetchFunFact(state.selectedCity);
    }
  }, [state?.selectedCountry, state.showPopup]);

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

  return (
    <PixelPopup
      isOpen={isOpen}
      onClose={onClose}
      title={isCorrect ? "🎉 Correct!" : "😢 Incorrect!"}
      className="max-w-md p-6 text-center"
    >
      {isCorrect && <ConfettiBoom mode="fall"/>}

      <div className="mt-4 text-gray-700">
        <p className="text-lg font-semibold">Fun Fact:</p>
        <p className="text-sm">{funFact}</p>

        <p className="mt-3 text-lg font-semibold">Did You Know?</p>
        <p className="text-sm">{trivia}</p>
      </div>

      <div className="mt-6">
        <PixelButton
          onClick={onClose}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Close
        </PixelButton>
      </div>
    </PixelPopup>
  );
};

export default ResultPopup;
