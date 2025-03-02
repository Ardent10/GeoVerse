import { useAppState } from "@store/index";
import { Button } from "pixel-retroui";

export function SoundToggleButton() {
  const [state, dispatch] = useAppState();

  const toggleSound = () => {
    dispatch({
      type: "setIsMuted",
      payload: { isMuted: !state.isMuted },
    });
  };
  return (
    <Button
      borderColor="white"
      className=" text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
      onClick={toggleSound}
    >
      {state?.isMuted ? (
        <img src="/assets/common/mute.png" alt="mute" width={30} height={30} />
      ) : (
        <img
          src="/assets/common/sound.png"
          alt="sound"
          width={30}
          height={30}
        />
      )}
    </Button>
  );
}
