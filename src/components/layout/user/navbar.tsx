"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/queries/use-profile";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/modalStore";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarUser() {
	const router = useRouter();
	const { openModal } = useModalStore();

	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();
	const { data, isLoading, isError } = useProfile();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isHomePage = pathname === "/";
	const navbarClassName = cn(
		"flex h-[68px] shrink-0 items-center gap-2 px-10 fixed top-0 right-0 left-0 w-full z-30 justify-between transition-all duration-300",
		{
			"bg-transparent": isHomePage && !isScrolled,
			"bg-white shadow-sm": isHomePage ? isScrolled : true,
		}
	);

	const logoClassName = cn("transition-all duration-300", {
		"": !(isHomePage && !isScrolled),
		"invert brightness-0 contrast-200": isHomePage && !isScrolled,
	});

	const textClassName = cn("text-sm font-medium leading-none hover:underline transition-all duration-300", {
		"text-white": isHomePage && !isScrolled,
		"text-blue-900": !(isHomePage && !isScrolled),
	});

	const handleButtonLogout = () => {
		openModal("confirmLogout");
	};

	return (
		<>
			<nav className={navbarClassName}>
				<div className='flex items-center gap-3'>
					<Image src='/assets/image/logo.svg' alt='Logo' width={134} height={24} className={logoClassName} />
				</div>

				{data && !isLoading && !isError ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className='flex items-center gap-[6px]'>
								<Avatar className='w-8 h-8'>
									<AvatarFallback className={cn("font-bold bg-blue-200 text-blue-900")}>
										{data.username.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className='hidden sm:block'>
									<Link href={"/profile"} className={textClassName}>
										{data.username}
									</Link>
								</div>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56 z-99'>
							<DropdownMenuItem className='cursor-pointer' onClick={() => router.push("/profile")}>
								<span>My Account</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='!text-red-500 cursor-pointer' onClick={handleButtonLogout}>
								<LogOut color='red' />
								<span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : null}
			</nav>
		</>
	);
}
