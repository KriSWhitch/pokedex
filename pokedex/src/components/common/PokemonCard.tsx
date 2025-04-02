"use client";
import { Pokemon, PokemonType } from "@/lib/definitions";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/constants/api";
import { PokemonTypeBadge } from "./PokemonTypeBadge";

export interface PokemonCardProps {
  pokemonUrl: string
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemonFormatedId, setPokemonFormatedId] = useState<string>("");

  const fetchPokemon = async (url: string) => {
    const data: Pokemon = await fetchData(url);
    setPokemon(data);
  }

  function formatNumberToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
  }

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    fetchPokemon(pokemonUrl);
  }, [pokemonUrl]);

  useEffect(() => {
    if (pokemon) {
      setPokemonFormatedId(formatNumberToFourDigits(pokemon.id));
    }
  }, [pokemon]);

  return (
    pokemon ? (
      <li key={pokemon.name} className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3">
        <div className="relative h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-gray-300">
          {/* Image Section */}
          <Link 
            href={`/pokedex/${pokemon.name}`} 
            className="block relative bg-gradient-to-b from-gray-50 to-gray-100 pt-[100%] overflow-hidden rounded-t-xl"
            aria-label={`View details of ${pokemon.name}`}
          >
            <Image
              src={`/images/sprites/pokemon/${pokemon.id}.png`}
              alt={`Pokemon: ${pokemon.name}`}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </Link>
          
          {/* Information Section */}
          <div className="p-4 cursor-default">
            <div className="flex justify-start items-center mb-1">
              <span className="text-gray-500 text-sm font-mono">#{pokemonFormatedId}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {capitalizeFirstLetter(pokemon.name)}
            </h3>
            
            <div className="flex flex-wrap gap-2 justify-start">
              {pokemon.types.map((type: PokemonType) => (
                <PokemonTypeBadge 
                  key={type.type.name} 
                  type={type.type.name}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>
      </li>
    ) : null
  );
};

export default PokemonCard;