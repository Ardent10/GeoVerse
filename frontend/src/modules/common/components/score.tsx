import { useAppState } from "@store/index";
import { PixelButton } from "./button";

export function Score() {
  const [state] = useAppState();
  return (
    <PixelButton
      children={
        <span className="text-lg font-semibold">
          Score: {state?.user?.score}
        </span>
      }
    />
  );
}
