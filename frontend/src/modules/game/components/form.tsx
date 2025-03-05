import GuessForm from "./forms/guessForm";
import CountryForm from "./forms/countryForm";
import { useAppState } from "@store/index";
import { PixelButton } from "@modules/common/components/button";
import { useState } from "react";
import { QuitPopup } from "./quitGamePopup";
import { InviteFriendForm } from "./challenge/inviteForm";

export function FormWrapper() {
  const [state] = useAppState();
  const [isQuitPopupOpen, setQuitPopupOpen] = useState(false);

  return (
    <div className=" flex flex-col h-full">
      <QuitPopup
        isOpen={isQuitPopupOpen}
        onClose={() => setQuitPopupOpen(false)}
      />
      <div>
        <PixelButton
          type="button"
          borderColor="white"
          className="text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          onClick={() => setQuitPopupOpen(true)}
          children={
            <img src="/assets/common/exit.png" height={25} width={25} />
          }
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-6 w-full h-full ">
        <div className="w-full">
          <h2 className="text-sm font-semibold text-yellow-400 text-center mb-2">
            Choose a country
          </h2>
          <CountryForm />
        </div>

        {state.selectedCountry && (
          <div className="w-full ">
            <h2 className="text-sm font-semibold text-yellow-400 text-center mb-2">
              Guess the City
            </h2>
            <GuessForm />
          </div>
        )}
      </div>
    </div>
  );
}
