export interface ApiResponse<T> {
	data: T[];
	page: number;
	limit: number;
	total: number;
}