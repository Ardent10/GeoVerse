import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "pixel-retroui";
import { PixelButton } from "@modules/common/components/button";
import { PixelBubble } from "@modules/common/components/bubble";
import { guessForm, GuessFormData } from "@utils/validations";
import { useAppState } from "@store/index";

function GuessForm() {
  const [state, dispatch] = useAppState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guessForm),
  });

  // const handleGuess = (data: { guess: string }) => {
  //   const cityData = cities.find(
  //     (city) =>
  //       city.city.toLowerCase() === data.guess.toLowerCase() ||
  //       city.country.toLowerCase() === data.guess.toLocaleLowerCase()
  //   );

  //   if (cityData) {
  //     dispatch({ type: "setScore", payload: state.score + 1 });
  //     dispatch({
  //       type: "addGuess",
  //       payload: { city: cityData, correct: true },
  //     });

  //     // ✅ Move the globe to guessed location
  //     if (state.globeInstance) {
  //       state.globeInstance.pointOfView(
  //         { lat: cityData.latitude, lng: cityData.longitude, altitude: 1.5 },
  //         2000
  //       );
  //     }
  //   } else {
  //     dispatch({
  //       type: "addGuess",
  //       payload: { city: data.guess, correct: false },
  //     });
  //   }
  // };

  const handleFormSubmit = (data: GuessFormData) => {
    // API CALL HERE

    reset();
  };

  return (
    <div className=" flex flex-col items-center gap-2">
      {errors.guess && (
        <PixelBubble
          text={errors.guess.message ?? ""}
          direction="left"
          className="text-red-500 "
          borderColor="#ef4444"
        />
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-2">
        <Input
          {...register("guess")}
          type="text"
          placeholder="Enter city name"
          className="rounded-md"
          borderColor="#eab308"
        />
        <PixelButton
          type="submit"
          children="Guess"
          borderColor="white"
          className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
        />
      </form>
    </div>
  );
}

export default GuessForm;
