import AdminLayout from "@/components/layout/admin/admin-layout";
import AdminArticleList from "@/components/pages/admin/article/list";

export default function ArticleListsPage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<AdminArticleList />
			</AdminLayout>
		</>
	);
}
