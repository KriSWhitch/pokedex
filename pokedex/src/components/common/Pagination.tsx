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

  const getMobilePages = () => {
    if (totalPages <= 5) {
      return getPageRange(1, totalPages);
    }

    if (currentPage <= 3) {
      return [...getPageRange(1, 4), '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', ...getPageRange(totalPages - 3, totalPages)];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const getDesktopPages = () => {
    let pages: (number | string)[] = [];
    
    if (currentPage > 4) {
      pages = pages.concat(getPageRange(1, 3), "...");
    } else {
      pages = pages.concat(getPageRange(1, Math.min(3, totalPages)));
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages = pages.concat(getPageRange(currentPage - 1, currentPage + 1));
    } else if (currentPage <= 3) {
      pages = pages.concat(getPageRange(4, Math.min(6, totalPages)));
    } else if (currentPage >= totalPages - 2) {
      pages = pages.concat(getPageRange(totalPages - 5, totalPages - 3));
    }

    if (currentPage < totalPages - 3) {
      pages = pages.concat("...", getPageRange(totalPages - 2, totalPages));
    } else {
      pages = pages.concat(getPageRange(Math.max(totalPages - 2, 4), totalPages));
    }

    return pages;
  };

  const mobilePages = getMobilePages();
  const desktopPages = getDesktopPages();

  return (
    <div className={clsx("flex items-center justify-center gap-1 sm:gap-2", className)}>
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base",
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
        )}
        aria-label="Previous page"
      >
        <span className="hidden sm:inline">⇦</span>
        <span className="sm:hidden">←</span>
      </button>

      {/* Mobile Version */}
      <div className="sm:hidden flex items-center gap-1">
        {mobilePages.map((page, index) => (
          <button
            key={`mobile-${index}`}
            onClick={() => typeof page === "number" && onClick(page)}
            className={clsx(
              "px-2 py-1 rounded-md text-sm min-w-[32px]",
              page === currentPage
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-200 hover:bg-gray-300",
              typeof page !== "number" && "cursor-default hover:bg-transparent"
            )}
            disabled={typeof page !== "number"}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Desktop Version */}
      <div className="hidden sm:flex items-center gap-2">
        {desktopPages.map((page, index) => (
          <button
            key={`desktop-${index}`}
            onClick={() => typeof page === "number" && onClick(page)}
            className={clsx(
              "px-3 py-2 rounded-md",
              page === currentPage
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-200 hover:bg-gray-300",
              typeof page !== "number" && "cursor-default hover:bg-transparent"
            )}
            disabled={typeof page !== "number"}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base",
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
        )}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">⇨</span>
        <span className="sm:hidden">→</span>
      </button>
    </div>
  );
};

export default Pagination;