import React, { useState } from "react";
import { PixelButton } from "@modules/common/components/button";
import { PixelPopup } from "@modules/common/components/popup";

interface HowToPlayProps {
  variant?: "text" | "btn";
}
export function HowToPlay({ variant = "btn" }: HowToPlayProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      {variant === "text" ? (
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <img src="/assets/common/how.png" alt="User" height={15} width={15} />
          How to play
        </div>
      ) : (
        <PixelButton
          onClick={() => setIsOpen(true)}
          borderColor="white"
          className="text-md   btn-hover bg-yellow-400 shadow-lg transition transform hover:scale-110 hover:bg-yellow-300"
        >
          <img src="/assets/common/how.png" alt="User" height={15} width={15} />
        </PixelButton>
      )}

      {isOpen && (
        <PixelPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="How to Play"
        >
          <div className="p-4 text-left ">
            <h2 className="text-lg font-bold mb-2">Game Rules</h2>
            <ul className="list-disc pl-4 space-y-1">
              <li>Select a country from the dropdown or type it manually.</li>
              <li>
                The globe will stop rotating and highlight the selected country.
              </li>
              <li>You’ll get clues one by one to guess the correct city.</li>
              <li>Use as few clues as possible for a higher score!</li>
            </ul>

            <h2 className="text-lg font-bold mt-4 mb-2">Scoring System</h2>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Correct on 1st clue:{" "}
                <strong className="text-green-400">+10 points</strong>
              </li>
              <li>
                Correct on 2nd clue:{" "}
                <strong className="text-yellow-400">+5 points</strong>
              </li>
              <li>
                Wrong guess: <strong className="text-red-400">-5 points</strong>
              </li>
            </ul>

            <h2 className="text-lg font-bold mt-4 mb-2">Feedback</h2>
            <ul className="list-disc pl-4 space-y-1">
              <li>Correct guess: 🎉 Confetti + Fun Fact + Trivia</li>
              <li>
                Incorrect guess: 😢 Sad face animation + Fun Fact + Trivia
              </li>
            </ul>

            {/* Close Button */}
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
