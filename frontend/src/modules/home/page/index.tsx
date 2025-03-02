import { Navbar } from "../components/navbar";
import { HeroContent } from "../components/content";
import { Cloud } from "@modules/common/components/cloud";
import { playSound } from "@utils/playSound";
import { useEffect } from "react";
import { useAppState } from "@store/index";

export function Home() {
  useEffect(() => {
    playSound("/sounds/game.mp3", true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-white to-blue-600">
      <div className="absolute inset-0 bg-[url('https://cdn.vectorstock.com/i/500p/16/64/cloudy-night-sky-pixel-art-trendy-background-vector-49391664.jpg')] bg-cover bg-center" />

      <Navbar />
      <HeroContent />

      <Cloud
        src="/assets/cloud1.png"
        width="8"
        initial={{ x: 110, y: 5 }}
        duration={60}
        delay={6}
      />
      <Cloud
        src="/assets/cloud2.png"
        width="10"
        initial={{ x: 120, y: 20 }}
        delay={7}
        duration={50}
      />
      <Cloud
        src="/assets/cloud1.png"
        width="12"
        initial={{ x: 180, y: 45 }}
        delay={5}
        duration={65}
      />
      <Cloud
        src="/assets/cloud2.png"
        width="11"
        initial={{ x: 100, y: 65 }}
        delay={2}
        duration={70}
      />
    </div>
  );
}
