import clsx from "clsx";

type PageButtonProps = {
  page: number | string;
  current: number;
  onClick: (page: number) => void;
};

export const PageButton = ({ page, current, onClick }: PageButtonProps) => (
  <button
    onClick={() => typeof page === 'number' && onClick(page)}
    className={clsx(
      "px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base min-w-[32px]",
      page === current
        ? "bg-gray-800 text-yellow-400"
        : "bg-gray-200 hover:bg-gray-300",
      typeof page !== 'number' && "cursor-default hover:bg-transparent"
    )}
    disabled={typeof page !== 'number'}
    aria-current={page === current ? 'page' : undefined}
  >
    {page}
  </button>
);