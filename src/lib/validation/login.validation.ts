import { z } from "zod";

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, "Please enter your username")
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must not exceed 20 characters")
		.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

	password: z
		.string()
		.min(1, "Please enter your password")
		.min(8, "Password must be at least 8 characters long")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number"
		),
});

export type LoginFormData = z.infer<typeof loginSchema>;
