import UserLayout from "@/components/layout/user/user-layout";
import { ArticleDetailComp } from "@/components/pages/articles/detail";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Articles - The Journal",
};

export default function ArticleDetailPageUser() {
	return (
		<>
			<UserLayout>
				<ArticleDetailComp />
			</UserLayout>
		</>
	);
}
