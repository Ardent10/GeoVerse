import { useAppState } from "@store/index";
import { PixelButton } from "./button";

export function Score() {
  const [state] = useAppState();
  return (
    <PixelButton
      borderColor="white"
      className="bg-yellow-400"
      children={
        <span className="text-lg font-semibold">Score: {state?.score}</span>
      }
    />
  );
}
