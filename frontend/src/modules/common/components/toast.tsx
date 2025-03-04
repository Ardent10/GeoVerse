import { useEffect } from "react";
import { useAppState } from "@store/index";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "pixel-retroui";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [state, dispatch] = useAppState();

  if (!state?.toast?.visible) return null;

  useEffect(() => {
    if (state?.toast?.visible) {
      const timer = setTimeout(() => {
        dispatch({
          type: "SET_TOAST",
          payload: { visible: false, message: "", type: "" },
        });
        if (onClose) onClose();
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [state?.toast?.visible, dispatch, duration]);

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}
