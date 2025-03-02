import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "pixel-retroui";
import { PixelButton } from "@modules/common/components/button";
import { PixelBubble } from "@modules/common/components/bubble";
import { guessForm } from "@utils/validations";
import { z } from "zod";

type GuessFormProps = {
  onSubmit: (data: z.infer<typeof guessForm>) => void;
};

const GuessForm: React.FC<GuessFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof guessForm>>({
    resolver: zodResolver(guessForm),
  });

  const handleFormSubmit = (data: z.infer<typeof guessForm>) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
      {errors.guess && (
        <PixelBubble
          text={errors.guess.message ?? ""}
          direction="left"
          className="text-red-500 "
          borderColor="#ef4444"
        />
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-2">
        <Input
          {...register("guess")}
          type="text"
          placeholder="Enter city name"
          className="rounded-md"
          borderColor="#eab308"
        />
        <PixelButton
          type="submit"
          children="Guess"
          borderColor="white"
          className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
        />
      </form>
    </div>
  );
};

export default GuessForm;
