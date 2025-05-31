"use client";

import { useState } from "react";
import { useArticles } from "@/hooks/queries/use-articles";
import { useCategories } from "@/hooks/queries/use-category";
import { useDebounce } from "@/hooks/use-debounce";
import { HomepageFilterState } from "@/types/homepage.types";
import HeroSectionHomepage from "./hero-section";
import ArticleList from "./article-list";

export default function HomepageComp() {
	// Initial state for homepage filters
	const [filterState, setFilterState] = useState<HomepageFilterState>({
		currentPage: 1,
		searchQuery: "",
		selectedCategory: "all_categories",
	});

	// Debounce the search query with 500ms
	const debouncedSearchQuery = useDebounce(filterState.searchQuery, 500);

	// Extract category ID if a specific category is selected
	const categoryId =
		filterState.selectedCategory && filterState.selectedCategory !== "all_categories"
			? filterState.selectedCategory.replace("category_", "")
			: null;

	// Fetch articles
	const {
		data: articlesData,
		isLoading: isLoadingArticles,
		isError: isErrorArticles,
		error: articlesError,
	} = useArticles({
		page: filterState.currentPage,
		limit: 10,
		title: debouncedSearchQuery,
		category: categoryId,
	});

	// Fetch categories
	const {
		data: categoriesData,
		isLoading: isLoadingCategories,
		isError: isErrorCategories,
		error: categoriesError,
	} = useCategories({
		page: 1,
		limit: 100,
		search: "",
	});

	// Handlers for filter changes
	const handleSearchChange = (query: string) => {
		setFilterState((prev) => ({
			...prev,
			searchQuery: query,
			currentPage: 1,
		}));
	};

	const handleCategoryChange = (category: string) => {
		setFilterState((prev) => ({
			...prev,
			selectedCategory: category,
			currentPage: 1,
		}));
	};

	// Prepare props for child components
	const filterProps = {
		state: filterState,
		onSearchChange: handleSearchChange,
		onCategoryChange: handleCategoryChange,
		categories: categoriesData?.data || [],
		isLoading: {
			categories: isLoadingCategories,
			articles: isLoadingArticles,
		},
		isError: {
			categories: isErrorCategories,
			articles: isErrorArticles,
		},
	};

	return (
		<>
			<HeroSectionHomepage {...filterProps} />
			{/* Uncomment and implement ArticleList when ready */}
			{/* <ArticleList 
				articles={articlesData?.data || []} 
				totalArticles={articlesData?.total || 0}
			/> */}
		</>
	);
}
