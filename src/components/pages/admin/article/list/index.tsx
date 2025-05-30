import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import ArticleListTable from "./table";
import { PaginationCustom } from "@/components/custom-ui/pagination-custom";

export default function AdminArticleList() {
	const totalArticle = 25;

	return (
		<>
			<div className='container mx-auto'>
				<Card>
					<CardHeader className='border-b-1 pb-4'>
						<CardTitle>Total Article: {totalArticle}</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='border-b-1 flex flex-wrap justify-between px-6 pb-6'>
							{/* Filter */}
							<div className='flex gap-2'>
								<Select>
									<SelectTrigger className="w-[109px] cursor-pointer data-[placeholder]:text-black [&_svg:not([class*='text-'])]:text-black">
										<SelectValue placeholder='Category' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='apple'>Apple</SelectItem>
											<SelectItem value='banana'>Banana</SelectItem>
											<SelectItem value='blueberry'>Blueberry</SelectItem>
											<SelectItem value='grapes'>Grapes</SelectItem>
											<SelectItem value='pineapple'>Pineapple</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>

								{/* Search Input */}
								<div className='flex space-x-2 items-center'>
									<div className='relative'>
										<Search
											className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
											size={18}
										/>
										<Input
											type='text'
											placeholder='Search by title'
											className='pl-10 w-full max-w-[240px]'
										/>
									</div>
								</div>
							</div>

							{/* Add Button */}
							<Button variant='default' size='lg'>
								<Plus className='' />
								Add Articles
							</Button>
						</div>

						<ArticleListTable />
					</CardContent>
					<CardFooter>
						<PaginationCustom />
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
