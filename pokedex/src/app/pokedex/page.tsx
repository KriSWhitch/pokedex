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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");

  const loadData = async () => {
    const data: PokemonData = await fetchData(`${createUrl(API_ENDPOINTS.POKEMON)}?limit=9999&offset=0`);
    setData(data);
  }

  const fetchPokemons = async () => {
    if (data && Array.isArray(data.results) && data.results.length > 0) {
      let results = data.results;
      let count = data.count;

      if (query) {
        results = data.results.filter((pokemon:PokemonReference) => pokemon.name.includes(query.toLowerCase()));
        count = results.length;
      }
    
      const totalPages = Math.ceil(count / POKEMONS_PER_PAGE);
      
      setPageData(results.slice((currentPage-1)*POKEMONS_PER_PAGE, currentPage*POKEMONS_PER_PAGE));
      setTotalPages(totalPages);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, query, data]);
  
  const handleSearch = async (query: string) => {
    try {
      setCurrentPage(1);
      setQuery(query);
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-start justify-start h-full w-full">
      <div className="pokedex-toolbar flex items-center justify-center w-full py-4">
        <SearchBar searchBarPlaceholder="Search pokemon by Name" onSearch={handleSearch} className="w-3/5" />
      </div>
      <div className="pokedex-content flex items-center justify-between w-full">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="pokedex-list w-full flex items-center justify-center flex-wrap">
            <ul className="w-full flex flex-wrap justify-center">
              {pageData.map((pokemonReference: PokemonReference) => (
                <PokemonCard key={pokemonReference.name} pokemonUrl={pokemonReference.url} />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="pokedex-pagination flex items-center justify-center w-full flex-wrap p-2 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onClick={handlePageChange}
          className="w-full"
        />
      </div>
    </div>
  );
}
