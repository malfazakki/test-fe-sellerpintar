import AdminLayout from "@/components/layout/admin/admin-layout";
import AdminCategoryList from "@/components/pages/admin/category/list";

export default function ArticleListsPage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<AdminCategoryList />
			</AdminLayout>
		</>
	);
}
