import { Popup } from "pixel-retroui";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const PixelPopup: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <Popup
      className={className}
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      {children}
    </Popup>
  );
};
