"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Plus, Search } from "lucide-react";
import CategoryListTable from "./table";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";
import { useDebounce } from "@/hooks/use-debounce";
import { useModalStore } from "@/store/modalStore";
import { useCategories } from "@/hooks/queries/use-category";

export default function AdminCategoryList() {
	const [currentPage, setCurrentPage] = useState(1);

	// Search state
	const [searchQuery, setSearchQuery] = useState("");

	const { openModal } = useModalStore();

	// Debounce the search query with 500ms
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	// Fetch categories with search and pagination
	const { data, isLoading, isError, error } = useCategories({
		page: currentPage,
		limit: 10,
		search: debouncedSearchQuery,
	});

	const categories = data?.data || [];
	const totalCategories = data?.totalData || 0;
	const loading = isLoading;

	const handleClickAdd = () => {
		openModal("categoryDialog", { type: "create" });
	};

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

							<Button variant='default' size='lg' onClick={handleClickAdd}>
								<Plus className='' />
								Add Category
							</Button>
						</div>

						{!isError ? (
							<CategoryListTable categories={categories} />
						) : (
							<div className='p-10'>
								<Alert variant='destructive'>
									<AlertCircleIcon />
									<AlertTitle>Unable to load categories.</AlertTitle>
									<AlertDescription>
										{error ? (
											<p>{error.message}</p>
										) : (
											<p>Unknown error occured. Please contact administrator.</p>
										)}
									</AlertDescription>
								</Alert>
							</div>
						)}

						{loading && (
							<div className='p-20'>
								<p className='text-center animate-bounce'>Loading Data...</p>
							</div>
						)}
					</CardContent>
					<CardFooter>
						{!isError && !loading ? (
							<PaginationCustom
								currentPage={currentPage}
								totalItems={totalCategories}
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
