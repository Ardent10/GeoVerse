import { useAppState } from "../../../store";
import { cities } from "../../../utils/city";
import { Navbar } from "../components/navbar";
import { HeroContent } from "../components/content";
import { Cloud } from "@modules/common/components/cloud";

export function Home() {
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
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-white to-blue-600">
      <div className="absolute inset-0 bg-[url('https://cdn.vectorstock.com/i/500p/16/64/cloudy-night-sky-pixel-art-trendy-background-vector-49391664.jpg')] bg-cover bg-center opacity-40" />

      <Navbar />
      <HeroContent />

      <Cloud src="/assets/cloud1.png" top="32" left="16" width="40" />
      <Cloud src="/assets/cloud2.png" top="40" right="16" width="40" />
      <Cloud src="/assets/cloud1.png" top="60" left="32" width="32" />
    </div>
  );
}
