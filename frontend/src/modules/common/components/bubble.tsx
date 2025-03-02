import { Bubble } from "pixel-retroui";

interface PixelBubbleProps {
  text: string;
  direction: "left" | "right";
  className?: string;
  borderColor?:string
}

export function PixelBubble({ text, className, direction, borderColor }: PixelBubbleProps) {
  return (
    <Bubble
      borderColor={borderColor}
      direction={direction}
      className={`text-xs h-4 flex  items-center ${className}`}
    >
      {text}
    </Bubble>
  );
}
