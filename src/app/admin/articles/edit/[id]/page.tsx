import AdminLayout from "@/components/layout/admin/admin-layout";
import { EditArticleComp } from "@/components/pages/admin/article/edit";

export default function ArticleCreatePage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<EditArticleComp />
			</AdminLayout>
		</>
	);
}
