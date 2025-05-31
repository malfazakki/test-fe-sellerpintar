import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@/types/articleTypes";

interface UseArticlesParams {
	page: number;
	limit: number;
	title: string;
	category: string | null;
}

export const useArticles = (params: UseArticlesParams) => {
	return useQuery({
		queryFn: async (): Promise<{ data: any[]; page: number; limit: number; total: number }> => {
			const { page, limit, title, category } = params;
			const queryParams = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
				...(title ? { title } : {}),
				...(category ? { category } : {}),
			});
			const response = await api.get(`/articles?${queryParams.toString()}`);
			return response.data;
		},
		queryKey: ["articles", params.page, params.limit, params.title, params.category],
	});
};

export const useArticleById = ({ id }: { id: string }) => {
	const fetchArticleById = async () => {
		if (!id) throw new Error("Article ID is required");

		const { data } = await api.get<Article>(`/articles/${id}`);
		return data;
	};

	return useQuery({
		queryKey: ["article", id],
		queryFn: fetchArticleById,
		enabled: !!id,
	});
};

export const useRecentArticles = (currentArticleId: string) => {
	return useQuery({
		queryFn: async (): Promise<{ data: Article[]; total: number }> => {
			const queryParams = new URLSearchParams({
				page: "1",
				limit: "3",
				excludeId: currentArticleId,
			});
			const response = await api.get(`/articles/?${queryParams.toString()}`);
			return response.data;
		},
		queryKey: ["recent-articles", currentArticleId],
		enabled: !!currentArticleId,
	});
};
