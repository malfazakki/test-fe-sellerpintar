import PreviewLayout from "@/components/layout/admin/preview-layout";
import { ArticlePreviewComp } from "@/components/pages/articles/preview";

export default function ArticlePreviewAdminPage() {
	return (
		<>
			<PreviewLayout>
				<ArticlePreviewComp />
			</PreviewLayout>
		</>
	);
}
