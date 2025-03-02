import { useEffect, useState } from "react";
import { useAppState } from "@store/index";

export const useAuth = () => {
  const [state, dispatch] = useAppState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle login
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      dispatch({ type: "setUserProfile", payload: data.user });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle signup
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

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
    dispatch({ type: "logout", payload: {} }); // Reset global state
  };

  // Load user session on initial mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) dispatch({ type: "setUserProfile", payload: data });
        else logout();
      } catch {
        logout();
      }
    };

    fetchUser();
  }, []);

  return {
    user: state.user,
    loading,
    error,
    login,
    signup,
    playAsGuest,
    logout,
  };
};
