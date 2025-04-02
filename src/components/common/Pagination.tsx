import clsx from "clsx";
import { PageButton } from "../ui/PageButton";
import { NavigationButton } from "../ui/NavigationButton";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onClick: (page: number) => void;
  className?: string;
};

const getRange = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getMobilePages = (total: number, current: number) => {
  if (total <= 5) return getRange(1, total);
  if (current <= 3) return [...getRange(1, 4), '...', total];
  if (current >= total - 2) return [1, '...', ...getRange(total - 3, total)];
  return [1, '...', current - 1, current, current + 1, '...', total];
};

const getDesktopPages = (total: number, current: number) => {
  let pages: (number | string)[] = [];
  
  const showStartEllipsis = current > 4;
  const showMiddlePages = current > 3 && current < total - 2;
  const showEndEllipsis = current < total - 3;

  pages = showStartEllipsis 
    ? [...getRange(1, 3), '...'] 
    : getRange(1, Math.min(3, total));

  if (showMiddlePages) {
    pages = [...pages, ...getRange(current - 1, current + 1)];
  } else if (current <= 3) {
    pages = [...pages, ...getRange(4, Math.min(6, total))];
  } else {
    pages = [...pages, ...getRange(total - 5, total - 3)];
  }

  return showEndEllipsis
    ? [...pages, '...', ...getRange(total - 2, total)]
    : [...pages, ...getRange(Math.max(total - 2, 4), total)];
};

export default function Pagination({
  totalPages,
  currentPage,
  onClick,
  className = ""
}: PaginationProps) {
  const mobilePages = getMobilePages(totalPages, currentPage);
  const desktopPages = getDesktopPages(totalPages, currentPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={clsx("flex items-center justify-center gap-1 sm:gap-2", className)}>
      <NavigationButton
        direction="prev"
        disabled={isFirstPage}
        onClick={() => onClick(currentPage - 1)}
      />

      <div className="sm:hidden flex items-center gap-1">
        {mobilePages.map((page, i) => (
          <PageButton
            key={`m-${i}`}
            page={page}
            current={currentPage}
            onClick={onClick}
          />
        ))}
      </div>

      <div className="hidden sm:flex items-center gap-2">
        {desktopPages.map((page, i) => (
          <PageButton
            key={`d-${i}`}
            page={page}
            current={currentPage}
            onClick={onClick}
          />
        ))}
      </div>

      <NavigationButton
        direction="next"
        disabled={isLastPage}
        onClick={() => onClick(currentPage + 1)}
      />
    </div>
  );
}