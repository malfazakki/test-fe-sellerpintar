import { Category } from "./categoryTypes";
import { ApiResponse } from "./genericTypes";
import { User } from "./userTypes";

export interface Article {
	id: string;
	userId: string;
	categoryId: string;
	title: string;
	content: string;
	category: Category;
	user: User;
	createdAt: string;
	updatedAt: string;
	imageUrl: string;
}

// Generic API Response Type

// Type aliases for convenience
export type ArticlesApiResponse = ApiResponse<Article>;
