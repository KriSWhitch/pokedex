"use client";
import classNames from 'classnames';
import { FC, FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void,
  searchBarPlaceholder?: string,
  className?: string
}

const SearchBar: FC<SearchBarProps> = ({ searchBarPlaceholder, onSearch, className }) => {
  const [query, setQuery] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  }

  const defaultClasses = "flex items-stretch border border-gray-800 rounded-lg overflow-hidden";
  
  const combinedClasses = classNames(defaultClasses, className);

  return (
    <form onSubmit={onSubmit} className={combinedClasses}>
      <input
        type="text"
        placeholder={searchBarPlaceholder ? searchBarPlaceholder : "Search..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow min-w-0 px-4 py-2 focus:outline-none text-sm sm:text-base"
      />
      <button
        type="submit"
        className="bg-gray-800 text-yellow-400 px-3 sm:px-4 py-2 hover:bg-gray-700 hover:text-yellow-300 focus:outline-none whitespace-nowrap text-sm sm:text-base"
      >
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden flex items-center justify-center">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </button>
    </form>
  );
}

export default SearchBar;