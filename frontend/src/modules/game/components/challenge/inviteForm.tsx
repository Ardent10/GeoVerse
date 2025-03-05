import { zodResolver } from "@hookform/resolvers/zod";
import { PixelButton } from "@modules/common/components/button";
import { useGame } from "@modules/game/hooks";
import { useAppState } from "@store/index";
import { inviteFormData, inviteFormSchema } from "@utils/validations";
import { Input } from "pixel-retroui";
import { useForm } from "react-hook-form";

export function InviteFriendForm() {
  const [state, dispatch] = useAppState();
  const { challengeFriend, loading } = useGame();
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(inviteFormSchema),
  });

  function onSubmit(data: inviteFormData) {
    challengeFriend(data.username);
    reset();
  }
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <PixelButton
          type="button"
          borderColor="white"
          className="text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          onClick={() =>
            dispatch({
              type: "SET_SHOW_INVITE_FORM",
              payload: { showInviteForm: false },
            })
          }
          children={
            <img src="/assets/common/back.png" height={25} width={25} />
          }
        />
      </div>
      <div className="flex flex-col justify-center h-full  items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label className="text-white font-semibold">
            Enter Friend's Username
          </label>
          <Input
            {...register("username")}
            borderColor="#eab308"
            type="text"
            required={true}
            placeholder="Enter username to invite"
            className="px-3 py-2 w-full"
          />
          <PixelButton
            type="submit"
            borderColor="white"
            disabled={!isValid}
            loading={loading}
            className="flex items-center gap-2 px-4 py-1 bg-yellow-400  shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          >
            <img
              src="/assets/common/share1.png"
              className="h-6 w-6"
              alt="share"
            />
            Invite
          </PixelButton>
        </form>
      </div>
    </div>
  );
}
