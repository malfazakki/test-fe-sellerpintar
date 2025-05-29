"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		role: "",
	});

	const handleSubmit = () => {
		console.log("Form submitted:", formData);
		// Handle form submission logic here
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className='min-h-screen bg-gray-100 flex items-center justify-center'>
			<Card className='w-full max-w-[400px] bg-white shadow-lg py-10'>
				<CardHeader className='text-center'>
					<div className='flex items-center justify-center gap-2'>
						<Image
							src='/assets/image/logo.svg'
							alt='Logo'
							width={134}
							height={24}
							style={{ width: "100%", maxWidth: "134px", height: "auto" }}
						/>
					</div>
				</CardHeader>

				<CardContent className='space-y-6'>
					<div className='space-y-3'>
						{/* Username Field */}
						<div className='space-y-2'>
							<Label htmlFor='username' className='text-sm font-medium'>
								Username
							</Label>
							<Input
								id='username'
								type='text'
								placeholder='Input username'
								value={formData.username}
								onChange={(e) => handleInputChange("username", e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>

						{/* Password Field */}
						<div className='space-y-2'>
							<Label htmlFor='password' className='text-sm font-medium'>
								Password
							</Label>
							<div className='relative'>
								<Input
									id='password'
									type={showPassword ? "text" : "password"}
									placeholder='Input password'
									value={formData.password}
									onChange={(e) => handleInputChange("password", e.target.value)}
									className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
								<div
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer'
								>
									{showPassword ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
								</div>
							</div>
						</div>

						{/* Role Field */}
						<div className='space-y-2 mb-6'>
							<Label htmlFor='role' className='text-sm font-medium'>
								Role
							</Label>
							<Select onValueChange={(value) => handleInputChange("role", value)}>
								<SelectTrigger className='w-full cursor-pointer'>
									<SelectValue placeholder='Select Role' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem className='cursor-pointer' value='admin'>
										Admin
									</SelectItem>
									<SelectItem className='cursor-pointer' value='user'>
										User
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Register Button */}
						<Button
							onClick={handleSubmit}
							className='w-full text-white font-medium py-2 px-4 rounded-md transition-colors'
						>
							Register
						</Button>
					</div>

					{/* Login Link */}
					<div className='text-center mt-6'>
						<p className='text-sm text-gray-600'>
							Already have an account?{" "}
							<Link
								href='#'
								type='button'
								onClick={() => console.log("Navigate to login")}
								className='text-blue-600 hover:text-blue-700 font-medium underline'
							>
								Login
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
