import { useState } from "react";
import { Input, Button } from "pixel-retroui";
import { useForm } from "react-hook-form";
import { PixelPopup } from "../../common/components/popup";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../../../utils/validations";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: any) => {
    console.log(isSignUp ? "Signing Up..." : "Logging In...", data);
    onClose();
  };

  return (
    <PixelPopup
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title={isSignUp ? "Sign Up" : "Login"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 min-w-[26vw] max-w-sm mx-auto"
      >
        {isSignUp && (
          <div>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
        )}

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button className="btn-hover" type="submit">
          {isSignUp ? "Sign Up" : "Login"}
        </Button>

        {/* Toggle Between Login and Signup */}
        <p className="text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => {
              reset();
              setIsSignUp(!isSignUp);
            }}
            className="text-blue-500 ml-1 hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </PixelPopup>
  );
};
