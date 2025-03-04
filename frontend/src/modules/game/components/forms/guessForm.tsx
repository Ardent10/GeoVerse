import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "pixel-retroui";
import { PixelButton } from "@modules/common/components/button";
import { PixelBubble } from "@modules/common/components/bubble";
import { guessForm, GuessFormData } from "@utils/validations";
import { useAppState } from "@store/index";
import { useGame } from "@modules/game/hooks";
import { useState } from "react";
import ResultPopup from "../resultPopup";
import ConfettiBoom from "react-confetti-boom";

function GuessForm() {
  const [state, dispatch] = useAppState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { submitGuess, fetchFunFact } = useGame();
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

  const handleFormSubmit = async (data: GuessFormData) => {
    dispatch({
      type: "SET_GUESSED_CITY",
      payload: { guessedCity: data?.guess },
    });
    const result = await submitGuess(
      data.guess,
      state?.selectedCountry,
      state.clues.length
    );

    if (result) {
      setIsCorrect(result.correct);
      setIsPopupOpen(true);
    }

    reset();
  };

  return (
    <div className=" flex flex-col items-center gap-2">
      {isPopupOpen && (
        <>
          {isCorrect && (
            <ConfettiBoom
              particleCount={200}
              shapeSize={20}
              fadeOutHeight={1}
              colors={["#002dfa", "#ff4c00", "#f7f600", "#00ff80"]}
              mode="fall"
            />
          )}
          <ResultPopup
            isOpen={isPopupOpen}
            isCorrect={isCorrect}
            onClose={() => setIsPopupOpen(false)}
          />
        </>
      )}
      {errors.guess && (
        <PixelBubble
          text={errors.guess.message ?? ""}
          direction="left"
          className="text-red-500 font-minecraft"
          borderColor="#ef4444"
        />
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-2">
        <Input
          {...register("guess")}
          type="text"
          placeholder="Enter city name"
          className="h-10 py-1 px-2 text-sm rounded-md  focus:ring-yellow-400"
          borderColor="#eab308"
        />
        <PixelButton
          type="submit"
          children="Guess"
          borderColor="white"
          disabled={!state?.selectedCountry}
          className="px-3 py-1 text-sm font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-105 hover:bg-yellow-400"
        />
      </form>
    </div>
  );
}

export default GuessForm;
