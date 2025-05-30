import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RootLayoutAdminProps {
	children: ReactNode;
	headerTitle?: string;
}

export default function AdminLayout({ children, headerTitle }: RootLayoutAdminProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='bg-secondary'>
				<header className='flex h-[68px] shrink-0 items-center gap-2 border-b px-6 bg-white justify-between'>
					<div className='flex items-center gap-3'>
						<h1 className='text-xl font-semibold'>{headerTitle}</h1>
					</div>

					<div className='flex items-center gap-[6px]'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='/avatars/01.png' alt='@shadcn' />
							<AvatarFallback className='bg-blue-200'>J</AvatarFallback>
						</Avatar>
						<div>
							<p className='text-sm font-medium leading-none underline'>James Dean</p>
						</div>
					</div>
				</header>
				<main className='p-6'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
