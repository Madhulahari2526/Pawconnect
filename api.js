const API_BASE = import.meta.env.VITE_API_URL || "/api";
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === "true";
import localPets from "./data";

export const backendEnabled = USE_BACKEND;

export function getDemoPets() {
  try {
    return [...JSON.parse(localStorage.getItem("pett_posted_pets") || "[]"), ...localPets];
  } catch {
    return localPets;
  }
}

export function saveDemoPet(pet) {
  try {
    const posted = JSON.parse(localStorage.getItem("pett_posted_pets") || "[]");
    // attach poster info from current demo session user if available
    try {
      const user = JSON.parse(localStorage.getItem("pett_user"));
      if (user) {
        pet.posterName = pet.posterName || user.name || user.email || "PawConnect User";
        pet.posterPhone = pet.posterPhone || user.phone || pet.contactPhone || "";
      }
    } catch (e) {
      // ignore
    }
    posted.unshift(pet);
    localStorage.setItem("pett_posted_pets", JSON.stringify(posted));
    window.dispatchEvent(new Event("pett-pets-changed"));
  } catch (e) {
    console.error("Failed to save demo pet", e);
  }
}

export function getDemoFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem("pett_favorites") || "[]");
  } catch {
    return [];
  }
}

export function toggleDemoFavorite(id) {
  const normalizedId = String(id);
  const ids = getDemoFavoriteIds().map(String);
  const index = ids.indexOf(normalizedId);
  if (index >= 0) ids.splice(index, 1);
  else ids.push(normalizedId);
  localStorage.setItem("pett_favorites", JSON.stringify(ids));
  window.dispatchEvent(new Event("pett-favorites-changed"));
  return index < 0;
}

export async function apiRequest(path, options = {}) {
  if (!USE_BACKEND) {
    throw new Error("Demo mode");
  }
  const token = localStorage.getItem("pett_token");
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: "Bearer " + token } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error("Backend is unavailable. Start MongoDB and run npm run backend:dev.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 502) {
      throw new Error("Backend is unavailable. Start MongoDB and run npm run backend:dev.");
    }
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const authApi = {
  login: (body) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  requestPhoneOtp: async (phone) => {
    if (!USE_BACKEND) {
      const otp = "123456";
      localStorage.setItem("pett_demo_otp", otp);
      localStorage.setItem("pett_demo_otp_phone", phone);
      return { message: "Demo OTP generated.", demoOtp: otp };
    }
    return apiRequest("/auth/phone/request-otp", { method: "POST", body: JSON.stringify({ phone }) });
  },
  verifyPhoneOtp: async (phone, otp) => {
    if (!USE_BACKEND) {
      if (phone !== localStorage.getItem("pett_demo_otp_phone") || otp !== localStorage.getItem("pett_demo_otp")) {
        throw new Error("Invalid or expired OTP");
      }
      return { user: { id: "demo-phone-user", name: "Phone User", email: "", phone, role: "user" }, token: "demo-token" };
    }
    return apiRequest("/auth/phone/verify-otp", { method: "POST", body: JSON.stringify({ phone, otp }) });
  },
  register: (body) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  forgotPassword: async (body) => {
    if (!USE_BACKEND) {
      localStorage.setItem("pett_demo_reset_email", body.email);
      return { demo: true, resetToken: "demo-reset-token" };
    }
    return apiRequest("/auth/forgot-password", { method: "POST", body: JSON.stringify(body) });
  },
  resetPassword: async (body) => {
    if (!USE_BACKEND) {
      if (body.token !== "demo-reset-token") throw new Error("Reset link is invalid or has expired");
      localStorage.setItem("pett_demo_password", body.password);
      return { message: "Password reset successful. You can now log in." };
    }
    return apiRequest("/auth/reset-password", { method: "POST", body: JSON.stringify(body) });
  },
  me: () => apiRequest("/auth/me"),
};
