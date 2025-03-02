import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "pixel-retroui";
import { PixelButton } from "../../common/components/button";

type FormValues = {
  guess: string;
};

interface GuessFormProps {
  onSubmit: (data: FormValues) => void;
}

const GuessForm: React.FC<GuessFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="flex items-center gap-6">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input className="p-2 rounded-md"
          {...register("guess", { required: true })}
          type="text"
          placeholder="Enter city name"
        />
        <PixelButton className="py-2 px-4" type="submit" label="Guess" />
      </form>
    </div>
  );
};

export default GuessForm;
