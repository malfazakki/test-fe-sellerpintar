import AdminLayout from "@/components/layout/admin/admin-layout";
import { EditArticleComp } from "@/components/pages/admin/article/edit";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Edit Article - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function ArticleCreatePage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<EditArticleComp />
			</AdminLayout>
		</>
	);
}
