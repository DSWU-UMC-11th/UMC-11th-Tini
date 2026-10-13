import { cn } from "../../utils/cn";

const VISIBLE_PAGE_COUNT = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const half = Math.floor(VISIBLE_PAGE_COUNT / 2);
  const start = Math.max(
    1,
    Math.min(currentPage - half, totalPages - VISIBLE_PAGE_COUNT + 1),
  );
  const end = Math.min(totalPages, start + VISIBLE_PAGE_COUNT - 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="페이지 이동"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-700 disabled:cursor-default disabled:text-gray-300"
      >
        <ChevronIcon direction="left" />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={cn(
            "h-9 min-w-9 cursor-pointer rounded-md px-2 text-sm",
            page === currentPage
              ? "bg-black font-semibold text-white"
              : "text-gray-700 hover:bg-gray-200",
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="다음 페이지"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-700 disabled:cursor-default disabled:text-gray-300"
      >
        <ChevronIcon direction="right" />
      </button>
    </nav>
  );
}
