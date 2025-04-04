"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import Pagination from "@/components/common/Pagination";
import { API_ENDPOINTS, createUrl, fetchData } from "@/constants/api";
import { POKEMONS_PER_PAGE } from "@/constants/consts";
import { PokemonData, PokemonReference } from "@/lib/definitions";
import { PokemonList } from "@/components/common/PokemonList";
import { PokeballLoader } from "@/components/ui/PokeballLoader";

export default function Pokedex() {
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  const [displayedPokemons, setDisplayedPokemons] = useState<PokemonReference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadAllPokemons = async () => {
      try {
        setIsLoading(true);
        const data: PokemonData = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON)}?limit=9999&offset=0`);
        setPokemonData(data);
      } catch (error) {
        console.error('Failed to load pokemons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllPokemons();
  }, []);

  useEffect(() => {
    const filterAndPaginatePokemons = () => {
      if (!pokemonData?.results) return;

      setIsLoading(true);
      
      try {
        let filtered = pokemonData.results;
        if (searchQuery) {
          filtered = filtered.filter(pokemon => 
            pokemon.name.includes(searchQuery.toLowerCase())
          );
        }

        const pageCount = Math.ceil(filtered.length / POKEMONS_PER_PAGE);
        setTotalPages(pageCount);

        const startIdx = (currentPage - 1) * POKEMONS_PER_PAGE;
        const endIdx = startIdx + POKEMONS_PER_PAGE;
        setDisplayedPokemons(filtered.slice(startIdx, endIdx));
      } catch (error) {
        console.error('Error processing pokemons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    filterAndPaginatePokemons();
  }, [currentPage, searchQuery, pokemonData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full py-4 flex justify-center">
        <SearchBar 
          searchBarPlaceholder="Search pokemon by Name" 
          onSearch={handleSearch} 
          className="w-full max-w-2xl" 
        />
      </div>

      {isLoading ? (
        <PokeballLoader />
      ) : (
        <PokemonList 
          pokemons={displayedPokemons} 
          searchQuery={searchQuery} 
        />
      )}

      {!isLoading && totalPages > 1 && (
        <div className="w-full p-2 py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}