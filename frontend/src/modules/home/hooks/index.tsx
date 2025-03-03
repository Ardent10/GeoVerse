import { useState } from "react";
import { useAppState } from "@store/index";
import { globalApiCallHelper } from "@utils/globalApiCallHelper";

export const useAuth = () => {
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setToast(null);

    try {
      const data = await globalApiCallHelper({
        api: "/auth/login",
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!data || data.error)
        setToast({ message: "Login Failed: " + data?.message, type: "error" });

      localStorage.setItem("token", data.user.token);
      dispatch({ type: "SET_USER_PROFILE", payload: data.user });
      dispatch({ type: "SET_SCORE", payload: data.score });
      setToast({ message: "Login successful!", type: "success" });
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle signup
  const signup = async ({
    username,
    email,
    password,
  }: {
    username?: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setToast(null);

    try {
      const data = await globalApiCallHelper({
        api: "/auth/signup",
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      if (!data || data.error)
        setToast({ message: "Signup Failed: " + data?.message, type: "error" });

      localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER_PROFILE", payload: data.user });
      dispatch({ type: "SET_SCORE", payload: data.score });

      setToast({ message: "Signup successful!", type: "success" });
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const playAsGuest = () => {
    dispatch({
      type: "SET_USER_PROFILE",
      payload: { id: "guest", name: "Guest", isGuest: true },
    });
    setToast({ message: "Playing as Guest", type: "success" });
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT", payload: {} });
    setToast({ message: "Logged out successfully", type: "success" });
  };

  // Fetch user session on app load
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
        dispatch({ type: "SET_SCORE", payload: data.score });
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  return {
    user: state.user,
    loading,
    login,
    signup,
    playAsGuest,
    logout,
    fetchUser,
    toast,
  };
};
