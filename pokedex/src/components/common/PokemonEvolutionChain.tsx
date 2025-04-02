"use client";
import { ChainLink, EvolutionChain, PokemonSpecies } from '@/lib/definitions';
import { FC, useEffect, useState } from 'react';
import EvolutionChainPokemonCard from './EvolutionChainPokemonCard';
import { fetchData } from '@/constants/api';

interface PokemonEvolutionChainProps {
  evolutionChainUrl: string;
}

const PokemonEvolutionChain: FC<PokemonEvolutionChainProps> = ({ evolutionChainUrl }) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies[]>([]);

  async function fetchEvolutionChain(evolutionChainUrl: string) {
    const evolutionChain: EvolutionChain = await fetchData(evolutionChainUrl);
    setEvolutionChain(evolutionChain);
  }

  function parseEvolutionChainRecursive(chain: ChainLink): PokemonSpecies[] {
    const species: PokemonSpecies[] = [];
  
    const traverse = (node: ChainLink) => {
      species.push(node.species);
      node.evolves_to.forEach(evolution => traverse(evolution));
    };
  
    traverse(chain);
    return species;
  }

  useEffect(() => {
    fetchEvolutionChain(evolutionChainUrl);
  }, [evolutionChainUrl]);

  useEffect(() => {
    if (evolutionChain) {
      const species = parseEvolutionChainRecursive(evolutionChain.chain);
      setSpecies(species);
    }
  }, [evolutionChain]);

  if (!species.length) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
      {species?.map((pokemon, index) => (
        <div key={pokemon.name} className="flex flex-col lg:flex-row items-center">
          <EvolutionChainPokemonCard pokemonUrl={pokemon.url} />
          
          {index < species.length - 1 && (
            <div className="my-2 lg:my-0 lg:mx-1 transition-transform duration-300 lg:rotate-0 rotate-90">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PokemonEvolutionChain;