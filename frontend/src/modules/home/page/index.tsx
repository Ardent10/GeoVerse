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

      <Cloud src="/assets/cloud1.png" width="12" initial={{ x: 110, y: 30 }} duration={18} />
      <Cloud
        src="/assets/cloud2.png"
        width="10"
        initial={{ x: 120, y: 20 }}
        delay={3}
        duration={25}
        />
      <Cloud
        src="/assets/cloud1.png"
        width="14"
        initial={{ x: 180, y: 45 }}
        delay={1.5}
        duration={20}
        />
      <Cloud
        src="/assets/cloud2.png"
        width="11"
        initial={{ x: 100, y: 65 }}
        delay={2}
        duration={25}
      />
    </div>
  );
}
