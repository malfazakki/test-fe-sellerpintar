import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationCustomProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export function PaginationCustom({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationCustomProps) {
	// Calculate total pages
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	// Generate page numbers
	const generatePageNumbers = () => {
		const pages: number[] = [];
		const maxPagesToShow = 5;
		const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
		const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

		// Adjust start page if we're near the end
		const adjustedStartPage = endPage === totalPages ? Math.max(1, totalPages - maxPagesToShow + 1) : startPage;

		for (let i = adjustedStartPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	// Prevent page change if out of bounds
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<Pagination>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={(e) => {
							e.preventDefault();
							handlePageChange(currentPage - 1);
						}}
						className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>

				{/* Page Numbers */}
				{generatePageNumbers().map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href='#'
							isActive={page === currentPage}
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(page);
							}}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Ellipsis if needed */}
				{totalPages > 5 && currentPage < totalPages - 2 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Next Button */}
				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={(e) => {
							e.preventDefault();
							handlePageChange(currentPage + 1);
						}}
						className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
