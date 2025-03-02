import { ProgressBar } from "pixel-retroui";

export function PixelProgressBar() {
  return (
    <ProgressBar
      size="md"
      color="black"
      borderColor="black"
      className="w-full"
      progress={50}
    />
  );
}
