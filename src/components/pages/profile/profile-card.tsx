"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/queries/use-profile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
	// Fetch profile data
	const { data, isLoading, isError } = useProfile();
	const router = useRouter();

	if (isLoading) {
		return (
			<Card className='w-full max-w-md mx-auto'>
				<CardContent className='flex items-center justify-center p-6'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
				</CardContent>
			</Card>
		);
	}

	if (isError || !data) {
		return (
			<Card className='w-full max-w-md mx-auto'>
				<CardContent className='flex items-center justify-center p-6 text-red-500'>
					Failed to load profile
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className='w-full max-w-md mx-auto shadow-lg'>
			<CardContent className='space-y-4'>
				<div className='flex justify-center'>
					<Avatar className='w-24 h-24 bg-blue-100'>
						<AvatarFallback className='text-3xl font-bold text-blue-500'>
							{data.username.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>

				<div className='space-y-2'>
					<div className='flex items-center justify-between border-b pb-2'>
						<span className='text-sm text-gray-600'>Username</span>
						<span className='font-medium'>{data.username}</span>
					</div>

					<div className='flex items-center justify-between border-b pb-2'>
						<span className='text-sm text-gray-600'>Password</span>
						<span className='font-medium'>********</span>
					</div>

					<div className='flex items-center justify-between'>
						<span className='text-sm text-gray-600'>Role</span>
						<span className='font-medium'>{data.role}</span>
					</div>
				</div>

				<Button
					onClick={() => router.push(`${data.role === "Admin" ? "/admin/articles" : "/"}`)}
					className='w-full mt-4'
				>
					Back to {data.role === "Admin" ? "dashboard" : "home"}
				</Button>
			</CardContent>
		</Card>
	);
}
