import { GameGlobe } from "../components/globe";
import GuessForm from "../components/form";

import { useAppState } from "../../../store";
import { cities } from "../../../utils/city";
import { Layout } from "../../common/components/layout";

export function Game() {
  const [state, dispatch] = useAppState();
  console.log("STATE=>", state);
  const handleGuess = (data: { guess: string }) => {
    const cityData = cities.find(
      (city) =>
        city.city.toLowerCase() === data.guess.toLowerCase() ||
        city.country.toLowerCase() === data.guess.toLocaleLowerCase()
    );

    if (cityData) {
      dispatch({ type: "setScore", payload: state.score + 1 });
      dispatch({
        type: "addGuess",
        payload: { city: cityData, correct: true },
      });

      // ✅ Move the globe to guessed location
      if (state.globeInstance) {
        state.globeInstance.pointOfView(
          { lat: cityData.latitude, lng: cityData.longitude, altitude: 1.5 },
          2000
        );
      }
    } else {
      dispatch({
        type: "addGuess",
        payload: { city: data.guess, correct: false },
      });
    }
  };

  return (
    <Layout>
      <GameGlobe />
      <GuessForm onSubmit={handleGuess} />
    </Layout>
  );
}
