"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, Plus, Search } from "lucide-react";
import ArticleListTable from "./table";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";
import { useDebounce } from "@/hooks/use-debounce";
import { useCategories } from "@/hooks/queries/use-category";
import { Article } from "@/types/articleTypes";
import { Category } from "@/types/categoryTypes";
import { useRouter } from "next/navigation";
import { useArticles } from "@/hooks/queries/use-articles";

export default function AdminArticleList() {
	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(1);

	// Search and filter state
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all_categories");

	// Debounce the search query with 500ms
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	// Extract category ID if a specific category is selected
	const categoryId =
		selectedCategory && selectedCategory !== "all_categories" ? selectedCategory.replace("category_", "") : null;

	// Fetch articles using useArticles hook
	const {
		data: articlesData,
		isLoading: isLoadingArticles,
		isError: isErrorArticles,
		error: articlesError,
	} = useArticles({
		page: currentPage,
		limit: 10,
		title: debouncedSearchQuery,
		category: categoryId,
	});

	// Fetch categories using useCategories hook
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

	const articles: Article[] = articlesData?.data || [];
	const totalArticle = articlesData?.total || 0;
	const categories: Category[] = categoriesData?.data || [];

	// Validate Categories
	const validCategories = categories.filter(
		(category: Category) => category.id !== null && category.id !== undefined && category.id !== ""
	);

	const categoryError = isErrorCategories ? categoriesError?.message : null;

	const handleClickAdd = () => {
		router.push("/admin/articles/create");
	};

	return (
		<>
			<div className='container mx-auto'>
				<Card>
					<CardHeader className='border-b-1 pb-4'>
						<CardTitle>
							Total Article: {isLoadingArticles ? "..." : isErrorArticles ? "N/A" : totalArticle}
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
									disabled={isLoadingCategories || isErrorCategories}
								>
									<SelectTrigger className='w-[180px] cursor-pointer'>
										<SelectValue
											placeholder={
												categoryError
													? "Error loading categories"
													: isLoadingCategories
													? "Loading Categories..."
													: "Select Category"
											}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='all_categories'>All Categories</SelectItem>
											{validCategories.map((category) => (
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

							<Button variant='default' size='lg' onClick={handleClickAdd}>
								<Plus className='' />
								Add Articles
							</Button>
						</div>

						{isErrorArticles ? (
							<div className='p-10'>
								<Alert variant='destructive'>
									<AlertCircleIcon />
									<AlertTitle>Unable to load articles.</AlertTitle>
									<AlertDescription>
										{articlesError ? (
											<p>{articlesError.message}</p>
										) : (
											<p>Unknown error occured. Please contact administrator.</p>
										)}
									</AlertDescription>
								</Alert>
							</div>
						) : isLoadingArticles ? (
							<div className='p-20'>
								<p className='text-center animate-bounce'>Loading Data...</p>
							</div>
						) : articles.length === 0 ? (
							<div className='p-10'>
								<Alert variant='default'>
									<AlertTitle className='text-center'>No Article found.</AlertTitle>
								</Alert>
							</div>
						) : (
							<ArticleListTable articles={articles} />
						)}
					</CardContent>
					<CardFooter>
						{!isErrorArticles && !isLoadingArticles && articles.length > 0 ? (
							<PaginationCustom
								currentPage={currentPage}
								totalItems={totalArticle}
								itemsPerPage={10}
								onPageChange={setCurrentPage}
							/>
						) : null}
					</CardFooter>
					{/* Display category loading/error separately if needed */}
					{isLoadingCategories && <p className='text-center'>Loading categories...</p>}
					{isErrorCategories && (
						<p className='text-center text-red-500'>Error loading categories: {categoriesError?.message}</p>
					)}
				</Card>
			</div>
		</>
	);
}
