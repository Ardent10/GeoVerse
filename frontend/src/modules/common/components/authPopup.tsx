import { useState } from "react";
import { Input, Button } from "pixel-retroui";
import { useForm } from "react-hook-form";
import { PixelPopup } from "@modules/common/components/popup";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "@utils/validations";
import { PixelButton } from "./button";
import { useNavigate } from "react-router";
import { useAuth } from "@modules/home/hooks";
import { Toast } from "./toast";

interface AuthModalProps {
  isOpen?: boolean;
  onClose: () => void;
  setShowAuthForm?: (visibility: boolean) => void;
}

function AuthForm({ onClose, setShowAuthForm }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signup, loading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: AuthFormData) {
    if (isSignUp) {
      await signup({
        username: data?.username,
        email: data.email,
        password: data.password,
      });
    } else {
      await login({ email: data.email, password: data.password });
    }
    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 min-w-[26vw] max-w-sm mx-auto"
    >
      <div className="flex items-center justify-between">
        <PixelButton
          type="button"
          className="text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
          onClick={() => setShowAuthForm && setShowAuthForm(false)}
          children={
            <img src="/assets/common/back.png" height={25} width={25} />
          }
        />

        <h2 className="text-xl font-bold">{isSignUp ? "Sign Up" : "Login"}</h2>
      </div>

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

      {isSignUp && (
        <div className="flex items-center gap-2">
          <Input
            {...register("invited")}
            type="checkbox"
            className="w-6 h-6 accent-yellow-500"
          />
          <label>I was invited</label>
        </div>
      )}

      <PixelButton
        className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
        type="submit"
        children={isSignUp ? "Sign Up" : "Login"}
      />

      {/* Toggle Between Login and Signup */}
      <p className="text-center text-sm">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span
          onClick={() => {
            reset();
            setIsSignUp(!isSignUp);
          }}
          className="text-yellow-400 ml-1 hover:underline cursor-pointer"
        >
          {isSignUp ? "Login" : "Sign Up"}
        </span>
      </p>
    </form>
  );
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthForm] = useState(false);

  const {
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const handleGuestLogin = () => {
    navigate("/game");
    onClose();
  };

  return (
    <PixelPopup
      isOpen={isOpen}
      onClose={() => {
        reset();
        setShowAuthForm(false);
        onClose();
      }}
      title={!showAuthForm ? "Welcome to GeoVerse" : ""}
    >
      {!showAuthForm ? (
        <div className="flex flex-col gap-4 p-4 min-w-[26vw] max-w-sm mx-auto">
          <PixelButton
            className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-green-500 shadow-lg transition transform hover:scale-110 hover:bg-green-400"
            children="▶ Play as Guest"
            onClick={handleGuestLogin}
          />
          <PixelButton
            className="px-4 py-2 text-md font-bold tracking-wide btn-hover bg-yellow-500 shadow-lg transition transform hover:scale-110 hover:bg-yellow-400"
            children="Login / Sign Up"
            onClick={() => setShowAuthForm(true)}
          />
        </div>
      ) : (
        <AuthForm onClose={onClose} setShowAuthForm={setShowAuthForm} />
      )}
    </PixelPopup>
  );
};
