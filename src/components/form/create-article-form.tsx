"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { ArticleFormData, articleSchema } from "@/lib/validation/article.validation";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./file-upload";
import Link from "next/link";
import { RichTextEditor } from "@/components/editor/tiptap";
import { useCategories } from "@/hooks/queries/use-category";
import { Category } from "@/types/categoryTypes";

export default function CreateArticleForm() {
	const router = useRouter();

	// Fetch categories using useCategories hook
	const {
		data: categoriesData,
		// isLoading: isLoadingCategories,
		// isError: isErrorCategories,
		// error: categoriesError,
	} = useCategories({
		page: 1,
		limit: 100,
		search: "",
	});

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

	const queryClient = useQueryClient();

	const onSubmit = async (data: ArticleFormData) => {
		try {
			let imageUrl = null;

			// Upload gambar jika ada
			if (data.imageUrl) {
				const formData = new FormData();
				formData.append("image", data.imageUrl);

				const uploadResponse = await api.post("https://test-fe.mysellerpintar.com/api/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				if (uploadResponse.data && uploadResponse.data.imageUrl) {
					imageUrl = uploadResponse.data.imageUrl;
				}
			}

			// Kirim data JSON ke endpoint artikel
			const jsonData = {
				title: data.title,
				content: data.content,
				categoryId: data.categoryId,
				imageUrl: imageUrl,
			};

			console.log("jsonData: ", jsonData);

			await api.post("/articles", jsonData);

			// Invalidate query dan redirect
			queryClient.invalidateQueries({ queryKey: ["articles"] });
			router.push("/admin/articles");
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const categories: Category[] = categoriesData?.data || [];

	// Validate Categories
	const validCategories = categories.filter(
		(category: Category) => category.id !== null && category.id !== undefined && category.id !== ""
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
			{/* Thumbnails field */}
			<div className='space-y-1'>
				<Label className='text-sm font-medium'>Thumbnails</Label>
				<Controller
					name='imageUrl'
					control={control}
					render={({ field }) => (
						<FileUpload {...field} className={errors.imageUrl ? "border-red-500" : ""} />
					)}
				/>
				{errors.imageUrl && (
					<div className='flex items-center text-red-500 text-sm'>
						<span>{errors.imageUrl.message}</span>
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
				{/* Wrap Select with Controller */}
				<Controller
					name='categoryId'
					control={control}
					render={({ field }) => (
						<Select onValueChange={field.onChange} value={field.value}>
							<SelectTrigger className={`w-full bg-white ${errors.categoryId ? "border-red-500" : ""}`}>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent>
								{/* Map categories to SelectItem components */}
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
				<Button type='button' variant='outline'>
					Cancel
				</Button>
				<Button type='button' variant='default' className='bg-slate-200 !text-black hover:bg-slate-300'>
					Preview
				</Button>
				<Button type='submit'>Upload</Button>
			</div>
		</form>
	);
}
