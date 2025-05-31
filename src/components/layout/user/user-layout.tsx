"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/queries/use-profile";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function UserLayout({ children }: { children: ReactNode }) {
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

	return (
		<>
			<nav className={navbarClassName}>
				<div className='flex items-center gap-3'>
					<Image src='/assets/image/logo.svg' alt='Logo' width={134} height={24} className={logoClassName} />
				</div>

				{data && !isLoading && !isError ? (
					<div className='flex items-center gap-[6px]'>
						<Avatar className='w-8 h-8'>
							<AvatarFallback className={cn("font-bold bg-blue-200 text-blue-900")}>
								{data.username.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<Link href={"/profile"} className={textClassName}>
								{data.username}
							</Link>
						</div>
					</div>
				) : null}
			</nav>
			<main>{children}</main>
		</>
	);
}
