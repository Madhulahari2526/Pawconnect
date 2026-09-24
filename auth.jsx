import { createContext, useContext, useEffect, useState } from "react";
import { authApi, backendEnabled } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pett_user")) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("pett_token")));

  useEffect(() => {
    if (!localStorage.getItem("pett_token")) return;
    if (localStorage.getItem("pett_token") === "demo-token") {
      setLoading(false);
      return;
    }
    authApi.me().then((data) => setUser(data.user)).catch(() => logout()).finally(() => setLoading(false));
  }, []);

  function saveSession(data) {
    localStorage.setItem("pett_token", data.token);
    localStorage.setItem("pett_user", JSON.stringify(data.user));
    setUser(data.user);
  }
  async function login(credentials) {
    try {
      const data = await authApi.login(credentials);
      saveSession(data);
      return data;
    } catch {
      if (backendEnabled) throw new Error("Login failed. Check your email and password.");
      const data = { user: { id: "demo-user", name: "Demo User", email: credentials.email, role: "user" }, token: "demo-token" };
      saveSession(data);
      return data;
    }
  }
  async function register(details) {
    try {
      const data = await authApi.register(details);
      saveSession(data);
      return data;
    } catch {
      if (backendEnabled) throw new Error("Registration failed. Check the details and try again.");
      const data = { user: { id: "demo-user", name: details.name, email: details.email, role: "user" }, token: "demo-token" };
      saveSession(data);
      return data;
    }
  }
  function logout() { localStorage.removeItem("pett_token"); localStorage.removeItem("pett_user"); setUser(null); }

  async function requestPhoneOtp(phone) { return authApi.requestPhoneOtp(phone); }
  async function verifyPhoneOtp(phone, otp) {
    const data = await authApi.verifyPhoneOtp(phone, otp);
    saveSession(data);
    return data;
  }

  return <AuthContext.Provider value={{ user, loading, login, register, requestPhoneOtp, verifyPhoneOtp, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
