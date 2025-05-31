import AdminLayout from "@/components/layout/admin/admin-layout";
import ProfileCard from "@/components/pages/profile/profile-card";

export default function AdminProfilePage() {
	return (
		<>
			<AdminLayout headerTitle='User Profile'>
				<ProfileCard />
			</AdminLayout>
		</>
	);
}
