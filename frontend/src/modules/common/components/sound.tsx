import { Button } from "pixel-retroui";

interface SoundToggleProps {
  isMuted: boolean;
  toggleSound: () => void;
}

export const SoundToggleButton: React.FC<SoundToggleProps> = ({
  isMuted,
  toggleSound,
}) => {
  return (
    <Button color="red" onClick={toggleSound}>
      {isMuted ? (
        <img src="./assets/common/mute.png" />
      ) : (
        <img src="./assets/common/sound.png" />
      )}
    </Button>
  );
};