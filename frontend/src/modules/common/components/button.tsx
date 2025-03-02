import React from "react";
import { Button } from "pixel-retroui";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  type?: "button" | "submit";
  className?:string
}

export const PixelButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "blue",
  type,
  className
}) => {
  return (
    <Button className={className} type={type} color={color} onClick={onClick}>
      {label}
    </Button>
  );
};
