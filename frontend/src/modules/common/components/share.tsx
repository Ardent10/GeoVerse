import { useState, useEffect } from "react";
import { Button, Card } from "pixel-retroui";
import { PixelPopup } from "./popup";
import { useAppState } from "@store/index";
import { PixelButton } from "./button";

export function Share() {
  const [state] = useAppState();
  const [showShareModal, setShowShareModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [shareImage, setShareImage] = useState(
    "/assets/common/share-preview.png"
  ); // Placeholder

  useEffect(() => {
    // Generate a unique shareable link
    const baseUrl = window.location.origin;
    const uniqueLink = `${baseUrl}/invite?user=${encodeURIComponent(
      state?.user?.username
    )}&score=${state?.score}`;
    setInviteLink(uniqueLink);
  }, [state?.user?.username, state?.score]);

  const closeModal = () => setShowShareModal(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    const message = `🚀 ${state?.user?.username} scored ${state?.score} points! Can you beat them? Play now: ${inviteLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Share Button */}
      <PixelButton
        borderColor="white"
        className="text-md font-bold tracking-wide bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
        onClick={() => setShowShareModal(true)}
      >
        <img
          src="/assets/common/share.png"
          alt="share"
          width={30}
          height={30}
        />
      </PixelButton>

      {/* Share Popup */}
      {showShareModal && (
        <PixelPopup
          isOpen={showShareModal}
          onClose={closeModal}
          title="Challenge a Friend!"
        >
          <Card className="p-4 flex flex-col items-center">
            <p className="text-gray-700 font-semibold text-center">
              {state?.user?.username} scored{" "}
              <span className="text-blue-600">{state?.score}</span> points! 🎉
            </p>

            <div className="flex flex-col space-y-4 mt-4">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
              >
                📋 Copy Invite Link
              </button>

              <button
                onClick={shareOnWhatsApp}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                📲 Share on WhatsApp
              </button>
            </div>

            <PixelButton
              onClick={() => {}}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Challenge a Friend
            </PixelButton>
            <PixelButton
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Close
            </PixelButton>
          </Card>
        </PixelPopup>
      )}
    </>
  );
}
