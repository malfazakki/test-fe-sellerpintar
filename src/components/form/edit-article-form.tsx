"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleFormData, articleSchema } from "@/lib/validation/article.validation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./file-upload";
import Link from "next/link";
import { RichTextEditor } from "@/components/editor/tiptap";
import { useCategories } from "@/hooks/queries/use-category";
import { Category } from "@/types/categoryTypes";
import { useEditArticle } from "@/hooks/mutation/use-articles";
import { useArticleById } from "@/hooks/queries/use-articles";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditArticleForm() {
	const router = useRouter();
	const params = useParams();
	const articleId = params.id as string;

	// Fetch categories
	const { data: categoriesData, isLoading: isLoadingCategory } = useCategories({
		page: 1,
		limit: 100,
		search: "",
	});

	// Fetch article data by ID
	const {
		data: articleData,
		isLoading: isLoadingArticle,
		error: articleError,
	} = useArticleById({
		id: articleId,
	});

	// Form setup
	const {
		register,
		handleSubmit,
		control,
		reset,
		watch,
		formState: { errors },
	} = useForm<ArticleFormData>({
		resolver: zodResolver(articleSchema),
		mode: "onChange",
		defaultValues: {
			title: "",
			content: "",
			categoryId: "",
			imageUrl: null,
		},
	});

	// Mutation hooks
	const { mutate: updateArticle, isPending } = useEditArticle(articleId);

	// Reset form when article data is loaded
	useEffect(() => {
		if (articleData) {
			const formData = {
				title: articleData.title || "",
				content: articleData.content || "",
				categoryId: articleData.categoryId,
				imageUrl: articleData.imageUrl || null,
			};

			reset(formData);
		}
	}, [articleData, reset]);

	const onSubmit = (data: ArticleFormData) => {
		if (articleId) {
			// Update existing article
			updateArticle({
				...data,
			});
		}
	};

	const categories: Category[] = categoriesData?.data || [];
	const validCategories = categories.filter(
		(category) => category.id !== null && category.id !== undefined && category.id !== ""
	);

	// Loading state
	if (isLoadingArticle || isLoadingCategory) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto'></div>
					<p className='mt-2 text-gray-600'>Loading article...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (articleError) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='text-center'>
					<p className='text-red-500'>Error loading article</p>
					<Button onClick={() => router.push("/admin/articles")} variant='outline' className='mt-4'>
						Back to Articles
					</Button>
				</div>
			</div>
		);
	}

	console.log("watch: ", watch());

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{/* Thumbnails field */}
			<div className='space-y-1'>
				<Label className='text-sm font-medium'>Thumbnails</Label>
				<Controller
					name='imageUrl'
					control={control}
					render={({ field }) => <FileUpload {...field} imageUrl={articleData?.imageUrl} />}
				/>
				{errors?.imageUrl && (
					<div className='flex items-center text-red-500 text-sm'>
						<span>{String(errors.imageUrl?.message)}</span>
					</div>
				)}
			</div>

			{/* Title Field */}
			<div className='space-y-1'>
				<Label htmlFor='title' className='text-sm font-medium'>
					Title
				</Label>
				<Input
					id='title'
					type='text'
					placeholder='Input title'
					{...register("title")}
					className={`w-full bg-white px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
				/>
				{errors.title && (
					<div className='flex items-center text-red-500 text-sm'>
						<span>{errors.title.message}</span>
					</div>
				)}
			</div>

			{/* Category Field */}
			<div className='space-y-1'>
				<Label htmlFor='categoryId' className='text-sm font-medium'>
					Category
				</Label>
				<Controller
					name='categoryId'
					control={control}
					key={watch("categoryId")}
					render={({ field }) => (
						<Select onValueChange={field.onChange} value={field.value}>
							<SelectTrigger className={`w-full bg-white`}>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent>
								{validCategories.map((category) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				{errors.categoryId ? (
					<div className='flex items-center text-red-500 text-sm'>
						<span>{errors.categoryId.message}</span>
					</div>
				) : (
					<div className='flex items-center text-sm'>
						<span>
							The existing category list can be seen in the{" "}
							<Link href='/admin/categories' className='hover:underline text-blue-500'>
								category
							</Link>{" "}
							menu
						</span>
					</div>
				)}
			</div>

			{/* Content Field */}
			<div className='space-y-1'>
				<Label htmlFor='content' className='text-sm font-medium'>
					Content
				</Label>
				<Controller
					name='content'
					control={control}
					render={({ field }) => (
						<RichTextEditor
							value={field.value}
							onChange={field.onChange}
							key={watch("content")}
							placeholder='Start writing your content...'
						/>
					)}
				/>
				{errors.content && (
					<div className='flex items-center text-red-500 text-sm mt-1'>
						<span>{errors.content.message}</span>
					</div>
				)}
			</div>

			<div className='flex justify-end space-x-2'>
				<Button type='button' variant='outline' onClick={() => router.push("/admin/articles")}>
					Cancel
				</Button>
				{/* <Button type='button' variant='default' className='bg-slate-200 !text-black hover:bg-slate-300'>
					Preview
				</Button> */}
				<Button type='submit' disabled={isPending}>
					{isPending ? "Uploading..." : "Upload"}
				</Button>
			</div>
		</form>
	);
}
