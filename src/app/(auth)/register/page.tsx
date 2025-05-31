import RegisterForm from "@/components/form/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function RegisterPage() {
	return (
		<>
			<RegisterForm />
		</>
	);
}
