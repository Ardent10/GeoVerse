import { motion } from "framer-motion";

export function Cloud({
  src,
  top,
  left,
  right,
  width,
}: {
  src: string;
  top: string;
  left?: string;
  right?: string;
  width: string;
}) {
  return (
    <motion.img
      src={src}
      className={`absolute top-${top} ${left ? `left-${left}` : ""} ${
        right ? `right-${right}` : ""
      } w-${width} opacity-80 animate-cloud-move`}
      initial={{ x: left ? -100 : 100 }}
      animate={{ x: left ? 100 : -100 }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    />
  );
}
