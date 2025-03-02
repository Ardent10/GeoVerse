import { Navbar } from "../components/navbar";
import { HeroContent } from "../components/content";
import { Cloud } from "@modules/common/components/cloud";

export function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-white to-blue-600">
      
      <div className="absolute inset-0 bg-[url('https://cdn.vectorstock.com/i/500p/16/64/cloudy-night-sky-pixel-art-trendy-background-vector-49391664.jpg')] bg-cover bg-center" />
      
      {/* <div className="absolute inset-0 bg-[url('https://images.stockcake.com/public/e/2/5/e25531e0-8065-410d-af76-ea3bbeb0d531/pixelated-twilight-sky-stockcake.jpg')] bg-cover bg-center opacity-40" /> */}

      <Navbar />
      <HeroContent />

      <Cloud src="/assets/cloud1.png" top="32" left="16" width="40" />
      <Cloud src="/assets/cloud2.png" top="40" right="16" width="40" />
      <Cloud src="/assets/cloud1.png" top="60" left="32" width="32" />
    </div>
  );
}
