import { Bubble } from "pixel-retroui";

interface PixelBubbleProps {
  text: string;
  direction: "left" | "right";
}

export function PixelBubble({ text }: PixelBubbleProps) {
  return <Bubble direction="left">{text}</Bubble>;
}
