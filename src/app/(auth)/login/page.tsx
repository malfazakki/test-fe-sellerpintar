import LoginForm from "@/components/form/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login - The Journal",
	description: "Design Resources, Interviews, and Industry News",
};

export default function RegisterPage() {
	return (
		<>
			<LoginForm />
		</>
	);
}
