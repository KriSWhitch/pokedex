import { PokemonReference } from "@/lib/definitions";
import PokemonCard from "./PokemonCard";

type PokemonListProps = {
  pokemons: PokemonReference[];
  searchQuery: string;
};

export function PokemonList({ pokemons, searchQuery }: PokemonListProps) {
  if (pokemons.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 text-gray-500">
        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg">No pokemons found</p>
        {searchQuery && <p className="text-sm mt-2">Try a different search term</p>}
      </div>
    );
  }

  return (
    <ul className="w-full flex flex-wrap justify-center gap-4">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
      ))}
    </ul>
  );
}