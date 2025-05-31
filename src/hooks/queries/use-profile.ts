import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
	return useQuery({
		queryFn: async () => {
			const response = await api.get(`/auth/profile`);
			return response.data;
		},
		queryKey: ["profiles"],
	});
};
