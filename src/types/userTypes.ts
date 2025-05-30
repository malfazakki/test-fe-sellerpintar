import { ApiResponse } from "./genericTypes";

export interface User {
	id: string;
	username: string;
	role?: "User" | "Admin";
}

export type UsersApiResponse = ApiResponse<User>;
