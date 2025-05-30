"use client";

import CreateArticleForm from "@/components/form/create-article-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateArticleComp() {
	const router = useRouter();
	return (
		<>
			<div className='container mx-auto'>
				<Card className="bg-gray-50">
					<CardHeader className='border-b-1 pb-4'>
						<CardTitle>
							<div className='flex gap-2 items-center'>
								<ArrowLeft
									onClick={() => router.push("/admin/articles")}
									className='hover:cursor-pointer hover:opacity-70 hover:bg-slate-50 rounded-lg'
								/>{" "}
								<p className='text-xl'>Create Articles</p>
							</div>
						</CardTitle>
					</CardHeader>

					<CardContent>
						<CreateArticleForm />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
