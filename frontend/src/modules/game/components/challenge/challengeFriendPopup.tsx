import { Input, Card } from "pixel-retroui";
import { useAppState } from "@store/index";
import { PixelPopup } from "@modules/common/components/popup";
import { PixelButton } from "@modules/common/components/button";
import { useState, useEffect } from "react";
import { useGame } from "@modules/game/hooks";
import { PixelLoader } from "@modules/common/components/loader";

export default function ChallengeFriendPopup() {
  const [state, dispatch] = useAppState();
  const [inviteLink, setInviteLink] = useState("");
  const { fetchApodImage, loading } = useGame();

  useEffect(() => {
    const baseUrl = window.location.origin;
    const uniqueLink = `${baseUrl}/invite?user=${encodeURIComponent(
      state?.user?.username
    )}&score=${state?.score}`;
    setInviteLink(uniqueLink);
  }, [state?.user?.username, state?.score]);

  useEffect(() => {
    fetchApodImage();
  }, []);

  function copyToClipboard() {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  }

  function shareOnWhatsApp() {
    const message = `🚀 ${state?.user?.username} scored ${state?.score} points! Can you beat them? Play now: ${inviteLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  return (
    <PixelPopup
      isOpen={state?.showChallengePopup}
      onClose={() =>
        dispatch({
          type: "SET_SHOW_CHALLENGE_POPUP",
          payload: {
            showChallengePopup: false,
          },
        })
      }
      title="Challenge a Friend!"
    >
      <div className="p-2 flex flex-col items-center">
        <p className="text-gray-700 font-bold text-center">
          {state?.user?.username} scored{" "}
          <span className="text-blue-600">{state?.score}</span> points! 🎉
        </p>

        <div className="p-4 rounded-2xl bg-blue-600 mt-4 w-full flex justify-center">
          {loading ? (
            <PixelLoader variant="bg" />
          ) : state?.apodImage?.img ? (
            <div className="flex flex-col text-white items-center justify-center">
              Nasa APOD
              <p className="text-sm my-2">{state?.apodImage?.title}</p>
              <img
                src={state?.apodImage.img}
                alt="NASA APOD"
                className="w-full h-40 rounded-lg shadow-md"
              />
            </div>
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="flex items-center justify-center mt-4">
          <PixelButton
            onClick={copyToClipboard}
            className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
            children="Copy Invite Link"
          />

          <PixelButton
            onClick={shareOnWhatsApp}
            className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            children="Share on WhatsApp"
          />
        </div>

        <PixelButton
          onClick={() =>
            dispatch({
              type: "SET_SHOW_CHALLENGE_POPUP",
              payload: {
                showChallengePopup: false,
              },
            })
          }
          className="mt-4 bg-red-500 hover:bg-red-600 text-white"
        >
          Close
        </PixelButton>
      </div>
    </PixelPopup>
  );
}
