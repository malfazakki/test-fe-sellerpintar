import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";

interface DeleteDialogProps {
	modalProps: {
		title: string;
		description: string;
		onDelete: () => void;
	};
}

export function DeleteDialog({ modalProps }: DeleteDialogProps) {
	const { closeModal } = useModalStore();

	const handleDelete = () => {
		modalProps.onDelete();
		closeModal();
	};

	return (
		<>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{modalProps?.title || "Delete"}</DialogTitle>
					<DialogDescription>
						{modalProps?.description || "Delete data? This will remove it from master data permanently."}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex sm:justify-end justify-center'>
					<Button variant='outline' onClick={closeModal}>
						Cancel
					</Button>
					<Button variant='destructive' onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</>
	);
}
