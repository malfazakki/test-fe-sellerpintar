"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { HomepageFilterProps } from "@/types/homepage.types";

export default function HeroSectionHomepage({
	state,
	onSearchChange,
	onCategoryChange,
	categories,
	isLoading,
	isError,
}: HomepageFilterProps) {
	// Validate Categories
	const validCategories = categories.filter(
		(category) => category.id !== null && category.id !== undefined && category.id !== ""
	);

	const categoryError = isError.categories ? "Error loading categories" : null;

	return (
		<div
			className='h-[500px] relative bg-cover bg-center flex flex-col items-center justify-center'
			style={{
				backgroundImage: 'url("/assets/image/hero-section-img.jpg")',
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Overlay */}
			<div className='absolute inset-0 bg-[#2563EB] opacity-86 z-10'></div>

			{/* Content Container */}
			<div className='relative z-20 w-full px-4'>
				{/* Text Content */}
				<div className='text-white text-center max-w-[730px] mx-auto space-y-3'>
					<h3 className='font-bold text-xs sm:text-sm md:text-base'>Blog Genzet</h3>
					<h1 className='font-medium text-3xl sm:text-4xl lg:text-5xl'>
						The Journal : Design Resources, Interviews, and Industry News
					</h1>
					<h2 className='text-base sm:text-xl lg:text-2xl'>Your daily dose of design insights!</h2>
				</div>

				{/* Filter Bar */}
				<div className='flex flex-col lg:flex-row gap-2 justify-center w-full mt-6 bg-blue-500 mx-auto rounded-lg max-w-[400px] lg:max-w-[610px] p-[10px]'>
					<Select
						value={state.selectedCategory}
						onValueChange={(value) => onCategoryChange(value)}
						disabled={isLoading.categories || isError.categories}
					>
						<SelectTrigger className='w-full lg:w-[180px] bg-white cursor-pointer'>
							<SelectValue
								placeholder={
									categoryError
										? "Error loading categories"
										: isLoading.categories
										? "Loading Categories..."
										: "Select Category"
								}
								className='text-black'
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

					<div className='relative w-full'>
						<Search
							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
							size={18}
						/>
						<Input
							type='text'
							placeholder='Search by title'
							className='pl-10 w-full bg-white'
							value={state.searchQuery}
							onChange={(e) => onSearchChange(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
