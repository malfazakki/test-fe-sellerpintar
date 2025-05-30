import { create } from "zustand";

type ModalType = "success" | "error" | "custom" | "component" | "delete" | "confirmLogout" | "categoryDialog" | null;

// interface ErrorModalProps {
// 	title?: string;
// 	description?: string;
// }

// interface CustomModalProps {
// 	title?: string;
// 	description?: string;
// 	[key: string]: any;
// }

// interface SuccessModalProps {
// 	title?: string;
// 	description?: string;
// }

// interface DeleteModalProps {
// 	title?: string;
// 	description?: string;
// 	onDelete?: () => void;
// }

// export type ModalProps =
// 	| ErrorModalProps
// 	| CustomModalProps
// 	| SuccessModalProps
// 	| DeleteModalProps
// 	| Record<string, never>;

interface ModalState {
	isOpen: boolean;
	modalType: ModalType;
	modalProps: any;
	openModal: (type: ModalType, props?: any) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	modalType: null,
	modalProps: {},
	openModal: (type, props = {}) => set({ isOpen: true, modalType: type, modalProps: props }),
	closeModal: () => set({ isOpen: false, modalType: null, modalProps: {} }),
}));
