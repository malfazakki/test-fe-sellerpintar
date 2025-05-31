import UserLayout from "@/components/layout/user/user-layout";
import ProfileCard from "@/components/pages/profile/profile-card";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function ProfileUserPage() {
	return (
		<UserLayout>
			<div className='h-full min-h-screen flex items-center justify-center'>
				<ProfileCard />
			</div>
		</UserLayout>
	);
}
