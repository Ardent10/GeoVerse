import React, { useEffect, useState } from "react";
import { Card } from "pixel-retroui";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 right-5 w-80"
        >
          <Card
            borderColor={type === "success" ? "green" : "red"}
            className={`px-4 py-2 rounded-lg shadow-lg ${
              type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            <h2 className="font-semibold">
              {type === "success" ? "Success 🎉" : "Error ❌"}
            </h2>
            <p>{message}</p>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
