import { Button } from "pixel-retroui";

interface ArrowButtonProps {
  direction: "left" | "right" | "up" | "down";
  onClick: () => void;
}

export const PixelArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
}) => {
  const arrows: Record<"left" | "right" | "up" | "down", string> = {
    left: "\u25C0", // ◀
    right: "\u25B6", // ▶
    up: "\u25B2", // ▲
    down: "\u25BC", // ▼
  };
  return <Button onClick={onClick}>{arrows[direction]}</Button>;
};
