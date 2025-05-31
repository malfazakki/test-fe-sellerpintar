"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarUser from "./navbar";
import FooterUser from "./footer";
import { useAuthStore } from "@/store/authStore";

export default function UserLayout({ children }: { children: ReactNode }) {
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
		if (role !== "User") {
			router.replace("/login");
			return;
		}
	}, [isAuthenticated, role, router]);

	// If not authenticated, wrong role, or not yet client-side, render nothing
	if (!isClient || !isAuthenticated || role !== "User") {
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
