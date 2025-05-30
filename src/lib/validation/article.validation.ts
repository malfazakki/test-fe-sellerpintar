import * as z from "zod";

export const articleSchema = z.object({
	title: z.string().min(1, { message: "Please enter title" }),
	content: z.string().min(1, { message: "Content field cannot be empty" }),
	categoryId: z.string().min(1, { message: "Please select a category" }),
	imageUrl: z
		.instanceof(File)
		.nullable()
		.optional()
		.refine(
			(file) => {
				if (!file) return true; // Allow no file
				return file.size <= 5 * 1024 * 1024; // 5MB max
			},
			{ message: "Image must be 5MB or less" }
		)
		.refine(
			(file) => {
				if (!file) return true;
				const allowedTypes = ["image/jpeg", "image/png"];
				return allowedTypes.includes(file.type);
			},
			{ message: "Only .jpg and .png files are allowed" }
		),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
