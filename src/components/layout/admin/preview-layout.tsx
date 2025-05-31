"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import NavbarUser from "../user/navbar";
import FooterUser from "../user/footer";

export default function PreviewLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const { isAuthenticated, role } = useAuthStore();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);

		// Redirect to login if not authenticated
		if (!isAuthenticated) {
			router.replace("/login");
			return;
		}

		// Redirect if role is not "User"
		if (role !== "Admin") {
			router.replace("/");
			return;
		}
	}, [isAuthenticated, role, router]);

	// If not authenticated, wrong role, or not yet client-side, render nothing
	if (!isClient || !isAuthenticated || role !== "Admin") {
		return null;
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<NavbarUser />
			<main className='flex-grow flex flex-col'>{children}</main>
			<FooterUser />
		</div>
	);
}
