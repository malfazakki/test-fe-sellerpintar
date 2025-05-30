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
import { ConfirmLogout } from "@/components/custom-ui/confirm-logout";

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

	const renderModalContent = () => {
		switch (modalType) {
			case "error":
				return (
					<>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Error</DialogTitle>
								<DialogDescription>{modalProps.description || "An error occurred."}</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button onClick={closeModal} variant='outline' className='w-full'>
									Close
								</Button>
							</DialogFooter>
						</DialogContent>
					</>
				);
			case "custom":
				return (
					<>
						<DialogContent className='sm:max-w-[425px]'>
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
						</DialogContent>
					</>
				);
			case "success":
				return (
					<>
						<DialogContent className='sm:max-w-[425px]'>
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
						</DialogContent>
					</>
				);
			case "confirmLogout":
				return <ConfirmLogout />;
			default:
				return null;
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
			{renderModalContent()}
		</Dialog>
	);
}
