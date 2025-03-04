import { useAppState } from "@store/index";
import { PixelButton } from "./button";
import { ChatBubble } from "./chatBubble";
import { useGame } from "@modules/game/hooks";

export function ChatArea() {
  const [state] = useAppState();
  const { getCluesByCountry } = useGame();

  async function handleRevealMoreClues() {
    if (!state.selectedCountry) return;

    const nextClueIndex = state.clues.length;
    await getCluesByCountry(state.selectedCountry, nextClueIndex);
  }

  return (
    <div className="flex flex-col items-start justify-start mt-4 w-full">
      {/* User Message (Selected Country) */}
      {state?.selectedCountry && (
        <ChatBubble text={state.selectedCountry} variant="user" />
      )}

      {/* Bot Messages (Clues) */}
      {state.clues?.length > 0 && (
        <div className="flex flex-col items-start gap-4 w-full">
          {state.clues.map(
            ({ clue, index }: { clue: string; index: number }) => (
              <ChatBubble key={index} text={clue} variant="bot" />
            )
          )}

          {/* Reveal More Clue Button */}
          {state?.clues?.length < 2 && (
            <div className="flex justify-center w-full mb-4">
              <PixelButton
                onClick={handleRevealMoreClues}
                borderColor="white"
                className="mt-2 px-4 py-2 btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
                disabled={state.clues.length >= 2}
              >
                Reveal More Clue
              </PixelButton>
            </div>
          )}
        </div>
      )}

      {state?.guessedCity && (
        <ChatBubble text={state.guessedCity} variant="user" />
      )}
    </div>
  );
}
