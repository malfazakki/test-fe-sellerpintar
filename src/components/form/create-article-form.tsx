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
import { useCreateArticle } from "@/hooks/mutation/use-articles";
import { useRouter } from "next/navigation";

export default function CreateArticleForm() {
	const router = useRouter();

	// Fetch categories
	const { data: categoriesData } = useCategories({
		page: 1,
		limit: 100,
		search: "",
	});

	// Form setup
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ArticleFormData>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: "",
			content: "",
			categoryId: "",
			imageUrl: null,
		},
	});

	// Mutation hook
	const { mutate: createArticle, isPending } = useCreateArticle();

	const onSubmit = (data: ArticleFormData) => {
		createArticle(data);
	};

	const categories: Category[] = categoriesData?.data || [];
	const validCategories = categories.filter(
		(category) => category.id !== null && category.id !== undefined && category.id !== ""
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{/* Thumbnails field */}
			<div className='space-y-1'>
				<Label className='text-sm font-medium'>Thumbnails</Label>
				<Controller name='imageUrl' control={control} render={({ field }) => <FileUpload {...field} />} />
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
				<Button type='button' variant='default' className='bg-slate-200 !text-black hover:bg-slate-300'>
					Preview
				</Button>
				<Button type='submit' disabled={isPending}>
					{isPending ? "Uploading..." : "Upload"}
				</Button>
			</div>
		</form>
	);
}
