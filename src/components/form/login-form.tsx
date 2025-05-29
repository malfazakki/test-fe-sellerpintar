"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/lib/validation/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			console.log("Form submitted:", data);

			const response = await axios.post("https://test-fe.mysellerpintar.com/api/auth/login", data);
			console.log("Login successful:", response.data);
			alert("Login successful!");
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Login failed:", error);
			if (axios.isAxiosError(error) && error.response) {
				alert(`Login failed: ${error.response.data.message || error.message}`);
			} else {
				alert(`Login failed: ${error.message}`);
			}
		}
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
						<div className='space-y-1'>
							<Label htmlFor='username' className='text-sm font-medium'>
								Username
							</Label>
							<Input
								id='username'
								type='text'
								placeholder='Input username'
								{...register("username")}
								className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
									errors.username ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors.username && (
								<div className='flex items-center text-red-500 text-sm'>
									<span>{errors.username.message}</span>
								</div>
							)}
						</div>

						{/* Password Field */}
						<div className='space-y-1'>
							<Label htmlFor='password' className='text-sm font-medium'>
								Password
							</Label>
							<div className='relative'>
								<Input
									id='password'
									type={showPassword ? "text" : "password"}
									placeholder='Input password'
									{...register("password")}
									className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
										errors.password ? "border-red-500" : "border-gray-300"
									}`}
								/>
								<div
									onClick={() => setShowPassword(!showPassword)}
									className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer'
								>
									{showPassword ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
								</div>
							</div>
							{errors.password && (
								<div className='flex items-center text-red-500 text-sm'>
									<span>{errors.password.message}</span>
								</div>
							)}
						</div>

						{/* Role Field */}

						{/* Login Button */}
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={isSubmitting}
							className='mt-6 w-full text-white font-medium py-2 px-4 rounded-md transition-colors'
						>
							{isSubmitting ? "Signing..." : "Login"}
						</Button>
					</div>

					{/* Login Link */}
					<div className='text-center mt-6'>
						<p className='text-sm text-gray-600'>
							Don&apos;t have an account?{" "}
							<Link
								href='/register'
								type='button'
								onClick={() => console.log("Navigate to login")}
								className='text-blue-600 hover:text-blue-700 font-medium underline'
							>
								Register
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
