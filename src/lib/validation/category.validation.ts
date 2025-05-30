import { z } from "zod";

export const categorySchema = z.object({
	name: z.string().min(1, "Category field cannot be empty").min(3, "Username must be at least 3 characters"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
