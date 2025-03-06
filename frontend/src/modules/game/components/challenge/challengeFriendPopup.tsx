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
    const uniqueLink = `${baseUrl}?invite=true?invitedBy=${encodeURIComponent(
      state?.user?.username
    )}&inviterScore=${state?.score}`;
    setInviteLink(uniqueLink);
  }, [state?.user?.username, state?.score]);

  useEffect(() => {
    fetchApodImage();
  }, []);

  function copyToClipboard() {
    navigator.clipboard.writeText(inviteLink);
    dispatch({
      type: "SET_TOAST",
      payload: {
        visible: true,
        message: "Link copied to clipboard!",
        type: "success",
      },
    });
  }

  function shareOnWhatsApp() {
    const message = `GeoVerse Alert! \n${state?.user?.username} just scored ${state?.score} points! Think you can beat them? Test your geography skills now! \nPlay here 👉 ${inviteLink}`;
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
          ) : (
            state?.apodImage?.img && (
              <div className="flex flex-col text-white items-center justify-center">
                Nasa APOD
                <p className="text-sm my-2">{state?.apodImage?.title}</p>
                <img
                  src={state?.apodImage.img}
                  alt="NASA APOD"
                  className="w-full h-40 rounded-lg shadow-md"
                />
              </div>
            )
          )}
        </div>

        <div className="flex justify-between mt-4 w-full">
          <div className="flex ">
            <PixelButton
              onClick={copyToClipboard}
              className="flex md:gap-2 items-center p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
            >
              <img src="/assets/common/link.png" className="h-4 w-4" alt="" />
            </PixelButton>

            <PixelButton
              onClick={shareOnWhatsApp}
              className="flex md:gap-2 items-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              <img
                src="/assets/common/whatsapp.webp"
                className="h-6 w-6"
                alt=""
              />
            </PixelButton>
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
            className=" bg-red-500 hover:bg-red-600 text-white"
          >
            Close
          </PixelButton>
        </div>
      </div>
    </PixelPopup>
  );
}
