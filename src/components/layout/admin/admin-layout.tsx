"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState, type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/queries/use-profile";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface RootLayoutAdminProps {
	children: ReactNode;
	headerTitle?: string;
}

export default function AdminLayout({ children, headerTitle }: RootLayoutAdminProps) {
	const { data, isLoading, isError } = useProfile();

	const { isAuthenticated, role } = useAuthStore();
	const [isClient, setIsClient] = useState(false);

	const router = useRouter();

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
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='bg-secondary'>
				<header className='flex h-[68px] shrink-0 items-center gap-2 border-b px-6 bg-white justify-between'>
					<div className='flex items-center gap-3'>
						<h1 className='text-xl font-semibold'>{headerTitle}</h1>
					</div>

					{data && !isLoading && !isError ? (
						<div className='flex items-center gap-[6px]'>
							<Avatar className='w-8 h-8'>
								<AvatarFallback className='font-bold bg-blue-200 text-blue-900'>
									{data.username.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<Link
									href={"/admin/profile"}
									className='text-sm font-medium leading-none hover:underline'
								>
									{data.username}
								</Link>
							</div>
						</div>
					) : null}
				</header>
				<main className='p-6 min-w-3xl'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
