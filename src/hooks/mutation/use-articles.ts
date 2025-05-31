import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { ArticleFormData } from "@/lib/validation/article.validation";
import { useRouter } from "next/navigation";

export function useCreateArticle() {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: ArticleFormData) => {
			let imageUrl = null;

			// Upload gambar jika ada
			if (data.imageUrl) {
				const formData = new FormData();
				formData.append("image", data.imageUrl);

				const uploadResponse = await api.post("/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				if (uploadResponse.data?.imageUrl) {
					imageUrl = uploadResponse.data.imageUrl;
				}
			}

			// Kirim data JSON ke endpoint artikel
			const jsonData = {
				title: data.title,
				content: data.content,
				categoryId: data.categoryId,
				imageUrl,
			};

			return api.post("/articles", jsonData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["articles"] });
			router.push("/admin/articles");
		},
		onError: (error) => {
			console.error("Error creating article:", error);
		},
	});
}

export function useEditArticle(articleId: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: ArticleFormData) => {
			let imageUrl = null;

			// Upload gambar jika ada
			if (data.imageUrl) {
				const formData = new FormData();
				formData.append("image", data.imageUrl);

				const uploadResponse = await api.post("/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				if (uploadResponse.data?.imageUrl) {
					imageUrl = uploadResponse.data.imageUrl;
				}
			}

			// Kirim data JSON ke endpoint artikel
			const jsonData = {
				title: data.title,
				content: data.content,
				categoryId: data.categoryId,
				imageUrl,
			};

			return api.put(`/articles/${articleId}`, jsonData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["articles"] });
			router.push("/admin/articles");
		},
		onError: (error) => {
			console.error("Error editing article:", error);
		},
	});
}
