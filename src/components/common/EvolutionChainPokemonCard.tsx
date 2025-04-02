"use client";
import { Pokemon } from "@/lib/definitions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/constants/api";

type EvolutionChainPokemonCardProps = {
  pokemonUrl: string;
};

const formatPokemonId = (id: number) => id.toString().padStart(4, '0');
const capitalizeName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

export default function EvolutionChainPokemonCard({ pokemonUrl }: EvolutionChainPokemonCardProps) {
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
    <li className="lg:w-24 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <Link 
          href={`/pokedex/${pokemon.name}`}
          className="w-full flex flex-col items-center mb-2"
          aria-label={`View ${pokemon.name} details`}
        >
          <div className="border-4 border-white bg-gray-400 rounded-full p-2 w-full max-w-64">
            <Image 
              src={`/images/sprites/pokemon/${pokemon.id}.png`}
              width={475}
              height={475}
              alt={pokemon.name}
              className="object-contain"
            />
          </div>
        </Link>
        
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs mb-1">#{formattedId}</span>
          <span className="text-white text-sm">{capitalizeName(pokemon.name)}</span>
        </div>
      </div>
    </li>
  );
}