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
  const { getAllCountries } = useGame();

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

  const handleFormSubmit = (data: CountryFormData) => {
    console.log("country data=>", data);

    reset();
  };

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
            control={control}
            name="country"
            options={state?.countriesList ?? []}
            placeholder="Select or type a country"
          />
        </div>
        <div>
          <PixelButton
            type="submit"
            children="Select"
            borderColor="white"
            className="px-4 py-2  btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          />
        </div>
      </form>
    </div>
  );
}

export default CountryForm;
