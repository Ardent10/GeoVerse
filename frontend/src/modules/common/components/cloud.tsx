import { motion } from "framer-motion";

export function Cloud({
  src,
  width,
  initial,
  duration,
  delay = 0,
}: {
  src: string;
  width: string;
  initial: { x: number; y: number };
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.img
      src={src}
      className="absolute opacity-70"
      style={{
        width: `${width}vw`,
        top: `${initial.y}vh`,
      }}
      initial={{ x: `${initial.x}vw`, y: initial.y }}
      animate={{ x: "-20vw" }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,

      }}
    />
  );
}
