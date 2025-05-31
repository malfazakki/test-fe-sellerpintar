"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Article } from "@/types/articleTypes";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";
import { Skeleton } from "@/components/ui/skeleton";

// Function to convert HTML to plain text
function htmlToPlainText(html: string): string {
	// Remove HTML tags
	const plainText = html.replace(/<[^>]*>/g, "");

	// Decode HTML entities
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = plainText;
	return tempDiv.textContent || tempDiv.innerText || "";
}

// Function to truncate text to 2 lines
function truncateText(text: string, maxLines: number = 2): string {
	// Split text into words
	const words = text.split(/\s+/);
	const lines: string[] = [];
	let currentLine = "";

	for (const word of words) {
		// If adding this word would exceed 2 lines, stop
		if (lines.length >= maxLines) break;

		// If current line would become too long, start a new line
		if ((currentLine + " " + word).length > 100) {
			lines.push(currentLine.trim());
			currentLine = word;
		} else {
			currentLine += (currentLine ? " " : "") + word;
		}
	}

	// Add last line if not already added
	if (lines.length < maxLines && currentLine) {
		lines.push(currentLine.trim());
	}

	// Join lines and add ellipsis if truncated
	const truncatedText = lines.join(" ");
	return truncatedText.length < text.length ? truncatedText + "..." : truncatedText;
}

interface ArticleListProps {
	articles: Article[];
	totalArticles: number;
	onPageChange: (page: number) => void;
	currentPage: number;
	isLoading?: boolean;
	hidePagination?: boolean;
}

// Skeleton Card Component
export function ArticleCardSkeleton() {
	return (
		<div className='space-y-3'>
			<Skeleton className='h-[240px] w-full rounded-[12px]' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-2/3' />
				<Skeleton className='h-5 w-full' />
				<Skeleton className='h-4 w-full' />
				<div className='flex items-center justify-between mt-4'>
					<Skeleton className='h-7 w-24 rounded-full' />
				</div>
			</div>
		</div>
	);
}

export default function ArticleList({
	articles,
	totalArticles,
	onPageChange,
	currentPage,
	isLoading = false,
	hidePagination = false,
}: ArticleListProps) {
	const itemsPerPage = 9; // Match the current grid layout

	// Render skeleton cards when loading
	if (isLoading) {
		return (
			<div className='container mx-auto px-4 py-10 space-y-6'>
				<Skeleton className='h-5 w-1/3' />
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[60px]'>
					{Array.from({ length: itemsPerPage }).map((_, index) => (
						<ArticleCardSkeleton key={index} />
					))}
				</div>
			</div>
		);
	}

	// Existing render logic for articles
	return (
		<div className='container mx-auto px-4 py-10 space-y-6'>
			{!hidePagination ? (
				<>
					{/* Total Articles */}
					<div>
						<p className='text-sm'>
							Showing: {articles.length} of {totalArticles} articles
						</p>
					</div>
				</>
			) : null}

			{/* Articles Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[60px]'>
				{articles.map((article) => (
					<Link href={`/articles/${article.id}`} key={article.id} className='group'>
						<div className='rounded-lg overflow-hidden transition-all duration-300'>
							{/* Article Image */}
							<div className='relative h-[240px] w-full rounded-[12px] overflow-hidden'>
								<Image
									src={article.imageUrl || "/placeholder-image.jpg"}
									alt={article.title}
									fill
									className='object-cover'
								/>
							</div>

							{/* Article Content */}
							<div className='mt-[16px]'>
								<div className='space-y-2'>
									{/* Date */}
									<p className='text-sm font-normal text-slate-600'>
										{dayjs(article.createdAt).format("MMM D, YYYY")}
									</p>

									{/* Article Title */}
									<h3 className='text-lg font-semibold hover:text-blue-600 transition-colors'>
										{article.title}
									</h3>

									{/* Content */}
									<div className='text-sm text-gray-600 line-clamp-2'>
										{truncateText(htmlToPlainText(article.content))}
									</div>

									{/* Article Meta */}
									<div className='flex items-center justify-between mt-4'>
										{article.category && (
											<div className='p-1 px-3 rounded-full bg-blue-200'>
												<span className='text-blue-900 font-normal text-sm'>
													{article.category.name}
												</span>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>

			{!hidePagination ? (
				<>
					{/* Pagination */}
					{totalArticles > itemsPerPage && (
						<div className='flex justify-center mt-16'>
							<PaginationCustom
								currentPage={currentPage}
								totalItems={totalArticles}
								itemsPerPage={itemsPerPage}
								onPageChange={onPageChange}
							/>
						</div>
					)}
				</>
			) : null}
		</div>
	);
}
