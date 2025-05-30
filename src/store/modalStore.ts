import { create } from "zustand";

type ModalType = "success" | "error" | "custom" | "component" | "confirmLogout" | null;

interface ErrorModalProps {
	title?: string;
	description?: string;
}

interface CustomModalProps {
	title?: string;
	description?: string;
	[key: string]: any;
}

interface SuccessModalProps {
	title?: string;
	description?: string;
}

type ModalProps = ErrorModalProps | CustomModalProps | SuccessModalProps | Record<string, never>;

interface ModalState {
	isOpen: boolean;
	modalType: ModalType;
	modalProps: ModalProps;
	openModal: (type: ModalType, props?: ModalProps) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	modalType: null,
	modalProps: {},
	openModal: (type, props = {}) => set({ isOpen: true, modalType: type, modalProps: props }),
	closeModal: () => set({ isOpen: false, modalType: null, modalProps: {} }),
}));
