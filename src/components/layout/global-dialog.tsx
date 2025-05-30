"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useState } from "react";

export function GlobalDialog() {
	const { isOpen, modalType, modalProps, closeModal } = useModalStore();
	const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

	useEffect(() => {
		setIsDialogOpen(isOpen);
	}, [isOpen]);

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			closeModal();
		}
		setIsDialogOpen(open);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
			{/* <DialogTrigger asChild>
				<Button variant='outline'>Edit Profile</Button>
			</DialogTrigger> */}
			<DialogContent className='sm:max-w-[425px]'>
				{modalType === "error" && (
					<>
						<DialogHeader>
							<DialogTitle>Error</DialogTitle>
							<DialogDescription>{modalProps.description || "An error occurred."}</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button onClick={closeModal} variant='outline' className='w-full'>
								Close
							</Button>
						</DialogFooter>
					</>
				)}

				{/* Add other modal types here if needed */}

				{modalType === "custom" && (
					<>
						<DialogHeader>
							<DialogTitle>{modalProps.title || "Custom Dialog"}</DialogTitle>
							<DialogDescription>
								{modalProps.description || "This is a custom dialog."}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button onClick={closeModal} variant='outline' className='w-full'>
								Close
							</Button>
						</DialogFooter>
					</>
				)}

				{modalType === "success" && (
					<>
						<DialogHeader>
							<DialogTitle>{modalProps.title || "Success"}</DialogTitle>
							<DialogDescription>
								{modalProps.description || "This is a custom dialog."}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button onClick={closeModal} variant='outline' className='w-full'>
								Close
							</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
