import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PixelButton } from "@modules/common/components/button";
import { CountryFormData, countryFormSchema } from "@utils/validations";
import DropdownInput from "@modules/common/components/dropdownInput";
import { useAppState } from "@store/index";
import { useEffect } from "react";
import { useGame } from "@modules/game/hooks";
import { PixelBubble } from "@modules/common/components/bubble";

function CountryForm() {
  const [state, dispatch] = useAppState();
  const { getAllCountries, getCluesByCountry } = useGame();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ country: string }>({
    resolver: zodResolver(countryFormSchema),
  });

  useEffect(() => {
    getAllCountries();
  }, []);

  async function handleFormSubmit(data: CountryFormData) {
    console.log("Selected Country =>", data.country);

    dispatch({
      type: "SET_SELECTED_COUNTRY",
      payload: { selectedCountry: data.country },
    });
    dispatch({ type: "RESET_CLUES", payload: {} });

    await getCluesByCountry(data.country, 0);

    reset();
  }

  async function handleRevealMoreClues() {
    if (!state.selectedCountry) return;

    const nextClueIndex = state.clues.length;
    await getCluesByCountry(state.selectedCountry, nextClueIndex);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {errors.country?.message && (
        <PixelBubble
          text={errors?.country?.message}
          direction="left"
          className="text-xs font-normal text-red-500"
          borderColor="#ef4444"
        />
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-4">
        <div>
          <DropdownInput
            name="country"
            control={control}
            options={state?.countriesList ?? []}
            placeholder="Select or type a country"
          />
        </div>
        <div>
          <PixelButton
            type="submit"
            children="Select"
            borderColor="white"
            className="px-4 py-2 btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          />
        </div>
      </form>

      <div className="flex flex-col items-start justify-start mt-4 w-full">
        {/* User Message (Selected Country) */}
        {state?.selectedCountry && (
          <div className="flex justify-end items-center gap-2 w-full">
            <PixelBubble
              text={state.selectedCountry}
              direction="right"
              className="text-lg"
            />
            <img
              src="/assets/common/user.png"
              alt="User"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
        )}

        {/* Bot Messages (Clues) */}
        {state.clues?.length > 0 && (
          <div className="flex flex-col items-start gap-4 w-full">
            {state.clues.map(
              ({ clue, index }: { clue: string; index: number }) => (
                <div key={index} className="flex items-center gap-2 w-full">
                  <img
                    src="/assets/common/bot.png"
                    alt="Bot"
                    height={50}
                    width={50}
                    className="rounded-full bg-yellow-400 p-2"
                  />
                  <PixelBubble
                    text={clue}
                    direction="left"
                    className="text-lg"
                  />
                </div>
              )
            )}

            {state?.clues?.length < 2 && (
              <div className="flex justify-center w-full">
                <PixelButton
                  onClick={handleRevealMoreClues}
                  borderColor="white"
                  className="mt-2 px-4 py-2 btn-hover bg-blue-500 shadow-lg transition transform hover:scale-110 hover:bg-blue-400"
                  disabled={state.clues.length >= 2}
                >
                  Reveal More Clue
                </PixelButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryForm;
