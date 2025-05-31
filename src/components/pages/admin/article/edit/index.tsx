"use client";

import EditArticleForm from "@/components/form/edit-article-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function EditArticleComp() {
	const router = useRouter();
	return (
		<>
			<div className='container mx-auto'>
				<Card className='bg-gray-50'>
					<CardHeader className='border-b-1 pb-4'>
						<CardTitle>
							<div className='flex gap-2 items-center'>
								<ArrowLeft
									onClick={() => router.push("/admin/articles")}
									className='hover:cursor-pointer hover:opacity-70 hover:bg-slate-50 rounded-lg'
								/>{" "}
								<p className='text-xl'>Edit Articles</p>
							</div>
						</CardTitle>
					</CardHeader>

					<CardContent>
						<EditArticleForm />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
