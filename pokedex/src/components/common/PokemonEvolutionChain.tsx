"use client";
import { ChainLink, EvolutionChain, PokemonSpecies } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import EvolutionChainPokemonCard from './EvolutionChainPokemonCard';
import { fetchData } from '@/constants/api';
import { EvolutionArrowIcon } from '../graphics/EvolutionArrowIcon';

type PokemonEvolutionChainProps = {
  evolutionChainUrl: string;
};

const parseEvolutionChain = (chain: ChainLink): PokemonSpecies[] => {
  const species: PokemonSpecies[] = [];
  
  const traverse = (node: ChainLink) => {
    species.push(node.species);
    node.evolves_to.forEach(traverse);
  };

  traverse(chain);
  return species;
};

export default function PokemonEvolutionChain({ 
  evolutionChainUrl 
}: PokemonEvolutionChainProps) {
  const [species, setSpecies] = useState<PokemonSpecies[]>([]);

  useEffect(() => {
    const loadEvolutionChain = async () => {
      const chain: EvolutionChain = await fetchData(evolutionChainUrl);
      setSpecies(parseEvolutionChain(chain.chain));
    };

    loadEvolutionChain();
  }, [evolutionChainUrl]);

  if (!species.length) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
      {species.map((pokemon, index) => (
        <div key={pokemon.name} className="flex flex-col lg:flex-row items-center">
          <EvolutionChainPokemonCard pokemonUrl={pokemon.url} />
          
          {index < species.length - 1 && (
            <EvolutionArrowIcon />
          )}
        </div>
      ))}
    </div>
  );
}