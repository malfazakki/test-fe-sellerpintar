import AdminLayout from "@/components/layout/admin/admin-layout";
import ProfileCard from "@/components/pages/profile/profile-card";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function AdminProfilePage() {
	return (
		<>
			<AdminLayout headerTitle='User Profile'>
				<ProfileCard />
			</AdminLayout>
		</>
	);
}
