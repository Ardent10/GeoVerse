// import { motion } from "framer-motion";

// export function Cloud({
//   src,
//   top,
//   width,
//   delay = 0,
// }: {
//   src: string;
//   top: string;
//   width: string;
//   delay?: number;
// }) {
//   return (
//     <motion.img
//       src={src}
//       className="absolute opacity-70"
//       style={{
//         top: `${top}vh`,
//         width: `${width}vw`,
//       }}
//       initial={{ x: "100vw" }} // Start fully off-screen on the right
//       animate={{ x: "-50vw" }} // Move far left before looping back
//       transition={{
//         duration: 20 + Math.random() * 10, // Speed varies between 20s - 30s
//         repeat: Infinity, // Continuous movement
//         ease: "linear",
//         delay, // Staggered start times for variety
//       }}
//     />
//   );
// }

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
        top: `${initial.y}vh`, // Start from passed y value
      }}
      initial={{ x: `${initial.x}vw` }} // Start from passed x value
      animate={{ x: "-20vw" }} // Move off-screen to the left
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}
