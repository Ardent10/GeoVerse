import { Card } from "pixel-retroui";
import { useAppState } from "@store/index";
import { PixelButton } from "@modules/common/components/button";
export function QuitPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [, dispatch] = useAppState();

  const handleQuit = () => {
    dispatch({ type: "RESET_GAME", payload: {} });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card borderColor="white" className="p-6 flex  flex-col items-center text-center bg-blue-600 text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-yellow-400">Quit Game?</h2>
        <p className="mb-6 text-gray-300">
          Are you sure you want to quit? Your progress will be lost.
        </p>

        <div className="flex space-x-4">
          <PixelButton
            onClick={handleQuit}
            className="bg-red-500 hover:bg-red-400"
          >
            Yes, Quit
          </PixelButton>
          <PixelButton
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-500"
          >
            Cancel
          </PixelButton>
        </div>
      </Card>
    </div>
  );
}
