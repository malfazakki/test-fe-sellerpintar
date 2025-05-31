import AdminLayout from "@/components/layout/admin/admin-layout";
import { CreateArticleComp } from "@/components/pages/admin/article/create";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Article - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function ArticleCreatePage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<CreateArticleComp />
			</AdminLayout>
		</>
	);
}
