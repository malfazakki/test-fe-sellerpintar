import { create } from "zustand";
import { AuthState } from "@/types/authTypes";

export const useAuthStore = create<AuthState>((set) => ({
	token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
	role: typeof window !== "undefined" && localStorage.getItem("role") ? localStorage.getItem("role") : null,
	isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
	setAuth: (token, role) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", role);
		set({ token, role });
	},
	clearAuth: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		set({ token: null, role: null });
	},
}));
