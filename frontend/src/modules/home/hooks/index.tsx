import { useState } from "react";
import { useAppState } from "@store/index";
import { globalApiCallHelper } from "@utils/globalApiCallHelper";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    dispatch({ type: "SET_TOAST", payload: { visible: true, message, type } });
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const data = await globalApiCallHelper({
        api: "/auth/login",
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!data || data.error) {
        showToast(
          "Login Failed: " + (data?.message || "Unknown error"),
          "error"
        );
        return;
      }

      localStorage.setItem("token", data.user.token);
      dispatch({ type: "SET_USER_PROFILE", payload: data.user });
      dispatch({
        type: "SET_SCORE",
        payload: {
          score: data.score,
          correctAnswer: data.correctAnswer,
          incorrectAnswer: data.incorrectAnswer,
        },
      });

      navigate("/game");
      showToast("Login successful!", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({
    username,
    email,
    password,
    invited,
  }: {
    username?: string;
    email: string;
    password: string;
    invited: boolean;
  }) => {
    setLoading(true);

    try {
      const data = await globalApiCallHelper({
        api: "/auth/signup",
        method: "POST",
        body: JSON.stringify({ username, email, password, invited }),
      });

      if (!data || data.error) {
        showToast(
          "Signup Failed: " + (data?.message || "Unknown error"),
          "error"
        );
        return;
      }

      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER_PROFILE", payload: data.user });
      dispatch({
        type: "SET_SCORE",
        payload: {
          score: data.score,
          correctAnswer: data.correctAnswer,
          incorrectAnswer: data.incorrectAnswer,
        },
      });
      navigate("/game");
      showToast("Signup successful!", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const playAsGuest = () => {
    dispatch({
      type: "SET_USER_PROFILE",
      payload: { id: "guest", name: "Guest", isGuest: true },
    });
    showToast("Playing as Guest", "success");
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT", payload: {} });
    navigate("/");
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const data = await globalApiCallHelper({
        api: "/auth/profile",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data && !data.error) {
        dispatch({ type: "SET_USER_PROFILE", payload: data.user });
        dispatch({
          type: "SET_SCORE",
          payload: {
            score: data.score,
            correctAnswer: data.correctAnswer,
            incorrectAnswer: data.incorrectAnswer,
          },
        });
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  return {
    user: state.user,
    toast: state.toast,
    loading,
    login,
    signup,
    playAsGuest,
    logout,
    fetchUser,
  };
};
