import React, { ReactNode, useEffect, useRef } from "react";
import { Button } from "pixel-retroui";
import { useAppState } from "@store/index";

interface ButtonProps {
  children?: ReactNode | string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit";
  className?: string;
  borderColor?: string;
}

export const PixelButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  color,
  type,
  className,
  borderColor,
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
      className={className}
      type={type}
      color={color}
      onClick={handleClick}
      borderColor={borderColor}
    >
      {children}
    </Button>
  );
};
