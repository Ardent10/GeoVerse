import { Popup } from "pixel-retroui";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const PixelModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </Popup>
  );
};