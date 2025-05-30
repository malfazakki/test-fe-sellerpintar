"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import ArticleListTable from "./table";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";
import { ArticlesApiResponse, Article } from "@/types/articleTypes";
import { dummyArticles } from "@/lib/dummy-data/articles";
import { useDebounce } from "@/hooks/use-debounce";

export default function AdminArticleList() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalArticle, setTotalArticle] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	// Search state
	const [searchQuery, setSearchQuery] = useState("");

	// Debounce the search query with 500ms
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	// Fetch articles with search and pagination
	const fetchArticles = useCallback(async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams({
				page: currentPage.toString(),
				limit: "10",
				title: debouncedSearchQuery,
			});

			const response = await fetch(`https://test-fe.mysellerpintar.com/api/articles?${params.toString()}`);

			if (!response.ok) {
				throw new Error(`Error fetching articles: ${response.statusText}`);
			}

			const data: ArticlesApiResponse = await response.json();

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

			// Filter dummy data based on search
			const filteredDummyArticles = dummyArticles.filter((article) =>
				debouncedSearchQuery ? article.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) : true
			);

			setArticles(filteredDummyArticles);
			setTotalArticle(filteredDummyArticles.length);
		} finally {
			setLoading(false);
		}
	}, [currentPage, debouncedSearchQuery]);

	// Trigger fetch when search or page changes
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
								<Select>
									<SelectTrigger className='w-[180px] cursor-pointer'>
										<SelectValue placeholder='Select Category' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>{/* Placeholder for future category selection */}</SelectGroup>
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

						<ArticleListTable articles={articles} />
					</CardContent>
					<CardFooter>
						<PaginationCustom
							currentPage={currentPage}
							totalItems={totalArticle}
							itemsPerPage={10}
							onPageChange={setCurrentPage}
						/>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
