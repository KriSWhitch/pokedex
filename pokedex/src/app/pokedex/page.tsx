"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { API_ENDPOINTS, createUrl, fetchData } from "@/constants/api";
import { POKEMONS_PER_PAGE } from "@/constants/consts";
import PokemonCard from "@/components/common/PokemonCard";
import { PokemonData, PokemonReference } from "@/lib/definitions";
import Pagination from "@/components/common/Pagination";

export default function Pokedex() {
  const [data, setData] = useState<PokemonData>();
  const [pageData, setPageData] = useState<PokemonReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const data: PokemonData = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON)}?limit=9999&offset=0`);
      setData(data);
    } catch (error) {
      console.error('Error loading pokemon data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        setLoading(true);
        try {
          let results = data.results;
          let count = data.count;
  
          if (query) {
            results = data.results.filter((pokemon: PokemonReference) => 
              pokemon.name.includes(query.toLowerCase())
            );
            count = results.length;
          }
          
          const totalPages = Math.ceil(count / POKEMONS_PER_PAGE);
          setTotalPages(totalPages);
          
          const paginatedResults = results.slice(
            (currentPage - 1) * POKEMONS_PER_PAGE, 
            currentPage * POKEMONS_PER_PAGE
          );
          
          setPageData(paginatedResults);
        } catch (error) {
          console.error('Error filtering pokemons:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPokemons();
  }, [currentPage, query, data]);
  
  const handleSearch = (query: string) => {
    setLoading(true);
    setCurrentPage(1);
    setQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-start justify-start h-full w-full">
      <div className="pokedex-toolbar flex items-center justify-center w-full py-4">
        <SearchBar 
          searchBarPlaceholder="Search pokemon by Name" 
          onSearch={handleSearch} 
          className="w-3/5" 
        />
      </div>

      <div className="pokedex-content flex items-center justify-between w-full">
        {loading ? (
          <div className="w-full flex justify-center items-center py-12">
            <div className="pokeball-loader animate-spin">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-gray-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pokedex-list w-full flex items-center justify-center flex-wrap">
            {pageData.length > 0 ? (
              <ul className="w-full flex flex-wrap justify-center">
                {pageData.map((pokemonReference: PokemonReference) => (
                  <PokemonCard key={pokemonReference.name} pokemonUrl={pokemonReference.url} />
                ))}
              </ul>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-12 text-gray-500">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg">No pokemons found</p>
                {query && (
                  <p className="text-sm mt-2">Try a different search term</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pokedex-pagination flex items-center justify-center w-full flex-wrap p-2 py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageChange}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}