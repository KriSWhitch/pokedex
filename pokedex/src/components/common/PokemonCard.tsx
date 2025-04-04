"use client";
import { Pokemon } from "@/lib/definitions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/constants/api";
import { PokemonTypeBadge } from "./PokemonTypeBadge";

type PokemonCardProps = {
  pokemonUrl: string;
};

const formatPokemonId = (id: number) => id.toString().padStart(4, '0');
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function PokemonCard({ pokemonUrl }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [formattedId, setFormattedId] = useState("");

  useEffect(() => {
    const loadPokemon = async () => {
      const data: Pokemon = await fetchData(pokemonUrl);
      setPokemon(data);
      setFormattedId(formatPokemonId(data.id));
    };
    
    loadPokemon();
  }, [pokemonUrl]);

  if (!pokemon) return null;

  return (
    <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3 group">
      <div className="relative h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300">
        <Link 
          href={`/pokedex/${pokemon.name}`}
          className="block relative bg-gradient-to-b from-gray-50 to-gray-100 pt-[100%] overflow-hidden rounded-t-xl"
          aria-label={`View ${pokemon.name} details`}
        >
          <Image
            src={`/images/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </Link>

        <div className="p-4">
          <span className="text-gray-500 text-sm font-mono block mb-1">
            #{formattedId}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {capitalize(pokemon.name)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map(({ type }) => (
              <PokemonTypeBadge 
                key={type.name} 
                type={type.name}
                size="sm"
              />
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}