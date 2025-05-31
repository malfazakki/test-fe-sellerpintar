import PreviewLayout from "@/components/layout/admin/preview-layout";
import { ArticlePreviewComp } from "@/components/pages/articles/preview";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Preview Article - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function ArticlePreviewAdminPage() {
	return (
		<>
			<PreviewLayout>
				<ArticlePreviewComp />
			</PreviewLayout>
		</>
	);
}
