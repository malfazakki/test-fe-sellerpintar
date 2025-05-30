"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import CategoryListTable from "./table";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";
import { useDebounce } from "@/hooks/use-debounce";
import { CategoriesApiResponse, Category } from "@/types/categoryTypes";

export default function AdminCategoryList() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalCategories, setTotalCategories] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	// Search state
	const [searchQuery, setSearchQuery] = useState("");

	// Debounce the search query with 500ms
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	// Fetch categories with search and pagination
	const fetchCategories = useCallback(async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams({
				search: debouncedSearchQuery,
				page: currentPage.toString(),
				limit: "10",
			});

			const response = await fetch(`https://test-fe.mysellerpintar.com/api/categories?${params.toString()}`);

			if (!response.ok) {
				throw new Error(`Error fetching categories: ${response.statusText}`);
			}

			const data: CategoriesApiResponse = await response.json();

			// Log the full API response for debugging
			console.log("API Response:", {
				data: data.data,
				page: data.currentPage,
				limit: data.limit,
				total: data.totalData,
			});

			setCategories(data.data);
			setTotalCategories(data.totalData);

			// Ensure current page is within total pages
			const totalPages = Math.ceil(data.totalData / data.limit);
			if (currentPage > totalPages) {
				setCurrentPage(totalPages || 1);
			}

			setError(null);
		} catch (err) {
			console.error("Failed to fetch categories:", err);
			setError("Failed to load categories.");
			setCategories([]);
			setTotalCategories(0);
		} finally {
			setLoading(false);
		}
	}, [currentPage, debouncedSearchQuery]);

	// Trigger fetch when search or page changes
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<>
			<div className='container mx-auto'>
				<Card>
					<CardHeader className='border-b-1 pb-4'>
						<CardTitle>Total Category: {loading ? "..." : totalCategories}</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='border-b-1 flex flex-wrap justify-between px-6 pb-6'>
							<div className='flex gap-2'>
								<div className='flex space-x-2 items-center'>
									<div className='relative'>
										<Search
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
											size={18}
										/>
										<Input
											type='text'
											placeholder='Search by name'
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
								Add Category
							</Button>
						</div>

						{error || <CategoryListTable categories={categories} />}
						{error !== null && <span className='text-center'>Error occured...</span>}
					</CardContent>
					<CardFooter>
						<PaginationCustom
							currentPage={currentPage}
							totalItems={totalCategories}
							itemsPerPage={10}
							onPageChange={setCurrentPage}
						/>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
