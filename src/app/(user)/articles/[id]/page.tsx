import UserLayout from "@/components/layout/user/user-layout";
import { ArticleDetailComp } from "@/components/pages/articles/detail";

export default function ArticleDetailPageUser() {
	return (
		<>
			<UserLayout>
				<ArticleDetailComp />
			</UserLayout>
		</>
	);
}
