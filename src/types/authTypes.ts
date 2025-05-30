export interface AuthState {
	token: string | null;
	role: string | null;
	isAuthenticated: boolean;
	setAuth: (token: string, role: string) => void;
	clearAuth: () => void;
}
