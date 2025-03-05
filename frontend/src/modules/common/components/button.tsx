import React, { ReactNode, useEffect, useRef } from "react";
import { Button } from "pixel-retroui";
import { useAppState } from "@store/index";
import { PixelLoader } from "./loader";

interface ButtonProps {
  children?: ReactNode | string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit";
  className?: string;
  borderColor?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const PixelButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  color,
  type,
  className,
  borderColor,
  disabled,
  loading,
}) => {
  const [state] = useAppState();
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/assets/mouseclick.wav");
  }, []);

  function handleClick() {
    if (!state.isMuted && clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch((error) => {
        console.error("Audio play failed", error);
      });
    }

    if (onClick) {
      onClick();
    }
  }

  return (
    <Button
      disabled={disabled}
      className={`px-3 py-1 text-sm font-bold tracking-wide transition transform ${
        disabled
          ? "bg-gray-400 opacity-50 cursor-not-allowed"
          : "btn-hover shadow-lg hover:scale-105"
      } ${className}`}
      type={type}
      color={color}
      onClick={handleClick}
      borderColor={borderColor}
    >
      {loading ? <PixelLoader variant="ghost"/> : children}
    </Button>
  );
};
