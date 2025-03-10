import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PixelButton } from "@modules/common/components/button";
import { CountryFormData, countryFormSchema } from "@utils/validations";
import DropdownInput from "@modules/common/components/dropdownInput";
import { useAppState } from "@store/index";
import { useEffect } from "react";
import { useGame } from "@modules/game/hooks";
import { PixelBubble } from "@modules/common/components/bubble";
import ConfettiBoom from "react-confetti-boom";
import { ChatArea } from "@modules/common/components/chatArea";
import { PixelLoader } from "@modules/common/components/loader";

function CountryForm() {
  const [state, dispatch] = useAppState();
  const { getAllCountries, getCluesByCountry, loading } = useGame();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<{ country: string }>({
    resolver: zodResolver(countryFormSchema),
  });

  useEffect(() => {
    getAllCountries();
  }, []);

  async function handleFormSubmit(data: CountryFormData) {
    dispatch({
      type: "SET_SELECTED_COUNTRY",
      payload: { selectedCountry: data.country },
    });
    dispatch({ type: "RESET_CLUES", payload: {} });

    await getCluesByCountry(data.country, 0);

    reset();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {errors.country?.message && (
        <PixelBubble
          text={errors?.country?.message}
          direction="left"
          className="text-xs font-normal  text-red-500 font-minecraft"
          borderColor="#ef4444"
        />
      )}

      {!state.selectedCountry && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-2">
          <div className="w-full">
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
              disabled={!isValid}
              className="px-4 py-1 btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
            />
          </div>
        </form>
      )}
      {loading && <PixelLoader variant="bg" />}
      <ChatArea />
    </div>
  );
}

export default CountryForm;
