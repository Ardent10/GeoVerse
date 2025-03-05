import { useState } from "react";
import { Input, Card } from "pixel-retroui";
import { useAppState } from "@store/index";
import { PixelButton } from "@modules/common/components/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGame } from "@modules/game/hooks";
import { challengeFormData, challengeFormSchema } from "@utils/validations";

export default function ChallengeFriend() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(challengeFormSchema),
  });
  const [inviteLink, setInviteLink] = useState("");
  const [state] = useAppState();
  const { challengeFriend } = useGame();

  const onSubmit = async ({ username }: challengeFormData) => {
    const data = await challengeFriend(username);
    setInviteLink(data.inviteLink);
  };

  return (
    <Card className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Challenge a Friend</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          {...register("username")}
          placeholder="Enter friend's username"
          className="mb-2 w-full"
        />
        {errors.username && (
          <p className="text-red-500 mb-2">{errors.username.message}</p>
        )}
        <PixelButton type="submit" className="mb-4 w-full">
          Send Challenge
        </PixelButton>
      </form>
      {inviteLink && (
        <div className="mt-2 text-center">
          <p>Share this invite:</p>
          <a
            href={`https://wa.me/?text=Join%20me%20in%20this%20game!%20${inviteLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Send via WhatsApp
          </a>
        </div>
      )}
      {state.user?.score !== undefined && (
        <div className="mt-4 p-2 border border-gray-300 rounded">
          <p>
            Your Score: <strong>{state.user.score}</strong>
          </p>
        </div>
      )}
    </Card>
  );
}
