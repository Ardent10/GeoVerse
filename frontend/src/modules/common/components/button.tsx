import React from "react";
import { Button } from "pixel-retroui";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
}

export const PixelButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "blue",
}) => {
  return (
    <Button color={color} onClick={onClick}>
      {label}
    </Button>
  );
};

