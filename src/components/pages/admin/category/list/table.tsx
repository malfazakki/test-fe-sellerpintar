"use client";

import dayjs from "dayjs";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/categoryTypes";
import { useModalStore } from "@/store/modalStore";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

interface ArticleListTableProps {
	categories: Category[];
}

export default function CategoryListTable({ categories }: ArticleListTableProps) {
	const queryClient = useQueryClient();
	const { openModal } = useModalStore();

	const deleteData = async (id: string | number) => {
		await api.delete(`/categories/${id}`);
		queryClient.invalidateQueries({ queryKey: ["categories"] });
	};

	const handleEdit = (id: string | number, name: string) => {
		openModal("categoryDialog", {
			type: "edit",
			id,
			name,
		});
	};

	const handleDelete = (id: string | number, name: string) => {
		openModal("delete", {
			title: "Delete Category",
			description: `Delete category "${name}"? This will remove it from master data permanently.`,
			onDelete: () => deleteData(id),
		});
	};

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
								<button
									onClick={() => handleEdit(category.id, category.name)}
									className='text-blue-600 cursor-pointer hover:underline mr-2'
								>
									Edit
								</button>
								<button
									onClick={() => handleDelete(category.id, category.name)}
									className='text-red-600 cursor-pointer hover:underline'
								>
									Delete
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
