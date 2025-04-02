"use client";
import { Pokemon } from "@/lib/definitions";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/constants/api";

export interface EvolutionChainPokemonCardProps {
  pokemonUrl: string
}

const EvolutionChainPokemonCard: FC<EvolutionChainPokemonCardProps> = ({ pokemonUrl }) => {
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
    pokemon 
    ? <li key={pokemon.name} className="pokemon-chain-card__container lg:w-24 flex flex-col justify-center items-center">
        <div className="pokemon-chain-card w-full h-full flex flex-col justify-start items-center">
          <Link className="w-full flex flex-col justify-center items-center mb-2" href={`/pokedex/${pokemon.name}`}>
            <div className="pokemon-image border-white border-4 bg-gray-400 rounded-full p-2 w-full max-w-64 flex flex-col justify-center items-center">
              <Image src={`/images/sprites/pokemon/${pokemon.id}.png`} 
                     width={475} height={475} alt={`Pokemon: ${pokemon.name}`} />
            </div>
          </Link>
          <div className="pokemon-info flex flex-col justify-center items-center">
            <p className="pokemon-id text-gray-400 text-xs mb-1">#{pokemonFormatedId}</p>
            <div className="pokemon-name text-white text-sm break-all mb-2">{capitalizeFirstLetter(pokemon.name)}</div>
          </div>
        </div>
    </li>
    : <></>
  );
}

export default EvolutionChainPokemonCard;