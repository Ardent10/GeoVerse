let gameAudio: HTMLAudioElement | null = null;

export const playSound = (src: string, play: boolean) => {
  if (gameAudio) {
    gameAudio.pause();
    gameAudio.currentTime = 0;
    gameAudio = null;
  }

  if (play) {
    gameAudio = new Audio(src);
    gameAudio.loop = true;
    gameAudio.play().catch((error) =>
      console.error("Error playing sound:", error)
    );
  }
};

export const stopSound = () => {
  if (gameAudio) {
    gameAudio.pause();
    gameAudio.currentTime = 0;
    gameAudio = null;
  }
};
