import { Popup } from "pixel-retroui";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const PixelPopup: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Popup className="rounded-lg w-full" isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </Popup>
  );
};