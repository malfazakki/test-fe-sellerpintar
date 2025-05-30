"use client";

import dayjs from "dayjs";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Category } from "@/types/categoryTypes";

interface ArticleListTableProps {
	categories: Category[];
}

export default function CategoryListTable({ categories }: ArticleListTableProps) {
	return (
		<>
			<Table className='border-b-1'>
				<TableHeader>
					<TableRow className='bg-gray-100'>
						<TableHead className='w-[225px] text-center'>Category</TableHead>
						<TableHead className='w-[225px] text-center'>Created at</TableHead>
						<TableHead className='w-[225px] text-center'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.map((category: Category) => (
						<TableRow key={category.id}>
							<TableCell className='align-center whitespace-normal py-8 text-center'>
								{category.name}
							</TableCell>
							<TableCell className='align-center text-center whitespace-normal'>
								{category.createdAt ? dayjs(category.createdAt).format("MMMM D, YYYY HH:mm:ss") : "-"}
							</TableCell>
							<TableCell className='text-center align-center'>
								<Link
									href={`/admin/articles/edit/${category.id}`}
									className='text-blue-600 underline mr-2'
								>
									Edit
								</Link>
								<button className='text-red-600 cursor-pointer underline'>Delete</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
