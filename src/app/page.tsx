import UserLayout from "@/components/layout/user/user-layout";
import HomepageComp from "@/components/pages/homepage";

export default function Home() {
	return (
		<>
			<UserLayout>
				<HomepageComp />
			</UserLayout>
		</>
	);
}
