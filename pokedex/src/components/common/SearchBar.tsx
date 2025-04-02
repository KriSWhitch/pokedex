"use client";
import { FormEvent, useState } from 'react';
import SearchIcon from '../graphics/SearchIcon';

type SearchBarProps = {
  onSearch: (query: string) => void;
  searchBarPlaceholder?: string;
  className?: string;
};

export default function SearchBar({
  searchBarPlaceholder = "Search...", 
  onSearch,
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex items-stretch border border-gray-800 rounded-lg overflow-hidden ${className}`}
    >
      <input
        type="text"
        placeholder={searchBarPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow min-w-0 px-4 py-2 focus:outline-none text-sm sm:text-base"
        aria-label="Search input"
      />
      
      <button
        type="submit"
        className="bg-gray-800 text-yellow-400 px-3 sm:px-4 py-2 hover:bg-gray-700 hover:text-yellow-300 transition-colors focus:outline-none"
        aria-label="Search"
      >
        <span className="hidden sm:inline">Search</span>
        <span className="sm:hidden flex items-center justify-center">
          <SearchIcon center={true} />
        </span>
      </button>
    </form>
  );
}