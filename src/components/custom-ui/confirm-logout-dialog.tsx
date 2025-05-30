import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthStore } from "@/store/authStore";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";

export function ConfirmLogout() {
	const router = useRouter();
	const { clearAuth } = useAuthStore();
	const { closeModal } = useModalStore();

	const logout = () => {
		clearAuth();
		closeModal();
		router.push("/login");
	};

	return (
		<>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Logout</DialogTitle>
					<DialogDescription>Are you sure want to logout?</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex sm:justify-end justify-center'>
					<Button variant='outline' onClick={closeModal}>
						Cancel
					</Button>
					<Button variant='default' onClick={logout}>
						Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</>
	);
}
