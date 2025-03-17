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

  const defaultClasses = "flex items-center border border-gray-800 rounded-lg overflow-hidden";
  
  const combinedClasses = classNames(defaultClasses, className);

  return (
    <form onSubmit={onSubmit} className={combinedClasses}>
      <input
        type="text"
        placeholder={searchBarPlaceholder ? searchBarPlaceholder : "Search..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-800 text-yellow-400 px-4 py-2 hover:bg-gray-700 hover:text-yellow-300 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;