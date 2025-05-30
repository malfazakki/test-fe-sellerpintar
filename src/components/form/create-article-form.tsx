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

export default function CreateArticleForm() {
	const router = useRouter();

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
		// Create FormData to handle file upload
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("content", data.content || "");
		formData.append("categoryId", data.categoryId);

		// Append file if exists
		if (data.imageUrl) {
			formData.append("imageUrl", data.imageUrl);
		}

		await api.post("/articles", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		queryClient.invalidateQueries({ queryKey: ["articles"] });
		router.push("/admin/articles");
	};

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
				<Select onValueChange={(value) => register("categoryId").onChange({ target: { value } })}>
					<SelectTrigger className={`w-full bg-white`}>
						<SelectValue placeholder='Select category' />
					</SelectTrigger>
					<SelectContent>
						{/* Add category items here dynamically */}
						<SelectItem value='placeholder-category-id'>Placeholder Category</SelectItem>
					</SelectContent>
				</Select>

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
				<Input
					id='content'
					type='text'
					placeholder='Type a content...'
					{...register("content")}
					className={`w-full bg-white px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent `}
				/>
				{errors.content && (
					<div className='flex items-center text-red-500 text-sm'>
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
