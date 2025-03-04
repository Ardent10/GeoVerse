import { useAppState } from "@store/index";
import { PixelButton } from "./button";
import { PixelPopup } from "./popup";
import { useState } from "react";

export function Score() {
  const [state] = useAppState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <PixelButton
        borderColor="white"
        className="bg-yellow-400"
        children={
          <span className="text-lg font-semibold">Score: {state?.score}</span>
        }
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <PixelPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Score"
        >
          <div className="p-4 text-left">
            <h2 className="text-lg font-bold mb-2">Net Score: {state.score}</h2>

            <div className="flex gap-2">
              <h2 className="text-lg font-bold">Correct:</h2>
              <strong className="text-green-400">
                {state?.correctAnswer} × (+10) = {state.correctAnswer * 10}
              </strong>
            </div>

            <div className="flex gap-2">
              <h2 className="text-lg font-bold">Incorrect:</h2>
              <strong className="text-red-400">
                {state?.incorrectAnswer} × (-5) ={" "}
                {state.incorrectAnswer !== 0 && "-"}{" "}
                {state?.incorrectAnswer * 5}
              </strong>
            </div>

            <div className="flex justify-center mt-4">
              <PixelButton
                onClick={() => setIsOpen(false)}
                borderColor="white"
                className="px-4 py-2 text-md font-bold bg-red-500 hover:bg-red-400"
              >
                Close
              </PixelButton>
            </div>
          </div>
        </PixelPopup>
      )}
    </div>
  );
}
