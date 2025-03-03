import { useState } from "react";
import { useAppState } from "@store/index";
import { globalApiCallHelper } from "@utils/globalApiCallHelper";

export function useGame() {
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await globalApiCallHelper({
        api: "/game/countries",
      });

      dispatch({ type: "SET_COUNTRIES_LIST", payload: response.countries });
    } catch (err) {
      setError("Failed to fetch countries");
    } finally {
      setLoading(false);
    }
  };

  const fetchClue = async (country: string, clueIndex: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await globalApiCallHelper({
        api: `/game/clue/${country}/${clueIndex}`,
      });

      dispatch({ type: "SET_CLUE", payload: response.clue });
    } catch (err) {
      setError("Failed to fetch clue");
    } finally {
      setLoading(false);
    }
  };

  const fetchFunFact = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await globalApiCallHelper({
        api: `/game/fun-fact/${city}`,
      });

      dispatch({ type: "SET_FUN_FACT", payload: response.funFact });
    } catch (err) {
      setError("Failed to fetch fun fact");
    } finally {
      setLoading(false);
    }
  };

  const submitGuess = async (city: string, correctCity: string) => {
    try {
      setLoading(true);
      setError(null);
      const isCorrect = city.toLowerCase() === correctCity.toLowerCase();

      dispatch({ type: "SET_GUESS_RESULT", payload: {} });

      if (isCorrect) {
        dispatch({ type: "SET_SCORE", payload: {} });
      } else {
        dispatch({ type: "SET_SCORE", payload: {} });
      }
    } catch (err) {
      setError("Error processing guess");
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    loading,
    error,
    fetchClue,
    fetchFunFact,
    submitGuess,
    getAllCountries,
  };
}
