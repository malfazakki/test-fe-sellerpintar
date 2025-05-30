"use client";

import { Newspaper, Tag, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
	{
		title: "Articles",
		path: "/admin/articles",
		icon: Newspaper,
	},
	{
		title: "Categories",
		path: "/admin/categories",
		icon: Tag,
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	return (
		<Sidebar>
			<SidebarContent className='bg-primary '>
				<SidebarGroup className='py-6 px-4'>
					<SidebarGroupLabel>
						<Image src='/assets/image/logo_white.svg' alt='Logo White' width={134} height={24} />
					</SidebarGroupLabel>
					<SidebarGroupContent className='mt-6'>
						<SidebarMenu>
							{items.map((item) => {
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={pathname === item?.path || pathname.startsWith(item?.path)}
											className='data-[active=true]:bg-sidebar-primary data-[active=true]:text-white text-white hover:bg-sidebar-primary hover:text-white font-medium py-5'
											tooltip={item.title}
											size='default'
										>
											<Link href={item.path}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									className='cursor-pointer text-white hover:bg-sidebar-primary hover:text-white font-medium py-5'
									tooltip={"Logout"}
									size='default'
									type='button'
								>
									<span>
										<LogOut />
										Logout
									</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
