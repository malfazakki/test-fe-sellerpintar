"use client";

import Image from "next/image";
import { useArticleById } from "@/hooks/queries/use-articles";
import { useRecentArticles } from "@/hooks/queries/use-articles";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dayjs from "dayjs";
import ArticleList from "@/components/pages/homepage/article-list";

export function ArticlePreviewComp() {
	const params = useParams();
	const articleId = params.id as string;

	const { data: article, isLoading, error } = useArticleById({ id: articleId });

	const { data: recentArticles, isLoading: isLoadingRecent } = useRecentArticles(articleId);

	const dataRecentArticles = recentArticles?.data?.slice(0, 3) || [];

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto'></div>
					<p className='mt-2 text-gray-600'>Loading article...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='text-center'>
					<p className='text-red-500'>Error loading article</p>
					<Link href='/'>
						<Button variant='outline' className='mt-4'>
							Back to Articles
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	if (!article) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<p className='text-gray-600'>No article found</p>
			</div>
		);
	}

	return (
		<>
			<div className='max-w-6xl mx-auto px-4 py-8 mt-[100px]'>
				<div className='text-center mb-16 max-w-[672px] mx-auto'>
					<div className='flex justify-center items-center space-x-2 text-gray-600 mb-4'>
						<span>{dayjs(article.createdAt).format("MMMM D, YYYY")}</span>
						<span>•</span>
						<span>Created by {article.user.username || "Admin"}</span>
					</div>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-900 '>{article.title}</h1>
				</div>

				<div className='mb-8'>
					<div className='relative w-full aspect-video rounded-lg overflow-hidden max-h-[480px]'>
						<Image
							src={article.imageUrl || "/assets/image/figma-dev-mode.jpg"}
							alt={article.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				</div>

				<article
					className='prose lg:prose-xl max-w-none'
					dangerouslySetInnerHTML={{ __html: article.content }}
				/>
				{/* Other Articles Section */}
				{dataRecentArticles && dataRecentArticles.length > 0 && (
					<div className='container mx-auto'>
						<h2 className='text-xl font-bold mb-[-20px] mx-4 text-left mt-30'>Other Articles</h2>
						<ArticleList
							articles={dataRecentArticles}
							totalArticles={dataRecentArticles.length}
							currentPage={1}
							onPageChange={() => {}}
							isLoading={isLoadingRecent}
							hidePagination
						/>
					</div>
				)}
			</div>
		</>
	);
}
