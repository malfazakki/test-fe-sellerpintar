import api from "@/lib/api";
import { Category } from "@/types/categoryTypes";
import { useQuery } from "@tanstack/react-query";

interface UseCategoriesParams {
	page: number;
	limit: number;
	search: string;
}

export const useCategories = (params: UseCategoriesParams) => {
	return useQuery({
		queryFn: async (): Promise<{ data: Category[]; currentPage: number; limit: number; totalData: number }> => {
			const { page, limit, search } = params;
			const queryParams = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
				search,
			});
			const response = await api.get(`/categories?${queryParams.toString()}`);
			return response.data;
		},
		queryKey: ["categories", params.page, params.limit, params.search],
	});
};
