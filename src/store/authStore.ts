import { create } from "zustand";
import { AuthState } from "@/types/authTypes";

export const useAuthStore = create<AuthState>((set) => ({
	token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
	role: typeof window !== "undefined" ? localStorage.getItem("role") : null,
	isAuthenticated:
		typeof window !== "undefined" ? !!localStorage.getItem("token") && !!localStorage.getItem("role") : false,
	setAuth: (token, role) => {
		localStorage.setItem("token", token);
		localStorage.setItem("role", role);
		set({
			token,
			role,
			isAuthenticated: !!token && !!role,
		});
	},
	clearAuth: () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		set({
			token: null,
			role: null,
			isAuthenticated: false,
		});
	},
}));
