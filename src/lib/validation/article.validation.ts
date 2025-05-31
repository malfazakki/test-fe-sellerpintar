import * as z from "zod";

export const articleSchema = z.object({
	title: z.string().min(1, { message: "Please enter title" }),
	content: z.string().min(8, { message: "Content field cannot be empty" }),
	categoryId: z.string().min(1, { message: "Please select a category" }),
	imageUrl: z.any().superRefine((data, ctx) => {
		// If data is a string, it's valid, so no further validation is needed for it.
		if (typeof data === "string") {
			return true;
		}

		// If data is not a string, it must be a File object and pass file-specific validations.
		if (!(data instanceof File)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please upload a picture or provide a valid image URL",
			});
			return false;
		}

		// Validasi: File tidak boleh kosong
		if (data.size === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Please upload a picture or provide a valid image URL",
			});
			return false;
		}

		// Validasi: Ukuran file maksimal 5MB
		if (data.size > 5 * 1024 * 1024) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Image must be 5MB or less",
			});
			return false;
		}

		// Validasi: Hanya format .jpg dan .png yang diperbolehkan
		const allowedTypes = ["image/jpeg", "image/png"];
		if (!allowedTypes.includes(data.type)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Only .jpg and .png files are allowed",
			});
			return false;
		}

		return true;
	}),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
