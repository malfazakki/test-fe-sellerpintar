"use client";

import { useState, useRef, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileUploadProps extends ControllerRenderProps {
	className?: string;
	accept?: string;
	imageUrl?: string | null | undefined;
}

export function FileUpload({ onChange, className, accept = ".jpg,.jpeg,.png", imageUrl }: FileUploadProps) {
	const [preview, setPreview] = useState<string | null>(imageUrl || null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setPreview(imageUrl || null);
	}, [imageUrl]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Create file preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
				onChange(file);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveFile = () => {
		setPreview(null);
		onChange(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	return (
		<div
			className={cn(
				"border-2 bg-white border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors w-[225px]",
				className
			)}
		>
			<input type='file' ref={fileInputRef} onChange={handleFileChange} accept={accept} className='hidden' />

			{preview ? (
				<div className='relative'>
					<Image
						src={preview}
						alt='File preview'
						width={100}
						height={100}
						className='w-full h-[150px] object-cover rounded-lg mb-2'
					/>
					<div className='flex space-x-2'>
						<Button
							type='button'
							variant='link'
							size='sm'
							className='flex-1 p-0 w-fit h-auto'
							onClick={(e) => {
								e.stopPropagation();
								triggerFileInput();
							}}
						>
							Change
						</Button>
						<Button
							type='button'
							variant='link'
							size='sm'
							className='flex-1 p-0 w-fit h-auto text-red-500'
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveFile();
							}}
						>
							Delete
						</Button>
					</div>
				</div>
			) : (
				<div className='h-[165px] flex flex-col items-center justify-center' onClick={triggerFileInput}>
					<div className='mb-2'>
						<ImageIcon className='w-8 h-8 text-gray-400' />
					</div>
					<p className='text-xs text-gray-600 hover:underline'>Click to select files</p>
					<p className='text-xs text-gray-500'>Support File Type: jpg or png</p>
				</div>
			)}
		</div>
	);
}
