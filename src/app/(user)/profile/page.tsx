import UserLayout from "@/components/layout/user/user-layout";
import ProfileCard from "@/components/pages/profile/profile-card";

export default function ProfileUserPage() {
	return (
		<UserLayout>
			<div className='h-full min-h-screen flex items-center justify-center'>
				<ProfileCard />
			</div>
		</UserLayout>
	);
}
