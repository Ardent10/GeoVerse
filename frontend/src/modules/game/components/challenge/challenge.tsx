import { PixelButton } from "@modules/common/components/button";
import { useAppState } from "@store/index";
import { InviteFriendForm } from "./inviteForm";
import ChallengeFriendPopup from "./challengeFriendPopup";

export function GameWrapper() {
  const [state, dispatch] = useAppState();

  return (
    <>
      {state.showChallengePopup && <ChallengeFriendPopup />}
      {state.showInviteForm ? (
        <InviteFriendForm />
      ) : (
        <div className="flex flex-col justify-center w-full h-full ">
          <div className="flex flex-col justify-center gap-4">
            <PixelButton
              borderColor="white"
              className=" flex items-center gap-2 px-4 py-1 btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
              onClick={() =>
                dispatch({
                  type: "SET_SHOW_COUNTRY_FORM",
                  payload: { showCountryForm: true },
                })
              }
            >
              <img
                src="/assets/common/play1.png"
                className="h-5 w-5"
                alt="play"
              />
              Start Game
            </PixelButton>
            <div className="flex gap-4 items-center">
              <PixelButton
                borderColor="white"
                onClick={() =>
                  dispatch({
                    type: "SET_SHOW_INVITE_FORM",
                    payload: {
                      showInviteForm: true,
                    },
                  })
                }
                className="flex items-center gap-2 px-4 py-1 btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
              >
                <img
                  src="/assets/common/share1.png"
                  className="h-6 w-6"
                  alt="share"
                />
                Invite
              </PixelButton>
              <PixelButton
                borderColor="white"
                onClick={() => {
                  dispatch({
                    type: "SET_SHOW_CHALLENGE_POPUP",
                    payload: {
                      showChallengePopup: true,
                    },
                  });
                }}
                className="flex items-center gap-2 px-4 py-1 btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
              >
                <img
                  src="/assets/common/share2.png"
                  className="h-6 w-6"
                  alt="share"
                />
                Challenge Friend
              </PixelButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
