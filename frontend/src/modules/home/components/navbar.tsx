import { Button } from "pixel-retroui";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-5 flex justify-between items-center px-10">
      <img src="/assets/logo.png" alt="Logo" className="h-20 w-20" />

      <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg px-4 py-2 text-yellow-400 heading">
        GeoVerse
      </h1>

      <Button
        borderColor="#ffff"
        className="px-4 py-2 text-lg font-bold bg-yellow-500 border-4 shadow-lg transition transform hover:scale-105 hover:bg-yellow-400 hover:text-white"
        onClick={() => navigate("/game")}
      >
        ▶ Play Now
      </Button>
    </div>
  );
}
