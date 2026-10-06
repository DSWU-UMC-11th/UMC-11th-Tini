import { useState } from "react";
import { cn } from "../../utils/cn";

const PAGE_NUMBERS = [1, 2, 3, 4, 5];

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav className="mt-8 flex wrap justify-center gap-2">
      {PAGE_NUMBERS.map((page) => (
        <button
          key={page}
          className={cn(
            "cursor-pointer rounded-md px-3 py-1.5 text-white",
            page === currentPage ? "bg-blue-600 font-bold" : "bg-neutral-800",
          )}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}