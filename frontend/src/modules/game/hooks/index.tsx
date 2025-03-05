import { useState } from "react";
import { useAppState } from "@store/index";
import { globalApiCallHelper } from "@utils/globalApiCallHelper";

export function useGame() {
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    dispatch({ type: "SET_TOAST", payload: { visible: true, message, type } });
  };

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

  const getCluesByCountry = async (country: string, clueIndex: number) => {
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

      dispatch({
        type: "SET_GUESSED_CITY_RESULT",
        payload: {
          guessedCityResult: {
            funFact: response.funFact,
            trivia: response.trivia,
          },
        },
      });
    } catch (err) {
      setError("Failed to fetch fun fact");
    } finally {
      setLoading(false);
    }
  };

  const submitGuess = async (
    city: string,
    country: string,
    cluesUsed: number
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await globalApiCallHelper({
        api: "/game/submit-answer",
        method: "POST",
        body: JSON.stringify({
          userId: state?.user?.id || null,
          country,
          answer: city,
          cluesUsed,
        }),
      });

      if (!response) {
        showToast("No response from server", "error");
        return;
      }

      const { correct, message, newScore } = response;

      dispatch({
        type: "SET_GUESS_RESULT",
        payload: { correct, message },
      });

      dispatch({
        type: "SET_SCORE",
        payload: newScore,
      });
      return response;
    } catch (err) {
      setError("Error processing guess");
    } finally {
      setLoading(false);
    }
  };

  const challengeFriend = async (invitedUsername: string) => {
    if (!invitedUsername) {
      showToast("Please enter a username", "error");
      return;
    }

    if (!state?.user?.username) {
      showToast("You need to login to invite friend's.", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const response = await globalApiCallHelper({
        api: "/auth/challenge",
        method: "POST",
        body: JSON.stringify({ invitedUsername }),
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.inviteLink) {
        showToast("Challenge sent successfully!", "success");
        return response.inviteLink;
      } else {
        showToast(response.message || "Failed to send challenge.", "error");
      }
    } catch (err) {
      setError("Error sending challenge");
      showToast("Failed to send challenge", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    loading,
    error,
    getCluesByCountry,
    fetchFunFact,
    submitGuess,
    getAllCountries,
    challengeFriend,
  };
}
