import AdminLayout from "@/components/layout/admin/admin-layout";
import AdminArticleList from "@/components/pages/admin/article/list";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Article Lists - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function ArticleListsPage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<AdminArticleList />
			</AdminLayout>
		</>
	);
}
