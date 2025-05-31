import AdminLayout from "@/components/layout/admin/admin-layout";
import { CreateArticleComp } from "@/components/pages/admin/article/create";

export default function ArticleCreatePage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<CreateArticleComp />
			</AdminLayout>
		</>
	);
}
