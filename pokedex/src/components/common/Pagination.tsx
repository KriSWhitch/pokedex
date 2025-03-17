import React from "react";
import clsx from "clsx";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onClick,
  className = "",
}) => {
  const getPageRange = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  let pages: (number | string)[] = [];

  // Always show the first 3 pages
  if (currentPage > 4) {
    pages = pages.concat(getPageRange(1, 3), "...");
  } else {
    pages = pages.concat(getPageRange(1, Math.min(3, totalPages)));
  }

  // Show pages around the current page
  if (currentPage > 3 && currentPage < totalPages - 2) {
    pages = pages.concat(getPageRange(currentPage - 1, currentPage + 1));
  } else if (currentPage <= 3) {
    // If current page is near the start, show more pages on the right
    pages = pages.concat(getPageRange(4, Math.min(6, totalPages)));
  } else if (currentPage >= totalPages - 2) {
    // If current page is near the end, show more pages on the left
    pages = pages.concat(getPageRange(totalPages - 5, totalPages - 3));
  }

  // Always show the last 3 pages
  if (currentPage < totalPages - 3) {
    pages = pages.concat("...", getPageRange(totalPages - 2, totalPages));
  } else {
    pages = pages.concat(getPageRange(Math.max(totalPages - 2, 4), totalPages));
  }

  return (
    <div className={clsx("flex items-center justify-center gap-2 flex-wrap", className)}>
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "px-3 py-2 rounded-md",
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
        )}
      >
        ⇦
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onClick(page)}
          className={clsx(
            "px-3 py-2 rounded-md",
            page === currentPage
              ? "bg-gray-800 text-yellow-400"
              : "bg-gray-200 hover:bg-gray-300",
            typeof page !== "number" && "cursor-default hover:bg-transparent"
          )}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-3 py-2 rounded-md",
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
        )}
      >
        ⇨
      </button>
    </div>
  );
};

export default Pagination;