import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useModalStore } from "@/store/modalStore";
import { CategoryFormData, categorySchema } from "@/lib/validation/category.validation";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

interface EditCategoryFormProps {
	id: string | number;
	name: string;
}

export default function EditCategoryForm({ id, name }: EditCategoryFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CategoryFormData>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: name,
		},
	});

	const { closeModal } = useModalStore();
	const queryClient = useQueryClient();

	const onSubmit = async (data: CategoryFormData) => {
		await api.put(`/categories/${id}`, data);
		closeModal();
		queryClient.invalidateQueries({ queryKey: ["categories"] });
	};

	return (
		<>
			{/* Username Field */}
			<div className='space-y-1 pb-6 pt-2'>
				<Label htmlFor='username' className='text-sm font-medium'>
					Category
				</Label>
				<Input
					id='username'
					type='text'
					placeholder='Input username'
					{...register("name")}
					className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
						errors.name ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.name && (
					<div className='flex items-center text-red-500 text-sm'>
						<span>{errors.name.message}</span>
					</div>
				)}
			</div>

			<DialogFooter className='flex sm:justify-end justify-center'>
				<Button variant='outline' onClick={closeModal}>
					Cancel
				</Button>
				<Button variant='default' onClick={handleSubmit(onSubmit)}>
					Add
				</Button>
			</DialogFooter>
		</>
	);
}
