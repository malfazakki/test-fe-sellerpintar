import AdminLayout from "@/components/layout/admin/admin-layout";

export default function ArticleListsPage() {
	return (
		<>
			<AdminLayout>
				<div className='flex flex-1 flex-col gap-4 p-4'>
					<div className='grid auto-rows-min gap-4 md:grid-cols-3'>
						<div className='bg-white aspect-video rounded-xl' />
						<div className='bg-white aspect-video rounded-xl' />
						<div className='bg-white aspect-video rounded-xl' />
					</div>
					<div className='bg-white min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
				</div>
			</AdminLayout>
		</>
	);
}
