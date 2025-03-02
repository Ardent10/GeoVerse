import { useEffect, useState } from "react";
import { useAppState } from "@store/index";
import { globalApiCallHelper } from "@utils/globalApiCallHelper";

export const useAuth = () => {
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle login
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await globalApiCallHelper({
        api: "/auth/login",
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!data || data.error) throw new Error(data?.message || "Login failed");

      localStorage.setItem("token", data.token);
      dispatch({ type: "setUserProfile", payload: data.user });
    } catch (err: any) {
      setError(err.message);
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
    setError(null);
    try {
      const data = await globalApiCallHelper({
        api: "/auth/signup",
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      if (!data || data.error)
        throw new Error(data?.message || "Signup failed");

      localStorage.setItem("token", data.token);
      dispatch({ type: "setUserProfile", payload: data.user });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to allow users to play as a guest
  const playAsGuest = () => {
    dispatch({
      type: "setUserProfile",
      payload: { id: "guest", name: "Guest", isGuest: true },
    });
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout", payload: {} });
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
        dispatch({ type: "setUserProfile", payload: data });
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
    error,
    login,
    signup,
    playAsGuest,
    logout,
    fetchUser,
  };
};
