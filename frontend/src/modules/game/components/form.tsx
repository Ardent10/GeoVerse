import GuessForm from "./forms/guessForm";
import CountryForm from "./forms/countryForm";
import { useAppState } from "@store/index";

export function FormWrapper() {
  const [state] = useAppState();
  return (
    <div className="flex flex-col justify-between items-center gap-6 w-full h-full ">
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
  );
}
