import { PixelButton } from "@modules/common/components/button";
import { PixelPopup } from "@modules/common/components/popup";
import { useAppState } from "@store/index";

export function InvitedPopup() {
  const [state, dispatch] = useAppState();
  return (
    <PixelPopup
      isOpen={state?.showInvitedPopup}
      onClose={() =>
        dispatch({
          type: "SET_SHOW_INVITED_POPUP",
          payload: {
            showInvitedPopup: false,
          },
        })
      }
      title="Invited by a Friend!"
    >
      <div className="p-2 flex flex-col items-center">
        <p className="text-gray-700 font-bold text-center">
          Your friend {state?.user?.invitedBy} scored{" "}
          <span className="text-blue-600">{state?.user.inviterScore}</span>{" "}
          points! 🎉
        </p>
        <span>Can you beat him?</span>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <PixelButton
          className="bg-yellow-400 hover:bg-yellow-500"
          onClick={() => {
            dispatch({
              type: "SET_SHOW_INVITED_POPUP",
              payload: {
                showInvitedPopup: false,
              },
            });
          }}
        >
          🚀 Let's Go
        </PixelButton>
      </div>
    </PixelPopup>
  );
}
