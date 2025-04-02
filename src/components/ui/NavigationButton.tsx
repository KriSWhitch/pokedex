import clsx from "clsx";

type NavButtonProps = {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
};

export const NavigationButton = ({ direction, disabled, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      "px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm sm:text-base",
      disabled
        ? "bg-gray-200 cursor-not-allowed"
        : "bg-gray-800 hover:bg-gray-700 text-yellow-400"
    )}
    aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} page`}
  >
    {direction === 'prev' ? (
      <>
        <span className="hidden sm:inline">⇦</span>
        <span className="sm:hidden">←</span>
      </>
    ) : (
      <>
        <span className="hidden sm:inline">⇨</span>
        <span className="sm:hidden">→</span>
      </>
    )}
  </button>
);