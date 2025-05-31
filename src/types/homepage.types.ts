import { Category } from "./categoryTypes";

export interface HomepageFilterState {
	currentPage: number;
	searchQuery: string;
	selectedCategory: string;
}

export interface HomepageFilterProps {
	state: HomepageFilterState;
	onSearchChange: (query: string) => void;
	onCategoryChange: (category: string) => void;
	categories: Category[];
	isLoading: {
		categories: boolean;
		articles: boolean;
	};
	isError: {
		categories: boolean;
		articles: boolean;
	};
}
