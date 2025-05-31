import AdminLayout from "@/components/layout/admin/admin-layout";
import AdminCategoryList from "@/components/pages/admin/category/list";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Category Lists - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function ArticleListsPage() {
	return (
		<>
			<AdminLayout headerTitle='Articles'>
				<AdminCategoryList />
			</AdminLayout>
		</>
	);
}
