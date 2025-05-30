import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreateCategoryForm from "../form/create-category-form";
import EditCategoryForm from "../form/edit-category-form";

interface CategoryDialogProps {
	modalProps: {
		type: "create" | "edit";
		id: string | number;
		name: string;
	};
}

export default function CategoryDialog({ modalProps }: CategoryDialogProps) {
	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>{modalProps?.type === "create" ? "Add Category" : "Edit Category"}</DialogTitle>
			</DialogHeader>
			{modalProps?.type === "create" ? (
				<CreateCategoryForm />
			) : (
				<EditCategoryForm id={modalProps.id} name={modalProps.name} />
			)}
			{/* <DialogFooter className='flex sm:justify-end justify-center'>
				<Button variant='outline' onClick={closeModal}>
					Cancel
				</Button>
				<Button variant='destructive' onClick={handleDelete}>
					Delete
				</Button>
			</DialogFooter> */}
		</DialogContent>
	);
}
