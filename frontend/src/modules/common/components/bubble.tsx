import { Bubble } from "pixel-retroui";

interface PixelBubbleProps {
  text: string;
}

export function PixelBubble({ text }: PixelBubbleProps) {
  return <Bubble direction="left">{text}</Bubble>;
}
