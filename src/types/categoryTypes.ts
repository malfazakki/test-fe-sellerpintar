export interface Category {
	id: string;
	name: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export type CategoriesApiResponse = {
	data: Category[];
	totalData: number;
	currentPage: number;
	limit: number;
	totalPages: number;
};
