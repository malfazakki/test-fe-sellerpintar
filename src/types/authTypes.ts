export interface User {
	username: string;
	password: string;
	role: string;
}

export interface AuthState {
	token: string | null;
	role: string | null;
	isAuthenticated: boolean;
	setAuth: (token: string, role: string) => void;
	clearAuth: () => void;
}
