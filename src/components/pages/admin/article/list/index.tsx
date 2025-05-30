"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, Plus, Search } from "lucide-react";
import ArticleListTable from "./table";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";
import { Article } from "@/types/articleTypes";
import { Category } from "@/types/categoryTypes";
import { dummyArticles } from "@/lib/dummy-data/articles";
import { useDebounce } from "@/hooks/use-debounce";
import { ApiResponse } from "@/types/genericTypes";

export default function AdminArticleList() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [categoryError, setCategoryError] = useState<string | null>(null);
	const [totalArticle, setTotalArticle] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	// Search and filter state
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");

	console.log("Selected Category", selectedCategory);

	// Debounce the search query with 500ms
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	// Fetch categories
	const fetchCategories = useCallback(async () => {
		try {
			const response = await fetch("https://test-fe.mysellerpintar.com/api/categories?limit=100");

			if (!response.ok) {
				throw new Error(`Error fetching categories: ${response.statusText}`);
			}

			const data = await response.json();

			// Filter out categories with null, undefined, or empty string IDs
			const validCategories = data.data.filter(
				(category: Category) => category.id !== null && category.id !== undefined && category.id !== ""
			);

			// Check if no valid categories were found
			if (validCategories.length === 0) {
				setCategoryError("No categories found. Please check your data source.");
				setCategories([]);
			} else {
				// Clear any previous category errors
				setCategoryError(null);
				setCategories(validCategories);
			}
		} catch (err) {
			console.error("Failed to fetch categories:", err);
			setCategoryError("Failed to load categories. Please try again later.");
			setCategories([]);
		}
	}, []);

	// Fetch articles with search and pagination
	const fetchArticles = useCallback(async () => {
		try {
			setLoading(true);

			// Extract category ID if a specific category is selected
			const categoryId =
				selectedCategory && selectedCategory.startsWith("category_")
					? selectedCategory.replace("category_", "")
					: null;

			const params = new URLSearchParams({
				page: currentPage.toString(),
				limit: "10",
				title: debouncedSearchQuery,
				...(categoryId ? { category: categoryId } : {}),
			});

			const response = await fetch(`https://test-fe.mysellerpintar.com/api/articles?${params.toString()}`);

			if (!response.ok) {
				throw new Error(`Error fetching articles: ${response.statusText}`);
			}

			const data: ApiResponse<Article> = await response.json();

			// Log the full API response for debugging
			console.log("API Response:", {
				data: data.data,
				page: data.page,
				limit: data.limit,
				total: data.total,
			});

			setArticles(data.data);
			setTotalArticle(data.total);

			// Ensure current page is within total pages
			const totalPages = Math.ceil(data.total / data.limit);
			if (currentPage > totalPages) {
				setCurrentPage(totalPages || 1);
			}

			setError(null);
		} catch (err) {
			console.error("Failed to fetch articles:", err);
			setError("Failed to load articles. Using dummy data.");

			// Filter dummy data based on search and category
			const filteredDummyArticles = dummyArticles.filter(
				(article) =>
					(debouncedSearchQuery
						? article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
						: true) &&
					(selectedCategory && selectedCategory !== "all_categories"
						? article.categoryId === selectedCategory.replace("category_", "")
						: true)
			);

			setArticles(filteredDummyArticles);
			setTotalArticle(filteredDummyArticles.length);
		} finally {
			setLoading(false);
		}
	}, [currentPage, debouncedSearchQuery, selectedCategory]);

	// Fetch categories on component mount
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	// Trigger fetch when search, category, or page changes
	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	return (
		<>
			<div className='container mx-auto'>
				<Card>
					<CardHeader className='border-b-1 pb-4'>
						<CardTitle>
							Total Article: {loading ? "..." : error ? dummyArticles.length : totalArticle}
						</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='border-b-1 flex flex-wrap justify-between px-6 pb-6'>
							<div className='flex gap-2'>
								<Select
									value={selectedCategory}
									onValueChange={(value) => {
										setSelectedCategory(value);
										// Reset to first page when category changes
										setCurrentPage(1);
									}}
									disabled={categoryError !== null}
								>
									<SelectTrigger className='w-[180px] cursor-pointer'>
										<SelectValue
											placeholder={categoryError ? "No Categories" : "Select Category"}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='all_categories'>All Categories</SelectItem>
											{categories.map((category) => (
												<SelectItem key={category.id} value={`category_${category.id}`}>
													{category.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								<div className='flex space-x-2 items-center'>
									<div className='relative'>
										<Search
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
											size={18}
										/>
										<Input
											type='text'
											placeholder='Search by title'
											className='pl-10 w-full max-w-[240px]'
											value={searchQuery}
											onChange={(e) => {
												setSearchQuery(e.target.value);
												// Reset to first page when search query changes
												setCurrentPage(1);
											}}
										/>
									</div>
								</div>
							</div>

							<Button variant='default' size='lg'>
								<Plus className='' />
								Add Articles
							</Button>
						</div>

						{!error ? (
							<ArticleListTable articles={articles} />
						) : (
							<div className='p-10'>
								<Alert variant='destructive'>
									<AlertCircleIcon />
									<AlertTitle>Unable to load articles.</AlertTitle>
									<AlertDescription>
										<p>Unknown error occured. Please contact administrator.</p>
									</AlertDescription>
								</Alert>
							</div>
						)}

						{loading && (
							<div className='p-20'>
								<p className='text-center animate-bounce'>Loading Data...</p>
							</div>
						)}

						{!loading && !error && articles.length === 0 ? (
							<div className='p-10'>
								<Alert variant='default'>
									<AlertTitle className='text-center'>No Article found.</AlertTitle>
								</Alert>
							</div>
						) : null}
					</CardContent>
					<CardFooter>
						{!loading && !error && !(articles.length === 0) ? (
							<PaginationCustom
								currentPage={currentPage}
								totalItems={totalArticle}
								itemsPerPage={10}
								onPageChange={setCurrentPage}
							/>
						) : null}
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
