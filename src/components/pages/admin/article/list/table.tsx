"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/articleTypes";
import dayjs from "dayjs";

interface ArticleListTableProps {
	articles: Article[];
}

export default function ArticleListTable({ articles }: ArticleListTableProps) {
	return (
		<>
			<Table className='border-b-1'>
				<TableHeader>
					<TableRow className='bg-gray-100'>
						<TableHead className='w-[225px] text-center py-[12px]'>Thumbnails</TableHead>
						<TableHead className='w-[225px] text-center'>Title</TableHead>
						<TableHead className='w-[225px] text-center'>Category</TableHead>
						<TableHead className='w-[225px] text-center'>Created at</TableHead>
						<TableHead className='w-[225px] text-center'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{articles.map((article: Article) => (
						<TableRow key={article.id}>
							<TableCell className='font-medium text-center align-center'>
								<Image
									src={article.imageUrl}
									alt={article.title}
									width={60}
									height={60}
									className='rounded mx-auto h-[60px] w-[60px] object-cover'
								/>
							</TableCell>
							<TableCell className='align-center whitespace-normal'>{article.title}</TableCell>
							<TableCell className='align-center text-center whitespace-normal'>
								{article.category.name}
							</TableCell>
							<TableCell className='align-center text-center whitespace-normal'>
								{article.createdAt ? dayjs(article.createdAt).format("MMMM D, YYYY HH:mm:ss") : "-"}
							</TableCell>
							<TableCell className='text-center align-center'>
								<Link
									href={`/admin/articles/preview/${article.id}`}
									className='text-blue-600 hover:underline mr-2'
								>
									Preview
								</Link>
								<Link
									href={`/admin/articles/edit/${article.id}`}
									className='text-blue-600 hover:underline mr-2'
								>
									Edit
								</Link>
								<button className='text-red-600 cursor-pointer hover:underline'>Delete</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
