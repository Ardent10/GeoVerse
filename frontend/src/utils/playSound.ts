export const playSound = (src: string, loop = false) => {
  const audio = new Audio(src);
  audio.loop = loop;
  audio.currentTime = 0;
  audio.play().catch((error) => console.error("Error playing sound:", error));
};
