export interface User {
	id: string;
	username: string;
	role: "User" | "Admin";
}

export interface Category {
	id: string;
	name: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface Article {
	id: number;
	title: string;
	content: string;
	category: Category;
	createdAt: string;
	updatedAt: string;
	imageUrl: string;
}

export interface ArticlesApiResponse {
	data: Article[];
	page: number;
	limit: number;
	total: number;
}
