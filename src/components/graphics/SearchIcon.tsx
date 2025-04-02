import React from 'react';

const SIZE_CLASSES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-10 h-10',
} as const;

type IconSize = keyof typeof SIZE_CLASSES;

interface SearchIconProps {
  size?: IconSize | 'custom';
  className?: string;
  strokeWidth?: number;
  center?: boolean;
  customSize?: string;
}

const SearchIcon = React.forwardRef<SVGSVGElement, SearchIconProps>(
  (
    {
      size = 'md',
      className = '',
      strokeWidth = 2,
      center = false,
      customSize = '',
    },
    ref
  ) => {
    const sizeClass = size === 'custom' ? customSize : SIZE_CLASSES[size];
    const centerClass = center ? 'mx-auto' : '';

    return (
      <svg
        ref={ref}
        className={`${sizeClass} ${centerClass} ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    );
  }
);

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;